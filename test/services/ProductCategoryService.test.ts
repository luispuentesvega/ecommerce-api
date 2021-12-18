import "reflect-metadata";
import { DynamoDB } from "aws-sdk";
import ProductCategoryService from "../../src/services/ProductCategoryService";
import ProductCategoryRepository from "../../src/repositories/ProductCategoryRepository";
import { DynamoClient } from "../../src/config/DynamoClient";

jest.mock("aws-sdk", () => {
  const documentClient = {
    get: jest.fn(),
  };
  const mDynamoDB = {
    DocumentClient: jest.fn(() => documentClient),
  };
  return { DynamoDB: mDynamoDB };
});

describe("# ProductCategoryService", () => {
  let mockDynamoClient: DynamoDB.DocumentClient;
  let dynamoClient: DynamoClient;

  beforeEach(() => {
    mockDynamoClient = new DynamoDB.DocumentClient();
    dynamoClient = new DynamoClient(mockDynamoClient);
  });

  it("should call queryData when calling getAllProductCategories", async () => {
    let dynamoClient = new DynamoClient(mockDynamoClient);
    let productCategoryRepository = new ProductCategoryRepository(dynamoClient);
    productCategoryRepository.getAllProductCategories = jest.fn();
    const productCategoryService = new ProductCategoryService(productCategoryRepository);

    await productCategoryService.getAllProductCategories();

    expect(productCategoryRepository.getAllProductCategories).toHaveBeenCalled();
  });

  it("should call addData with correct paremeters when calling addProductCategory", async () => {
    let dynamoClient = new DynamoClient(mockDynamoClient);
    let productCategoryRepository = new ProductCategoryRepository(dynamoClient);
    productCategoryRepository.addProductCategory = jest.fn();
    const productCategoryService = new ProductCategoryService(productCategoryRepository);

    const productCategoryPayload = {
      id: "1",
      name: "laptop",
    };

    await productCategoryService.addProductCategory(productCategoryPayload);

    expect(productCategoryRepository.addProductCategory).toHaveBeenCalledWith(productCategoryPayload);
  });
});
