import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderDetail } from '../../../interfaces/order-details.interface';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailService } from '../../../services/order-details.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-order-details',
  standalone:true,
  imports: [NgIf,NgFor, FormsModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export default class ListOrderDetailService implements OnInit {
  listOrderDetails: OrderDetail[] = []
  loading: boolean = false;

  constructor(private _orderDetailService: OrderDetailService, private toastr: ToastrService) { }
  

  ngOnInit(): void {
    this.getListOrderDetails();
  }

  getListOrderDetails() {
    this.loading = true;

    this._orderDetailService.getListOrderDetails().subscribe((data: OrderDetail[]) => {
      this.listOrderDetails = data;
      this.loading = false;
    })
  }

  deleteOrderDetail(id: number) {
    this.loading = true;
    this._orderDetailService.deleteOrderDetail(id).subscribe(() => {
      this.getListOrderDetails();
      this.toastr.warning('La orden fue eliminado con exito', 'Orden eliminado');
    })
  }
}

