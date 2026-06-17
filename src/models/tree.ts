type Predicate<T> = (node: Tree<T>) => boolean;

export default class Tree<T> {
	protected _data: T | null;
	protected _children: (Tree<T> | null)[];
	protected _parent: Tree<T> | null;

	constructor(data?: T, children?: Tree<T>[], parent?: Tree<T>) {
		this._data = data ? data : null;
		this._children = children ? children : [];
		this._parent = parent ? parent : null;
	}

	get root(): Tree<T> {
		let node: Tree<T> = this;
		while (node._parent !== null) {
			node = node._parent;
		}
		return node;
	}

	get data() {
		return this._data;
	}

	get children() {
		return [...this._children];
	}

	get parent() {
		return this._parent;
	}

	get depth(): number {
		if (!this._parent) return 0;
		return 1 + this._parent.depth;
	}

	get height(): number {
		if (this.isLeaf) return 0;
		return (
			1 +
			Math.max(...this._children.map(child => (child ? child.height : 0)))
		);
	}

	set parent(node: Tree<T> | null) {
		if (this._parent === node) return;

		if (this._parent !== null) {
			this._parent.removeChild(this);
		}

		this._parent = node;
	}

	get size() {
		return this._getAllNodes().length;
	}

	get isRoot(): boolean {
		return !this._parent;
	}

	get isLeaf(): boolean {
		return this._children.length === 0;
	}

	private _getAllNodes(): Tree<T>[] {
		const allNodes: Tree<T>[] = [this];

		for (const child of this._children) {
			if (child !== null) {
				const childNodes = child._getAllNodes();
				allNodes.push(...childNodes);
			}
		}

		return allNodes;
	}

	[Symbol.iterator](): Iterator<Tree<T> | undefined> {
		let i = 0;
		const allNodes = this._getAllNodes();

		return {
			next(): IteratorResult<Tree<T> | undefined> {
				if (i < allNodes.length) {
					return { value: allNodes[i++], done: false };
				} else {
					return { value: undefined, done: true };
				}
			},
		};
	}

	addChild(child: Tree<T> | T) {
		if (!(child instanceof Tree)) {
			child = new Tree(child as T);
		}

		if (!this._children.includes(child)) {
			this._children.push(child);
		}

		child.parent = this;
	}

	addChildren(children: Array<Tree<T> | T>) {
		children.forEach(child => this.addChild(child));
	}

	find(query: Tree<T> | T | Predicate<T>): Tree<T> | undefined {
		const predicate: Predicate<T> =
			typeof query === 'function'
				? (query as Predicate<T>)
				: (node: Tree<T>) => node === query || node.data === query;

		if (predicate(this)) {
			return this;
		}

		for (const child of this._children) {
			if (child !== null) {
				const found = child.find(predicate);
				if (found) return found;
			}
		}

		return undefined;
	}

	depthOf(node: Tree<T> | T): number {
		const isTarget =
			node instanceof Tree ? this === node : this.data === node;

		if (isTarget) {
			return 0;
		}

		for (const child of this._children) {
			const childDepth = child ? child.depthOf(node) : -1;

			if (childDepth !== -1) {
				return childDepth + 1;
			}
		}

		return -1;
	}

	contains(node: Tree<T> | T) {
		return this.find(node) !== undefined;
	}

	removeChild(node: Tree<T>) {
		this._children = this._children.filter(child => child !== node);
	}

	toString(prefix: string | number = '', isLast: boolean = true): string {
		let prefixStr = '';
		if (typeof prefix === 'number') {
			prefixStr = '  '.repeat(prefix);
		} else {
			prefixStr = prefix;
		}

		const symbol = isLast ? '└─ ' : '├─ ';
		let result = `${prefixStr}${symbol}${this._data}\n`;

		const childPrefix = prefixStr + (isLast ? '  ' : '│ ');
		const activeChildren = this._children.filter(
			(child): child is Tree<T> => child !== null,
		);

		for (let i = 0; i < activeChildren.length; i++) {
			const childIsLast = i === activeChildren.length - 1;
			result += activeChildren[i]?.toString(childPrefix, childIsLast);
		}

		return result;
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toString();
	}
}
