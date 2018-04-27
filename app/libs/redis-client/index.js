const Client = require('./client');
const { redisConfig } = require('../../config');

module.exports = {
	get client() {
		if (!this._client) {
			this._client = new Client({ redisConfig });
		}

		return this._client;
	},

	get(key) {
		return this.client.get(key);
	},

	set(key, value, ttl) {
		return this.client.set(key, value, ttl);
	},

	del(key) {
		return this.client.del(key);
	},
};