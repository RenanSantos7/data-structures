class Element<T> {
	value: T;
	next: Element<T> | null;

	constructor(valor: T) {
		this.value = valor;
		this.next = null;
	}

	toString() {
		return JSON.stringify(this.value);
	}
}

export class ChainedList<T> {
	protected _first: Element<T> | null;
	protected _last: Element<T> | null;
	protected _length: number;

	constructor(item?: T | T[]) {
		this._first = null;
		this._last = null;
		this._length = 0;

		if (Array.isArray(item)) {
			item.forEach(i => this.add(i));
		} else if (item !== undefined) {
			this.add(item);
		}
	}

	get first() {
		return this._first?.value;
	}

	get last() {
		return this._last?.value;
	}

	get length() {
		return this._length;
	}

	*[Symbol.iterator](): Generator<T> {
		let currentItem = this._first;
		while (currentItem) {
			yield currentItem.value;
			currentItem = currentItem.next;
		}
	}

	toString() {
		let string = '';
		let currentItem = this._first;

		while (currentItem) {
			string += currentItem.toString();
			currentItem = currentItem.next;
		}

		return `[ ${string}]`;
	}

	add(item: T) {
		const newItem = new Element(item);

		if (this._length === 0) {
			this._first = newItem;
			this._last = newItem;
		} else {
			this._last!.next = newItem;
			this._last = newItem;
		}

		this._length++;
	}

	find(fn: (item: T) => boolean): T | undefined {
		const index = this._search(fn);
		return this.get(index);
	}

	insert(item: T, index: number) {
		index = Math.trunc(index);

		if (index < 0 || index > this._length) {
			throw new Error('Indice fora do intervalo');
		}

		if (index === this._length) {
			this.add(item);
			return;
		}

		const newItem = new Element(item);
		let currentItem = this._first;
		let previousItem: Element<T> | null = null;
		let currentIndex = 0;

		do {
			if (index === currentIndex) {
				if (index === 0) {
					this._first = newItem;
				} else {
					previousItem!.next = newItem;
				}
				newItem.next = currentItem;
				break;
			} else {
				previousItem = currentItem;
				currentItem = currentItem!.next;
				currentIndex++;
			}
		} while (currentItem);

		this._length++;
	}

	remove(index: number) {
		index = Math.trunc(index);

		if (index === 0) {
			this.removeFirst();
			return;
		}

		if (this._length === 0) {
			throw new Error('Impossível remover. A lista está vazia.');
		}

		if (index < 0 || index >= this._length) {
			throw new Error('Indice fora do intervalo');
		}

		let currentItem = this._first;
		let previousItem: Element<T> | null = null;
		let currentIndex = 0;

		while (currentItem) {
			if (index === currentIndex) {
				if (currentIndex === 0) {
					this._first = currentItem.next;
				} else {
					previousItem!.next = currentItem.next;
				}

				if (currentIndex === this._length - 1) {
					this._last = previousItem;
				}

				break;
			} else {
				currentIndex++;
				previousItem = currentItem;
				currentItem = currentItem.next;
			}
		}

		this._length--;
	}

	removeFirst() {
		if (this._length === 0) {
			throw new Error('Impossível remover. A lista está vazia.');
		}

		if (this._length === 1) {
			this._first = null;
			this._last = null;
		} else {
			this._first = this._first!.next;
		}

		this._length--;
	}

	indexOf(query: T | ((item: T) => boolean)): number {
		return this._search(query);
	}

	private _search(query: T | ((item: T) => boolean)): number {
		const predicate =
			typeof query === 'function'
				? (query as (item: T) => boolean)
				: (item: T) => item === query;

		let index = 0;
		let currentItem = this._first;

		while (currentItem) {
			if (predicate(currentItem.value)) {
				return index;
			}
			currentItem = currentItem.next;
			index++;
		}

		return -1;
	}

	update(value: T, index: number) {
		index = Math.trunc(index);

		if (index < 0 || index >= this._length) {
			throw new Error('Indice fora do intervalo');
		}

		let currentIndex = 0;
		let currentItem = this._first;

		while (currentItem) {
			if (currentIndex === index) {
				currentItem.value = value; // Altera apenas o valor interno
				return;
			}
			currentItem = currentItem.next;
			currentIndex++;
		}
	}

	get(index: number) {
		index = Math.trunc(index);

		if (index === 0) {
			return this.first;
		}

		let currentIndex = 0;
		('');
		let currentItem = this._first;

		while (currentItem) {
			if (index === currentIndex) {
				return currentItem.value;
			}
			currentIndex++;
			currentItem = currentItem.next;
		}

		return undefined;
	}
}
