const ServiceBase = require('./servicebase');

class MockService extends ServiceBase {

	async getSomeThing() {
		const { ctx } = this;
		const reqPromise = this.$mock.fetch(this.$mockInterface.getSomeThing, {}, {
			suburl: this.$mockInterface.getSomeThing,
		});

		return this.$respond(reqPromise, {
			'8347': 'ERROR'
		}, {
			useOriMsg: true,
		});
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
		return Promise.resolve(this.$respond(result));
	}
}

module.exports = MockService;