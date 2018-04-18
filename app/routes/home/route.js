module.exports = router => {
	router.get('/ajax/:action', require('./ajax/index'));
	router.get('/:action', require('./page/index'));
	router.get('/', require('./page/index'));
};