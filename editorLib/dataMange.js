const fs = require('fs');

//TODO: write file when source from user.
//TODO: filepath changed by date, but NOT change file path to loaded file.

class dataManage {
  constructor(quill, options) {
    this.quill = quill;
    this.options = options;
    this.noteListContainer = document.getElementById('noteList');
    this.noteTitle = document.getElementById(options.title);
    this.saveDir = '';
    this.saveNote = '';
    //this.dataSave.bind(this);
    this.baseDate = new Date();
    //this.fileListContainer = document.querySelector(options.fileList);
    //this.noteDB = new ObjectgetElementById(options.title);
    try {
      let rawTagDB = fs.readFileSync('./noteData/tagDB.json');
      this.tagDB = JSON.parse(rawTagDB);
    } catch (err) {
      console.log(err);
      this.tagDB = {};
      fs.writeFileSync('./noteData/tagDB.json', JSON.stringify(this.tagDB));
    }
    this.reInitialize.bind(this);
    this.initialize.bind(this);
    this.initialize(); // initialize Note
    //listLoader(toString(this.baseDate.getFullYear()) + toString(this.baseDate.getMonth()));
    try {
      this.interval = setInterval(this.dataSave.bind(this), 1000);
      console.log('set interval successful');
    } catch {
      console.log(err);
    }
  }

  async initialize() {
    let year = this.baseDate.getFullYear().toString();
    let month = this.baseDate.getMonth().toString();
    let day = this.baseDate.getDay().toString();

    this.saveDir = './noteData/' + year + '/' + month + '/' + day;
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
      if (err) console.log(err);
      else {
        let count = dirents.length;
        this.saveFile = year + month + day + count + '.json';
        this.noteList = [];
        for (var i = 0; i < dirents.length; i++) {
          this.noteList.push(dirents[i].name);
        }
      }
    });

    console.log(this.saveDir);
  }

  async reInitialize(year, month, day) {
    try {
      clearInterval(this.interval);
      this.dataSave();
      this.baseDate = new Date(year, month, day);
      await this.initialize();
      setInterval(this.dataSave.bind(this), 20000);
    } catch (err) {
      return reject(err);
    }
  }

  listMaker() {
    for (var i = 0; i < this.noteList.length; i++) {
      var noteData = JSON.parse(fs.readFileSync());
      var noteItem = document.createElement('li');
      noteItem.innerHTML = noteData['title'];
      this.noteListContainer.appendChild(noteItem);
    }
  }

  createNewNote() {
    this.baseDate = new Date();
    let newNoteFile = '';
  }

  dataSave() {
    let title = this.noteTitle.textContent;
    let contents = this.quill.getContents();
    let noteData = {
      title: title,
      contents: contents
    };
    fs.writeFile(this.saveDir + '/' + this.saveFile, JSON.stringify(noteData, null, 2), (err) => {
      if (err) return err;
      else console.log('write successful');
    });
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