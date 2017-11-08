$(document).ready(function(){
	//Add the modal to DOM
	$("ytd-page-manager#page-manager").prepend("<div class='modal' id='youtube-folders-form'><div class='modal-content'><span class='close'>&times;</span><p>Some text in the Modal..</p></div></div>")

	// Get the modal
	var modal = document.getElementById('youtube-folders-form');
	var modal_content = $(modal).find(".modal-content")

	// Get the buttons that opens the modal
	var btns = $(".youtube-folders-button")

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal 
	btns.click(function(event) {
		//display the modal
		modal.style.display = "block";
		//Update the id of the channel in modal
		var channel_id = $(this).attr('data-channel-id')
		modal_content.append(channel_id)
	})

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
		modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	}

})