/**
 * system defacult config
 */

module.exports = {
	'config': {
		'path': '../../config',
		'opts': {
			importantUrl: require('./importanturl'),
			error: require('./error'),
			service: require('./service'),
			validator: require('./validator'),
		},
	},
};