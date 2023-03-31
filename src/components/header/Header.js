import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
	static className = 'header';

	toHTML() {
		return `
			<div class="header__input">
				<input type="text" placeholder="Enter name of table">
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