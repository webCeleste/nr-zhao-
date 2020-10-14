<template>
  <div class="independent">
    <el-dialog class="independent" :visible.sync="$store.state.equipment" width="30%" :before-close="closedialogs" append-to-body>
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/components-dialog/传输设备图标.png" alt />
          <div class="headertitle">传输设备</div>
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
              <div class="topicontxt">{{tabletop[0]}}</div>
            </div>
            <div class="topiconbox"></div>
          </div>
          <img src="../../assets/img/components-dialog/equipmentLogo.png" class="mainImg">
          <div class="bootoomrightbox">
            <div class="gpsbox" style="text-decoration: underline;cursor: pointer;" @click="openSiteDialog">
              <img src="../../assets/img/components-dialog/站点信息.png" alt />
              <div class="gpstitle">500kV桃乡变</div>
            </div>
            <div class="gpsbox">
              <img src="../../assets/img/components-dialog/所属系统.png" alt />
              <div class="gpstitle">ZXMP S390</div>
            </div>
            <div class="gpsbox">
              <img src="../../assets/img/components-dialog/设备型号.png" alt />
              <div class="gpstitle">{{tabletop2[1]}}</div>
            </div>
          </div>
        </div>
        <div class="links"></div>
        <div class="mainrightside">
          <div class="mainsbox">
            <div class="buttonicon">
              <img src="../../assets/img/components-dialog/设备面板图标.png" alt @click="showEquipPanelDiagram"
                title="设备面板图" />
              <img src="../../assets/img/components-dialog/传输拓扑图.png" alt @click="showTransTopology" title="传输拓扑图" />
              <img src="../../assets/img/components-dialog/实景图标.png" alt @click="showPhoto" title="资源实景图" />
            </div>
            <div class="business" style="background: #297fb8;">
              <div class="toptxt">接入业务</div>
              <div class="numboxs">
                <div class="numbers">100</div>
                <div>条</div>
              </div>
            </div>
            <div class="business" style="background: #60c987;">
              <div class="toptxt">承载通道</div>
              <div class="numboxs">
                <div class="numbers">15</div>
                <div>条</div>
              </div>
            </div>
            <div class="business" style="background: #f1c40f;">
              <div class="toptxt">承载光路</div>
              <div class="numboxs">
                <div class="numbers">15</div>
                <div>条</div>
              </div>
            </div>
            <div class="business" style="background: #f9743f;">
              <div class="toptxt">运维信息</div>
              <div class="numboxs">
                <div class="numbers">5</div>
                <div>项</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tabsbox">
        <div class="tabslistbox">
          <div :class="cur == index ? 'switchbutton' :'switchbuttonnone'" v-for="(item,index) in tabslist" :key="index"
            @click="cur = index">{{item}}</div>
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
              <div class="tableleftvalue" v-for="(item,index) in tabletop" :key="index"> {{item}} </div>
            </div>
            <div class="leftone" v-if="tabletopkey2.length != 0">
              <div class="tableleftkey" v-for="(item,index) in tabletopkey2" :key="index">{{item}}</div>
            </div>
            <div class="leftthree" v-if="tabletop2.length != 0">
              <div class="tableleftvalue2" v-for="(item,index) in tabletop2" :key="index">{{item}}</div>
            </div>
          </div>
          <!-- 接入业务 -->
          <div class="tablemain" v-else-if="cur == 1">
            <el-table :data="serviceData" style="width: 100%" height="227" key="serviceData">
              <el-table-column label="名称" width="220" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <el-button @click.native.prevent="business(scope.$index, serviceData)" type="text" size="small">
                    {{scope.row.name}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="globalName" label="全局名称" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="system" label="所属业务系统" width="180" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="businessType" label="业务类型" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="detailedBusinessType" label="详细业务类型" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="APlat" label="A站点" width="250" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZPlat" label="Z站点" width="250" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="interfaceType" label="接口类型" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="specialCoreOrNot" label="是否专用纤芯" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="channelsNum" label="通道数量" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="startBusinessType" label="起点业务设备" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="endBusinessType" label="终点业务设备" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="startBusinessDesc" label="起点业务说明" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="endBusinessDesc" label="终点业务说明" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="methodNo" label="方式单号" width="200">
              </el-table-column>
              <el-table-column prop="dispatchingUnit" label="调度单位" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="dispatchingLevel" label="调度等级" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="userUnit" label="使用单位" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="status" label="状态" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="startTime" label="开通日期" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="endTime" label="退出日期" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="remarks" label="备注" show-overflow-tooltip sortable>
              </el-table-column>
            </el-table>
          </div>
          <!-- 承载光路 -->
          <div class="tablemain" v-else-if="cur == 2">
            <el-table :data="lightPathData" style="width: 100%" height="227" key="lightPathData">
              <el-table-column label="名称" width="320" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <el-button @click.native.prevent="lightpath(scope.$index, lightPathData)" type="text" size="small">
                    {{scope.row.name}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="runningState" label="运行状态" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="channelType" label="通道类型" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="rate" label="速率" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="APlat" label="A端站点" width="260" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZPlat" label="Z端站点" width="260" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ANetwork" label="A端网元" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZNetwork" label="Z端网元" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="AType" label="A端资源类型" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZType" label="Z端资源类型" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="AResources" label="A端资源" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZResources" label="Z端资源"  width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="opticalPathLength" label="光路长度（千米）" width="160" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="numberIncluding" label="光缆段纤芯数" width="160" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="coreRoutingDesc" label="纤芯路由描述" width="160" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="methodNo" label="方式单号" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="occupancyRate" label="占用率" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="whetherLightCutting" label="是否配置光切" width="160" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="remarks" label="备注" show-overflow-tooltip sortable>
              </el-table-column>
            </el-table>
          </div>
          <!-- 承载通道 -->
          <div class="tablemain" v-else-if="cur == 3">
            <el-table :data="passagewayData" style="width: 100%" height="227" key="passagewayData">
              <el-table-column prop="name" label="名称" width="270" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <el-button @click.native.prevent="passageWay(scope.$index, passagewayData)" type="text" size="small">
                    {{scope.row.name}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="globalName" label="全局名称" width="240" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="runningState" label="运行状态" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="channelType" label="通道类型" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="rate" label="速率" width="80" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="APlat" label="A端站点" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZPlat" label="Z端站点" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ANetwork" label="A端网元" width="250" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZNetwork" label="Z端网元" width="250" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="AType" label="A端资源类型" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZType" label="Z端资源类型" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="AResources" label="A端资源" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZResources" label="Z端资源" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="coreRoutingDesc" label="纤芯路由描述" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="remarks" label="备注" show-overflow-tooltip sortable>
              </el-table-column>
            </el-table>
          </div>
          <!-- 运行工单 -->
          <div class="tablemain" v-else-if="cur == 4">
            <el-table :data="workorderData" style="width: 100%" key="workorderData">
              <el-table-column prop="no" label="工单编号" width="200" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <el-button @click.native.prevent="detailsRow(scope.$index, workorderData)" type="text" size="small">
                    {{scope.row.no}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column prop="title" label="标题" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="state" label="工单状态" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="time" label="发起时间" width="140" show-overflow-tooltip sortable>
              </el-table-column>
            </el-table>
          </div>
          <!-- 运行履历 -->
          <div class="tablemain" v-else-if="cur == 5">
            <el-table :data="resumeData" style="width: 100%" key="resumeData">
              <el-table-column prop="type" label="类型" width="80" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="title" label="标题" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="content" label="内容" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="time" label="发生时间" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column label="操作" width="80" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <el-button @click.native.prevent="detailsRow(scope.$index, resumeData)" type="text" size="small">
                    查看详情
                  </el-button>
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
        heightchage: true,
        tabslist: ["基本信息", "接入业务", "承载光路", "承载通道", "运行工单", "设备履历"],
        // 基本信息
        tabletopkey: ["名称", "简称", '所属站点', '生产厂家', '运行状态', '退运日期', '资产单位', '联系电话', '设备类型', '备注'],
        tabletopkey2: ["全局名称", '所属系统', '所属机房', '厂家设备类型', '投运日期', '运维单位', '维护人', '技术体制', 'ERP资产编码'],
        tabletop: ['500kV桃乡变ZXMP S390', '桃乡1', '500kV桃乡变', '中兴', '在役', '', '国网四川检修公司', '18181426786', 'ZXMP S390', ''],
        tabletop2: ['川.国网四川检修公司/省网中兴SDH光传输系统/500kV桃乡变ZXMP S390（桃乡1）', '省网中兴SDH光传输系统', 'H01-1楼通信机房', '默认', '2010-12-16',
          '国网四川检修公司', '刘维林', 'SDH', ''
        ],
        // 接入业务
        serviceData: [{
          name: '(500kV桃乡变~500kV尖山变)继电保护01',
          globalName: '川(500kV桃乡变~500kV尖山变)继电保护01',
          system: '省网继电业务保护系统',
          businessType: '继电保护',
          detailedBusinessType: '',
          APlat: '500kV桃乡变',
          ZPlat: '500kV尖山变',
          interfaceType: '2M',
          specialCoreOrNot: '否',
          channelsNum: '1',
          startBusinessType: '',
          endBusinessType: '',
          startBusinessDesc: '',
          endBusinessDesc: '',
          methodNo: '方式-2019-四川-桃乡-1837',
          dispatchingUnit: '国网四川电力公司',
          dispatchingLevel: '三级网',
          userUnit: '国网四川电力公司',
          status: '在役',
          startTime: '2012-06-16',
          endTime: '',
          remarks: '通调方字[2012]06-J-009'
        }],
        // 承载光路
        lightPathData: [{
          name: '(500kV桃乡变~500kV尖山变)中兴10G光路01',
          runningState: '在役',
          channelType: '',
          rate: '2M',
          AType: '',
          ZType: '',
          AResources: '',
          ZResources: '',
          APlat: '500kV桃乡变',
          ZPlat: '500kV尖山变',
          ANetwork: '',
          ZNetwork: '',
          opticalPathLength: '48',
          numberIncluding: '24',
          coreRoutingDesc: '',
          methodNo: '方式-2019-四川-桃乡-1837',
          occupancyRate: '80%',
          whetherLightCutting: '否',
          remarks: ''
        }],
        // 承载通道
        passagewayData: [{
          name: 'E_2M[桃乡I1框-11槽-1端口~时隙：1<>桃乡尖山变：1框-11槽-3端口！时隙：1',
          globalName: 'E_2M[桃乡I1框-11槽-1端口~时隙：1<>尖山变：1框-11槽-3端口！时隙：1',
          runningState: '在役',
          channelType: 'SDH通道',
          rate: '155M',
          AType: '',
          ZType: '',
          AResources: '',
          ZResources: '',
          APlat: '500kV桃乡变',
          ZPlat: '500kV尖山变',
          ANetwork: '500kV桃乡变ZXMP S390（桃乡1）',
          ZNetwork: '500kV尖山变ZXMP S390（尖山1）',
          coreRoutingDesc: '',
          remarks: ''
        }],
        // 运维工单
        workorderData: [{
          type: '方式',
          no: '方式-2019-四川-桃乡-1837',
          title: '方式-2019-四川-桃乡-1837',
          state: '已归档',
          time: '2019-11-28 17:34'
        }],
        // 运行履历
        resumeData: [{
          type: '方式',
          title: '方式-2019-四川-桃乡-1837',
          content: '四川省桃乡市',
          time: '2019-11-28 17:34'
        }]
      };
    },
    methods: {
      closedialogs() {
        this.$store.commit("openequipment", {
          boolean: false
        });
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
        })
      },
      // 实景图
      showPhoto() {
        this.$store.commit("openliveview", {
          boolean: true
        });
      },
      //传输拓扑图
      showTransTopology() {
        this.$store.commit("openTransTopology", {
          boolean: true
        });
      },
      // 设备面板图
      showEquipPanelDiagram() {
        this.$store.commit("openEquipPanelDiagram", {
          boolean: true
        });
      },
      // 履历 => 详情
      detailsRow(index, row) {
        if (row[index].type == "检修") {
          this.$store.commit("openchecklist", {
            boolean: true
          })
        } else if (row[index].type == "方式") {
          this.$store.commit("openmethodsheet", {
            boolean: true
          })
        } else if (row[index].type == "缺陷") {
          this.$store.commit("opendefectlist", {
            boolean: true
          })
        } else if (row[index].type == "风险预警") {
          this.$store.commit("openriskwarningsheet", {
            boolean: true
          })
        }
      },
      passageWay(index, row) {
        this.$store.commit("openPassageway", {
          boolean: true
        })
      },
      lightpath(index, row) {
        this.$store.commit("openLightpath", {
          boolean: true
        })
      },
      business(index, row) {
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
              left: 40%;
              transform: translate(-50%, -50%);
            }

            .maintopbox {
              width: 627px;
              height: 65px;
              display: flex;
              justify-content: space-between;

              .topiconbox {
                height: 46px;
                width: 220px;
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
              width: 180px;

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
          height: 227px;
          border: 2px solid #e5e5e5;
          margin: 0 auto 5px;
          display: flex;
          overflow-y: auto;

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

          /** el table ------ start */

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
            color: #297FB8;
            cursor: pointer;
          }

          /** el table ------ ending */
        }
      }
    }
  }
</style>