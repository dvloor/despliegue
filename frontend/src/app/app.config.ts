import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    CommonModule,
    provideAnimations(),
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(),
    provideZoneChangeDetection({ eventCoalescing: true }) 
    ]
};
