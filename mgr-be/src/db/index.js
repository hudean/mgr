require('./Schemas/Feedback');
require('./Schemas/Article');
require('./Schemas/InviteCode');
require('./Schemas/Doctor');
require('./Schemas/Consult');
require('./Schemas/Medicine');
require('./Schemas/InventoryLog');
require('./Schemas/User');
require('./Schemas/Character');
require('./Schemas/Log');
require('./Schemas/LogResponse');
require('./Schemas/ForgetPassword');
require('./Schemas/ArticleClassify');


const mongoose = require('mongoose');
// 1、给哪个数据库
// 2、哪个集合
// 3、添加什么操作

// Schema
// Modal 可以理解成是根据Schema生成的一套方法，这套方法用来操作MongoDB下的集合和集合下的文档

const connect = () => {
    return new Promise((resolve) => {
        mongoose.connect('mongodb://127.0.0.1:27017/medicalDatabase');

        mongoose.connection.on('open', () => {
            console.log('连接数据库成功');

            resolve();
        });
    })

};

module.exports = {
    connect,
}