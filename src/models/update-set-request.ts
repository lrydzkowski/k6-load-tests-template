import { IEntry } from './entry';

export interface IUpdateSetRequest {
  entries: IEntry[];
  setName: string;
  setId: number;
}
