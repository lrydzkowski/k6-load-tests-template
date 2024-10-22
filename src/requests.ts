import { check, JSONObject } from 'k6';
import { Trend } from 'k6/metrics';
import http from 'k6/http';
import { ICreateSetRequest } from './models/create-set-request.js';
import { IUpdateSetRequest } from './models/update-set-request.js';

const requestTrends = {
  getSets: new Trend('getSets'),
  createSet: new Trend('createSet'),
  updateSet: new Trend('updateSet'),
  deleteSet: new Trend('deleteSet'),
  getSet: new Trend('getSet'),
};

export const getSets = (
  host: string,
  accessToken: string,
  page: number | null = null,
  pageSize: number | null = null,
  sortingFieldName: string | null = null,
  sortingOrder: string | null = null,
  searchQuery: string | null = null,
): void => {
  const queryParameters = [];
  if (page !== null) {
    queryParameters.push(`page=${page}`);
  }

  if (pageSize !== null) {
    queryParameters.push(`pageSize=${pageSize}`);
  }

  if (sortingFieldName !== null) {
    queryParameters.push(`sortingFieldName=${sortingFieldName}`);
  }

  if (sortingOrder !== null) {
    queryParameters.push(`sortingOrder=${sortingOrder}`);
  }

  if (searchQuery !== null) {
    queryParameters.push(`searchQuery=${searchQuery}`);
  }

  const url = `${host}/api/lexica/sets?${queryParameters.join('&')}`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = http.get(url, params);
  check(response, {
    'getSets response has status 200': (r) => r.status === 200,
  });
  requestTrends.getSets.add(response.timings.duration);
};

export const createSet = (host: string, accessToken: string, request: ICreateSetRequest): number => {
  const url = `${host}/api/lexica/sets`;
  const payload = JSON.stringify(request);
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = http.post(url, payload, params);
  check(response, {
    'createSet response has status 201': (r) => r.status === 201,
  });
  requestTrends.createSet.add(response.timings.duration);

  return (response.json() as JSONObject).setId as number;
};

export const updateSet = (host: string, accessToken: string, request: IUpdateSetRequest): void => {
  const url = `${host}/api/lexica/sets`;
  const payload = JSON.stringify(request);
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = http.put(url, payload, params);
  check(response, {
    'updateSet response has status 204': (r) => r.status === 204,
  });
  requestTrends.updateSet.add(response.timings.duration);
};

export const deleteSet = (host: string, accessToken: string, setId: number): void => {
  const url = `${host}/api/lexica/sets/${setId}`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = http.del(url, null, params);
  check(response, {
    'deleteSet response has status 204': (r) => r.status === 204,
  });
  requestTrends.deleteSet.add(response.timings.duration);
};

export const getSet = (host: string, accessToken: string, setId: number): void => {
  const url = `${host}/api/lexica/sets/${setId}`;
  const params = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  const response = http.get(url, params);
  check(response, {
    'getSet response has status 200': (r) => r.status === 200,
  });
  requestTrends.getSet.add(response.timings.duration);
};
