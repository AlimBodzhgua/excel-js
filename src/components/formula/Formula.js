import {ExcelComponent} from '@core/ExcelComponent';

export class Formula extends ExcelComponent {
	static className = 'formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input', 'keydown'],
			...options
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

	init() {
		super.init();

		this.$formula = this.$root.find('input')
		console.log(this.$formula);

		this.$on('table:select', $cell => {
			this.$formula.inputValue($cell.text());
		})

		this.$on('table:input', $cell => {
			this.$formula.inputValue($cell.text());
		})
	}

	onInput(event) {
		const text = event.target.value.trim();
		this.$emit('formula:input', text);
	}

	onKeydown(event) {
		const keys = ['Enter', 'Tab'];
		if (keys.includes(event.key)) {
			event.preventDefault();
			this.$emit('formula:enter')
		}
	}
}