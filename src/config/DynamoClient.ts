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
      data: data?.Items,
      count: data?.Count
    };
  }

  public async queryData<T>(tableName: string): Promise<QueryData<T>> {
    var params = {
      TableName: tableName
    };

    const response = await this.instance.scan(params).promise();
    const data = {
      Items: response.Items as T[],
      Count: response.Count!,
      ScannedCount: response.ScannedCount!
    };
    return this.mapData<T>(data);
  }

  public async addData<T>(tableName: string, item: T): Promise<{}> {
    const params = {
      TableName: tableName,
      Item: item
    };
    return this.instance.put(params).promise();
  }
}