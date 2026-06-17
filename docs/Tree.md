# Tree

A **Tree** (`Tree<T>`) is a hierarchical, non-linear data structure consisting of nodes connected by edges. Each node contains a value (`data`), references to other nodes called children (`children`), and a reference to its parent node (`parent`).

This implementation is part of the data structures library and is located in [tree.ts](../src/models/tree.ts).

## Table of Contents

- [Usage Example](#usage-example)
- [API Reference](#api-reference)
    - [Constructor](#constructor)
    - [Properties (Getters/Setters)](#properties-getterssetters)
    - [Methods](#methods)

## Usage Example

Below is a basic example showing how to create, manipulate, and search a Tree:

```typescript
import { Tree } from '@renansantos7/data-structures';

// 1. Create the root node
const root = new Tree<string>('President');

// 2. Add child nodes
const directorA = new Tree<string>('Director A');
root.addChild(directorA);

// You can also add a child by passing the value directly:
root.addChild('Director B');

// Add sub-children
directorA.addChild('Manager A1');
directorA.addChild('Manager A2');

// 3. Print the tree structure
console.log(root.toString());
/*
Output:
└─ President
  ├─ Director A
    ├─ Manager A1
    └─ Manager A2
  └─ Director B
*/

// 4. Search for elements in the tree
const manager = root.find('Manager A1');
if (manager) {
	console.log(`Found: ${manager.data}`); // Found: Manager A1
	console.log(`Depth of Manager A1: ${manager.depth}`); // 2
}

// 5. Verify tree properties
console.log(`Tree height: ${root.height}`); // 2
console.log(`Total nodes (size): ${root.size}`); // 5
console.log(`Is root a leaf? ${root.isLeaf}`); // false
```

## API Reference

### Type Definitions

#### `Predicate<T>`

A callback function type used for filtering or finding nodes in the tree.

```typescript
type Predicate<T> = (node: Tree<T>) => boolean;
```

### Constructor

#### `constructor(data?: T, children?: Tree<T>[], parent?: Tree<T>)`

Creates a new Tree node/instance.

- **Parameters:**
    - `data` (optional): The value stored in the node. Defaults to `null` if not provided.
    - `children` (optional): An array of child nodes (`Tree<T>[]`). Defaults to `[]`.
    - `parent` (optional): The parent node (`Tree<T>`). Defaults to `null`.

### Properties (Getters/Setters)

| Property   | Type              | Access        | Description                                                                                                              |
| :--------- | :---------------- | :------------ | :----------------------------------------------------------------------------------------------------------------------- |
| `root`     | `Tree<T>`         | `get`         | Returns the root node of the tree (the top-most node with no parent).                                                    |
| `data`     | `T \| null`       | `get`         | Returns the data/value encapsulated by this node.                                                                        |
| `children` | `Tree<T>[]`       | `get`         | Returns a shallow copy of the child nodes array.                                                                         |
| `parent`   | `Tree<T> \| null` | `get` / `set` | Gets or sets the parent node. Setting a new parent automatically removes the node from its old parent's children.        |
| `depth`    | `number`          | `get`         | Returns the depth of the node (distance from the root). The root node has a depth of 0.                                  |
| `height`   | `number`          | `get`         | Returns the height of the node (the length of the longest path from this node to a leaf). A leaf node has a height of 0. |
| `size`     | `number`          | `get`         | Returns the total number of nodes in the subtree rooted at this node.                                                    |
| `isRoot`   | `boolean`         | `get`         | Returns `true` if the node is the root (has no parent).                                                                  |
| `isLeaf`   | `boolean`         | `get`         | Returns `true` if the node is a leaf (has no children).                                                                  |

### Methods

#### `addChild(child: Tree<T> | T): void`

Adds a child node to this node.

- If the `child` argument is a `Tree<T>` instance, it is added directly.
- If it is a raw value of type `T`, a new `Tree<T>` is instantiated with that value.
- This method automatically updates the `parent` reference of the added child.

#### `find(query: Tree<T> | T | Predicate<T>): Tree<T> | undefined`

Performs a depth-first search (DFS) on the subtree rooted at the current node.

- **Parameters:**
    - `query`: A node (`Tree<T>`), a value (`T`), or a predicate function (`Predicate<T>`).
- **Returns:** The first matching node found, or `undefined` if no node matches.

#### `depthOf(node: Tree<T> | T): number`

Calculates the relative depth of a given node or value relative to the current node.

- **Returns:** The numerical depth (starting at 0 for the current node) or `-1` if the target is not found in the subtree.

#### `contains(node: Tree<T> | T): boolean`

Checks if the subtree rooted at the current node contains the specified node or value.

- **Returns:** `true` if found, `false` otherwise.

#### `removeChild(node: Tree<T>): void`

Removes the specified node from the children array of the current node.

> [!NOTE]
> This method does not automatically reset the `parent` property of the removed node; it only removes it from the parent's children array.

#### `toString(depth?: number, isLast?: boolean): string`

Generates a formatted string representation of the tree (using ASCII box-drawing characters).

- **Parameters:**
    - `depth` (optional): The starting indentation depth (defaults to `0`).
    - `isLast` (optional): Indication of whether the node is the last child of its parent (defaults to `true`), which changes the prefix drawing symbol (`└─` or `├─`).

#### Iteration

Makes the tree instance iterable. Allows traversing all nodes in the tree in pre-order using loop structures like `for...of`.

```typescript
for (const node of myTree) {
	console.log(node?.data);
}
```
