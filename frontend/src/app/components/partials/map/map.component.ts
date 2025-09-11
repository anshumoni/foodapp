import { Component, ElementRef, EventEmitter, OnInit, Output, output, ViewChild } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { LatLng, Map, tileLayer,map, LeafletMouseEvent, LatLngTuple } from 'leaflet';

@Component({
  selector: 'map',
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit{
  private readonly DEFAULT_LATLNG: LatLngTuple = [13.75, 21.62];
@ViewChild('map',{static:false})
@Output() setLatLng = new EventEmitter()
mapRef!:ElementRef;
  map!: Map;

constructor(){}
  ngOnInit(): void {
    this.initializeMap();
    console.log("load map")
  }
  display: any;
  center: google.maps.LatLngLiteral = {
   lat: 22.2736308,
   lng: 70.7512555
  };

  zoom = 6;
  

  moveMap(event: google.maps.MapMouseEvent) {

      if (event.latLng != null) this.center = (event.latLng.toJSON());

  }

  move(event: google.maps.MapMouseEvent) {

      if (event.latLng != null) this.display = event.latLng.toJSON();
      this.setLatLng.emit(this.display)

  }
initializeMap(){
 if(!this.map) return;
  this.map=map(this.mapRef.nativeElement,{
    attributionControl:false
  }).setView(this.DEFAULT_LATLNG,1)
  tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(this.map);
  console.log("map initialize",this.map)
  
  //this.map.on('click', (e:LeafletMouseEvent) => {
    //this.setMarker(e.latlng);
  //})
}
}



