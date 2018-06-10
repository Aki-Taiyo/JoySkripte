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
	xhttp.open("GET", "https://www.joyclub.de/mein/", true)
	xhttp.send();
}

function parse_mail_number(xml)
{

	var doc = document.implementation.createHTMLDocument("example");
	doc.documentElement.innerHTML = xml.responseText;
	
	// console.log(xml);
	// console.log(doc.documentElement.innerHTML);

	let mails = doc.querySelector(".counter_badge");
	let numbermails = mails.innerText;

	// console.log(numbermails);

	chrome.browserAction.setBadgeBackgroundColor({ color: [176, 0, 0, 125] });
	chrome.browserAction.setBadgeText({text: (numbermails.toString())});
}

setInterval(read_joy, 12000);