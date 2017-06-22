const axios = require('axios');
const EventEmitter = require('events');
const lodash = require('lodash');

class Poller extends EventEmitter {
    constructor(url,  opts = {}, shouldStart = true) {
        super();

        this.url = url;
        this.opts = opts;
        this.delay = 1000;
        this.pollingFlag = shouldStart;

        shouldStart && this.start();
    }

    start(payload = null) {
          axios.get(this.url).then(result => {
				if (this.pollingFlag === false) {
					return;
				}

				if (payload === null) {
					this.start(result);
				} else {
					const resultsEqual = lodash.isEqual(payload.data, result.data);
					if (!resultsEqual) {
					    this.emit('data', result);
					}
					setTimeout(() => {
						console.log('Listening every', this.delay);
						this.start(result);

					}, this.delay);
				}
			}).catch(err => {
				console.log(err);
			});
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

//https://username:password@lcapi.com/blha

//ayto exei auth apo ti mana tou kai to axios to timaei