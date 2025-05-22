import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingService } from '../../../services/loading.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  isloading!:boolean
  constructor(private loadingservice:LoadingService){
    loadingservice.isloading.subscribe((loading)=>{
     this.isloading = loading
    })
    //loadingservice.showloading()
  }
}
