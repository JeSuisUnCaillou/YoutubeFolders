chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		//Get all channels ids
		var href_substring = '/channel/'
		var channels = $("a[href^='"+href_substring+"']").map(function() {
			return $(this).attr('href').substr(href_substring.length);
		})
		console.log(channels.length + " channels")
		console.log(channels)
		
		//var firstHref = channels.eq(0).attr("href")
		//console.log(firstHref);
	  
		//chrome.runtime.sendMessage({"message": "open_new_tab", "url": "https://www.youtube.com" + firstHref});
    }
  }
);