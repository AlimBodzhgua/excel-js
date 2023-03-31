const CODES = {
	A: 65,
	Z: 90
}

function toChar(el, index) {
	return String.fromCharCode(CODES.A + index);
}


function createCell() {
	return `
		<div class="cell" contenteditable></div>
	`;
}

function createCol(value) {
	return `
		<div class="column">${value}</div>
	`;
}

function createRow(number, content) {
	return `
		<div class="row">
			<div class="row__info">${number ? number: ''}</div>
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