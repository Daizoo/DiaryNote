const fs = require('fs');

//TODO: write file when source from user.
//TODO: filepath changed by date, but NOT change file path to loaded file.

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
    this.reInitialize.bind(this);
    this.initialize.bind(this);
    this.initialize(); // initialize Note
    //listLoader(toString(this.baseDate.getFullYear()) + toString(this.baseDate.getMonth()));
    this.interval = setInterval(this.dataSave.bind(this), 20000);
  }

  initialize() {
    try {
      fs.mkdirSync('./'+this.baseYear, {recursive: true});
      fs.mkdirSync('./'+this.baseYear+'/'+this.baseMonth, {recursive: true});
    } catch(err) {
      console.log(err);
    }

    this.saveDir = './'+this.baseYear + '/' + this.baseMonth;
    this.saveNote ='Untitled.json';
    console.log(this.saveDir);
  }

  listLoader(dirPath) {
    let noteList = fs.readdirSync(dirPath);
  }

  dataSave() {
    let contents = JSON.stringify(this.quill.getContents(), null, 2);
    fs.writeFile(this.saveDir + '/' + this.saveNote, contents, (err) => {
      if (err) return err;
      else console.log('write successful');
    });
  }

  async reInitialize() {
    try {
      clearInterval(this.interval);
      this.dataSave();
      setInterval(this.dataSave.bind(this), 20000);
    } catch(err) {
      return reject(err);
    }
  }

  async dataLoad(){
    try {
      await reInitialize();
    } catch(err) {
      console.log(err);
    }
  }
}

module.exports = {
  dataManage: dataManage
};
