# OrderedList

An **OrderedList** (`OrderedList<T>`) is a list where elements are automatically inserted and maintained in a sorted order (either ascending or descending) based on a comparison function or a specific object key.

This implementation is located in [ordered-list.ts](../src/models/ordered-list.ts).

## Table of Contents

- [Usage Example](#usage-example)
- [API Reference](#api-reference)
    - [Constructor](#constructor)
    - [Properties](#properties)
    - [Methods](#methods)

## Usage Example

Below is a basic example showing how to create and use an OrderedList:

```typescript
import { OrderedList } from '@renansantos7/data-structures';

// 1. OrderedList with numbers (default ascending order, no duplicates)
const numList = new OrderedList<number>([30, 10, 20]);
console.log(numList.toString()); // '[ 10, 20, 30 ]'

numList.insert(15);
numList.insert(10); // Ignored because duplicates are false by default
console.log(numList); // '[ 10, 15, 20, 30 ]'

// 2. OrderedList with objects sorted descending by a key
interface User {
	name: string;
	age: number;
}
const userList = new OrderedList<User>(
	[
		{ name: 'Alice', age: 25 },
		{ name: 'Bob', age: 30 },
	],
	{
		order: 'desc',
		comparisonKey: 'age',
	},
);
userList.insert({ name: 'Charlie', age: 28 });
console.log(userList);
/*
Output:
[ {"name":"Bob","age":30}, {"name":"Charlie","age":28}, {"name":"Alice","age":25} ]
*/
```

## API Reference

### Constructor

#### `constructor(items?: T | T[] | OrderedList<T>, options?: Options<T>)`

Creates a new OrderedList instance.

- **Parameters:**
    - `items` (optional): Initial items (single, array, or another `OrderedList`) to insert.
    - `options` (optional): Options object:
        - `allowDuplicates` (boolean): Whether duplicate elements are allowed. Defaults to `false` when no `comparisonKey` is set, and `true` when a `comparisonKey` is provided.
        - `comparisonKey` (string/function): The key to sort objects by, or a function extracting the key.
        - `order` (`'asc' | 'desc'`): Sort direction. Defaults to `'asc'`.

### Properties

| Property        | Type                          | Access        | Description                                                                                                                                |
| :-------------- | :---------------------------- | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `items`         | `T[]`                         | `get`         | Returns the internal array of sorted items.                                                                                                |
| `length`        | `number`                      | `get`         | Returns the number of elements in the list.                                                                                                |
| `comparisonKey` | `Options<T>['comparisonKey']` | `get` / `set` | Gets or sets the comparison key. **Note:** The comparison key can only be set once (if it is undefined). Setting it again throws an error. |

### Methods

#### `insert(item: T): void`

Inserts an item into the list at its correct sorted position.

#### `remove(item: T): void`

Removes the first occurrence of the specified item from the list.

#### `removeByIndex(index: number): void`

Removes the item at the specified index.

- Throws an error if the index is not an integer or is out of bounds (`index < 0 || index >= length`).

#### `indexOf(item: T): number`

Finds the index of the first item whose comparison value matches that of `item`. Returns `-1` if not found.

#### `lastIndexOf(item: T): number`

Finds the index of the last item whose comparison value matches that of `item`. Returns `-1` if not found.

#### `includes(item: T): boolean`

Checks if the list contains the exact item.

#### `find(callback: (element: T) => boolean): T | undefined`

Finds the first element in the list that satisfies the provided testing function.

#### `findIndex(callback: (element: T) => boolean): number`

Finds the index of the first element in the list that satisfies the testing function.

#### `every(callback: (item: T) => boolean): boolean`

Checks if all elements in the list pass the test implemented by the callback function.

#### `some(callback: (item: T) => boolean): boolean`

Checks if at least one element in the list passes the test.

#### `filter(callback: (element: T) => boolean): T[]`

Creates a new array with all elements that pass the test.

#### `map<S>(callback: (item: T) => S): OrderedList<S>`

Creates a new `OrderedList` with the results of calling the mapping function on every element.

#### `revert(): OrderedList<T>`

Returns a new `OrderedList` with all elements copied, but with the sorting order reversed (e.g. `'asc'` becomes `'desc'`).

#### `slice(start: number, end?: number): OrderedList<T>`

Returns a new `OrderedList` containing a portion of the current list.

#### `join(separator?: string): string`

Joins all elements of the list into a string.

#### `toString(): string`

Returns a formatted string representation of the list.

#### `[Symbol.iterator](): Iterator<T>`

Makes the list iterable. Iterates over elements in sorted order.

```typescript
for (const item of numList) {
	console.log(item);
}
```
