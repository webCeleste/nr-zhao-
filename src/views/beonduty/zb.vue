<template>
  <div id="appBOX">
    <div class="zb_box">
      <h1>标题</h1>
      <div>
        <el-button
          class="btnMin"
          v-for="(item,index) in btnList"
          :key="index"
          @click="btnMinClick(item,index)"
        >{{item}}</el-button>
      </div>
    </div>
    <div>
      <div class="watermark1"  v-watermark1="{text:'未审核',font:'40px Microsoft JhengHei',width:'100%',textColor:'rgba(242,106,106, 0.3)'}">

    </div>
    <p>班次信息以及值班信息，班次总结</p>
    <div class="ListBox">
      <p class="pTitle">一,运行记录</p>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="类型" align="center"></el-table-column>
          <el-table-column prop="data" label="来源" align="center"></el-table-column>
          <el-table-column prop="data" label="标题" align="center"></el-table-column>
          <el-table-column prop="data" label="工作内容" align="center"></el-table-column>
          <el-table-column prop="data" label="处理过程" align="center"></el-table-column>
          <el-table-column prop="data" label="状态" align="center"></el-table-column>
        </el-table>
      </div>
      <p class="pTitle">二,工作记录</p>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="标题" align="center"></el-table-column>
          <el-table-column prop="data" label="工作内容" align="center"></el-table-column>
          <el-table-column prop="data" label="状态" align="center"></el-table-column>
        </el-table>
      </div>
      <p class="pTitle">三,工作记录</p>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="标题" align="center"></el-table-column>
          <el-table-column prop="data" label="保障内容" align="center"></el-table-column>
        </el-table>
      </div>
      <p class="pTitle">四,检修执行情况</p>
      <span>4.1今日执行情况</span>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="检修编号" align="center"></el-table-column>
          <el-table-column prop="data" label="单位" align="center"></el-table-column>
          <el-table-column prop="data" label="检修类型" align="center"></el-table-column>
          <el-table-column prop="data" label="标题" align="center"></el-table-column>
          <el-table-column prop="data" label="开工时间" align="center"></el-table-column>
          <el-table-column prop="data" label="完工时间" align="center"></el-table-column>
          <el-table-column prop="data" label="状态" align="center"></el-table-column>
          <el-table-column prop="data" label="重大检修" align="center"></el-table-column>
          <el-table-column prop="data" label="检修风险" align="center"></el-table-column>
        </el-table>
      </div>
      <span>4.2待审批</span>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="检修编号" align="center"></el-table-column>
          <el-table-column prop="data" label="单位" align="center"></el-table-column>
          <el-table-column prop="data" label="检修类型" align="center"></el-table-column>
          <el-table-column prop="data" label="标题" align="center"></el-table-column>
          <el-table-column prop="data" label="开工时间" align="center"></el-table-column>
          <el-table-column prop="data" label="完工时间" align="center"></el-table-column>
          <el-table-column prop="data" label="状态" align="center"></el-table-column>
          <el-table-column prop="data" label="重大检修" align="center"></el-table-column>
          <el-table-column prop="data" label="检修风险" align="center"></el-table-column>
        </el-table>
      </div>
      <span>4.3未执行检修</span>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="检修编号" align="center"></el-table-column>
          <el-table-column prop="data" label="单位" align="center"></el-table-column>
          <el-table-column prop="data" label="检修类型" align="center"></el-table-column>
          <el-table-column prop="data" label="标题" align="center"></el-table-column>
          <el-table-column prop="data" label="开工时间" align="center"></el-table-column>
          <el-table-column prop="data" label="完工时间" align="center"></el-table-column>
          <el-table-column prop="data" label="状态" align="center"></el-table-column>
          <el-table-column prop="data" label="重大检修" align="center"></el-table-column>
          <el-table-column prop="data" label="检修风险" align="center"></el-table-column>
        </el-table>
      </div>
      <p class="pTitle">五,缺陷处理情况</p>
      <span>5.1缺陷单</span>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="缺陷编号" align="center"></el-table-column>
          <el-table-column prop="data" label="缺陷设备" align="center"></el-table-column>
          <el-table-column prop="data" label="缺陷等级" align="center"></el-table-column>
          <el-table-column prop="data" label="安全等级" align="center"></el-table-column>
          <el-table-column prop="data" label="开始时间" align="center"></el-table-column>
          <el-table-column prop="data" label="结束时间" align="center"></el-table-column>
          <el-table-column prop="data" label="缺陷描述" align="center"></el-table-column>
          <el-table-column prop="data" label="缺陷原因" align="center"></el-table-column>
          <el-table-column prop="data" label="处理过程" align="center"></el-table-column>
        </el-table>
      </div>
      <span>5.2根告警</span>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="流水号" align="center"></el-table-column>
          <el-table-column prop="data" label="告警等级" align="center"></el-table-column>
          <el-table-column prop="data" label="告警设备" align="center"></el-table-column>
          <el-table-column prop="data" label="所属系统" align="center"></el-table-column>
          <el-table-column prop="data" label="告警原因" align="center"></el-table-column>
          <el-table-column prop="data" label="网管告警时间" align="center"></el-table-column>
          <el-table-column prop="data" label="告警确认时间" align="center"></el-table-column>
        </el-table>
      </div>
      <p class="pTitle">六,方式执行情况</p>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="方式编号" align="center"></el-table-column>
          <el-table-column prop="data" label="标题" align="center"></el-table-column>
          <el-table-column prop="data" label="状态" align="center"></el-table-column>
        </el-table>
      </div>
      <p class="pTitle">七,工作联系单</p>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="方式编号" align="center"></el-table-column>
          <el-table-column prop="data" label="标题" align="center"></el-table-column>
          <el-table-column prop="data" label="状态" align="center"></el-table-column>
        </el-table>
      </div>
      <p class="pTitle">八,风险预警单</p>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="方式编号" align="center"></el-table-column>
          <el-table-column prop="data" label="标题" align="center"></el-table-column>
          <el-table-column prop="data" label="状态" align="center"></el-table-column>
        </el-table>
      </div>
      <p class="pTitle">九,电气第二种工作票(通信专业用)</p>
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          :data="tableDataTbsq"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="40"></el-table-column>
          <el-table-column prop="data" label="工单编号" align="center"></el-table-column>
          <el-table-column prop="data" label="单位" align="center"></el-table-column>
          <el-table-column prop="data" label="工作场所" align="center"></el-table-column>
          <el-table-column prop="data" label="班组名称" align="center"></el-table-column>
          <el-table-column prop="data" label="工作负责人" align="center"></el-table-column>
          <el-table-column prop="data" label="工作内容" align="center"></el-table-column>
          <el-table-column prop="data" label="开始时间" align="center"></el-table-column>
          <el-table-column prop="data" label="结束时间" align="center"></el-table-column>
        </el-table>
      </div>
      <p class="pTitle">十,其他</p>
      <div class="footerTitle">
        <p>1 交班事宜</p>
        <p class="pl5">交班事宜</p>
        <p>2 值报审批</p>
        <p class="pl5">审批意见</p>
      </div>
      <div class="footer_sp">
        <p>
          <span>审批人:</span>
          <span>审批时间:</span>
        </p>
      </div>
    </div>
    </div>
    <!-- 审核 -->
     <el-dialog title="值报审核" :visible.sync="DialogVisible" width="400px">
       <el-form label-width="80px" :model="form">
        <el-form-item label="审核：" class="textareaBox" label-width="80px" prop="date">
            <el-input type="textarea" style="width:275px;height:200px" v-model="form.desc"></el-input>
        </el-form-item>
       
      </el-form>
      <div slot="footer" class="dialog-footer buttons">
        <el-button type="primary" class="btn" @click="DialogVisible = false">确 认</el-button>
        <el-button @click="DialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Zb",
  data() {
    return {
      DialogVisible:false,
      form:{
        desc:""
      },
      btnList: ["导出", "审批", "日报"],
      tableDataTbsq: [{}, {}],
    };
  },
  methods: {
    btnMinClick(item, index) {
      // alert(999)
      if (index !== 1) {
        this.$confirm(`此操作将提交 ${item} 值报, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "提交成功!",
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消提交",
            });
          });
      }else{
        this.DialogVisible=true
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.watermark1{
  width:200px;
  height:100px;
  position:absolute;
  right: 0;
  top: 28px;
}
.pl5 {
  padding-left: 11px !important;
}
.btnMin {
  color: #3ab5a0;
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  padding: 0;
  z-index: 9999999999999;
  border: 1px solid #3ab5a0;
}
#appBOX {
  .textareaBox{
    /deep/.el-textarea__inner {
      height: 200px;
    }
  }
  .zb_box {
    text-align: center;
    border-bottom: 1px solid #3bb5a0;
    h1 {
      height: 60px;
      font-size: 20px;
      font-weight: 700;
      line-height: 60px;
    }
    > div {
      float: right;
      position: relative;
      top: -45px;
    }
  }
  .ListBox {
        height: 530px;
        width: 100%;
        overflow: auto;
    > span {
      font-size: 12px;
      padding-left: 5px;
    }
  }
  > p {
    padding: 5px;
    margin-bottom: 20px;
  }
  .pTitle {
    padding: 5px;
    color: black;
  }
  .footerTitle {
    p {
      font-size: 12px;
      padding: 5px 0;
    }
  }
  .footer_sp {
    P {
      float: right;
      span {
        display: inline-block;
        width: 200px;
      }
    }
    margin-bottom: 30px;
  }
}
</style>