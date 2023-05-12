import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/app/shared/models/Cart';
import { CartItem } from 'src/app/shared/models/CartItem';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!: Cart
  constructor(private cartService:CartService){
    this.cartService.getCartObservable( ).subscribe((cart) =>{
      this.cart = cart;
    })
  }

  ngOnInit(): void{

  }

  removeFromCart(cartitem:CartItem){
    this.cartService.removeFromCart(cartitem.producto.id) 
  }

  changeQuantity(cartitem:CartItem,quantityInString:string){
    const quantity = parseInt(quantityInString)
    this.cartService.changeQuantitty(cartitem.producto.id, quantity)
  }

}
