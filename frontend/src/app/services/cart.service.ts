import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/Cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Productos } from '../shared/models/Productos';
import { CartItem } from '../shared/models/CartItem';
import { getLocaleCurrencyCode } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = this.getCartFromLocalStorage();
  private cartSubject:BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() { }

  addToCart(producto:Productos):void{
    let cartItem = this.cart.items.find(item=> item.producto.id === producto.id)
    if(cartItem)
    return;

    this.cart.items.push(new CartItem(producto));
    this.setCartToLocalStorage();
  }

  removeFromCart(productoId: string):void{
    this.cart.items = this.cart.items.filter(item =>item.producto.id != productoId);
    this.setCartToLocalStorage();
  }

  changeQuantitty(productoId:string, quantity:number){
    let cartItem = this.cart.items.find(item=> item.producto.id === productoId)
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.producto.price;
    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  getCart(): Cart{
    return this.cartSubject.value;
  }

  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items.
    reduce((prevSum , currentItem) => prevSum + currentItem.price, 0)
    this.cart.totalCount = this.cart.items.
    reduce((prevSum, currentItem) =>prevSum+currentItem.quantity, 0)

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('Cart');
    return cartJson? JSON.parse(cartJson): new Cart();
  }
}
