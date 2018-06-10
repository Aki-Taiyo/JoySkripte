function read_joy ()
{
	// console.log("Start background script");
	xhttp = new XMLHttpRequest();
	console.log("xhttp");
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("awesome, ready to parse");
			console.log(this.responseText);
			parse_mail_number(this);
		}
	};
	xhttp.open("GET", "https://www.joyclub.de/clubmailv3/clubmail_auto_update", true)
	xhttp.send();
}

function parse_mail_number(xml)
{
	console.log(xml);
	let obj = JSON.parse(xml.responseText);
	console.log(obj);
	let numbermails = obj.content.unread_message_count_total;
	console.log(numbermails);
	chrome.browserAction.setBadgeBackgroundColor({ color: [176, 0, 0, 125] });
	chrome.browserAction.setBadgeText({text: numbermails.toString()});
}

read_joy();
setInterval(read_joy, 12000);