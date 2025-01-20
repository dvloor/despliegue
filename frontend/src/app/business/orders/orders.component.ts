import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Order } from '../../../app/interfaces/orders.interface';
import { OrderDetail } from '../../interfaces/order-details.interface';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../../src/app/services/orders.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export default class ListOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = false;
  isInOrderDetails: boolean = false;

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.isInOrderDetails = url.some(segment => segment.path === 'order-details');
    });
    this.getListOrders();
  }

  getListOrders(): void {
    this.loading = true;
    this.orderService.getListOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data;
        this.loading = false;
      },
      error: (err) => {
        this.toastr.error('Error al cargar las órdenes', 'Error');
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }

  deleteOrder(id: number): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta orden?')) {
      return;
    }

    this.loading = true;
    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        this.getListOrders();
        this.toastr.warning('La orden fue eliminada con éxito', 'Orden eliminada');
      },
      error: (err) => {
        this.toastr.error('Error al eliminar la orden', 'Error');
        console.error('Error:', err);
        this.loading = false;
      }
    });
  }
}
