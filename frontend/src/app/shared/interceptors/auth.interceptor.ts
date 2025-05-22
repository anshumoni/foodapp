import { HttpInterceptorFn } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userservice = inject(UserService)
  const user = userservice.getCurrentUser()
  if(user.token){
     req=req.clone({
      setHeaders:{
        access_token : user.token
      }
     })
  }
  return next(req);
};
