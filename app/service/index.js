const services = {
	mock: require('./mock'),
};

/**
 * service config module
 * @module app/service
 */

/**
 * Get service instances
 * @author jerishi
 * @DateTime 2018-05-30
 * @param    {Object}   ctx  app ctx
 */
module.exports = ctx => {
	const serviceInstances = {};

	_.map(services, (service, name) => {
		
		serviceInstances[`$${name}Service`] = new service(ctx);
	});

	return serviceInstances;
};