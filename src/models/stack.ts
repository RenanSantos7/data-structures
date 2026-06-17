export default class Stack<T> {
	private _items: T[];

	constructor(items?: T[] | T) {
		this._items = [];

		if (Array.isArray(items)) {
			items.forEach(item => this.push(item));
		} else if (items !== undefined && this._items !== null) {
			this._items.push(items);
		}
	}

	get length() {
		return this._items.length;
	}

	get items() {
		return [...this._items];
	}

	get peek() {
		const lastIndex = this.length - 1;
		return this._items[lastIndex];
	}

	push(item: T) {
		this._items.push(item);
	}

	pop() {
		return this._items.pop();
	}

	toString() {
		if (this.length) return `[ ${this.peek!.toString()}, ...]`;
		return '[ ]';
	}

	toDebugString() {
		return `[ ${this._items.toReversed().join(', ')} ]`;
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toDebugString();
	}

	// Método iterador usando gerador
	*[Symbol.iterator](): Iterator<T> {
		for (let i = this.length - 1; i >= 0; i--) {
			yield this._items[i]!;
		}
	}
}
