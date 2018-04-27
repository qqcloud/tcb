const queryString = require('querystring');
const config = require('../../config');

module.exports = {
	getI18n(lang) {

	},
	i18n__() {

	},
	i18n__t() {

	},
	render404(ctx) {
		return ctx.render('404');
	},
	render50X(ctx) {
		return ctx.render('50x');
	},
	getResDataForJson(data) {
		let result;
		if (data instanceof ERROR.ResponseError) {
			result = {
				code: data.code,
				msg: data.msg,
				data: data.data,
				detail: data.detail
			};
		} else if (data instanceof Error) {
			const error = ERROR.create('SERVER_RESPONSE_ERROR', {
				'msg': '${msg}[Server]',
			});
			result = {
				code: error.code,
				msg: error.msg,
				data: null,
			};
		} else if (_.isPlainObject(data) && data.code !== undefined && data.data) {
			result = Object.assign({}, {
				code: 0,
				msg: 'ok',
			}, data);
		} else {
			result = {
				code: 0,
				msg: 'ok',
				data: data,
			}
		}
		return result;
	},
	resJson(data, ctx) {
		const {
			request,
			response
		} = ctx;
		const cgiType = request.$cgiType;
		const resData = this.getResDataForJson(data);
		if (cgiType === 'jsonp') {
			this.resJsonp(resData, ctx);
		} else if (cgiType === 'ajax') {
			ctx.body = resData;
		} else {
			const error = ERROR.create('SERVER_RESPONSE_ERROR', {
				'msg': '${msg}[Server]',
			});
			ctx.body = this.getResDataForJson(error);
		}
		return;
	},
	resJsonp(data, ctx) {
		const {
			request,
			response
		} = ctx;
		const jsonpFunName = request.query[config.jsonp].replace(/[^\w_]/gmi, '');
		return ctx.body = jsonpFunName + '(' + JSON.stringify(data) + ');';
	},
	addQueryStringToUrl(rawUrl, qsObj) {
		let hash = '',
			url = '',
			pos = rawUrl.indexOf('#');

		if (pos !== -1) {
			hash = rawUrl.slice(pos);
			url = rawUrl.slice(0, pos);
		} else {
			url = rawUrl;
		}

		if (url.indexOf('?') == -1) {
			url += '?' + queryString.stringify(qsObj);
		} else {
			url += '&' + queryString.stringify(qsObj);
		}

		return url + hash;
	},
	vsub(tmpl, vector) {
		return ('' + tmpl).replace(/\$\{([^\{\}]+)\}/g, function(_, p, v) {
			return (v = (vector || {})[p]) == null ? '' : v;
		});
	},
	async respond(reqPromise, error = 'SERVER_RESPONSE_ERROR', opts = {}) {
		let errorMap;
		if (_.isString(error) && ERROR.errorTypes[error]) {
			errorMap = {
				'*': error,
			};
		} else if (_.isPlainObject(error)) {

			errorMap = _.transform(error, (ret, value, key) => {
				ret[key] = ERROR.errorTypes[value] ? value : 'SERVER_RESPONSE_ERROR';
			}, {});

			if (!errorMap['*']) {
				errorMap['*'] = 'SERVER_RESPONSE_ERROR';
			}
		} else {
			errorMap = {
				'*': 'SERVER_RESPONSE_ERROR',
			};
		}
		return new Promise((reslove, reject) => {
			try {
				const result = await reqPromise();
				const {
					code,
					msg
				} = result;
				if (code === 0) {
					reslove(result);
				} else if (errorMap[code]) {
					const error = ERROR.create(errorMap[code]);

					if (opts.useOriMsg && msg) {
						error.msg = msg;
					}
					reject(error);
				} else {
					const error = ERROR.create(errorMap['*']);

					if (opts.useOriMsg && msg) {
						error.msg = msg;
					}
					reject(error);
				}
			} catch (err) {
				reject(err);
			}
		});
	},
};