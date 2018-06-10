// ==UserScript==
// @name         JoySichtbarkeit-Helper
// @version      0.2
// @description  Macht das Umstellen der Sichtbarkeit im Joyclub mittels einem Klick möglich
// @author       Thyrnir
// @match https://www.joyclub.de/*
// @grant        none
// ==/UserScript==

"use strict";

let xhttp = new XMLHttpRequest();

function get_sichtbarkeit_status(){
	// Ermittelt den aktuellen Sichtbarkeitsstatus
	// gibt true für sichtbar und false für unsichtbar zurück
	let menuinhalt = document.getElementsByClassName("nav_link_icon glyphicons glyphicons-eye-open");
	if (menuinhalt.item(0) == null) {
		return false;
	}
	return true;
}

function create_sichtbarkeit_button(){
	// Sichtbarkeitsbutton im oberen Menü einfügen
	let ul = document.getElementsByClassName("top_area_links");
	ul = ul[0];
	let li = document.createElement("li");
	ul.appendChild(li);
	
	if(get_sichtbarkeit_status())
	{
		li.innerHTML = "<a id=\"sichtbarkeit\" href=\"#\"><span class=\"nav_link_icon glyphicons glyphicons-eye-open\" aria-hidden=\"true\"></span><span class=\"item_text\">Sichtbar</span></a>";
	}
	else
	{
		li.innerHTML = "<a id=\"sichtbarkeit\" href=\"#\"><span class=\"nav_link_icon glyphicons glyphicons-eye-close\" aria-hidden=\"true\"></span><span class=\"item_text\">Unsichtbar</span></a>";
	}
	
	let link = document.getElementById('sichtbarkeit');
	// onClick's logic below:
	link.addEventListener('click', function() {
        sichtbarkeit_einstellen();
    });
}

function sichtbarkeit_einstellen()
{
	// baut einen http request mittels formdata,
	// cache_killer ist irgendeine joy-interne Variable, die dazu benötigt wird
	// ist im html als input hinterlegt, welches ausgelesen wird
	let request = new XMLHttpRequest();
	request.open("POST", "https://www.joyclub.de/edit/invisible/", true);

	let formDaten = new FormData();
	formDaten.append("user_request","online_save");
	let cache_killer = document.getElementsByName("cache_killer")[0].value;
	formDaten.append("cache_killer",cache_killer);
	
	if(get_sichtbarkeit_status())
	{
		// sichtbar --> unsichtbar
		formDaten.append("user_online_type", "3");
	}
	else
	{
		// unsichtbar --> sichtbar
		formDaten.append("user_online_type", "1");
	}
	
	formDaten.append("user_hide_last_online", "1");
	request.send(formDaten);
	
	// reload notwendig, um änderungen zu sehen
	location.reload();
}
	
create_sichtbarkeit_button();