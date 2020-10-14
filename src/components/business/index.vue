<template>
  <div class="independent">
    <el-dialog class="independent" :visible.sync="$store.state.Business" width="30%" :before-close="closedialogs" append-to-body>
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/业务切图/业务icon.png" alt />
          <div class="headertitle">业务</div>
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
        <div class="tabboxs">
          <div v-for="(item,index) in lists" :key="index" :class="curs == index ? 'tabss' :'tabsy'"
            @click="curs = index">{{item}}</div>
        </div>
        <iframe :src="urls" width="868" height="350" frameborder="0" scrolling="auto"></iframe>
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
          <div class="tablemain" v-if="cur ==1">
            <el-table :data="passageway" style="width: 100%" height="227" key="passageway">
              <el-table-column prop="name" label="名称" width="350" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <span class="colors" @click="openPassageway">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="runningstate" label="运行状态" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="channeltype" label="通道类型" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="rate" label="速率" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="asite" label="A端站点" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="zsite" label="Z端站点" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="anetwork" label="A端网元" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="znetwork" label="Z端网元" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="remarks" label="备注" width="120" show-overflow-tooltip sortable></el-table-column>
            </el-table>
          </div>

          <div class="tablemain" v-if="cur ==2">
            <el-table :data="methodsheet" style="width: 100%" height="227" key="methodsheet">
              <el-table-column prop="num" label="方式单号" width="230" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <span class="colors" @click="openList">{{scope.row.num}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="标题" width="220" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="company" label="申请单位/部门" width="170" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="applicant" label="申请人" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="applicantnum" label="申请人联系电话" width="160" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="source" label="方式来源" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="main" label="申请内容" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="times" label="要求完成时间" width="140" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="remarks" label="备注" width="120" show-overflow-tooltip sortable></el-table-column>
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
        urls: "./html/business.html",
        cur: 0,
        curs: 0,
        heightchage: true,
        lists: ["简图", "详图"],
        tabslist: ["基本信息", "承载通道", "方式单"],
        tabletopkey: [],
        tabletopkey2: [],
        tabletop: [],
        tabletop2: [],
        //基础信息
        information: {
          tabletopkey: [
            "名称",
            "业务类型",
            "A站点",
            "开通日期",
            "起点业务设备",
            ""
          ],
          tabletopkey2: [
            "调度等级",
            "状态",
            "Z站点",
            "接口类型",
            "终点业务设备",
            ""
          ],
          tabletop: [
            "(500kV桃乡变-500kV尖山变)继电保护业务01",
            "继电保护",
            "500kV桃乡变",
            "2012-06-25",
            "",
            ""
          ],
          tabletop2: ["三级网", "在役", "500kV尖山变", "2M", "", ""]
        },
        //通道
        passageway: [{
          name: "E_2M[桃乡I:1框-11槽-1端口-时隙：1 尖山变：1框-11槽-3端口-时隙：1]",
          runningstate: "在役",
          channeltype: "SDH通道",
          rate: "2M",
          asite: "500kV桃乡变",
          zsite: "500kV尖山变",
          anetwork: "500kV桃乡变ZXMP S390(桃乡1)",
          znetwork: "500kV尖山变ZXMP S390(尖山1)",
          remarks: ""
        }],
        //业务
        methodsheet: [{
          num: "方式-2020-西南-四川-成都-0010",
          title: "方式-2020-西南-四川-成都-0010",
          company: "公司领导",
          applicant: "马跃",
          applicantnum: "13545781478",
          source: "直接启动的方式",
          main: "通道",
          times: "2020-03-02",
          remarks: ""
        }]
      };
    },
    watch: {
      curs(news) {
        if (news == 0) {
          // console.log(11111)
          this.urls = "./html/business.html";
        } else {
          // console.log(2222)
          this.urls = "./html/business1.html";
        }
      }
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
        this.$store.commit("openBusiness", {
          boolean: false
        });
      },
      handleClose(done) {
        console.log(done);
      },
      changeheight() {
        this.heightchage = !this.heightchage;
      },
      openPassageway() {
        this.$store.commit("openPassageway", {
          boolean: true
        });
      },
      openList() {
        this.$store.commit("openmethodsheet", {
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
          position: relative;

          .tabboxs {
            position: absolute;
            top: 50px;
            left: 20px;
            border: 1px solid #3ab5a0;
            font-size: 13px;
            width: 90px;
            height: 25px;
            border-radius: 3px;
            display: flex;
            text-align: center;
            cursor: pointer;

            .tabss {
              width: 45px;
              background: #3ab5a0;
              color: #fff;
              line-height: 25px;
            }

            .tabsy {
              width: 45px;
              background: #fff;
              line-height: 25px;
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
              color: #000;
              font-weight: 400;
              font-size: 14px;
              padding: 0;
              height: 38px;
              background: #f2f2f2;
            }

            .el-table__body tr,
            .el-table__body td {
              padding: 0;
              height: 38px;
              font-size: 14px;
              color: #000;
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