import { Component, OnInit } from '@angular/core';
import { Customer } from '../../../interfaces/customers.interface';
import { NgFor, NgIf } from '@angular/common';
import { NgControlStatusGroup } from '@angular/forms';
import { CustomerService } from '../../../services/customers.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export default class ListCustomersComponent implements OnInit {
  listCustomers: Customer[] = []
  loading: boolean = false;

  constructor(private _customerService: CustomerService, private toastr: ToastrService) { }
  

  ngOnInit(): void {
    this.getListCustomers();
  }

  getListCustomers() {
    this.loading = true;

    this._customerService.getListCustomer().subscribe((data: Customer[]) => {
      this.listCustomers = data;
      this.loading = false;
    })
  }

  deleteCustomer(id: number) {
    this.loading = true;
    this._customerService.deleteCustomer(id).subscribe(() => {
      this.getListCustomers();
      this.toastr.warning('El producto fue eliminado con exito', 'Producto eliminado');
    })
  }
}
