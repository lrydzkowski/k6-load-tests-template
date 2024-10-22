import { sleep } from 'k6';
import { Options } from 'k6/options';
import { randomIntBetween, randomString } from './utils/k6-utils';
import { host } from './models/test-data';
import { user1AccessToken } from './models/test-data';
import { createSet, deleteSet, getSet, getSets, updateSet } from './requests';
import { user2AccessToken } from './models/test-data';
// @ts-expect-error Import module
import { htmlReport } from './utils/k6-reporter';

export const options: Options = {
  scenarios: {
    scenario1: {
      executor: 'ramping-vus',
      exec: 'scenario1',
      stages: [
        { duration: '2s', target: 40 },
        { duration: '10s', target: 40 },
        { duration: '1s', target: 0 },
      ],
    },
    scenario2: {
      executor: 'ramping-vus',
      exec: 'scenario2',
      stages: [
        { duration: '2s', target: 40 },
        { duration: '10s', target: 40 },
        { duration: '1s', target: 0 },
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
