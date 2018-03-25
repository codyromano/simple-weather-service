/**
* Wrap a method with caching logic.
*/
const methodCacheDecorator = (fn, maxAge = 1000 * 60 * 60) => {
  let responses = {};

  return async function wrappedWithCacheLogic(...args) {
    // Use the argument list as a key because we only want to return
    // a cached response if the request is identical
    const requestId = args.join('');
    const currentTime = new Date().getTime();

    responses[requestId] = responses[requestId] || {};

    // Return data from the cache if it's valid
    if (responses[requestId].time &&
      currentTime - responses[requestId].time <= maxAge) {
      console.log(`Sending cached response for request ${requestId}`);
      return Promise.resolve(responses[requestId].data);
    }

    console.log(`Sending new response for request ${requestId}`);
    // Call the actual method to fetch data
    const response = await fn(...args);

    // Cache for the next request
    Object.assign(responses[requestId], {
      time: currentTime,
      data: response
    });

    return Promise.resolve(response);
  };
};

module.exports = methodCacheDecorator;
