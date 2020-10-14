<template>
  <div>
    <div>
      <el-form label-width="80px" class="elFromBox">
        <el-form-item label="工单编号:" label-width="100px" style="height:35px">
          <el-select v-model="select_Val1" placeholder="请选择城市">
            <el-option
              v-for="item in options_LX1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="mainboxs">
        <div class="buttonlist butList">
          <div class="buttonbox" @click="NewSet" style="margin-left:14px">
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
            <img src="../../assets/img/值班/导出.png" alt />
            <span>导出</span>
          </div>

          <div class="querylist" style="width:140px">
            <el-select v-model="select_Val2" placeholder="请选择影响等级">
              <el-option
                v-for="item in options_LX2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="querylist" style="width:140px;margin-left:10px">
            <el-select v-model="select_Val3" placeholder="请选择编制的计划">
              <el-option
                v-for="item in options_LX3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="querylist" style="width:140px;margin-left:10px">
            <el-select v-model="select_Val4" placeholder="请选择审批状态">
              <el-option
                v-for="item in options_LX4"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="tableboxs flexColum">
          <div class="tablebox">
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
              <el-table-column prop="company" align="center" label="单位"></el-table-column>
              <el-table-column prop="name" align="center" label="数目"></el-table-column>
              <el-table-column prop="tell" align="center" label="待审批"></el-table-column>
              <el-table-column prop="phone" align="center" label="审批通过"></el-table-column>
              <el-table-column prop="zw" align="center" label="审批不通过"></el-table-column>
              <el-table-column prop="bz" align="center" label="退回"></el-table-column>
            </el-table>
          </div>
          <div class="pages">
            <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dialogYearPlan",
  data() {
    return {
      select_Val1: "",
      select_Val2: "",
      select_Val3: "",
      select_Val4: "",
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
      options_LX1: [
        {
          value: "选项1",
          label: "福建",
        },
        {
          value: "选项2",
          label: "浙江",
        },
        {
          value: "选项3",
          label: "南京",
        },
      ],
      options_LX2: [
        {
          value: "选项1",
          label: "等级1",
        },
        {
          value: "选项2",
          label: "等级2",
        },
      ],
      options_LX3: [
        {
          value: "选项1",
          label: "计划一",
        },
        {
          value: "选项2",
          label: "计划二",
        },
      ],
      options_LX4: [
        {
          value: "选项1",
          label: "已审核",
        },
        {
          value: "选项2",
          label: "未审核",
        },
      ],
    };
  },
  methods: {
    NewSet() {
      this.$emit("func1", false);
    },
  },
};
</script>
<style lang="scss">
.flexColum{
    height: 520px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}
.buttonlist {
  height: 34px;
  background-image: linear-gradient(#fff, #e0eded);
  display: flex;
  align-items: center;
  border-bottom: 1px solid #91cecf;
  margin-bottom: 10px;
  border: 1px solid #eee;
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
    /deep/.el-input__icon {
      line-height: 25px;
    }
  }
  .noopen {
    pointer-events: none;
  }
}
.elFromBox {
  /deep/.el-form-item {
    height: 26px;
    width: 280px;
    margin-left: 68%;
  }

  /deep/.el-input__inner {
    height: 28px;
    width: 150px;
  }
}
.butList {
  border-bottom: none;
  margin-bottom: 0;
}
</style>