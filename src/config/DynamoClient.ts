import { IDbClient } from "./interfaces";
import { injectable } from "inversify";
import { DynamoDB } from "aws-sdk";

@injectable()
export class DynamoClient implements IDbClient {
  constructor(private instance: DynamoDB.DocumentClient) {
  }

  // @TODO: Define response type, add visibility
  queryData(tableName: string) {
    var params = {
      TableName: tableName
    };
    // @TODO: Clean data and add itemCount. Create private method to map Dynamo's response "mapper" from AWS Dynamo to own model (based in types)
    // @TODO: Use generics, for generics, you must send the type
    return this.instance.scan(params).promise();
  }

  // @TODO: Define response type, add visibility to all functions
  async addData(tableName: string, item: any) {
    const params = {
      TableName: tableName,
      Item: item
    };
    return await this.instance.put(params).promise();
  }
}