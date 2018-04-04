const CgiBase = require('./cgibase');

class PageCgiBase extends CgiBase {
	constructor() {
		super(...arguments);
	}

	/**
	 * 子类实现该方法处理请求
	 */
	handle() {
		const {ctx, next} = this;
		const {request, response} = ctx;
		let action = request.action || 'Index';
		action = action.replace(/^./, action[0].toUpperCase());
		const actionHandler = `on${action}`;
		if(typeof this[actionHandler] === 'function'){

		} else {
			return;
		}

		this[actionHandler]();
	}
}

module.exports = PageCgiBase;