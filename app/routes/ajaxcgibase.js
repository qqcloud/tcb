const CgiBase = require('./cgibase');
const utilLib = require('../libs/utillib');

class AjaxCgiBase extends CgiBase {
	constructor() {
		super(...arguments);
		const { ctx } = this;
		this.injectServices(ctx);
	}

	/**
	 * handle route of ajax
	 */
	async handle() {
		const {ctx,next} = this;
		const { request } = ctx;
		let action = ctx.params.action || 'index';
		action = action.replace(/^./, action[0].toUpperCase());
		const actionHandler = `on${action}`;
		if (typeof this[actionHandler] === 'function') {
			try {
				await this[actionHandler]();
			} catch (err) {
				Logger.error(JSON.stringify({
					info: '[res ajax 50x] =>' + ctx.originalUrl,
					detail: err.stack,
					seqReqId: request.$reqSeqId,
				}));
				this.send(err);
			}
		} else {
			this.send(ERROR.create('404', {
				'msg': '${msg}[Server]',
			}));
		}
	}

	send(data){
		const { ctx } = this;
		utilLib.resJson(data, ctx);
	}
}

module.exports = AjaxCgiBase;