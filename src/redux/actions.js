import {
	CHANGE_TITLE,
	TABLE_RESIZE, 
	TEXT_CHANGE,
	CHANGE_STYLES,
	APPLY_STYLE,
	UPDATE_DATE,
} from './types';

//Action creator
export function tableResize(data) {
	return {
		type: TABLE_RESIZE,
		data,
	}
}

export function textChange(data) {
	return {
		type: TEXT_CHANGE,
		data,
	}
}

export function changeStyles(data) {
	return {
		type: CHANGE_STYLES,
		data,
	}
}

//data: value, ids
export function applyStyle(data) {
	return {
		type: APPLY_STYLE,
		data,
	}
}

export function changeTitle(data) {
	return {
		type: CHANGE_TITLE,
		data,
	}
}

export function updateDate(data) {
	return {
		type: UPDATE_DATE,
	}
}