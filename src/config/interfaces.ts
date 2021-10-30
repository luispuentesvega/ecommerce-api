import ProductCategory from "../models/ProductCategory";
import { Request, Response } from 'express';

export interface IDbClient {
  connect(): any;
  queryData(tableName: string): any;
  addData(tableName: string, item: any): any;
}

// Repositories
export interface IProductCategoryRepository {
  getAllProductCategories(): Promise<ProductCategory[]>;
  addProductCategory(productCategory: ProductCategory): void;
}

// Services
export interface IProductCategoryService {
  getAllProductCategories(): Promise<ProductCategory[]>;
  addProductCategory(productCategory: ProductCategory): void;
}

// Controllers.
export interface IProductCategoryController {
  getAllProductCategories(req: Request, res: Response): Promise<Response<void>>;
  addProductCategory(req: Request, res: Response): Promise<Response<void>>;
}