const services = {
	mock: require('./mock'),
};

module.exports = ctx => {
	const serviceInstances = {};

	_.map(services, (service, name) => {
		
		serviceInstances[`$${name}Service`] = new service(ctx);
	});

	return serviceInstances;
};