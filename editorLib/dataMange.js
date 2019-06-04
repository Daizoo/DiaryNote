const fs = require('fs');

//TODO: write file when source from user.
//TODO: filepath changed by date, but NOT change file path to loaded file.

class dataManage {
  async constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.saveDir = '';
    this.saveNote = '';
    //this.dataSave.bind(this);
    this.baseDate = new Date();
    //this.fileListContainer = document.querySelector(options.fileList);
    this.noteDB = new Object();
    this.tagDB = new Object();
    this.baseYear = this.baseDate.getFullYear();
    this.baseMonth = this.baseDate.getMonth();
    this.baseDay = this.baseDate.getDay();
    this.reInitialize.bind(this);
    this.initialize.bind(this);
    await this.initialize(); // initialize Note
    //listLoader(toString(this.baseDate.getFullYear()) + toString(this.baseDate.getMonth()));
    this.interval = setInterval(this.dataSave.bind(this), 20000);
  }

  async initialize() {
    let year = this.baseYear.toString();
    let month = this.baseMonth.toString();
    let day = this.baseDay.toString();
    // read Note DB and tag DB
    fs.readFile('./noteDB.json', {encoding:'utf-8'}, (err, file) => {
      if (err) {
        this.noteDB = {};
        this.noteDB[year] = {};
        this.noteDB[year][month] = {};
        this.noteDB[year][month][day] = [];
      } else {
        this.noteDB = JSON.parse(file);
        // check today's note existing
        if (Object.keys(this.noteDB).find(item => item === year) === -1) this.noteDB[year] = {}
        if (Object.keys(this.noteDB[year]).find(item => item === month) === -1) this.noteDB[year][month] = {}
        if (Object.keys(this.noteDB[year][month]).find(item => item === day) === -1) this.noteDB[year][month][day] = []
      }
    });

    fs.readFile('./tagDB.json', {encoding:'utf-8'}, (err, file) => {
      if (err) this.tagDB = {};
      else this.tagDB = JSON.parse(file);
    });
    // check today's note saving directroy
    try {
      fs.mkdirSync('./noteData/' + year + '/'+ month, {recursive:true});
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
