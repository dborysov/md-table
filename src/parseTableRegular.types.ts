import type { Trim } from './types';

type ExtractHeader<TTable extends string> = TTable extends `${string}|${infer Head}|
${string}`
  ? Head
  : never;

type ExtractColumnNamesFromHeader<
  THeader extends string,
  TResult extends readonly string[] = [],
> = THeader extends ''
  ? TResult
  : THeader extends `${infer ColumnName}|${infer Rest}`
  ? ExtractColumnNamesFromHeader<Rest, [...TResult, Trim<ColumnName, '|' | ' '>]>
  : [...TResult, Trim<THeader, '|' | ' '>];

type ExtractColumnNames<TTable extends string> = ExtractColumnNamesFromHeader<
  Trim<ExtractHeader<TTable>, '|' | ' '>
>[number];

export type RegularTableReturnType<TTable extends string> = readonly Readonly<
  Record<ExtractColumnNames<TTable>, string>
>[];
