<template>
  <div class="independent">
    <el-dialog class="independent" :visible.sync="$store.state.site" width="30%" :before-close="closedialogs"
      append-to-body>
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/components-dialog/独立通信站.png" alt />
          <div class="headertitle">通信站</div>
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
              <div class="topicontxt">四川电网</div>
            </div>
            <div class="maincenterbox">
              <div class="hedertitle">500kV桃乡变</div>
              <div class="numcenter">01129901010004</div>
            </div>
            <div class="topiconbox"></div>
          </div>
          <div class="bootoomrightbox">
            <div class="gpsbox">
              <img src="../../assets/img/components-dialog/定位.png" alt />
              <div class="gpstitle">四川省成都市</div>
            </div>
            <div class="gpsnumbox">(北纬N:39.5694°，东经E:111.3800°)</div>
          </div>
        </div>
        <div class="links"></div>
        <div class="mainrightside">
          <div class="mainsbox">
            <div class="buttonicon">
              <img style="margin-left:23px" src="../../assets/img/components-dialog/站点拓扑图.png" @click="chagesidetopo"
                title="站点平面图" alt />
              <img src="../../assets/img/components-dialog/站点光缆拓扑图.png" @click="handleops" title="站点光缆拓扑图" alt />
              <img src="../../assets/img/components-dialog/电源拓扑图.png" title="电源接线图" @click="handlepowersupply" alt />
              <img src="../../assets/img/components-dialog/资源实景图.png" @click="closedialogsplan" title="资源实景图" />
            </div>
            <div class="business" style="background: #297fb8;" @click="cur = 2;">
              <div class="toptxt">通信设备</div>
              <div class="numboxs">
                <div class="numbers">28</div>
                <div>个</div>
              </div>
            </div>
            <div class="business" style="background: #60c987;" @click="cur = 3;">
              <div class="toptxt">通信电源</div>
              <div class="numboxs">
                <div class="numbers">5</div>
                <div>个</div>
              </div>
            </div>
            <div class="business" style="background: #f1c40f;" @click="cur = 4;">
              <div class="toptxt">通信光缆</div>
              <div class="numboxs">
                <div class="numbers">15</div>
                <div>条</div>
              </div>
            </div>
            <div class="business" style="background: #f9743f;" @click="cur = 5;">
              <div class="toptxt">接入业务</div>
              <div class="numboxs">
                <div class="numbers">100</div>
                <div>条</div>
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
            <el-table :data="computerroom" style="width: 100%" height="227" key="computerroom">
              <el-table-column prop="name" label="名称" width="180" class="colors" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <span class="colors" @click="opencomputerroom">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="type" label="机房类型" width="150" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="maintenance" label="运维单位" width="180" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="assets" label="资产单位" width="180" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="monitor" label="是否动环监控" show-overflow-tooltip sortable></el-table-column>
            </el-table>
          </div>
          <div class="tablemain" v-if="cur ==2">
            <el-table :data="equipment" style="width: 100%" height="227" key="equipment">
              <el-table-column prop="name" label="名称" width="230" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <span class="colors" @click="openequipment">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="system" label="所属系统" width="180" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="machineroom" label="所属机房" width="150" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="manufacturer" label="生产厂家" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="manufacturertype" label="厂家设备类型" width="130" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="runningstate" label="运行状态" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="operation" label="投运日期" width="100" sortable show-overflow-tooltip ></el-table-column>
              <el-table-column prop="maintenance" label="运维单位" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="assets" label="资产单位" width="120" show-overflow-tooltip sortable></el-table-column>
              <!-- <el-table-column prop="technical" label="技术体制" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="equipments" label="设备类型" width="80" show-overflow-tooltip></el-table-column>-->
            </el-table>
          </div>

          <div class="tablemain" v-if="cur ==3">
            <el-table :data="powersupply" style="width: 100%" height="227" key="powersupply">
              <el-table-column prop="name" label="名称" width="250" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <span class="colors" @click="openpowersupply">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="machineroom" label="所属机房" width="150" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="manufacturer" label="生产厂家" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="manufacturertype" label="厂家设备类型" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="runningstate" label="运行状态" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="operation" label="投运日期" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="maintenance" label="运维单位" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="assets" label="资产单位" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="powersupply" label="电源类型" width="100" show-overflow-tooltip sortable></el-table-column>
            </el-table>
          </div>

          <div class="tablemain" v-if="cur ==4">
            <el-table :data="opticalcable" style="width: 100%" height="227" key="opticalcable">
              <el-table-column prop="name" label="名称" width="270" show-overflow-tooltip sortable>
                <!-- <template slot-scope="scope">
                  <span class="colors" @click="openopticalcable">{{scope.row.name}}</span>
                </template>-->
              </el-table-column>
              <el-table-column prop="rise" label="起点" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="end" label="终点" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="runningstate" label="运行状态" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="operation" label="投运日期" width="110" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="maintenance" label="运维单位" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="assets" label="资产单位" width="150" show-overflow-tooltip sortable></el-table-column>
            </el-table>
          </div>

          <div class="tablemain" v-if="cur == 5">
            <el-table :data="serviceData" style="width: 100%" height="227" key="serviceData">
              <el-table-column prop="name" label="名称" width="340" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <span class="colors" @click="openbusiness">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="globalName" label="全局名称" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="system" label="所属业务系统" width="180" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="businessType" label="业务类型" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="detailedBusinessType" label="详细业务类型" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="APlat" label="A站点" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="ZPlat" label="Z站点" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="interfaceType" label="接口类型" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="specialCoreOrNot" label="是否专用纤芯" width="140" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="channelsNum" label="通道数量" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="startBusinessDesc" label="起点业务说明" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="endBusinessDesc" label="终点业务说明" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="methodNo" label="方式单号" width="200" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="dispatchingUnit" label="调度单位" width="140" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="dispatchingLevel" label="调度等级" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="userUnit" label="使用单位" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="status" label="状态" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="startTime" label="开通日期" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="endTime" label="退出日期" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="remarks" label="备注" width="100" show-overflow-tooltip sortable></el-table-column>
            </el-table>
          </div>

          <div class="tablemain" v-if="cur == 6">
            <el-table :data="workorder" style="width: 100%" height="227" key="workorder">
              <el-table-column prop="workorderno" label="工单编号" width="260" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <span class="colors" @click="handleEdit(scope.$index, scope.row)">{{scope.row.workorderno}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="标题" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="types" label="工单状态" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="starttime" label="发起时间" width="120" show-overflow-tooltip sortable></el-table-column>
            </el-table>
          </div>

          <div class="tablemain" v-if="cur == 7">
            <el-table :data="resume" style="width: 100%" height="227" key="resume">
              <el-table-column prop="type" label="类型" width="80" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="title" label="标题" width="250" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="main" label="内容" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="happendate" label="发生时间" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column label="操作" show-overflow-tooltip sortable width="80">
                <template slot-scope="scope">
                  <span class="colors" @click="handleEdit(scope.$index, scope.row)">查看详情</span>
                </template>
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
        indexs: "false",
        heightchage: true,
        tabslist: [
          "基本信息",
          "站内机房",
          "站内设备",
          "站内电源",
          "通信光缆",
          "接入业务",
          "运行工单",
          "运行履历"
        ],
        tabletopkey: [],
        tabletopkey2: [],
        tabletop: [],
        tabletop2: [],
        //基础信息
        information: {
          tabletopkey: [
            "变电站名称",
            "资产单位",
            "纬度",
            "经度",
            "维护单位",
            "所属调度机构",
            "资产归属性质"
          ],
          tabletopkey2: [
            "投运日期",
            "运行状态",
            "所属电网",
            "行政区划",
            "最高电压等级",
            "类型",
            "退运日期"
          ],
          tabletop: [
            "500kV桃乡变",
            "国网四川检修公司",
            "N:39.5694°",
            "E:111.3800°",
            "国网四川检修公司",
            "四川国电调控中心",
            ""
          ],
          tabletop2: [
            "2005-06-25",
            "在役",
            "国网四川检修公司",
            "国网四川检修公司",
            "500kV",
            "",
            ""
          ]
        },
        //机房
        computerroom: [{
          name: "H01-1楼通信机房",
          type: "通信机房",
          maintenance: "国网四川检修公司",
          assets: "国网四川检修公司",
          monitor: "否"
        }],
        //设备
        equipment: [{
            name: "500kV桃乡变ZXMP S390(桃乡1)",
            system: "省网中兴SDH光传输系统",
            machineroom: "H01-1楼通信机房",
            manufacturer: "中兴",
            manufacturertype: "ZTEMP S390",
            runningstate: "在役",
            operation: "2001-06-25",
            maintenance: "国网四川检修公司",
            assets: "国网四川检修公司",
            technical: "国网四川检修公司",
            equipments: ""
          },
            {
              name: "500kV桃乡变ZXMP S390(桃乡3)",
              system: "省网中兴SDH光传输系统",
              machineroom: "H01-1楼通信机房",
              manufacturer: "中兴",
              manufacturertype: "HWMP S390",
              runningstate: "在役",
              operation: "2002-06-25",
              maintenance: "国网四川检修公司",
              assets: "国网四川检修公司",
              technical: "国网四川检修公司",
              equipments: ""
            },
          {
            name: "500kV桃乡变ZXMP S390(桃乡2)",
            system: "省网中兴SDH光传输系统",
            machineroom: "H01-1楼通信机房",
            manufacturer: "中兴",
            manufacturertype: "ZTEMP S390",
            runningstate: "在役",
            operation: "2005-06-25",
            maintenance: "国网四川检修公司",
            assets: "国网四川检修公司",
            technical: "国网四川检修公司",
            equipments: ""
          },
        ],
        //电源
        powersupply: [{
          name: "H01-1楼通信机房/泰昂整流电源01",
          machineroom: "H01-1楼通信机房",
          manufacturer: "中兴",
          manufacturertype: "DC-DC",
          runningstate: "在役",
          operation: "2005-06-25",
          maintenance: "国网四川检修公司",
          assets: "国网四川检修公司",
          powersupply: "直流开关电源"
        }],
        //光缆
        opticalcable: [{
          name: "(500kV桃乡变-500kV尖山变) 光缆01",
          rise: "500kV桃乡变",
          end: "500kV尖山变",
          runningstate: "在役",
          operation: "2005-06-25",
          maintenance: "国网四川检修公司",
          assets: "国网四川检修公司"
        }],
        //业务
        // 接入业务
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
        //工单
        workorder: [{
          type: "检修",
          workorderno: "检修-20140805-西南-四川-成都-1",
          title: "检修-20140805-西南-四川-成都-1",
          order: "",
          types: "处理中",
          starttime: "2012-06-25"
        }],
        //履历
        resume: [{
            type: "检修",
            title: "检修-20140805-西南-四川-成都-1",
            main: ` 2019年3月22日-09：00-20：00
                  1.北站调度交换机设备2M中继切改至桃乡站
          `,
            happendate: "2019-03-22"
          },
          {
            type: "缺陷",
            title: "缺陷-20190408-西南-川南-成都-1",
            main: ` 缺陷现象描述：湖南地区SDH华为网管有告警产生
          `,
            happendate: "2019-04-08"
          },
          {
            type: "方式",
            title: "方式-20190411-西南-川南-成都-1",
            main: ` 2019-F1577-1583（220kV槐安传输设备改造相关方式）
          `,
            happendate: "2019-04-11"
          }
        ]
      };
    },
    mounted() {},
    methods: {
      openbusiness() {
        this.$store.commit("openBusiness", {
          boolean: true
        });
      },
      openopticalcable() {
        this.$store.commit("openopticalcable", {
          boolean: true
        });
      },
      openpowersupply() {
        this.$store.commit("openPowerSupply", {
          boolean: true
        });
      },
      openequipment() {
        this.$store.commit("openequipment", {
          boolean: true
        });
      },
      opencomputerroom() {
        this.$store.commit("opencomputerroom", {
          boolean: true
        });
      },
      handleEdit(index, row) {
        console.log(index, row)
        if (row.type === "方式") {
          console.log("方式");
          this.$store.commit("openmethodsheet", {
            boolean: true
          });
        } else if (row.type === "检修") {
          console.log("检修");
          this.$store.commit("openchecklist", {
            boolean: true
          });
        } else if (row.type === "缺陷") {
          console.log("缺陷");
          this.$store.commit("opendefectlist", {
            boolean: true
          });
        }
      },
      tabschage(index) {
        this.cur = index;
      },
      handlepowersupply() {
        this.$store.commit("openConnection", {
          boolean: true
        });
      },
      handleops() {
        this.$store.commit("openopticalcable", {
          boolean: true
        });
        this.$emit("save");
      },
      chagesidetopo() {
        this.$store.commit("opensitetopo", {
          boolean: true
        });
      },
      closedialogsplan() {
        this.$store.commit("openliveview", {
          boolean: true
        });
      },
      closedialogs() {
        this.$store.commit("opensite", {
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
          height: 356px;
          width: 864px;
          border: 2px solid #e5e5e5;
          display: flex;
          margin: 4px auto 0;

          .mainleftside {
            width: 627px;
            height: 100%;
            position: relative;
            background: url("../../assets/img/components-dialog/dialogbj1.png") no-repeat center;
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
                  color: #000;
                }
              }

              .gpsnumbox {
                display: flex;
                justify-content: flex-end;
                height: 38px;
                line-height: 38px;
                font-size: 13px;
                text-decoration: underline;
                color: #297fb8;
                font-weight: 600;
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
                cursor: pointer;

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

                  .numbers {
                    font-size: 25px;
                    line-height: 35px;
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

          .colors {
            color: #297fb8;
            cursor: pointer;
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