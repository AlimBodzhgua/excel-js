function createButton(button) {
	const meta = `
		data-type='button'
		data-value='${JSON.stringify(button.value)}'
	`;

	return `
		<button 
			class="btn ${button.active ? 'active' : ''}"
			${meta}
		>
			<span 
				class="material-symbols-outlined"
				${meta}
			>${button.icon}</span>
		</button>
	`
}

export function createToolbar(state) {
	const buttons = [
		{
			value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},
			icon: 'format_bold',
			active: state['fontWeight'] === 'bold',
		},
		{
			value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
			icon: 'format_italic',
			active: state['fontStyle'] === 'italic',
		},
		{
			value: {textDecoration: state['textDecoration'] === 'underline' 
				? 'none' 
				: 'underline'},
			icon: 'format_underlined',
			active: state['textDecoration'] === 'underline',
		},
		{
			value: {textAlign: 'left'},
			icon: 'format_align_left',
			active: state['textAlign'] === 'left',
		},
		{
			value: {textAlign: 'center'},
			icon: 'format_align_center',
			active: state['textAlign'] === 'center',
		},
		{
			value: {textAlign: 'right'},
			icon: 'format_align_right',
			active: state['textAlign'] === 'right',
		},
	]
	/*const buttons = [
		'format_align_left', 
		'format_align_center', 
		'format_align_right',
		'format_bold', 
		'format_italic', 
		'format_underlined', 
	]*/

	return `
		<div class="toolbar__inner">
			${buttons.map(createButton).join('')}
		</div>
	`;
}