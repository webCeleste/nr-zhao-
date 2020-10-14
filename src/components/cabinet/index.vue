<template>
  <div class="independent">
    <el-dialog class="independent" :visible.sync="$store.state.cabinet" width="30%" :before-close="closedialogs"
      append-to-body>
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/机柜切图/机柜.png" alt />
          <div class="headertitle">机柜</div>
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
        <div class="leftboxs">
          <div class="topicon">
            <img src="../../assets/img/components-dialog/四川电网.png" alt="">
            <div>{{tabletop[0]}}</div>
          </div>
          <div class="cabinetbox">
            <div class="boxitem">
              <div class="boxitemli" v-for="(item,index) in itemlist" :key="index" @contextmenu="showMenu">{{item}}
              </div>
            </div>
          </div>
          <div class="bootomicon" @click="openMachineBasic">
            <img src="../../assets/img/机柜切图/站点机房.png" alt="">
            <div>通信机房</div>
          </div>
        </div>
        <div class="rightboxs">
          <div class="topss" style="margin:10px 0 5px 5px">
            <img src="../../assets/img/机柜切图/资源实景图.png" style="width:20px;height:20px" @click="showPhoto" title="资源实景图"
              alt="">
          </div>
          <div class="informationboxs">
            <div class="infortitle">基本信息</div>
            <div class="tablemain">
              <div class="leftone">
                <div class="tableleftkey" v-for="(item,index) in tabletopkey" :key="index">{{item}}</div>
              </div>
              <div class="lefttwo">
                <div class="tableleftvalue" v-for="(item,index) in tabletop" :key="index">{{item}}</div>
              </div>
              <div class="leftone" v-if="tabletopkey2.length != 0">
                <div class="tableleftkey" v-for="(item,index) in tabletopkey2" :key="index">{{item}}</div>
              </div>
              <div class="leftthree" v-if="tabletop2.length != 0">
                <div class="tableleftvalue2" v-for="(item,index) in tabletop2" :key="index">{{item}}</div>
              </div>
            </div>
          </div>
          <div class="equipmentoxs">
            <div class="infortitle">机柜设备</div>
            <div class="tablsinfo">
              <el-table :data="tableData" style="width: 100%" max-height="256" height="256">
                <el-table-column label="设备名称" width="160" show-overflow-tooltip sortable>
                  <template slot-scope="scope">
                    <span class="colors" @click="openMachineBasic">{{scope.row.equipmentname}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="num" label="设备编号" width="185" show-overflow-tooltip sortable></el-table-column>
                <el-table-column prop="model" label="设备型号" width="185" show-overflow-tooltip sortable></el-table-column>
                <el-table-column prop="manufactor" label="设备厂家" width="110" show-overflow-tooltip sortable></el-table-column>
                <el-table-column prop="system" label="所属系统" width="100" show-overflow-tooltip sortable></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <vue-context-menu :contextMenuData="contextMenuData" @savedata="savedatas" @newdata="newdata"></vue-context-menu>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        contextMenuData: {
          // the contextmenu name(@1.4.1 updated)
          menuName: "demo",
          // The coordinates of the display(菜单显示的位置)
          axis: {
            x: null,
            y: null
          },
          // Menu options (菜单选项)
          menulists: [{
              fnHandler: "newdata",
              icoName: "fa fa-home fa-fw",
              btnName: "查看设备"
            },
            // {
            //   fnHandler: "savedata", // Binding events(绑定事件)
            //   icoName: "fa fa-home fa-fw", // icon (icon图标 )
            //   btnName: "承载通道/业务" // The name of the menu option (菜单名称)
            // },
          ]
        },
        // dialogVisible1: true
        cur: 0,
        heightchage: true,
        itemlist: [
          "1,RO11-中兴/10G/B01",
          "2,RO11-中兴/10G/B02",
          "3,RO11-中兴/10G/B03"
        ],
        tabletopkey: [
          "名称",
          "机柜编号",
          "所属机房",
          "生产厂家",
          "运行状态",
          "投运日期",
          "退运日期",
          "运维单位",
          "资产单位",
          "维护人",
          "机柜类型",
        ],
        tabletopkey2: [
          "联系电话",
          "容量(U)",
          "机柜高度(毫米)",
          "机柜宽度(毫米)",
          "机柜深度(毫米)",
          "颜色",
          "ERP资产编码",
          "电源属性",
          "用途描述",
          "备注",
          "开门方式",
        ],
        tabletop: [
          "省网中兴S390 SDH光传输柜",
          "ECIX-04578923",
          "H01-1楼通信机房",
          "中兴",
          "在役",
          "2012-06-09",
          "",
          "国网四川检修公司",
          "国网四川检修公司",
          "李玥",
          "",
        ],
        tabletop2: [
          "13547811478",
          "25",
          "2000",
          "1000",
          "500",
          "黑色",
          "182585920790",
          "",
          "",
          "",
          "",
        ],
        tableData: [{
          equipmentname: "RO11-中兴/10G/B01",
          num: "ECIX-04578923-c12",
          model: "省ECIX MD-1000 X2 SDH光传输设备",
          manufactor: "中兴",
          type: "",
          system: ""
        }, {
          equipmentname: "RO11-中兴/10G/B02",
          num: "ECIX-04578923-c13",
          model: "省ECIX MD-1000 X2 SDH光传输设备",
          manufactor: "中兴",
          type: "",
          system: ""
        }, {
          equipmentname: "RO11-中兴/10G/B03",
          num: "ECIX-04578923-c14",
          model: "省ECIX MD-1000 X2 SDH光传输设备",
          manufactor: "中兴",
          type: "",
          system: ""
        }]
      };
    },
    mounted() {},
    methods: {
      savedatas() {
        this.$store.commit("openBearingDialog", {
          boolean: true
        });
      },
      newdata() {
        this.$store.commit("openequipment", {
          boolean: true
        });
      },
      showPhoto() {
        this.$store.commit("openliveview", {
          boolean: true
        });
      },
      openMachineBasic() {
        this.$store.commit("opencomputerroom", {
          boolean: true
        })
      },
      showMenu() {
        event.preventDefault();
        var x = event.clientX;
        var y = event.clientY;
        // Get the current location
        this.contextMenuData.axis = {
          x,
          y
        };
      },
      closedialogs() {
        this.$store.commit("opencabinet", {
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
          height: 634px;
          width: 864px;
          border: 2px solid #e5e5e5;
          display: flex;
          margin: 4px auto 4px;
          display: flex;

          .leftboxs {
            flex: 1;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;

            .topicon {
              position: absolute;
              top: 20px;
              left: 20px;
              display: flex;

              img {
                width: 20px;
                height: 20px;
                margin-right: 5px;
              }
            }

            .bootomicon {
              position: absolute;
              bottom: 20px;
              right: 20px;
              display: flex;
              text-decoration: underline;
              cursor: pointer;

              img {
                width: 20px;
                height: 20px;
                margin-right: 5px;
              }
            }

            .cabinetbox {
              width: 203px;
              height: 395px;
              background: url("../../assets/img/机柜切图/机柜视图.png") no-repeat center;
              background-size: cover;

              .boxitem {
                margin-left: 30px;
                margin-top: 45px;

                .boxitemli {
                  color: #ddd;
                  width: 145px;
                  height: 28px;
                  background: url("../../assets/img/机柜切图/机柜板.png") no-repeat center;
                  background-size: cover;
                  font-size: 13px;
                  line-height: 28px;
                  margin: 2px 0;
                  cursor: pointer;
                }

                .boxitemli:hover {
                  color: #fff;
                  width: 150px;
                  height: 30px;
                  background: url("../../assets/img/机柜切图/机柜板.png") no-repeat center;
                  background-size: cover;
                  font-size: 13px;
                  line-height: 28px;
                  margin: 2px 0 2px -2px;
                  cursor: pointer;
                }
              }
            }

          }

          .rightboxs {
            width: 537px;
            height: 100%;
            background: #fff;

            .informationboxs {
              width: 532px;
              height: 284px;
              border: 1px solid #e5e5e5;
              background: #fff;
              margin-bottom: 5px;
              font-size: 13px;

              .infortitle {
                height: 34px;
                background: #3ab5a0;
                font-size: 15px;
                line-height: 34px;
                color: #fff;
                padding-left: 15px;
              }

              .tablemain {
                height: 247px;
                border: 2px solid #e5e5e5;
                margin: 0 auto 5px;
                display: flex;
                overflow: auto;

                .leftone {
                  width: 105px;

                  .tableleftkey {
                    height: 33px;
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
                    height: 33px;
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
                  flex: 1;

                  .tableleftvalue2 {
                    height: 33px;
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
              }
            }

            .el-table td div {
              font-size: 13px;
            }

            .equipmentoxs {
              width: 532px;
              height: 284px;
              border: 1px solid #e5e5e5;

              .colors {
                color: #297fb8;
                cursor: pointer;
              }

              // background: #fff;
              .infortitle {
                height: 34px;
                background: #3ab5a0;
                font-size: 15px;
                line-height: 34px;
                color: #fff;
                padding-left: 15px;
              }

              /deep/.el-table {
                .el-table__header tr,
                .el-table__header th {
                  padding: 0;
                  height: 38px;
                  background: #f2f2f2;
                  font-weight: 400;
                  font-size: 13px;
                  color: #000;
                }

                .el-table__body tr,
                .el-table__body td {
                  padding: 0;
                  height: 38px;
                  font-size: 14px;
                  color: #000;
                }
              }
            }
          }
        }
      }
    }
  }
</style>