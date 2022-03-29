const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const { v4:uuidv4 } = require('uuid');
const config = require('../../project.config');
const { loadExcel,getFirstSheet } = require('../../helpers/excel');
const excel = require('../../helpers/excel');

const Feedback = mongoose.model('Feedback');

const router = new Router({
    prefix: '/feedback',
});

router.post('/add',async (ctx) => {
    const {
        FeedbackContent,
        FeedbackUsers,
        creationTime,
    } = getBody(ctx);

    const feedback = new Feedback({
        FeedbackContent,
        FeedbackUsers,
        creationTime,
    });

    const res = await feedback.save();

    ctx.body = {
        data:res,
        code:1,
        msg:'添加成功'
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
        query.FeedbackUsers = keyword;
    }

    const list = await Feedback
    .find(query)
    .sort({
        _id:-1,
    })
    .skip((page - 1) * size )
    .limit(size)
    .exec();

    const total = await Feedback.countDocuments();


    ctx.body = {
        data:{
            total,
            list,
            page,
            size,
        },
        code:1,
        msg:'获取列表成'
    }
});

router.delete('/:id',async(ctx)=>{
    const { 
        id,
     } = ctx.params;

    const delMsg =  await Feedback.deleteOne({
         _id:id,
     });

     ctx.body = {
         data:delMsg,
         msg:'删除成功',
         code:1,
     };
});

// 编辑的接口
router.post('/update',async (ctx) => {
    const {
        id,
        ...others
    } = ctx.request.body;

    const one = await Feedback.findOne({
        _id:id, 
    }).exec();

    // 没有找到医生的信息
    if(!one){
        ctx.body = {
            msg:'没有找到医生的信息',
            code:0,
        }
        return;
    }

    const newQuery = {};

    Object.entries(others).forEach(([key,value])=>{
        if(value){
            newQuery[key] = value;
        }
    });

    // 合并一个数组
    Object.assign(one,newQuery);

    const res = await one.save();

    ctx.body = {
        data:res,
        code:1,
        msg:'保存成功'
    }
});


module.exports = router;