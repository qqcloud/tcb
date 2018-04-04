const CgiBase = require('./cgibase');

class PageCgiBase extends CgiBase {
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
				await ctx.render('50x');
			}
		} else {
			await ctx.render('404');
		}
	}
}

module.exports = PageCgiBase;