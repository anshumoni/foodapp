import { HttpEvent, HttpEventType, HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { LoadingService } from '../../services/loading.service';
import { inject } from '@angular/core';
import { Observable, tap } from 'rxjs';

var getdatatimefromapi = 0
export const loadingInterceptor: HttpInterceptorFn = (req:HttpRequest<unknown>, next:HttpHandlerFn): Observable<HttpEvent<unknown>>  => {
    const loading = inject(LoadingService)
   loading.showloading()
   return next(req).pipe(tap(event => {
    if (event.type === HttpEventType.Response) {
      loading.hideloading()
    }
  })); 
};
