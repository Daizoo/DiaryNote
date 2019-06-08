const fs = require('fs');

//TODO: write file when source from user.
//TODO: filepath changed by date, but NOT change file path to loaded file.

class dataManage {
  async constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.noteListContainer = document.getElementById('noteList');
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
    try {
      fs.mkdirSync(this.saveDir, {
        recursive: true
      });
    } catch (err) {
      console.log(err);
    }

    fs.readdir(this.saveDir, {
      withFileTypes: true
    }, (err, dirents) => {
      if (err) throw err;
      else {
        let count = dirents.length;
        this.saveFile = year + month + day + count + '.json';
        this.noteList = [];
        for (var i = 0; i < dirents.length; i++) {
          this.noteList.push(dirents[i].name);
        }
      }
    });

    this.saveDir = './noteData/' + year + '/' + month + '/' + day;
    fs.readFile('./tagDB.json', {
      encoding: 'utf-8'
    }, (err, file) => {
      if (err) this.tagDB = {};
      else this.tagDB = JSON.parse(file);
    });
    console.log(this.saveDir);
  }

  listMaker() {
    if (this.noteList.length > 0) {
      for (var i = 0; i < this.noteList; i++) {
        var noteItem = document.createElement('li');
        var rawData = fs.readFileSync(this.saveDir + '/' + this.noteList[i], {
          encoding: 'utf-8'
        });
        var noteTitle = JSON.stringify(rawData)[title];
        noteItem.innerText = noteTitle;
        this.noteListContainer.appendChild(noteItem);
      }
      return true
    } else {
      return false
    }
  }

  createNewNote() {
    let newNoteFile = '';
  }

  dataSave() {
    let contents = JSON.stringify(this.quill.getContents(), null, 2);
    fs.writeFile(this.saveDir + '/' + this.saveNote, contents, (err) => {
      if (err) return err;
      else console.log('write successful');
    });
  }

  async reInitialize(year, month, day) {
    try {
      clearInterval(this.interval);
      this.dataSave();
      setInterval(this.dataSave.bind(this), 20000);
    } catch (err) {
      return reject(err);
    }
  }

  async dataLoad(notePath) {
    try {
      await reInitialize();
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = {
  dataManage: dataManage
};