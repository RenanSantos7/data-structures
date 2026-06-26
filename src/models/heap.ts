interface HeapItem {
	priority: number;
	index: number;
}

export default class MaxHeap<T extends HeapItem> {
	protected _heap: T[];

	constructor(items?: T[]) {
		this._heap = [];
	}

	protected _fromArray() {
		this._heap.forEach((item, i) => {
			item!.index = i;
		});

		this._heap.forEach((item, i) => {});
	}

	get lenght() {
		return this._heap.length;
	}

	get items() {
		return [...this._heap];
	}

	get peek() {
		return this._heap[0];
	}

	protected _parent(index: number): number {
		return Math.floor((index - 1) / 2);
	}

	protected _leftChildIdx(index: number): number {
		return index * 2 + 1;
	}

	protected _rightChildIdx(index: number): number {
		return (index + 1) * 2;
	}

	private _swap(i: number, j: number) {
		if (i < 0 || j < 0 || i >= this.lenght || j >= this.lenght) {
			throw new Error('Out of range index');
		}
		[this._heap[j]!, this._heap[i]!] = [this._heap[i]!, this._heap[j]!];
	}

	protected _heapifyUp(index: number) {
		if (index < 0 || index >= this.lenght) {
			throw new Error('Out of range index');
		}
		const current = this._heap[index]!;
		let parentIndex = this._parent(index)!;
		while (index > 0 || current > this._heap[parentIndex]!) {
			parentIndex = this._parent(index)!;
			this._swap(index, parentIndex);
			index = parentIndex;
		}
	}

	protected _heapifyDown(index: number) {
		let max = index;
		let left = this._leftChildIdx(index);
		let right = this._rightChildIdx(index);

		if (left < this.lenght && this._heap[left]! > this._heap[max]!) {
			max = left;
		}

		if (right < this.lenght && this._heap[right]! > this._heap[max]!) {
			max = right;
		}

		if (index !== max) {
			this._swap(index, max);
			this._heapifyDown(max);
		}
	}
}
