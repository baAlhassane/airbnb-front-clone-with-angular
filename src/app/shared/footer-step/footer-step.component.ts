import {Component, EventEmitter, input, InputSignal, Output} from '@angular/core';
import {Step} from "../../landlord/properties-create/step.model";
import {FaIconComponent, FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-footer-step',
  standalone: true,
  imports: [
    FaIconComponent,
    FontAwesomeModule
  ],
  templateUrl: './footer-step.component.html',
  styleUrl: './footer-step.component.scss'
})
export class FooterStepComponent {


currentStep:InputSignal<Step>=input.required<Step>();
loading:InputSignal<boolean>=input<boolean>(false);
isAllStepValid:InputSignal<boolean>=input<boolean>(false);
labelFinishedBtn:InputSignal<string>=input<string>("Finish");
  @Output()
finish :EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output()
previous:EventEmitter<boolean>=new EventEmitter<boolean>();
  @Output()
next:EventEmitter<boolean>=new EventEmitter<boolean>();

  onFinish():void{
    this.finish.emit(true)
  }

  onPrevious():void{
    this.previous.emit(true)
  }

  onNext():void{
    this.next.emit(true)
  }

}
