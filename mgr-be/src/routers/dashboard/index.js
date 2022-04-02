const Router = require('@koa/router');
const mongoose = require('mongoose');
const { getBody } = require('../../helpers/utils');
const jwt = require('jsonwebtoken');
const config = require('../../project.config');

const User = mongoose.model('User');
const Article = mongoose.model('Article');
const Doctor = mongoose.model('Doctor');

const router = new Router({
    prefix: '/dashboard',
});

router.get('/base-info',async(ctx) => {
    const userTotal = await User.countDocuments();
    const articleTotal = await Article.countDocuments();
    const doctorTotal = await Doctor.countDocuments();

    ctx.body = {
        code:1,
        msg:'获取成功',
        data:{
            total:{
                user:userTotal,
                article:articleTotal,
                doctor:doctorTotal,
            },
        },
    };
});





module.exports = router;