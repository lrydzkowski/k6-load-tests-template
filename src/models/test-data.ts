import { SharedArray } from 'k6/data';

const config = new SharedArray('config', function () {
  return [JSON.parse(open('../../config/tests-config.json'))];
});

const tokens = new SharedArray('tokens', function () {
  return [JSON.parse(open('../../config/tokens.json'))];
});

export const host = config[0].host;
export const user1AccessToken = tokens[0].user1.prod.bearerToken;
export const user2AccessToken = tokens[0].user2.prod.bearerToken;
