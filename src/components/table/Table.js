import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {createTable} from '@/components/table/table.template';

export class Table extends ExcelComponent {
	static className = 'table';

	constructor($root) {
		super($root, {
			listeners: ['mousedown'],
		})
	}

	toHTML() {
		return createTable();
	}

	onMousedown(event) {
		if (event.target.dataset.resize) {
			const $resizer = $(event.target);
			const $parent = $resizer.closest('[data-type="resizable"]');	
			const coords = $parent.getCoords();
			const type = $resizer.data.resize;

			const tableHeight = this.$root.getCoords().height;
			const tableWidth = this.$root.getCoords().width;
			let value;

			document.onmousemove = (e) => {
				if (type === 'column') {
					const delta = Math.floor(e.pageX - coords.right);
					value = coords.width + delta;
					$resizer.css({
						right: -delta + 'px',
						height: tableHeight + 'px',
						opacity: 1,
					})
				} else {
					const delta = Math.floor(e.pageY - coords.bottom);
					value = coords.height + delta;
					
					$resizer.css({
						bottom: -delta + 'px',
						width: tableWidth + 'px',
						opacity: 1,
					})
				}
			}
				
			document.onmouseup = () => {
				document.onmousemove = null;
				if (type === 'column') {
					$resizer.css({
						right: 0,
						height: 100 + '%',
						opacity: 0,
					})
					$parent.css({width: value + 'px'});

					this.$root.findAll(`[data-col="${$parent.data.col}"]`)
						.forEach(cell => $(cell).css({width: value + 'px'}))
				} else {
					$resizer.css({
						bottom: 0,
						width: 100 + '%',
						opacity: 0,
					})
					$parent.css({height: value + 'px'});
				}
			}
		}
	}
}