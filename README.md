# Poller
[![Build Status](https://travis-ci.org/thechatshop/poller.svg?branch=master)](https://travis-ci.org/thechatshop/poller)

### A nice poller for your http endpoints
#### Usage:
Create a new poller
```
const Poller = require('tcs-poller');
const url = 'http://yoururl.com';
poller = new Poller(url);
```

To manually start the poller use:
```
const poller = new Poller(testUrl, 1000, {}, false);
poller.start();
```

To manually stop the poller use:
```
const poller = new Poller(testUrl);
poller.stop();
```

Expect to get changes of the response on `data` event
```
poller.on('data', (data) => {
  console.log(data);
});
```

Available parameteres are:
* `axiosOpts` : Object to pass for axios https://github.com/mzabriskie/axios
* `delay` : The delay for the sleep before each request
* `pollingFlag` : If the polling should start on new object instantiation

Example:
```
const poller = new Poller(testUrl, 1000, {}, false);
```
