import { parseTableRegular } from './parseTableRegular';
import { type RegularTableReturnType } from './parseTableRegular.types';
import { parseTableTransposed } from './parseTableTransposed';
import { type TransposedTableReturnType } from './parseTableTransposed.types';

type ParseTableReturnType<
  TTable extends string,
  TConfig extends { transpose: boolean } | undefined,
> = TConfig extends {
  transpose: true;
}
  ? TransposedTableReturnType<TTable>
  : RegularTableReturnType<TTable>;

export const parseTable = <TTable extends string, TConfig extends { transpose: boolean }>(
  input: TTable,
  config?: TConfig,
): ParseTableReturnType<TTable, TConfig> =>
  (config?.transpose
    ? parseTableTransposed(input)
    : parseTableRegular(input)) as ParseTableReturnType<TTable, TConfig>;
