import {computed, inject, Injectable, Signal, signal, WritableSignal} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode} from "@angular/common/http";
import {Location} from "@angular/common";
import {User} from "../model/user.model";
import {State} from "../model/state.model";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  http:HttpClient=inject(HttpClient);
  location:Location=inject(Location);
  notConnected:string="NOT_CONNECTED"
  constructor() { }
  //const apiUrl = environment.API_URL;

  private fetchUser$: WritableSignal<State<User>> = signal(State.Builder<User>().forSuccess({email: this.notConnected}) );

  fetchUser:Signal<State<User,HttpErrorResponse>> =computed(()=> this.fetchUser$());


  fetch(forceResync: boolean): void {
    this.fetchHttpUser(forceResync)
      .subscribe({
        next: user => this.fetchUser$.set(State.Builder<User>().forSuccess(user)),
        error: err => {
          if (err.status === HttpStatusCode.Unauthorized && this.isAuthenticated()) {
            this.fetchUser$.set(State.Builder<User>().forSuccess({email: this.notConnected}));
          } else {
            this.fetchUser$.set(State.Builder<User>().forError(err));
          }
        }
      })
  }
    fetchHttpUser(forceResync:boolean):Observable<User>{
        const params : HttpParams =new HttpParams().set('forceResync', forceResync.toString());
      // return this.http.get<User>(`${environment.API_URL}/api/auth/get-authenticated-user`,{params})
      return this.http.get<User>(`${environment.API_URL}/auth/get-authenticated-user`,{params})

  }

  login():void{
      location.href=`${location.origin}${this.location.prepareExternalUrl("oauth2/authorization/okta")}`;
  }

  logout():void{
      this.http.post(`${environment.API_URL}/auth/logout`,{})
        .subscribe({
          next: (response:any)=> {this.fetchUser$.set(State.Builder<User>()
            .forSuccess({email: this.notConnected}) );
          location.href=response.logoutUrl;
          }
        });
  }

  isAuthenticated():boolean {

      if(this.fetchUser$().value){
        return this.fetchUser$().value!.email !== this.notConnected;
      }
      else{
        return false;
      }




}

hasAnyAuthority(authorities:string[] | string ):boolean{
      if(this.fetchUser$().value!.email === this.notConnected){
        return false;
      }
      if(!Array.isArray(authorities)){
        authorities = [authorities];

      }
      return this.fetchUser$().value!.authorities!.some((authority:string)=>authorities.includes(authority));


}





}
