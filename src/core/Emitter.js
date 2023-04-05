

export class Emitter {
	constructor() {
		this.listeners = {};
	}

	/*Уведомляем слушателя что они есть*/
	emit(event, ...args) {
		if (!Array.isArray(this.listeners[event])) {
			return false;
		}
		this.listeners[event].forEach(listener => {
			listener(...args);
		})
		return true;
	}

	/*Подписываемся на уведомления*/
	/*subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || [];		
		this.listeners[event].push(fn);
	}*/

	/*Подписываемя и отписываемся*/
	subscribe(event, fn) {
		this.listeners[event] = this.listeners[event] || [];		
		this.listeners[event].push(fn);
		return () => {
			this.listeners[event] = 
				this.listeners[event].filter(listener => listener !== fn)
		}
	}

	/*Отписываемся от уведомлений*/
	/*unsubscribe(event, fn) {
		this.listeners[event] = this.listeners[event].filter(listener !== fn)
	} */
}