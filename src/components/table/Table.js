import {shouldResize,
		isCell,
		matrix,
		nextSelector} from '@/components/table/table.functions';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from '@core/TableSelection';
import {parseId} from '@core/utils';
import {$} from '@core/dom';


export class Table extends ExcelComponent {
	static className = 'table';

	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options,
		})
	}

	toHTML() {
		return createTable();
	}

	prepare() {
		this.selection = new TableSelection();
	}

	init() {
		super.init();

		const $cell = this.$root.find('[data-id="0:0"]')
		this.selectCell($cell);

		this.$on('formula:input', text => {
			this.selection.current.text(text);
		})
		this.$on('formula:enter', () => {
			this.selection.current.focus();
		})
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit('table:select', $cell);
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event);
		} else if (isCell(event)) {
			const $cell = $(event.target);
			if (event.ctrlKey) {
				this.selection.selectGroup($cell);			
			} else if (event.shiftKey) {
				const targetId = parseId($cell.data.id);
				const currentId = parseId(this.selection.current.data.id);
				
				const ids = matrix(targetId, currentId);
				const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`))
				this.selection.selectRange($cells);
			} else {
				this.selection.select($cell);
			}
		}
	}

	onKeydown(event) {
		const keys = [
			'ArrowUp',
			'ArrowDown',
			'ArrowRight',
			'ArrowLeft',
			'Enter',
			'Tab',
		]

		if (keys.includes(event.key) && !event.shiftKey) {
			event.preventDefault();
		
			const {col, row} = parseId(this.selection.current.data.id);
			const $nextCell = this.$root.find(
				nextSelector(event.key, {col, row}, this.$root)
			);
			this.selectCell($nextCell)
		}
	}

	onInput(event) {
		this.$emit('table:input', $(event.target))
	}
}