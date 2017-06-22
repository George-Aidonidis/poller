const chai = require('chai');
const sinon = require('sinon');
const axios = require('axios');
const Poller = require('../src/index');

const testUrl = 'https://tcs-edi.herokuapp.com/time';

describe('Poller', () => {
	let poller;

	before(done => {
		axios.get(testUrl)
			.then(() => {
				done();
			})
			.catch(err => {
				done(err);
			});
	});

	before(() => {
		poller = new Poller(testUrl);
	});

	after(() => {
		poller.stop();
	});

	it('should emit data', done => {
		poller.on('data', () => {
			done();
		});
	});

	it('should have start and stop functionality', () => {
		chai.assert.isFunction(poller.start, 'Poller has a function start()');
		chai.assert.isFunction(poller.stop, 'Poller has a function stop()');
	});

	it('should emit errors', done => {
		const pollerError = new Poller('worngpath');
		pollerError.on('error', () => {
			done();
		});
	});

	it('should not start polling if shouldStart is false', () => {
		const start = sinon.spy(Poller.prototype, 'start');
		new Poller(testUrl, 1000, {}, false);

		sinon.assert.notCalled(start);
	});
});
