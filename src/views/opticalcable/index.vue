<template>
  <div class="optical">
    <el-row class="navs">
      <el-col :span="8" :offset="1" class="leftnav">
        <div class="logoimg">
          <img src="../../assets/img/opticalcable/yun.png" alt />
        </div>
        <div class="logotitle">通信全网搜索</div>
      </el-col>
      <el-col :span="6" :offset="9" class="imgbox">
        <div class="imgs" @click="changes">
          <img src="../../assets/img/opticalcable/编辑.png" alt />
        </div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/问号.png" alt />
        </div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/感叹号.png" alt />
        </div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/铃铛.png" @click="business" alt />
        </div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/个人.png" @click="passageway" alt />
        </div>
        <div class="texts" style="margin: 0 10px">Admin</div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/删除.png" @click="lightpath" alt />
        </div>
      </el-col>
    </el-row>
    <div class="opticalmain">
      <el-row>
        <el-col :span="8" :offset="1" class="inputs">
          <el-input v-model="query" placeholder="请输入内容"></el-input>
          <div class="sousuos">
            <img src="../../assets/img/opticalcable/sousuo.png" alt />
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="22" :offset="1" class="lishi">
          <div class="lishitxt">历史记录：</div>
          <div
            class="lisjl"
            v-for="(item,index) in querylist"
            :key="index"
            @click="changers(item)"
          >{{item}}</div>
        </el-col>
      </el-row>

      <el-row class="result">
        <el-row>
          <el-col :span="22" :offset="1" class="queryover">
            <div style="margin-left:10px">当前为您搜索到结果约3650个</div>
          </el-col>
        </el-row>
        <el-col
          :span="22"
          :offset="1"
          class="resultbox"
          v-for="(item,index) in resultlist"
          :key="index"
        >
          <div class="resutitle" @click="opencard(item)">
            <span v-html="brightenKeyword(item.title, query)"></span>
          </div>
          <div class="titlesom">
            <span>资源类型：</span>
            <span>{{item.type}}</span>
          </div>
          <div class="resumain">
            <span v-html="brightenKeyword(item.resumain, query)"></span>
          </div>
        </el-col>
      </el-row>
      <el-row class="paging">
        <el-col :span="22" :offset="1">
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </el-col>
      </el-row>
    </div>
    <Site @save="save"></Site>
    <Liveview></Liveview>
    <Lightpath></Lightpath>
    <Passageway></Passageway>
    <Business></Business>
    <DefectList></DefectList>
    <Checklist></Checklist>
    <ModeList></ModeList>
    <Riskwarning></Riskwarning>
    <MachineBasic></MachineBasic>
    <Equipment></Equipment>
    <Cabinet></Cabinet>
    <Sitetopo></Sitetopo>
    <Opticalcable ref="opticalcable"></Opticalcable>
    <Powersupply></Powersupply>
    <D3machineroom></D3machineroom>
    <transTopology></transTopology>
    <equipPanelDiagram></equipPanelDiagram>
    <Connection></Connection>
    <BasicInfo></BasicInfo>
    <BearingDialog></BearingDialog>
  </div>
</template>
<script>
import Site from "../../components/site/index"; //通信站
import Liveview from "../../components/Liveview/index"; //通信站=>实景图
import Lightpath from "../../components/lightpath/index"; //光路
import Passageway from "../../components/passageway/index"; //通道
import Business from "../../components/business/index"; //业务
import DefectList from "../../components/defectList/index"; //缺陷单
import Checklist from "../../components/checklist/index"; //检修单
import ModeList from "../../components/modeList/index"; //方式单
import Riskwarning from "../../components/riskwarning/index"; //风险预警单
import MachineBasic from "../../components/machineBasic/index"; //机房
import Equipment from "../../components/equipment/index"; //设备
import Cabinet from "../../components/cabinet/index"; //机柜
import Sitetopo from "../../components/sitetopo/index"; //平面图
import Opticalcable from "../../components/opticalcable/index"; //站点光缆
import Powersupply from "../../components/powersupply/index"; //站点电源
import D3machineroom from "../../components/D3machineroom/index"; //3D实景图
import transTopology from "../../components/transTopology/index"; //传输拓扑图
import equipPanelDiagram from "../../components/equipPanelDiagram/index"; //设备面板图
import Connection from "../../components/connection/index"; //电源接线图
import BasicInfo from "../../components/basicInfo/index"; //基本信息
import BearingDialog from "../../components/bearingDialog/index"; //承载光路/通道

export default {
  components: {
    Site,
    Liveview,
    Lightpath,
    Passageway,
    Business,
    DefectList,
    Checklist,
    ModeList,
    Riskwarning,
    MachineBasic,
    Equipment,
    Cabinet,
    Sitetopo,
    Opticalcable,
    Powersupply,
    D3machineroom,
    transTopology,
    equipPanelDiagram,
    Connection,
    BasicInfo,
    BearingDialog
  },
  data() {
    return {
      codes: 1,
      query: "检修",
      querylist: [
        "四川",
        "检修",
        "变压器",
        "自动化",
        "储能",
        "缺陷",
        "运维分析",
        "光伏"
      ],
      resultlist: [
        {
          title: "检修-桃乡-201212-0006",
          type: "检修单",
          resumain:
            "工单编号：检修-桃乡-201212-0006，执行晌全电厂区城e控通道月计划项目201408--申请开工；陡贾一、二线纵联电流差动保护（RCS-931AM）电路方式由高频变更为2M，检修工作原因：配合保护改造，工作地点：攀煤电厂..."
        },
        {
          title: "网四川信通调度检修发现桃乡500kV...",
          type: "缺陷单",
          resumain:
            "工单编号：缺陷-20191216-四川-桃乡-1，桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断；12月16日7：51国网四川信通调度检修发现桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断。—— ——2019年12月16日08：13 王彦璋..."
        },
        {
          title: "热电传输设备改造检修相关方式--桃乡部分业务...",
          type: "方式单",
          resumain:
            "工单编号：方式-2019-四川-桃乡-1837，热电传输设备改造检修相关方式--桃乡部分业务；方式来源:直接启动的方式,方式类型:正式方式,申请单位/部门:国网四川信通公司,要求完成时间:2019-12-20 14：18..."
        },
        {
          title: "确保检修工作人员安全，加强安全管理，...",
          type: "风险预警单",
          resumain:
            "工单编号：预警-TX-20190808-国网信通-1；预警事项：今年底9号台风“利奇马”（超强台风级）的中心8月8日上午5时位于浙江省象山县南偏东方大约880公里的西北太平洋面上（北纬22.4度、东经126.0度），中心附近最大风力16级。预计，“利奇马”将以每小时15公里的速度向北偏西方向移动，但也可能在浙江岸海面北上..."
        },
        {
          title: "热电传输设备改造检修相关方式--桃乡部分业务...",
          type: "方式单",
          resumain:
            "工单编号：方式-2019-四川-桃乡-1837，热电传输设备改造检修相关方式--桃乡部分业务；方式来源:直接启动的方式,方式类型:正式方式,申请单位/部门:国网四川信通公司,要求完成时间:2019-12-20 14：18..."
        },
       {
          title: "网四川信通调度检修发现桃乡500kV...",
          type: "缺陷单",
          resumain:
            "工单编号：缺陷-20191216-四川-桃乡-1，桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断；12月16日7：51国网四川信通调度检修发现桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断。—— ——2019年12月16日08：13 王彦璋..."
        },
         {
          title: "确保检修工作人员安全，加强安全管理...",
          type: "风险预警单",
          resumain:
            "工单编号：预警-TX-20190808-国网信通-1；预警事项：今年底9号台风“利奇马”（超强台风级）的中心8月8日上午5时位于浙江省象山县南偏东方大约880公里的西北太平洋面上（北纬22.4度、东经126.0度），中心附近最大风力16级。预计，“利奇马”将以每小时15公里的速度向北偏西方向移动，但也可能在浙江岸海面北上..."
        },
      ]
    };
  },
  watch: {
    query(news, lods) {
      console.log(news, "news----", lods, "lods----");
      if (news == "四川") {
        this.resultlist = [{
              title: "国网四川检修公司于2005年06月25日投运500kV桃乡变",
              type: "站点",
              resumain: "500kV桃乡变于2005年06月25日正式投入使用，位于四川成都（东经111.3800°、北纬39.5694°），隶属国网四川检修公司，最高电压等级为500kV,属于省网继电业务保护系统。站内设有H01-1楼通信机房……"
            },
            {
              title: "国网四川检修公司500kV桃乡变下机房编号为85979的通信机房01投入使用",
              type: "机房",
              resumain: "500kV桃乡变下机房编号为85979的通信机房01投入使用，该机房资产单位，运维单位都隶属于国网四川检修公司。该机房进深12米，宽10米，高3米，占地面积有120平米，架空地板空度50公分……"
            },
            {
              title: "国网四川检修公司在役设备检修",
              type: "设备",
              resumain: "最近由国网四川检修公司投入使用的500kV桃乡变ZXMP S390设备进行设备维护，该设备与2010年12月16日投入使用，设备型号为中兴生产的ZXMP S390，由国网四川检修公司的刘维林同志负责检修维护，主要技术体制为SDH……"
            },
            {
              title: "国网四川检修公司在役电源系统维护",
              type: "电源",
              resumain: "最近由国网四川检修公司投入使用的H01-1楼通信机房/整流电源01电源系统进行设备维护，该电源系统与2010年12月16日投入使用，所属500kV桃乡站48V通信电源系统，由中恒投入生产，国网四川检修公司的刘维林同志负责检修维护，主要技术体制为电源……"
            },
            {
              title: "国网四川检修公司500kV桃乡变至500kV尖山变段光路占用率将近50%",
              type: "光路",
              resumain: "由国网四川检修公司建设的（500kV桃乡变-500kV尖山变），该段光路长16km，占用率为47.5%，将近一半。通道类型为SDH通道，速率为2M，光缆段纤芯数有24芯，调度等级为三级……"
            },
            {
              title: "国网四川检修公司500kV桃乡变至500kV尖山变段2M速率",
              type: "通道",
              resumain: "由国网四川检修公司建设的（500kV桃乡变-500kV尖山变），起始500kV桃乡变，至500kV尖山变。该段全称为E_2M[桃乡I:1框-11槽-1端口-时隙：1 尖山变：1框-11槽-3端口-时隙：1]，通道类型为SDH通道，速率为2M……"
            },
            {
              title: "国网四川检修公司(500kV桃乡变-500kV尖山变)继电保护业务01",
              type: "业务",
              resumain: "国网四川检修公司(500kV桃乡变-500kV尖山变)继电保护业务01与2012年06月25日开通，目前该业务仍在继续进行。该业务起始500kV桃乡变，至500kV尖山变，调度等级为三级，接口类型为2M……"
            },
            {
              title: "国网四川检修公司在役机柜检修",
              type: "机柜",
              resumain: "500kV桃乡变下省网中兴S390 SDH光传输柜于2012年6月9日投入使用，该机柜位于H01-1楼通信机房。该款机柜高2000毫米，宽1000毫米，深300毫米，黑色。由国网四川检修公司李玥进行维护……"
            }
          ];
      } else if (news == "检修") {
        this.resultlist =[
        {
          title: "检修-桃乡-201212-0006",
          type: "检修单",
          resumain:
            "工单编号：检修-桃乡-201212-0006，执行晌全电厂区城e控通道月计划项目201408--申请开工；陡贾一、二线纵联电流差动保护（RCS-931AM）电路方式由高频变更为2M，检修工作原因：配合保护改造，工作地点：攀煤电厂..."
        },
        {
          title: "网四川信通调度检修发现桃乡500kV...",
          type: "缺陷单",
          resumain:
            "工单编号：缺陷-20191216-四川-桃乡-1，桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断；12月16日7：51国网四川信通调度检修发现桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断。—— ——2019年12月16日08：13 王彦璋..."
        },
        {
          title: "热电传输设备改造检修相关方式--桃乡部分业务...",
          type: "方式单",
          resumain:
            "工单编号：方式-2019-四川-桃乡-1837，热电传输设备改造检修相关方式--桃乡部分业务；方式来源:直接启动的方式,方式类型:正式方式,申请单位/部门:国网四川信通公司,要求完成时间:2019-12-20 14：18..."
        },
        {
          title: "确保检修工作人员安全，加强安全管理，...",
          type: "风险预警单",
          resumain:
            "工单编号：预警-TX-20190808-国网信通-1；预警事项：今年底9号台风“利奇马”（超强台风级）的中心8月8日上午5时位于浙江省象山县南偏东方大约880公里的西北太平洋面上（北纬22.4度、东经126.0度），中心附近最大风力16级。预计，“利奇马”将以每小时15公里的速度向北偏西方向移动，但也可能在浙江岸海面北上..."
        },
        {
          title: "热电传输设备改造检修相关方式--桃乡部分业务...",
          type: "方式单",
          resumain:
            "工单编号：方式-2019-四川-桃乡-1837，热电传输设备改造检修相关方式--桃乡部分业务；方式来源:直接启动的方式,方式类型:正式方式,申请单位/部门:国网四川信通公司,要求完成时间:2019-12-20 14：18..."
        },
       {
          title: "网四川信通调度检修发现桃乡500kV...",
          type: "缺陷单",
          resumain:
            "工单编号：缺陷-20191216-四川-桃乡-1，桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断；12月16日7：51国网四川信通调度检修发现桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断。—— ——2019年12月16日08：13 王彦璋..."
        },
         {
          title: "确保检修工作人员安全，加强安全管理...",
          type: "风险预警单",
          resumain:
            "工单编号：预警-TX-20190808-国网信通-1；预警事项：今年底9号台风“利奇马”（超强台风级）的中心8月8日上午5时位于浙江省象山县南偏东方大约880公里的西北太平洋面上（北纬22.4度、东经126.0度），中心附近最大风力16级。预计，“利奇马”将以每小时15公里的速度向北偏西方向移动，但也可能在浙江岸海面北上..."
        },
      ]
      }
    },
    
  },
  mounted(){
    this.query = this.$route.query.query;
  },
  methods: {
    changers(val) {
      this.query = val;
    },
    save() {
      this.$refs.opticalcable.chagenss();
    },
    opencard(val) {
      console.log(val, "val---");
      if (val.type == "检修单") {
        this.$store.commit("openchecklist", {
          boolean: true
        });
        console.log(this.$store, "22222");
      } else if (val.type == "缺陷单") {
        this.$store.commit("opendefectlist", {
          boolean: true
        });
      } else if (val.type == "方式单") {
        this.$store.commit("openmethodsheet", {
          boolean: true
        });
      } else if (val.type == "风险预警单") {
        this.$store.commit("openriskwarningsheet", {
          boolean: true
        });
      } else if (val.type == "站点") {
        this.$store.commit("opensite", {
          boolean: true
        });
      } else if (val.type == "机房") {
        this.$store.commit("opencomputerroom", {
          boolean: true
        });
      } else if (val.type == "设备") {
        this.$store.commit("openequipment", {
          boolean: true
        });
      } else if (val.type == "电源") {
        this.$store.commit("openPowerSupply", {
          boolean: true
        });
      } else if (val.type == "光路") {
        this.$store.commit("openLightpath", {
          boolean: true
        });
      } else if (val.type == "通道") {
        this.$store.commit("openPassageway", {
          boolean: true
        });
      } else if (val.type == "业务") {
        this.$store.commit("openBusiness", {
          boolean: true
        });
      } else if (val.type == "机柜") {
        this.$store.commit("opencabinet", {
          boolean: true
        });
      }
    },
    business() {
      this.$store.commit("openBusiness", {
        boolean: true
      });
    },
    passageway() {
      this.$store.commit("opendialogVisiblePassageway", {
        boolean: true
      });
    },
    lightpath() {
      this.$store.commit("opendialogVisibleLightpath", {
        boolean: true
      });
    },
    changes() {
      this.$store.commit("opendialogVisible", {
        boolean: true
      });
    },
    brightenKeyword(val, keyword) {
      val = val + "";
      if (val.indexOf(keyword) !== -1 && keyword !== "") {
        return val.replace(
          keyword,
          '<font color="#f13f40">' + keyword + "</font>"
        );
      } else {
        return val;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.optical {
  height: 100%;

  .navs {
    height: 55px;
    // background: chocolate;
    background: url("../../assets/img/opticalcable/bjtop.png") no-repeat center;
    background-size: cover;
    border-bottom: 5px solid #77cdd1;

    .leftnav {
      display: flex;
      // justify-content: center;
      align-items: center;

      .logoimg {
        width: 34px;
        height: 24px;
        margin-right: 20px;

        img {
          width: 34px;
          height: 24px;
        }
      }

      .logotitle {
        font-size: 19px;
        color: #46a9dc;
        line-height: 50px;
      }
    }

    .imgbox {
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;

      .imgs {
        height: 27px;

        img {
          width: 27px;
          height: 27px;
          margin-right: 10px;
        }
      }

      .texts {
        border-right: 2px solid #919191;
        padding-right: 10px;
        height: 20px;
        color: #919191;
      }
    }
  }

  .opticalmain {
    height: calc(100% - 55px);
    background: #fff;
    display: flex;
    flex-direction: column;

    .inputs {
      width: 650px;
      height: 35px;
      // background: palegreen;
      margin-top: 13px;
      display: flex;
      font-size: 0px;

      /deep/.el-input__inner {
        width: 546px;
        height: 35px;
        border-radius: 8px 0 0 8px;
        border: 1px solid #79cec7;
      }

      .sousuos {
        width: 124px;
        height: 35px;
        background: #79cec7;
        display: flex;
        justify-content: center;
        border-radius: 0 8px 8px 0;
        align-items: center;

        img {
          width: 18px;
          height: 18px;
        }
      }
    }

    .lishi {
      height: 38px;
      // background: coral;
      display: flex;
      align-items: center;
      font-size: 13px;

      .lishitxt {
        color: #808080;
      }

      .lisjl {
        color: #666;
        margin-right: 20px;
        text-decoration: underline;
        cursor: pointer;
      }
    }

    .queryover {
      height: 26px;
      background: #f2f2f2;
      font-size: 13px;
      line-height: 26px;
    }

    .result {
      flex: 1;
      margin-top: 10px;
      // background: chocolate;
      overflow: auto;

      .resultbox {
        // background: coral;
        height: 100px;
        border-bottom: 1px solid #f2f2f2;

        .resutitle {
          height: 22px;
          // background: palegreen;
          color: #007970;
          text-decoration: underline;
          margin-top: 12px;
          font-size: 18px;
          line-height: 22px;
          cursor: pointer;
        }

        .titlesom {
          height: 20px;
          // background: palevioletred;
          line-height: 20px;
          color: #999;
          font-size: 12px;
        }

        .resumain {
          font-size: 13px;
          line-height: 23px;
          display: flex;
          color: #666;
          align-items: center;
        }
      }
    }

    .paging {
      height: 80px;
      // background: chartreuse;
      display: flex;
      align-items: center;

      /deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
        background: #007970;
        color: #fff;
      }

      /deep/.el-pagination.is-background .el-pager li:not(.disabled):hover {
        background: #f4f4f5;
        color: #007970;
      }
    }
  }
}
</style>