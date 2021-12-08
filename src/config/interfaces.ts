import ProductCategory from "../models/ProductCategory";
import { Request, Response } from 'express';
import { QueryData } from "./types";

type DbResult<T> = {
  Items: Array<T>;
  Count: number;
  ScannedCount: number;
};

export interface IDbClient {
  queryData<T>(tableName: string): Promise<QueryData<T>>;
  mapData<T>(data: DbResult<T>): QueryData<T>;
  addData<T>(tableName: string, item: T): Promise<{}>;
}

// Repositories
export interface IProductCategoryRepository {
  getAllProductCategories<T>(): Promise<QueryData<T>>;
  addProductCategory(productCategory: ProductCategory): void;
}

// Services
export interface IProductCategoryService {
  getAllProductCategories<T>(): Promise<QueryData<T>>;
  addProductCategory(productCategory: ProductCategory): void;
}

// Controllers
export interface IProductCategoryController {
  getAllProductCategories(req: Request, res: Response): Promise<Response<void>>;
  addProductCategory(req: Request, res: Response): Promise<Response<void>>;
}
