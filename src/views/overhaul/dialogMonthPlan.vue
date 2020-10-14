// 月检修计划计划项
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
      <h1 style="font-size: 30px;text-align: center;padding:10px 0;">三，四级网检修计划项</h1>
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
            <el-form label-width="80px" :model="form5">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="项目单编号:" label-width="115px">
                    <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="编制单位:" label-width="115px">
                    <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-form-item label="计划名称" label-width="115px" prop="date">
                <el-input placeholder="请输入内容" v-model="form5.name"></el-input>
                <!-- <el-date-picker v-model="form3.date" type="month" placeholder="选择月"></el-date-picker> -->
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="检修类别:" label-width="115px">
                    <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="项目归属单位:" label-width="115px">
                    <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
               <el-row>
                <el-col :span="12">
                  <el-form-item label="计划开始时间:" label-width="115px">
                    <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="计划完成时间:" label-width="115px">
                    <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              
              <el-form-item label="工作地点:" label-width="115px" prop="value">
                <!-- <el-date-picker v-model="form5.dataTime" type="datetime" placeholder="选择日期时间"></el-date-picker> -->
                <el-input placeholder="请输入工单编号" v-model="form5.dataTime"></el-input>
              </el-form-item>
              <el-form-item label="检修内容;" label-width="115px">
                <el-input type="textarea" v-model="form5.InputArea"></el-input>
              </el-form-item>
              <el-form-item label="影响范围:" label-width="115px">
                <el-input type="textarea" v-model="form5.InputArea"></el-input>
              </el-form-item>
              <el-form-item label="影响单位:" label-width="115px">
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="地市公司"></el-checkbox>
                  <el-checkbox label="省公司"></el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="备注:" label-width="115px">
                <el-input type="textarea" v-model="form5.InputArea"></el-input>
              </el-form-item>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="编制人:" label-width="115px">
                    <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="编制时间:" label-width="115px">
                    <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
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
                <span>审批信息</span>
              </div>
            </div>
          </slot>

          <div class="formbox">
            <el-form label-width="80px" :model="form5">
              <el-form-item label="审批结果:" label-width="115px">
                <el-input type="textarea" v-model="form5.InputArea"></el-input>
              </el-form-item>
              <el-form-item label="审批意见:" label-width="115px">
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
  name: "dialogMonthPlan",
  data() {
    return {
      num: 0,
      select_Val: "",
      tab2: ["基本信息", "调班申请"],
      checkList: ["地市公司"],
      form5: {
        date: "2020-08-12",
        value1: "一班",
        value: "白班",
        value2: "白班",
        name: "",
        dataTime: "",
        weather: "",
        temperature: "",
        jbName: "",
        jbTime: "",
        InputArea: "",
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
        {
          company: "南京供电",
          name: "张三",
          tell: "0532-455343",
          phone: "199-54362277",
          zw: "值班员",
          bz: "xx值班备注",
        },
        {
          company: "南京供电",
          name: "张三",
          tell: "0532-455343",
          phone: "199-54362277",
          zw: "值班员",
          bz: "xx值班备注",
        },
        {
          company: "南京供电",
          name: "张三",
          tell: "0532-455343",
          phone: "199-54362277",
          zw: "值班员",
          bz: "xx值班备注",
        },
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
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      // cursor: pointer;
      color: #3bb5a0;
      // border: 1px solid #3bb5a0;
      // border-bottom:none;
      margin-left: -5px;
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
          width: 100px;
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