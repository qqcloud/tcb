/**
 * Request Marker
 */
const uuid = require('uuid');
const config = require('../../config');
const { important } = config.log;

module.exports = async (ctx, next) => {

	const { request } = ctx;
	// 36位字符串-'f64f2940-fae4-11e7-8c5f-ef356f279131'
	request.$reqSeqId = request.query.reqSeqId || uuid.v1();
	const originalUrl = request.originalUrl;

	// 标记 jsonp ajax render
	let cgiType;
	if(/\/ajax\//g.test(originalUrl)) {
		cgiType = 'ajax';
	} else {
		cgiType = 'page';
	}
	request.$cgiType = cgiType;

	// mark important log
	if(important && important.on) {
		const { marker } = important;
		const importantUrl = require('../config/importanturl');
		
		const isImportant = _.some(importantUrl, function(isOn, url){
			return isOn && originalUrl.indexOf(url) !== -1;
		});

		if(isImportant) {
			// 37位字符串-'f64f2940-fae4-11e7-8c5f-ef356f279131*'
			request.$reqSeqId = request.$reqSeqId + marker;
		}
	}
	
	await next();
};