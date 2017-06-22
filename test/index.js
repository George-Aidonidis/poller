const chai = require('chai');
const Poller = require('../src/index');

// gia na mi se mperdeyw me testing akoma

const poller = new Poller('https://dev@thechatshop.co.uk:9ef67dd79e4349e667cb2c1564a83e7f@api.livechatinc.com/chats/OR3XAZ7YY7/');

poller.on('data', function (data) {
    poller.stop();
});

//giati ton stamatate otan brei data? de theloume na akoyei synxeia? ok
// swsta, giua logous demo mono
// twra 8a trexw "node test/index.js"