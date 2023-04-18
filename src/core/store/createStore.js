export function createStore(rootReducer, initialState = {}) {
	let state = rootReducer(initialState, {type: '__INIT__'});
	let listeners = [];

	return {
		subscribe(fn) {
			listeners.push(fn);
			return {
				unsubscribe() {
					listeners = listeners.filter(listener => listener !== fn);
				}
			}
		},
		dispatch(action) {
			state = rootReducer(state, action);
			listeners.forEach(listener => listener(state));
		},
		getState() {
			return JSON.parse(JSON.stringify(state)); 
		}
	}
}
/*
1.Create state in defaultState 		 (initialState.js)
2.Create type action  				 (types.js)
3.Create action 					 (rootReduces.js)
dispatch this
*/