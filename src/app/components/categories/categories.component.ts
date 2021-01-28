import { Component, OnInit } from '@angular/core';
import {Category} from '../../models/Category/category.model';
import {ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../services/category.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any;
  category: Category;
  editMode = false;

  constructor(private categoryService: CategoryService, private toastr : ToastrService) {
    this.category = new Category();
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  /**
   * Get all categories
   */
  getAllCategories()
  {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });
  }

  saveCategory(category: Category, myForm:NgForm)
  {
    // Check if it's an update or insert
    if (this.editMode) {
      this.updateCategory(category);
      this.toastr.success("Category modified successfully !", 'Category Modified !');
      this.editMode = false;
    } else {
      this.categoryService.addCategory(category).subscribe(data => {
        myForm.resetForm();
        this.toastr.success("Client added successfully !", 'Client Registered !');
        this.getAllCategories();
      }, err => {
        console.log(err);
      });
    }
  }

  /**
   * Update category
   *
   * @param category
   */
  updateCategory(category:Category)
  {
    this.categoryService.updateCategory(category).subscribe((data) => {
      this.categories.forEach((cl) => {
        if (cl.categoryId == category.categoryId) {
          cl = category;
        }
      })
    });
  }

  /**
   * Delete a category
   *
   * @param id
   */
  deleteCategory(id)
  {
    this.categoryService.deleteCategory(id)
      .subscribe((data) => {
        this.categories = this.categories.filter(c => c.categoryId != id);
        this.toastr.success("Category deleted successfully !", 'Category deleted !');
      })
  }

  /**
   * Modify category
   */
  modifyCategory(ct:Category)
  {
    this.category= ct;
    this.editMode = true;
  }
}
