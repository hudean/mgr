const Koa = require('koa');
const koaBody = require('koa-body');
const Body = require('koa-body');
const { connect } = require('./db');
const registerRoutes = require('./routers');
const { middleware:koaJwtMiddleware,catchTokenError } = require('./helpers/token');
const { logMiddleware } = require('./helpers/log')
const cors = require('@koa/cors');

const app = new Koa();

// var koaStaticCache=require('koa-static-cache');
// app.use(koaStaticCache(__dirname+'/static')) 
const staticResource = require('koa-static');
const path = require('path')

connect().then(() => {
    app.use(cors());

    app.use(koaBody({
        multipart:true,
        formidable:{
            maxFieldsSize:200 * 1024 * 1024
        },
    }));
    app.use(catchTokenError);
    
    
    //配置静态资源中间件
app.use(staticResource(path.join(__dirname,'public')))

    // koaJwtMiddleware(app);
    
    // app.use(logMiddleware);

    registerRoutes(app);

    app.listen(3000, () => {
        console.log('启动成功');
    });
});





