# Binary Search Tree (BST)

A **BinarySearchTree** (`BinarySearchTree<T>`) is a sorted binary tree where the left child of a node contains only values less than the node's value, and the right child contains only values greater than or equal to the node's value (depending on duplicates setting).

This implementation is part of the data structures library and is located in [bin-tree.ts](../src/models/bin-tree.ts#L151).

## Table of Contents

- [Usage Example](#usage-example)
- [API Reference](#api-reference)
    - [Constructor](#constructor)
    - [Properties (Getters)](#properties-getters)
    - [Methods](#methods)

## Usage Example

Below is a basic example showing how to create, insert, search, and remove elements in a BinarySearchTree:

```typescript
import { BinarySearchTree } from '@renansantos7/data-structures';

// 1. Create a BST
const bst = new BinarySearchTree<number>([10, 5, 15, 8]);

// 2. Insert elements
bst.insert(12);

// 3. Search for elements
const foundNode = bst.find(8);
if (foundNode) {
	console.log(foundNode.data); // 8
}

// 4. Remove elements
bst.remove(10); // Removes the root node, restructuring the tree
```

## API Reference

### Constructor

#### `constructor(data?: T | (T | null)[], parent?: BinarySearchTree<T>, options?: BstOptions<T>)`

Creates a new BinarySearchTree node/instance.

- **Parameters:**
    - `data` (optional): Initial data value or array of up to 2 items to populate the tree.
    - `parent` (optional): Parent BST node.
    - `options` (optional): BST configuration options:
        - `allowDuplicates` (boolean): Whether duplicate values are allowed in the BST (defaults to `false`).
        - `compareFn` (function): Custom comparison function `(a: T, b: T) => number`. Defaults to sorting by standard operators (`<`, `>`).

### Properties (Getters)

| Property          | Type                          | Access     | Description                                                                       |
| :---------------- | :---------------------------- | :--------- | :-------------------------------------------------------------------------------- |
| `allowDuplicates` | `boolean`                     | `readonly` | Whether duplicates are allowed.                                                   |
| `left`            | `BinarySearchTree<T> \| null` | `get`      | Returns the left child node. Direct manual mutation via `set left` is disabled.   |
| `right`           | `BinarySearchTree<T> \| null` | `get`      | Returns the right child node. Direct manual mutation via `set right` is disabled. |

### Methods

#### `insert(value: T): void`

Inserts a new value into the BST at its mathematically correct location.

#### `find(value: T): BinarySearchTree<T> | undefined`

Searches for the value in the BST using binary search.

- **Returns:** The matching node if found, or `undefined`.

#### `remove(value: T): void`

Removes a value from the BST and automatically restructures the tree to maintain the BST invariant.

#### `isLeft(node: BinarySearchTree<T>): boolean`

Returns `true` if the given node is the left child of the current node.

#### `isRight(node: BinarySearchTree<T>): boolean`

Returns `true` if the given node is the right child of the current node.

### Disabled / Deprecated Inherited Methods

The following methods inherited from the base `Tree` / `BinaryTree` classes are disabled on BSTs to maintain tree order invariants, and will throw errors if called:

- `set left` (setter)
- `set right` (setter)
- `addChild`
- `removeChild`
