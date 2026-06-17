import { BinaryTree, BinTreeChildrenError } from './bin-tree';
import Tree from './tree';

type ComparisonFunction<T> = (a: T, b: T) => number;
type BstOptions<T> = {
	allowDuplicates: boolean;
	compareFn: ComparisonFunction<T>;
};

class BSTonChangeError extends Error {
	constructor(message?: string) {
		super(
			message ?? 'Do not modify nodes manually on a BST. Use insert().',
		);
	}
}

export class BinarySearchTree<T> extends BinaryTree<T> {
	readonly allowDuplicates: boolean;
	protected readonly _compareFn: ComparisonFunction<T>;

	constructor(
		data?: T | (T | null)[],
		parent?: BinarySearchTree<T>,
		options: BstOptions<T> = {
			allowDuplicates: false,
			compareFn: (a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0),
		},
	) {
		if (Array.isArray(data)) {
			if (data.length <= 2) {
				super(undefined, parent);
				data.forEach(item => this.insert(item as T));
			} else {
				throw new BinTreeChildrenError();
			}
		} else {
			super(data as T, parent);
		}

		this.allowDuplicates = options.allowDuplicates;
		this._compareFn = options.compareFn;
	}

	/**
	 * @deprecated Mutação estrutural manual desabilitada. A BST é gerenciada automaticamente.
	 */
	override set left(node: BinaryTree<T> | null) {
		throw new BSTonChangeError();
	}

	override get left(): BinarySearchTree<T> | null {
		return (this._children[0] as BinarySearchTree<T>) ?? null;
	}

	/**
	 * @deprecated Structural manual mutation disabled. BST é managed automatically.
	 */
	override set right(node: BinaryTree<T> | null) {
		throw new BSTonChangeError();
	}

	override get right(): BinarySearchTree<T> | null {
		return (this._children[1] as BinarySearchTree<T>) ?? null;
	}

	/**
	 * @deprecated Use insert() method to manage data on a Binary Search Tree.
	 */
	override addChild(child: Tree<T> | T) {
		throw new BSTonChangeError(
			'addChild method not allowed on BST. Use insert().',
		);
	}

	isLeft(node: BinarySearchTree<T>): boolean {
		return this.left === node;
	}

	isRight(node: BinarySearchTree<T>): boolean {
		return this.right === node;
	}

	insert(value: T) {
		if (this.data === null) {
			this._data = value;
			return;
		}

		const cmp = this._compareFn(value, this.data);

		if (cmp < 0) {
			if (this.left) {
				(this.left as BinarySearchTree<T>).insert(value);
			} else {
				super.left = new BinarySearchTree(value, this, {
					allowDuplicates: this.allowDuplicates,
					compareFn: this._compareFn,
				});
			}
		} else {
			if (cmp === 0 && !this.allowDuplicates) {
				return;
			}

			if (this.right) {
				(this.right as BinarySearchTree<T>).insert(value);
			} else {
				super.right = new BinarySearchTree(value, this, {
					allowDuplicates: this.allowDuplicates,
					compareFn: this._compareFn,
				});
			}
		}
	}

	override find(value: T): BinarySearchTree<T> | undefined {
		if (this.data === null) return undefined;

		const cmp = this._compareFn(value, this.data);

		if (cmp === 0) return this;

		if (cmp < 0) {
			return this.left
				? (this.left as BinarySearchTree<T>).find(value)
				: undefined;
		} else {
			return this.right
				? (this.right as BinarySearchTree<T>).find(value)
				: undefined;
		}
	}

	remove(value: T) {
		const node = this.find(value);
		if (!node) return;

		if (node.isLeaf) {
			const parent = node.parent as BinarySearchTree<T>;
			if (parent.left === node) parent._children[0] = null;
			else parent._children[1] = null;
			node._parent = null;
			return;
		}

		if (!!node.left !== !!node.right) {
			const child = (node.left ?? node.right) as BinarySearchTree<T>;
			const parent = node.parent as BinarySearchTree<T> | null;

			if (parent) {
				if (parent.left === node) parent._children[0] = child;
				else parent._children[1] = child;
			}

			child._parent = parent;
			node._parent = null;
			return;
		}

		const successor = node._findSuccessor()!;
		node._data = successor.data!;
		this.remove(successor.data!);
	}

	protected _findSuccessor(): BinarySearchTree<T> | null {
		if (!this.right) return null;

		let node = this.right as BinarySearchTree<T>;
		while (node.left) {
			node = node.left as BinarySearchTree<T>;
		}
		return node;
	}

	/**
	 * @deprecated Use insert() method to manage data on a Binary Search Tree.
	 */
	override removeChild(node: Tree<T>) {
		throw new BSTonChangeError(
			'removeChild method not allowed on BST. Use remove().',
		);
	}
}
