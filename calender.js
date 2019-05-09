const setCalnd = require('./calenderLib/setCalender.js');

let today = setCalnd.initCalender();
let calenderParts = document.getElementById('calender');

function changeCalender(dirct){
	calenderParts.textContent = null;	
	today.setMonth(today.getMonth() + dirct);
	var year = today.getFullYear();
	var month = today.getMonth();

	calenderParts.appendChild(
		setCalnd.generateCalender(year, month)
	);

}
