import { ProductCategory } from "../../types";

const { DynamoDB } = require('../config/DynamoDB');

const TABLE_NAME = "ProductCategory";

const list = async () => {
  const params = {
    TableName: TABLE_NAME
  };
  const dynamoClient = DynamoDB.getInstance();

  const productCategories = await dynamoClient.scan(params).promise();
  return productCategories.Items;
};

const addOrUpdate = async (productCategory: ProductCategory) => {
  const params = {
    TableName: TABLE_NAME,
    Item: productCategory
  };
  const dynamoClient = DynamoDB.getInstance();

  return await dynamoClient.put(params).promise();
};

module.exports = {
  list,
  addOrUpdate
};