module.exports = router => {
	
	router.get('/:action', require('./page/index'));
	router.get('/', require('./page/index'));
};