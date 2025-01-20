import { Component, OnInit } from '@angular/core';
import { Brand } from '../../../interfaces/brands.interface';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrandService } from '../../../services/brands.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export default class ListBrandsComponent implements OnInit {
  listBrands: Brand[] = [];
  originalBrands: Brand[] = [];
  loading: boolean = false;
  newBrand: Brand = { id: 0, name: '', editing: false };

  constructor(private _brandService: BrandService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListBrands();
  }

  getListBrands() {
    this.loading = true;
    this._brandService.getListBrand().subscribe((data: Brand[]) => {
      this.listBrands = data;
      this.originalBrands = JSON.parse(JSON.stringify(data));
      this.loading = false;
    });
  }

  addBrand() {
    if (!this.newBrand.name.trim()) {
      this.toastr.error('El nombre de la marca no puede estar vacío');
      return;
    }
    this.loading = true;
    this._brandService.saveBrand(this.newBrand).subscribe(() => {
      this.toastr.success('Marca agregada con éxito');
      this.getListBrands();
      this.newBrand = { id: 0, name: '', editing: false };
      this.loading = false;
    });
  }

  editBrand(brand: Brand) {
    brand.editing = true;
  }

  saveBrand(brand: Brand) {
    this.loading = true;
    this._brandService.updateBrand(brand.id, brand).subscribe(() => {
      brand.editing = false;
      this.toastr.success('Marca actualizada con éxito');
      this.loading = false;
    });
  }

  cancelEdit(brand: Brand) {
    const index = this.listBrands.findIndex(b => b.id === brand.id);
    this.listBrands[index] = { ...this.originalBrands[index] };
    brand.editing = false;
  }

  deleteBrand(id: number) {
    this.loading = true;
    this._brandService.deleteBrand(id).subscribe(() => {
      this.toastr.success('Marca eliminada con éxito');
      this.getListBrands();
    });
  }
}
