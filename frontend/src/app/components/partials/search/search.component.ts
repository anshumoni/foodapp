import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
searchTerm:string='';

constructor(activateRouter:ActivatedRoute,private router:Router){
    activateRouter.params.subscribe((params)=>{
       if(params["searchTerm"]){
        this.searchTerm = params["searchTerm"];
       }
    })
}

search(term:string):void{
  if(term)
  this.router.navigateByUrl(`search/${term}`)
}
}
