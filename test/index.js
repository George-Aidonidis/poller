const chai = require('chai');
const Poller = require('../src/index');

// xeirokinito exit meta apo 60s
setTimeout(() => {}, 60*1000);

const poller = new Poller('https://dev@thechatshop.co.uk:9ef67dd79e4349e667cb2c1564a83e7f@api.livechatinc.com/chats/OR3XAZ7YY7/');

poller.on('data', function (data) {
    console.log('data emited');
    poller.stop();
});
