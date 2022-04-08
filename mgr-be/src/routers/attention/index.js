const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const { v4:uuidv4 } = require('uuid');
const config = require('../../project.config');

const Attention = mongoose.model('Attention');

const router = new Router({
    prefix: '/attention',
});

router.post('/add',async (ctx) => {
    const {
        DoctorId,
        WhetherAttention,
    } = getBody(ctx);
    // 新建
    const attention = new Attention({
        DoctorId,
        WhetherAttention
    });
    // 保存在数据库
    const res = await attention.save();
    ctx.body = {
        data:res,
        code:1,
        msg:'关注成功'
    }
});

router.get('/list',async (ctx)=>{
    const {
        page = 1,
        keyword = '',
    } = ctx.query;

    let = {
        size = 10, 
    } = ctx.query;

    size = Number(size);

    const query = {};

    if(keyword){
        query.name = keyword;
    }

    const list = await Attention
    .find(query)
    .sort({
        DoctorId:-1,
    })
    .skip((page - 1) * size )
    .limit(size)
    .exec();

    const total = await Attention.countDocuments();


    ctx.body = {
        data:{
            total,
            list,
            page,
            size,
        },
        code:1,
        msg:'获取关注列表成功'
    }
});

router.delete('/:id',async(ctx)=>{
    const { 
        id,
     } = ctx.params;

    const delMsg =  await Attention.deleteOne({
        DoctorId:id,
     });

     ctx.body = {
         data:delMsg,
         msg:'取消关注成功',
         code:1,
     };
});


module.exports = router;