import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button, ButtonModule} from "primeng/button";
import {FaIconComponent, FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { fontAwesomeIcons} from "./shared/font-awesome-icons";
import {faAirbnb} from "@fortawesome/free-brands-svg-icons/faAirbnb";
import {faTimeline, faTimes} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject, Subject} from "rxjs";
import {CategoryComponent} from "./layout/navbar/category/category.component";
import {FooterComponent} from "./layout/footer/footer.component";
import {NavbarComponent} from "./layout/navbar/navbar/navbar.component";
import {MenuModule} from "primeng/menu";
import {ToastModule} from "primeng/toast";
import {ToastService} from "./layout/toast.service";
import {Message, MessageService} from "primeng/api";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    FontAwesomeModule,
    CategoryComponent,
    FooterComponent,
    NavbarComponent,
    MenuModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'airbnb-clone-front';
  faIconLabrary = inject(FaIconLibrary)
 messageService:MessageService= inject(MessageService);
  toasService: ToastService=inject(ToastService);

  ngOnInit(): void {
    this.initFontAwesome();
    this.listebToastService();

  }

  private initFontAwesome() {
    this.faIconLabrary.addIcons(...fontAwesomeIcons )
  }


   faTimes = faTimes;
  isListingView: any;


  private listebToastService(): void{
    this.toasService.sendSub.subscribe(
      {
        next: (newMessage :Message )=> {
          if(newMessage && newMessage.summary !== this.toasService.INIT_STATE ){
            this.messageService.add(newMessage)
          }
        }
      }
    )
  }
}
