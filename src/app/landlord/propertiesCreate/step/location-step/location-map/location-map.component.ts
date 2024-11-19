// import {Component, effect, EventEmitter, inject, input, InputSignal, Output} from '@angular/core';
// import {LeafletModule} from "@asymmetrik/ngx-leaflet";
// import {FormsModule} from "@angular/forms";
// import {
//   AutoComplete,
//   AutoCompleteCompleteEvent,
//   AutoCompleteModule,
//   AutoCompleteSelectEvent
// } from "primeng/autocomplete";
// import {CountryService} from "../country.service";
// import {ToastService} from "../../../../../layout/toast.service";
// import {OpenStreetMapProvider} from "leaflet-geosearch";
// import {CategoryName} from "../../../../../layout/navbar/category/category.model";
// import {Country} from "../contry.model";
// import {toRelativeImport} from "@angular/compiler-cli";
// import L, {circle, latLng, polygon, tileLayer} from "leaflet";
//
// @Component({
//   selector: 'app-location-map',
//   standalone: true,
//   imports: [
// LeafletModule,
//     FormsModule,
//     AutoCompleteModule,
//   ],
//   templateUrl: './location-map.component.html',
//   styleUrl: './location-map.component.scss'
// })
// export class LocationMapComponent {
//
//   countryService: CountryService=inject(CountryService);
//   toastService: ToastService=inject(ToastService);
//
//   private map: L.Map |undefined;
//   private provider: OpenStreetMapProvider | undefined;
//
//   location: InputSignal<string> =input.required<string>();
//
//   placeholder : InputSignal<string> = input<string>("Select your home  country ! ");
//
//   @Output()
//   locationChange : EventEmitter<string>= new EventEmitter<string>();
//
//   formatLabael=(country: Country)=> country.flag+" "+ country.name;
//
//   constructor() {
//     this.listenToLocation();
//   }
//   options:{}={
//     layers:[
//       tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png}",{maxZoom:18,attribution:"..."})
//     ],
//     zoom:5,
//     center: latLng(46.8799,-121.726989)
//   }
//
//
//   layersControl = {
//     baseLayers: {
//       "Open Street Map": tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         maxZoom: 18,
//         attribution: "..."
//       }),
//     },
//     overlays: {
//       "Big Circle": circle([46.95, -122], {radius: 5000}),
//       "Big square": polygon([[46.8, -121.55], [46.8, -121.55], [46.8, -121.55], [46.8, -121.55]])
//     }
//   }
//
//   countries: Array<Country> = [];
//   filteredCountries: Array<Country> = [];
//   currentLocation: Country | undefined;
//
//   onMapReady(map: L.Map) {
//     this.map = map;
//     this.configSearchControl();
//   }
//
//   private configSearchControl() {
//     this.provider = new OpenStreetMapProvider();
//   }
//
//   onLocationChange(newEvent: AutoCompleteSelectEvent) {
//     const newCountry = newEvent.value as Country;
//     this.locationChange.emit(newCountry.cca3);
//   }
//
//   private listenToLocation() {
//     effect(() => {
//       const countriesState = this.countryService.countries();
//       if (countriesState.status === "OK" && countriesState.value) {
//         this.countries = countriesState.value;
//         this.filteredCountries = countriesState.value;
//         this.changeMapLocation(this.location())
//       } else if (countriesState.status === "ERROR") {
//         this.toastService.send({
//           severity: "error", summary: "Error",
//           detail: "Something went wrong when loading countries on change location"
//         });
//       }
//     });
//   }
//
//   private changeMapLocation(term: string) {
//     this.currentLocation = this.countries.find(country => country.cca3 === term);
//     if (this.currentLocation) {
//       this.provider!.search({query: this.currentLocation.name.common})
//         .then((results) => {
//           if (results && results.length > 0) {
//             const firstResult = results[0];
//             this.map!.setView(new L.LatLng(firstResult.y, firstResult.x), 13);
//             L.marker([firstResult.y, firstResult.x])
//               .addTo(this.map!)
//               .bindPopup(firstResult.label)
//               .openPopup();
//           }
//         })
//     }
//   }
//
//   search(newCompleteEvent: AutoCompleteCompleteEvent): void {
//     this.filteredCountries =
//       this.countries.filter(country => country.name.common.toLowerCase().startsWith(newCompleteEvent.query))
//   }
//
//   protected readonly toRelativeImport = toRelativeImport;
// }