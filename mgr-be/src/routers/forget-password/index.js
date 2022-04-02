const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const { v4:uuidv4 } = require('uuid');
const config = require('../../project.config');

const ForgetPassword = mongoose.model('ForgetPassword');
const User = mongoose.model('User');

const router = new Router({
    prefix: '/forget-password',
});

router.get('/list',async (ctx) => {
    let {
        page,
        size,
    } = ctx.request.query;

    // let = {
    //     size = 10, 
    // } = ctx.query;
    
    page = Number(page);
    size = Number(size);

    const list = await ForgetPassword
        .find({
            status:1,
        })
        .skip((page - 1) * size)
        .limit(size)
        .exec();

    const total = await ForgetPassword
        .find({
            status:1,
        })
        .countDocuments().exec();

        ctx.body = {
            data:{
                list,
                page,
                size,
                total,
            },
            code:1,
            msg:'获取列表成功',
        };
});

router.post('/add',async (ctx) => {
    const {
        account,
    } = ctx.request.body;

    // 账户得存在
    const user = await User.findOne({
        account,
    }).exec();
    // 伪提醒，避免盲猜真正的用户
    if(!user){
        ctx.body = {
            code:1,
            msg:'申请成功啦',
        };
        return;
    }
    // 在forget-password集合中不存在status为1的文档
    
    const one = await ForgetPassword.findOne({
        account,
        status:1,//1表示待处理
    }).exec();

    // 如果存在，说明已经申请过了
    if(one){
        ctx.body = {
            code:1,
            msg:'申请成功啦',
        };
        return;
    }
    // 如果不存在，则new新增一条数据，并且状态为1待处理
    const forgetPwd = new ForgetPassword({
        account,
        status:1,
    });
    await forgetPwd.save()

    ctx.body = {
        code:1,
        msg:'申请成功啦',
    };

});

router.post('/update/status',async (ctx) => {
    const {
        id,
        status,
    } = ctx.request.body;

    const one = await ForgetPassword.findOne({
        _id:id,
    });
    if(!one){
        ctx.body = {
            msg:'找不到这条申请',
            code:0,
        };
        return;
    }
    // 如果找到了，把状态该了并且同步到数据库
    one.status = status;
    if(status === 2){
        const user = await User.findOne({
            account:one.account,
        }).exec();

        if(user){
            user.password = config.DEFAULT_PASSWORD;

            await user.save();
        }
    }
    
    await one.save();
    ctx.body = {
        code:1,
        msg:'处理成功',
    }
});





module.exports = router;