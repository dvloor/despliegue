import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  onLogin(): void {
    this.authService.login(this.user, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/dashboard']);  // Redirigir a la página del dashboard
        this.authService.showSuccess('¡Inicio de sesión exitoso!');  // Mostrar notificación exitosa
      },
      error: (err) => {
        this.authService.showError(err.error.msg || 'Error de autenticación');  // Mostrar notificación de error
      }
    });
  }
}
