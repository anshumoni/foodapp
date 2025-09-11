import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { InputContainerComponent } from "../input-container/input-container.component";
import { InputValidationComponent } from "../input-validation/input-validation.component";
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'input-text',
  imports: [InputContainerComponent,
    ReactiveFormsModule, CommonModule, InputValidationComponent],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css'
})
export class InputTextComponent {
  @Input()
  mycontrol!: AbstractControl;
  @Input()
  label!:string;
  @Input()
  showerrorwhen:boolean=true;
  @Input()
  type:'text' | 'email'| 'password' ='text'
  constructor(){ 
  }
  get formControl(){ console.log("input control",this.mycontrol)
    return this.mycontrol  as FormControl
  }
}

