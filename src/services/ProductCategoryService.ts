
import { inject, injectable } from "inversify";
import { IProductCategoryRepository, IProductCategoryService } from "../config/interfaces";
import TYPES from "../config/types";
import ProductCategory from "../models/ProductCategory";

@injectable()
class ProductCategoryService implements IProductCategoryService {
  constructor(@inject(TYPES.IProductCategoryRepository) private productCategoryRepository: IProductCategoryRepository) {
  }

  getAllProductCategories(): Promise<ProductCategory[]> {
    return this.productCategoryRepository.getAllProductCategories();
  };

  addProductCategory(productCategory: ProductCategory) {
    return this.productCategoryRepository.addProductCategory(productCategory);
  }
}

export default ProductCategoryService;
