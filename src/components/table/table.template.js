const CODES = {
	A: 65,
	Z: 90
}

function toChar(el, index) {
	return String.fromCharCode(CODES.A + index);
}


function createCell(row) {
	return function(_, column) {
		return `
			<div 
				class="cell" 
				contenteditable 
				data-col="${column}" 
				data-id="${row}:${column}"
				data-type="cell"
			>
			</div>
		`;
	}
}

function createCol(value, index) {
	return `
		<div class="column" data-type='resizable' data-col="${index}">
			${value}
			<div class="column-resize" data-resize="column"></div>
		</div>

	`;
}

function createRow(number, content) {
	const resize = number 
		? '<div class="row-resize" data-resize="row"></div>' 
		: '';
	return `
		<div class="row" data-type='resizable'>
			<div class="row__info">
				${number ? number: ''}
				${resize}
			</div>
			<div class="row__data">${content}</div>
		</div>
	`;
}


export function createTable(rowsCount = 20) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(createCol)
		.join('');


	rows.push(createRow(null, cols));
	
	for (let row = 0; row < rowsCount; row++) {
		const cels = new Array(colsCount)
				.fill('')
				.map(createCell(row))
				.join('');
		rows.push(createRow(row + 1, cels));
	}

	return rows.join('');
}