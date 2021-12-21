import "reflect-metadata";
import { DynamoDB } from "aws-sdk";
import { DynamoClient } from "../../src/config/DynamoClient";
import ProductCategory from "../../src/models/ProductCategory";
import { DbResult } from "../../src/config/types";

// Sinon
const mockedItems = () => [{ id: "1", name: "laptop" }];

jest.mock("aws-sdk", () => {
  const documentClient = {
    get: jest.fn(),
    scan: jest.fn(() => ({
      promise: jest.fn(() =>
        Promise.resolve({
          Items: mockedItems(),
          Count: 1,
          ScannedCount: 1,
        })
      ),
    })),
    put: jest.fn(() => ({ promise: jest.fn(() => { }) })),
  };
  const mDynamoDB = {
    DocumentClient: jest.fn(() => documentClient),
  };
  return { DynamoDB: mDynamoDB };
});

describe("# DynamoClient", () => {
  let mockDynamoClient: DynamoDB.DocumentClient;
  let dynamoClient: DynamoClient;

  let items = mockedItems(); // @TODO: Modify the items
  beforeEach(() => {
    mockDynamoClient = new DynamoDB.DocumentClient();
    dynamoClient = new DynamoClient(mockDynamoClient);
  });

  it("should map data succesfully", () => {
    const dbResponse = {
      items: items,
      count: 2,
      scannedCount: 2,
    } as DbResult<ProductCategory>;

    const mappedData = dynamoClient.mapData<ProductCategory>(dbResponse);

    expect(mappedData).toEqual({
      data: items,
      count: 2,
    });
  });

  it("should not match the expected response with the actual one when give wrong values", () => {
    const dbResponse = {
      items: items,
      count: 12,
      scannedCount: 2,
    } as DbResult<ProductCategory>;

    const mappedData = dynamoClient.mapData<ProductCategory>(dbResponse);

    expect(mappedData).not.toEqual({
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
    const item = mockedItems()[0];

    await dynamoClient.addData("ProductCategory", item);

    expect(mockDynamoClient.put).toHaveBeenCalledWith({
      TableName: "ProductCategory",
      Item: item,
    });
  });
});
