import { Injectable } from '@angular/core';
import { Productos } from '../shared/models/Productos';
import { sample_foods } from 'src/data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PRODUCTOS_BY_ID_URL, PRODUCTOS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Productos[]>{
    return this.http.get<Productos[]>(PRODUCTOS_URL);
  }

  getProductoById(productoId:string):Observable<Productos>{
    return this.http.get<Productos>(PRODUCTOS_BY_ID_URL + productoId);
  }
}
