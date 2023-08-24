import type { Trim } from './types';

type ExtractFirstColumnValues<
  TTable extends string,
  TResult extends readonly string[] = [],
> = TTable extends ''
  ? TResult
  : TTable extends `${'\n' | ' '}${infer Rest}`
  ? ExtractFirstColumnValues<Rest, TResult>
  : TTable extends `|${infer FirstColumn}|${string}\n${infer RestTable}`
  ? ExtractFirstColumnValues<RestTable, [...TResult, Trim<FirstColumn, '|' | ' '>]>
  : [...TResult, Trim<TTable, '|' | ' '>];

export type TransposedTableReturnType<TTable extends string> = Readonly<
  Record<ExtractFirstColumnValues<TTable>[number], string>
>[];
