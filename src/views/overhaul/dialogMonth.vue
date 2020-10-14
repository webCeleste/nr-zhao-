// 月检修计划填报表
<template>
  <div class="Nav_tab_box">
    <div class="doubleFlag" v-if="!doubleFlag">
      <div class="middleNav_tab">
        <span
          v-for="(item,index) in tab2"
          @click="tabTag(index)"
          :key="index"
          :class="{tab:num==index}"
        >{{item}}</span>
      </div>
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/值班/工作台/保存.png" alt />
          <span>保存</span>
        </div>
        <div class="buttonbox" @click="QsgdClick" style="margin-left:14px">
          <img src="../../assets/img/检修/签收工单.png" alt />
          <span>签收工单</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/检修/审批.png" alt />
          <span>审批工单</span>
        </div>
        <div class="buttonbox" @click="jhglxClick">
          <img src="../../assets/img/检修/管理计划项.png" alt />
          <span>管理计划项</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/检修/终止填报.png" alt />
          <span>终止填报</span>
        </div>
      </div>
      <div class="detailBox">
        <h1 style="font-size: 30px;text-align: center;padding:10px 0;">月检修计划</h1>
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
                    <el-form-item label="工单编号" label-width="100px">
                      <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="填写时间:" label-width="100px">
                      <el-date-picker
                        v-model="form5.temperature"
                        type="datetime"
                        style="width:100%"
                        placeholder="选择日期时间"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item label="工单编号" label-width="100px">
                  <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
                </el-form-item>
                <el-form-item label="标题：" label-width="100px" prop="date">
                  <el-input placeholder="请输入内容" v-model="form5.name"></el-input>
                  <!-- <el-date-picker v-model="form3.date" type="month" placeholder="选择月"></el-date-picker> -->
                </el-form-item>
                <el-form-item label="计划月份：" label-width="100px" prop="value">
                  <!-- <el-date-picker v-model="form5.dataTime" type="datetime" placeholder="选择日期时间"></el-date-picker> -->
                  <el-input placeholder="请输入工单编号" v-model="form5.dataTime"></el-input>
                </el-form-item>
                <el-form-item label="备注：" label-width="100px">
                  <el-input type="textarea" v-model="form5.InputArea"></el-input>
                </el-form-item>
                <el-form-item label="发起人：" label-width="100px">
                  <el-input placeholder="请输入内容" v-model="form5.jbName"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="onesbox">
            <slot name="firstnavtop">
              <div class="navonecur">
                <div class="tab_title">
                  <span>
                    月计划统计
                    <i @dblclick="doubleClick">[双击列表可查看详细项目]</i>
                  </span>
                </div>
              </div>
            </slot>

            <div class="formbox">
              <div class="buttonlist butList">
                <div class="buttonbox" style="margin-left:14px">
                  <img src="../../assets/img/检修/补充填报.png" alt />
                  <span>补充填报</span>
                </div>
                <div class="querylist" style="margin-left:20px">
                  <el-select v-model="select_Val" placeholder="请选择">
                    <el-option
                      v-for="item in options_LX"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <!-- <el-input v-model="inputs" placeholder="请输入查询内容"></el-input> -->
                  <!-- <div class="botons">
                  <img src="../../assets/img/值班/工作台/sousuo.png" alt />
                  <div class="chaxun">查询</div>
                  </div>-->
                </div>
              </div>
              <div class="tablebox">
                <el-table
                  class="tables"
                  ref="multipleTable"
                  key="值班班次"
                  :data="tableData1"
                  tooltip-effect="dark"
                  border
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="index" label="序" width="40"></el-table-column>
                  <el-table-column prop="company" align="center" label="单位"></el-table-column>
                  <el-table-column prop="name" align="center" label="数目"></el-table-column>
                  <el-table-column prop="tell" align="center" label="待审批"></el-table-column>
                  <el-table-column prop="phone" align="center" label="审批通过"></el-table-column>
                  <el-table-column prop="zw" align="center" label="审批不通过"></el-table-column>
                  <el-table-column prop="bz" align="center" label="退回"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="doubleClick" v-if="doubleFlag">
      <div class="buttonlist butList">
        <div
          class="buttonbox"
          @click="Return"
          style="margin-left:14px;position: absolute;right: 10px;"
        >
          <img src="../../assets/img/值班/取消.png" alt />
          <span>返回</span>
        </div>
      </div>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          key="值班班次"
          :data="tableData1List"
          tooltip-effect="dark"
          border
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="company" align="center" label="单位"></el-table-column>
          <el-table-column prop="name" align="center" label="数目"></el-table-column>
          <el-table-column prop="tell" align="center" label="待审批"></el-table-column>
          <el-table-column prop="phone" align="center" label="审批通过"></el-table-column>
          <el-table-column prop="zw" align="center" label="审批不通过"></el-table-column>
          <el-table-column prop="bz" align="center" label="退回"></el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 管理计划项 -->
    <el-dialog title="【HQ2587355】会签" :visible.sync="DialogVisible1" width="40%" class="Visible3">
      <el-form label-width="80px" :model="form5">
        <el-form-item label="会签：" class="TTarea" label-width="100px">
          <el-input type="textarea" v-model="form5.InputArea"></el-input>
        </el-form-item>
      </el-form>
       <div slot="footer" class="dialog-footer buttons">
        <el-button class="btn" @click="DialogVisible1 = false">确认</el-button>
        <el-button @click="DialogVisible1 = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "dialogMonth",
  props: {
    DialogVisible: {},
  },
  data() {
    return {
      num: 0,
      select_Val: "",
      doubleFlag: false,
      DialogVisible1: false,
      tab2: ["工单", "流程足迹"],
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
      tableData1List: [
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
        {},
        {},
      ],
    };
  },
  watch: {
    DialogVisible() {
      if (this.DialogVisible == false) {
        this.doubleFlag = false;
      }
    },
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
    // 双击事件
    doubleClick() {
      this.doubleFlag = true;
    },
    // 计划管理项
    jhglxClick() {
      // alert(99)
      this.$emit("func", false);
      this.$store.state.DialogVisible2 = true;
      // this.DialogVisible=false
    },
    // 会签工单
    QsgdClick() {
      this.DialogVisible1 = true;
    },
    Return() {
      this.doubleFlag = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.Nav_tab_box {
  // 弹框内的tab切换
  .middleNav_tab {
    margin-bottom: 20px;
    span {
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      border: 1px solid #3bb5a0;
    }
    :nth-of-type(1) {
      border-radius: 5px 0 0 5px;
    }
    :nth-child(2) {
      border-radius: 0 5px 5px 0;
    }
  }
  .tab_title {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
    span {
      height: 30px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      color: #3bb5a0;
      margin-left: 10px;
      margin-bottom: -1px;
      i {
        color: #ccc;
        font-size: 12px;
        font-style: normal;
        cursor: pointer;
      }
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
  .detailBox {
    /deep/.el-input__icon {
      line-height: 25px;
    }
  }
  .btn {
  color: white;
  background: #3ab5a0;
}
.TTarea{
  /deep/.el-textarea__inner{
    height: 150px;
  }
}
}
</style>