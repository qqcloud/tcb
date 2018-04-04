

module.exports = function(ctx, next) {
	const {request, response} = ctx;

	let action = request.action || 'Index';
	action = action.replace(/^./, action[0].toUpperCase());
	const actionHandler = `on${action}`;
	
	if(typeof this[actionHandler] === 'function'){

	} else {
		return;
	}

	this[actionHandler](ctx, next);
};