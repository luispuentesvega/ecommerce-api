import { inject, injectable } from "inversify";
import ProductCategory from "../models/ProductCategory";
import { IDbClient, IProductCategoryRepository } from "../config/interfaces";
import TYPES from "../config/types";

const TABLE_NAME = 'ProductCategory';

@injectable()
export default class ProductCategoryRepository implements IProductCategoryRepository {
  private dbClient: IDbClient;

  constructor(@inject(TYPES.IDbClient) dbClient: IDbClient) {
    this.dbClient = dbClient;
  }

  async getAllProductCategories(): Promise<ProductCategory[]> {
    return await this.dbClient.queryData(TABLE_NAME);
  }

  async addProductCategory(productCategory: ProductCategory) {
    return await this.dbClient.addData(TABLE_NAME, productCategory);
  }
}
