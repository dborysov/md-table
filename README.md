<div align="center">
  <a href="https://www.npmjs.com/package/@dborysov/md-table">
    <img alt="npm" src="https://img.shields.io/npm/v/@dborysov/md-table.svg" />
  </a>
  <a href="https://npmjs.org/package/@dborysov/md-table">
    <img alt="downloads" src="https://badgen.net/npm/dm/@dborysov/md-table" />
  </a>
  <a href="https://bundlephobia.com/result?p=@dborysov/md-table">
    <img alt="tree-shakeable" src="https://badgen.net/bundlephobia/tree-shaking/@dborysov/md-table" />
  </a>
  <a href="https://npmjs.org/package/@dborysov/md-table">
    <img alt="types included" src="https://badgen.net/npm/types/@dborysov/md-table" />
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
  { id: 1, name: "John", lastName: "Doe", email: "john.doe@example.com", middleName: "SomeMiddleName", phoneNumber: "123-456-78-910" },
  { id: 2, name: "Jane", middleName: "SomeOtherMiddleName", lastName: "Doe", email: "jane.doe@example.com", phoneNumber: "56-47-78-910" },
];
```

But it can be done in a more readable way:

```ts
import { parseTable } from "@dborysov/md-table";

const users = parseTable(`
  | id  | name | middleName          | lastName | email                | phoneNumber    |
  | --- | ---- | ------------------- | -------- | -------------------- | -------------- |
  | 1   | John | SomeMiddleName      | Doe      | john.doe@example.com | 123-456-78-910 |
  | 2   | Jane | SomeOtherMiddleName | Doe      | jane.doe@example.com | 56-47-78-910   |
`);
```

### Yeah, but typings?..

I love typescript for so many things, for example for working with string literals. In the previous example the type of `users` is `Record<"id" | "name" | "middleName" | "lastName" | "email" | "phoneNumber", string>[]`

