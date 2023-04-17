import {Page} from '@core/routes/Page';
import {$} from '@core/dom';
import {createRecordsTable} from './dashboard.functions'

export class DashBoardPage extends Page {
	getRoot() {
		const now = Date.now().toString();
		return $.create('div', 'dashboard').html(`
			<div class="dashboard__header">
				<h2 class="header__title">
					Excel Dashboard
				</h2>
			</div>

			<div class="dashboard__new">
				<div class="dashboard__container">
					<a href="#excel/${now}" class="new__link">
						New table
					</a>
				</div>
			</div>

			<div class="dashboard__table">
				<div class="dashboard__container">
					${createRecordsTable()}					
				</div><!-- /.dashboard__container -->
			</div><!-- /.dashboard__table -->
		`)
	}
}