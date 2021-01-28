import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Client} from '../models/Client/client.model';
import {Product} from '../models/Product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = "https://localhost:5001/api";

  constructor(private httpClient: HttpClient) { }

  /**
   * Get all API products
   */
  getProducts() {
    return this.httpClient.get(this.url+"/products");
  }

  /**
   * Save a new product
   *
   * @param product
   */
  addProduct(product: Product)
  {
    return this.httpClient.post(this.url+"/products", product);
  }

  /**
   * Delete a product
   *
   * @param id
   */
  deleteProduct(id)
  {
    return this.httpClient.delete(`${this.url}/products/${id}`, {responseType: 'text'});
  }

  /**
   * Update a new product
   *
   * @param pr
   */
  updateProduct(pr:Product) {
    let product = {
      name: pr.name,
      price: pr.price,
      categoryId: pr.categoryId
    };
    return this.httpClient.put(`${this.url}/products/${pr.productId}`, product);
  }
}
