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
        ArticleImg,
        DistributionContent,
        creationTime,
    } = getBody(ctx);

    if(ArticleImg._value===''){
        const article = new Article({
            ArticleTitle,
            ArticleClassification,
            Distributor,
            ArticleImg:`http://localhost:3000/f930ffb0-99d5-4542-998e-71a1f9da0209.jpg` ,
            DistributionContent,
            creationTime,
        });
        const res = await article.save();
        ctx.body = {
            data:res,
            code:1,
            msg:'添加成功'
        }
    }else{
        const article = new Article({
            ArticleTitle,
            ArticleClassification,
            Distributor,
            ArticleImg:`http://localhost:3000/` +ArticleImg ,
            DistributionContent,
            creationTime,
        });
        const res = await article.save();
        ctx.body = {
            data:res,
            code:1,
            msg:'添加成功'
        }
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
        query.ArticleTitle = keyword;
    }

    const list = await Article
    .find(query)
    .sort({
        _id:-1,
    })
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

    

        // const {
        //     id,
        //     ArticleTitle,
        //     ArticleClassification,
        //     Distributor,
        //     ArticleImg,
        //     DistributionContent,
        //     creationTime,
        // } = ctx.request.body;

    const one = await Article.findOne({
        _id:id, 
    }).exec();

    // 没有找到医生的信息
    if(!one){
        ctx.body = {
            msg:'没有找到相关的信息',
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
            ArticleImg,
            DistributionContent,
            creationTime,
        ] = record;

        arr.push({
            ArticleTitle,
            ArticleClassification,
            Distributor,
            ArticleImg,
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