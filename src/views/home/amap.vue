<template>
  <div class="echarts">
    <div :style="{height:'812px',width:'100%'}" ref="myEchart"></div>
  </div>
</template>
<script>
  import echarts from "echarts";
  import * as api from "@/api/api"
  var pinyin = require('js-pinyin') ;
  require('echarts/map/js/china');
  export default {
    name: "echarts",
    props: ["userJson"],
    data() {
      return {
        chart: null,
        option:({ // 进行相关配置
          backgroundColor: "#1a5787",
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          // dataRange: {
          //   show: false,
          //   min: 0,
          //   max: 1000,
          //   text: ['High', 'Low'],
          //   realtime: true,
          //   calculable: true,
          //   color: ['orangered', 'yellow', 'lightskyblue']
          // },
          dataRange: {
            show : true,
            x: 'left',
            y: 'center',
            splitList: [
              {start: 10000, end:99999},{start: 1000, end: 9999},
              {start: 100, end: 999},{start: 10, end: 99},
              {start: 1, end: 9},{start: 0, end: 0},
            ],
            color: ['#5475f5', '#e6ac53', '#85daef','#74e2ca', '#9feaa5', '#9fb5ea'],
            textStyle:{
              color: '#fff'
            }
          },
          geo: { // 这个是重点配置区
            map: "china", // 表示中国地图
            roam: true,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,1)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: '#029fd4',
                areaColor: '#1a5787' //默认的地图板块颜色
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
            type: 'scatter',
            coordinateSystem: 'geo' // 对应上方配置
          },
            {
              name: '查看详情', // 浮动框的标题
              type: 'map',
              geoIndex: 0,
              // data: [{
              //   value:50,
              //   name: '北京',
              // }, {value:10,
              //   name: '浙江'
              // }, {
              //   value:50,
              //   name: '天津',
              // }, {value:10,
              //   name: '安徽'
              // }, {value:10,
              //   name: '上海'
              // }, {value:10,
              //   name: '福建'
              // }, {value:10,
              //   name: '江西'
              // }, {value:10,
              //   name: '山东'
              // }, {value:1,
              //   name: '河南'
              // }, {value:20,
              //   name: '湖北'
              // }, {value:20,
              //   name: '湖南'
              // }, {value:20,
              //   name: '广东'
              // }, {value:20,
              //   name: '海南'
              // }, {value:50,
              //   name: '山西',
              // }, {value:10,
              //   name: '江苏'
              // }, {
              //   value:30,
              //   name: '辽宁',
              // }, {
              //   value:30,
              //   name: '吉林',
              // }, {value:40,
              //   name: '台湾'
              // }, {
              //   value:50,
              //   name: '河北',
              // },   {
              //   value:30,
              //   name: '黑龙江',
              // }, {value:20,
              //   name: '香港'
              // }, {value:20,
              //   name: '澳门'
              // }, {value:20,
              //   name: '广西'
              // }, {
              //   value:50,
              //   name: '内蒙古',
              // }, {value:40,
              //   name: '宁夏'
              // }, {value:40,
              //   name: '新疆'
              // },{value:40,
              //   name: '青海'
              // },{value:40,
              //   name: '甘肃'
              // },{value:40,
              //   name: '陕西'
              // },{value:60,
              //   name: '西藏',
              // },{value:60,
              //   name: '贵州',
              // }, {value:60,
              //   name: '四川',
              // }, {value:60,
              //   name: '云南',
              // },{value:60,
              //   name: '重庆',
              // },  ]
            },
          ]
        })
      };
    },
    mounted() {
      // this.myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
      // this.myChart.setOption(this.option);
      api.yqInfo().then(res =>{
        this.option.series[1].data = res;
        console.log(this.option.series[1].data)
        this.option.series[1].data .forEach(item =>{
          item.value = item.totle;
        })
        this.chinaConfigure();
      })

    },
    beforeDestroy() {
      if (!this.chart) {
        return;
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      chinaConfigure() {
        // console.log(this.userJson)
        // let myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
        var _this = this;
        _this.myChart = echarts.init(this.$refs.myEchart); //这里是为了获得容器所在位置
        _this.myChart.setOption(this.option);
        window.onresize = _this.resize;
        if(_this.myChart._$handlers.click){
          _this.myChart._$handlers.click.length = 0;
        }
        this.myChart.on('click', function (params) {
          if (_this.option.geo.map === 'china') {
            _this.option.geo.map = params.data.name;
            let currentMap = require(`echarts/map/js/province/` + pinyin.getFullChars(params.name).toLowerCase())
            _this.chinaConfigure();
          }
        });
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  .echarts{
    height: calc(100vh - 198px);
  }
</style>
