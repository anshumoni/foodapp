import { Component, OnInit } from '@angular/core';
import { TitleComponent } from "../../partials/title/title.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, CanActivate, Route, Router } from '@angular/router';
import { PasswordMatchValidator } from '../../../shared/validators/password-validator';
import { Iuserregister } from '../../../shared/interface/Iuserregister';
import { USER_REGISTER_URL } from '../../../shared/constant';
import { InputTextComponent } from "../../partials/input-text/input-text.component";
import { DefaultButtonComponent } from "../../partials/default-button/default-button.component";

@Component({
  selector: 'app-register-page',
  imports: [TitleComponent, InputTextComponent, ReactiveFormsModule, DefaultButtonComponent],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent implements OnInit{
  registerform!:FormGroup
  isSubmitted = false;
  returnUrl = ''

  constructor(private fb:FormBuilder,
    private userService:UserService,
    private route:Router,
  private activateroute:ActivatedRoute){}

  ngOnInit(): void {
    this.registerform=this.fb.group({
      name:['',[Validators.required,Validators.minLength(5)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(5)]],
      confirmpassword:['',[Validators.required]],
      address:['',[Validators.required]]
    },
    {
      Validators:PasswordMatchValidator('password','confirmpassword')
    })
    this.returnUrl = this.activateroute.snapshot.queryParams['returnUrl']
  }  



get fc(){
  return this.registerform.controls
}

submit(){
  this.isSubmitted = true;
  if(this.registerform.invalid) return
  let fv = this.registerform.value

  const user:Iuserregister={
    name:fv['name'],
    email:fv['email'],
    password:fv['password'],
    confirmpassword:fv['confirmpassword'],
    address:fv['address']
  };
  alert("User register")
  this.userService.registerUser(user).subscribe(()=>{
      this.route.navigateByUrl(this.returnUrl)
  })
}
}