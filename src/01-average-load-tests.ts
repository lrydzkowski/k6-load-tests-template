import http from 'k6/http';
import { sleep } from 'k6';
/* @ts-expect-error importing an external dependency */
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { SharedArray } from 'k6/data';

export const options = {
  stages: [
    { duration: '5s', target: 2 },
    { duration: '10s', target: 2 },
    { duration: '2s', target: 0 },
  ],
};

const config = new SharedArray('config', function () {
  return [JSON.parse(open('../config/tests-config.json'))];
});

const tokens = new SharedArray('tokens', function () {
  return [JSON.parse(open('../config/tokens.json'))];
});

// console.log(config[0].host);
// console.log(tokens[0].user1.prod.bearerToken);

export default function () {
  http.get('http://test.k6.io');
  sleep(randomIntBetween(1, 3));
}
