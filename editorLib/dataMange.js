const fs = require('fs');

function dataSave(quill, option){
  //TODO: set interval of writing data is 15s ~ 20s.
  //TODO: write file when source from user.
  //TODO: filepath changed by date, but NOT change file path to loaded file.
  quill.on('text-change', (delta, oldDelta, source) => {
    if (source == 'api') {
    console.log("An API call triggered this change.");
  } else if (source == 'user') {
    console.log("A user action triggered this change.");
  }

  fs.writeFile('test.json', delta, (err) => {
    if (err) console.log(err);
    else console.log('write successfull');
  });
  console.log(oldDelta);
  console.log(delta);
  }
);
}

module.exports={
  dataSave: dataSave
};
