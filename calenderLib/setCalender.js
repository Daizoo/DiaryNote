function getCalenderData(year, month) {
  let first = new Date(year, (month - 1), 1);
  // 指定年月の1日の情報
  let last = new Date(year, first.getMonth() + 1, 0).getDate();
  // 指定年月の次の月の初日の前の日(=指定月の最終日)
  let firstDay = first.getDay();
  // 初日の曜日取得

  let calenderData = [];
  // 指定年月のカレンダーデータ
  let dayNum = firstDay;
  // 曜日の番号換算

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
  // 曜日一覧
  let calenderData = getCalenderData(year, month);
  // カレンダーデータ取得
  var i = calenderData[0]['day'];
  // 初日の曜日データ取得
  /*初日より前の空欄埋め*/
  while(i>0){
    i--;
    calenderData.unshift({
      date: '',
      day: i
    });
  }
  /*末尾埋め*/
  var i = calenderData[calenderData.length-1]['day'];
  while(i<6){
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
  for(var i = 0; i < dayOfWeek.length; i++){
    insertTag += '<th>';
    insertTag += dayOfWeek[i];
    insertTag += '</th>';
  }
  insertTag += '</tr>';
  insertTag += '</thead>';
  /*ボディ部分*/
  insertTag += '<tbody>';
  for(var i = 0; i < calenderData.length; i++){
    if(calenderData[i]['day'] <= 0){
      insertTag += '<tr>';
    }
    insertTag += '<td>';
    insertTag += calenderData[i]['date'];
    insertTag += '</td>';
    if(calenderData[i]['day'] >= 6){
      insertTag += '</tr>';
    }
  }
  insertTag += '</tbody>';

  calenderTable.innerHTML = insertTag;
  return calenderTable;
}

function initCalender(){
	let calenderParts = document.getElementById('calenderParts');
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
