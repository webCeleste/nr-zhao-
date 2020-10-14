<template>
  <div>
    <el-dialog
      :visible.sync="Operationrecord"
      width="80%"
      :before-close="handleClose"
      :title="code|dataFormat(code)"
    >
      <div class="nvas">
        <div class="buttonbox" style="margin-left:14px" @click="submitForm('ruleForm')">
          <img src="../../assets/img/值班/工作台/保存.png" alt />
          <span>保存</span>
        </div>
        <div class="buttonbox" @click="resetForm('ruleForm')">
          <img src="../../assets/img/值班/工作台/导出.png" alt />
          <span>导出</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/工作台/关联资源设备.png" alt />
          <span>关联资源设备</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/工作台/查看设备.png" alt />
          <span>查看设备</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/工作台/启动缺陷单.png" alt />
          <span>启动缺陷单</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/工作台/启动检修票.png" alt />
          <span>启动检修票</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/工作台/设置完成.png" alt />
          <span>设置完成</span>
        </div>
        <div class="texta">当前状态>>处理中</div>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="Froms">
        <el-row>
          <el-col :span="16">
            <el-form-item label="编号" prop="nums">
              <el-input v-model="ruleForm.nums" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来源" prop="source">
              <el-select v-model="ruleForm.source" placeholder="请选择来源" style="width:100%">
                <!-- <el-option label="全部" value="00"></el-option> -->
                <el-option label="用户申告" value="01"></el-option>
                <el-option label="通信运维" value="02"></el-option>
                <el-option label="实时监视" value="03"></el-option>
                <el-option label="其他" value="04"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="记录单位" prop="recordunit">
              <el-input v-model="ruleForm.recordunit" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="记录人" prop="notetaker">
              <el-input v-model="ruleForm.notetaker" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="记录时间" prop="time">
              <el-date-picker
                v-model="ruleForm.time"
                type="datetime"
                disabled
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="选择日期时间"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="申报单位" prop="apply">
              <el-input v-model="ruleForm.apply"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="申报人" prop="people">
              <el-input v-model="ruleForm.people"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-form-item label="工作标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="资源设备" prop="equipment">
            <el-input v-model="ruleForm.equipment"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="工作内容" prop="main">
            <el-input v-model="ruleForm.main"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="发生时间" prop="date">
              <el-date-picker
                v-model="ruleForm.date"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="恢复时间" prop="recovery">
              <el-date-picker
                v-model="ruleForm.recovery"
                type="datetime"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="width:100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="关联工单" prop="desc">
          <el-input v-model="ruleForm.desc" disabled></el-input>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsbox"  type="border-card">
        <el-tab-pane label="处理过程" name="first">
          <div class="nvas" style="margin:0">
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/值班/xinzheng.png"  alt />
              <span>新增</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/保存.png" alt />
              <span>保存</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/sanchu.png" alt />
              <span>删除</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/刷新.png" alt />
              <span>刷新</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/取消.png" alt />
              <span>撤销</span>
            </div>
          </div>
          <div class="tablebox">
            <el-table
              class="tables"
              key="first"
              :data="tableData"
              tooltip-effect="dark"
              max-height="280"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="index" width="30" show-overflow-tooltip></el-table-column>
              <el-table-column type="selection" width="50" show-overflow-tooltip></el-table-column>
              <el-table-column
                prop="date"
                align="center"
                width="250"
                label="时间"
                sortable
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="apply"
                align="center"
                label="处理单位"
                width="380"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="people"
                align="center"
                label="处理人"
                width="200"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="news" align="center" label="处理" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="影响业务" name="second">
          <div class="nvas" style="margin:0">
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/值班/xinzheng.png" alt />
              <span>新增</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/保存.png" alt />
              <span>保存</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/sanchu.png" alt />
              <span>删除</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/刷新.png" alt />
              <span>刷新</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/取消.png" alt />
              <span>撤销</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/复制.png" alt />
              <span>复制</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/粘贴.png" alt />
              <span>粘贴</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/导出.png" alt />
              <span>导出</span>
            </div>
          </div>
          <div class="tablebox">
            <el-table
              class="tables"
              ref="multipleTable"
              key="second"
              :data="secondData"
              tooltip-effect="dark"
              max-height="280"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="index" width="30" show-overflow-tooltip></el-table-column>
              <el-table-column type="selection" width="50" show-overflow-tooltip></el-table-column>
              <el-table-column
                prop="types"
                align="center"
                width="250"
                label="业务类型"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="grade"
                align="center"
                label="调度等级"
                width="200"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="name"
                align="center"
                label="业务名称"
                width="270"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="measures" align="center" label="采取措施" show-overflow-tooltip></el-table-column>
              <el-table-column prop="business" align="center" label="落地业务" show-overflow-tooltip></el-table-column>
              <el-table-column prop="impact" align="center" label="影响程度" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="影响通道" name="third">
          <div class="nvas" style="margin:0">
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/值班/xinzheng.png" alt />
              <span>新增</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/保存.png" alt />
              <span>保存</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/sanchu.png" alt />
              <span>删除</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/刷新.png" alt />
              <span>刷新</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/取消.png" alt />
              <span>撤销</span>
            </div>
              <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/复制.png" alt />
              <span>复制</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/粘贴.png" alt />
              <span>粘贴</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/导出.png" alt />
              <span>导出</span>
            </div>
          </div>
          <div class="tablebox">
            <el-table
              class="tables"
              ref="multipleTable"
              key="third"
              :data="thirdData"
              tooltip-effect="dark"
              max-height="280"
              border
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="index" width="30" show-overflow-tooltip></el-table-column>
              <el-table-column type="selection" width="50" show-overflow-tooltip></el-table-column>
              <el-table-column
                prop="names"
                align="center"
                label="通道名称"
                width="200"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="types"
                align="center"
                width="250"
                label="通道类型"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column
                prop="rate"
                align="center"
                label="通道速率"
                width="270"
                show-overflow-tooltip
              ></el-table-column>
              <el-table-column prop="measures" align="center" label="采取措施" 
                width="180"
               show-overflow-tooltip></el-table-column>
              <el-table-column prop="bearing" align="center" label="承载业务类型"
                width="250"
               show-overflow-tooltip></el-table-column>
              <el-table-column prop="aend" align="center" label="A端"
                width="180"
               show-overflow-tooltip></el-table-column>
              <el-table-column prop="zend" align="center" label="Z端"
                width="180"
               show-overflow-tooltip></el-table-column>
              <el-table-column prop="note" align="center" label="备注" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
        <el-tab-pane label="设备告警" name="fourth">
          <div class="nvas" style="margin:0">
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/值班/工作台/保存.png" alt />
              <span>保存</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/导出.png" alt />
              <span>导出</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/关联资源设备.png" alt />
              <span>关联资源设备</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/查看设备.png" alt />
              <span>查看设备</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/启动缺陷单.png" alt />
              <span>启动缺陷单</span>
            </div>
            <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/启动检修票.png" alt />
              <span>启动检修票</span>
            </div>
             <div class="buttonbox">
              <img src="../../assets/img/值班/工作台/设置完成.png" alt />
              <span>设置完成</span>
            </div>
          </div>
           <div class="tablebox">
          <el-table
            class="tables"
            key="riskData"
            :data="riskData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="编号" align="center" width="240" show-overflow-tooltip>
              <template slot-scope="scope">
                <!-- <span class="toptops" v-if="scope.row.top==true">顶</span> -->
                <span>{{ scope.row.nums }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="title" width="200" align="center" label="标题" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="release"
              align="center"
              label="拟制单位"
              width="240"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="dates"
              align="center"
              label="预警时间"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="times"
              align="center"
              label="预警实际结束时间"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="chief"
              align="center"
              label="主送单位"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="communication"
              align="center"
              width="170"
              label="涉及通信系统"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="grade"
              align="center"
              width="150"
              label="风险预警等级"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="control"
              align="center"
              width="180"
              label="风险预控要求"
              show-overflow-tooltip
            ></el-table-column>
          </el-table>
        </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    Operationrecord: Boolean,
    code: Number,
  },
  filters: {
    dataFormat(msg) {
      if (msg == 0) {
        return "新建运行记录";
      } else if (msg == 1) {
        return "修改运行记录";
      }
    },
  },
  data() {
    return {
      times: new Date(),
      activeName: "first",
      ruleForm: {
        recordunit: "成都电力公司",
        time: "",
        equipment: "",
        title: "",
        notetaker: "王一平",
        main: "",
        apply: "",
        frequency: "白班",
        people: "",
        nums: "运行记录-20200818-四川-成都-1",
        source: "03",
        date: "",
        recovery: "",
        desc: "检修-20140805-西南-四川-成都-1",
      },
      rules: {},
      // 处理过程
      tableData: [
        {
          date: "2020-08-11",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-11",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-12",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-10",
          frequency: "白班",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-08",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
      ],
      // 影响业务
      secondData: [
        {
          types: "检修",
          grade: "三级",
          name: "",
          measures: "",
          business: "",
          impact: "",
        },
        {
          date: "2020-08-11",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-12",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-10",
          frequency: "白班",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-08",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
      ],
      // 影响通道
      thirdData: [
        {
          names: "",
          types: "",
          rate: "",
          measures: "",
          bearing: "",
          aend: "",
          zend: "",
          note: "",
        },
        {
          date: "2020-08-11",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-12",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-10",
          frequency: "白班",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
        {
          date: "2020-08-08",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
        },
      ],
       //风险预警单
      riskData: [
        {
          nums: "预警-TX-20190808-国网信通-1",
          title: "关于2019年第9号台风“利奇马”的风险预警",
          states: "",
          release: "国家电网公司信息通信分公司",
          matter: "",
          dates: "2019-08-09 08:00",
          times: "2019-08-15 18:00",
          control:
            "1.合理安排应急值班，加强监测控，调配好抢险队伍、救援装备和物资，强化客户服务，认真做好各项应急准备工作。2.各单位要加强与当地气象、海洋等部门的联系，密切关注气象变化情况，根据情况变化几室采取措施。3.合理安排信息通信系统运行方式，做好事故预想，落实灾害预防、预警措施，确保系统安全稳定运行。4.科学救灾，合理避险，切实落实各项安全措施，加强抢修安全管理，确保抢修工作人员安全。5.加强应急值班和信息报告工作，严格执行“零汇报”机制，发生异常情况和突发事件，即使向国网信通调度汇报。6.请相关单位于8月9日9：00前在系统中反馈预警跟踪落实情况。",
          grade: "八级",
        },
         {
          nums: "",
          title: "",
          states: "",
          release: "",
          matter: "",
          dates: "",
          times: "",
          control:
            "",
          grade: "",
        }, {
          nums: "",
          title: "",
          states: "",
          release: "",
          matter: "",
          dates: "",
          times: "",
          control:
            "",
          grade: "",
        }, {
          nums: "",
          title: "",
          states: "",
          release: "",
          matter: "",
          dates: "",
          times: "",
          control:
            "",
          grade: "",
        },
      ],
    };
  },
  computed: {},
  mounted() {
    // this.ruleForm.time = this.times
    this.$nextTick(() => {
      this.ruleForm.time = this.formatDate(this.times);
    });
  },
  methods: {
    echo(val) {
      if (Object.keys(val).length == 0) {
        console.log(this.ruleForm, "1111111");
        this.ruleForm = {
          recordunit: "成都电力公司",
          time: "",
          equipment: "",
          title: "",
          notetaker: "王一平",
          main: "",
          apply: "",
          frequency: "白班",
          people: "",
          nums: "运行记录-20200818-四川-成都-1",
          source: "03",
          date: "",
          recovery: "",
          desc: "检修-20140805-西南-四川-成都-1",
        };
        this.ruleForm.time = this.formatDate(this.times);
      } else {
        let vals = Object.assign(this.ruleForm, val);
        this.ruleForm = vals;
        console.log(vals, "****");
      }
    },
    handleSelectionChange(val) {
      console.log(val, "val");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = this.format(date.getMonth() + 1);
      var da = this.format(date.getDate());
      var h = this.format(date.getHours());
      var m = this.format(date.getMinutes());
      var s = this.format(date.getSeconds());
      return year + "-" + month + "-" + da + " " + h + ":" + m + ":" + s;
      // return year + "-" + month + "-" + da;
    },
    format(val) {
      return Number(val) < 10 ? "0" + val : "" + val;
    },
    //  getSTime(val) {
    //    console.log(val,'val===')
    //   this.ruleForm.time = val;
    // },
    submitForm() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      // console.log(this.ruleForm, "ruleForm");
      this.$emit("update:Operationrecord", false);
      this.$emit("operationchange", this.ruleForm);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose() {
      this.$emit("update:Operationrecord", false);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-dialog {
  margin-top: 10px !important;
  .el-dialog__header {
          padding: 5px;

    background: #3ab5a0;
    color: #fff;
    .el-dialog__headerbtn {
      top: 8px;
      right: 12px;
      .el-icon-close:before {
        color: #fff;
      }
    }
    .el-dialog__title {
      margin-left: 15px;
      font-size: 13px;
      line-height: 30px;
      color: #fff;
      font-weight: 600;
    }
  }
  .el-dialog__body {
    padding: 10px 20px 20px;
  }
  .nvas {
    height: 33px;
    border-top: 1px solid #91cecf;
    background: linear-gradient(to bottom, #fff, #e0eded);
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .buttonbox {
      height: 16px;
      // background: rosybrown;
      display: flex;
      margin-right: 22px;
      align-items: center;
      cursor: pointer;
      img {
        width: 15px;
        height: 15px;
        margin-right: 7px;
      }
      span {
        font-size: 12px;
        line-height: 16px;
        color: #999;
      }
    }
    .texta {
      line-height: 33px;
    }
  }
  .Froms {
    .el-row {
      height: 50px;
    }
    .el-col {
      height: 50px;
    }
    .el-input__inner {
      height: 35px;
    }
  }

  /deep/.tabsbox {
    .el-tabs__item.is-active {
      color: #3ab5a0;
      font-weight: 700;
    }
    .el-tabs__active-bar {
      background: #3ab5a0;
    }
    .el-tabs__header {
      margin: 0;
    }

    .tablebox {
      width: 100%;
      // margin: 0 10px;
      .tables {
        .el-table__header tr,
        .el-table__header th {
          padding: 0;
          height: 40px;
          background: #3bb5a0;
          color: #fff;
        }
        .el-table__body tr,
        .el-table__body td {
          padding: 0;
          height: 40px;
        }
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background: #3bb5a0;
          border-color: #3bb5a0;
        }
        .cell {
          .el-button--primary {
            background: #3ab5a0;
            border: 0;
          }
        }
      }
    }
  }
}
</style>