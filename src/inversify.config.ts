import { Container } from "inversify";
import TYPES from "./config/types";
import { DynamoClient } from "./config/DynamoClient";
import { IDbClient, IProductCategoryController, IProductCategoryRepository, IProductCategoryService } from "./config/interfaces";
import ProductCategoryRepository from "./repositories/ProductCategoryRepository";
import ProductCategoryService from "./services/ProductCategoryService";
import ProductCategoryController from "./controllers/ProductCategoryController";

const container = new Container();

container.bind<IDbClient>(TYPES.IDbClient).to(DynamoClient);
container.bind<IProductCategoryRepository>(TYPES.IProductCategoryRepository).to(ProductCategoryRepository);
container.bind<IProductCategoryService>(TYPES.IProductCategoryService).to(ProductCategoryService);
container.bind<IProductCategoryController>(TYPES.IProductCategoryController).to(ProductCategoryController);

export { container };
