import { Component, OnInit } from '@angular/core';
import { Size } from '../../../interfaces/sizes.interface';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SizeService } from '../../../services/sizes.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sizes',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './sizes.component.html',
  styleUrl: './sizes.component.css'
})
export default class ListSizesComponent implements OnInit {
  listSizes: Size[] = [];
  originalSizes: Size[] = [];
  loading: boolean = false;
  newSize: Size = { id: 0, size: '', editing: false };

  constructor(private _sizeService: SizeService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getListSizes();
  }

  getListSizes() {
    this.loading = true;
    this._sizeService.getListSizes().subscribe((data: Size[]) => {
      this.listSizes = data;
      this.originalSizes = JSON.parse(JSON.stringify(data));
      this.loading = false;
    });
  }

  addSize() {
    if (!this.newSize.size.trim()) {
      this.toastr.error('El tamaño no puede estar vacío');
      return;
    }
    this.loading = true;
    this._sizeService.saveSize(this.newSize).subscribe(() => {
      this.toastr.success('Tamaño agregado con éxito');
      this.getListSizes();
      this.newSize = { id: 0, size: '', editing: false };
      this.loading = false;
    });
  }

  editSize(size: Size) {
    size.editing = true;
  }

  saveSize(size: Size) {
    this.loading = true;
    this._sizeService.updateSize(size.id, size).subscribe(() => {
      size.editing = false;
      this.toastr.success('Tamaño actualizado con éxito');
      this.loading = false;
    });
  }

  cancelEdit(size: Size) {
    const index = this.listSizes.findIndex(s => s.id === size.id);
    this.listSizes[index] = { ...this.originalSizes[index] };
    size.editing = false;
  }

  deleteSize(id: number) {
    this.loading = true;
    this._sizeService.deleteSize(id).subscribe(() => {
      this.toastr.success('Tamaño eliminado con éxito');
      this.getListSizes();
    });
  }
}
