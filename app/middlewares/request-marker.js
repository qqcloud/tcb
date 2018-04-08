/**
 * mark request
 */
const uuid = require('uuid');
const importantUrlLog = require('../config/importanturllog');

module.exports = (ctx, next) => {

	const { request } = ctx;
	// 36位字符串-'f64f2940-fae4-11e7-8c5f-ef356f279131'
	request.reqSeqId = request.query.reqSeqId || uuid.v1(); 

	const importantUrl = importantUrlLog.url;
	const marker = importantUrlLog.marker;
	const seqId = request.reqSeqId; 
	const reqUrl = request.url;
	let isImportant;

	for(var url in importantUrl){
		isImportant = importantUrl[url];
		if(isImportant && reqUrl.indexOf(url) != -1) {
			request.seqId = seqId ? seqId + marker : '';
			break;
		}
	}
	
	next();
};