const chai = require('chai');
const Poller = require('../src/index');

// xeirokinito exit meta apo 60s
setTimeout(() => {}, 60*1000);

const poller = new Poller('https://tcs-edi.herokuapp.com/time');

poller.on('data', function (data) {
    console.log('data emited', data);
    poller.stop();
});
