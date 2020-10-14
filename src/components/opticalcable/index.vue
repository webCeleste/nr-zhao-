<template>
  <div class="independent">
    <el-dialog
      class="independent"
      :visible.sync="$store.state.opticalcable"
      width="30%"
      :before-close="closedialogs"
      append-to-body
    >
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/站点光缆/光缆icon.png" alt />
          <div class="headertitle">站点光缆拓扑图</div>
        </div>
        <div class="rightheader">
          <img src="../../assets/img/components-dialog/编辑.png" alt />
          <img src="../../assets/img/components-dialog/感叹号.png" alt />
          <img src="../../assets/img/components-dialog/最小化.png" @click="closedialogs" alt />
          <img src="../../assets/img/components-dialog/刷新.png" alt />
          <img src="../../assets/img/components-dialog/关闭.png" @click="closedialogs" alt />
        </div>
      </div>
      <div class="mainbox">
        <div id="myChart" :style="{width: '865px', height: '630px'}"></div>
        <div class="boxss" ref="boxss">
          <div class="ck" @click="openchange()">查看</div>
          <!-- <div class="ck">查看1</div>
          <div class="ck">查看2</div>-->
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import 四川 from "../../../node_modules/echarts/map/js/province/sichuan";

export default {
  data() {
    return {
      // dialogVisible1: true
      cur: 0,
      heightchage: true,
      tabslist: ["基本信息", "承载业务", "承载通道"],
      tabletopkey: ["对象ID", "TMS编号", "光路长度", "占用率"],
      tabletopkey2: ["方式单号", "光缆段纤芯数", "调度等级", "是否配置光切"],
      tabletop: [
        "1000kV攀枝花独立通信站",
        "四川电网TMSSC-2340982",
        "16km",
        "47.5%"
      ],
      tabletop2: ["TMSSC-2340982", "20kV", "3", "是"]
    };
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    openchange() {
      this.$refs.boxss.style.display = "none";
      console.log(1111);
      this.$store.commit("openLightpath", {
        boolean: true
      });
    },
    drawLine(_this) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // {
      //     "桃乡变",
      //     "绵阳市",
      //     "德阳市",
      //     "攀枝花市",
      //     "遂宁市",
      //     "南充市",
      //     "广元市",
      //     "乐山市",
      //     "宜宾市",
      //     "泸州市",
      //     "达州市",
      //     "广安市",
      //     "巴中市",
      //     "雅安市",
      //     "内江市",
      //     "自贡市",
      //     "资阳市",
      //     "眉山市";
      //     '阿坝藏族羌族自治州',
      //     '甘孜藏族自治州',
      //     '凉山彝族自治州'

      // }
      var chinaGeoCoordMap = {
        桃乡变: [103.92, 30.51],
        尖山变: [104.06, 31.67],
        昌城变: [105.06, 28.30],
        信合变: [102.06, 29.67],
        成都市: [103.58, 30.67],
        // 绵阳市: [104.73 , 31.47,'link说'],
        绵阳市: [104.73, 31.47],
        德阳市: [104.38, 31.13],
        攀枝花市: [101.72, 26.58],
        遂宁市: [105.57, 30.52],
        南充市: [106.08, 30.78],
        广元市: [105.83, 32.43],
        乐山市: [103.77, 29.57],
        宜宾市: [104.62, 28.77],
        泸州市: [105.43, 28.87],
        达州市: [107.5, 31.22],
        广安市: [106.63, 30.47],
        巴中市: [106.77, 31.85],
        雅安市: [103, 29.97],
        // 四川: [103.9526, 30.7617],
        内江市: [105.05, 29.58],
        自贡市: [104.78, 29.35],
        资阳市: [104.65, 30.12],
        眉山市: [103.83, 30.05],
        阿坝藏族羌族自治州: [102.22, 31.9],
        甘孜藏族自治州: [101.22, 30.25],
        凉山彝族自治州: [102.27, 27.9]
        // 福建: [119.4543, 25.9222],
        // 江西: [116.0046, 28.6633],
        // 湖南: [113.0823, 28.2568],
        // 贵州: [106.6992, 26.7682],
        // 云南: [102.9199, 25.4663],
        // 广东: [113.12244, 23.009505],
        // 广西: [108.479, 23.1152],
        // 海南: [110.3893, 19.8516],
        // 上海: [121.4648, 31.2891]
      };

      var chinaGeoCoordMapss = [
        // [104.06, 30.67],
        [104.06, 31.67],
        [105.06, 28.77],
        [102.06, 29.67]
        // [105.57, 30.52],
        // [106.08, 30.78],
        // [105.83, 32.43],
        // [103.77, 29.57],
        // [104.62, 28.77],
        // [105.43, 28.87],
        // [107.5, 31.22],
        // [106.63, 30.47],
        // [106.77, 31.85],
        // [103, 29.97],
        // [103.9526, 30.7617],
        // [105.05, 29.58],
        // [104.78, 29.35],
        // [104.65, 30.12],
        // [103.83, 30.05],
        // [102.22, 31.9],
        // [101.97, 30.05],
        // [102.27, 27.9]
      ];
      var chinaDatas = [
        [
          {
            name: "桃乡变",
            value: 0,
            aa: "光缆01桃乡变"
          }
        ],
        [
          {
            name: "尖山变",
            value: 0,
            aa: "光缆01尖山变-桃乡变"
          }
        ],
        [
          {
            name: "昌城变",
            value: 0,
            aa: "光缆01昌城变-桃乡变"
          }
        ],
        [
          {
            name: "信合变",
            value: 0,
            aa: "光缆01信合变-桃乡变"
          }
        ],
        [
          {
            name: "成都市",
            value: 0
          }
        ],
        [
          {
            name: "绵阳市",
            value: 0,
            aa: "光缆01绵阳-成都"
          }
        ],
        [
          {
            name: "德阳市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "遂宁市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "南充市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "广元市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "乐山市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "宜宾市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "泸州市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "达州市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "广安市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "巴中市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "雅安市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "攀枝花市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "内江市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "自贡市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "资阳市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "眉山市",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "阿坝藏族羌族自治州",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "甘孜藏族自治州",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ],
        [
          {
            name: "凉山彝族自治州",
            value: 0,
            aa: "光缆01德阳市-成都"
          }
        ]
        // [
        //   {
        //     name: "福建",
        //     value: 0
        //   }
        // ],
        // [
        //   {
        //     name: "江西",
        //     value: 0
        //   }
        // ],
        // [
        //   {
        //     name: "湖南",
        //     value: 0
        //   }
        // ],
        // [
        //   {
        //     name: "贵州",
        //     value: 0
        //   }
        // ],
        // [
        //   {
        //     name: "广西",
        //     value: 0
        //   }
        // ],
        // [
        //   {
        //     name: "海南",
        //     value: 0
        //   }
        // ],
        // [
        //   {
        //     name: "上海",
        //     value: 1
        //   }
        // ]
      ];
      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          // var fromCoord = chinaGeoCoordMap[dataItem[0].name]; 1
          var fromCoord;
          var str = [dataItem[0].name][0];
          console.log(str,'str==============')
          if (str.charAt(str.length - 1) == "变") {
            fromCoord = chinaGeoCoordMap[dataItem[0].name];
          } else {
            fromCoord = "";
          }
          // console.log(dataItem, "fromCoord");

          var ee = dataItem;
          var toCoord = [103.92, 30.51];
          // var toCoord = chinaGeoCoordMapss[i];  1
          console.log(toCoord, "toCoord");
          if (fromCoord && toCoord) {
            res.push([
              {
                coord: fromCoord,
                value: dataItem[0].value,
                aa: ee
              },
              {
                coord: toCoord
              }
            ]);
          }
        }
        console.log(res, "res");
        return res;
      };
      var series = [];
      [["", chinaDatas]].forEach(function(item, i) {
        console.log(item[1], "=================");
        series.push(
          {
            type: "lines",
            // zlevel: 2,
            // effect: {
            //   show: true,
            //   period: 8, //箭头指向速度，值越小速度越快
            //   trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
            //   symbol: "arrow", //箭头图标
            //   symbolSize: 5 //图标大小
            // },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: 0, //尾迹线条曲直度
                color: "#f40" //线的颜色
              }
            },
            data: convertData(item[1])
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            // zlevel: 2,
            // rippleEffect: {
            //   //涟漪特效
            //   period: 4, //动画时间，值越小速度越快
            //   brushType: "stroke", //波纹绘制方式 stroke, fill
            //   scale: 3 //波纹圆环最大限制，值越大波纹越大
            // },
            label: {
              normal: {
                show: true,
                position: "center", //显示位置
                offset: [-10, 0], //偏移设置
                formatter: function(params) {
                  //圆环显示文字
                  console.log(params.data.name, "---------------------------");
                  return params.data.name;
                },
                fontSize: 12
              },
              emphasis: {
                show: true
              }
            },
            // symbol: "circle",
            // symbolSize: function(val) {
            //   console.log(val, "val");
            //   return 5 + val[2] * 5; //圆环大小
            // },
            symbol: "circle",
            symbolSize: 0.001,
            itemStyle: {
              normal: {
                show: false,
                color: "#888" //文字和点颜色
              }
            },
            data: item[1].map(function(dataItem) {
              console.log(dataItem[0].name, "????");
              var str = dataItem[0].name;
              if (str.charAt(str.length - 1) == "变") {
                return {
                  name: dataItem[0].name,
                  value: chinaGeoCoordMap[dataItem[0].name].concat([
                    dataItem[0].value
                  ]),
                  symbolSize: 5,
                  itemStyle: {
                    normal: {
                      show: false,
                      color: "#f40" //文字和点颜色
                    }
                  },
                  rippleEffect: {
                    //涟漪特效
                    period: 4, //动画时间，值越小速度越快
                    brushType: "stroke", //波纹绘制方式 stroke, fill
                    scale: 3 //波纹圆环最大限制，值越大波纹越大
                  },
                  label: {
                    normal: {
                      show: true,
                      position: "right", //显示位置
                      offset: [0, 0], //偏移设置
                      formatter: function(params) {
                        //圆环显示文字
                        console.log(
                          params.data.name,
                          "---------------------------"
                        );
                        return params.data.name;
                      },
                      fontSize: 12
                    },
                    emphasis: {
                      show: true
                    }
                  }
                };
              } else {
                return {
                  name: dataItem[0].name,
                  value: chinaGeoCoordMap[dataItem[0].name].concat([
                    dataItem[0].value
                  ])
                };
              }
            })
          }
          //被攻击点
          // {
          //   type: "scatter",
          //   coordinateSystem: "geo",
          //   zlevel: 2,
          //   rippleEffect: {
          //     period: 4,
          //     brushType: "stroke",
          //     scale: 4
          //   },
          //   label: {
          //     normal: {
          //       show: true,
          //       position: "right",
          //       //offset:[5, 0],
          //       color: "#0f0",
          //       formatter: "{b}",
          //       textStyle: {
          //         color: "#0f0"
          //       }
          //     },
          //     emphasis: {
          //       show: true,
          //       color: "#bd78ba"
          //     }
          //   },
          //   symbol: "pin",
          //   symbolSize: 20,
          //   data: [
          //     // {
          //     //   name: item[0],
          //     //   value: chinaGeoCoordMap[item[0]].concat([10])
          //     // }
          //   ]
          // }
        );
      });

      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          backgroundColor: "rgba(10, 90, 134, 0.72)",
          // borderColor: "#FFFFCC",
          showDelay: 0,
          hideDelay: 0,
          enterable: true,
          transitionDuration: 0,
          extraCssText: "z-index:100",
          formatter: function(params, ticket, callback) {
            //根据业务自己拓展要显示的内容
            var res = "";
            var name = params.name;
            console.log(name, "2222");
            var value = params.value[params.seriesIndex + 1];
            if (name) {
              res =
                "<span style='color:#fff;'>" +
                "500kV" +
                name +
                "站";
              // "</span><br/>设备类型：NEC_SDH_UNODE-BBM-U1" +
              // "<br/>所属局站：500kV中继站" +
              // "<br/>所属机房：H01-1楼综合机房" +
              // "<br/>所属机架：NEC_SDH_UNODE-BBM-U1" +
              // "<br/>所属系统：NEC 2.5G SDH光传输系统" +
              // "<br/>IP地址：";

              return res;
            } else {
              res =
                "<span style='color:#fff;'>" +
                params.data.aa[0].aa +
                "<br/>24芯OPGW光缆段01" +
                "</span>" +
                "<br/>电压等级：500kV" +
                "<br/>类型：OPGW" +
                "<br/>纤芯数量：24" +
                "<br/>可用纤芯：14" +
                "<br/>一次线路：500kV古太二线" +
                "<br/>长度：272.9km" +
                "<br/>维护人：赵阳";
              return res;
            }
          }
        },
        backgroundColor: "#fffff6",
        // visualMap: {
        //   //图例值控制
        //   min: 0,
        //   max: 3,
        //   calculable: true,
        //   show: true,
        //   color: ["#f44336", "#fc9700", "#ffde00", "#ffde00", "#00eaff"],
        //   textStyle: {
        //     color: "#fff"
        //   }
        // },
        geo: {
          map: "四川",
          zoom: 1.3,
          label: {
            emphasis: {
              show: false
            }
          },
          roam: true, //是否允许缩放
          scaleLimit: {
            //所属组件的z分层，z值小的图形会被z值大的图形覆盖
            min: 0.5, //最小的缩放值
            max: 3 //最大的缩放值
          },
          itemStyle: {
            normal: {
              color: "rgba(51, 69, 89, .5)", //地图背景色
              borderColor: "#e1e0e3", //省市边界线00fcff 516a89
              borderWidth: 1
            },
            emphasis: {
              color: "rgba(37, 43, 61, .5)" //悬浮背景
            }
          },
          //     {
          //     "桃乡变",
          //     "绵阳市",
          //     "德阳市",
          //     "攀枝花市",
          //     "遂宁市",
          //     "南充市",
          //     "广元市",
          //     "乐山市",
          //     "宜宾市",
          //     "泸州市",
          //     "达州市",
          //     "广安市",
          //     "巴中市",
          //     "雅安市",
          //     "内江市",
          //     "自贡市",
          //     "资阳市",
          //     "眉山市";
          //     '阿坝藏族羌族自治州',
          //     '甘孜藏族自治州',
          //     '凉山彝族自治州'

          // }
          regions: [
            //对不同的区块进行着色
            {
              name: "内江市", //区块名称
              itemStyle: {
                normal: {
                  areaColor: "#8ebbd0"
                }
              }
            },
            {
              name: "成都市",
              itemStyle: {
                normal: {
                  areaColor: "#a8ddb5"
                }
              }
            },
            {
              name: "绵阳市",
              itemStyle: {
                normal: {
                  areaColor: "#a8ddb5"
                }
              }
            },
            {
              name: "德阳市",
              itemStyle: {
                normal: {
                  areaColor: "#9dc7bb"
                }
              }
            },
            {
              name: "攀枝花市",
              itemStyle: {
                normal: {
                  areaColor: "#a1d99b"
                }
              }
            },
            {
              name: "遂宁市",
              itemStyle: {
                normal: {
                  areaColor: "#75ab9b"
                }
              }
            },
            {
              name: "南充市",
              itemStyle: {
                normal: {
                  areaColor: "#a1d99b"
                }
              }
            },

            {
              name: "广元市",
              itemStyle: {
                normal: {
                  areaColor: "#75ab9b"
                }
              }
            },
            {
              name: "乐山市",
              itemStyle: {
                normal: {
                  areaColor: "#8ebbd0"
                }
              }
            },
            {
              name: "宜宾市",
              itemStyle: {
                normal: {
                  areaColor: "#9dc7bb"
                }
              }
            },
            {
              name: "泸州市",
              itemStyle: {
                normal: {
                  areaColor: "#a1d99b"
                }
              }
            },
            {
              name: "达州市",
              itemStyle: {
                normal: {
                  areaColor: "#a8ddb5"
                }
              }
            },
            {
              name: "广安市",
              itemStyle: {
                normal: {
                  areaColor: "#99d8c9"
                }
              }
            },
            {
              name: "巴中市",
              itemStyle: {
                normal: {
                  areaColor: "#9dc7bb"
                }
              }
            },
            {
              name: "雅安市",
              itemStyle: {
                normal: {
                  areaColor: "#a1d99b"
                }
              }
            },
            {
              name: "自贡市",
              itemStyle: {
                normal: {
                  areaColor: "#a8ddb5"
                }
              }
            },
            {
              name: "资阳市",
              itemStyle: {
                normal: {
                  areaColor: "#99d8c9"
                }
              }
            },
            {
              name: "眉山市",
              itemStyle: {
                normal: {
                  areaColor: "#9dc7bb"
                }
              }
            },
            {
              name: "阿坝藏族羌族自治州",
              itemStyle: {
                normal: {
                  areaColor: "#75ab9b"
                }
              }
            },
            {
              name: "甘孜藏族自治州",
              itemStyle: {
                normal: {
                  areaColor: "#a8ddb5"
                }
              }
            },
            {
              name: "凉山彝族自治州",
              itemStyle: {
                normal: {
                  areaColor: "#9dc7bb"
                }
              }
            }
          ]
        },
        series: series
      });
      myChart.on("click", function(data) {
        console.log(data, "22222");
        _this.$refs.boxss.style.display = "none";
        // if (data.componentSubType == "lines") {
        //   console.log(data);
        //   let x = event.offsetX;
        //   let y = event.offsetY;
        //   console.log(x, y);
        //   console.log(_this.$refs.boxss, "this.$refs.boxss");
        //   // console.log(_this,'this.$refs.boxss')
        //   _this.$refs.boxss.style.display = "block";
        //   _this.$refs.boxss.style.top = `${y}px`;
        //   _this.$refs.boxss.style.left = `${x}px`;
        // } else {
        //   _this.$refs.boxss.style.display = "none";
        // }
      });
      document.oncontextmenu = function(e) {
        //阻止右键事件
        return false;
      };
      // myChart.on("contextmenu", showMenu); //定义右键事件
      // function showMenu(param) {
      //   console.log("param===", param);
      //   if (param.componentSubType == "lines") {
      //     let x = event.offsetX;
      //     let y = event.offsetY;
      //     console.log(x, y);
      //     console.log(_this.$refs.boxss, "this.$refs.boxss");
      //     // console.log(_this,'this.$refs.boxss')
      //     _this.$refs.boxss.style.display = "block";
      //     _this.$refs.boxss.style.top = `${y}px`;
      //     _this.$refs.boxss.style.left = `${x}px`;
      //   } else {
      //     _this.$refs.boxss.style.display = "none";
      //   }
      // }

      // myChart.on("georoam", showMenus); //定义缩放事件
      // function showMenus(param) {
      //   console.log("ssssss===", param);
      //   console.log("ssssss===", myChart.getOption().geo);
      // }
    },
    chagenss() {
      this.$nextTick(function() {
        let _this = this;
        this.drawLine(_this);
      });
    },

    closedialogs() {
      this.$store.commit("openopticalcable", {
        boolean: false
      });
    },
    handleClose(done) {
      console.log(done);
    },
    changeheight() {
      this.heightchage = !this.heightchage;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.independent {
  /deep/.el-dialog {
    width: 885px !important;
    border: 2px solid #5c9792;
    margin-top: 3% !important;
    .el-dialog__header {
      padding: 0;
      // height: 35px;
      .el-dialog__title {
        font-size: 13px;
      }
      .el-dialog__headerbtn {
        display: none;
      }
    }
    .el-dialog__body {
      padding: 0;
      .headerbox {
        height: 35px;
        background: #3ab5a0;
        display: flex;
        justify-content: space-between;
        .leftheader {
          width: 140px;
          height: 35px;
          // background: chartreuse;
          display: flex;
          align-items: center;
          margin-left: 9px;
          img {
            width: 15px;
            height: 15px;
            margin-right: 10px;
          }
          .headertitle {
            font-size: 15px;
            color: #fff;
          }
        }
        .rightheader {
          width: 150px;
          height: 35px;
          // background: chocolate;
          margin-right: 9px;
          display: flex;
          align-items: center;
          img {
            width: 16px;
            object-fit: cover;
            object-position: top;
            margin-left: 10px;
          }
        }
      }
      .mainbox {
        height: 630px;
        width: 864px;
        border: 2px solid #e5e5e5;
        display: flex;
        margin: 4px auto 6px;
        position: relative;
        .boxss {
          background: #fff;
          position: absolute;
          z-index: 66;
          // top: 20px;
          display: none;
          width: 100px;

          .ck {
            line-height: 30px;
            font-size: 13px;
            height: 30px;
            padding-left: 15px;
            cursor: pointer;
          }
          .ck:hover {
            background: #eee;
          }
        }
      }
    }
  }
}
</style>
