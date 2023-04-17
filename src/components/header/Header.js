import {ExcelComponent} from '@core/ExcelComponent';
import {defaultTitle} from '@/constants';
import * as actions from '@/redux/actions';
import {$} from '@core/dom';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
	static className = 'header';

	constructor($root, options) {
		super($root, {
			name: 'Header',
			listeners: ['input', 'click'],
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

	onClick(event) {
		const $target = $(event.target);

		if ($target.data.type === 'exit') {
			ActiveRoute.navigate('');
		} else if ($target.data.type === 'delete') {
			const desicion = confirm('Are you sure you want to delete this table?');

			if (desicion) {
				localStorage.removeItem('excel:' + ActiveRoute.param);
				ActiveRoute.navigate('')
			}
		}
	}

	toHTML() {
		const title = this.store.getState().title || defaultTitle;
		return `
			<div class="header__input">
				<input type="text" value="${title}">
			</div>
			
			<div class="header__actions">
					
				<button class="btn" data-type='delete'>
					<span class="material-symbols-outlined" data-type='delete'>
						delete
					</span>
				</button>

				<button class="btn" data-type='exit'>
					<span class="material-symbols-outlined" data-type='exit'>
						exit_to_app
					</span>
				</button>
				
			</div>
		`;
	}
}