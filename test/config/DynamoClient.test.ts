import "reflect-metadata";
import { DynamoDB } from "aws-sdk";
import { DynamoClient } from "../../src/config/DynamoClient";
import ProductCategory from "../../src/models/ProductCategory";
import { DbResult } from "../../src/config/types";

jest.mock("aws-sdk", () => {
  const documentClient = {
    get: jest.fn(),
    scan: jest.fn(() => ({
      promise: jest.fn(() =>
        Promise.resolve({
          Items: [{ id: "1", name: "laptop" }],
          Count: 1,
          ScannedCount: 1,
        })
      ),
    })),
    put: jest.fn(() => ({ promise: jest.fn(() => {}) })),
  };
  const mDynamoDB = {
    DocumentClient: jest.fn(() => documentClient),
  };
  return { DynamoDB: mDynamoDB };
});

describe("# DynamoClient", () => {
  let mockDynamoClient: DynamoDB.DocumentClient;
  let dynamoClient: DynamoClient;

  let items = [{ id: "1", name: "laptop" }, { id: "2", name: "smarthpone" }];
  beforeEach(() => {
    mockDynamoClient = new DynamoDB.DocumentClient();
    dynamoClient = new DynamoClient(mockDynamoClient);
  });

  it("should map data succesfully", () => {
    const dbResponse = {
      Items: items,
      Count: 2,
      ScannedCount: 2,
    } as DbResult<ProductCategory>;

    const mappedData = dynamoClient.mapData<ProductCategory>(dbResponse);

    expect(mappedData).toEqual({
      data: items,
      count: 2,
    });
  });

  it("should call scan dynamo function when calling queryData", async () => {
    await dynamoClient.queryData("ProductCategory");

    expect(mockDynamoClient.scan).toHaveBeenCalledWith({
      TableName: "ProductCategory",
    });
  });

  it("should call put with parameters when calling addData", async () => {
    const item = {
      id: "1",
      name: "laptop",
    };

    await dynamoClient.addData("ProductCategory", item);

    expect(mockDynamoClient.put).toHaveBeenCalledWith({
      TableName: "ProductCategory",
      Item: item,
    });
  });
});
