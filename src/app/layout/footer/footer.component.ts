import { Component } from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ButtonModule, FaIconComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

}
