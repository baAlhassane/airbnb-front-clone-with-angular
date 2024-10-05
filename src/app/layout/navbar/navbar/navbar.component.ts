import {Component, inject, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ToolbarModule} from "primeng/toolbar";
import {MenuModule} from "primeng/menu";
import {CategoryComponent} from "../category/category.component";
import {AvatarComponent} from "../avatar/avatar.component";
import {DialogService} from "primeng/dynamicdialog";
import {MenuItem} from "primeng/api";
import {ToastService} from "../../toast.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    FontAwesomeModule,
    ToolbarModule,
    MenuModule,
    CategoryComponent,
    AvatarComponent
  ],
  providers: [DialogService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  location:string ="Anywhere";
  guess:string="add guests";
  dates:string="Any week";

  toasService:ToastService=inject(ToastService);
  //login()=>this.authService.login();
  //logout()=>this.authService.login();
  guests: string="guest";
  curenntMenuItems:[] | undefined;
  currentMenuItems: MenuItem[] | undefined;
  connectedUser: string | undefined;
  ngOnInit(): void {
    this.fetchMenu();
    this.toasService.send({severity:"info",summary:"Welcome to your airbnb app"});

  }


  private fetchMenu() {
    return [
      {
        label: "sign up",
        styleClass: "font-bold",
      },
      {
        label: "Log in",

      }
    ]

  }

  openNewSearch() {

  }
}
