chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		//Get all channels ids
		var channels = get_all_channels_in_page()
		
		send_to_back("save_data", channels)
		send_to_back("get_data")
		
    } else if (request.message === "data_saved"){
		console.log("data saved !")
		
	} else if (request.message === "data"){
		console.log(request.data)
	}
  }
);

//Send messages to background.js
var send_to_back = function(message, data){
	chrome.runtime.sendMessage({
		"message": message,
		"data": data
	})
}

//Get all channels ids in page
var get_all_channels_in_page = function(){
	var href_substring = '/channel/'
	var channels = $("a[href^='"+href_substring+"']").map(function() {
		return $(this).attr('href').substr(href_substring.length);
	})
	return channels
}