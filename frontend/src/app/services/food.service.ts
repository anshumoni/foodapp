import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from '../../data';
import { Tags } from '../shared/models/tags';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FOOD_BY_ID_URL, FOOD_BY_TAG_URL, FOODS_BY_SEARCH_URL, FOODS_TAG_URL, FOODS_URL } from '../shared/constant';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getFood():Observable<Food[]> {
    return this.http.get<Food[]>(FOODS_URL)
  }

  getFoodBySearchTerm(search:string){ 
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL+search)
  }

  getFoodById(foodid:string):Observable<Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL+foodid)
  }

  getAllTag():Observable<Tags[]>{
      return this.http.get<Tags[]>(FOODS_TAG_URL)
  }

  getFoodByTag(tag:string):Observable<Food[]>{
    console.log("tag",tag)
     return tag=="All"?
        this.getFood():
        this.http.get<Food[]>(FOOD_BY_TAG_URL+tag)
  }
}
