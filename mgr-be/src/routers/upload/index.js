const Router = require('@koa/router');
const mongoose = require('mongoose');
const { v4:uuidv4 } = require('uuid');
const { getBody } = require('../../helpers/utils');
const { saveFileToDisk,getUploadFileExt } = require('../../helpers/upload');
const config = require('../../project.config');
const path = require('path');

const jwt = require('jsonwebtoken');
const { UPLOAD_DIR } = require('../../project.config');
const InviteCode = mongoose.model('InviteCode');

const router = new Router({
    prefix:'/upload',
})

router.post('/file',async (ctx) =>{
  const ext =  getUploadFileExt(ctx);
  const filename = `${uuidv4()}.${ext}`;
  await saveFileToDisk(
    ctx,path.resolve(config.UPLOAD_DIR,filename
  ));
  
  ctx.body = {
     data:filename,
     msg:'',
     code:1
  };
});

module.exports = router;