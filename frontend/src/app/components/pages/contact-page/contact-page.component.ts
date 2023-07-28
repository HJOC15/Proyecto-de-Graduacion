import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/shared/models/Order';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit{

  order:Order = new Order();
  constructor(orderService: OrderService, router:Router){
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) =>{
        this.order = order;
      },
      error:()=>{
        router.navigateByUrl('/checkout')
      }
    })
  }

  ngOnInit(): void {
  }

}
