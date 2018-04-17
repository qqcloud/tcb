const CgiBase = require('./cgibase');

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
			} catch (e) {
				Logger.error(JSON.stringify({
					detail: e,
					seqReqId: request.$reqSeqId,
				}));
				await utilLib.render50X(ctx);
			}
		} else {
			
		}
	}
}

module.exports = AjaxCgiBase;