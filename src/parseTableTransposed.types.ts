import { type Trim } from './types';

type ExtractFirstColumnValues<TTable extends string> = TTable extends `${'\n' | ' '}${infer Rest}`
  ? ExtractFirstColumnValues<Rest>
  : TTable extends `|${infer FirstColumn}|${infer RestRow}\n${infer RestTable}`
  ? Trim<FirstColumn> | ExtractFirstColumnValues<RestTable>
  : never;

export type TransposedTableReturnType<TTable extends string> = Readonly<
  Record<ExtractFirstColumnValues<TTable>, string>
>[];
