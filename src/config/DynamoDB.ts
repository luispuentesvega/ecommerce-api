const AWS = require('aws-sdk');

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export class DynamoDB {
  private static _instance: any;

  constructor() {
    return new AWS.DynamoDB.DocumentClient();
  }

  public static getInstance(): DynamoDB {
    if (!DynamoDB._instance) {
      DynamoDB._instance = new DynamoDB();
    }

    return DynamoDB._instance;
  }
}
