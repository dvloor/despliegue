import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Customer } from '../interfaces/customers.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/customers'
  }
  getListCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveCustomer(customer: Customer): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, customer)
  }

  getCustomer(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateCustomer(id: number, customer: Customer): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, customer);
  }
}
