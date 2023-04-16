import {defaultStyles} from '@/constants';
import {toInlineStyles} from '@core/utils';
import {parse} from '@core/parse';

const CODES = {
	A: 65,
	Z: 90
}

const DEFAULT_WIDTH = 100;
const DEFAULT_HEIGHT = 25;

function toChar(el, index) {
	return String.fromCharCode(CODES.A + index);
}

function getWidth(state, index) {
	return (state[index] || DEFAULT_WIDTH) + 'px';
}


function getHeight(state, index) {
	return (state[index] || DEFAULT_HEIGHT) + 'px';
}

function createCell(state, row) {
	return function(_, column) {
		const width = getWidth(state.colState, column);
		const id = `${row}:${column}`;
		const data = state.dataState[id];
		const styles = toInlineStyles({
			...defaultStyles,
			...state.stylesState[id],	
		});
		return `
			<div 
				class="cell" 
				contenteditable 
				data-col="${column}" 
				data-id="${id}"
				data-value="${data || ''}"
				data-type="cell"
				style="${styles}; width: ${width}"
			>${parse(data) || ''}
			</div>
		`;
	}
}

function createCol(value, index, width) {
	return `
		<div 
			class="column"
			data-type='resizable' 
			data-col="${index}"
			style="width: ${width}"
		>
			${value}
			<div class="column-resize" data-resize="column"></div>
		</div>

	`;
}

function createRow(number, content, state) {
	const resize = number 
		? '<div class="row-resize" data-resize="row"></div>' 
		: '';
	const height = getHeight(state, number)
	return `
		<div 
			class="row"
			data-type='resizable' 
			data-row=${number}
			style="height: ${height}"
		>
			<div class="row__info">
				${number ? number: ''}
				${resize}
			</div>
			<div class="row__data">${content}</div>
		</div>
	`;
}


export function createTable(rowsCount = 20, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map((col, index) => {
			const width = getWidth(state.colState, index);
			return createCol(col, index, width);
		})
		.join('');


	rows.push(createRow(null, cols, {}));
	
	for (let row = 0; row < rowsCount; row++) {
		const cels = new Array(colsCount)
				.fill('')
				.map(createCell(state, row))
				.join('');
		rows.push(createRow(row + 1, cels, state.rowState));
	}

	return rows.join('');
}