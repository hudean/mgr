<template>

  <div>
        <!-- 现存确诊 -->
    <div id="nowMain" style="width:750px;height:750px;"></div>
    <!-- 累计确诊 -->
    <div id="main" style="width:750px;height:750px;"></div>
  </div>

</template>


<script>
import echarts from "echarts";
import "echarts/map/js/china";
import api from '../../api/index';
import $ from 'jquery';
import axios from 'axios';

export default {
  mounted() {
    this.getData();
    this.getMap();
    this.getNowMap();
  },
  methods: {
    getMap(data) {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        tooltip: {
          //悬浮弹框
          triggerOn: "click", //提示框触发的条件
          enterable: true, //鼠标是否可进入提示框浮层中，默认为false
          formatter(item) {
            //item=下面serves里面的data里面的每一项 //[{} ] data={} a b c d
            // return (
            //   '<a href="#/citys/' +
            //   item.name +
            //   '" style="color:#fff">省份：' +
            //   item.name +
            //   "--详情</a>"
            // );
            return item.name;
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
            pieces: [
              // 配置颜色区间
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
            name: "省",
            type: "map", //地图  bar  line  map
            map: "china", //中国地图 需要引入地图china.js
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
            // data: [
            //   { name: "内蒙古", value: 200 },
            //   { name: "北京", value: 800 },
            // ],
          },
        ],
      };
      myChart.setOption(option);
    },
    getNowMap(data) {
      var myChart = echarts.init(document.getElementById("nowMain"));
      var option = {
        tooltip: {
          //悬浮弹框
          triggerOn: "click", //提示框触发的条件
          enterable: true, //鼠标是否可进入提示框浮层中，默认为false
          formatter(item) {
            //item=下面serves里面的data里面的每一项 //[{} ] data={} a b c d
            // return (
            //   '<a href="#/citys/' +
            //   item.name +
            //   '" style="color:#fff">省份：' +
            //   item.name +
            //   "--详情</a>"
            // );
            return item.name;
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
            pieces: [
              // 配置颜色区间
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
            name: "省",
            type: "map", //地图  bar  line  map
            map: "china", //中国地图 需要引入地图china.js
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
            // data: [
            //   { name: "内蒙古", value: 200 },
            //   { name: "北京", value: 800 },
            // ],
          },
        ],
      };
      myChart.setOption(option);
    },
    getData(data){
        var self = this
      $.ajax({
        url:'https://view.inews.qq.com/g2/getOnsInfo?name=disease_h5',
        type:'GET',
        dataType:'JSONP',
        // async: false,
        success:function(res){
          let obj = JSON.parse(res.data)
          let arr = obj.areaTree[0].children; // 获取数据后，获取需要的字段，转成需要的格式
          console.log(arr)
          let mapArr=[]//累计确认
          let nowMapArr=[]//现存确认
          for(let i=0;i<arr.length;i++){

            let obj = {}
            obj.name = arr[i].name;
            obj.value = arr[i].total.confirm;
            mapArr.push(obj)
            // let item={
            //   name:arr[i].name,
            //   value:arr[i].total.nowConfirm,
            // }
            // mapArr.push(item)

            let nowObj = {}
            nowObj.name = arr[i].name
            nowObj.value = arr[i].total.nowConfirm,
            nowMapArr.push(nowObj)
          
          }
  
           //累计的地图
          self.getMap(mapArr);
          self.getNowMap(nowMapArr)
        },
   

      })
      
    },
    

  },
};
</script>
<style scoped>
  #main{
    background-color: #f5f5f5;
  }
</style>