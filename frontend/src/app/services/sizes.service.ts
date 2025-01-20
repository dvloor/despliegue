import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Size } from '../interfaces/sizes.interface';

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  private myAppUrl: string;
  private myApiUrl: string;
  
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint;
      this.myApiUrl = 'api/sizes'
  }

  getListSizes(): Observable<Size[]> {
    return this.http.get<Size[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }

  deleteSize(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  saveSize(size: Size): Observable<void> {
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, size);
  }

  getSize(id: number): Observable<Size> {
    return this.http.get<Size>(`${this.myAppUrl}${this.myApiUrl}/${id}`);
  }

  updateSize(id: number, size: Size): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}/${id}`, size);
  }
}
