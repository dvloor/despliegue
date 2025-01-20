import { Component } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  menuOpen = false;

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    logout() {
        console.log('Cerrando sesión...');
        // Aquí iría la lógica para cerrar sesión
    }
}
