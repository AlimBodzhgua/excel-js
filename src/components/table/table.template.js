const CODES = {
	A: 65,
	Z: 90
}

function toChar(el, index) {
	return String.fromCharCode(CODES.A + index);
}


function createCell(_, column) {
	return `
		<div class="cell" data-col="${column}" contenteditable></div>
	`;
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

	const cels = new Array(colsCount)
			.fill('')
			.map(createCell)
			.join('');

	rows.push(createRow(null, cols));
	
	for (let i = 1; i <= rowsCount; i++) {
		rows.push(createRow(i, cels));
	}

	return rows.join('');
}