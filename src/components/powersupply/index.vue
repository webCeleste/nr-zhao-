<template>
  <div class="independent">
    <el-dialog class="independent" :visible.sync="$store.state.powerSupply" width="30%" :before-close="closedialogs"
      append-to-body>
      <!-- <Liveview></Liveview> -->
      <!-- <equipPanelDiagram></equipPanelDiagram> -->
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/components-dialog/电源.png" alt />
          <div class="headertitle">电源</div>
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
        <div class="mainleftside">
          <div class="maintopbox">
            <div class="topiconbox">
              <img src="../../assets/img/components-dialog/四川电网.png" alt />
              <div class="topicontxt">桃乡变整流电流01</div>
            </div>
            <div class="topiconbox"></div>
          </div>
          <img src="../../assets/img/components-dialog/powerSupply.png" class="mainImg" />
          <div class="bootoomrightbox">
            <div class="gpsbox" style="text-decoration: underline;cursor: pointer;" @click="openSiteDialog">
              <img src="../../assets/img/components-dialog/站点信息.png" alt />
              <div class="gpstitle">500kV桃乡变</div>
            </div>
            <div class="gpsbox">
              <img src="../../assets/img/components-dialog/所属系统.png" alt />
              <div class="gpstitle">中恒</div>
            </div>
            <div class="gpsbox">
              <img src="../../assets/img/components-dialog/设备型号.png" alt />
              <div class="gpstitle">500kV桃乡站48V通信电源系统</div>
            </div>
          </div>
        </div>
        <div class="links"></div>
        <div class="mainrightside">
          <div class="mainsbox">
            <div class="buttonicon">
              <img src="../../assets/img/components-dialog/传输拓扑图.png" alt @click="showTransTopology" title="电源接线图" />
              <img src="../../assets/img/components-dialog/实景图标.png" alt @click="showPhoto" title="资源实景图" />
            </div>
            <div class="business" style="background: #297fb8;">
              <div class="toptxt">输入</div>
              <div class="numboxs">
                <div class="numbers">10 </div>路输入<div class="numbers">/100 </div>kW
              </div>
            </div>
            <div class="business" style="background: #60c987;">
              <div class="toptxt">输出</div>
              <div class="numboxs">
                <div class="numbers">10 </div>路输出<div class="numbers">/100 </div>kW
              </div>
            </div>
            <div class="business" style="background: #f1c40f;">
              <div class="toptxt">负载</div>
              <div class="numboxs">
                <div class="numbers">12 </div>个设备 <div class="numbers">/0 </div>空闲
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tabsbox">
        <div class="tabslistbox">
          <div :class="cur == index ? 'switchbutton' :'switchbuttonnone'" v-for="(item,index) in tabslist" :key="index"
            @click="tabschage(index)">{{item}}</div>
        </div>
        <div class="righticonbox" @click="heightchage = !heightchage">
          <img
            :src="heightchage == true ? require('../../assets/img/components-dialog/下拉.png') : require('../../assets/img/components-dialog/pullUp.png')" />
        </div>
      </div>
      <el-collapse-transition>
        <div v-show="heightchage">
          <div class="tablemain" v-if="cur == 0">
            <div class="leftone">
              <div class="tableleftkey" v-for="(item,index) in tabletopkey" :key="index">{{item}}</div>
            </div>
            <div class="lefttwo">
              <div class="tableleftvalue" v-for="(item,index) in tabletop" :key="index">{{item}}</div>
            </div>
            <div class="leftone" v-if="tabletopkey2.length != 0">
              <div class="tableleftkey" v-for="(item,index) in tabletopkey2" :key="index" @>{{item}}</div>
            </div>
            <div class="leftthree" v-if="tabletop2.length != 0">
              <div class="tableleftvalue2" v-for="(item,index) in tabletop2" :key="index">{{item}}</div>
            </div>
          </div>
          <!-- 总线端子 -->
          <div class="tablemain" v-else-if="cur == 1">
            <div class="fl">
              <div class="colHead" v-for="(item,index) in serviceColHead" :key="index">{{item}}</div>
            </div>
            <div class="fl terminalTable">
              <el-table :data="serviceData" style="width: 100%" key="serviceData">
                <el-table-column v-for="(item,index) in serviceRowHead" :key="index" :prop="item" :label="item"
                  width="180" show-overflow-tooltip>
                </el-table-column>
              </el-table>
            </div>
            <div class="fl right"> 柜体正面 </div>
          </div>
          <!-- 承载光路 -->
          <div class="tablemain" v-else-if="cur == 2">
            <el-table :data="lightPathData" style="width: 100%" height="227" key="lightPathData">
              <el-table-column prop="dz" width="120" label="端子"  show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="no" label="配电端子编号" width="140"  show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="specifications" label="开关规格" width="100"  show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="capacity" label="开关容量（单位：A）" width="180"  show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="status" label="开关状态"  width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="loadType" label="连接负载类型" width="160"  show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="cabinet" label="连接负载机柜/设备名称" width="230" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="distribution" label="连接配电端子" width="140"  show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="remarks" label="备注" width="180" show-overflow-tooltip sortable>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-collapse-transition>
    </el-dialog>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        // dialogVisible1: true
        cur: 0,
        heightchage: true,
        tabslist: [
          "基本信息",
          "总线端子",
          "负载分配"
        ],
        // 基本信息
        tabletopkey: [
          "名称",
          "简称",
          "所属站点",
          "生产厂家",
          "运行状态",
          "退运日期",
          "资产单位",
          "联系电话",
          "设备类型",
          "备注"
        ],
        tabletopkey2: [
          "全局名称",
          "所属系统",
          "所属机房",
          "厂家设备类型",
          "投运日期",
          "运维单位",
          "维护人",
          "技术体制",
          "ERP资产编码"
        ],
        tabletop: [
          "H01-1楼通信机房/整流电源01",
          "桃乡变整流电源01",
          "500kV桃乡变",
          "中恒",
          "在役",
          "",
          "国网四川检修公司",
          "18181426786",
          "",
          ""
        ],
        tabletop2: [
          "川.国网四川检修公司/500kV桃乡站48V通信电源系统/H01-1楼通信机房/整流电源01",
          "500kV桃乡站48V通信电源系统",
          "H01-1楼通信机房",
          "默认",
          "2010-12-16",
          "国网四川检修公司",
          "刘维林",
          "电源",
          ""
        ],
        // 总线端子
        serviceColHead: [
          "配电端子编号", "开关规格", "开关容量（A）", "开关状态", "连接负载类型", "连接负载机柜/设备名称", "负载供电方式", "负载供电分路（1~16）", "机柜内设备/业务/光路",
          "连接配电端子", "备注"
        ],
        serviceRowHead: ['K1', 'K2', 'K3', 'K4', 'K5', 'K6', 'K7', 'K8', 'K9', 'K10', 'K11', 'K12', ],
        serviceData: [{
          K1: 'DC',
          K2: 'DC',
          K3: 'DC',
          K4: 'DC',
          K5: 'DC',
          K6: 'DC',
          K7: 'DC',
          K8: 'DC',
          K9: 'DC',
          K10: 'DC',
          K11: 'DC',
          K12: 'DC',
        }, {
          K1: '10A',
          K2: '10A',
          K3: '10A',
          K4: '10A',
          K5: '10A',
          K6: '10A',
          K7: '10A',
          K8: '10A',
          K9: '10A',
          K10: '10A',
          K11: '10A',
          K12: '10A',
        }, {
          K1: '闭合',
          K2: '闭合',
          K3: '断开',
          K4: '断开',
          K5: '断开',
          K6: '断开',
          K7: '闭合',
          K8: '断开',
          K9: '闭合',
          K10: '断开',
          K11: '断开',
          K12: '断开',
        }, {
          K1: '保护/安控接口柜-红色',
          K2: '保护/安控接口柜-红色',
          K3: '空白-白色',
          K4: '空白-白色',
          K5: '空白-白色',
          K6: '空白-白色',
          K7: '保护/安控接口柜-红色',
          K8: '空白-白色',
          K9: '保护/安控接口柜-红色',
          K10: '空白-白色',
          K11: '空白-白色',
          K12: '空白-白色',
        }, {
          K1: '综合配线柜3#',
          K2: '综合配线柜2#',
          K3: '',
          K4: '',
          K5: '',
          K6: '',
          K7: '综合配线柜1#',
          K8: '',
          K9: '',
          K10: '',
          K11: '',
          K12: '',
        }, {
          K1: '单路',
          K2: '单路',
          K3: '单路',
          K4: '单路',
          K5: '单路',
          K6: '单路',
          K7: '双路/主用',
          K8: '单路',
          K9: '单路',
          K10: '单路',
          K11: '单路',
          K12: '单路',
        }, {
          K1: '',
          K2: '',
          K3: '',
          K4: '',
          K5: '',
          K6: '',
          K7: '',
          K8: '',
          K9: '',
          K10: '',
          K11: '',
          K12: '',
        }, {
          K1: '(500kV桃乡变~500kV尖山变)继电保护01',
          K2: '(500kV桃乡变~500kV尖山变)继电保护02',
          K3: '无负载',
          K4: '无负载',
          K5: '无负载',
          K6: '无负载',
          K7: '',
          K8: '无负载',
          K9: '',
          K10: '无负载',
          K11: '无负载',
          K12: '无负载',
        }, {
          K1: '',
          K2: '',
          K3: '',
          K4: '',
          K5: '',
          K6: '',
          K7: '',
          K8: '',
          K9: '',
          K10: '',
          K11: '',
          K12: '',
        }, {
          K1: '',
          K2: '',
          K3: '',
          K4: '',
          K5: '',
          K6: '',
          K7: '',
          K8: '',
          K9: '',
          K10: '',
          K11: '',
          K12: '',
        }],
        // 承载光路
        lightPathData: [{
          dz: '进线端子1',
          no: "JK01",
          specifications: "AC",
          capacity: "250A",
          status: "闭合",
          loadType: "电源设备-自动连线",
          cabinet: "",
          distribution: "",
          remarks: "380V中央盘Ⅰ段7柜5回路"
        }, {
          dz: '进线端子2',
          no: "JK02",
          specifications: "AC",
          capacity: "250A",
          status: "闭合",
          loadType: "电源设备-自动连线",
          cabinet: "H03-1楼通信机房/交流配电屏02",
          distribution: "JK3",
          remarks: ""
        }]
      };
    },
    methods: {
      closedialogs() {
        this.$store.commit("openPowerSupply", {
          boolean: false
        });
      },
      tabschage(index) {
        this.cur = index;
      },
      business() {
        this.$store.commit("openBusiness", {
          boolean: true
        });
      },
      lightpath() {
        this.$store.commit("openLightpath", {
          boolean: true
        })
      },
      passageway() {
        this.$store.commit("openPassageway", {
          boolean: true
        })
      },
      handleClose(done) {
        console.log(done);
      },
      changeheight() {
        this.heightchage = !this.heightchage;
      },
      // 站点图
      openSiteDialog() {
        this.$store.commit("opensite", {
          boolean: true
        });
      },
      // 实景图
      showPhoto() {
        this.$store.commit("openliveview", {
          boolean: true
        });
      },
      // 电源接线图
      showTransTopology() {
        this.$store.commit("openConnection", {
          boolean: true
        });
      },
      // 履历 => 详情
      detailsRow(index, row) {
        if (row[index].type == "检修") {
          this.$store.commit("openchecklist", {
            boolean: true
          });
        } else if (row[index].type == "方式") {
          this.$store.commit("openmethodsheet", {
            boolean: true
          });
        } else if (row[index].type == "缺陷") {
          this.$store.commit("opendefectlist", {
            boolean: true
          });
        } else if (row[index].type == "风险预警") {
          this.$store.commit("openriskwarningsheet", {
            boolean: true
          });
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .fl {
    float: left;
  }

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
            width: 105px;
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
          height: 356px;
          width: 864px;
          border: 2px solid #e5e5e5;
          display: flex;
          margin: 4px auto 0;

          .mainleftside {
            width: 627px;
            height: 100%;
            position: relative;

            // background: url("../../assets/img/components-dialog/transmissionBackground.png") no-repeat center;
            // background-size: cover;
            .mainImg {
              position: absolute;
              height: 240px;
              top: 50%;
              left: 43%;
              transform: translate(-50%, -50%);
            }

            .maintopbox {
              width: 627px;
              height: 65px;
              display: flex;
              justify-content: space-between;

              .topiconbox {
                height: 46px;
                width: 170px;
                display: flex;
                align-items: center;

                img {
                  width: 19px;
                  height: 19px;
                  margin: 0 10px;
                }

                .topicontxt {
                  font-size: 15px;
                  // text-decoration: underline;
                  color: #000;
                }
              }

              .maincenterbox {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                // background: chartreuse;
                .hedertitle {
                  font-size: 29px;
                  line-height: 35px;
                  color: #000;
                }

                .numcenter {
                  font-size: 12px;
                  color: #999;
                }
              }
            }

            .bootoomrightbox {
              position: absolute;
              // left: calc(100% - 125px);

              // background: #999;
              right: 10px;
              bottom: 5px;
              width: 204px;

              // background: chartreuse;
              .gpsbox {
                display: flex;
                height: 25px;
                // justify-content: flex-end;

                img {
                  width: 19px;
                  height: 19px;
                  margin-right: 5px;
                }

                .gpstitle {
                  font-size: 13px;
                  line-height: 19px;
                  color: #212121;
                }
              }

              .gpsnumbox {
                display: flex;
                justify-content: flex-end;
                height: 38px;
                line-height: 38px;
                font-size: 13px;
                text-decoration: underline;
                color: #fff;
              }
            }
          }

          .links {
            width: 2px;
            height: 100%;
            background: url("../../assets/img/components-dialog/links1.png") no-repeat center;
            background-size: auto 84%;
            margin: 0 0 0 8px;
          }

          .mainrightside {
            flex: 1;
            // background: #43abc4;
            display: flex;
            justify-content: center;

            .mainsbox {
              width: 205px;
              // background: chartreuse;
              display: flex;
              justify-content: center;
              // align-items: center;
              flex-direction: column;

              .buttonicon {
                height: 56px;
                display: flex;
                align-items: center;

                img {
                  width: 23px;
                  height: 23px;
                  margin-right: 23px;
                  cursor: pointer;
                }
              }

              .business {
                width: 205px;
                height: 80px;
                border-radius: 5px;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;

                .toptxt {
                  font-size: 13px;
                  line-height: 20px;
                  color: #fff;
                }

                .numboxs {
                  display: flex;
                  font-size: 13px;
                  line-height: 35px;
                  color: #fff;
                  align-items: baseline;

                  .numbers {
                    font-size: 25px;
                    // line-height: 25px;
                  }
                }
              }

              .datebox {
                display: flex;
                justify-content: center;
                margin-bottom: 10px;
                margin-top: -7px;

                img {
                  height: 16px;
                  margin-right: 12px;
                }

                .datetitle {
                  font-size: 12px;
                  line-height: 16px;
                  color: #1d6b5d;
                }
              }

              .molibox {
                width: 84px;
                height: 26px;
                border-radius: 4px;
                border: 1px solid #999;
                display: flex;
                justify-content: center;
                align-items: center;

                img {
                  height: 14px;
                  margin-right: 5px;
                }

                .moliboxtitle {
                  font-size: 12px;
                  color: #000;
                }
              }
            }
          }
        }

        .tabsbox {
          width: 864px;
          height: 34px;
          border-left: 2px solid #e5e5e5;
          border-right: 2px solid #e5e5e5;
          display: flex;
          margin: 0 auto;
          justify-content: space-between;
          background: #e5f3f9;

          .tabslistbox {
            display: flex;

            .switchbutton {
              width: 90px;
              display: flex;
              justify-content: center;
              height: 34px;
              background: #1d6b5d;
              line-height: 34px;
              font-size: 15px;
              color: #fff;
              cursor: pointer;
            }

            .switchbuttonnone {
              width: 90px;
              display: flex;
              justify-content: center;
              height: 34px;
              background: #e5f3f9;
              line-height: 34px;
              font-size: 15px;
              color: #000;
              border-right: 1px solid #E5E5E5;
              cursor: pointer;
            }
          }

          .righticonbox {
            display: flex;
            justify-content: center;
            align-items: center;

            img {
              width: 17px;
              margin-right: 20px;
            }
          }
        }

        .tablemain {
          width: 864px;
          height: 227px;
          border: 2px solid #e5e5e5;
          margin: 0 auto 5px;
          display: flex;
          overflow-y: auto;

          .right {
            height: 417px;
            color: #000;
            background: #f2f2f2;
            text-align: center;
            display: flex;
            align-items: center;
            border-left: 1px solid #e5e5e5;
          }

          .terminalTable {
            width: calc(864px - 210px);
          }

          .label {
            display: inline-block;
            box-sizing: border-box;
            width: 432px !important;
            height: 37px;
            border-bottom: 1px solid #e5e5e5;
            border-left: 1px solid #e5e5e5;

            .label_title {
              display: inline-block;
              width: 115px;
            }

            .label_content {
              display: inline-block;
              flex: 1;
            }
          }

          .leftone {
            width: 115px;

            .tableleftkey {
              height: 37px;
              background: #f2f2f2;
              color: #000;
              border-bottom: 1px solid #e5e5e5;
              display: flex;
              justify-content: center;
              align-items: center;
            }
          }

          .lefttwo {
            flex: 1;

            .tableleftvalue {
              height: 37px;
              background: #fff;
              color: #000;
              border-bottom: 1px solid #e5e5e5;
              border-right: 1px solid #e5e5e5;
              border-left: 1px solid #e5e5e5;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-left: 15px;
            }
          }

          .leftthree {
            width: 308px;

            .tableleftvalue2 {
              height: 37px;
              background: #fff;
              color: #000;
              border-bottom: 1px solid #e5e5e5;
              border-left: 1px solid #e5e5e5;
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding-left: 15px;
            }
          }

          // table

          .el-table td,
          .el-table th.is-leaf {
            border-bottom: 1px solid #e5e5e5;
          }

          .el-table th {
            background-color: #f2f2f2;
            color: #000;
            font-weight: 400;
            height: 38px;
            font-size: 14px;
          }

          .el-table td,
          .el-table th {
            height: 38px;
            padding: 0;
            font-size: 14px;
            color: #000;
          }

          .cell span {
            font-size: 14px;
            color: #297fb8;
            cursor: pointer;
          }

          .colHead {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 155px;
            height: 37px;
            color: #000;
            font-size: 14px;
            font-weight: 400;
            background: #f2f2f2;
            border-bottom: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            text-align: center;
          }

          // .editTable__block th {
          //   background: #f2f2f2;
          // }

          // .value-data-div {
          //   left: 116px !important;
          //   min-width: calc(100% - 116px) !important;
          // }
        }
      }
    }
  }
</style>