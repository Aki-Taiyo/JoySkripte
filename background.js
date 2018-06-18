let contextmenu_item = {
	"id": "block_user",
	"title": "Mitglied sperren",
	"contexts": ["link"],
	"targetUrlPatterns": ["https://www.joyclub.de/my/*.*.html"]
}

var cache_killer = "";

let _x = chrome.contextMenus.create(contextmenu_item);
chrome.contextMenus.onClicked.addListener(function block_user (clickData)
{
	// cache_killer aus dem aufrufenden Tab
	chrome.tabs.query({ active: true, currentWindow: true}, function x (tabs) { chrome.tabs.sendMessage(tabs[0].id, {message: "get_cache_killer"}, function set_cache_killer (response) 
	{ 
		if(typeof(response) == "undefined")
		{
			return;
		}
		// baut einen http request mittels formdata,
		// cache_killer ist irgendeine joy-interne Variable, die dazu benötigt wird
		// ist im html als input hinterlegt, welches ausgelesen wird
		let request = new XMLHttpRequest();
		request.open("POST", "https://www.joyclub.de/kontakte", true);

		let formDaten = new FormData();
		formDaten.append("cache_killer", response.cache_killer);
		formDaten.append("user_fav_request", "save");
		// linkUrl parsen (7-stellige Benutzernummer wird benötigt)
		usernummer = /[0-9]{7}/.exec(clickData.linkUrl)[0];
		formDaten.append("user_fav_fav_user_id", usernummer);
		formDaten.append("user_fav_folder_key", "");
		formDaten.append("user_fav_folder_id", "");
		formDaten.append("user_fav_fav_folder_list[]", "3");
		formDaten.append("user_fav_face2face", "0");
		formDaten.append("user_fav_watch_chkbx", "1");
		formDaten.append("user_fav_messenger_chkbx", "1");
		formDaten.append("user_fav_messenger", "1");
		formDaten.append("user_fav_friendship", "0");
		
		request.send(formDaten);
		
		// Usernamen aus URL auslesen
		let username = /[0-9]{7}\.(.*?).\./.exec(clickData.linkUrl);
		
		var opt = {
			type: "basic",
			title: "Joyclub-Skripte",
			message: "Mitglied " + username[1] + " wurde gesperrt",
			iconUrl: "img/favicon128.png"
		}
		chrome.notifications.create("note_user_blocked", opt);
	} ) } );
});

function get_joymail_status ()
{
	// console.log("Start background script");
	xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
            let content = JSON.parse(this.responseText);
			aktualisiere_extension_anzeige(content);
		}
	};
	xhttp.open("GET", "https://www.joyclub.de/clubmailv3/clubmail_auto_update", true)
	xhttp.send();
}

function aktualisiere_extension_anzeige(obj)
{
	let numbermails = obj.content.unread_message_count_total;
    
	chrome.browserAction.setBadgeBackgroundColor({ color: [176, 0, 0, 125] });
	// Badge nur anzeigen, wenn auch Mails da sind 
	if(numbermails > 0)
	{
		chrome.browserAction.setBadgeText({text: numbermails.toString()});
	}
	else
	{
		chrome.browserAction.setBadgeText({text: ""});
	}
    
    if (obj.content.new_state) chrome.browserAction.setIcon({path : "img/favicon_mail.png"});
    else chrome.browserAction.setIcon({path : "img/favicon.png"});
    
}

get_joymail_status();
setInterval(get_joymail_status, 12000);