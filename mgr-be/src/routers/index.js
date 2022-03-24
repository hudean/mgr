const auth = require('./auth/index');
const inviteCode = require('./invite-code');
const doctor = require('./doctor');
const upload = require('./upload');
const article = require('./article');
const feedback = require('./feedback');
const consult = require('./consult');
const medicine = require('./medicine');

module.exports = (app) =>{
    app.use(auth.routes());
    app.use(inviteCode.routes());
    app.use(doctor.routes());
    app.use(upload.routes());
    app.use(article.routes());
    app.use(feedback.routes());
    app.use(consult.routes());
    app.use(medicine.routes());
};