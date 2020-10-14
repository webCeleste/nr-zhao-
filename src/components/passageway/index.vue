<template>
  <div class="independent">
    <el-dialog class="independent" :visible.sync="$store.state.Passageway" width="30%" :before-close="closedialogs" append-to-body>
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/通道切图/通道icon.png" alt />
          <div class="headertitle">通道</div>
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
        <iframe src="./html/passageway.html" width="868" height="355" frameborder="0" scrolling="auto"></iframe>
      </div>
      <div class="tabsbox">
        <div class="tabslistbox">
          <div :class="cur == index ? 'switchbutton' :'switchbuttonnone'" v-for="(item,index) in tabslist" :key="index"
            @click="tabschage(index)">{{item}}</div>
        </div>
        <div class="righticonbox" @click="heightchage = !heightchage">
          <img src="../../assets/img/components-dialog/下拉.png" alt />
        </div>
      </div>
      <el-collapse-transition>
        <div v-show="heightchage">
          <div class="tablemain" v-if="cur == 0">
            <div class="leftone">
              <div class="tableleftkey" v-for="(item,index) in information.tabletopkey" :key="index">{{item}}</div>
            </div>
            <div class="lefttwo">
              <div class="tableleftvalue" v-for="(item,index) in information.tabletop" :key="index">{{item}}</div>
            </div>
            <div class="leftone">
              <div class="tableleftkey" v-for="(item,index) in information.tabletopkey2" :key="index">{{item}}</div>
            </div>
            <div class="leftthree">
              <div class="tableleftvalue2" v-for="(item,index) in information.tabletop2" :key="index">{{item}}</div>
            </div>
          </div>

          <div class="tablemain" v-if="cur == 1">
            <el-table :data="serviceData" style="width: 100%" height="227" key="business">
              <el-table-column prop="name" label="名称" width="300" show-overflow-tooltip sortable >
                <template slot-scope="scope">
                  <span class="colors" @click="openBusiness">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="globalName" label="全局名称" width="160" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="system" label="所属业务系统" width="180" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="businessType" label="业务类型" width="110" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="detailedBusinessType" label="详细业务类型" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="APlat" label="A站点" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="ZPlat" label="Z站点" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="interfaceType" label="接口类型" width="110" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="specialCoreOrNot" label="是否专用纤芯" width="140"></el-table-column>
              <el-table-column prop="channelsNum" label="通道数量" width="110" show-overflow-tooltip sortable></el-table-column>
              <!-- <el-table-column prop="startBusinessType" label="起点业务设备" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="endBusinessType" label="终点业务设备" width="120" show-overflow-tooltip sortable>
              </el-table-column>-->
              <el-table-column prop="startBusinessDesc" label="起点业务说明" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="endBusinessDesc" label="终点业务说明" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="methodNo" label="方式单号" width="200"></el-table-column>
              <el-table-column prop="dispatchingUnit" label="调度单位" width="120"  show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="dispatchingLevel" label="调度等级" width="110" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="userUnit" label="使用单位" width="120"  show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="status" label="状态" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="startTime" label="开通日期" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="endTime" label="退出日期" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="remarks" label="备注" show-overflow-tooltip sortable></el-table-column>
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
        tabslist: ["基本信息", "承载业务"],
        tabletopkey: [],
        tabletopkey2: [],
        tabletop: [],
        tabletop2: [],
        //基础信息
        information: {
          tabletopkey: [
            "名称",
            "A端网元",
            "A端站点",
            "通道类型",
            "速率",
            "",
          ],
          tabletopkey2: ["运行状态", "Z端网元",
            "Z端站点",
            '备注', '', ''
          ],
          tabletop: [
            "E_2M[桃乡I:1框-11槽-1端口-时隙：1 尖山变：1框-11槽-3端口-时隙：1]",
            "500kV桃乡变ZXMP S390(桃乡1)",
            "500kV桃乡变",
            "SDH通道",
            "2M",
            ""
          ],
          tabletop2: ["在役", "500kV尖山变ZXMP S390(尖山1)", "500kV尖山变", '', '']
        },
        //业务
        serviceData: [{
          name: "(500kV桃乡变~500kV尖山变)继电保护01",
          globalName: "川(500kV桃乡变~500kV尖山变)继电保护01",
          system: "省网继电业务保护系统",
          businessType: "继电保护",
          detailedBusinessType: "",
          APlat: "500kV尖山变",
          ZPlat: "500kV桃乡变",
          interfaceType: "2M",
          specialCoreOrNot: "否",
          channelsNum: "1",
          startBusinessType: "",
          endBusinessType: "",
          startBusinessDesc: "",
          endBusinessDesc: "",
          methodNo: "方式-2019-四川-桃乡-1837",
          dispatchingUnit: "国网四川电力公司",
          dispatchingLevel: "三级网",
          userUnit: "国网四川电力公司",
          status: "在役",
          startTime: "2012-06-16",
          endTime: "",
          remarks: "通调方字[2012]06-J-009"
        }],
      };
    },
    mounted() {
       window["transmissiontopos"] = (res) => {
      console.log(res);
      this.changeopen(res);
    };
    },
    methods: {
      changeopen(val) {
      if (val == "传输拓扑图") {
        console.log(val, 1);

        this.$store.commit("openTransTopology", {
          boolean: true,
        });
      } else if (val == "光缆拓扑图") {
        console.log(val, 2);
        this.$store.commit("openopticalcable", {
          boolean: true,
        });
        this.$emit("save");
      }
    },
      tabschage(index) {
        this.cur = index;
      },
      closedialogs() {
        this.$store.commit("openPassageway", {
          boolean: false
        });
      },
      handleClose(done) {
        console.log(done);
      },
      changeheight() {
        this.heightchage = !this.heightchage;
      },
      openBusiness() {
        this.$store.commit("openBusiness", {
          boolean: true
        })
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
          height: 353px;
          width: 864px;
          border: 2px solid #e5e5e5;
          display: flex;
          margin: 4px auto 0;

          .mainleftside {
            width: 627px;
            height: 100%;
            position: relative;
            background: url("../../assets/img/components-dialog/dialogbj2.png") no-repeat center;
            background-size: cover;

            .maintopbox {
              width: 627px;
              height: 65px;
              display: flex;
              justify-content: space-between;

              .topiconbox {
                height: 46px;
                width: 105px;
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
              width: 250px;

              // background: chartreuse;
              .gpsbox {
                display: flex;
                justify-content: flex-end;

                img {
                  height: 19px;
                  margin-right: 15px;
                }

                .gpstitle {
                  font-size: 13px;
                  line-height: 19px;
                  color: #fff;
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
            // background-size: 100% auto;
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
              align-items: center;
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
                height: 64px;
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
                  line-height: 25px;
                  color: #fff;

                  .numbers {
                    font-size: 15px;
                    line-height: 25px;
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
          height: 228px;
          border: 2px solid #e5e5e5;
          margin: 0 auto 5px;
          display: flex;
          overflow: auto;

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
            width: calc(50% - 115px);

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
            width: calc(50% - 115px);

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

          /deep/.el-table {
            .el-table__header tr,
            .el-table__header th {
              padding: 0;
              height: 38px;
              background: #f2f2f2;
              font-weight: 400;
              color: #000;
              font-size: 14px;
            }

            .el-table__body tr,
            .el-table__body td {
              padding: 0;
              height: 38px;
              color: #000;
              font-size: 14px;
            }

            .colors {
              color: #297fb8;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
</style>