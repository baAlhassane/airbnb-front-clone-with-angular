import {Component, effect, EventEmitter, inject, input, Output} from '@angular/core';
import {PriceVO} from "../../landlord/model/listing-vo.model";
import {CardListing} from "../../landlord/model/listing-model";
import {BookedListing} from "../../tenant/model/booking.model";
import {Router} from "@angular/router";
import {CategoryService} from "../../layout/navbar/category/category.service";
import {CountryService} from "../../landlord/properties-create/step/location-step/country.service";
import {Country} from "../../landlord/properties-create/step/location-step/country.model";

@Component({
  selector: 'app-card-listing',
  standalone: true,
  imports: [],
  templateUrl: './card-listing.component.html',
  styleUrl: './card-listing.component.scss'
})
export class CardListingComponent {


  @Output()
  deletelisting = new EventEmitter<CardListing>();
  @Output()
  cancelBooking = new EventEmitter<BookedListing>();

  listing = input.required<CardListing | BookedListing>();
  cardMode = input<"landlor" | "booking">()

  bookingListing: BookedListing | undefined;
  cardListing: CardListing | undefined;


  router = inject(Router);
  categoryService = inject(CategoryService);
  countryService = inject(CountryService);

  constructor() {
    this.listenToListing()
  }

  private listenToListing(){
    effect(() => {
      const listing = this.listing();
       this.countryService.getCountryByCode(listing.location)
       .subscribe(country => {
         next: (country: Country)=>{
           if(listing){
             this.listing().location=country.region+ " "+ country.name+ " "+country.name.common;
           }
         }
       })
    });
  }





  private listenToCardMode(){
    effect(() => {
      const cardMode = this.cardMode();
      if(cardMode && cardMode=== "booking"){
        this.bookingListing = this.listing() as BookedListing;

      }
      else {
        this.cardListing= this.listing() as CardListing;
      }
    })
  }



}


