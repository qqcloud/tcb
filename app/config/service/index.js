/**
 * service config
 */
const interface = require('./interface');
const formatter = require('./formatter');
const service = require('../../../config').service;

module.exports = ((service, formatter, interface) => {
	const result = {};
	_.map(service, (url, name) => {
		if (interface[name]) {
			
			if (formatter[name]) {
				result[name] = formatter[name];
				result[name].url = url;
			} else {
				result[name] = {
					url,
				}
			}

			result[name].interface = interface[name];
		}
	});
	return result;
})(service, formatter, interface);