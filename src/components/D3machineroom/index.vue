<template>
  <div class="independent">
    <el-dialog
      class="independent"
      :visible.sync="$store.state.D3machineroom"
      width="30%"
      :before-close="closedialogs"
      append-to-body
    >
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/components-dialog/3D机房图.png" alt />
          <div class="headertitle">3D机房图</div>
        </div>
        <div class="rightheader">
          <img src="../../assets/img/components-dialog/编辑.png" alt />
          <img src="../../assets/img/components-dialog/感叹号.png" alt />
          <img src="../../assets/img/components-dialog/最小化.png" @click="closedialogs" alt />
          <img src="../../assets/img/components-dialog/刷新.png" alt />
          <img src="../../assets/img/components-dialog/关闭.png" @click="closedialogs" alt />
        </div>
      </div>
      <div class="mainbox">
        <div class="links"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
     
    };
  },

  methods: {
    closedialogs() {
      this.$store.commit("openD3machineroom", {
        boolean: false
      });
    },
    handleClose(done) {
      console.log(done);
    },
    changeheight() {
      this.heightchage = !this.heightchage;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.independent {
  /deep/.el-dialog {
    width: 885px !important;
    border: 2px solid #5c9792;
    margin-top: 3% !important;
    .el-dialog__header {
      padding: 0;
      // height: 35px;
      .el-dialog__title {
        font-size: 13px;
      }
      .el-dialog__headerbtn {
        display: none;
      }
    }
    .el-dialog__body {
      padding: 0;
      .headerbox {
        height: 35px;
        background: #3ab5a0;
        display: flex;
        justify-content: space-between;
        .leftheader {
          width: 105px;
          height: 35px;
          // background: chartreuse;
          display: flex;
          align-items: center;
          margin-left: 9px;
          img {
            width: 15px;
            height: 15px;
            margin-right: 10px;
          }
          .headertitle {
            font-size: 15px;
            color: #fff;
          }
        }
        .rightheader {
          width: 150px;
          height: 35px;
          // background: chocolate;
          margin-right: 9px;
          display: flex;
          align-items: center;
          img {
            width: 16px;
            object-fit: cover;
            object-position: top;
            margin-left: 10px;
          }
        }
      }
      .mainbox {
        height: 622px;
        width: 877px;
        border: 2px solid #e5e5e5;
        background: url("../../assets/img/components-dialog/machinebackground.png") no-repeat center;
        background-size: 877px 622px;
      }
    }
  }
}
</style>
