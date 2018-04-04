const CgiBase = require('./cgibase');

class PageCgiBase extends CgiBase {
	constructor() {
		super(...arguments);
	}

	/**
	 * 子类实现该方法处理请求
	 */
	async handle() {
		const {ctx, next} = this;
		let {action} = ctx.params;
		action = action || 'index';
		action = action.replace(/^./, action[0].toUpperCase());
		const actionHandler = `on${action}`;
		if(typeof this[actionHandler] === 'function'){

		} else {
			ctx.body = 'error';
		}

		await this[actionHandler]();
	}
}

module.exports = PageCgiBase;