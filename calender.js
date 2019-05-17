/* eslint-disable linebreak-style */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
const setCalnd = require('./calenderLib/setCalender.js');

const today = setCalnd.initCalender();
const calenderParts = document.getElementById('calender');

function changeCalender(dirct) {
  calenderParts.textContent = null;
  today.setMonth(today.getMonth() + dirct);
  const year = today.getFullYear();
  const month = today.getMonth();

  calenderParts.appendChild(
      setCalnd.generateCalender(year, month)
  );
}
