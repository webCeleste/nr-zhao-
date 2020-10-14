<template>
  <div class="independent">
    <el-dialog class="independent" :visible.sync="$store.state.computerroom" width="30%" :before-close="closedialogs"
      append-to-body>
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/components-dialog/machineroomicon.png" alt />
          <div class="headertitle">通信机房</div>
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
              <div class="topicontxt">通信机房01</div>
            </div>
            <div class="topiconbox"></div>
          </div>
          <div class="mainbottombox">
            <div class="machine" style="top:15px;left:15px;">
              <img src="../../assets/img/components-dialog/aircondition.png" style="width:30px">
              <p>空调</p>
            </div>
            <div class="machine" style="top:130px;right:10px;transform:rotate(90deg)">
              <img src="../../assets/img/components-dialog/aircondition.png" style="width:30px">
              <p>空调</p>
            </div>
            <iframe src="./html/machineBasic.html" width="610" height="350" frameborder="0" scrolling="auto"></iframe>
          </div>
        </div>
        <div class="links"></div>
        <div class="mainrightside">
          <div class="mainsbox">
            <div class="buttonicon">
              <!-- 跳转 -->
              <img src="../../assets/img/components-dialog/3Droad.png" @click="showRealscene" title="3D机房图" />
              <img src="../../assets/img/components-dialog/实景图标.png" @click="showPhoto" title="资源实景图" />
            </div>
            <div class="business" style="background: #297fb8;">
              <div class="toptxt">通信设备</div>
              <div class="numboxs">
                <div class="numbers">28</div>
                <div>台</div>
              </div>
            </div>
            <div class="business" style="background: #60c987;">
              <div class="toptxt">通信电源</div>
              <div class="numboxs">
                <div class="numbers">10</div>
                <div>台</div>
              </div>
            </div>
            <div class="business" style="background: #f1c40f;">
              <div class="toptxt">承载通道</div>
              <div class="numboxs">
                <div class="numbers">15</div>
                <div>条</div>
              </div>
            </div>
            <div class="business" style="background: #209175;">
              <div class="toptxt">承载光路</div>
              <div class="numboxs">
                <div class="numbers">15</div>
                <div>条</div>
              </div>
            </div>
            <div class="business" style="background: #f9743f;">
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
          <!-- 通信设备 -->
          <div class="tablemain" v-else-if="cur == 1">
            <el-table :data="equipmentData" style="width: 100%" height="157" key="equipmentData">
              <el-table-column prop="name" label="名称" width="230" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <span class="colors" @click="equipment">{{scope.row.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="system" label="所属系统" width="180" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="machineroom" label="所属机房" width="150" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="manufacturer" label="生产厂家" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="manufacturertype" label="厂家设备类型" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="runningstate" label="运行状态" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="operation" label="投运日期" width="100" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="maintenance" label="运维单位" width="120" show-overflow-tooltip sortable></el-table-column>
              <el-table-column prop="assets" label="资产单位" width="120" show-overflow-tooltip sortable></el-table-column>
            </el-table>
          </div>
          <!-- 通信电源 -->
          <div class="tablemain" v-else-if="cur == 2">
            <el-table :data="powerSupplyData" style="width: 100%" height="157" key="powerSupplyData">
              <el-table-column prop="name" label="名称" width="250" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <span class="colors" @click="powerSuppy">{{scope.row.name}}</span>
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
          <!-- 接入业务 -->
          <div class="tablemain" v-else-if="cur == 3">
            <el-table :data="serviceData" style="width: 100%" height="157" key="serviceData">
              <el-table-column prop="name" label="名称" width="220" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <el-button @click.native.prevent="service(scope.$index, serviceData)" type="text" size="small">
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
              <el-table-column prop="APlat" label="A站点" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="ZPlat" label="Z站点" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="interfaceType" label="接口类型" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="specialCoreOrNot" label="是否专用纤芯" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="channelsNum" label="通道数量" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="startBusinessDesc" label="起点业务说明" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="endBusinessDesc" label="终点业务说明" width="140" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="methodNo" label="方式单号" width="180" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="dispatchingUnit" label="调度单位" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="dispatchingLevel" label="调度等级" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="userUnit" label="使用单位" width="120" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="status" label="状态" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="startTime" label="开通日期" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="endTime" label="退出日期" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="remarks" label="备注" show-overflow-tooltip sortable>
              </el-table-column>
            </el-table>
          </div>
          <!-- 承载光路 -->
          <div class="tablemain" v-else-if="cur == 4">
            <el-table :data="lightPathData" style="width: 100%" height="157" key="lightPathData">
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
              <el-table-column prop="ZResources" label="Z端资源" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="opticalPathLength" label="光路长度（千米）" width="160" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="numberIncluding" label="包含光缆段纤芯数" width="180" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="coreRoutingDesc" label="纤芯路由描述" width="180" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="methodNo" label="方式单号" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="occupancyRate" label="占用率" width="100" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="whetherLightCutting" label="是否配置光切" width="180" show-overflow-tooltip sortable>
              </el-table-column>
              <el-table-column prop="remarks" label="备注" show-overflow-tooltip sortable>
              </el-table-column>
            </el-table>
          </div>
          <!-- 承载通道 -->
          <div class="tablemain" v-else-if="cur == 5">
            <el-table :data="passagewayData" style="width: 100%" height="157" key="passagewayData">
              <el-table-column prop="name" label="名称" width="240" show-overflow-tooltip sortable>
                <template slot-scope="scope">
                  <el-button @click.native.prevent="passageway(scope.$index, passagewayData)" type="text" size="small">
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
          <div class="tablemain" v-else-if="cur == 6">
            <el-table :data="workorderData" style="width: 100%" height="157" key="workorderData">
              <el-table-column prop="no" label="工单编号" width="240" show-overflow-tooltip sortable>
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
          <div class="tablemain" v-else-if="cur == 7">
            <el-table :data="resumeData" style="width: 100%" height="157" key="resumeData">
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
        tabslist: ["基本信息", "通信设备", "通信电源", "接入业务", "承载光路", "承载通道", "运维工单", "运行履历"],
        //基本信息
        tabletopkey: ["名称", "机房类型", '资产单位', '机房宽度（米）', '机房面积（平方米）', '空调方式', '取暖方式', '是否动环监控', '机房位置', '备注'],
        tabletopkey2: ["所属站点", '机房编号', '运维单位', '机房进深（米）', '机房高度（米）', '架空地板高度（米）', '消防方式', '走线方式', '房间承重'],
        tabletop: ['通信机房01', '通信机房', '国网四川检修公司', '10', '120', '', '', '否', '', ''],
        tabletop2: ['500kV桃乡变', '85797', '国网四川检修公司', '12', '3', '0.5', '', '', ''],
        // 通信设备
        equipmentData: [{
            name: "500kV桃山变ZXMP S390(桃山1)",
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
          {
            name: "500kV桃山变ZXMP S390(桃山2)",
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
          {
            name: "500kV桃山变ZXMP S390(桃山3)",
            system: "省网中兴SDH光传输系统",
            machineroom: "H01-1楼通信机房",
            manufacturer: "中兴",
            manufacturertype: "HWMP S390",
            runningstate: "在役",
            operation: "2005-06-25",
            maintenance: "国网四川检修公司",
            assets: "国网四川检修公司",
            technical: "国网四川检修公司",
            equipments: ""
          }
        ],
        // 通信电源
        powerSupplyData: [{
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
          rate: '155M',
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
          methodNo: '',
          occupancyRate: '80%',
          whetherLightCutting: '否',
          remarks: ''
        }],
        // 承载通道
        passagewayData: [{
          name: 'E_2M[桃乡I1框-11槽-1端口~时隙：1<>尖山变：1框-11槽-3端口！时隙：1',
          globalName: '',
          runningState: '正常',
          channelType: 'SDH通道',
          rate: '2M',
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
        }, {
          name: 'E_2M[桃乡I:2框-11槽-1端口-时隙：1 尖山变：1框-11槽-3端口-时隙：1]',
          globalName: '',
          runningState: '正常',
          channelType: 'SDH通道',
          rate: '2M',
          AType: '',
          ZType: '',
          AResources: '',
          ZResources: '',
          APlat: '500kV桃乡变',
          ZPlat: '500kV尖山变',
          ANetwork: '500kV桃乡变ZXMP S390（桃乡2）',
          ZNetwork: '500kV尖山变ZXMP S390（尖山2）',
          coreRoutingDesc: '',
          remarks: ''
        }],
        // 运维工单
        workorderData: [{
          type: '检修',
          no: '检修-20140805-西南-四川-成都-1',
          title: '检修-20140805-西南-四川-成都-1',
          state: '已归档',
          time: '2012-12-14 13:51'
        }],
        // 运行履历
        resumeData: [{
          type: '检修',
          title: '检修-20140805-西南-四川-成都-1',
          content: '陡贾一、二线纵联电流差动保护（RCS-931AM）电路方式由高频变更为2M',
          time: '2012-12-14 13:51'
        }],
        // 
        equipmentName: '',
        machineName: ['综合配线柜3#', '综合配线柜2#', '综合配线柜1#', '华中网光纤维传输机柜', '省网ECI XMD-1000XSDH光传输柜', '省网中兴S390 SDH光传输柜',
          '三峡干线光传输设备屏', '行波测距接口柜', '通信接口柜3#', '通信接口柜2#', '通信接口柜1#', 'PCM设备机柜', '调度程控交换机柜', '音频配线架柜', '2M切换装置屏',
          '综合自动化系统设备机柜', '光电转换接口柜', '稳控通信接口柜', '地网华为OSN2500设备机柜', '地网PCM设备机柜', '综合数据网设备机柜', '48V通信蓄电池柜2#',
          '48V充电机柜2#', '48V直流馈线柜2#', '48V直流馈线柜1#', '48V充电机柜1#', '48V通信蓄电池柜1#'
        ],
      };
    },
    created() {
      window["basicDialog"] = () => {
        this.openBasicDialog();
      };
    },
    methods: {
      closedialogs() {
        this.$store.commit("opencomputerroom", {
          boolean: false
        });
      },
      handleClose(done) {
        console.log(done);

      },
      // 打开设备卡片
      equipment() {
        this.$store.commit("openequipment", {
          boolean: true
        })
      },
      lightpath() {
        this.$store.commit("openLightpath", {
          boolean: true
        })
      },
      // 电源卡片
      powerSuppy() {
        this.$store.commit("openPowerSupply", {
          boolean: true
        })
      },
      service() {
        this.$store.commit("openBusiness", {
          boolean: true
        })
      },
      passageway() {
        this.$store.commit("openPassageway", {
          boolean: true
        })
      },
      // 打开机柜卡片
      openBasicDialog() {
        this.$store.commit("opencabinet", {
          boolean: true
        });
      },
      changeheight() {
        this.heightchage = !this.heightchage;
      },
      showPhoto() {
        this.$store.commit("openliveview", {
          boolean: true
        });
      },
      showRealscene() {
        this.$store.commit("openD3machineroom", {
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
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
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
          height: 430px;
          width: 864px;
          border: 2px solid #e5e5e5;
          display: flex;
          margin: 4px auto 0;
          // background: #F8FAF9;

          .mainleftside {
            width: 627px;
            height: 100%;
            position: relative;

            .maintopbox {
              width: 627px;
              height: 55px;
              display: flex;
              justify-content: space-between;

              .topiconbox {
                height: 46px;
                width: 120px;
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

            .mainbottombox {
              position: relative;
              margin: auto;
              width: 610px;
              height: 350px;
              // background-color: #C8FEE6;
              background: url("../../assets/img/components-dialog/comRoomBg.png") no-repeat center;
              background-size: 610px 350px;

              .machine {
                position: absolute;

                p {
                  color: #000;
                  font-size: 12px;
                }
              }

              .jigui {
                p {
                  position: absolute;
                  top: 9px;
                  left: 12px;
                  font-size: 12px;
                  color: #fff;
                }
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
          height: 157px;
          border: 2px solid #e5e5e5;
          margin: 0 auto 5px;
          display: flex;
          overflow-y: auto;

          .cell span {
            font-size: 14px;
            color: #297FB8;
            cursor: pointer;
          }

          .leftone {
            width: 130px;

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
            width: 293px;

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
        }
      }
    }
  }
</style>