import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { Order } from '../../../shared/models/Order';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  order: Order | undefined;

  constructor(private route: ActivatedRoute, private orderService: OrderService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const orderId = params.get('id');
      if (orderId) {
        this.orderService.trackOrderById(orderId).subscribe(order => {
          this.order = order;
        });
      }
    });
  }

  updateOrderStatus(newStatus: string): void {
    if (this.order) {
      this.orderService.updateOrderStatus(this.order.id, newStatus).subscribe(updatedOrder => {
        this.order = updatedOrder;
      });
    }
  }




}