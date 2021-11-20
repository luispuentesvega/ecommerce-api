import { Container } from "inversify";
import TYPES from "./config/types";
import { DynamoClient } from "./config/DynamoClient";
import { IDbClient, IProductCategoryController, IProductCategoryRepository, IProductCategoryService } from "./config/interfaces";
import ProductCategoryRepository from "./repositories/ProductCategoryRepository";
import ProductCategoryService from "./services/ProductCategoryService";
import ProductCategoryController from "./controllers/ProductCategoryController";
import { DynamoDB } from "aws-sdk";
import env from './config/env';

const container = new Container();

const documentClient = new DynamoDB.DocumentClient({
  region: env.region,
  accessKeyId: env.accessKeyId,
  secretAccessKey: env.secretAccessKey
});
const dynamoClient = new DynamoClient(documentClient);

container.bind<IDbClient>(TYPES.IDbClient).toConstantValue(dynamoClient);
container.bind<IProductCategoryRepository>(TYPES.IProductCategoryRepository).to(ProductCategoryRepository);
container.bind<IProductCategoryService>(TYPES.IProductCategoryService).to(ProductCategoryService);
container.bind<IProductCategoryController>(TYPES.IProductCategoryController).to(ProductCategoryController);

export { container };
