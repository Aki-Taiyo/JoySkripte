console.log("cachekiller.js");

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(request);
		if(request.message == "get_cache_killer")
		{
			console.log("send cache_killer");
			sendResponse({cache_killer: document.getElementsByName("cache_killer")[0].value});
		}
});