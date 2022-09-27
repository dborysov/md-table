import { type TransposedTableReturnType } from './parseTableTransposed.types';

export const parseTableTransposed = <TTable extends string>(
  input: TTable,
): TransposedTableReturnType<TTable> => {
  const result: TransposedTableReturnType<TTable> = [];

  input
    .split('\n')
    .map((row) => row.trim())
    .filter((row) => row)
    .forEach((row) => {
      const cells = row
        .split('|')
        .map((cell) => cell.trim())
        .filter((cell) => cell);

      const fieldName = cells[0];

      cells
        .filter((_, i) => i !== 0)
        .forEach((cell, i) => (result[i] = { ...(result[i] ?? {}), [fieldName]: cell }));
    });

  return result;
};
