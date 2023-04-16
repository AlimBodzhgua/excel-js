class Dom {
	constructor(selector) {
		this.$element = typeof selector === 'string'
			? document.querySelector(selector)
			: selector;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$element.innerHTML = html;
			return this;
		}
		return this.$element.outerHTML.trim();
	}

	text(text) {
		if (typeof text !== 'undefined') {
			this.$element.textContent = text;
			return this;
		}
		if (this.$element.tagName.toLowerCase() === 'input') {
			return this.$element.value.trim();
		}
		return this.$element.textContent.trim();
	}

	inputValue(text) {
		if (typeof text === 'string') {
			this.$element.value = text;
			return this;
		}
		return this.$element.value.trim();
	}


	clear() {
		this.html('');
		return this;
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$element;
		}
		if (Element.prototype.append) {
			this.$element.append(node);
		} else {
			this.$element.appendChild(node);
		}
		
		return this;
	}

	on(eventType, callback) {
		this.$element.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$element.removeEventListener(eventType, callback);
	}

	closest(selector) {
		return $(this.$element.closest(selector));
	}

	getCoords() {
		return this.$element.getBoundingClientRect();
	}

	find(selector) {
		return $(this.$element.querySelector(selector));
	}

	findAll(selector) {
		return this.$element.querySelectorAll(selector);
	}

	countAll(element) {
		return this.$element.findAll(element).length - 1;
	}

	addClass(className) {
		return this.$element.classList.add(className);
	}

	removeClass(className) {
		return this.$element.classList.remove(className);
	}

	get data() {
		return this.$element.dataset
	}

	attr(name, value) {
		if (value) {
			this.$element.setAttribute(name, value);
			return;
		}
		return this.$element.getAttribute(name);
	}

	focus() {
		this.$element.focus();
		return this;
	}

	css(styles = {}) {
		Object.keys(styles).forEach(key => {
			this.$element.style[key] = styles[key];
		})
	}

	getStyles(styles = []) {
		return styles.reduce((res, s) => {
			res[s] = this.$element.style[s];
			return res;
		}, {})
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, className = '') => {
	const element = document.createElement(tagName);
	if (className) {
		element.classList.add(className);
	}
	return $(element);
}