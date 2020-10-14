<template>
  <div class="viewsbox">
    <div class="treebox">
      <el-tree
        id="tree"
        class="tree"
        :data="dataList"
        :props="defaultProps"
        node-key="id"
        highlight-current
        :default-expanded-keys="[1,2,3]"
        @node-click="handleNodeClick"
        :render-content="renderContent"
      ></el-tree>
    </div>
    <div class="mainboxs">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px" @click="openpupopfrequency">
          <img src="../../assets/img/检修/查看流程图.png" alt />
          <span>查看流程图</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupopfrequency">
          <img src="../../assets/img/检修/查看工作日志.png" alt />
          <span>查看工作日志</span>
        </div>
        <div class="buttonbox" @click="changelist">
          <img src="../../assets/img/值班/xiugai.png" alt />
          <span>导出</span>
        </div>
        <div class="querylist" style="margin-left:20px">
          <el-input v-model="inputs" placeholder="请输入查询内容"></el-input>
          <div class="botons">
            <img src="../../assets/img/值班/工作台/sousuo.png" alt />
            <div class="chaxun">查询</div>
          </div>
        </div>
      </div>
      <div
        class="tableboxs"
        v-show="titles == '代办'|| titles == '经办'|| titles == '全部未完成' || titles == '月检修计划单追踪'"
      >
        <div class="tablebox">
          <el-table
            class="tables"
            ref="multipleTable"
            key="值班职责"
            :data="tableData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" label="序" width="40"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="zlName" label="标题" align="center"></el-table-column>
            <el-table-column prop="Gdzt" align="center" label="工单状态"></el-table-column>
            <el-table-column prop="Month" align="center" label="月份"></el-table-column>
            <el-table-column prop="FqrName" align="center" label="发起人"></el-table-column>
            <el-table-column prop="FqrTime" align="center" label="发起时间"></el-table-column>
            <el-table-column prop="updataBZ" align="center" label="备注"></el-table-column>

            <!-- <el-table-column prop="beondutyadmin" align="center" label="值班管理员" width="120"></el-table-column> -->
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
      <div class="tableboxs" v-show="titles == '归档工单'">
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
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="company" label="单位" align="center"></el-table-column>
            <el-table-column prop="name" align="center" label="姓名"></el-table-column>
            <el-table-column prop="tell" align="center" label="办公电话"></el-table-column>
            <el-table-column prop="phone" align="center" label="手机"></el-table-column>
            <el-table-column prop="zw" align="center" label="职务"></el-table-column>
            <el-table-column prop="bz" align="center" label="备注"></el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
      <div class="tableboxs" v-show="titles == '撤销工单'">
        <div class="tablebox">
          <el-table
            class="tables"
            ref="multipleTable"
            key="值班班次"
            :data="tableData2"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" label="序" width="40"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="cj" label="厂家" align="center"></el-table-column>
            <el-table-column prop="cjAdress" align="center" label="厂家通讯地址"></el-table-column>
            <el-table-column prop="lxTell" align="center" label="联系电话"></el-table-column>
            <el-table-column prop="email" align="center" label="邮箱"></el-table-column>
            <el-table-column prop="cjLlpeople" align="center" label="厂家联络人"></el-table-column>
            <el-table-column prop="lxrPhone" align="center" label="联系人电话"></el-table-column>
            <el-table-column prop="bz" align="center" label="备注"></el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>
    <el-dialog title="月检修计划填报表" :visible.sync="DialogVisible" width="65%" class="Visible3">
      <dialogMonth @func="func" :DialogVisible="DialogVisible"></dialogMonth>
    </el-dialog>
    <el-dialog title="月检修计划项" :visible.sync="DialogVisible1" width="65%" class="Visible3">
      <dialogMonthPlan></dialogMonthPlan>
    </el-dialog>
    <el-dialog title="月检修计划项" :visible.sync="Dialog_yjxjh2" width="65%" class="Visible3">
      <dialogMonthPlan2></dialogMonthPlan2>
    </el-dialog>
     <el-dialog title="检修计划免考核申请单" :visible.sync="Dialog_jxapplyfor" width="65%" class="Visible3">
      <jxapplyfor></jxapplyfor>
    </el-dialog>
    <el-dialog
      title="2020年6月检修计划项"
      @close="closeDialog"
      :visible.sync="DialogVisible2_f"
      width="65%"
      style="min-height=600px"
      class="Visible3 minHeight"
    >
      <dialogYearPlan @func1="func1" :DialogVisible3="DialogVisible3"></dialogYearPlan>
    </el-dialog>
    <el-dialog
      title="新增检修计划项"
      @close="closeDialog1"
      :visible.sync="DialogVisible3"
      width="65%"
      class="Visible3"
    >
      <el-form label-width="80px">
        <el-form-item label="选择计划项类型 :" label-width="270px"></el-form-item>
        <el-form-item label label-width="270px" prop="date">
          <el-radio v-model="radio" label="1">三，四级网月检计划</el-radio>
        </el-form-item>
        <el-form-item label label-width="270px" prop="value">
          <el-radio v-model="radio" label="2">国网一二级骨干通信网(含500KV以上)检修计划项</el-radio>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>


<script>
import dialogMonth from "./dialogMonth";
import dialogMonthPlan from "./dialogMonthPlan";
import dialogMonthPlan2 from "./dialogMonthPlan2";
import dialogYearPlan from "./dialogYearPlan";
import Jxapplyfor from "./Jxapplyfor";

export default {
  data() {
    return {
      titles: "月检修计划单追踪",
      defaultProps: {
        children: "children",
        label: "label",
      },
      inputs: "",
      radio: 0,
      DialogVisible: false,
      DialogVisible1: false, //新增检修计划项
      // DialogVisible2: true,
      DialogVisible3: false,
      Dialog_yjxjh2: false,
      Dialog_jxapplyfor:false,
      dataList: [
        {
          label: "月检修计划单追踪",
          id: 1,
          children: [
            {
              id: 1 - 2,
              label: "代办",
              icon: "iconfont el-icon-daiban",
            },
            {
              id: 1 - 3,
              label: "经办",
              icon: "iconfont el-icon-huoxingicon-103",
            },
            {
              id: 1 - 4,
              label: "全部未完成",
              icon: "iconfont el-icon-weiwancheng",
            },
          ],
        },
        {
          label: "启动月计划",
          id: 2,
          children: [
            {
              id: 2 - 1,
              label: "新建工单",
              icon: "iconfont el-icon-xinjiangongdan",
            },
          ],
        },
        {
          label: "月计划管理",
          id: 3,
          children: [
            {
              id: 3 - 1,
              label: "归档工单",
              icon: "iconfont el-icon-tubiao",
            },
            {
              id: 3 - 2,
              label: "撤销工单",
              icon: "iconfont el-icon-chexiao",
            },
          ],
        },
      ],

      currentPage3: 5,
      code: 0,
      tableData: [
        {
          zlName: "A计划",
          Gdzt: "领导审核",
          Month: "8月份",
          FqrName: "王宇",
          FqrTime: "2020-03-05 22:00:43",
          updataBZ: "无",
        },
        {
          zlName: "A计划",
          Gdzt: "领导审核",
          Month: "8月份",
          FqrName: "王宇",
          FqrTime: "2020-03-05 22:00:43",
          updataBZ: "无",
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

      tableData2: [
        {
          cj: "xx厂家",
          cjAdress: "秦淮区永智路",
          lxTell: "199-76538765",
          email: "66455@qq.com",
          cjLlpeople: "张三",
          lxrPhone: "0512-6355431",
          bz: "XX备注",
        },
        {
          cj: "xx厂家",
          cjAdress: "秦淮区永智路",
          lxTell: "199-76538765",
          email: "66455@qq.com",
          cjLlpeople: "张三",
          lxrPhone: "0512-6355431",
          bz: "XX备注",
        },
        {
          cj: "xx厂家",
          cjAdress: "秦淮区永智路",
          lxTell: "199-76538765",
          email: "66455@qq.com",
          cjLlpeople: "张三",
          lxrPhone: "0512-6355431",
          bz: "XX备注",
        },
      ],
    };
  },
  components: {
    dialogMonth,
    dialogMonthPlan,
    dialogMonthPlan2,
    dialogYearPlan,
    Jxapplyfor,
  },
  computed: {
    DialogVisible2_f() {
      return this.$store.state.DialogVisible2;
    },
  },
  watch: {
    titles() {
      //   alert(this.titles);
      if (this.titles == "经办") {
        this.tableData = [
          {
            zlName: "A计划",
            Gdzt: "检修计划汇总",
            Month: "8月份",
            FqrName: "王宇",
            FqrTime: "2020-03-05 22:00:43",
            updataBZ: "无",
          },
          {
            zlName: "A计划",
            Gdzt: "检修计划汇总",
            Month: "8月份",
            FqrName: "王宇",
            FqrTime: "2020-03-05 22:00:43",
            updataBZ: "无",
          },
        ];
      } else if (this.titles == "全部未完成") {
        this.tableData = [
          {
            zlName: "A计划",
            Gdzt: "未通过",
            Month: "8月份",
            FqrName: "王宇",
            FqrTime: "2020-03-05 22:00:43",
            updataBZ: "无",
          },
          {
            zlName: "A计划",
            Gdzt: "未通过",
            Month: "8月份",
            FqrName: "王宇",
            FqrTime: "2020-03-05 22:00:43",
            updataBZ: "无",
          },
        ];
      } else if (this.titles == "新建工单") {
        this.DialogVisible = true;
      } else {
        this.DialogVisible = false;
      }
    },
    radio() {
      if (this.radio == 1) {
        // alert(22);
        this.DialogVisible1 = true;
        // this.radio == "0";
        //  this.DialogVisible=false
        //  this.DialogVisible3=false
        //  this.$store.state.DialogVisible2=false
      } else {
        this.Dialog_yjxjh2 = true;
      }
    },
    DialogVisible() {
      if (this.DialogVisible == false) {
        this.titles = "月检修计划单追踪";
      }
    },
    // DialogVisible3(){
    //   this.radio='0';
    // },
    multipleSelection(val) {
      if (val.length == 1 && val.length != 0) {
        this.buttons = false;
      } else {
        this.buttons = true;
      }
    },
  },
  mounted() {
    this.$nextTick(() => {
      let dom = document.getElementById("tree").childNodes[0];
      dom.className += " is-current";
    });
  },
  methods: {
    closeDialog() {
      this.$store.state.DialogVisible2 = false;
      this.DialogVisible = true;
    },
    closeDialog1() {
      this.DialogVisible = false;
      this.DialogVisible1 = false;
      this.DialogVisible3 = false;
      this.$store.state.DialogVisible2 = true;
    },
    func(parms) {
      this.DialogVisible = parms;
    },
    func1(parms) {
      // this.DialogVisible=parms

      this.DialogVisible3 = true;
      // this.$store.state.DialogVisible2= parms;
    },
    renderContent(h, { node, data }) {
      return (
        <span>
          <i class={data.icon}></i>
          <span> {node.label}</span>
        </span>
      );
    },
    handleNodeClick(data) {
      console.log(data);
      if (data.label !== "月检修计划单追踪") {
        console.log(data);
        this.titles = data.label;
      }
      let dom = document.getElementById("tree").childNodes[0];
      dom.classList.remove("is-current");
    },
    upper(val) {
      if (val != 0) {
        // console.log(val, "vals");
        let arrs = this.tableData2[val];
        this.tableData2.splice(val, 1);
        this.tableData2.splice(val - 1, 0, arrs);
      }
    },
    lower(val) {
      if (val != this.tableData2.length - 1) {
        // console.log(val, "vals");
        let arrs = this.tableData2[val];
        this.tableData2.splice(val, 1);
        this.tableData2.splice(val + 1, 0, arrs);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changelist() {
      this.tableboole = true;
      this.code = 1;
      this.forms = this.multipleSelection[0];
      this.$refs.Table.setQuery(this.forms);
    },
    changelisttemplates() {
      this.tablebooletemplates = true;
      this.code = 1;
      this.forms = this.multipleSelection[0];
      this.$refs.Table.setQuery(this.forms);
    },
    changelistduty() {
      this.tablebooleduty = true;
      this.code = 1;
      this.forms = this.multipleSelection[0];
      this.$refs.Table.setQuery(this.forms);
    },
    changelistteam() {
      this.tablebooleteam = true;
      this.code = 1;
      this.forms = this.multipleSelection[0];
      this.$refs.Table.setQuery(this.forms);
    },
    changelistfrequency() {
      this.tableboolefrequency = true;
      this.code = 1;
      this.forms = this.multipleSelection[0];
      this.forms.span = this.forms.span == "是" ? true : false;
      this.$refs.Table.setQuery(this.forms);
    },
    deletelistfrequency() {
      this.$confirm(
        "确认删除列表选中的值班班次,已经在排班或值班应用的值班班次不能删除？"
      )
        .then((_) => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map((val) => {
              this.tableData2.map((item, indexs) => {
                if (val.name == item.name) {
                  this.tableData2.splice(indexs, 1);
                }
              });
            });
          }
          done();
        })
        .catch((_) => {});
    },
    deletelisttemplates() {
      this.$confirm(
        "确认删除列表选中的数据,已经在排班或值班应用的值班班组不能删除？"
      )
        .then((_) => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map((val) => {
              this.tableData4.map((item, indexs) => {
                if (val.name == item.name) {
                  this.tableData4.splice(indexs, 1);
                }
              });
            });
          }
          done();
        })
        .catch((_) => {});
    },

    handelelistfrequency(val) {
      if (this.code == 0) {
        console.log(JSON.stringify(val), "----");
        let vals = JSON.parse(JSON.stringify(val));
        vals.span = vals.span ? "是" : "否";
        console.log(vals, "---------------------------");
        this.tableData2.push(vals);
        console.log(this.tableData2);
      } else {
        let vals = JSON.parse(JSON.stringify(val));
        console.log(JSON.stringify(val), "--++++--");
        this.multipleSelection.map((val) => {
          this.tableData2.map((item, indexs) => {
            if (val.name == item.name) {
              this.tableData2.splice(indexs, 1, vals);
            }
          });
        });
        this.$refs.Table.resetForm("ruleForm");
      }
    },

    openpupopfrequency() {
      this.code = 0;
      this.tableboolefrequency = true;
      this.forms = {};
      this.$refs.Table.setQuery(this.forms);
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
  },
};
</script>

<style lang="scss" scoped>
.minHeight {
  /deep/.el-dialog__body {
    height: 600px;
  }
}
.viewsbox {
  height: 100%;
  //   background: cadetblue;
  display: flex;
  .treebox {
    width: 20%;
    background: #f2f2f2;
    margin-right: 10px;
    .el-tree {
      background: #f2f2f2;
      margin-top: 20px;
      height: calc(100% - 20px);
    }

    /deep/.el-tree-node__expand-icon:before {
      color: #08b2aa;
    }
    /deep/.is-leaf:before {
      color: transparent;
    }

    /deep/.is-current > .el-tree-node__content {
      background: #f4f6f8;
    }

    /deep/.is-current > .el-tree-node__content {
      // content: "";
      background: #08b2aa;
      color: #fff;
      /deep/.el-tree-node__expand-icon:before {
        color: #fff;
      }
      /deep/.is-leaf:before {
        color: transparent;
      }
    }
    font-size: 14px;
  }
  .mainboxs {
    flex: 1;
    // width: 100%;
    display: flex;
    flex-direction: column;
    // background: #f2f2f2;
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
    .tableboxs {
      flex: 1;
      //   background: orchid;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tablebox {
        width: calc(100% - 20px);
        margin: 0 10px;
        /deep/.tables {
          /deep/.el-table__header tr,
          .el-table__header th {
            padding: 0;
            height: 40px;
            background: #3bb5a0;
            color: #fff;
          }
          /deep/.el-table__body tr,
          .el-table__body td {
            padding: 0;
            height: 40px;
          }
          /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
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
      .pages {
        /deep/.el-pager li.active {
          color: #3bb5a0;
        }
      }
    }
  }
}
// 弹框样式

/deep/.el-dialog__header {
  padding: 5px;
  background: #3bb5a0;
  .el-dialog__title {
    color: white;
  }
  .el-dialog__headerbtn .el-dialog__close {
    color: white;
  }
}
</style>