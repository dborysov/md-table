type TrimLeft<TInput extends string> = TInput extends ` ${infer Value}` ? TrimRight<Value> : TInput;

type TrimRight<TInput extends string> = TInput extends `${infer Value} ` ? TrimRight<Value> : TInput;

type Trim<TInput extends string> = TrimRight<TrimLeft<TInput>>;

type ExtractHeader<TTable extends string> = TTable extends `${string}|${infer Head}|
${string}`
  ? `|${Head}|`
  : never;

type ExtractColumnNamesFromHeader<THeader extends string> = THeader extends "" ? never : THeader extends "|" ? never : THeader extends `| ${infer ColumnName} |${infer Rest}` ? Trim<ColumnName> | ExtractColumnNamesFromHeader<`|${Rest}`> : never;

type ExtractColumnNames<TTable extends string> = ExtractColumnNamesFromHeader<ExtractHeader<TTable>>;

export const parseTable = <TTable extends string>(input: TTable): readonly Readonly<Record<ExtractColumnNames<TTable>, string>>[] => {
  const tableHeader = input.match(/^\s*(?<header>\|.*\|)\s*\r?\n(?<delimiter>[\s\|:\-]+)\r?\n(?<data>[\w\W]*)$/);

  if (!tableHeader?.groups) throw new Error("Invalid table");

  const { header, data } = tableHeader.groups;

  const columnHeaders = header
    .split("|")
    .filter((columnName) => columnName)
    .map((columnName) => columnName.trim());

  return data
    .split(/\r?\n/)
    .filter((row) => row)
    .map((row) =>
      row
        .trim()
        .split("|")
        .filter((value) => value)
        .map((value) => value.trim())
        .reduce((previous, current, index) => ({ ...previous, [columnHeaders[index]]: current }), {} as Record<ExtractColumnNames<TTable>, string>)
    );
};
