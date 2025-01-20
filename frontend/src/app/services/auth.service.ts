import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth/login';  // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  login(user: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { user, password });
  }

  saveToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('auth_token');  // Eliminar el token de localStorage
    this.toastr.info('Has cerrado sesión exitosamente', 'Sesión cerrada', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
    });
  }

  showSuccess(message: string) {
    this.toastr.success(message, '¡Éxito!', {
      timeOut: 3000,  // Tiempo en ms que la notificación permanecerá visible
      positionClass: 'toast-bottom-right',  // Posición en pantalla
      progressBar: true,  // Barra de progreso
      closeButton: true,  // Botón para cerrar la notificación
      tapToDismiss: true,  // Cerrar al hacer clic
      progressAnimation: 'increasing',  // Animación de la barra de progreso
    });
  }

  showError(message: string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      progressBar: true,
      closeButton: true,
      tapToDismiss: true,
      progressAnimation: 'decreasing',
    });
  }
}
