import { ProductCategory } from "../../types";
import { Service } from 'typedi';

import ProductCategoryService from "../services/ProductCategoryService";
import { Request, Response } from "express";

@Service()
class ProductCategoryController {
  constructor(private readonly productCategoryService: ProductCategoryService) {
  }

  async getAllProductCategories(_req: Request, res: Response) {
    const result = await this.productCategoryService.getAllProductCategories();
    return res.json(result);
  }

  async addOrUpdate(req: Request, res: Response) {
    const { body } = req;
    const result = await this.productCategoryService.addOrUpdate(body);
    return res.json(result);
  }
}

export default ProductCategoryController;
