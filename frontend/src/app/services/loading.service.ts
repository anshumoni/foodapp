import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
private isloadingSubject= new BehaviorSubject<boolean>(false)

  constructor() { }

  showloading(){
    this.isloadingSubject.next(true)
  }
  hideloading(){
    this.isloadingSubject.next(false)
  }

  get isloading(){
    return this.isloadingSubject.asObservable();
  }
}
