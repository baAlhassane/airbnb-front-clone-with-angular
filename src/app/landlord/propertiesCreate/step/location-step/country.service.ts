import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {Countries, Country} from "./contry.model";
import {State} from "../../../../core/model/state.model";
import {catchError, map, Observable, of, pipe, shareReplay, tap} from "rxjs";
import * as console from "node:console";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private http: HttpClient = inject(HttpClient)

  constructor() {
  }

  private countries$: WritableSignal<State<Array<Country>>> = signal(State.Builder<Array<Country>>().forInit());

  countries: Signal<State<Array<Country>>> = computed(() => {
    return this.countries$();
  });

  private fetchCountries$: Observable<Country[]> = new Observable<Array<Country>>();

  initFetchAllcountries(): void {
    this.fetchCountries$ = this.http.get<Country[]>("/assets/countries.json");
    pipe(
      tap((countries : Country[] )=> this.countries$.set(State.Builder<Array<Country>>().forSuccess(countries))),
      catchError(err => {this.countries$.set(State.Builder<Array<Country>>().forError(err));
      return of(err);
      }),
      shareReplay(1)
    );

  }



  getCountryByCode(code: string): Observable<Country> {
    return this.fetchCountries$.pipe(
      map(countries =>  countries.filter(country=> country.cca3===code)),
      map(countries => countries[0])

    )
  }
}

