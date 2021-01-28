import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClientComponent} from './components/client/client.component';
import {ProductsComponent} from './components/products/products.component';
import {CategoriesComponent} from './components/categories/categories.component';

const routes: Routes = [
  {
    path: "",
    component: ClientComponent
  },
  {
    path : "clients",
    component : ClientComponent
  },
  {
    path : "products",
    component: ProductsComponent
  },
  {
    path: "categories",
    component: CategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
