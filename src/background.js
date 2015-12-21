function init() {
	try {
		setupWebsocket();
		chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
				if (request.action == "result") {
					console.log("Final result");
					console.log(request.text);
					replyCarmel(request.text);
				}
			});
	} catch(e) {
		console.log(e);
	}
}

function setupWebsocket() {
	window.carmelSocket = new WebSocket("ws://localhost:3002");
		window.carmelSocket.onerror = function(e) {
			console.log(e);			
		};
		window.carmelSocket.onmessage = function(msg){
			console.log(msg);
			switch(msg.data) {
				case "start":
					startRecognition();
					break;
				case "stop":
					stopRecognition();
					break;
				default:
					console.log("Unknown message - will read it out");
					tts(msg.data);
			}
		};
		window.carmelSocket.onclose = function(msg) {
			console.log("Socket connection lost");
			setTimeout(setupWebsocket, 5000);
		}
}

function tts(data) {
	var msg = new SpeechSynthesisUtterance(data);
	var voices = window.speechSynthesis.getVoices();
	msg.lang = 'en-US';
	msg.voice = voices[65];
    window.speechSynthesis.speak(msg);

}
function replyCarmel(message) {
	window.carmelSocket.send(message);
}

function startRecognition() {
	console.log("starting recog");
	chrome.tabs.query({"url":"https://www.google.com/intl/en/chrome/demos/speech.html"}, function callback(tabs){
		if(tabs.length > 0) {
			var tabId = tabs[0].id;
			chrome.tabs.sendMessage(tabId, {action: "start"});
		} else {
			chrome.tabs.create({"selected":false, "active":false, "url": "https://www.google.com/intl/en/chrome/demos/speech.html"}, function(tab){

				chrome.tabs.sendMessage(tab.id, {action: "start"});
			})
		}
		
	})
	// chrome.tabs.sendMessage(tabId, {action: "start"});
}

function stopRecognition() {
	console.log("stopping recog");
	chrome.tabs.query({"url":"https://www.google.com/intl/en/chrome/demos/speech.html"}, function callback(tabs){
		if(tabs.length > 0) {
			var tabId = tabs[0].id;
			chrome.tabs.sendMessage(tabId, {action: "stop"});
		} else {
			replyCarmel("Error");
		}
		
	})

}




window.onload = init;