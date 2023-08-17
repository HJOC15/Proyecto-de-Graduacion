import { Component, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'order-person',
  templateUrl: './order-person.component.html',
  styleUrls: ['./order-person.component.css']
})
export class OrderPersonComponent implements OnInit {
  orders: Order[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrdersForCurrentUser();
  }

  loadOrdersForCurrentUser() {
    this.orderService.getOrdersForCurrentUser().subscribe(
      (orders: Order[]) => {
        this.orders = orders;
      },
      (error) => {
        console.error('Error fetching orders:', error);
      }
    );
  }
}