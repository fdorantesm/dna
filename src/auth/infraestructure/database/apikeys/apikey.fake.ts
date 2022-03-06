import { Json } from '../../../../app/types/json.type';

export class ApiKeyFakeModel {
  findOne(_filter: Json) {
    return function exec() {
      return {
        apiKey: '84XDJQ1-ZYJM5VS-PVEJPW5-VXXJ6D1',
        uuid: '413ad95c-ffa5-42ef-b6dd-2b70df7b2334',
      };
    };
  }
}
