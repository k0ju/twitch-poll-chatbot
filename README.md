# Twitch Poll Chatbot
Simple Twitch Bot created with Node.JS using the tmi.js module for determining votes.

------

## Requirements?
You will need:
* [NodeJS](https://nodejs.org/en/)
* [TMI.JS](https://tmijs.org/)
* A Twitch account in necessary for the bot.

------

## Install
1. Clone repository

2. Initialize Node `npm init`. For the entry point setting, enter bot.js.

3. Install the tmi.js package `npm install tmi.js`
    
4. Setup bot

`bot_oauth_token` you can get [here by login via bot](https://twitchapps.com/tmi/)

Open config.js and replace:

* username
* passwort
* channels

```js
identity: {
        username: '<bot_username>',
        password: '<bot_oauth_token>'
    },
    channels: [
        '<channel>'
    ]
```

Note: The Bot can also join multiple channles. To do this, you need to type the channles in a comma-separated sequence. e.g.:

`channels: ['<channel1>', '<channe2>', 'c<channel3>']`

5. Run bot `node bot.js`