const queryString = require('querystring');
const config = require('../../config/index');

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
		return ('' + tmpl).replace(/\$\{([^\{\}]+)\}/g, function (_, p, v) {
			return (v = (vector || {})[p]) == null ? '' : v;
		});
	},
	/**
	 * 工具方法：构造Promise::then处理函数
	 * @param  {String|Any}          prop  成功取值
	 * @param  {String|Array|Object} error 错误码／错误码映射
	 * @return {Function} 回调函数
	 * @author yomeeliu
	 */
	respond(prop, error = 'SERVER_RESPONSE_ERROR') {
		const DEFAULT_ERROR_TYPE = 'SERVER_RESPONSE_ERROR';

		return (resp = {}) => {
			const code = resp.code;

			if (code === 0) {
				if (typeof prop === 'function') {
					return prop(resp);
				}

				const ispath = (prop && typeof prop === 'string' || Array.isArray(prop));
				return (ispath ? _.property(prop)(resp) : prop);
			}

			if (!_.isPlainObject(error)) {
				error = { '*': error };
			}

			// 映射后台接口错误码到`E.ERROR_TYPES`
			const errorHandlers = _.transform(error, (ret, handler, codes) => {
				String(codes).split('|').forEach(code => {
					ret[code] = handler;
				});
			}, {});

			const targetHandler = errorHandlers[code] || errorHandlers['*'];

			if (typeof targetHandler === 'function') {
				return targetHandler(resp);
			}

			if (Array.isArray(targetHandler) && targetHandler.length === 2) {
				let [code, msg] = targetHandler;

				if (code === '${code}') {
					code = resp.code;
				}

				msg = this.vsub(msg, { code: resp.code, msg: resp.msg });

				return Promise.reject(E.create('ERROR_DEFAULT', { code, msg }));
			}

			if (typeof targetHandler === 'string') {
				let [type, ...msg] = targetHandler.split('|');

				msg = msg.length && msg.join('|') || void(0);
				if (typeof msg === 'string') {
					msg = this.vsub(msg, { code: resp.code, msg: resp.msg });
				}

				return Promise.reject(E.create(type, msg));
			}

			return Promise.reject(E.create(DEFAULT_ERROR_TYPE));
		};
	},
};