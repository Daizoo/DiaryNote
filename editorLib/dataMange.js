const fs = require('fs');

//function dataSave(quill, option) {
//  //TODO: write file when source from user.
//  //TODO: filepath changed by date, but NOT change file path to loaded file.
//  var ineterval = setInterval(() => {
//    var contents = JSON.stringify(quill.getContents(), null, 2);
//    fs.writeFile('testSave/test.json', contents, (err) => {
//      if (err) console.log(err)
//      else console.log('write successful.')
//    });
//  }, 20000);
//
//  quill.on('text-change', (delta, oldDelta, source) => {
//    if (source == 'api'){
//      console.log('changed by API');
//      clearInterval(ineterval);
//    }
//  });
//}

class dataManage {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.saveDir = '';
    this.saveNote = '';
    //this.dataSave.bind(this);
    //this.fileListContainer = document.querySelector(options.fileList);
    this.baseDate = new Date();
    this.baseYear = this.baseDate.getFullYear();
    this.baseMonth = this.baseDate.getMonth();
    this.baseDay = this.baseDate.getDay();
    this.initialize(); // initialize Note
    //listLoader(toString(this.baseDate.getFullYear()) + toString(this.baseDate.getMonth()));
    this.interval = setInterval(this.dataSave.bind(this), 20000);
  }

  initialize() {
    let noteYDirName = toString(this.baseYear);
    let noteMDirName = toString(this.baseMonth);
    let noteFileName = toString(this.baseDay);

    fs.mkdir(noteYDirName+'/'+noteMDirName, {recursive: true}, (err) => {
      if (err.code === 'ENENOT') console.log('Not Exist saveDir');
      else console.log(err);
    });

    this.saveDir = noteYDirName + '/' + noteMDirName;
    this.saveNote = noteFileName;
  }

  listLoader(dirPath) {
    let noteList = fs.readdirSync(dirPath);
  }

  dataSave() {
    let contents = JSON.stringify(this.quill.getContents(), null, 2);
    fs.writeFile(this.saveDir + 'test.json', contents, (err) => {
      if (err) console.log(err);
      else console.log('write successful');
    });
  }

  reInitialize() {
    clearInterval(this.interval);
    this.interval = setInterval(this.dataSave.bind(this), 20000);
  }

  dataLoad(){

  }
}

module.exports = {
  dataManage: dataManage
};
