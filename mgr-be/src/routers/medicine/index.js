const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const { v4:uuidv4 } = require('uuid');
const config = require('../../project.config');
const { loadExcel,getFirstSheet } = require('../../helpers/excel');
const excel = require('../../helpers/excel');

const MEDICINE_CONST = {
    IN:'IN_COUNT',
    OUT:'OUT_COUNT',
};

const Medicine = mongoose.model('Medicine');
const InventoryLog = mongoose.model('InventoryLog');

const findMedicineOne = async (id) => {
    const one = await Medicine.findOne({
        _id:id,
    }).exec();

    return one;
};

const router = new Router({
    prefix: '/medicine',
});

router.post('/add',async (ctx) => {
    const {
        price,
        drugName,
        pharmacy,
        count,
        manufacturer,
        specification,
        element,
        indications,
        creationTime,
    } = getBody(ctx);

    const medicine = new Medicine({
        price,
        drugName,
        pharmacy,
        count,
        manufacturer,
        specification,
        element,
        indications,
        creationTime,
    });

    const res = await medicine.save();

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

    const list = await Medicine
    .find(query)
    .skip((page - 1) * size )
    .limit(size)
    .exec();

    const total = await Medicine.countDocuments();


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

    const delMsg =  await Medicine.deleteOne({
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

    const one = await Medicine.findOne({
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
    const arr = [];
    for(let i = 0;i<sheet.length;i++){
        let record = sheet[i];

        const [
            price,
            drugName,
            pharmacy,
            count,
            manufacturer,
            specification,
            element,
            indications,
            creationTime,
        ] = record;

        arr.push({
            price,
            drugName,
            pharmacy,
            count,
            manufacturer,
            specification,
            element,
            indications,
            creationTime,
        });
    }
    await Medicine.insertMany(arr);

    ctx.body = {
        code:1,
        msg:'添加成功',
        data:{
            addCount:arr.length,
        }
    }
});

router.post('/update/count',async (ctx) => {
    const {
        id,
        type
    } = ctx.request.body;

    let {
        num,
    } = ctx.request.body;

    num = Number(num);

    const medicine = await Medicine.findOne({
        _id:id,
    }).exec();

    if(!medicine){
        ctx.body = {
            code:0,
            msg:'没有找到药品信息',
        };
        return;
    }
    // 找到了药品信息
    if(type === MEDICINE_CONST.IN){
        // 入库操作
        num = Math.abs(num);
    }else{
        // 出库操作
        num = -Math.abs(num);
    }
    medicine.count = medicine.count + num;

    if(medicine.count < 0){
        ctx.body = {
            code:0,
            msg:'剩下的量不足以出库',
        };
        return;
    }
    const res = await medicine.save();

    const log = new InventoryLog({
        num:Math.abs(num),
        type,
    });

    log.save();


    ctx.body = {
        data:res,
        code:1,
        msg:'操作成功',
    }

});

//药物详细信息，查询接口
router.get('/detail/:id',async (ctx) => {
    const {
        id,
    } = ctx.params;

    const one = await findMedicineOne(id);

    // 没有找到医生的信息
    if(!one){
        ctx.body = {
            msg:'没有找到医生的信息',
            code:0,
        }
        return;
    }

    ctx.body = {
        msg:'查询成功',
        data:one,
        code:1,
    }
});

module.exports = router;