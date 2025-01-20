import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../app/login/auth.guard';

export const routes: Routes = [
    // Ruta pública para login
    {
        path: 'login',
        component: LoginComponent
    },

    // Rutas privadas protegidas con AuthGuard
    {
        path: '',
        canActivate: [AuthGuard], // Protege todas las rutas hijas
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component')
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/reportes/reportes.component')
            },
            {
                path: 'orders',
    loadComponent: () => import('./business/orders/orders.component'),
    children: [
        {
            path: 'order-details',
            loadComponent: () => import('./business/orders/order-details/order-details.component')
        }
    ]
            },
            {
                path: 'table',
                loadComponent: () => import('./business/table/table.component'),
                children: [
                    {
                        path: '',
                        redirectTo: 'products',
                        pathMatch: 'full'
                    },
                    {
                        path: 'products',
                        loadComponent: () => import('./business/table/products/products.component')
                    },
                    {
                        path: 'customers',
                        loadComponent: () => import('./business/table/customers/customers.component')
                    },
                    {
                        path: 'brands',
                        loadComponent: () => import('./business/table/brands/brands.component')
                    },
                    {
                        path: 'categories',
                        loadComponent: () => import('./business/table/categories/categories.component')
                    },
                    {
                        path: 'sizes',
                        loadComponent: () => import('./business/table/sizes/sizes.component')
                    }
                ]
            },
            {
                path: 'settings',
                loadComponent: () => import('./shared/components/header/settings/settings.component')
            },
            {
                path: '',  // Redirige al dashboard por defecto si no se especifica ruta
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },

    // Ruta comodín para cualquier URL no encontrada
    {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
    }
];
