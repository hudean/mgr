const LOG_MAP =[
    ['/character/list','获取角色列表'],
    ['/log/list','获取日志列表'],
    ['/user/info','获取自己登录信息'],
    ['/doctor/list','获取医生列表'],
    ['/auth/login','用户登录']
];

export const getLogInfoByPath = (path) => {
    let title = '';

    LOG_MAP.forEach((item)=>{
        if(path.includes(item[0])) {
            title = item[1];
            // title = path.replace(item[0],item[1]);
        }
    });
    return title || path;
};