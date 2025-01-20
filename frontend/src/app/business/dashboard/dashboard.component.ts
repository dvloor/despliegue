import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  totalProducts: number = 0;  // Almacenar el total de productos
  products: any[] = []; 
  constructor(private productService: ProductService, private toastr: ToastrService) {}
  ngOnInit(): void {
    // Obtener el total de productos
    this.productService.getProductCount().subscribe({
      next: (count) => {
        this.totalProducts = count.count;
      },
      error: (err) => {
        this.toastr.error('Error al obtener el total de productos');
      }
    });

    // Obtener los productos si los necesitas mostrar en el dashboard
    this.productService.getListProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        this.toastr.error('Error al obtener los productos');
      }
    });
  }
}
