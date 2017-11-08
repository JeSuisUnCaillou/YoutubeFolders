chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		var channels = $("a[href^='/channel/']")
		console.log(channels.length + " channels")
		var firstHref = channels.eq(0).attr("href")
		console.log(firstHref);
	  
		//chrome.runtime.sendMessage({"message": "open_new_tab", "url": "https://www.youtube.com" + firstHref});
    }
  }
);