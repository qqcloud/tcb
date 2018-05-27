const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const path = require('path');
require('./globals');

const mockService = require('./mock/mock-service');


mockService.init();

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}));

app.use(json());

app.use(require('koa-static')(SERVER_ROOT_PATH + '/public'))

app.use(views(path.join(SERVER_ROOT_PATH, 'app/views'), { extension: 'ejs' }));

app.use(require('./app/middlewares/request-marker'));

app.use(require('./app/middlewares/request-logger'));

// route dispatcher
app.use(require('./app/middlewares/common-route-dispatcher').routes());

app.use(require('./app/middlewares/unused-route-handler'));

// error-handling
app.on('error', require('./app/middlewares/internal-error-handler'));

module.exports = app;
