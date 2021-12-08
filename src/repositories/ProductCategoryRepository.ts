import { inject, injectable } from "inversify";
import ProductCategory from "../models/ProductCategory";
import { IDbClient, IProductCategoryRepository } from "../config/interfaces";
import TYPES, { QueryData } from "../config/types";

const TABLE_NAME = 'ProductCategory';

@injectable()
export default class ProductCategoryRepository implements IProductCategoryRepository {
  constructor(@inject(TYPES.IDbClient) private dbClient: IDbClient) {
  }

  getAllProductCategories<T>(): Promise<QueryData<T>> {
    return this.dbClient.queryData<T>(TABLE_NAME);
  }

  addProductCategory(productCategory: ProductCategory) {
    return this.dbClient.addData(TABLE_NAME, productCategory);
  }
}
