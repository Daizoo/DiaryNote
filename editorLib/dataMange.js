const fs = require('fs');

function dataSave(quill, option) {
  //TODO: write file when source from user.
  //TODO: filepath changed by date, but NOT change file path to loaded file.
  var ineterval = setInterval(() => {
    var contents = JSON.stringify(quill.getContents(), null, 2);
    fs.writeFile('testSave/test.json', contents, (err) => {
      if (err) console.log(err)
      else console.log('write successful.')
    });
  }, 20000);

  quill.on('text-change', (delta, oldDelta, source) => {
    if (source == 'api'){
      console.log('changed by API');
      clearInterval(ineterval);
    }
  });
}

module.exports = {
  dataSave: dataSave
};
