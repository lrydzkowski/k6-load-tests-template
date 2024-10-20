import { check, JSONObject } from 'k6';
import http from 'k6/http';
import { ICreateSetRequest } from './models/create-set-request';
import { IUpdateSetRequest } from './models/update-set-request';

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
    'is status 200': (r) => r.status === 200,
  });
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
    'is status 201': (r) => r.status === 201,
  });

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
    'is status 204': (r) => r.status === 204,
  });
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
    'is status 204': (r) => r.status === 204,
  });
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
    'is status 200': (r) => r.status === 200,
  });
};
