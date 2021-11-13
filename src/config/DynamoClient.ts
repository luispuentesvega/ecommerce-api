import { IDbClient } from "./interfaces";
import { injectable } from "inversify";
import { config, DynamoDB } from "aws-sdk";

export type DynamoConnection = {
  region: string,
  accessKeyId: string,
  secretAccessKey: string
};

export interface IDoc {

};

@injectable()
export class DynamoClient implements IDbClient {
  // @TODO: Research how to find the specific ReturnType from the DocumentClient, I tried ReturnType<typeof DynamoDB.DocumentClient> but not working
  private _instance: any;

  constructor(params: DynamoConnection) {
    const dynamoDB = new DynamoDB.DocumentClient(params);
    this._instance = dynamoDB;
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