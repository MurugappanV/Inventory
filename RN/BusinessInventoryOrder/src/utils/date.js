export const getDateJson = (date: string) => {
	const d = new Date(date);
	return {
		day: getDay(d.getDay()),
		date: d.getDate(),
		month: getMonth(d.getMonth()),
		year: d.getFullYear(),
	};
};

export const getDateddmmyy = (date: string) => {
	const d = new Date(date);
	const yr = d
		.getFullYear()
		.toString()
		.substr(-2);
	return `${d.getDate()}/${d.getMonth() + 1}/${yr}`;
};

function getYear(yearNum) {
	// date.getYear()
	// year starts from 1900 i.e, 1900: 0, 1901: 1
	return yearNum + 1900;
}

const getDay = (dayNum: number) => {
	// Sunday - Saturday : 0 - 6
	switch (dayNum) {
		case 0:
			return "Sun";
		case 1:
			return "Mon";
		case 2:
			return "Tue";
		case 3:
			return "Wed";
		case 4:
			return "Thu";
		case 5:
			return "Fri";
		case 6:
			return "Sat";
		default:
			return "Day";
	}
};

const getMonth = (monthNum: number) => {
	// January gives 0
	switch (monthNum) {
		case 0:
			return "Jan";
		case 1:
			return "Feb";
		case 2:
			return "Mar";
		case 3:
			return "Apr";
		case 4:
			return "May";
		case 5:
			return "Jun";
		case 6:
			return "Jul";
		case 7:
			return "Aug";
		case 8:
			return "Sep";
		case 9:
			return "Oct";
		case 10:
			return "Nov";
		case 11:
			return "Dec";
		default:
			return "Month";
	}
};
