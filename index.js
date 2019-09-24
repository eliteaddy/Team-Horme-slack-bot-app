const Slackbot = require("slackbots");
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const token = "xoxb-771591631143-769745293696-JZv34J29U0Uhp6GaeTWbccUq";

const bot = new Slackbot({
  token,
  name: "conversation-saver"
});

// Start Handler
bot.on("start", () => {
  bot.postMessageToChannel("general", "Lets help you save your conversation");
  bot.postMessage("general", "Welcome to Conversation Saver");
  // console.log(res);
});

// Error Handler
bot.on("error", err => console.log(err));

// Message Handler
bot.on("message", data => {
  if (data.user == bot.id) {
    return;
  }
  if (data.type == "message") {
    handleMessage(data);
    console.log(data);
  }
  if (data.type == "app_mention") {
    console.log("object");
  }
  if (data.type == "app_home") {
    console.log("app home opened");
  }
  // console.log(data);
});

const handleMessage = data => {
  var message = data.text;
  var channel = data.channel;
  // console.log(channel);
  if (
    message.includes(" signup") ||
    message.includes(" sign-up") ||
    message.includes(" sign up")
  ) {
    bot.postMessage(channel, "Enter your username");
    // bot.postMessageToChannel("general", "Enter your username");
  }
  if (
    message.includes(" signin") ||
    message.includes(" sign-in") ||
    message.includes(" sign in")
  ) {
    bot.postMessage(channel, "Enter your username");
    // bot.postMessageToChannel("general", "Enter your username");
  }
  if (message.includes(" history")) {
    // bot.postMessageToChannel("general", "Getting History");
    bot.postMessage(channel, "Getting history");

    getChannelHistory(data.channel);
  }
};

const getChannelHistory = channel => {
  var tokens = `xoxp-771591631143-769737406181-771950709478-5dfdd0b8f3fd4e748c8892cda41e2c1a`;
  var url = `https://slack.com/api/conversations.history?token=${tokens}&channel=${channel}`;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) console.log(xhr.responseText);
  };
  xhr.open("GET", url, true);
  xhr.send();
};
