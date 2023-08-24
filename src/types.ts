type TrimLeft<
  TInput extends string,
  TSeparator extends string,
> = TInput extends `${TSeparator}${infer Value}` ? TrimLeft<Value, TSeparator> : TInput;

type TrimRight<
  TInput extends string,
  TSeparator extends string,
> = TInput extends `${infer Value}${TSeparator}` ? TrimRight<Value, TSeparator> : TInput;

export type Trim<TInput extends string, TSeparator extends string = ' '> = TrimRight<
  TrimLeft<TInput, TSeparator>,
  TSeparator
>;
