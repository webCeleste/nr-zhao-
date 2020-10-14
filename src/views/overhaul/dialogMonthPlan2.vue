// 月检修计划计划项    国网一二级骨干通信网
<template>
  <div class="Nav_tab_box">
    <div class="buttonlist">
      <div class="buttonbox" style="margin-left:14px">
        <img src="../../assets/img/值班/工作台/保存.png" alt />
        <span>保存</span>
      </div>
      <div class="buttonbox" style="margin-left:14px">
        <img src="../../assets/img/检修/删除.png" alt />
        <span>删除</span>
      </div>
      <div class="buttonbox">
        <img src="../../assets/img/检修/撤销.png" alt />
        <span>撤销</span>
      </div>
      <div class="buttonbox">
        <img src="../../assets/img/值班/导出.png" alt />
        <span>导出</span>
      </div>
      <div class="buttonbox">
        <img src="../../assets/img/检修/审批.png" alt />
        <span>审批</span>
      </div>
    </div>
    <div class="detailBox">
      <h1 style="font-size: 30px;text-align: center;padding:10px 0;">国网一二级骨干通信网(含500KV级以上)检修计划项</h1>
      <div class="tab_B_cdetail">
        <div class="onesbox">
          <slot name="firstnavtop">
            <div class="navonecur">
              <div class="tab_title">
                <span>月计划信息</span>
              </div>
            </div>
          </slot>

          <div class="formbox">
            <el-form label-width="80px" :rules="rules" :model="form5">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="项目编号:" label-width="120px" prop="xmbh">
                    <el-input placeholder="请输入工单编号" v-model="form5.xmbh"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="编制时间:" label-width="120px">
                    <el-input placeholder="请输入工单编号" v-model="form5.bzsj"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="计划名称:" label-width="120px" prop="jhmc">
                    <el-input placeholder="请输入内容" v-model="form5.jhmc"></el-input>
                    <!-- <el-date-picker v-model="form3.date" type="month" placeholder="选择月"></el-date-picker> -->
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="编制单位:" label-width="120px" prop="bzdw">
                    <el-input placeholder="请输入工单编号" v-model="form5.bzdw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="计划归属单位:" label-width="120px" prop="jhgsdw">
                    <el-input placeholder="请输入工单编号" v-model="form5.jhgsdw"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="编制人:" label-width="120px">
                    <el-input placeholder="请输入编制人" v-model="form5.bzName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="联系电话:" label-width="120px">
                    <el-input placeholder="请输入联系电话" v-model="form5.tel"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="检修性质:" label-width="120px" prop="jxxz">
                    <el-input placeholder="请输入联系电话" v-model="form5.jxxz"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="检修归类:" label-width="120px" prop="jxgl">
                    <el-input placeholder="请输入联系电话" v-model="form5.jxgl"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="检修类别:" label-width="120px" prop="jxlb">
                    <el-input placeholder="请输入检修类别" v-model="form5.jxlb"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="影响高等级单:" label-width="120px" prop="bestXx">
                    <el-input placeholder="请输入最高等级单" v-model="form5.bestXx"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="工作原因" label-width="120px" prop="workRes">
                    <el-input type="textarea" v-model="form5.workRes"></el-input>
                    <!-- <el-date-picker v-model="form3.date" type="month" placeholder="选择月"></el-date-picker> -->
                  </el-form-item>
                </el-col>
                 <el-col :span="12">
                  <el-form-item label="计划开始时间:" label-width="120px" prop="startT">
                    <el-date-picker v-model="form5.startT" type="datetime" placeholder="选择时间" style="width:100%"></el-date-picker>
                  </el-form-item>
                </el-col> <el-col :span="12">
                  <el-form-item label="计划结束时间:" label-width="120px" prop="endT">
                    <el-date-picker v-model="form5.endT" type="datetime" placeholder="选择时间" style="width:100%"></el-date-picker>
                  </el-form-item>
                </el-col>
                 <el-col :span="24">
                  <el-form-item label="工作时长:" label-width="120px">
                    <el-input placeholder="请输入联系电话" v-model="form5.workTimeLong"></el-input>
                  </el-form-item>
                </el-col>
                  <el-col :span="24">
                  <el-form-item label="工作内容" label-width="120px" prop="workDetail">
                    <el-input type="textarea" v-model="form5.workDetail"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="onesbox">
          <slot name="firstnavtop">
            <div class="navonecur">
              <div class="tab_title">
                <span>影响业务调度生产情况</span>
              </div>
            </div>
          </slot>

          <div class="buttonlist butList" style="margin:15px 15px 0">
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/检修/新建.png" alt />
              <span>新建</span>
            </div>
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/检修/删除.png" alt />
              <span>删除</span>
            </div>
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/检修/刷新.png" alt />
              <span>刷新</span>
            </div>
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/值班/导入.png" alt />
              <span>导入</span>
            </div>
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/值班/导出.png" alt />
              <span>导出</span>
            </div>
            <div class="buttonbox" style="margin-left:14px">
              <img src="../../assets/img/检修/Execl导入模板下载.png" alt />
              <span>Excel导入模板下载</span>
            </div>
          </div>
          <div class="tablebox" style="margin: 0 15px 15px">
            <el-table
              class="tables"
              ref="multipleTable"
              key="值班班次"
              :data="tableData1"
              tooltip-effect="dark"
              border
            >
              <el-table-column type="index" label="序" width="40"></el-table-column>
              <el-table-column type="selection" width="50"></el-table-column>
              <el-table-column prop="company" align="center" label="系统级"></el-table-column>
              <el-table-column prop="name" align="center" label="影响级"></el-table-column>
              <el-table-column prop="tell" align="center" label="业务级"></el-table-column>
              <el-table-column prop="phone" align="center" label="调度生产业务"></el-table-column>
              <el-table-column prop="zw" align="center" label="通道类型"></el-table-column>
              <el-table-column prop="bz" align="center" label="电压等级"></el-table-column>
              <el-table-column prop="bz" align="center" label="通道运行状态"></el-table-column>
            </el-table>
          </div>
        </div>
        <div class="onesbox">
          <slot name="firstnavtop">
            <div class="navonecur">
              <div class="tab_title">
                <span>审批信息</span>
              </div>
            </div>
          </slot>

          <div class="formbox">
            <el-form label-width="80px" :model="form5">
              <el-form-item label="审批结果:" label-width="120px">
                <el-input type="textarea" v-model="form5.InputArea"></el-input>
              </el-form-item>
              <el-form-item label="审批意见:" label-width="120px">
                <el-input type="textarea" v-model="form5.InputArea"></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dialogMonthPlan2",
  data() {
    return {
      num: 0,
      select_Val: "",
      tab2: ["基本信息", "调班申请"],
      checkList: ["地市公司"],
      form5: {
       xmbh:"",
       bzsj:"",
       jhmc:"",
       bzdw:"",
       jhgsdw:"",
       bzName:"",
       tel:"",
       jxxz:"",
       jxgl:"",
       jxlb:"",
       bestXx:"",
       workRes:"",
       startT:"",
       endT:"",
       workTimeLong:"",
       workDetail:""

      },
        rules: {
          xmbh: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          jhmc: [
            { required: true, message: '请输入计划名称', trigger: 'blur' }
          ],
          bzdw: [
            { required: true, message: '请输入编制单位', trigger: 'blur' }
          ],
           jhgsdw: [
            { required: true, message: '请输入计划归属单位', trigger: 'blur' }
          ],
          jxxz: [
            { required: true, message: '请输入检修性质', trigger: 'blur' }
          ],
          jxgl: [
            { required: true, message: '请输入检修归类', trigger: 'blur' }
          ],
          jxlb: [
            { required: true, message: '请输入检修类别', trigger: 'blur' }
          ],
          bestXx: [
            { required: true, message: '请输入最高等级单', trigger: 'blur' }
          ],
          workRes: [
            { required: true, message: '请输入工作原因', trigger: 'blur' }
          ],
          startT: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
           endT: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
      options_LX: [
        {
          value: "选项1",
          label: "全部",
        },
        {
          value: "选项2",
          label: "省",
        },
        {
          value: "选项3",
          label: "地市",
        },
      ],
      tableData1: [
        {},
        {},
        {}
      ],
    };
  },
  methods: {
    //   tab切换
    tabTag(index) {
      this.num = index;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
  },
};
</script>
<style lang="scss" scoped>
.Nav_tab_box {
  // 弹框内的tab切换

  .tab_title {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    :nth-child(1) {
      width: 165px;
      height: 30px;
      line-height: 30px;
      text-align: left;
      display: inline-block;
      color: #3bb5a0;
      margin-left: 10px;
      margin-bottom: -1px;
      border-radius: 5px;
    }
  }

  .buttonlist {
    height: 34px;
    background-image: linear-gradient(#fff, #e0eded);
    display: flex;
    align-items: center;
    border-bottom: 1px solid #91cecf;
    margin-bottom: 10px;
    .buttonbox {
      height: 16px;
      // background: rosybrown;
      display: flex;
      margin-right: 22px;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
        margin-right: 7px;
      }
      span {
        font-size: 12px;
        line-height: 16px;
        color: #999;
      }
    }
    .querylist {
      display: flex;
      align-items: center;
      // margin-left: 10px;
      /deep/.el-input__inner {
        height: 28px;
      }
      .el-select .el-input__inner:focus {
        border-color: #3ab5a0;
      }
      .botons {
        display: flex;
        cursor: pointer;
        align-items: center;
        width: 70px;
        img {
          margin-left: 10px;
          width: 15px;
          height: 15px;
        }
        .chaxun {
          margin-left: 5px;
          height: 20px;
          font-size: 12px;
          line-height: 20px;
          color: #666666;
          text-align: center;
        }
      }
    }
    .noopen {
      pointer-events: none;
    }
  }
  .butList {
    border-bottom: none;
    margin-bottom: 0;
  }
  /deep/.el-form {
    margin-top: 15px;
    .el-form-item {
      margin-bottom: 15px;
      .el-form-item__content {
        .spanLabel {
          margin-left: 15px;
          display: inline-block;
          width: 120px;
          text-align: right;
          margin-right: 12px;
        }
      }
    }
  }
}
.detailBox {
  height: 640px;
  overflow: auto;
  /deep/.el-input__icon {
    line-height: 25px;
  }
}
</style>