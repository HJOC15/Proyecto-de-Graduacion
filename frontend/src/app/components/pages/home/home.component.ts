import { Component, OnInit } from '@angular/core';
import { ProductosService } from 'src/app/services/productos.service';
import { Productos } from 'src/app/shared/models/Productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  productos:Productos[]=[];
  constructor(private productosservice:ProductosService, private router:Router){
    this.productos = productosservice.getAll();

  }
  ngOnInit(): void {
    
  }
  navigateToCart() {
    this.router.navigate(['cart-page']);
  }
  

}
