/*
    -1 无任何权限
    0 管理员权限
    1 增加权限
    2 删除权限
    3 查找权限
    4 修改权限

*/ 
const defaultCharacters = [
    {
        title:'管理员',
        name:'admin',
        power:{
            doctor:[0],
            article:[0],
            consult:[0],
            medicine:[0],
            user:[0],
        },  
    },
    {
        title:'成员',
        name:'member',
        power:{
            doctor:[3],
            article:[3],
            consult:[4],
            medicine:[3],
            user:[0],
        },  
    },
];

module.exports = {
    defaultCharacters
};