import { suite, test } from '@testdeck/mocha';
import { DynamoClient } from '../../src/config/DynamoClient';
import "reflect-metadata";

@suite
class DynamoClientSuite extends DynamoClient {

  @test
  async queryDataTest() {
    const res = await this.queryData('ProducCategory');
    console.log('Note res:', res);
  }
}