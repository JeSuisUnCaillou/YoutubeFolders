$(document).ready(function(){
	
	var current_data = {}
	
	chrome.runtime.onMessage.addListener(
	  function(request, sender, sendResponse) {
		if( request.message === "clicked_browser_action" ) {
			send_to_back("get_data")
			
		} else if (request.message === "data_saved"){
			console.log("data saved : ")
			console.log(request.data)
			
		} else if (request.message === "give_data"){
			//update the current data FUCK J'UPDATE PAS LA MEMOIRE SYNC QUEL CON
			current_data = request.data
			console.log("current_data : ")
			console.log(current_data)
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
	

	//Add buttons to each channel in /feed/channels page
	var add_all_channels_buttons = function(){
		var href_substring = '/channel/'
		var channel_divs = $("a[href^='"+href_substring+"']")
		
		channel_divs.each(function(index, channel_div){
			channel_id = $(channel_div).attr('href').substr(href_substring.length);
			var container = $(channel_div).closest("ytd-channel-renderer").find("#subscribe-button")
			
			container.append("<paper-button data-channel-id='"+channel_id+"' role='button' class='youtube-folders-button style-scope ytd-subscribe-button-renderer' tabindex='0' animated>FOLDERS</button>")
		})
	}

	//Actually add the buttons when page is ready
	add_all_channels_buttons()
})


