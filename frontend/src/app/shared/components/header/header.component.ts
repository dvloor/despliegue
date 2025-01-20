import { Component } from '@angular/core';
import { SidebarService } from '../../../services/sidebar.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private sidebarService: SidebarService, private authService: AuthService, private router: Router) {}

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  onLogout(): void {
    this.authService.logout();  // Llamar al método logout
    this.router.navigate(['/login']);  // Redirigir al usuario a la página de login después de cerrar sesión
  }
}