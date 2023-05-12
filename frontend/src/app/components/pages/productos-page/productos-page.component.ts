import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductosService } from 'src/app/services/productos.service';
import { Productos } from 'src/app/shared/models/Productos';

@Component({
  selector: 'app-productos-page',
  templateUrl: './productos-page.component.html',
  styleUrls: ['./productos-page.component.css']
})
export class ProductosPageComponent {
  producto!:Productos;
  constructor(activatedRoute:ActivatedRoute, productosService:ProductosService,
    private cartService:CartService, private router: Router){
    activatedRoute.params.subscribe((params) =>{
      if(params['id'])
      productosService.getProductoById(params['id']).subscribe(serverProducto =>{
        this.producto = serverProducto
      })
    })
  }
  ngOnInit(): void{
    
  }

  addToCart(){
    this.cartService.addToCart(this.producto);
    this.router.navigateByUrl('/cart-page')
  }

}
