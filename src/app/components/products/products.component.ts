import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/Product/product.model';
import {ToastrService} from 'ngx-toastr';
import {ProductService} from '../../services/product.service';
import {NgForm} from '@angular/forms';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  products: any;
  product: Product;
  editMode = false;
  categories: any;

  constructor(private productService: ProductService,
              private toastr : ToastrService,
              private categoryService: CategoryService) {
    this.product = new Product();
    this.categories = this.categoryService.getCategories();
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts()
  {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  /**
   *
   * @param product
   * @param myForm
   */
  saveProduct(product: Product, myForm:NgForm)
  {
    // Check if it's an update or insert
    if (this.editMode) {
      console.log(product);
      this.updateProduct(product);
      this.toastr.success("Product modified successfully !", 'Product Modified !');
      this.editMode = false;
    } else {
      console.log(product);
      this.productService.addProduct(product).subscribe(data => {
        myForm.resetForm();
        this.toastr.success("Product added successfully !", 'Product Registered !');
        this.getAllProducts();
      }, err => {
        console.log(err);
      });
    }
  }

  /**
   *
   * @param product
   */
  updateProduct(product:Product)
  {
    this.productService.updateProduct(product).subscribe((data) => {
      this.products.forEach((pr) => {
        if (pr.productId == product.productId) {
          pr = product;
          this.getAllProducts();
        }
      })
    });
  }

  /**
   * Delete a product
   *
   * @param id
   */
  deleteProduct(id)
  {
    this.productService.deleteProduct(id)
      .subscribe((data) => {
        this.products = this.products.filter(c => c.productId != id);
        this.toastr.success("Product deleted successfully !", 'Product deleted !');
      })
  }

  /**
   * Modify product
   */
  modifyProduct(pr:Product)
  {
    this.product= pr;
    this.editMode = true;
  }
}
