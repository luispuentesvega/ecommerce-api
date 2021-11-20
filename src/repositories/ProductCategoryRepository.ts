import { inject, injectable } from "inversify";
import ProductCategory from "../models/ProductCategory";
import { IDbClient, IProductCategoryRepository } from "../config/interfaces";
import TYPES from "../config/types";

const TABLE_NAME = 'ProductCategory';

@injectable()
export default class ProductCategoryRepository implements IProductCategoryRepository {
  constructor(@inject(TYPES.IDbClient) private dbClient: IDbClient) {
  }

  getAllProductCategories(): Promise<ProductCategory[]> {
    return this.dbClient.queryData(TABLE_NAME);
  }

  addProductCategory(productCategory: ProductCategory) {
    return this.dbClient.addData(TABLE_NAME, productCategory);
  }
}
