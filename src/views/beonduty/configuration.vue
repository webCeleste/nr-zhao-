<template>
  <div class="viewsbox">
    <div class="treebox">
      <el-tree
        id="tree"
        class="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        highlight-current
        :default-expanded-keys="[1,2]"
        @node-click="handleNodeClick"
        :render-content="renderContent"
      ></el-tree>
    </div>
    <div class="mainboxs" v-if="titles == '值班单位'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div :class="['buttonbox', { noopen: buttons}]" @click="changelist">
          <img v-if="!buttons" src="../../assets/img/值班/xiugai.png" alt />
          <img v-else-if="buttons" src="../../assets/img/值班/xiugai2.png" alt />
          <span>编辑</span>
        </div>
        <div class="buttonbox" @click="deletelist">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
      </div>
      <div class="tableboxs">
        <div class="tablebox">
          <el-table
            class="tables"
            ref="multipleTable"
            key="攀枝花电力公司"
            :data="tableData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
            @row-dblclick='dbchangelist()'                 
          >
          <!-- 这边加个双击 -->
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="所属公司" align="center" width="250">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="company" align="center" label="值班单位名称"></el-table-column>
            <el-table-column
              prop="beonduty"
              align="center"
              label="值班员"
              width="280"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="beondutyadmin" align="center" label="值班管理员" width="120"></el-table-column>
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

    <div class="mainboxs" v-if="titles == '值班班组'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px" @click="openpupopteam">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div :class="['buttonbox', { noopen: buttons}]" @click="changelistteam">
          <img v-if="!buttons" src="../../assets/img/值班/xiugai.png" alt />
          <img v-else-if="buttons" src="../../assets/img/值班/xiugai2.png" alt />
          <span>编辑</span>
        </div>
        <div class="buttonbox" @click="deletelistteam">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
      </div>
      <div class="tableboxs">
        <div class="tablebox">
          <el-table
            class="tables"
            ref="multipleTable"
            key="值班班组"
            :data="tableData1"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="值班单位" align="center" width="250">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="company" align="center" label="班组名称"></el-table-column>
            <el-table-column
              prop="beonduty"
              align="center"
              label="班组成员"
              width="280"
              show-overflow-tooltip
            ></el-table-column>
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
    </div>

    <div class="mainboxs" v-if="titles == '值班班次'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px" @click="openpupopfrequency">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div :class="['buttonbox', { noopen: buttons}]" @click="changelistfrequency">
          <img v-if="!buttons" src="../../assets/img/值班/xiugai.png" alt />
          <img v-else-if="buttons" src="../../assets/img/值班/xiugai2.png" alt />
          <span>编辑</span>
        </div>
        <div class="buttonbox" @click="deletelistfrequency">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
      </div>
      <div class="tableboxs">
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
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="值班单位" align="center" width="250">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="company" align="center" label="班次名称"></el-table-column>
            <!-- <el-table-column
              prop="beonduty"
              align="center"
              label="班组成员"
              width="280"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="beondutyadmin" align="center" label="值班管理员" width="120"></el-table-column>-->
            <el-table-column prop="date" align="center" label="班次开始时间" width="120"></el-table-column>
            <el-table-column prop="date1" align="center" label="班次结束时间" width="120"></el-table-column>
            <el-table-column prop="span" align="center" label="跨日" width="120"></el-table-column>
            <el-table-column align="center" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  circle
                  icon="el-icon-upload2"
                  @click="upper(scope.$index)"
                ></el-button>
                <el-button
                  size="mini"
                  type="primary"
                  circle
                  icon="el-icon-download"
                  @click="lower(scope.$index)"
                ></el-button>
              </template>
            </el-table-column>
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

    <div class="mainboxs" v-if="titles == '值班职责'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px" @click="openpupopduty">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div :class="['buttonbox', { noopen: buttons}]" @click="changelistduty">
          <img v-if="!buttons" src="../../assets/img/值班/xiugai.png" alt />
          <img v-else-if="buttons" src="../../assets/img/值班/xiugai2.png" alt />
          <span>编辑</span>
        </div>
        <div class="buttonbox" @click="deletelistduty">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
      </div>
      <div class="tableboxs">
        <div class="tablebox">
          <el-table
            class="tables"
            ref="multipleTable"
            key="值班职责"
            :data="tableData3"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="值班单位" align="center" width="250">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="company" align="center" label="职责"></el-table-column>
            <el-table-column
              prop="beonduty"
              align="center"
              label="职责成员"
              width="280"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="span" align="center" label="交接班权限" width="120">
              <template slot-scope="scope">{{scope.row.span == false ? '否' : '是'}}</template>
            </el-table-column>

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
    </div>

    <div class="mainboxs" v-if="titles == '自动排班模板'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px" @click="openpupoptemplates">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div :class="['buttonbox', { noopen: buttons}]" @click="changelisttemplates">
          <img v-if="!buttons" src="../../assets/img/值班/xiugai.png" alt />
          <img v-else-if="buttons" src="../../assets/img/值班/xiugai2.png" alt />
          <span>编辑</span>
        </div>
        <div class="buttonbox" @click="deletelisttemplates">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
      </div>
      <div class="tableboxs">
        <div class="tablebox">
          <el-table
            class="tables"
            ref="multipleTable"
            :data="tableData4"
            key="自动排版模板"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="值班单位" align="center" width="250">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column prop="company" align="center" label="模板名称"></el-table-column>
            <!-- <el-table-column
              prop="beonduty"
              align="center"
              label="职责成员"
              width="280"
              show-overflow-tooltip
            ></el-table-column>-->
            <el-table-column prop="span" align="center" label="使用" width="120">
              <template slot-scope="scope">{{scope.row.span == false ? '否' : '是'}}</template>
            </el-table-column>

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
    </div>

    <Company
    v-if="this.titles == '值班单位'"
      ref="Table"
      :tableboole.sync="tableboole"
      @ruleForm="handelelist"
      :code="code"
      :forms.sync="forms"
    ></Company>

    <Team
     v-if="this.titles == '值班班组'"
      ref="Table"
      :tablebooleteam.sync="tablebooleteam"
      @ruleFormteam="handelelistteam"
      :code="code"
      :forms.sync="forms"
    ></Team>

    <Frequency
     v-if="this.titles == '值班班次'"
      ref="Table"
      :tableboolefrequency.sync="tableboolefrequency"
      @ruleFormfrequency="handelelistfrequency"
      :code="code"
      :forms.sync="forms"
    ></Frequency>

    <Duty
     v-if="this.titles == '值班职责'"
      ref="Table"
      :tablebooleduty.sync="tablebooleduty"
      @ruleFormduty="handelelistduty"
      :code="code"
      :forms.sync="forms"
    ></Duty>

    <Templates
     v-if="this.titles == '自动排班模板'"
      ref="Table"
      :tablebooletemplates.sync="tablebooletemplates"
      @ruleFormtemplates="handelelisttemplates"
      :code="code"
      :forms.sync="forms"
    ></Templates>
  </div>
</template>


<script>
//异步请求
// import {goodsApi} from "@/api"


import Company from "../../components/configurationtable/company";
import Team from "../../components/configurationtable/team";
import Frequency from "../../components/configurationtable/Frequency";
import Duty from "../../components/configurationtable/duty";
import Templates from "../../components/configurationtable/templates";
export default {
  components: {
    Company,
    Team,
    Frequency,
    Duty,
    Templates,
  },
  
  //  created(){
  //     this.initData()
  //   },

  
  //   props: {
  //     titles: String,
  //   },
  data() {
    return {

      titles: "值班单位",
      defaultProps: {
        children: "children",
        label: "label",
      },
      data: [
        {
          label: "值班单位",
          id: 1,
          children: [
            {
              label: "攀枝花电力公司",
              id: 2,
              children: [
                {
                  label: "值班班组",
                  icon: "iconfont el-icon-banzu",
                },
                {
                  label: "值班班次",
                  icon: "iconfont el-icon-banci",
                },
                {
                  label: "值班职责",
                  icon: "iconfont el-icon-zhiweizhize",
                },
                {
                  label: "自动排班模板",
                  icon: "iconfont el-icon-moban",
                },
              ],
            },
          ],
        },
      ],
      currentPage3: 5,
      code: 0,
      tableData: [
        {
          beondutyadmin: "王小虎",
          name: "值班单位01",
          company: "xx值班单位01",
          beonduty: "王一平，李国豪",
        },
        {
          beondutyadmin: "王小虎",
          name: "值班单位02",
          company: "xx值班单位01",
          beonduty: "王小虎",
        },
        {
          beondutyadmin: "王小虎",
          name: "值班单位03",
          company: "xx值班单位01",
          beonduty: "张亚东，刘洋",
        },
        {
          beondutyadmin: "王小虎",
          name: "值班单位04",
          company: "xx值班单位01",
          beonduty: "王小虎",
        },
      ],
      tableData1: [
        {
          beondutyadmin: "王小虎",
          name: "值班单位01",
          company: "xx值班单位01",
          beonduty: "李虎，张东",
        },
        {
          beondutyadmin: "王小虎",
          name: "值班单位02",
          company: "xx值班单位01",
          beonduty: "王小虎",
        },
        {
          beondutyadmin: "王小虎",
          name: "值班单位03",
          company: "xx值班单位01",
          beonduty: "陈坤，王一平",
        },
        {
          beondutyadmin: "王小虎",
          name: "值班单位04",
          company: "xx值班单位01",
          beonduty: "王小虎",
        },
      ],

      tableData2: [
        {
          beondutyadmin: "王小虎",
          date: "08:01",
          date1: "15:20",
          name: "值班单位01",
          span: "是",
          company: "xx值班单位01",
          beonduty: "李虎，张东",
        },
        {
          beondutyadmin: "王小虎",
          span: "是",
          date: "08:01",
          date1: "15:20",
          name: "值班单位02",
          company: "xx值班单位01",
          beonduty: "王小虎",
        },
        {
          beondutyadmin: "王小虎",
          span: "是",
          name: "值班单位03",
          date: "08:01",
          date1: "15:20",
          company: "xx值班单位01",
          beonduty: "陈坤，王一平",
        },
        {
          beondutyadmin: "王小虎",
          span: "否",
          name: "值班单位04",
          date: "08:01",
          date1: "15:20",
          company: "xx值班单位01",
          beonduty: "王小虎",
        },
      ],
      tableData3: [
        {
          name: "值班单位01",
          company: "值班员",
          beonduty: "李虎，张东",
          span: false,
        },
        {
          name: "值班单位02",
          company: "值班班长",
          beonduty: "王鹏",
          span: false,
        },
        {
          name: "值班单位03",
          company: "值班员",
          beonduty: "陈坤，王一平",
          span: false,
        },
        {
          name: "值班单位04",
          company: "值班班长",
          beonduty: "李伟",
          span: true,
        },
      ],
      tableData4: [
        {
          beondutyadmin: "王小虎",
          name: "值班单位01",
          company: "2016年8月自动排版模板01",
          beonduty: "李虎，张东",
          span: true,
        },
        {
          beondutyadmin: "王小虎",
          name: "值班单位02",
          company: "2016年7月自动排版模板01",
          beonduty: "王小虎",
          span: false,
        },
        {
          beondutyadmin: "王小虎",
          name: "值班单位03",
          company: "2016年3月自动排版模板01",
          beonduty: "陈坤，王一平",
          span: false,
        },
        {
          beondutyadmin: "王小虎",
          name: "值班单位04",
          company: "2016年8月自动排版模板01",
          beonduty: "王小虎",
          span: false,
        },
      ],
      listsprop: [],
      multipleSelection: [],
      forms: {},
      tableboole: false,
      tablebooleteam: false,
      tableboolefrequency: false,
      tablebooleduty: false,
      tablebooletemplates: false,
      buttons: true,
    };
  },
  watch: {
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
    //测试
    //  initData(){
    //    console.log(1111);
    //      goodsApi.get()
    //      .then(res=>{
    //        console.log("maya",res)
    //      })
    //   },

    renderContent(h, { node, data }) {
      return (
        <span>
          <i class={data.icon}></i>
          <span> {node.label}</span>
        </span>
      );
    },
    handleNodeClick(data) {
      if (data.label !== "攀枝花电力公司") {
        console.log(data);
        this.titles = data.label;
      }
      let dom = document.getElementById("tree").childNodes[0];
      dom.classList.remove("is-current");
      // console.log(this.titles);
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
    // 双击修改
     dbchangelist() {
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
    deletelistduty() {
      this.$confirm(
        "确认删除列表选中的值班职责,已经在排班或值班应用的值班班组不能删除？"
      )
        .then((_) => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map((val) => {
              this.tableData3.map((item, indexs) => {
                if (val.name == item.name) {
                  this.tableData3.splice(indexs, 1);
                }
              });
            });
          }
          done();
        })
        .catch((_) => {});
    },
    deletelistteam() {
      this.$confirm(
        "确认删除列表选中的值班班组,已经在排班或值班应用的值班班组不能删除？"
      )
        .then((_) => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map((val) => {
              this.tableData1.map((item, indexs) => {
                if (val.name == item.name) {
                  this.tableData1.splice(indexs, 1);
                }
              });
            });
          }
          done();
        })
        .catch((_) => {});
    },
    deletelist() {
      this.$confirm(
        "删除时将同步删除该值班单位下的值班班次、班组、职责和自动排班模板等信息，是否确认删除？"
      )
        .then((_) => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map((val) => {
              this.tableData.map((item, indexs) => {
                if (val.name == item.name) {
                  this.tableData.splice(indexs, 1);
                }
              });
            });
            console.log(this.listsprop);
            this.listsprop = [];
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
    handelelisttemplates(val) {
      if (this.code == 0) {
        console.log(JSON.stringify(val), "----");
        let vals = JSON.parse(JSON.stringify(val));
        this.tableData4.push(vals);
        console.log(this.tableData4);
      } else {
        let vals = JSON.parse(JSON.stringify(val));
        this.multipleSelection.map((val) => {
          this.tableData4.map((item, indexs) => {
            if (val.name == item.name) {
              this.tableData4.splice(indexs, 1, vals);
            }
          });
        });
        this.$refs.Table.resetForm("ruleForm");
      }
    },
    handelelistduty(val) {
      if (this.code == 0) {
        console.log(JSON.stringify(val), "----");
        let vals = JSON.parse(JSON.stringify(val));
        this.tableData3.push(vals);
        console.log(this.tableData3);
      } else {
        let vals = JSON.parse(JSON.stringify(val));
        this.multipleSelection.map((val) => {
          this.tableData3.map((item, indexs) => {
            if (val.name == item.name) {
              this.tableData3.splice(indexs, 1, vals);
            }
          });
        });
        this.$refs.Table.resetForm("ruleForm");
      }
    },
    handelelistteam(val) {
      if (this.code == 0) {
        console.log(JSON.stringify(val), "----");
        let vals = JSON.parse(JSON.stringify(val));
        this.tableData1.push(vals);
        console.log(this.tableData1);
      } else {
        let vals = JSON.parse(JSON.stringify(val));
        this.multipleSelection.map((val) => {
          this.tableData1.map((item, indexs) => {
            if (val.name == item.name) {
              this.tableData1.splice(indexs, 1, vals);
            }
          });
        });
        this.$refs.Table.resetForm("ruleForm");
      }
    },
    handelelist(val) {
      if (this.code == 0) {
        console.log(JSON.stringify(val), "----");
        let vals = JSON.parse(JSON.stringify(val));
        this.tableData.push(vals);
        console.log(this.tableData);
      } else {
        let vals = JSON.parse(JSON.stringify(val));
        this.multipleSelection.map((val) => {
          this.tableData.map((item, indexs) => {
            if (val.name == item.name) {
              this.tableData.splice(indexs, 1, vals);
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
    openpupoptemplates() {
      this.code = 0;
      this.tablebooletemplates = true;
      this.forms = {};
      this.$refs.Table.setQuery(this.forms);
    },
    openpupopduty() {
      this.code = 0;
      this.tablebooleduty = true;
      this.forms = {};
      this.$refs.Table.setQuery(this.forms);
    },
    openpupopteam() {
      this.code = 0;
      this.tablebooleteam = true;
      this.forms = {};
      this.$refs.Table.setQuery(this.forms);
    },
    openpupop() {
      this.code = 0;
      this.tableboole = true;
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

    // /deep/.el-tree-node:focus > .el-tree-node__content {
    //   // color: #fff;

    //   // background: #08b2aa;
    //   /deep/.el-tree-node__expand-icon:before {
    //     color: #fff;
    //   }

    //   // /deep/.is-leaf:before {
    //   //   color: transparent;
    //   // }
    // }
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
</style>