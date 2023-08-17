import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit{

  order:Order[]=[];
  constructor(private orderservice:OrderService, private router:Router){
    let orderObservable:Observable<Order[]>
    orderObservable = orderservice.getAllOrders();

    orderObservable.subscribe((serverOrder) =>{
      this.order = serverOrder;
    })

  }
  navigateToOrderDetail(orderId: number): void {
    this.router.navigate(['/order', orderId]);
  }

  ngOnInit(): void {
    
  }
  
  }
