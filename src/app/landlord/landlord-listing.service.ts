import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {State} from "../core/model/state.model";
import {CardListing, CreatedListing, NewListing} from "./model/listing-model";
import {environment} from "../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {NewListingPicture} from "./model/picture.model";
import {convertFileToBase64} from "./properties-create/convertFileToByte";

@Injectable({
  providedIn: 'root'
})
export class LandlordListingService {


http:HttpClient=inject(HttpClient);
  constructor() { }


  private created$: WritableSignal<State<CreatedListing>> = signal(State.Builder<CreatedListing>().forInit());
  createdSig: Signal<any>=computed(() => this.created$());


  private getAll$: WritableSignal<State<Array<CardListing>>> = signal(State.Builder<Array<CardListing>>().forInit());
  getAllSig = computed(() => this.created$());

  private delete$: WritableSignal<State<string>> = signal(State.Builder<string>().forInit());
  deleteSig = computed(() => this.created$());

  create(newListing: NewListing):void {
    const formData : FormData= new FormData();

    for(let i :number=0 ;i<newListing.pictures.length;++i){
      //formData.append("picture-"+i,newListing.pictures[i].file);
      const picture = newListing.pictures[i];
      formData.append(`pictures[${i}]`, picture.file);
    //!*  console.log("----------");
      console.log("picture-"+i+" = ",newListing.pictures[i]);
      console.log("picture-"+i+".file =",newListing.pictures[i].file);
      console.log("----------");
    }
    const clone=structuredClone(newListing);
    console.log("clone ",clone);
    console.log("formData =>  ",formData);
    clone.pictures=[];
    formData.append("dto", JSON.stringify(clone));
    console.log("formData.apppend(dto) => ",formData)
    console.log("dto:", JSON.stringify(clone));

    // Cloner et nettoyer l'objet DTO pour éviter d'envoyer les fichiers dans le JSON
    const dtoClone = structuredClone(newListing);
    dtoClone.pictures = dtoClone.pictures.map((picture: any) => {
      const { file, ...rest } = picture; // Supprimer `file` tout en conservant les autres propriétés
      return rest; // Renvoyer les autres propriétés comme `urlDisplay`
    });
    // Ajouter le DTO JSON au FormData
    formData.append("dto", JSON.stringify(dtoClone));

    this.http.post<CreatedListing>(`${environment.API_URL}/landlord-listing/create`, formData)
      .subscribe({
        next: (listing: CreatedListing) => {

          this.created$.set(State.Builder<CreatedListing>().forSuccess(listing))
        },
        error: (error:any)=> {
           this.created$.set(State.Builder<CreatedListing>().forError(error));
        }

      })
  }



  getAll():void {
    this.http.get<Array<CardListing>>(`${environment.API_URL}/landlord-listing/get-all`)
    .subscribe({
      next: (listings: Array<CardListing>) => this.getAll$.set(State.Builder<Array<CardListing>>().forSuccess(listings)),
      error: (error:any)=> this.created$.set(State.Builder<CreatedListing>().forError(error))


    })
  }


  delete(publicId:string):void {
    const params = new HttpParams().set("publiicId", publicId);
    this.http.delete<string>(`${environment.API_URL}/landlord-listing/delete`, {params: params})
      .subscribe({
        next: publicId => this.delete$.set(State.Builder<string>().forSuccess(publicId)),
        error: err => this.created$.set(State.Builder<CreatedListing>().forError(err)),
      })
  }


  resetListingCreation():void {
    this.created$.set(State.Builder<CreatedListing>().forInit());
  }



/*

  create(newListing: NewListing): void {
    const formData: FormData = new FormData();

    // Conversion des fichiers en Base64 sans modifier le type `file`
    Promise.all(
      newListing.pictures.map(async (picture) => ({
        ...picture,
        base64: await convertFileToBase64(picture.file), // Ajout du champ Base64
      }))
    ).then((picturesWithBase64) => {
      const clone = structuredClone(newListing);

      // Utiliser les nouvelles images avec les données supplémentaires
      clone.pictures = picturesWithBase64 as NewListingPicture[]; // Type assertion pour satisfaire TypeScript

      // Ajouter les fichiers au FormData
      newListing.pictures.forEach((picture, index) => {
        formData.append(`picture-${index}`, picture.file);
      });

      // Ajouter le clone JSON dans le FormData
      formData.append('dto', JSON.stringify(clone));

      // Envoyer au backend
      this.http.post<CreatedListing>(`${environment.API_URL}/landlord-listing/create`, formData).subscribe({
        next: (listing: CreatedListing) => {
          this.created$.set(State.Builder<CreatedListing>().forSuccess(listing));
        },
        error: (error: any) => {
          this.created$.set(State.Builder<CreatedListing>().forError(error));
        },
      });
    }).catch((error) => {
      console.error('Erreur lors de la conversion des fichiers :', error);
    });
  }

*/




}
