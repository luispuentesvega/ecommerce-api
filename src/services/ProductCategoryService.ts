
import { inject, injectable } from "inversify";
import { IProductCategoryRepository, IProductCategoryService } from "../config/interfaces";
import TYPES from "../config/types";
import ProductCategory from "../models/ProductCategory";

@injectable()
class ProductCategoryService implements IProductCategoryService {
  @inject(TYPES.IProductCategoryRepository) private _productCategoryRepository: IProductCategoryRepository;

  async getAllProductCategories(): Promise<ProductCategory[]> {
    const result = await this._productCategoryRepository.getAllProductCategories();
    return result;
  };

  async addProductCategory(productCategory: ProductCategory) {
    return await this._productCategoryRepository.addProductCategory(productCategory);
  }
}

export default ProductCategoryService;