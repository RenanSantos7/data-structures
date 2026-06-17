# Stack

A **Stack** (`Stack<T>`) is a linear data structure that follows the **LIFO (Last In, First Out)** principle. The last element added to the stack is the first one to be removed.

This implementation is part of the data structures library and is located in [stack.ts](../src/models/stack.ts).

## Table of Contents

- [Usage Example](#usage-example)
- [API Reference](#api-reference)
    - [Constructor](#constructor)
    - [Properties (Getters)](#properties-getters)
    - [Methods](#methods)

## Usage Example

Below is a basic example showing how to create and use a Stack:

```typescript
import { Stack } from '@renansantos7/data-structures';

// 1. Create a Stack
const stack = new Stack<number>([10, 20]);

// 2. Push elements
stack.push(30);
stack.push(40);

// 3. Peek at the top element
console.log(stack.peek); // 40

// 4. Pop elements
console.log(stack.pop()); // 40
console.log(stack.peek); // 30

// 5. Check size
console.log(stack.length); // 3

// 6. Iterate (LIFO order)
for (const item of stack) {
	console.log(item); // Prints 30, then 20, then 10
}
```

## API Reference

### Constructor

#### `constructor(items?: T[] | T)`

Creates a new Stack instance.

- **Parameters:**
    - `items` (optional): An initial item or an array of items to pre-populate the stack (inserted in order).

### Properties (Getters)

| Property | Type             | Access | Description                                                                                     |
| :------- | :--------------- | :----- | :---------------------------------------------------------------------------------------------- |
| `length` | `number`         | `get`  | Returns the number of elements in the stack.                                                    |
| `items`  | `T[]`            | `get`  | Returns a shallow copy of the elements currently in the stack (top to bottom order).            |
| `peek`   | `T \| undefined` | `get`  | Returns the top element of the stack without removing it, or `undefined` if the stack is empty. |

### Methods

#### `push(item: T): void`

Pushes an element onto the top of the stack.

#### `pop(): T | undefined`

Removes and returns the top element of the stack. Returns `undefined` if the stack is empty.

#### `toString(): string`

Returns a short string representation of the stack.

- E.g., `[ top_element, ...]` or `[ ]` if empty.

#### `toDebugString(): string`

Returns a detailed string representation listing all elements from top to bottom.

- E.g., `[ 30, 20, 10 ]`.

#### `[Symbol.iterator](): Iterator<T>`

Makes the stack iterable. Iterates over elements starting from the top (LIFO order) to the bottom of the stack.

```typescript
for (const item of stack) {
	console.log(item);
}
```
