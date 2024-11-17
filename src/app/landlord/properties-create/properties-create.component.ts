import {Component, effect, inject, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {LandlordListingService} from "../landlord-listing.service";
import {ToastService} from "../../layout/toast.service";
import {AuthService} from "../../core/auth/auth.service";
import {Step} from "./step.model";
import {CreatedListing, NewListing} from "../model/listing-model";
import {HttpErrorResponse} from "@angular/common/http";
import {State} from "../../core/model/state.model";
import {Router} from "@angular/router";
import {CategoryName} from "../../layout/navbar/category/category.model";
import {CategoryComponent} from "../../layout/navbar/category/category.component";
import {CategoryStepComponent} from "../propertiesCreate/step/category-step/category-step.component";
import {NewListingPicture} from "../model/picture.model";
import {FooterComponent} from "../../layout/footer/footer.component";
import {FooterStepComponent} from "../../shared/footer-step/footer-step.component";
@Component({
  selector: 'app-properties-create',
  standalone: true,
  imports: [
    CategoryComponent,
    CategoryStepComponent,
    FooterComponent,
    FooterStepComponent
  ],
  templateUrl: './properties-create.component.html',
  styleUrl: './properties-create.component.scss'
})
export class PropertiesCreateComponent implements OnDestroy {


  CATEGORY: string = "category";
  LOCATION: string = "location";
  PHOTOS: string = "photo";
  DESCRIPTION: string = "description";
  PRICE: string = "price";
  INFO: string = "info";


  dialogDynamicRef: DynamicDialogRef<any> = inject(DynamicDialogRef)
  listingService: LandlordListingService = inject(LandlordListingService);
  toastService: ToastService = inject(ToastService);
  userService: AuthService = inject(AuthService);
  router = inject(Router);

  constructor() {
    this.listenFetchUser();
    this.listenListingCreation();
  }

  steps: Step[] = [
    {
      id: this.CATEGORY,
      idNext: this.LOCATION,
      idPrevious: null,
      isValid: false
    }, {
      id: this.LOCATION,
      idNext: this.INFO,
      idPrevious: this.CATEGORY,
      isValid: false
    }, {
      id: this.INFO,
      idNext: this.PHOTOS,
      idPrevious: this.LOCATION,
      isValid: false
    }, {
      id: this.PHOTOS,
      idNext: this.DESCRIPTION,
      idPrevious: this.INFO,
      isValid: false
    }, {
      id: this.DESCRIPTION,
      idNext: this.PRICE,
      idPrevious: this.PHOTOS,
      isValid: false
    }, {
      id: this.PRICE,
      idNext: null,
      idPrevious: this.DESCRIPTION,
      isValid: false
    }
  ];

  currentStep = this.steps[0];


  newListing: NewListing = {
    category: "AMAZING_VIEWS",
    infos: {

      guests: {value: 0},
      bedrooms: {value: 0},
      beds: {value: 0},
      baths: {value: 0}
    },
    location: "",
    pictures: new Array<NewListingPicture>(),
    description: {
      title: {value: ""},
      description: {value: ""},

    },
    price: {value: 0},
  };

  ngOnDestroy(): void {
    this.listingService.resetListingCreation();
  }

  listenFetchUser(): void {
    effect(() => {
      if (this.userService.fetchUser().status == "OK" && this.listingService.createdSig().status === "OK") {
        this.router.navigate(["lanlord", "properties"]);

      }

    });
  }

  loardingCreation: boolean = false;

  createListing(): void {
    this.loardingCreation = true;
    this.listingService.create(this.newListing)

  }

  listenListingCreation(): void {
    effect(() => {
      let createdListingState: State<CreatedListing, HttpErrorResponse> = this.listingService.createdSig();
      if (createdListingState.status === "OK") {
        this.onCreateOk(createdListingState);
      } else if (createdListingState.status === "ERROR") {
        this.onCreateError();
      }

    });
  }


  private onCreateOk(createdListingState: State<CreatedListing, HttpErrorResponse>) {
    this.loardingCreation = false;
    this.toastService.send({
      severity: "success",
      summary: "success",
      detail: "Listing created successfully"
    });
    this.dialogDynamicRef.close(createdListingState.value?.publicId);
    this.userService.fetch(true);// for refresh
  }

  private onCreateError() {
    this.loardingCreation = false;
    this.toastService.send({
        severity: "erreor",
        summary: "Error",
        detail: "Could not create your listing. Try again"
      }
    )


  }

  nextStep(): void {
    if(this.currentStep.idNext !== null) {
      this.currentStep=this.steps.filter((step:Step ) => step.id === this.currentStep.idNext)[0];
    }
  }

  previousStep(): void {
    if(this.currentStep.idPrevious !== null) {
      this.currentStep=this.steps.filter((step:Step ) => step.idPrevious === this.currentStep.idPrevious)[0];
    }
  }

  isAllStepValid(): boolean {
    return this.steps.filter(step=> step.isValid).length===this.steps.length
  }

  onCategoryChange(newcategory:CategoryName): void {
    this.newListing.category=newcategory;
  }

  onValidityChange(valid:boolean): void {
    this.currentStep.isValid = valid;
  }

}




