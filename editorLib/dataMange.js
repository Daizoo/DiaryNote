const fs = require('fs');

function dataSave(quill, option){
  //let content = quill.getContent();
  quill.on('text-change', (delta, oldDelta, source) => {
    if (source == 'api') {
    console.log("An API call triggered this change.");
  } else if (source == 'user') {
    console.log("A user action triggered this change.");
  }

  fs.write('test.json', oldDelta, (err) => {
    if (err) console.log(err);
    else console.log('write successfull');
  });
  console.log(oldDelta);
  console.log(delta)
  }
);
}

module.exports={
  dataSave: dataSave
};
