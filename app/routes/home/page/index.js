const PageCgiBase = require('../../pagecgibase');
/**
 * Class HomePage
 * @extends PageCgiBase
 */
class HomePage extends PageCgiBase {

	/**
	 * Page cgi: home/index
	 * @author jerishi
	 * @DateTime 2018-05-30
	 */
	async onIndex() {
		const {ctx} = this;
		
		await ctx.render('home/index', {
			title: 29489284
		});
	}

	/**
	 * Page cgi: home/test
	 * @author jerishi
	 * @DateTime 2018-05-30
	 */
	async onTest() {
		const {ctx} = this;
		ctx.body = 'test';
	}
}

module.exports = HomePage.makeRouteHandler();