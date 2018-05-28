/**
 * nock service config
 */
const Path = require('path');
const { URL } = require('url');
const serviceConf = require('../../app/config').service;
const mockServiceConf = {
	mock: require('./mock'),
};
const supportMethod = ['get', 'post'];

module.exports = (() => {
	const nockConf = {};

	_.map(mockServiceConf, (service, name) => {
		
		const serviceUrl = new URL(serviceConf[name].url || '');
		const origin = serviceUrl.origin;
		if(origin && service.on === 1) {
			nockConf[name] = {};

			const defaultMethod = service.method || 'post';
			_.map(service.interface, (conf, interfaceName) => {
				const method = conf.method || defaultMethod;
				if(conf.on && supportMethod.indexOf(method) !== -1) {
					let path = serviceUrl.pathname;
					const interfaceNamePath = serviceConf[name]['interface'][interfaceName] || '';
					path = service.suburl === 1 ? Path.join(path, interfaceNamePath) : path;
					const tempConf = {
						origin,
						path,
						method,
						reply: conf.reply,
					};
					if(method === 'get') {
						tempConf['query'] = conf.query || true;
					} else {
						tempConf['body'] = conf.body || true;
						if(conf.filteringRequestBody) {
							tempConf['filteringRequestBody'] = conf.filteringRequestBody;
						} else if (service.filteringRequestBody) {
							tempConf['filteringRequestBody'] = service.filteringRequestBody;
						} else {
							tempConf['filteringRequestBody'] = (body) => {return body};
						}
					}
					nockConf[name][interfaceName] = tempConf;
				}
			})
		}
	});

	return nockConf;
})();