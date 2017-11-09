
// Called when the user clicks on the browser action. (icon of the extension in browser toolbar)
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  send_to_current_page("clicked_browser_action")
});

//Messages received from content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	//called to open new tab
    if( request.message === "open_new_tab" ) {
      chrome.tabs.create({"url": request.url});
    }
	//called to save some data
	else if( request.message === "save_data" ) {
	  
	  chrome.storage.sync.get("YoutubeFolders", function(items){
		  var previous_data = items["YoutubeFolders"]
		  
		  var new_data = previous_data
		  
		  for(key in request.data){
			  var val = request.data[key]
			  if(key in previous_data){
				  new_data[key].push(val)
			  } else {
				  new_data[key] = [val]
			  }
		  }
			
		  chrome.storage.sync.set({ "YoutubeFolders": new_data }, function(){
			send_to_current_page("data_saved", new_data)
		  })
	  })
	  
	  
    }
	//called to get some data
	else if( request.message === "get_data" ) {
		chrome.storage.sync.get("YoutubeFolders", function(items){
			send_to_current_page("give_data", items["YoutubeFolders"])
		});
	}
  }
);

// Send a message to the active tab. Data is not mandatory.
var send_to_current_page = function(message, data){
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	var activeTab = tabs[0];
	chrome.tabs.sendMessage(activeTab.id, {"message": message, "data": data});
  });
}