export default [
  {
    title: '首页',
    url: '/dashboard',
    onlyAdmin:true,
  },
  {
    title: '医生管理',
    url: '/doctor',
    onlyAdmin:false,
  },
  {
    title: '文章管理',
    url: '/article',
    onlyAdmin:false,
  },
  {
    title: '在线咨询',
    url: '/consult',
    onlyAdmin:true,
  },
  {
    title: '药物管理',
    url: '/medicine',
    onlyAdmin:false,
  },
  {
    title: '用户管理',
    url: '/user',
    onlyAdmin:true,
  },
  {
    title: '意见反馈',
    url: '/feedback',
    onlyAdmin:false,
  },
  {
    title: '操作日志',
    url: '/log',
    onlyAdmin:true,
  },
  {
    title:'其他操作',
    onlyAdmin:false,
    children:[
      {
        title:'分类管理',
        url:'/article-classify',
        onlyAdmin:true,
      },
      {
        title:'重置密码',
        url:'/reset/password',
        onlyAdmin:true,
      },
      {
        title:'邀请码管理',
        url:'/invite-code',
        onlyAdmin:true,
      },
      
    ]
  },
  {
    title: '个人设置',
    url: '/profile',
    onlyAdmin:false,
  },
  {
    title: '疫情动态',
    url: '/vueecharts',
    onlyAdmin:false,
  },
];
