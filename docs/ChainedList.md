# ChainedList (Linked List)

A **ChainedList** (`ChainedList<T>`) is a linear data structure representing a Singly Linked List. It consists of nodes (elements) where each node contains a value and a reference (`next`) to the next node in the sequence.

This implementation is located in [chained-list.ts](../src/models/chained-list.ts).

## Table of Contents

- [Usage Example](#usage-example)
- [API Reference](#api-reference)
    - [Constructor](#constructor)
    - [Properties (Getters)](#properties-getters)
    - [Methods](#methods)

## Usage Example

Below is a basic example showing how to create and manipulate a ChainedList:

```typescript
import { ChainedList } from '@renansantos7/data-structures';

// 1. Create a ChainedList
const list = new ChainedList<string>(['Apple', 'Banana']);

// 2. Add elements
list.add('Orange');

// 3. Get first and last elements
console.log(list.first); // 'Apple'
console.log(list.last); // 'Orange'

// 4. Insert element at a specific index
list.insert('Grape', 1); // Inserts 'Grape' at index 1

// 5. Update an element
list.update('Blueberry', 0); // Replaces 'Apple' with 'Blueberry' at index 0

// 6. Access elements by index
console.log(list.get(1)); // 'Grape'

// 7. Find elements
console.log(list.indexOf('Banana')); // 2
console.log(list.find(fruit => fruit.startsWith('B'))); // 'Banana'

// 8. Remove elements
list.remove(1); // Removes 'Grape'
list.removeFirst(); // Removes 'Blueberry'

// 9. Iterate over elements
for (const item of list) {
	console.log(item); // Prints 'Banana', then 'Orange'
}
```

## API Reference

### Constructor

#### `constructor(item?: T | T[])`

Creates a new ChainedList instance.

- **Parameters:**
    - `item` (optional): An initial single item or an array of items to insert into the list.

### Properties (Getters)

| Property | Type             | Access | Description                                                                              |
| :------- | :--------------- | :----- | :--------------------------------------------------------------------------------------- |
| `first`  | `T \| undefined` | `get`  | Returns the value of the first element in the list, or `undefined` if the list is empty. |
| `last`   | `T \| undefined` | `get`  | Returns the value of the last element in the list, or `undefined` if the list is empty.  |
| `length` | `number`         | `get`  | Returns the number of elements in the list.                                              |

### Methods

#### `add(item: T): void`

Appends a new element to the end of the list.

#### `find(fn: (item: T) => boolean): T | undefined`

Searches for and returns the first element in the list matching the predicate function `fn`. Returns `undefined` if not found.

#### `insert(item: T, index: number): void`

Inserts a new element at the specified index.

- Throws an error if the index is out of bounds (`index < 0 || index > length`).

#### `remove(index: number): void`

Removes the element at the specified index.

- Throws an error if the index is out of bounds (`index < 0 || index >= length`) or if the list is empty.

#### `removeFirst(): void`

Removes the first element from the list.

- Throws an error if the list is empty.

#### `indexOf(query: T | ((item: T) => boolean)): number`

Finds and returns the index of the first element matching the given value or predicate `query`. Returns `-1` if not found.

#### `update(value: T, index: number): void`

Updates the value of the element at the specified index.

- Throws an error if the index is out of bounds (`index < 0 || index >= length`).

#### `get(index: number): T | undefined`

Returns the value of the element at the specified index, or `undefined` if the index is out of range.

#### `toString(): string`

Returns a string representation of the list (e.g. `[ AppleBanana]`).

#### `[Symbol.iterator](): Generator<T>`

Makes the list iterable. Allows traversing all elements in sequential order using loop structures like `for...of`.

```typescript
for (const item of list) {
	console.log(item);
}
```
