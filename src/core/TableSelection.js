export class TableSelection {
	static className = 'selected';

	constructor() {
		this.group = [];
		this.current = null;
	}

	resetSelect() {
		this.group.forEach(cell => cell.removeClass(TableSelection.className));
		this.group = [];
	}

	select($element) {
		this.resetSelect();
		$element.addClass(TableSelection.className);
		$element.focus();
		this.group.push($element);
		this.current = $element;
	}

	selectGroup($element) {
		let isSelected = false;
		this.group.forEach(cell => {
			if (cell.data.id === $element.data.id) {
				isSelected = true;
			}
		})

		if (!isSelected) {
			this.group.push($element);
			$element.addClass(TableSelection.className);
		}
	}

	selectRange($group = []) {
		this.resetSelect();

		this.group = $group;
		this.group.forEach($el => $el.addClass(TableSelection.className));
	}
}