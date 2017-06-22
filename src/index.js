const axios = require('axios');
const EventEmitter = require('events');
const {isEqual, isError} = require('lodash');
const sleep = require('sleep-promise');

class Poller extends EventEmitter {
    constructor(url, opts = {}, shouldStart = true) {
        super();

        this.url = url;
        this.opts = opts;
        this.delay = 1000;
        this.pollingFlag = shouldStart;

        shouldStart && this.poll();
    }

    start() {
		this.pollingFlag = true;
    }

    stop() {
        this.pollingFlag = false;
    }

    poll() {
    	let previousResponse = null;

    	const pollPromise = () => axios.get(this.url)
    		.then(response => {
				if (this.pollingFlag === false) {
					return Promise.resolve();
				}

				if (previousResponse === null) {
	    			previousResponse = response;

					return Promise.resolve(response);
				}

				!(isEqual(previousResponse.data, response.data)) && this.emit('data', response);
    			previousResponse = response;

    			return Promise.resolve();
    		})
    		.then(sleep(this.delay))
    		.then(() => {
    			return this.pollingFlag
    				? pollPromise()
    				: Promise.resolve();
    		})
			.catch(reason => {
				isError(reason) && this.emit('error', reason);

				console.log(reason);
			})

    	return pollPromise();
    }
}

module.exports = Poller;
