# Binary Tree

A **BinaryTree** (`BinaryTree<T>`) is a hierarchical, non-linear tree data structure where each node has at most two children, referred to as the left child (`left`) and the right child (`right`).

This implementation is part of the data structures library and is located in [bin-tree.ts](../src/models/bin-tree.ts).

## Table of Contents

- [Usage Example](#usage-example)
- [API Reference](#api-reference)
    - [Constructor](#constructor)
    - [Properties (Getters/Setters)](#properties-getterssetters)
    - [Methods](#methods)

## Usage Example

Below is a basic example showing how to create and traverse a BinaryTree:

```typescript
import { BinaryTree } from '@renansantos7/data-structures';

// 1. Create a binary tree root node
const tree = new BinaryTree<number>(10);

// 2. Add children manually or using left/right properties
tree.left = new BinaryTree(5);
tree.right = new BinaryTree(15);

// 3. Traversal (in-order: 5, 10, 15)
const inorderResult = tree.traverse('inorder');
console.log(inorderResult); // [5, 10, 15]

// 4. Traversal (pre-order: 10, 5, 15)
const preorderResult = tree.traverse('preorder');
console.log(preorderResult); // [10, 5, 15]
```

## API Reference

### Constructor

#### `constructor(data?: T | T[], parent?: BinaryTree<T>)`

Creates a new BinaryTree node/instance.

- **Parameters:**
    - `data` (optional): The data to store. Can be a single value of type `T` or an array of up to 2 values (which will be automatically added as left and right children).
    - `parent` (optional): The parent binary tree node (`BinaryTree<T>`).

### Properties (Getters/Setters)

| Property | Type                    | Access        | Description                        |
| :------- | :---------------------- | :------------ | :--------------------------------- |
| `left`   | `BinaryTree<T> \| null` | `get` / `set` | Gets or sets the left child node.  |
| `right`  | `BinaryTree<T> \| null` | `get` / `set` | Gets or sets the right child node. |

### Methods

#### `addChild(child: BinaryTree<T> | T): void`

Adds a child to the binary tree. It will populate the `left` slot first; if that is occupied, it will populate the `right` slot.

- Throws an error if both slots are already occupied.

#### `traverse(sequence?: 'inorder' | 'preorder' | 'postorder', callback?: (arg: T) => any): T[] | undefined`

Traverses the tree in the specified sequence.

- **Parameters:**
    - `sequence` (optional): The traversal sequence. Defaults to `'inorder'`.
    - `callback` (optional): A callback function to execute on each node's data. If provided, the traversal is executed but does not return an array of values.
- **Returns:** An array of values in the traversal order, or `undefined` if a callback is provided.
