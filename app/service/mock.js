const ServiceBase = require('./servicebase');

class MockService extends ServiceBase {

	async getSomeThing() {
		const { ctx } = this;
		const reqPromise = this.$mock.fetch(this.$mockInterface.getSomeThing, {name:'jack'});

		return reqPromise;
	}

	async getSomeThing1() {
		let result;
		try {

			result = await this.$mock.post(this.$mockInterface.getSomeThing, {}, {
				suburl: this.$mockInterface.getSomeThing,
			});
		} catch (err) {
			result = err;
		}
		return Promise.resolve(result);
	}
}

module.exports = MockService;