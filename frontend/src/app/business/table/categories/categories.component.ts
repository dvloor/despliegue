import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../interfaces/categories.interface';
import { CategoryService } from '../../../services/categories.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export default class ListCategoriesComponentt implements OnInit {
  listCategories: Category[] = []
  originalCategories: Category[] = [];
  loading: boolean = false;
  newCategory: Category = { id: 0, name: '', editing: false };
  
  constructor(private _categoryService: CategoryService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.getListCategories();
  }

  getListCategories() {
    this.loading = true;

    this._categoryService.getListCategory().subscribe((data: Category[]) => {
      this.listCategories = data;
      this.originalCategories = JSON.parse(JSON.stringify(data));
      this.loading = false;
      
      
    })
  }
  editCategory(category: Category) {
    category.editing = true;
  }
  saveCategory(category: Category) {
    this.loading = true;
    this._categoryService.updateCategory(category.id, category).subscribe(() => {
      category.editing = false;
      this.loading = false;
    });
  }
  cancelEdit(category: Category) {
    const index = this.listCategories.findIndex(b => b.id === category.id);
    this.listCategories[index] = { ...this.originalCategories[index] };
    category.editing = false;
  }
  deleteCategory(id: number) {
    this.loading = true;
    this._categoryService.deleteCategory(id).subscribe(() => {
      this.getListCategories();
      this.toastr.warning('La categoría fue eliminada con exito', 'Categoría eliminada');
    })
  }
  addCategory() {
    if (!this.newCategory.name.trim()) {
      this.toastr.error('El nombre de la categoría no puede estar vacío');
      return;
    }
    this.loading = true;
    this._categoryService.saveCategory(this.newCategory).subscribe(() => {
      this.toastr.success('Marca agregada con éxito');
      this.getListCategories();
      this.newCategory = { id: 0, name: '', editing: false };
      this.loading = false;
    });
  }
}
