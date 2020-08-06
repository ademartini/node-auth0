var ArgumentError = require('rest-facade').ArgumentError;
var utils = require('../utils');
var Auth0RestClient = require('../Auth0RestClient');
var RetryRestClient = require('../RetryRestClient');

var LogStreamsManager = function(options) {
  if (options === null || typeof options !== 'object') {
    throw new ArgumentError('Must provide client options');
  }

  if (options.baseUrl === null || options.baseUrl === undefined) {
    throw new ArgumentError('Must provide a base URL for the API');
  }

  if ('string' !== typeof options.baseUrl || options.baseUrl.length === 0) {
    throw new ArgumentError('The provided base URL is invalid');
  }

  var clientOptions = {
    headers: options.headers,
    query: { repeatParams: false }
  };

  var auth0RestClient = new Auth0RestClient(
    options.baseUrl + '/logs-streams/:id ',
    clientOptions,
    options.tokenProvider
  );
  this.resource = new RetryRestClient(auth0RestClient, options.retry);
};

utils.wrapPropertyMethod(LogStreamsManager, 'getAll', 'resource.getAll');
utils.wrapPropertyMethod(LogStreamsManager, 'get', 'resource.get');
utils.wrapPropertyMethod(LogStreamsManager, 'create', 'resource.create');
utils.wrapPropertyMethod(LogStreamsManager, 'delete', 'resource.delete');
utils.wrapPropertyMethod(LogStreamsManager, 'patch', 'resource.patch');

module.exports = LogStreamsManager;
