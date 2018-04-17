const config = require('../../../../config');

module.exports = {

	getMethod(method){
		method = method && method.toUpperCase();
		const methodList = [
			'GET',
			'POST',
		];
		return methodList.indexOf(method) !== -1 ? method : 'POST';
	},
	getPostType(postType){
		const postTypeList = [
			'json',
			'form',
			'formData',
		];
		return postTypeList.indexOf(postType) !== -1 ? postType : 'json';
	},
	packReqData(req, interfaceName, para) {
		return {
			version: 1,
			componentName: config.PROJECT_NAME,
			eventId: ~~(Math.random() * 999999999) + 100000000,
			timestamp: Date.now(),
			user: 'auto',
			interface: { interfaceName, para },
			spanId: req.$spanId,
			seqId: req.$reqSeqId,
		};
	},
	packResData(result){
		return new Promise((reslove, reject) => {
			if (_.isObject(result) && 'returnCode' in result) {
				resolve({
					code: resp.returnCode,
					msg: resp.returnMessage || '',
					data: resp.data || {},
				});
			} else {
				reject(ERROR.create('503', 'Backend ${msg}'));
			}
		});
	},
	getReqOpts(opts){
		const { url, data, timeout, time, method } = opts;
		const reqOpts = {
			url: url,
			timeout: timeout || config.serviceTimeout,
			time: time === false ? false : true,
			method: helper.getMethod(method),
			resolveWithFullResponse: true, // 返回原始 response
		};

		if (reqOpts.method === 'POST') {

			const postType = helper.getPostType(opts.postType);
			reqOpts[postType] = data;
		} else if (reqOpts.method === 'GET') {

			reqOpts['json'] = true; // res json 格式解析
			reqOpts.url = utilLib.addQueryStringToUrl(reqOpts.url, data);
		}
		
		return reqOpts;
	},
};