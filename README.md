<div align="center">
  <a href="https://www.npmjs.com/package/@dborysov/md-table">
    <img alt="version" src="https://img.shields.io/npm/v/@dborysov/md-table.svg" />
  </a>
  <a href="https://npmjs.org/package/@dborysov/md-table">
    <img alt="license" src="https://badgen.net/npm/license/@dborysov/md-table" />
  </a>
  <a href="https://npmjs.org/package/@dborysov/md-table">
    <img alt="downloads per week" src="https://badgen.net/npm/dw/@dborysov/md-table" />
  </a>
  <a href="https://bundlephobia.com/result?p=@dborysov/md-table">
    <img alt="minzipped size" src="https://badgen.net/bundlephobia/minzip/@dborysov/md-table" />
  </a>
  <a href="https://npmjs.org/package/@dborysov/md-table">
    <img alt="types included" src="https://badgen.net/npm/types/@dborysov/md-table" />
  </a>
  <a href="https://npmjs.org/package/@dborysov/md-table">
    <img alt="dependency count" src="https://badgen.net/bundlephobia/dependency-count/@dborysov/md-table" />
  </a>
</div>

# md-table

## [Demo](https://stackblitz.com/edit/typescript-cwyfnf?file=index.ts)

## Install

```sh
yarn add @dborysov/md-table
# or
npm i -S @dborysov/md-table
```

## Motivation

Of course, you can use plain old (java|type)script to create an array of objects:

```ts
interface User {
  id: number;
  name: string;
  phoneNumber: string;
  lastName: string;
  email: string;
}

const users: User[] = [
  {
    id: 1,
    name: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    middleName: 'SomeMiddleName',
    phoneNumber: '123-456-78-910',
  },
  {
    id: 2,
    name: 'Jane',
    middleName: 'SomeOtherMiddleName',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '56-47-78-910',
  },
];
```

But it can be done in a more readable way:

```ts
import { parseTable } from '@dborysov/md-table';

const users = parseTable(`
  | id  | name | middleName          | lastName | email                | phoneNumber    |
  | --- | ---- | ------------------- | -------- | -------------------- | -------------- |
  | 1   | John | SomeMiddleName      | Doe      | john.doe@example.com | 123-456-78-910 |
  | 2   | Jane | SomeOtherMiddleName | Doe      | jane.doe@example.com | 56-47-78-910   |
`);
```

If the table is getting wider, you can transpose it. No delimiter is needed in that case:

```ts
import { parseTable } from '@dborysov/md-table';

const users = parseTable(
  `
  | id          | 1                    | 2                    |
  | name        | John                 | Jane                 |
  | middleName  | SomeMiddleName       | SomeOtherMiddleName  |
  | lastName    | Doe                  | Doe                  |
  | email       | john.doe@example.com | jane.doe@example.com |
  | phoneNumber | 123-456-78-910       | 56-47-78-910         |
`,
  { transpose: true },
);
```

### Yeah, but typings?..

I love typescript for so many things, for example for working with string literals. In the previous examples the type of `users` is `Record<"id" | "name" | "middleName" | "lastName" | "email" | "phoneNumber", string>[]`
