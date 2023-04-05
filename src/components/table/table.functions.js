import {range} from '@core/utils';

export function shouldResize(event) {
	return event.target.dataset.resize;
}

export function isCell(event) {
	return event.target.dataset.type === 'cell';
}

export function countRows($root) {
	return $root.findAll('.row').length - 2;
}
	
export function matrix(targetId, currentId) {
	const cols = range(targetId.col, currentId.col);
	const rows = range(targetId.row, currentId.row);

	return cols.reduce((acc, col) => {
		rows.forEach(row => acc.push(`${row}:${col}`))
		return acc;
	}, [])
}


export function nextSelector(key, {col, row}, $root) {
	const MIN_VALUE = 0;
	const MAX_COL_VALUE = 25;
	const MAX_ROW_VALUE = countRows($root);

	if (key === 'ArrowRight' || key === 'Tab') {
		col = col + 1 > MAX_COL_VALUE ? MAX_COL_VALUE : col + 1;
	} else if (key === 'ArrowLeft') {
		col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
	} else if (key === 'ArrowDown' || key === 'Enter') {
		row = row + 1 > MAX_ROW_VALUE ? MAX_ROW_VALUE : row + 1;
	} else if (key === 'ArrowUp') {
			row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
	}
	
	return `[data-id="${row}:${col}"`;
}