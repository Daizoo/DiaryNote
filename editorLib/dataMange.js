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
    this.baseDate = new Date();
    try {
      let rawTagDB = fs.readFileSync('./noteData/tagDB.json');
      this.tagDB = JSON.parse(rawTagDB);
    } catch (err) {
      this.tagDB = {};
      fs.writeFileSync('./noteData/tagDB.json', JSON.stringify(this.tagDB));
    }
    this.reInitialize.bind(this);
    this.initialize.bind(this);
    this.initialize(); // initialize Note
    this.interval = setInterval(this.dataSave.bind(this), 20000);
  }

  async initialize() {
    let year = this.baseDate.getFullYear().toString();
    let month = this.baseDate.getMonth().toString();
    let day = this.baseDate.getDate().toString();

    this.saveDir = './noteData/' + year + '/' + month + '/' + day;
    try {
      fs.mkdirSync(this.saveDir, {
        recursive: true
      });
    } catch (err) {
      process.stdout.write(err);
    }
    fs.readdir(this.saveDir, {
      withFileTypes: true
    }, (err, dirents) => {
      if (err) process.stdout.write(this.saveDir + ' is Not Found');
      else {
        let count = dirents.length;
        this.saveFile = year + month + day + count + '.json';
        this.noteList = [];
        for (var i = 0; i < dirents.length; i++) {
          this.noteList.push(this.saveDir + '/' + dirents[i].name);
        }
      }
      this.listMaker();
    });
    this.noteTitle.innerText = 'Untitled'
  }

  async reInitialize(year, month, day) {
    try {
      clearInterval(this.interval);
      this.dataSave();
      this.baseDate = new Date(year, month, day);
      await this.initialize();
      setInterval(this.dataSave.bind(this), 20000);
    } catch (err) {
      throw err
    }
  }

  listMaker() {
    let noteListUl = document.createElement('ul');
    for (var i = 0; i < this.noteList.length; i++) {
      var noteData = JSON.parse(fs.readFileSync(this.noteList[i]));
      var noteItem = document.createElement('li');
      noteItem.innerHTML = noteData['title'];
      noteListUl.appendChild(noteItem);
    }
    this.noteListContainer.appendChild(noteListUl);
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
      else process.stdout.write('write successful\n');
    });
  }


  async dataLoad(notePath) {
    try {
      await this.reInitialize();
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  dataManage: dataManage
};