import { IEntry } from './entry.js';

export interface IUpdateSetRequest {
  entries: IEntry[];
  setName: string;
  setId: number;
}
