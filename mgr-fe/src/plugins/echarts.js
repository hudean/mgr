
// const chinaData = function(data){
//     $.ajax({
//       url:'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
//       type:'GET',
//       dataType:'JSONP',
//       success:function(res){
//         let obj = JSON.parse(res.data)
//         // 获取数据后，获取需要的字段，转成需要的格式
//         let arr = obj.areaTree[0].children;
//         let mapArr=[]
//         for(let i=0;i<arr.length;i++){
//           let item={
//             name:arr[i].name,
//             // value:arr[i].total.confirm,
//             value:arr[i].total.nowConfirm
//           }
//           mapArr.push(item);
//           return mapArr;
//         }
//          // for结束后，数据给地图显示
//         // this.getMap(mapArr);
       
//       }
//     }) 

// }

// export default chinaData    


//  //开发成vue插件使用echarts

//  const install = function(Vue,options){
//      //添加实例方法
//     //  Vue.prototype.demo=function(){}
//     Object.defineProperties(Vue.prototype,{
//         $myChart:{
//             get(){
//                 return{
//                     demo(){

//                     },
//                     fun(){

//                     }
//                 }
//             }
//         }
//     })
//  }

//  export default install
