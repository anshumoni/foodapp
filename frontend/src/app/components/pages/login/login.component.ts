import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TitleComponent } from "../../partials/title/title.component";
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { USER_LOGIN_URL } from '../../../shared/constant';
import { InputTextComponent } from "../../partials/input-text/input-text.component";
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";


@Component({
  selector: 'app-login',
  imports: [TitleComponent, ReactiveFormsModule, CommonModule,
    InputTextComponent, DefaultButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginform!:FormGroup;
  isSubmitted=false;
  returnUrl =''

  constructor(private formBuilder:FormBuilder,
    private userservice:UserService,
    private activateRoute:ActivatedRoute,
    private router:Router){}

  ngOnInit(){
    this.loginform = this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
    this.returnUrl = this.activateRoute.snapshot.queryParams['returnUrl']
  } 

  get fc(){
    return this.loginform.controls
  }

  submit(){
    this.isSubmitted = true;
    if(this.loginform.invalid) return
     this.userservice.login({email:this.fc['email'].value,
      password:this.fc['password'].value}).subscribe(()=>{
        this.router.navigateByUrl(this.returnUrl);
      })
  }
}
