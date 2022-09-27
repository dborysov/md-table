import { type Trim } from './types';

type ExtractHeader<TTable extends string> = TTable extends `${string}|${infer Head}|
${string}`
  ? `|${Head}|`
  : never;

type ExtractColumnNamesFromHeader<THeader extends string> = THeader extends ''
  ? never
  : THeader extends '|'
  ? never
  : THeader extends `| ${infer ColumnName} |${infer Rest}`
  ? Trim<ColumnName> | ExtractColumnNamesFromHeader<`|${Rest}`>
  : never;

type ExtractColumnNames<TTable extends string> = ExtractColumnNamesFromHeader<
  ExtractHeader<TTable>
>;

export type RegularTableReturnType<TTable extends string> = readonly Readonly<
  Record<ExtractColumnNames<TTable>, string>
>[];
