import { Component } from '@angular/core';
import { Tags } from '../../../shared/models/tags';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tags',
  imports: [CommonModule, RouterLink],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

  tags!:Tags[]
  constructor(foodservice:FoodService){
    foodservice.getAllTag().subscribe((servertag)=>{
      this.tags =servertag
    })
  }
}
