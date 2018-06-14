chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if(request.message == "get_cache_killer")
		{
			sendResponse({cache_killer: document.getElementsByName("cache_killer")[0].value});
		}
});