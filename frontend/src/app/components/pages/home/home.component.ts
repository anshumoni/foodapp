import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchComponent } from "../../partials/search/search.component";
import { TagsComponent } from "../../partials/tags/tags.component";
import { NotFoundComponent } from "../../partials/not-found/not-found.component";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, SearchComponent, TagsComponent, NotFoundComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
[x: string]: any;

  foodlists = signal<any[]>([])
  islist:boolean = true;
  constructor(private foodservice:FoodService,private activatedRoute:ActivatedRoute){
    activatedRoute.params.subscribe((params)=>{
       let foodobservable:Observable<Food[]>
      if(params['searchTerm']){       
        foodobservable = this.foodservice.getFoodBySearchTerm(params['searchTerm']);
        console.log("foodlength",this.foodlists,"list",this.islist)

        if(this.foodlists.length==0){ console.log("check")
          this.islist = false
        }
      }
      else if(params['tag']){ 
        foodobservable = this.foodservice.getFoodByTag(params['tag'])
      }
      else{
        foodobservable = this.foodservice.getFood()
      }
      foodobservable.subscribe((foodval)=>{
        this.foodlists.set(foodval)
      })
      
    })
  }
  
}
