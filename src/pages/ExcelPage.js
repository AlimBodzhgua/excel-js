import {normalizeInitialState} from '@/redux/initialState';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {Formula} from '@/components/formula/Formula';
import {Header} from '@/components/header/Header';
//import {initialState} from '@/redux/initialState';
import {Excel} from '@/components/excel/Excel';
import {Table} from '@/components/table/Table';
import {rootReducer} from '@/redux/rootReducer';
import {createStore} from '@core/createStore';
import {storage, debounce} from '@core/utils';
import {Page} from '@core/routes/Page';

export class ExcelPage extends Page {
	getRoot() {
		const params = this.params ? this.params : Date.now().toString();

		const state = storage(storageName(params));
		const initialState = normalizeInitialState(state);
		const store = createStore(rootReducer, initialState);

		const stateListener = debounce(state => {
			storage(storageName(params), state);
		}, 300)

		store.subscribe(stateListener)

		this.excel = new Excel({
			components: [Header, Toolbar, Formula, Table],
			store
		});

		return this.excel.getRoot();
	}

	afterRender() {
		this.excel.init();
	}

	destroy() {
		this.excel.destroy();
	}
}

function storageName(param) {
	return 'excel:' + param;
}