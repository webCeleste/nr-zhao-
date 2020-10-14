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
        :default-checked-keys="['2']"
        :default-expanded-keys="[2]"
        @node-click="handleNodeClick"
        :render-content="renderContent"
      ></el-tree>
    </div>
    <div class="mainboxs" v-show="titles == '值班资源管理'||titles == '值班资料管理'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/工作台/保存.png" alt />
          <span>保存</span>
        </div>
        <div class="buttonbox" @click="changelist">
          <img  src="../../assets/img/值班/xiugai.png" alt />
          <span>编辑</span>
        </div>
        <div class="buttonbox" @click="deletelist">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/刷新1.png" alt />
          <span>刷新</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/置顶.png" alt />
          <span>置顶</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/取消置顶.png" alt />
          <span>取消置顶</span>
        </div>
         <div class="querylist" style="margin-left:20px">
          <el-input v-model="inputs" placeholder="请输入查询内容"></el-input>
          <div class="botons">
            <img src="../../assets/img/值班/工作台/sousuo.png" alt />
            <div class="chaxun">查询</div>
          </div>
        </div>
      </div>
      <div class="tableboxs">
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
            <el-table-column prop="zlName" label="资料名称" align="center"></el-table-column>
            <el-table-column prop="zlFj" align="center" label="附件"></el-table-column>
            <el-table-column prop="zlBz" align="center" label="备注"></el-table-column>
            <el-table-column prop="updataName" align="center" label="上传人"></el-table-column>
            <el-table-column prop="updataTime" align="center" label="上传时间"></el-table-column>

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

    <div class="mainboxs" v-show="titles == '调度电话管理'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/工作台/保存.png" alt />
          <span>保存</span>
        </div>
        <div class="buttonbox" @click="changelist">
          <img  src="../../assets/img/值班/xiugai.png" alt />
          <span>编辑</span>
        </div>
        <div class="buttonbox" @click="deletelist">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/刷新.png" alt />
          <span>刷新</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/导入.png" alt />
          <span>导入</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/导出.png" alt />
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
      <div class="tableboxs">
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
            :current-page.sync="currentPage1"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div class="mainboxs" v-show="titles == '厂家通讯录'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/工作台/保存.png" alt />
          <span>保存</span>
        </div>
        <div class="buttonbox" @click="changelist">
          <img  src="../../assets/img/值班/xiugai.png" alt />
          <span>编辑</span>
        </div>
        <div class="buttonbox" @click="deletelist">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/刷新.png" alt />
          <span>刷新</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/导入.png" alt />
          <span>导入</span>
        </div>
        <div class="buttonbox" style="margin-left:14px" @click="openpupop">
          <img src="../../assets/img/值班/导出.png" alt />
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
  </div>
</template>


<script>

export default {
  data() {
    return {
      titles: "值班资料管理",
      defaultProps: {
        children: "children",
        label: "label"
      },
      data: [
        {
          label: "值班资料管理",
          id: 1,
          children: [
            {
              id: 2,
              label: "值班资源管理",
              icon: "iconfont el-icon-ziliaoguanli"
            },
            {
              id: 3,
              label: "调度电话管理",
              icon: "iconfont el-icon-dianhua"
            },
            {
              id: 4,
              label: "厂家通讯录",
              icon: "iconfont el-icon-tongxunlu"
            }
          ]
        }
      ],
      currentPage3: 5,
      code: 0,
      tableData: [
        {
          zlName: "夜班资料",
          zlFj: "值班附件",
          zlBz: "xx值班单位01",
          updataName: "王一平",
          updataTime:"2020-03-05 22:00:43"
        },
         {
          zlName: "夜班资料",
          zlFj: "值班附件",
          zlBz: "xx值班单位01",
          updataName: "王一平",
          updataTime:"2020-03-05 22:00:43"
        }, {
          zlName: "夜班资料",
          zlFj: "值班附件",
          zlBz: "xx值班单位01",
          updataName: "王一平",
          updataTime:"2020-03-05 22:00:43"
        }
      ],
      tableData1: [
        {
          company: "南京供电",
          name: "张三",
          tell: "0532-455343",
          phone: "199-54362277",
          zw: "值班员",
          bz: "xx值班备注"
        },
        {
          company: "南京供电",
          name: "张三",
          tell: "0532-455343",
          phone: "199-54362277",
          zw: "值班员",
          bz: "xx值班备注"
        },
        {
          company: "南京供电",
          name: "张三",
          tell: "0532-455343",
          phone: "199-54362277",
          zw: "值班员",
          bz: "xx值班备注"
        }
      ],

      tableData2: [
        {
          cj: "xx厂家",
          cjAdress: "秦淮区永智路",
          lxTell: "199-76538765",
          email: "66455@qq.com",
          cjLlpeople: "张三",
          lxrPhone: "0512-6355431",
          bz: "XX备注"
        },
        {
          cj: "xx厂家",
          cjAdress: "秦淮区永智路",
          lxTell: "199-76538765",
          email: "66455@qq.com",
          cjLlpeople: "张三",
          lxrPhone: "0512-6355431",
          bz: "XX备注"
        },
        {
          cj: "xx厂家",
          cjAdress: "秦淮区永智路",
          lxTell: "199-76538765",
          email: "66455@qq.com",
          cjLlpeople: "张三",
          lxrPhone: "0512-6355431",
          bz: "XX备注"
        }
      ]
    };
  },
  watch: {
    multipleSelection(val) {
      if (val.length == 1 && val.length != 0) {
        this.buttons = false;
      } else {
        this.buttons = true;
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      let dom = document.getElementById("tree").childNodes[0];
      dom.className += " is-current";
    });
  },
  methods: {
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
      if (data.label !== "值班单位") {
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
        .then(_ => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map(val => {
              this.tableData2.map((item, indexs) => {
                if (val.name == item.name) {
                  this.tableData2.splice(indexs, 1);
                }
              });
            });
          }
          done();
        })
        .catch(_ => {});
    },
    deletelisttemplates() {
      this.$confirm(
        "确认删除列表选中的数据,已经在排班或值班应用的值班班组不能删除？"
      )
        .then(_ => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map(val => {
              this.tableData4.map((item, indexs) => {
                if (val.name == item.name) {
                  this.tableData4.splice(indexs, 1);
                }
              });
            });
          }
          done();
        })
        .catch(_ => {});
    },
    deletelistduty() {
      this.$confirm(
        "确认删除列表选中的值班职责,已经在排班或值班应用的值班班组不能删除？"
      )
        .then(_ => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map(val => {
              this.tableData3.map((item, indexs) => {
                if (val.name == item.name) {
                  this.tableData3.splice(indexs, 1);
                }
              });
            });
          }
          done();
        })
        .catch(_ => {});
    },
    deletelistteam() {
      this.$confirm(
        "确认删除列表选中的值班班组,已经在排班或值班应用的值班班组不能删除？"
      )
        .then(_ => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map(val => {
              this.tableData1.map((item, indexs) => {
                if (val.name == item.name) {
                  this.tableData1.splice(indexs, 1);
                }
              });
            });
          }
          done();
        })
        .catch(_ => {});
    },
    deletelist() {
      this.$confirm(
        "删除时将同步删除该值班单位下的值班班次、班组、职责和自动排班模板等信息，是否确认删除？"
      )
        .then(_ => {
          if (this.multipleSelection.length != 0) {
            console.log(1111);
            this.multipleSelection.map(val => {
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
        .catch(_ => {});
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
        this.multipleSelection.map(val => {
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
        this.multipleSelection.map(val => {
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
        this.multipleSelection.map(val => {
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
        this.multipleSelection.map(val => {
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
        this.multipleSelection.map(val => {
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
    }
  }
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
</style>