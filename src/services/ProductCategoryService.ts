
import { inject, injectable } from "inversify";
import { IProductCategoryRepository, IProductCategoryService } from "../config/interfaces";
import TYPES from "../config/types";
import ProductCategory from "../models/ProductCategory";

@injectable()
class ProductCategoryService implements IProductCategoryService {
  private productCategoryRepository: IProductCategoryRepository;

  constructor(@inject(TYPES.IProductCategoryRepository) productCategoryRepository: IProductCategoryRepository) {
    this.productCategoryRepository = productCategoryRepository;
  }

  async getAllProductCategories(): Promise<ProductCategory[]> {
    const result = await this.productCategoryRepository.getAllProductCategories();
    return result;
  };

  async addProductCategory(productCategory: ProductCategory) {
    return await this.productCategoryRepository.addProductCategory(productCategory);
  }
}

export default ProductCategoryService;
