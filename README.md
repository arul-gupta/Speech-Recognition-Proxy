# Speech-Recognition-Proxy

The HTML5 Speech Recognition needs a recognition API to work. While Google's engine is available for use in Google Chrome browsers, there is way to use this in a node-webkit app that has Chromium.
This extension acts as a proxy between node-webkit app and Google Chrome browser and provides a way to use Google's speech recognition in a node-webkit app.

The node-webkit is running a websocket server on localhost which is used for communication between app and the extension.
