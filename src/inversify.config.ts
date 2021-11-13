import { Container } from "inversify";
import TYPES from "./config/types";
import { DynamoClient } from "./config/DynamoClient";
import { IDbClient, IProductCategoryController, IProductCategoryRepository, IProductCategoryService } from "./config/interfaces";
import ProductCategoryRepository from "./repositories/ProductCategoryRepository";
import ProductCategoryService from "./services/ProductCategoryService";
import ProductCategoryController from "./controllers/ProductCategoryController";

require('dotenv').config();

const container = new Container();

console.log('HERE:', process.env.AWS_DEFAULT_REGION);

const dbClient: IDbClient = new DynamoClient({
  region: process.env.AWS_DEFAULT_REGION || "",
  accessKeyId: process.env.AWS_ACCESS_KEY || "",
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
});

container.bind<IDbClient>(TYPES.IDbClient).toConstantValue(dbClient);
container.bind<IProductCategoryRepository>(TYPES.IProductCategoryRepository).to(ProductCategoryRepository);
container.bind<IProductCategoryService>(TYPES.IProductCategoryService).to(ProductCategoryService);
container.bind<IProductCategoryController>(TYPES.IProductCategoryController).to(ProductCategoryController);

export { container };
