<template>
  <div class="independent">
    <el-dialog class="independent" :visible.sync="$store.state.sitetopo" width="30%" :before-close="closedialogs" append-to-body>
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/站点平面图/站点平面.png" alt />
          <div class="headertitle">站点平面图</div>
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
        <iframe src="./html/topos.html" width="850" height="630" frameborder="0" scrolling="auto"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // dialogVisible1: true
        cur: 0,
        heightchage: true,
        tabslist: ["基本信息", "承载业务", "承载通道"],
        tabletopkey: ["对象ID", "TMS编号", "光路长度", "占用率"],
        tabletopkey2: ["方式单号", "光缆段纤芯数", "调度等级", "是否配置光切"],
        tabletop: [
          "1000kV攀枝花独立通信站",
          "四川电网TMSSC-2340982",
          "16km",
          "47.5%"
        ],
        tabletop2: ["TMSSC-2340982", "20kV", "3", "是"]
      };
    },
    created() {
      window["vueDefinedMyProp"] = receiveParams => {
        console.log(receiveParams);
        this.receiveParamsFromHtml(receiveParams);
      };
      // window["viewCable"] = () => {
      //   this.receiveviewCable();
      // };
    },
    methods: {
      receiveParamsFromHtml(res) {
        console.log(res,'======')
        if (res == "整流电源01" || res == "整流电源02") {
          console.log(1111)
          this.$store.commit("openPowerSupply", {
            boolean: true
          });
        } else if (res == "分电箱") {
          this.$store.commit("openequipment", {
            boolean: true
          });
        } else {
          this.$store.commit("opencomputerroom", {
            boolean: true
          });
        }
      },
      // 光缆卡片
      // receiveviewCable() {
      //   this.$store.commit("openLightpath", {
      //     boolean: true
      //   })
      // },
      closedialogs() {
        this.$store.commit("opensitetopo", {
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
          height: 626px;
          width: 864px;
          border: 2px solid #e5e5e5;
          display: flex;
          margin: 4px auto 0;
        }
      }
    }
  }
</style>