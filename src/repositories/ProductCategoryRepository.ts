import { inject, injectable } from "inversify";
import ProductCategory from "../models/ProductCategory";
import { IDbClient, IProductCategoryRepository } from "../config/interfaces";
import TYPES from "../config/types";
import { config } from "aws-sdk";

require('dotenv').config();

config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const TABLE_NAME = 'ProductCategory';

@injectable()
export default class ProductCategoryRepository implements IProductCategoryRepository {
  @inject(TYPES.IDbClient) private _dbClient: IDbClient;

  async getAllProductCategories(): Promise<ProductCategory[]> {
    return await this._dbClient.queryData(TABLE_NAME);
  }

  async addProductCategory(productCategory: ProductCategory) {
    return await this._dbClient.addData(TABLE_NAME, productCategory);
  }
}