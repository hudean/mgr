const Koa = require('koa');
const koaBody = require('koa-body');
const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const cors = require('@koa/cors');

const app = new Koa();

connect().then(() => {
    app.use(cors());
    app.use(koaBody({
        multipart:true,
        formidable:{
            maxFieldsSize:200 * 1024 * 1024
        },
    }));
    registerRoutes(app);

    app.listen(3000, () => {
        console.log('启动成功');
    });
});


