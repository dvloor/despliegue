import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { OrderDetail } from '../interfaces/order-details.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/order-details'
  }

  getListOrderDetails(): Observable<OrderDetail[]> {
   return this.http.get<OrderDetail[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteOrderDetail(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveOrderDetail(orderDetail: OrderDetail): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`,orderDetail)
  }

  getOrderDetail(id: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateOrderDetail(id: number, orderDetail: OrderDetail): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, orderDetail);
  }
}
