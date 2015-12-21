
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.action == "start") {
    	document.getElementById('start_button').click();
    	console.log("Starting");
  	} else if(request.action == "stop") {
  		document.getElementById('start_button').click();
  		console.log("Stopping");
  		setTimeout(function(){
  			var data = document.getElementsByClassName("final")[0].innerText;
  			console.log("Final:");
  			console.log(data);
  			chrome.runtime.sendMessage({"action":"result", "text": data});
  		}, 2000);	
  	}
  });