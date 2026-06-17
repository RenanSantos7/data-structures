import { ChainedList } from './chained-list.js';

export default class Queue<T> {
	protected _items = new ChainedList<T>();

	get length() {
		return this._items.length;
	}

	get items() {
		return [...this._items];
	}

	enqueue(item: T) {
		this._items.add(item);
	}

	read() {
		return this._items.get(0);
	}

	dequeue() {
		const value = this.read();
		if (value !== undefined) {
			this._items.removeFirst();
		}
		return value;
	}

	find(fn: (item: T) => boolean): T | undefined {
		return this._items.find(fn);
	}

	indexOf(query: T | ((item: T) => boolean)): number {
		return this._items.indexOf(query);
	}

	toString() {
		return `${this._items}`;
	}

	toDebugString() {
		let result = 'Queue [ ';
		for (let i = 0; i < this.length; i++) {
			result += String(this._items.get(i)) + ', ';
		}
		return `${result} ]`;
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toDebugString();
	}

	*[Symbol.iterator](): Iterator<T> {
		for (const item of this._items) {
			yield item;
		}
	}
}
