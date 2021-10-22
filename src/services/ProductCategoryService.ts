import { Service } from "typedi";

import ProductCategory from "../models/ProductCategory";
import ProductCategoryRepository from "../repositories/ProductCategoryRepository";

@Service()
class ProductCategoryService {
  constructor(private readonly productCategoryRepository: ProductCategoryRepository) { }

  async getAllProductCategories(): Promise<ProductCategory[]> {
    const result = await this.productCategoryRepository.getAllProductCategories();
    return result;
  };

  async addOrUpdate(productCategory: ProductCategory) {
    const result = await this.productCategoryRepository.addOrUpdate(productCategory);
    return result;
  }
}

export default ProductCategoryService;