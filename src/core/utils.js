
export function capitalize(string) {
	if (typeof string !== 'string') {
		return '';
	}
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function parseId(id) {
	const parsed = id.split(':');
	return {
		row: +parsed[0],
		col: +parsed[1]
	}
}

export function range(start, end) {
	if (start > end) {
		[end, start] = [start, end];
	}

	return new Array(end - start + 1)
		.fill('')
		.map((_, index) => start + index);
}