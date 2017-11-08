
// Called when the user clicks on the browser action.
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
	//called save some data
	else if( request.message === "save_data" ) {
	  chrome.storage.sync.set({ "YoutubeFolders": request.data }, function(){
	     // Send a message to the active tab if sucessful save
		  send_to_current_page("data_saved")
	  });
    }
	//called to get some data
	else if( request.message === "get_data" ) {
		chrome.storage.sync.get("YoutubeFolders", function(items){
			send_to_current_page("data", items["YoutubeFolders"])
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