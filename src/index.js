const EventEmitter = require('events');
const axios = require('axios');
const {get, isEqual, isError} = require('lodash');
const sleep = require('sleep-promise');

class Poller extends EventEmitter {
	constructor(url, delay = 1000, axiosOpts = {}, shouldStart = true) {
		super();

		this.url = url;
		this.axiosOpts = axiosOpts;
		this.delay = delay;
		this.pollingFlag = shouldStart;

		shouldStart && this.start();
	}

	start() {
		this.pollingFlag = true;
		this.poll();
	}

	stop() {
		this.pollingFlag = false;
	}

	poll() {
		let previousResponse = null;
		const axiosOpts = Object.assign({}, {url: this.url}, this.axiosOpts);

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
				return this.pollingFlag ?
					pollPromise() :
					Promise.resolve();
			})
			.catch(err => {
				isError(err) && this.emit('error', err);
			});

		return pollPromise();
	}
}

module.exports = Poller;
