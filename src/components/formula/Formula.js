import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
	static className = 'formula';

	constructor($root) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'click']
		})
	}

	toHTML() {
		return `
			<div class="formula__icon">fx:</div>
			<div class="formula__input">
				<input type="text" placeholder="...">
			</div>
		`;
	}

	onInput(event) {
		console.log('Value:', event.target.value);
	}

	onClick(event) {
		console.log(event.target);
	}
}