import { DynamoDB } from "./DynamoDB";

it('should exist just one instance of DynamoDB due it is a Singleton', () => {
  expect(DynamoDB.getInstance()).toBe(DynamoDB.getInstance());
});
