import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Button, ButtonModule} from "primeng/button";
import {FaIconComponent, FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import { fontAwesomeIcons} from "./shared/font-awesome-icons";
import {faAirbnb} from "@fortawesome/free-brands-svg-icons/faAirbnb";
import {faTimeline, faTimes} from "@fortawesome/free-solid-svg-icons";
import {BehaviorSubject, Subject} from "rxjs";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    ButtonModule,FontAwesomeModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'airbnb-clone-front';
  faIconLabrary = inject(FaIconLibrary)

  ngOnInit(): void {
    this.initFontAwesome();

  }

  private initFontAwesome() {
    this.faIconLabrary.addIcons(...fontAwesomeIcons )
  }


   faTimes = faTimes;
}
