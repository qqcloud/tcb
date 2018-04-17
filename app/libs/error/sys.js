/**
 * 错误码配置文件s
 * 配置说明: `错误类型(String): [错误码(Number), 错误描述(String)]`
 */

module.exports = {
	'400': [400, 'Bad Request'],
	'401': [401, 'Unauthorized'],
	'403': [403, 'Forbidden'],
	'404': [404, 'Not Found'],

	'500': [500, 'Internal Server Error'],
	'501': [501, 'Not Implemented'],
	'503': [503, 'Service Unavailable'],
	'504': [504, 'Gateway Timeout'],

	// 默认错误类型，主要用于重写错误描述（错误码）
	'ERROR_DEFAULT': [-1, 'Default Error'],

	'CONNECT_ERROR': [1, '连接服务器异常，请稍后再试'],
	'CONNECT_TIMEOUT': [2, '连接服务器超时，请稍后再试'],
	'SERVER_RESPONSE_ERROR': [3, '服务器响应错误，请稍后再试'],
	'SERVER_RESPONSE_TIMEOUT': [4, '服务器响应超时，请稍后再试'],
};