import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {Message} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  INIT_STATE: string="INIT";
  private send$: BehaviorSubject<Message> = new BehaviorSubject<Message>({summary:this.INIT_STATE});

 sendSub:Observable<any> = this.send$.asObservable();
  constructor() {}

 public send(Message:Message):void {
    this.send$.next(Message);

 }

 
}




