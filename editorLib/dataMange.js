const fs = require('fs');

function dataSave(editor, path){
  let content = editor.getContent();
  fs.write(path, content, (err, data) => {
    if (err) console.log(err);
    else console.log('write success');
  });
}
