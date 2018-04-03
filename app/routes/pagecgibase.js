module.exports = function(ctx, next) {
	const {req, res} = ctx;
	const action = res.params[0] || 'Index';
	const actionHandler = `on${action}`;
	this[actionHandler](ctx, next);
};