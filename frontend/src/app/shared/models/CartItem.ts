import { Productos } from "./Productos";

export class CartItem{
    constructor(public producto:Productos){
    }
    quantity:number=1;
    price:number = this.producto.price;
}