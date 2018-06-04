const CgiBase = require('./cgibase');
const utilLib = require('../libs/utillib');
/**
 * Class PageCgiBase
 * @extends CgiBase
 */
class PageCgiBase extends CgiBase {

	/**
	 * Create a PageCgiBase
	 * @author jerishi
	 * @DateTime 2018-05-30
	 */
	constructor() {
		super(...arguments);
	}

	/**
	 * Handle route of page
	 * @author jerishi
	 * @DateTime 2018-05-30
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