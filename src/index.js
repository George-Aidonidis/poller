const axios = require('axios');
const EventEmitter = require('events');
const lodash = require('lodash');

class Poller extends EventEmitter {
    constructor(url, opts, shouldStart=false) {

        shouldStart && this.start();
    }

    start() {
        this.pollingFlag = true;
    }

    stop() {
        this.pollingFlag = false;
    }
}

module.exports = Poller;

// Ksekinaei to polling me ti start()
//
// Kathe fora pou vriskei allages kanei emit('data', payload)
//
// Stamataei me tin stop
//
// opts -> options gia to axios request https://github.com/mzabriskie/axios#axios-api
