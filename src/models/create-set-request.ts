import { IEntry } from './entry.js';

export interface ICreateSetRequest {
  entries: IEntry[];
  setName: string;
}
