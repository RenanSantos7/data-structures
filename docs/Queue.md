# Queue

A **Queue** (`Queue<T>`) is a linear data structure that follows the **FIFO (First In, First Out)** principle. The first element added to the queue is the first one to be removed.

This implementation is backed by a `ChainedList` internally for efficient front removal, and is located in [queue.ts](../src/models/queue.ts).

## Table of Contents

- [Usage Example](#usage-example)
- [API Reference](#api-reference)
    - [Properties (Getters)](#properties-getters)
    - [Methods](#methods)

## Usage Example

Below is a basic example showing how to create and use a Queue:

```typescript
import { Queue } from '@renansantos7/data-structures';

// 1. Create a Queue
const queue = new Queue<string>();

// 2. Enqueue elements
queue.enqueue('Task A');
queue.enqueue('Task B');
queue.enqueue('Task C');

// 3. Read front element
console.log(queue.read()); // 'Task A'

// 4. Dequeue elements
console.log(queue.dequeue()); // 'Task A'
console.log(queue.read()); // 'Task B'

// 5. Search elements
console.log(queue.indexOf('Task C')); // 1

// 6. Iterate (FIFO order)
for (const item of queue) {
	console.log(item); // Prints 'Task B', then 'Task C'
}
```

## API Reference

### Properties (Getters)

| Property | Type     | Access | Description                                                                                |
| :------- | :------- | :----- | :----------------------------------------------------------------------------------------- |
| `length` | `number` | `get`  | Returns the number of elements in the queue.                                               |
| `items`  | `T[]`    | `get`  | Returns a shallow copy array of the elements currently in the queue (front to back order). |

### Methods

#### `enqueue(item: T): void`

Adds an element to the back of the queue.

#### `read(): T | undefined`

Returns the front element of the queue without removing it. Returns `undefined` if the queue is empty.

#### `dequeue(): T | undefined`

Removes and returns the front element of the queue. Returns `undefined` if the queue is empty.

#### `find(fn: (item: T) => boolean): T | undefined`

Finds the first element in the queue that matches the predicate function `fn`. Returns `undefined` if not found.

#### `indexOf(query: T | ((item: T) => boolean)): number`

Finds the index of the first element matching the given value or predicate `query`. Returns `-1` if not found.

#### `toString(): string`

Returns a string representation of the elements.

#### `toDebugString(): string`

Returns a detailed debug string representation of the queue (e.g., `Queue [ Task B, Task C, ]`).

#### `[Symbol.iterator](): Iterator<T>`

Makes the queue iterable. Iterates over elements starting from the front to the back of the queue (FIFO order).

```typescript
for (const item of queue) {
	console.log(item);
}
```
