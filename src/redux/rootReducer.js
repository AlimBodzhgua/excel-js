import {
	CHANGE_TITLE,
	TABLE_RESIZE, 
	TEXT_CHANGE,
	APPLY_STYLE,
	CHANGE_STYLES,
	UPDATE_DATE,
} from './types';

export function rootReducer(state, action) {
	let prevState;
	let field;
	let val;
	switch (action.type) {
		case CHANGE_TITLE:
			return {...state, title: action.data};
		case TABLE_RESIZE:
			field = action.data.type === 'column' ? 'colState' : 'rowState';
			prevState = state[field] || {};
			prevState[action.data.id] = action.data.value;
			return {...state, [field]: prevState};
		case TEXT_CHANGE:
			prevState = state['dataState'] || {};
			prevState[action.data.id] = action.data.value;
			return {...state, currentText: action.data.value, dataState: prevState};
		case CHANGE_STYLES:
			return {...state, currentStyles: action.data};
		case APPLY_STYLE:
			field = 'applyStyle';
			val = state[field] || {};
			action.data.ids.forEach(id => {
				val[id] = {...val[id], ...action.data.value}
			})

			return {
				...state,
				[field]: val,
				currentStyles: {...state.currentStyles, ...action.data.value}
			}
		case UPDATE_DATE:
			return {...state, openedDate: new Date().toJSON()}
		default: return state
	}
}