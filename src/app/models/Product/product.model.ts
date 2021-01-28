export class Product {
  productId: number;
  name: string;
  price: number;
  categoryId: number;
  category: {
    categoryId: number;
    categoryName: string;
  };
}
