import { IDbClient } from "./interfaces";
import { injectable } from "inversify";
import { config, DynamoDB } from "aws-sdk";

require('dotenv').config();

config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

@injectable()
export class DynamoClient implements IDbClient {
  private _instance: any;

  constructor() {
    this._instance = new DynamoDB.DocumentClient();
  }

  async queryData(tableName: string) {
    var params = {
      TableName: tableName
    };
    let result = [];
    try {
      result = await this._instance.scan(params).promise();
    } catch (err: any) {
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