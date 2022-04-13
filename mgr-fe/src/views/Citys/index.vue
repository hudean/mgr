<template>
    <div>
        <h2>{{cityname}}---城市界面</h2>
         <div id="main" style="width:600px;height:600px;" ></div>
    </div>
</template>
<script>

import country from '../../assets/map.js';
import echarts from "echarts";
import $ from "jquery";
import axios from "axios";
export default {
     props:['cityname'],
     mounted() {
         this.cityMap(this.cityname,[]);
         this.getData(this.cityname);
     },
    methods:{
    cityMap(cityname,data){
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        tooltip: {//悬浮弹框
          triggerOn: "click", //提示框触发的条件
          enterable: true, //鼠标是否可进入提示框浮层中，默认为false
          formatter(item) {
            // return '<a href="#/citys/'+item.name+'" style="color:#fff">省份'+ item.name+'--详情</a>' ;
            return item.name
          },
        },
        visualMap: [
          {
            //映射高亮颜色
            orient: "horizontal", //水平的
            type: "piecewise", //离散
            bottom: 0,
            textGap: 4,
            itemGap: 4,
            itemWidth: 10,
            itemHeight: 10,
            padding: 2,
            textStyle: {
              fontSize: 9,
            },
            pieces: [// 配置颜色区间             
              {
                min: 0,
                max: 0,
                color: "#FFFFFF",
              },
              {
                min: 1,
                max: 9,
                color: "#FAEBD2",
              },
              {
                min: 10,
                max: 99,
                color: "#E9A188",
              },
              {
                min: 100,
                max: 499,
                color: "#D56355",
              },
              {
                min: 500,
                max: 999,
                color: "#BB3937",
              },
              {
                min: 1000,
                max: 10000,
                color: "#772526",
              },
              {
                min: 10000,
                color: "#480F10",
              },
            ],
          },
        ],
        series: [
          {
            name: "市",
            type: "map", //地图  bar  line  map
            map: cityname, //中国地图 需要引入地图china.js
            roam: false,
            zoom: 1.2,
            aspectScale: 0.75,
            top: 40,
            layoutCenter: ["5%", "5%"],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 8,
                },
              },
            },
            itemStyle: {
              normal: {
                areaColor: "rgba(0,255,236,0)",
                borderColor: "rgba(0,0,0,0.2)",
              },
              emphasis: {
                // 选中的区域颜色及阴影效果等
                areaColor: "rgba(255,180,0,0.8)",
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
              },
            },
            data,
          },
        ],
      };
      myChart.setOption(option);
    }, 
    getData(data) {
      var self = this;
      console.log(data);
      $.ajax({
        url: "https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5",
        type: "GET",
        dataType: "JSONP",
        // async: false,
        success: function (res) {
          let obj = JSON.parse(res.data);
          let arr = obj.areaTree[0].children; // 获取数据后，获取需要的字段，转成需要的格式
          let targetCity = [];//点击地图时的目标城市
          arr.forEach(item => {
            if(data==item.name){
              targetCity.push(item)
            }
          });
          let cityList = targetCity[0].children;//取出目标城市的列表
          let newArr=[];
          cityList.forEach(i=>{
            let obj={}
            obj.name=i.name + '市';
            obj.value=i.total.nowConfirm;
            // obj.value=i.total.confirm;
            newArr.push(obj);
          })
          // 处理市、区，数据与地图对应不上的问题名字问题
          console.log(newArr);

          self.cityMap(data,newArr);
          
        },
      });
    }, 
    } 
}
</script>