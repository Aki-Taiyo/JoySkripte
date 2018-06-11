// Bei einem Klick schauen, ob das Event ein href hatte, wenn ja, dann den Link in neuem Tab öffnen
window.addEventListener('click',function(e){
                        if(e.target.href!==undefined && window.chrome
                           && navigator.userAgent.indexOf("Chrome") !== -1){
                        chrome.tabs.create({url:e.target.href})
                        }
                        })


