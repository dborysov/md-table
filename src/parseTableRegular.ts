import { type RegularTableReturnType } from './parseTableRegular.types';

export const parseTableRegular = <TTable extends string>(
  input: TTable,
): RegularTableReturnType<TTable> => {
  const tableHeader = input.match(
    /^\s*(?<header>\|.*\|)\s*\r?\n(?<delimiter>[\s\|:\-]+)\r?\n(?<data>[\w\W]*)$/,
  );

  if (!tableHeader?.groups) throw new Error('Invalid table');

  const { header, data } = tableHeader.groups;

  const columnHeaders = header
    .split('|')
    .filter((columnName) => columnName)
    .map((columnName) => columnName.trim());

  return data
    .trim()
    .split(/\r?\n/)
    .filter((row) => row)
    .map((row) =>
      row
        .trim()
        .split('|')
        .filter((value) => value)
        .map((value) => value.trim())
        .reduce(
          (previous, current, index) => ({
            ...previous,
            [columnHeaders[index]]: current,
          }),
          {} as RegularTableReturnType<TTable>[number],
        ),
    );
};
