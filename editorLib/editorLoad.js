const Quill = require('quill');
const hljs = require('highlight.js');
const dataManage = require('./dataMange.js')


const editorSetUp = {
	editorLoad: function () {
		//NOTE: Want to show list of editor and highlight's style.
		Quill.register('modules/dataManage', dataManage.dataManage);
		let highlightStyle = document.getElementById('highlightStyle');
		hljs.configure({
			languages: ['javascript', 'python']
		});
		let editorStyle = document.getElementById('editorStyle');
		let options = {
			theme: 'snow',
			modules: {
				syntax: {
					highlight: text => hljs.highlightAuto(text).value
				},
				toolbar: {
					container: '#toolbar'
				},
				dataManage: true
			}
		};
		editorStyle.href = './node_modules/quill/dist/quill.snow.css';
		highlightStyle.href = './node_modules/highlight.js/styles/monokai-sublime.css';
		let editor = new Quill('#editor', options);

		return editor;
	}
}

module.exports = editorSetUp;
