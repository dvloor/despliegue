// src/app/components/shared/sidebar.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isVisible = new BehaviorSubject<boolean>(true);
  sidebarVisibility$ = this.isVisible.asObservable();

  toggleSidebar(): void {
    this.isVisible.next(!this.isVisible.value);
  }
}