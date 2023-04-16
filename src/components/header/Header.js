import {ExcelComponent} from '@core/ExcelComponent';
import {defaultTitle} from '@/constants';
import * as actions from '@/redux/actions';
import {$} from '@core/dom';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
	static className = 'header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input'],
			...options,
		})
	}

	prepare() {
		this.onInput = debounce(this.onInput, 300);
	}

	onInput(event) {
		console.log('on input');
		const $target = $(event.target);
		const title = $target.inputValue();
		this.$dispatch(actions.changeTitle(title));
	}

	toHTML() {
		const title = this.store.getState().title || defaultTitle;
		return `
			<div class="header__input">
				<input type="text" value="${title}">
			</div>
			
			<div class="header__actions">
					
				<button class="btn">
					<span class="material-symbols-outlined">
						delete
					</span>
				</button>

				<button class="btn">
					<span class="material-symbols-outlined">
						exit_to_app
					</span>
				</button>
				
			</div>
		`;
	}
}