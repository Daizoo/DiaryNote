const setCalnd = require('./calenderLib/setCalender.js');

let today = setCalnd.initCalender();
let calenderParts = document.getElementById('calenderParts');

function changeCalender(dirct){
	calenderParts.textContent = null;
	var year = today.getFullYear();
	var month = today.getMonth();
	
	if (month+dirct <= -1){
		month = 11;
		year -= 1;
	}else if (month+dirct >= 12){
		month = 0;
		year += 1;
	}else{
		month += dirct;
	}

	calenderParts.appendChild(
		setCalnd.generateCalender(year, month)
	);

}
