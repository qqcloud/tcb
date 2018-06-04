const CgiBase = require('./cgibase');
const utilLib = require('../libs/utillib');
/**
 * Class AjaxCgiBase
 * @extends CgiBase
 */
class AjaxCgiBase extends CgiBase {

	/**
	 * Create a AjaxCgiBase
	 * @author jerishi
	 * @DateTime 2018-05-30
	 */
	constructor() {
		super(...arguments);
		const { ctx } = this;
		this.injectServices(ctx);
	}

	/**
	 * Handle route of ajax
	 * @author jerishi
	 * @DateTime 2018-05-30
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
	/**
	 * Send data for request
	 * @author jerishi
	 * @DateTime 2018-05-30
	 * @param    {Object}   data response info
	 */
	send(data){
		const { ctx } = this;
		utilLib.resJson(data, ctx);
	}
}

module.exports = AjaxCgiBase;