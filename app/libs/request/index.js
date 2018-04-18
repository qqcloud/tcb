const service = require('../../config').service;
const Provider = require('./provider');

module.exports = ctx => {

	const requestInstances = {};
	_.map(service, (item, name) => {
		requestInstances[`$${name}`] = new Provider(ctx, item);
	})

	return requestInstances;
};