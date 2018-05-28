const nock = require('nock');
// https://github.com/node-nock/nock
const nockConf = require('./service');
const config = require('../config');
const delayTime = 200; // 200milliseconds
const options = {allowUnmocked: true};

module.exports = {
	init(){
		const env = config.env;
		if(env === 'prd' || env === 'test' || config.mockService !== 1) {
			return false;
		}
		_.map(nockConf, (serviceConf, service) => {
			_.map(serviceConf, (conf, interfaceName) => {
				const { method, reply, origin, path } = conf;
				console.log(conf);
				if(method === 'get') {
					nock(origin, options).
					get(path).
					delay(delayTime).
					query(conf.query).
					reply(conf.reply[0], conf.reply[1]);
				} else {
					nock(origin, options).
					filteringRequestBody(conf.filteringRequestBody).
					post(path, conf.body).
					delay(delayTime).
					reply(conf.reply[0], conf.reply[1]);
				}
			});
		});
	},
	start(){
		if (!nock.isActive()) {
			nock.activate();
		}
	},
	stop(){
		if (nock.isActive()) {
			nock.restore();
		}
	},
	clear(){
		nock.cleanAll();
	},
};