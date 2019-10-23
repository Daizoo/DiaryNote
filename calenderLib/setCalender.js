function getCalenderData(year, month) {
  let first = new Date(year, month, 1);
  let last = new Date(year, first.getMonth() + 1, 0).getDate();
  let firstDay = first.getDay();

  let calenderData = [];
  let dayNum = firstDay;

  for (var i = 0; i < last; i++) {
    calenderData.push({
      date: i + 1,
      day: dayNum
    });
    if (dayNum >= 6) {
      dayNum = 0;
    } else {
      dayNum++;
    }
  }
  return calenderData;
}

function generateCalender(year, month) {
  let dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let calenderData = getCalenderData(year, month);
  var i = calenderData[0]['day'];
  /*初日より前の空欄埋め*/
  while (i > 0) {
    i--;
    calenderData.unshift({
      date: '',
      day: i
    });
  }
  /*末尾埋め*/
  var i = calenderData[calenderData.length - 1]['day'];
  while (i < 6) {
    i++;
    calenderData.push({
      date: '',
      day: i
    });
  }
  /*カレンダー(table属性)の生成*/
  let calenderTable = document.createElement('table');
  calenderTable.className = 'calender';
  /*ヘッダー部分*/
  var insertTag = '';
  insertTag += '<thead>';
  insertTag += '<tr>';
  for (var i = 0; i < dayOfWeek.length; i++) {
    insertTag += '<th>';
    insertTag += dayOfWeek[i];
    insertTag += '</th>';
  }
  insertTag += '</tr>';
  insertTag += '</thead>';
  /*ボディ部分*/
  insertTag += '<tbody>';
  for (var i = 0; i < calenderData.length; i++) {
    if (calenderData[i]['day'] <= 0) {
      insertTag += '<tr>';
    }
    insertTag += '<td>';
    insertTag += calenderData[i]['date'];
    insertTag += '</td>';
    if (calenderData[i]['day'] >= 6) {
      insertTag += '</tr>';
    }
  }
  insertTag += '</tbody>';

  calenderTable.innerHTML = insertTag;
  return calenderTable;
}

function initCalender() {
  let calenderParts = document.getElementById('calender');
  var today = new Date();
  var year = today.getFullYear();
  var month = today.getMonth();
  calenderParts.appendChild(generateCalender(year, month));
  return today
}

module.exports = {
  getCalenderData: getCalenderData,
  generateCalender: generateCalender,
  initCalender: initCalender
};