import {storage} from '@core/utils';

function toHTML(key) {
	const table = storage(key);
	const date = key.split(':')[1] 
	return `
		<div class="list__item">
			<a class="list__link" href="#excel/${date}">${table.title}</a>
			<time class="list__date">
				${new Date(table.openedDate).toLocaleDateString()}
				${new Date(table.openedDate).toLocaleTimeString()}
			</time>
		</div>
	`
}


function getAllKeys() {
	const keys = []
	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key(i);
		if (!key.includes('excel')) {
			continue
		}
		keys.push(key);
	}
	return keys;
}

export function createRecordsTable() {
	const keys = getAllKeys();

	if (!keys.length) {
		return `<h1>У вас нет ни одной таблицы</h1>`
	}

	return `
		<div class="table__header">
			<div>Name</div>
			<div>Date</div>
		</div>

		<ul class="table__list">
			${keys.map(toHTML).join('')}	
		</ul>
	`
}