import { IDbClient } from "./interfaces";
import { injectable } from "inversify";
import { DynamoDB } from "aws-sdk";

@injectable()
export class DynamoClient implements IDbClient {
  private _instance: any;

  constructor() {
    this.connect();
  }

  connect() {
    if (!this._instance) {
      this._instance = new DynamoDB.DocumentClient();
    }
    return this._instance;
  }

  async queryData(tableName: string) {
    var params = {
      TableName: tableName
    };
    let result = [];
    try {
      result = await this._instance.scan(params).promise();
    } catch (err) {
      throw new Error(err);
    }
    return result?.Items;
  }

  async addData(tableName: string, item: any) {
    const params = {
      TableName: tableName,
      Item: item
    };
    return await this._instance.put(params).promise();
  }
}
