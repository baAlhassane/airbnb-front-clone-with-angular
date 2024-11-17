import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {State} from "../core/model/state.model";
import {CreatedListing, NewListing} from "./model/listing-model";
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LandlordListingService {


http:HttpClient=inject(HttpClient);
  constructor() { }


  private created$: WritableSignal<State<CreatedListing>> = signal(State.Builder<CreatedListing>().forInit());

  createdSig: Signal<any>=computed(() => this.created$());

  create(newListing: NewListing):void {
    const formData : FormData= new FormData();

    for(let i :number=0 ;i<newListing.pictures.length;++i){
      formData.append("picture"+i,newListing.pictures[i].file);

    }
    const clone=structuredClone(newListing);
    clone.pictures=[];
    formData.append("dto", JSON.stringify(clone));
    this.http.post<CreatedListing>(`${environment.API_URL}/landlord/create`, formData)
      .subscribe({
        next: (listing: CreatedListing) => {

          this.created$.set(State.Builder<CreatedListing>().forSuccess(listing))
        },
        error: (error:any)=> {
           this.created$.set(State.Builder<CreatedListing>().forError(error));
        }

      })
  }

  resetListingCreation():void {
    this.created$.set(State.Builder<CreatedListing>().forInit());
  }

}
