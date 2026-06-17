type Options<T> = {
	allowDuplicates?: boolean;
	comparisonKey?: keyof T | ((item: T) => keyof T | (keyof T)[]) | undefined;
	order?: 'asc' | 'desc';
};

export default class OrderedList<T> {
	protected _items: T[];
	protected _allowDuplicates: boolean;
	protected _comparisonKey: Options<T>['comparisonKey'];
	protected _order: Options<T>['order'];

	constructor(items?: T | T[] | OrderedList<T>, options?: Options<T>) {
		this._items = [];
		this._comparisonKey = options?.comparisonKey;
		this._allowDuplicates = !options?.comparisonKey
			? (options?.allowDuplicates ?? false)
			: (options?.allowDuplicates ?? true);
		this._order = options?.order ?? 'asc';

		if (items instanceof OrderedList) {
			items.items.forEach(item => this.insert(item));
		} else if (Array.isArray(items)) {
			items.forEach(item => this.insert(item));
		} else if (items !== undefined) {
			this.insert(items);
		}
	}

	get items() {
		return this._items;
	}

	get length() {
		return this._items.length;
	}

	get comparisonKey() {
		return this._comparisonKey;
	}

	set comparisonKey(key: OrderedList<T>['_comparisonKey']) {
		if (this._comparisonKey === undefined) {
			this._comparisonKey = key;
		} else {
			throw new OrderedListError(
				'You cannot change comparison key. Create another instance instead.',
			);
		}
	}

	every(callback: (item: T) => boolean): boolean {
		return this._items.every(callback);
	}

	filter(callback: (element: T) => boolean): T[] {
		return this._items.filter(callback);
	}

	find(callback: (element: T) => boolean): T | undefined {
		return this._items.find(callback);
	}

	findIndex(callback: (element: T) => boolean): number {
		return this._items.findIndex(callback);
	}

	includes(item: T): boolean {
		return this._items.includes(item);
	}

	insert(item: T) {
		const { items } = this;

		if (this.length === 0) {
			this._items.push(item);
			return;
		}

		if (typeof item === 'number' || typeof item === 'string') {
			for (let i = 0; i < this.length; i++) {
				if (items[i] === item) {
					if (this._allowDuplicates) {
						this._items.splice(i, 0, item);
					}
					return;
				}

				switch (this._order) {
					case 'asc':
						if (
							(items[i] as unknown as string | number) >
							(item as unknown as string | number)
						) {
							this._items.splice(i, 0, item);
							return;
						}
						break;
					case 'desc':
						if (
							(items[i] as unknown as string | number) <
							(item as unknown as string | number)
						) {
							this._items.splice(i, 0, item);
							return;
						}
						break;
				}
			}
			this._items.push(item);
			return;
		}

		if (typeof item === 'object' && item !== null) {
			this._insertObj(item);
		}
	}

	protected _getValue(obj: T): unknown {
		if (typeof this._comparisonKey === 'function')
			return this._comparisonKey(obj);
		if (this._comparisonKey)
			return (obj as Record<string, unknown>)[
				this._comparisonKey as string
			];
		return obj;
	}

	protected _insertObj(item: T) {
		const { items } = this;

		const itemKey = this._getValue(item) as string | number;

		for (let i = 0; i < this.length; i++) {
			const currentValue = this._getValue(items[i]!) as string | number;

			if (currentValue === itemKey) {
				if (this._allowDuplicates) {
					this._items.splice(i, 0, item);
				}
				return;
			}

			switch (this._order) {
				case 'asc':
					if (currentValue > itemKey) {
						this._items.splice(i, 0, item);
						return;
					}
					break;
				case 'desc':
					if (currentValue < itemKey) {
						this._items.splice(i, 0, item);
						return;
					}
					break;
			}
		}

		this._items.push(item);
	}

	indexOf(item: T): number {
		const targetKey = this._getValue(item);
		return this._items.findIndex(
			current => this._getValue(current) === targetKey,
		);
	}

	join(separator?: string): string {
		return this._items.join(separator);
	}

	lastIndexOf(item: T): number {
		return this._items.lastIndexOf(item);
	}

	map<S>(callback: (item: T) => S): OrderedList<S> {
		return new OrderedList<S>(this._items.map(callback));
	}

	remove(item: T) {
		const i = this.indexOf(item);
		if (i >= 0) this.removeByIndex(i);
	}

	removeByIndex(index: number) {
		if (index % 1 !== 0) {
			throw new OrderedListError('Indexes have to be integer');
		}

		if (index < 0 || index >= this.length) {
			throw new OrderedListError('Out of range index');
		}

		this._items.splice(index, 1);
	}

	revert(): OrderedList<T> {
		return new OrderedList(this, {
			allowDuplicates: this._allowDuplicates,
			order: this._order === 'asc' ? 'desc' : 'asc',
			comparisonKey: this._comparisonKey,
		});
	}

	slice(start: number, end?: number) {
		return new OrderedList(this._items.slice(start, end));
	}

	some(callback: (item: T) => boolean): boolean {
		return this._items.some(callback);
	}

	toString() {
		let itemsStr = String(this._items).replaceAll(',', ', ');

		if (typeof this._items[0] === 'object') {
			itemsStr = JSON.stringify(this._items)
				.replace(/^\[/, '')
				.replace(/\]$/, '')
				.replaceAll('},', '}, ');
		}

		return `[ ${itemsStr} ]`;
	}

	[Symbol.for('nodejs.util.inspect.custom')]() {
		return this.toString();
	}

	// Método iterador usando gerador
	*[Symbol.iterator](): Iterator<T> {
		for (const item of this._items) {
			yield item;
		}
	}
}

class OrderedListError extends Error {}
