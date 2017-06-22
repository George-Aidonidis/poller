const axios = require('axios');
const EventEmitter = require('events');
const {get, isEqual, isError} = require('lodash');
const sleep = require('sleep-promise');

class Poller extends EventEmitter {
    constructor(url, delay = 1000, axiosOpts = {}, shouldStart = true) {
        super();

        this.url = url;
        this.axiosOpts = axiosOpts;
        this.delay = delay;
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
		let axiosOpts = Object.assign({}, {url: this.url}, this.axiosOpts);

    	const pollPromise = () => axios(axiosOpts)
    		.then(response => {
				if (this.pollingFlag === false) {
					return Promise.resolve();
				}

				!(isEqual(get(previousResponse, 'data', null), response.data)) && this.emit('data', response.data);
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
