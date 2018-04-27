
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
		const packReqData = _.isFunction(this.service.packReqData) ? this.service.packReqData : util.packReqData;
		const packResData = _.isFunction(this.service.packResData) ? this.service.packResData : util.packResData;

		const reqData = packReqData(this.req, interfaceName, data);
		const suburl = opts.suburl || '';
		delete opts.suburl;
		const reqOpts = Object.assign({
				url: this.service.url,
				data: reqData,
			}, this.service.reqOpts,
			opts);

		if(suburl) {
			reqOpts.url += suburl;
		}
		
		return new Promise(async (reslove, reject) => {
			try {
				const result = await Request(reqOpts);
				packResData(result, {
					interface: interfaceName,
					...reqOpts
				}).then((data) => {
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
