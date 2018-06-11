function get_joymail_status ()
{
	// console.log("Start background script");
	xhttp = new XMLHttpRequest();
	console.log("xhttp");
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			console.log("awesome, ready to parse");
			console.log(this.responseText);
            
            let content = JSON.parse(this.responseText);
			aktualisiere_extension_anzeige(content);
		}
	};
	xhttp.open("GET", "https://www.joyclub.de/clubmailv3/clubmail_auto_update", true)
	xhttp.send();
}

function aktualisiere_extension_anzeige(obj)
{
	console.log(obj);
	let numbermails = obj.content.unread_message_count_total;
	console.log(numbermails);
    
	chrome.browserAction.setBadgeBackgroundColor({ color: [176, 0, 0, 125] });
	chrome.browserAction.setBadgeText({text: numbermails.toString()});
    
    if (obj.content.new_state) chrome.browserAction.setIcon({path : "img/favicon_mail.png"});
    else chrome.browserAction.setIcon({path : "img/favicon.png"});
    
}

get_joymail_status();
setInterval(get_joymail_status, 12000);

