import { Injectable } from '@angular/core';
import { Productos } from '../shared/models/Productos';
import { sample_foods } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor() { }

  getAll():Productos[]{
    return sample_foods;
  }

  getProductoById(productoId:string):Productos{
    return this.getAll().find(producto => producto.id ==productoId) ?? new Productos();
  }
}
