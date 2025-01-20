import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Brand } from '../interfaces/brands.interface';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private myAppUrl: string;
  private myApiUrl: string;

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/brands'
  }
  getListBrand(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteBrand(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  saveBrand(brand: Brand): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, brand)
  }

  getBrand(id: number): Observable<Brand> {
    return this.http.get<Brand>(`${this.myAppUrl}${this.myApiUrl}/${id}`)
  }

  updateBrand(id: number, brand: Brand): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, brand);
  }
}
