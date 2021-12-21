import { injectable, inject } from "inversify";
import { Request, Response } from "express";
import TYPES from "../config/types";
import { IProductCategoryController, IProductCategoryService } from "../config/interfaces";

@injectable()
export default class ProductCategoryController implements IProductCategoryController {
  constructor (@inject(TYPES.IProductCategoryService) private productCategoryService: IProductCategoryService) {
  }

  async getAllProductCategories(req: Request, res: Response) {
    const result = await this.productCategoryService.getAllProductCategories();
    return res.json(result);
  }

  async addProductCategory(req: Request, res: Response) {
    const { body } = req;
    const result = await this.productCategoryService.addProductCategory(body);
    return res.json(result);
  }
}
