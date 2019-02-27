function getCalenderData(year, month) {
  let first = new Date(year, (month - 1), 1);
  // 指定年月の1日の情報
  let last = new Date(year, first.getMonth + 1, 0).getDate();
  // 指定年月の次の月の初日の前の日(=指定月の最終日)
  let firstDay = first.getDay();
  // 初日の曜日取得

  let calenderData = [];
  // 指定年月のカレンダーデータ
  let dayNum = firstDay;
  // 曜日の番号換算

  for (var i = 0; i < last; i++) {
    calenderData[i] = {
      date: i + 1,
      day: dayNum
    };
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

}
