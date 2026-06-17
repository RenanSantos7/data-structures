import Tree from './tree';

export class BinTreeChildrenError extends Error {
	constructor() {
		super('A binary tree cannot have more than 2 children.');
	}
}

export class BinaryTree<T> extends Tree<T> {
	constructor(data?: T | T[], parent?: BinaryTree<T>) {
		if (Array.isArray(data)) {
			if (data.length <= 2) {
				super(undefined, [], parent);
				data.forEach(item => this.addChild(item));
			} else {
				throw new BinTreeChildrenError();
			}
		} else {
			super(data as T, [], parent);
		}
	}

	get left(): BinaryTree<T> | null {
		return this._children[0] as BinaryTree<T> | null;
	}

	set left(node: BinaryTree<T> | null) {
		this._children[0] = node as unknown as Tree<T>;

		if (node) node.parent = this;
	}

	get right(): BinaryTree<T> | null {
		return this._children[1] as BinaryTree<T> | null;
	}

	set right(node: BinaryTree<T> | null) {
		this._children[1] = node as unknown as Tree<T>;
		if (node) node.parent = this;
	}

	private _preOrder(callback?: (arg: T) => any) {
		if (callback) {
			if (this.data !== undefined) callback(this.data as T);
			if (this.left) this.left._preOrder(callback);
			if (this.right) this.right._preOrder(callback);
			return;
		}

		const ordered: T[] = [];

		if (this.data !== undefined) {
			ordered.push(this.data as T);
		}

		if (this.left) {
			ordered.push(...(this.left._preOrder() as T[]));
		}

		if (this.right) {
			ordered.push(...(this.right._preOrder() as T[]));
		}

		return ordered;
	}

	private _inOrder(callback?: (arg: T) => any) {
		if (callback) {
			if (this.left) this.left._inOrder(callback);
			if (this.data !== undefined) callback(this.data as T);
			if (this.right) this.right._inOrder(callback);
			return;
		}

		const ordered: T[] = [];

		if (this.left) {
			ordered.push(...(this.left._inOrder() as T[]));
		}

		if (this.data !== undefined) {
			ordered.push(this.data as T);
		}

		if (this.right) {
			ordered.push(...(this.right._inOrder() as T[]));
		}

		return ordered;
	}

	private _postOrder(callback?: (arg: T) => any) {
		if (callback) {
			if (this.left) this.left._postOrder(callback);
			if (this.right) this.right._postOrder(callback);
			if (this.data !== undefined) callback(this.data as T);
			return;
		}
		const ordered: T[] = [];

		if (this.left) {
			ordered.push(...(this.left._postOrder() as T[]));
		}

		if (this.right) {
			ordered.push(...(this.right._postOrder() as T[]));
		}

		if (this.data !== undefined) {
			ordered.push(this.data as T);
		}

		return ordered;
	}

	override addChild(child: BinaryTree<T> | T) {
		if (!(child instanceof BinaryTree)) {
			child = new BinaryTree(child);
		}

		if (!this._children[0]) {
			this.left = child as BinaryTree<T>;
		} else if (!this._children[1]) {
			this.right = child as BinaryTree<T>;
		} else {
			throw new BinTreeChildrenError();
		}
	}

	override addChildren(children: (T | BinaryTree<T>)[]) {
		if (this._children.length + children.length > 2) {
			throw new BinTreeChildrenError();
		}

		children.forEach(child => this.addChild(child));
	}

	traverse(
		sequence: 'inorder' | 'preorder' | 'postorder' = 'inorder',
		callback?: (arg: T) => any,
	) {
		switch (sequence) {
			case 'inorder':
				return this._inOrder(callback);
			case 'preorder':
				return this._preOrder(callback);
			case 'postorder':
				return this._postOrder(callback);
		}
	}
}
