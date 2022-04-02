const auth = require('./auth/index');
const inviteCode = require('./invite-code');
const doctor = require('./doctor');
const upload = require('./upload');
const article = require('./article');
const feedback = require('./feedback');
const consult = require('./consult');
const medicine = require('./medicine');
const inventoryLog = require('./inventory-log');
const user = require('./user/index');
const character = require('./character');
const log = require('./log');
const forgetPassword = require('./forget-password');
const articleClassify = require('./article-classify');
const profile = require('./profile');
const dashboard = require('./dashboard');



module.exports = (app) =>{
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(doctor.routes());
    app.use(upload.routes());
    app.use(article.routes());
    app.use(feedback.routes());
    app.use(consult.routes());
    app.use(medicine.routes());
    app.use(inventoryLog.routes());
    app.use(user.routes());
    app.use(character.routes());
    app.use(log.routes());
    app.use(forgetPassword.routes());
    app.use(articleClassify.routes());
    app.use(profile.routes());
    app.use(dashboard.routes());
};