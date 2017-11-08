chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
		//Get all channels ids
		//var channels = get_all_channels_in_page()
		
		//send_to_back("save_data", channels)
		//send_to_back("get_data")
		
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

//Add buttons to each channel in /feed/channels page
var add_all_channels_buttons = function(){
	var href_substring = '/channel/'
	var channel_divs = $("a[href^='"+href_substring+"']")
	
	channel_divs.each(function(index, channel_div){
		channel_id = $(channel_div).attr('href').substr(href_substring.length);
		var container = $(channel_div).closest("ytd-channel-renderer").find("#subscribe-button")
		
		container.append("<paper-button data-channel-id='"+channel_id+"' role='button' class='youtube-folders-button style-scope ytd-subscribe-button-renderer' tabindex='0' animated>FOLDERS</button>")
		
		//console.log(container)
	})
}

//Actually add the buttons when page is ready
add_all_channels_buttons()


