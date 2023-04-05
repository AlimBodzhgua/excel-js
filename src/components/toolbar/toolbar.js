import {ExcelComponent} from '@core/ExcelComponent';

export class Toolbar extends ExcelComponent {
	static className = 'toolbar';

	constructor($root, options) {
		super($root, {
			name: 'Toolbar',
			listeners: ['click'],
			...options,
		})
	}

	toHTML() {
		return `
				<div class="toolbar__inner">
					
					<button class="btn">
						<span class="material-symbols-outlined">
							format_bold
						</span>
					</button>

					<button class="btn">
						<span class="material-symbols-outlined">
							format_italic
						</span>
					</button>

					<button class="btn">
						<span class="material-symbols-outlined">
							format_underlined
						</span>
					</button>

					<button class="btn">
						<span class="material-symbols-outlined">
							format_align_left
						</span>
					</button>

					<button class="btn">
						<span class="material-symbols-outlined">
							format_align_center
						</span>
					</button>

					<button class="btn">
						<span class="material-symbols-outlined">
							format_align_right
						</span>
					</button>
				</div>
		`;
	}

	onClick(event) {
		console.log(event.target);
	}
}