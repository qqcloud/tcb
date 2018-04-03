const PageCgiBase = require('../../pagecgibase');

class HomePage extends PageCgiBase{
	onIndex: function(){
		await this.ctx.render('index', {
		    title: 'Hello Koa 2!'
		 });
	},
}
