import {shouldResize,
		isCell,
		matrix,
		nextSelector} from '@/components/table/table.functions';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resize';
import {ExcelComponent} from '@core/ExcelComponent';
import {TableSelection} from '@core/TableSelection';
import {defaultStyles} from '@/constants';
import {parseId} from '@core/utils';
import {parse} from '@core/parse';
import {$} from '@core/dom';
import * as actions from '@/redux/actions';

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
		return createTable(20, this.store.getState());
	}

	prepare() {
		this.selection = new TableSelection();
	}

	init() {
		super.init();

		const $cell = this.$root.find('[data-id="0:0"]')
		this.selectCell($cell);

		this.$on('formula:input', value => {
			this.selection.current.attr('data-value', value);
			this.selection.current.text(parse(value));
			this.updateTextInStore(value);
		})
		
		this.$on('formula:enter', () => {
			this.selection.current.focus();
		})

		this.$on('toolbar:applyStyle', value => {
			this.selection.applyStyle(value);
			this.$dispatch(actions.applyStyle({
				value,
				ids: this.selection.selectedIds,
			}))
		})
	}

	selectCell($cell) {
		this.selection.select($cell);
		this.$emit('table:select', $cell);
		const styles = $cell.getStyles(Object.keys(defaultStyles));
		this.$dispatch(actions.changeStyles(styles));
	}

	async resizeTable(event) {
		try {
			const data = await resizeHandler(this.$root, event)
			this.$dispatch(actions.tableResize(data));
		} catch (e) {
			console.warn('Resize error', e.message);
		}
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			this.resizeTable(event);
		} else if (isCell(event)) {
			const $cell = $(event.target);
			if (event.ctrlKey) {
				this.selection.selectGroup($cell);			
			} else if (event.shiftKey) {
				const targetId = parseId($cell.data.id);
				const currentId = parseId(this.selection.current.data.id);
				
				const ids = matrix(targetId, currentId);
				const $cells = ids.map(id => this.$root.find(`[data-id="${id}"]`));
				this.selection.selectRange($cells);
			} else {
				this.selectCell($cell);
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

	updateTextInStore(value) {
		this.$dispatch(actions.textChange({
			id: this.selection.current.data.id,
			value,
		}))
	}

	onInput(event) {
		this.updateTextInStore($(event.target).text());
	}
}