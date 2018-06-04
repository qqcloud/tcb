const AjaxCgiBase = require('../../ajaxcgibase');
/**
 * Class HomeAjax
 * @extends AjaxCgiBase
 */
class HomeAjax extends AjaxCgiBase {

	/**
	 * Ajax cgi: home/getSomeThing
	 * @author jerishi
	 * @DateTime 2018-05-30
	 */
	async onGetSomeThing() {
		const { ctx } = this;
		const { request } = ctx;

		const result = await this.$mockService.getSomeThing();

		this.send(result);
	}
}

module.exports = HomeAjax.makeRouteHandler();