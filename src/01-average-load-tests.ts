import { sleep } from 'k6';
import { Options } from 'k6/options';
import { host } from './models/test-data.js';
import { user1AccessToken } from './models/test-data.js';
import { createSet, deleteSet, getSet, getSets, updateSet } from './requests.js';
import { user2AccessToken } from './models/test-data.js';
// @ts-expect-error Import module
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';
// @ts-expect-error Import module
import { randomIntBetween, randomString } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options: Options = {
  scenarios: {
    scenario1: {
      executor: 'ramping-vus',
      exec: 'scenario1',
      stages: [
        { duration: '20s', target: 40 },
        { duration: '2m', target: 40 },
        { duration: '10s', target: 0 },
      ],
    },
    scenario2: {
      executor: 'ramping-vus',
      exec: 'scenario2',
      stages: [
        { duration: '20s', target: 40 },
        { duration: '2m', target: 40 },
        { duration: '10s', target: 0 },
      ],
    },
  },
};

export function scenario1() {
  getSets(host, user1AccessToken);
  sleep(randomIntBetween(1, 3) / 0.1);

  getSets(host, user1AccessToken, 0, 25, 'createdAt', 'asc');
  sleep(randomIntBetween(1, 3) / 0.1);

  const createdSetId = createSet(host, user1AccessToken, {
    entries: [
      { word: 'word1', wordType: 'noun', translations: ['słowo1'] },
      { word: 'word2', wordType: 'noun', translations: ['słowo2'] },
      { word: 'word3', wordType: 'noun', translations: ['słowo3'] },
    ],
    setName: randomString(20),
  });
  sleep(randomIntBetween(1, 3) / 0.1);

  updateSet(host, user1AccessToken, {
    entries: [
      { word: 'word1', wordType: 'noun', translations: ['słowo1'] },
      { word: 'word2', wordType: 'noun', translations: ['słowo2'] },
    ],
    setName: randomString(20),
    setId: createdSetId,
  });
  sleep(randomIntBetween(1, 3) / 0.1);

  deleteSet(host, user1AccessToken, createdSetId);
  sleep(randomIntBetween(1, 3) / 0.1);
}

export function scenario2() {
  getSets(host, user2AccessToken);
  sleep(randomIntBetween(1, 3) / 0.1);

  getSets(host, user2AccessToken, 0, 25, 'setId', 'desc', 'set3');
  sleep(randomIntBetween(1, 3) / 0.1);

  const createdSetId = createSet(host, user2AccessToken, {
    entries: [{ word: 'word1', wordType: 'noun', translations: ['słowo1'] }],
    setName: randomString(20),
  });
  sleep(randomIntBetween(1, 3) / 0.1);

  getSet(host, user2AccessToken, createdSetId);
  sleep(randomIntBetween(1, 3) / 0.1);

  deleteSet(host, user2AccessToken, createdSetId);
  sleep(randomIntBetween(1, 3) / 0.1);
}

export const handleSummary = function (data: unknown) {
  return {
    './results/summary.html': htmlReport(data, { title: new Date().toLocaleString() }),
    './results/summary.json': JSON.stringify(data),
  };
};
