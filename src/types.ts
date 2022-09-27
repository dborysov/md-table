type TrimLeft<TInput extends string> = TInput extends ` ${infer Value}` ? TrimLeft<Value> : TInput;

type TrimRight<TInput extends string> = TInput extends `${infer Value} `
  ? TrimRight<Value>
  : TInput;

export type Trim<TInput extends string> = TrimRight<TrimLeft<TInput>>;
