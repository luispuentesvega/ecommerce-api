import { Service } from "typedi";
import ProductCategory from "../models/ProductCategory";
const { DynamoDB } = require('../config/DynamoDB');

const TABLE_NAME = "ProductCategory";

@Service()
class ProductCategoryRepository {
  private readonly productCategories: ProductCategory[] = [
  ];

  async getAllProductCategories(): Promise<ProductCategory[]> {
    return this.productCategories;
  }

  async addOrUpdate(productCategory: ProductCategory) {
    const params = {
      TableName: TABLE_NAME,
      Item: productCategory
    };
    const dynamoClient = DynamoDB.getInstance();
    return await dynamoClient.put(params).promise();
  }
};

export default ProductCategoryRepository;