const Quill = require('quill');


let toolbarOptions = [
	['bold', 'italic', 'underline', 'strike']
]

let options = {
	theme: 'snow',
	toolbar: toolbarOptions
}

let editorStyle = document.getElementById('editorStyle');

const editorSetUp = {
  editorLoad: function(target) {
    var container = document.getElementById(target);
    editorStyle.href = './node_modules/quill/dist/quill.snow.css';
    let editor = new Quill(container, options);
    //TODO: toolbarの設定をする
  }
}

module.exports = editorSetUp;
