function oeffne_Postfachlink(){
    
    console.log('https://www.joyclub.de/clubmailv3/');
    chrome.tabs.create({active: true, url: 'https://www.joyclub.de/clubmailv3/'});
}

document.getElementById("JoyPostfach").addEventListener("click", oeffne_Postfachlink);
