import { Injectable } from '@angular/core';
import {Category} from '../models/Category/category.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = "https://localhost:5001/api";

  constructor(private httpClient: HttpClient) { }

  /**
   * Get all API categories
   */
  getCategories() {
    return this.httpClient.get(this.url+"/categories");
  }

  /**
   * Save a new category
   *
   * @param category
   */
  addCategory(category: Category)
  {
    return this.httpClient.post(this.url+"/categories", category);
  }

  /**
   * Delete a category
   *
   * @param id
   */
  deleteCategory(id)
  {
    return this.httpClient.delete(`${this.url}/categories/${id}`, {responseType: 'text'});
  }

  /**
   * Update a new category
   *
   * @param ct
   */
  updateCategory(ct:Category) {
    return this.httpClient.put(`${this.url}/categories/${ct.categoryId}`, ct);
  }

}
