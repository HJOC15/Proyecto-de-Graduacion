import { Injectable } from '@angular/core';
import { LatLng, LatLngLiteral } from 'leaflet';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
//Esto de acá es lo que permite obtener la posición actual de la computadora
  getCurrentLocation(): Observable<LatLngLiteral>{
    return new Observable((observer) =>{
      if(!navigator.geolocation)  return ;

      return navigator.geolocation.getCurrentPosition(
        (pos) =>{
          observer.next({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          })
        },
        (error) => {
          observer.error(error);
        }
      )
    })
  }
}
