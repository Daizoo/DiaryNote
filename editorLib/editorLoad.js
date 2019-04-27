const Quill = require('quill');
const hljs = require('highlight.js')



const editorSetUp = {
  editorLoad: function() {
	let editorStyle = document.getElementById('editorStyle');
	hljs.configure({
		languages: ['python']
	});
	let options = {
		theme: 'snow',
		modules: {
			syntax: true,
			toolbar: {
				container: '#toolbar'
			}
		}
	}
    editorStyle.href = './node_modules/quill/dist/quill.snow.css';
    let editor = new Quill('#editor', options);
    //TODO: toolbarの設定をする
	return editor
  }
}

module.exports = editorSetUp;
