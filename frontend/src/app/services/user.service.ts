import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { Iuser } from '../shared/interface/Iuser';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constant';
import { ToastrService } from 'ngx-toastr';
import { Iuserregister } from '../shared/interface/Iuserregister';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userSubject = new BehaviorSubject<User>(this.getUserFromlocalstorage());
  public userObservable:Observable<User>
  USER_KEY = "user"
  constructor(private http:HttpClient,private toastr:ToastrService) { 
    this.userObservable = this.userSubject.asObservable()
  }
  
  registerUser(registerUsr:Iuserregister):Observable<User>{
     return this.http.post<User>(USER_REGISTER_URL, registerUsr).pipe(
      tap({
        next: (user) => {
          this.setUserLocalStorage(user);
          this.userSubject.next(user);
          this.toastr.success(`Welcome to food app ${user.name}`, 'Register Success');
        },
        error: (errorrsp) => {
          this.toastr.error(errorrsp.error, "Registration Failed");
        }
      })
    );
  }

  login(userdet:Iuser):Observable<User>{
   return this.http.post<User>(USER_LOGIN_URL,userdet).pipe(
    tap({
       next:(user:any)=>{
        this.userSubject.next(user)
        this.setUserLocalStorage(user)
        this.toastr.success(`Welcome to Foodmine ${user}`,"Login Success")
       },
       error:(errorresponse:any)=>{
         this.toastr.error(errorresponse.error,"Login Failed")
       }
      
       }
    )
   )
  }
  
  logout(){
    this.userSubject.next(new User())
    localStorage.removeItem(this.USER_KEY)
    window.location.reload()
  }
  private setUserLocalStorage(user:User){
    localStorage.setItem(this.USER_KEY,JSON.stringify(user))

  }

   public getCurrentUser():User{
     return this.userSubject.value
   }

  private getUserFromlocalstorage():User{
    const jsonuser = localStorage.getItem(this.USER_KEY)
    if(jsonuser) return JSON.parse(jsonuser) as User;
    return new User()
  }

}