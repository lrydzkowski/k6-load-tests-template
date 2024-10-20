import { IEntry } from './entry';

export interface ICreateSetRequest {
  entries: IEntry[];
  setName: string;
}
