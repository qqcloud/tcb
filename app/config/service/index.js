/**
 * service config
 */
const interfaceConf = require('./interface');
const formatter = require('./formatter');
const service = require('../../../config').service;

module.exports = ((service, formatter, interfaceConf) => {
	const result = {};
	_.map(service, (url, name) => {
		if (interfaceConf[name]) {
			
			if (formatter[name]) {
				result[name] = formatter[name];
				result[name].url = url;
			} else {
				result[name] = {
					url,
				}
			}

			result[name].interface = interfaceConf[name];
		}
	});
	return result;
})(service, formatter, interfaceConf);