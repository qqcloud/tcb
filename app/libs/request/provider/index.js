
const Request = require('../lib/request');
const util = require('../lib/util');

class Provider {
	constructor(ctx, service) {
		this.req = ctx.request;
		this.service = service;
	}

	async post(interfaceName, data, opts = {}, cb = () => {}) {
		const options = Object.assign({}, opts, {
			method: 'POST'
		});
		return this.fetch(interfaceName, data, options, cb);
	}

	async fetch(interfaceName, data = {}, opts = {}, cb = () => {}) {
		const packReqData = _.isFunction(service.packReqData) ? service.packReqData : util.packReqData;
		const packResData = _.isFunction(service.packResData) ? service.packResData : util.packResData;

		const reqData = packReqData(req, interfaceName, para);

		const reqOpts = Object.assign({
				url: service.url,
				data: reqData,
			}, service.reqOpts,
			opts);

		return new Promise(async (reslove, rejcet) => {
			try {
				const result = await Request(reqOpts);
				packResData(result).then((data) => {
					cb(reqOpts, data);
					reslove(data);
				}).catch((err) => {
					cb(reqOpts, err);
					reject(err);
				});
			} catch (err) {
				cb(reqOpts, data);
				reject(err);
			}
		});
	}
}
module.exports = Provider;
