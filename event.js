function download_ics ()
{
	// Werte auslesen und erstellen
	let address = document.querySelector("a [itemprop=name]").textContent + ", " + document.querySelector("[itemprop=streetAddress]").textContent + ", " + document.querySelector("[itemprop=postalCode]").textContent + " " + document.querySelector("[itemprop=addressRegion]").textContent;
	let summary = document.querySelector("[itemprop=name]").textContent;
	// let descriptionprep = document.querySelector("[itemprop=description]").textContent + "\r\n\r\n Link zur Veranstaltung: " + document.location;
	let description = "Link zur Veranstaltung: " + document.location;
	// let description = descriptionprep.substr(0, 63);
	// for(let i = 63; i < descriptionprep.length; i = i + 75)
	// {
		// description = description + "\r\n" + descriptionprep.substr(i, 75);
	// }
	// description = encodeURI(description);
	let datestring = document.querySelector(".event_datetime").textContent;
	let date = /[0-9]{2}\.[0-9]{2}\.[0-9]{4}/.exec(datestring)[0];
	console.log("date: " + date);
	let time = /[0-9]{2}:[0-9]{2}/.exec(datestring)[0];
	console.log("time: " + time);
	let dtstart = date.substr(6,4) + date.substr(3,2) + date.substr(0,2) + "T" + time.substr(0,2) + time.substr(3, 2) + "00";
	console.log(dtstart);
	let dtend = date.substr(6,4) + date.substr(3,2) + date.substr(0,2) + "T235900";
	let d = new Date();
	let dtstamp = d.getFullYear().toString() + (d.getMonth() + 1).toString() + d.getDay().toString() + "T" + d.getHours() + d.getMinutes() + d.getSeconds();
	
	// 01234567890123456
	// 07.09.2018
	// 18:00
	
	// Kalendereintrag erstellen
	let ics = "BEGIN:VCALENDAR\r\n\
VERSION:2.0\r\n\
PRODID:https://www.joyclub.de\r\n\
BEGIN:VTIMEZONE\r\n\
TZID:CET\r\n\
BEGIN:DAYLIGHT\r\n\
TZOFFSETFROM:+0100\r\n\
TZOFFSETTO:+0200\r\n\
TZNAME:Central European Summer Time\r\n\
DTSTART:20160327T020000\r\n\
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3\r\n\
END:DAYLIGHT\r\n\
BEGIN:STANDARD\r\n\
TZOFFSETFROM:+0200\r\n\
TZOFFSETTO:+0100\r\n\
TZNAME:Central European Time\r\n\
DTSTART:20161030T030000\r\n\
RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10\r\n\
END:STANDARD\r\n\
END:VTIMEZONE\r\n\
BEGIN:VEVENT\r\n\
LOCATION:" + address + "\r\n\
SUMMARY:" + summary + "\r\n\
DESCRIPTION:" + description + "\r\n\
CLASS:PUBLIC\r\n\
DTSTART;TZID=CET:" + dtstart + "\r\n\
DTEND;TZID=CET:" + dtend + "\r\n\
DTSTAMP:" + dtstamp + "\r\n\
END:VEVENT\r\n\
END:VCALENDAR";
	let encodedText = window.btoa(unescape(encodeURIComponent(ics)))
    let dataURL = 'data:text/x-vCalendar;base64,' + encodedText;
	return dataURL;

}

function create_calender_button(){
	// Kalenderbutton im Anmeldemenü einfügen
	let div = document.getElementsByClassName("event_registration_buttons");
	div = div[0];
	let a = document.createElement("a");
	div.appendChild(a);
	
	let dataurl = download_ics();
	
	a.innerHTML = '<a id="downloadics" download="event.ics" title="Lade einen Kalendereintrag für diese Veranstaltung herunter." class="btn btn-default btn-xs" href="' + dataurl + '"><span class="glyphicons glyphicons-bookmark" aria-hidden="true"></span><span class="btn-text">Kalender</span></a>';
}

create_calender_button();