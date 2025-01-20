import { Component, OnInit } from '@angular/core';
import { Product } from '../../../interfaces/products.interface';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/products.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [FormsModule,NgFor,NgIf],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export default class ListProductsComponent implements OnInit {
  listProducts: Product[] = [];
  loading: boolean = false;
  showAddProductForm: boolean = false;
  
  // Objeto para el nuevo producto
  newProduct: Product = {
    id: 0,  // Esto podría ser nulo porque se genera automáticamente al agregar el producto
    name: '',
    description: '',
    price: 0,
    stock: 0,
    discount_price: 0,
    brand: { id:0,name: '' },
    size: { id:0,size: '' },
    category: {id:0, name: '' }
  };

  brands: { id: number, name: string }[] = [];  // Lista de marcas
  sizes: { id: number, size: string }[] = [];   // Lista de tamaños
  categories: { id: number, name: string }[] = [];  // Lista de categorías

  constructor(private _productService: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListProducts();
  }

  // Obtener lista de productos
  getListProducts() {
    this.loading = true;
    this._productService.getListProducts().subscribe((data: Product[]) => {
      this.listProducts = data;
      this.loading = false;
    });
  }


  // Método para agregar un producto
  addProduct() {
    this.loading = true;
    this._productService.addProduct(this.newProduct).subscribe(() => {
      this.toastr.success('Producto agregado con éxito', 'Producto Agregado');
      this.getListProducts();  // Recargar la lista de productos
      this.resetForm();
      this.showAddProductForm = false;  // Ocultar el formulario
    });
  }

  // Resetea el formulario
  resetForm() {
    this.newProduct = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      stock: 0,
      discount_price: 0,
      brand: { id: 0,name: '' },
      size: { id: 0,size: '' },
      category: {id: 0, name: '' }
    };
  }

  // Método para mostrar/ocultar el formulario
  toggleAddProductForm() {
    this.showAddProductForm = !this.showAddProductForm;
  }

  // Método para eliminar un producto
  deleteProduct(id: number) {
    this.loading = true;
    this._productService.deleteProduct(id).subscribe(() => {
      this.getListProducts();
      this.toastr.warning('Producto eliminado', 'Producto Eliminado');
    });
  }
}
