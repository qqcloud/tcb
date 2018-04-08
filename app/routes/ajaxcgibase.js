const CgiBase = require('./cgibase');

class AjaxCgiBase extends CgiBase {
	constructor() {
		super(...arguments);
	}

	/**
	 * handle route of page
	 */
	async handle() {
		const {ctx,next} = this;

		let action = ctx.params.action || 'index';
		action = action.replace(/^./, action[0].toUpperCase());
		const actionHandler = `on${action}`;

		if (typeof this[actionHandler] === 'function') {
			try {
				await this[actionHandler]();
			} catch (e) {
				await ctx.body('50x');
			}
		} else {
			await ctx.body('404');
		}
	}
}

module.exports = AjaxCgiBase;