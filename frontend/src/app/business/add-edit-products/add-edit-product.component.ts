// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { ActivatedRoute, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Product } from '../../interfaces/products.interface';
// import { ProductService } from '../../services/products.service';
// import { NgIf } from '@angular/common'; 
// @Component({
//   selector: 'app-add-edit-product',
//   standalone: true,
//   templateUrl: './add-edit-product.component.html',
//   styleUrls: ['./add-edit-product.component.css'],
//   imports: [ReactiveFormsModule, NgIf]
// })
// export class AddEditProductComponent implements OnInit {
//   form: FormGroup;
//   loading: boolean = false;
//   id: number;
//   operacion: string = 'Agregar ';

//   constructor(
//     private fb: FormBuilder,
//     private productService: ProductService,
//     private router: Router,
//     private toastr: ToastrService,
//     private aRouter: ActivatedRoute
//   ) {
//     this.form = this.fb.group({
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       price: [null, Validators.required],
//       stock: [null, Validators.required],
//     });
//     this.id = Number(aRouter.snapshot.paramMap.get('id'));
//   }

//   ngOnInit(): void {
//     if (this.id != 0) {
//       this.operacion = 'Editar ';
//       this.getProduct(this.id);
//     }
//   }

//   getProduct(id: number) {
//     this.loading = true;
//     this.productService.getProduct(id).subscribe((data: Product) => {
//       this.loading = false;
//       this.form.setValue({
//         name: data.name,
//         description: data.description,
//         price: data.price,
//         stock: data.stock,
//       });
//     });
//   }

//   addProduct() {
//     const product: Product = {
//       name: this.form.value.name,
//       description: this.form.value.description,
//       price: this.form.value.price,
//       stock: this.form.value.stock,
//       discount_price: this.form.value.discount_price,
//       brand: {
//         name: ''
//       },
//       size: {
//         size: ''
//       },
//       category: {
//         name: ''
//       }
//     };
//     this.loading = true;

//     if (this.id !== 0) {
//       product.id = this.id;
//       this.productService.updateProduct(this.id, product).subscribe(() => {
//         this.toastr.info(
//           `El producto ${product.name} fue actualizado con éxito`,
//           'Producto actualizado'
//         );
//         this.loading = false;
//         this.router.navigate(['/']);
//       });
//     } else {
//       this.productService.saveProduct(product).subscribe(() => {
//         this.toastr.success(
//           `El producto ${product.name} fue registrado con éxito`,
//           'Producto registrado'
//         );
//         this.loading = false;
//         this.router.navigate(['/']);
//       });
//     }
//   }
// }
