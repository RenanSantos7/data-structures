# Data Structures Library

A collection of standard, highly-optimized data structures implemented in TypeScript, packaged for Node.js and the browser.

## Installation

To use this library in your project, install it via your package manager of choice:

```bash
# Using npm
npm install @renansantos7/data-structures

# Using pnpm
pnpm add @renansantos7/data-structures

# Using yarn
yarn add @renansantos7/data-structures
```

## How to Import

All data structures are exported as named exports from the package root:

```typescript
import {
	Tree,
	BinaryTree,
	BinarySearchTree,
	ChainedList,
	OrderedList,
	Queue,
	Stack,
} from '@renansantos7/data-structures';
```

## Available Data Structures

Detailed documentation for each structure can be found in the `docs` directory:

- **[Tree](docs/Tree.md)**: A hierarchical, non-linear general tree structure.
- **[Binary Tree](docs/BinaryTree.md)**: A tree structure where each node has at most two children.
- **[Binary Search Tree](docs/BinarySearchTree.md)**: A sorted binary tree variant that optimizes search, insertion, and deletion.
- **[Stack](docs/Stack.md)**: A LIFO (Last In, First Out) stack implementation.
- **[Queue](docs/Queue.md)**: A FIFO (First In, First Out) queue implementation backed by a ChainedList.
- **[Chained List](docs/ChainedList.md)**: A singly linked list implementation.
- **[Ordered List](docs/OrderedList.md)**: A list that maintains elements in sorting order dynamically.

## License

MIT
