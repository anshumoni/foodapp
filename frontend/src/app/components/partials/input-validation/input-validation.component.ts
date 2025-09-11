import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl } from '@angular/forms';

const VALIDATION_MSG:any ={
  required:"Field should not be empty",
  email:"Email should be valid",
  minlength:"Length should not be less than 5 character",
  nomatch:"Password and confirm password should be match"

}
@Component({
  selector: 'input-validation',
  imports: [CommonModule],
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnInit,OnChanges{
  @Input()
  textcontrol!:AbstractControl
  @Input()
  showerrorwhen:boolean = true;

  errormsg:string[]=[]
  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation()
  }
  ngOnInit(): void {
    console.log("control",this.textcontrol)
    this.textcontrol.statusChanges.subscribe(()=>{
      this.checkValidation()
    })
    this.textcontrol.valueChanges.subscribe(()=>{
      this.checkValidation()
    })
  }
 

  checkValidation():void{
    let errors = this.textcontrol.errors;
    if(!errors) {
      this.errormsg =[]
      return;
    }
    let errorkey = Object.keys(errors)
    this.errormsg = errorkey.map(key=>VALIDATION_MSG[key])
  }
}
