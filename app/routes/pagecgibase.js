const CgiBase = require('./cgibase');
const utilLib = require('../libs/utillib');

class PageCgiBase extends CgiBase {
	constructor() {
		super(...arguments);
	}

	/**
	 * handle route of page
	 */
	async handle() {
		const { ctx, next } = this;
		const { request } = ctx;
		let action = ctx.params.action || 'index';
		action = action.replace(/^./, action[0].toUpperCase());
		const actionHandler = `on${action}`;

		if (typeof this[actionHandler] === 'function') {
			try {
				Logger.debug(JSON.stringify({
					info: '[render page] =>' + ctx.originalUrl,
					seqReqId: request.$reqSeqId,
				}));
				await this[actionHandler]();
			} catch (e) {
				Logger.error(JSON.stringify({
					info: '[render page 50x] =>' + ctx.originalUrl,
					detail: e.stack,
					seqReqId: request.$reqSeqId,
				}));
				await utilLib.render50X(ctx);
			}
		} else {
			Logger.error(JSON.stringify({
				info: '[render page 404] =>' + ctx.originalUrl,
				seqReqId: request.$reqSeqId,
			}));
			await utilLib.render404(ctx);
		}
	}
}

module.exports = PageCgiBase;