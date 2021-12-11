import "reflect-metadata";
import { DynamoDB } from "aws-sdk";
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

describe('# ProductCategoryRepository', () => {
  let mockDynamoClient: DynamoDB.DocumentClient;
  let dynamoClient: DynamoClient;

  beforeEach(() => {
    mockDynamoClient = new DynamoDB.DocumentClient();
    dynamoClient = new DynamoClient(mockDynamoClient);
  });

  it('should call queryData when calling getAllProductCategories', async () => {
    let dynamoClient = new DynamoClient(mockDynamoClient);
    dynamoClient.queryData = jest.fn();
    const productCategoryRepository = new ProductCategoryRepository(dynamoClient);

    await productCategoryRepository.getAllProductCategories();

    expect(dynamoClient.queryData).toHaveBeenCalled();
  });

  it('should call addData with correct paremeters when calling addProductCategory', async () => {
    let dynamoClient = new DynamoClient(mockDynamoClient);
    dynamoClient.addData = jest.fn();
    const productCategoryRepository = new ProductCategoryRepository(dynamoClient);

    const productCategoryPayload = {
      id: "1",
      name: "laptop"
    };

    await productCategoryRepository.addProductCategory(productCategoryPayload);

    expect(dynamoClient.addData).toHaveBeenCalledWith('ProductCategory', productCategoryPayload);
  });
});