const Quill = require('quill');

let options = {
  theme: 'snow'
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
