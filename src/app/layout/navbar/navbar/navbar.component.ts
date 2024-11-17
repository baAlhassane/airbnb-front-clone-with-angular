import {Component, effect, inject, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ToolbarModule} from "primeng/toolbar";
import {MenuModule} from "primeng/menu";
import {CategoryComponent} from "../category/category.component";
import {AvatarComponent} from "../avatar/avatar.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MenuItem, MenuItemCommandEvent} from "primeng/api";
import {ToastService} from "../../toast.service";
import {AuthService} from "../../../core/auth/auth.service";
import {User} from "../../../core/model/user.model";
import {PropertiesCreateComponent} from "../../../landlord/properties-create/properties-create.component";
import {config} from "rxjs";

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
  imageUrl = 'assets/people.png';

  toasService:ToastService=inject(ToastService);
  authService:AuthService=inject(AuthService);
  dialogueService: DialogService = inject(DialogService);
  ref: DynamicDialogRef | undefined ;



  login = () => {this.authService.login();}
  logout=()=>this.authService.logout();


  guests: string="guest";
  // curentMenuItems:[] | undefined;
  currentMenuItems: MenuItem[] | undefined=[];
  public connectedUser: User={email: this.authService.notConnected};

  constructor() {
    effect(() => {
       if(this.authService.fetchUser().status === "OK"){
         this.connectedUser= this.authService.fetchUser().value!;
         this.currentMenuItems=this.fetchMenu();
       }

    });


  }

  setImageUrl(imgUrl: string ){
    this.imageUrl=imgUrl;

}




  ngOnInit(): void {
    //this.fetchMenu();
    this.authService.fetch(false);
   // this.toasService.send({severity:"info",summary:"Welcome to your airbnb app"});

  }


  private fetchMenu():MenuItem[] {
    if(this.authService.isAuthenticated()){
      console.log(this.connectedUser)
      if(this.connectedUser.email?.includes("alhassanebai36")){
        this.setAuthorities();
        console.log(this.connectedUser)
        this.connectedUser.imageUrl=this.imageUrl;
      }

       return [
        {
          label: "My properties",
          routerLink:"landlord/properties",
          visible:  this.hasTobeLandlord()
        },
        {
          label: "My Booking",
          routerLink: "booking",
        },
         {
           label: "My reservation ",
           routerLink: "landlord/reservation",
          visible:  this.hasTobeLandlord()

         },
         {
           label: "Logout",
           command: this.logout
           }
      ]
    }
    else {
      console.log(this.connectedUser)
      return [
        {
          label: "sign up",
          styleClass: "font-bold",
          command: this.login
        },
        {
          label: "Log in",
          command: this.login

        }
      ]
    }


  }

  openNewSearch() {

  }

  private hasTobeLandlord():boolean {
    return this.authService.hasAnyAuthority("ROLE_LANDLORD")

  }

  setAuthorities(){
    //this.connectedUser.authorities=this.authService.hasAnyAuthority();
  }

  opendNewListing():void{
    this.ref=this.dialogueService.open(PropertiesCreateComponent,{
      width: "60%",
      header: "Airbnb your Home",
      closable: true,
      focusOnShow: true,
      modal: true,
      showHeader: true,
    })
  }
}
