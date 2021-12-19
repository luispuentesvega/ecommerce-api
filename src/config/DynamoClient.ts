import { IDbClient } from "./interfaces";
import { injectable } from "inversify";
import { DynamoDB } from "aws-sdk";
import { DbResult, QueryData } from "./types";

@injectable()
export class DynamoClient implements IDbClient {
  constructor (private instance: DynamoDB.DocumentClient) {
  }

  mapData<T>(data: DbResult<T>): QueryData<T> {
    return {
      data: data?.items,
      count: data?.count
    };
  }

  public async queryData<T>(tableName: string): Promise<QueryData<T>> {
    var params = {
      TableName: tableName
    };

    const response = await this.instance.scan(params).promise();
    return this.mapData<T>(response as unknown as DbResult<T>);
  }

  public async addData<T>(tableName: string, item: T): Promise<void> {
    const params = {
      TableName: tableName,
      Item: item
    };
    this.instance.put(params).promise();
  }
}
