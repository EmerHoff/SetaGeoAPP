import { Component, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
    
  /*
  title: string = 'Google Maps Api';
  lat: number = -24.9482928;
  lng: number = -53.4416913;
  zoom: number = 15;
  InfoWindow: boolean = true;
  Info: string = 'Seta Digital';
  endereco: string = 'Av. Brasil, 4369';
  map: GoogleMaps;
  paths: Array<LatLngLiteral> = [
      { lat: -24.9482928,  lng: -53.4416913 },
      { lat: -24.9400000,  lng: -53.4459000 },
      { lat: -24.9498000,  lng: -53.4459000 },
      { lat: -24.9498000,  lng: -53.4400000 },
      { lat: -24.9400000,  lng: -53.4400000 }
    ]

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }
  
  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: true
    });
  }
  
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  
  markers: marker[] = [
	  {
		  lat: this.lat,
		  lng: this.lng,
		  label: 'A',
		  draggable: true
	  },
	  {
		  lat: -24.9452910,
		  lng: -53.4436913,
		  label: 'B',
		  draggable: false
	  }
  ]
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
	draggable: boolean;
}*/
}
