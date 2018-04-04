module.exports = router => {
	
	router.get('/:action', require('./page/index'));
};