const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const { v4:uuidv4 } = require('uuid');
const config = require('../../project.config');
const { loadExcel,getFirstSheet } = require('../../helpers/excel');
const excel = require('../../helpers/excel');

const Article = mongoose.model('Article');

const router = new Router({
    prefix: '/article',
});

router.post('/add',async (ctx) => {
    const {
        ArticleTitle,
        ArticleClassification,
        Distributor,
        DistributionContent,
        creationTime,
    } = getBody(ctx);

    const article = new Article({
        ArticleTitle,
        ArticleClassification,
        Distributor,
        DistributionContent,
        creationTime,
    });

    const res = await article.save();

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
        query.name = keyword;
    }

    const list = await Article
    .find(query)
    .skip((page - 1) * size )
    .limit(size)
    .exec();

    const total = await Article.countDocuments();


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

    const delMsg =  await Article.deleteOne({
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

    const one = await Article.findOne({
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

// 批量上传
router.post('/addMany',async(ctx)=> {
    const {
        key = '',
    } = ctx.request.body;


    const path = `${config.UPLOAD_DIR}/${key}`;

    const excel = loadExcel(path);

    const sheet = getFirstSheet(excel);
    console.log(sheet)
    const arr = [];
    for(let i = 0;i<sheet.length;i++){
        let record = sheet[i];

        const [
            ArticleTitle,
            ArticleClassification,
            Distributor,
            DistributionContent,
            creationTime,
        ] = record;

        arr.push({
            ArticleTitle,
            ArticleClassification,
            Distributor,
            DistributionContent,
            creationTime,
        });
    }
    await Article.insertMany(arr);

    ctx.body = {
        code:1,
        msg:'添加成功',
        data:{
            addCount:arr.length,
        }
    }
    
    
});

module.exports = router;