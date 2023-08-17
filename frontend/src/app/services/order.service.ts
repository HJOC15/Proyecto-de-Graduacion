import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ALL_ORDER, ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL, ORDER_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  
  constructor(private http: HttpClient) { 
    
  }
  create (order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }
  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL)
  }
  pay(order:Order):Observable<string>{
    return this.http.post<string>(ORDER_PAY_URL,order);
  }

  trackOrderById(id:string): Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }
        
  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(ALL_ORDER);
  }
  updateOrderStatus(orderId: number, newStatus: string): Observable<Order> {
    const updateUrl = `${ORDER_URL}/updateStatus/${orderId}`;
    return this.http.post<Order>(updateUrl, { newStatus });
  }
  getOrdersForCurrentUser(): Observable<Order[]> {
    return this.http.get<Order[]>(ORDER_URL + '/myOrders');
  }
}



