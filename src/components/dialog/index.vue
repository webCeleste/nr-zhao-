<template>
  <div class="independent">
    <el-dialog
      class="independent"
      :visible.sync="$store.state.dialogVisibleLightpath"
      width="30%"
      :before-close="closedialogs"
      append-to-body
    >
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/components-dialog/独立通信站.png" alt />
          <div class="headertitle">光路</div>
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
        
     
      </div>
      <div class="tabsbox">
        <div class="tabslistbox">
          <div
            :class="cur == index ? 'switchbutton' :'switchbuttonnone'"
            v-for="(item,index) in tabslist"
            :key="index"
            @click="cur = index"
          >{{item}}</div>
        </div>
        <div class="righticonbox" @click="heightchage = !heightchage">
          <img src="../../assets/img/components-dialog/下拉.png" alt />
        </div>
      </div>
      <el-collapse-transition>
        <div v-show="heightchage">
          <div class="tablemain">
            <div class="leftone">
              <div class="tableleftkey" v-for="(item,index) in tabletopkey" :key="index">{{item}}</div>
            </div>
            <div class="lefttwo">
              <div class="tableleftvalue" v-for="(item,index) in tabletop" :key="index">{{item}}</div>
            </div>
            <div class="leftone">
              <div class="tableleftkey" v-for="(item,index) in tabletopkey2" :key="index">{{item}}</div>
            </div>
            <div class="leftthree">
              <div class="tableleftvalue2" v-for="(item,index) in tabletop2" :key="index">{{item}}</div>
            </div>
          </div>
        </div>
      </el-collapse-transition>
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
      tabletopkey2: [
        "方式单号",
        "光缆段纤芯数",
        "调度等级",
        "是否配置光切",

      ],
      tabletop: [
        "1000kV攀枝花独立通信站",
        "四川电网TMSSC-2340982",
        "16km",
        "47.5%"
      ],
      tabletop2: [
        "TMSSC-2340982",
        "20kV",
        "3",
        "是"
      ]
    };
  },

  methods: {
   
    closedialogs() {
      this.$store.commit("opendialogVisibleLightpath", {
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
        height: 433px;
        width: 864px;
        border: 2px solid #e5e5e5;
        display: flex;
        margin: 4px auto 0;
        .mainleftside {
          width: 627px;
          height: 100%;
          position: relative;
          background: url("../../assets/img/components-dialog/dialogbj2.png")
            no-repeat center;
          background-size: cover;
          .maintopbox {
            width: 627px;
            height: 65px;
            display: flex;
            justify-content: space-between;
            .topiconbox {
              height: 46px;
              width: 105px;
              display: flex;
              align-items: center;
              img {
                width: 19px;
                height: 19px;
                margin: 0 10px;
              }
              .topicontxt {
                font-size: 15px;
                // text-decoration: underline;
                color: #000;
              }
            }
            .maincenterbox {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              // background: chartreuse;
              .hedertitle {
                font-size: 29px;
                line-height: 35px;
                color: #000;
              }
              .numcenter {
                font-size: 12px;
                color: #999;
              }
            }
          }
          .bootoomrightbox {
            position: absolute;
            // left: calc(100% - 125px);

            // background: #999;
            right: 10px;
            bottom: 5px;
            width: 250px;
            // background: chartreuse;
            .gpsbox {
              display: flex;
              justify-content: flex-end;
              img {
                height: 19px;
                margin-right: 15px;
              }
              .gpstitle {
                font-size: 13px;
                line-height: 19px;
                color: #fff;
              }
            }
            .gpsnumbox {
              display: flex;
              justify-content: flex-end;
              height: 38px;
              line-height: 38px;
              font-size: 13px;
              text-decoration: underline;
              color: #fff;
            }
          }
        }
        .links {
          width: 2px;
          height: 100%;
          background: url("../../assets/img/components-dialog/links1.png")
            no-repeat center;
          // background-size: 100% auto;
          margin: 0 0 0 8px;
        }
        .mainrightside {
          flex: 1;
          // background: #43abc4;
          display: flex;
          justify-content: center;
          .mainsbox {
            width: 205px;
            // background: chartreuse;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            .buttonicon {
              height: 56px;
              display: flex;
              align-items: center;
              img {
                width: 23px;
                height: 23px;
                margin-right: 23px;
                cursor: pointer;
              }
            }
            .business {
              width: 205px;
              height: 64px;
              border-radius: 5px;
              margin-bottom: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
              .toptxt {
                font-size: 13px;
                line-height: 20px;
                color: #fff;
              }
              .numboxs {
                display: flex;
                font-size: 13px;
                line-height: 25px;
                color: #fff;
                .numbers {
                  font-size: 15px;
                  line-height: 25px;
                }
              }
            }
            .datebox {
              display: flex;
              justify-content: center;
              margin-bottom: 10px;
              margin-top: -7px;
              img {
                height: 16px;
                margin-right: 12px;
              }
              .datetitle {
                font-size: 12px;
                line-height: 16px;
                color: #1d6b5d;
              }
            }
            .molibox {
              width: 84px;
              height: 26px;
              border-radius: 4px;
              border: 1px solid #999;
              display: flex;
              justify-content: center;
              align-items: center;
              img {
                height: 14px;
                margin-right: 5px;
              }
              .moliboxtitle {
                font-size: 12px;
                color: #000;
              }
            }
          }
        }
      }
      .tabsbox {
        width: 864px;
        height: 34px;
        border-left: 2px solid #e5e5e5;
        border-right: 2px solid #e5e5e5;
        display: flex;
        margin: 0 auto;
        justify-content: space-between;
        background: #e5f3f9;

        .tabslistbox {
          display: flex;
          .switchbutton {
            width:90px;
            display: flex;
            justify-content: center;
            height: 34px;
            background: #1d6b5d;
            line-height: 34px;
            font-size: 15px;
            color: #fff;
            cursor: pointer;
          }
          .switchbuttonnone {
              width: 90px;
              display: flex;
              justify-content: center;
              height: 34px;
              background: #e5f3f9;
              line-height: 34px;
              font-size: 15px;
              color: #000;
              border-right: 1px solid #E5E5E5;
              cursor: pointer;
            }
        }
        .righticonbox {
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 17px;
            margin-right: 20px;
          }
        }
      }
      .tablemain {
        width: 864px;
        height: 150px;
        border: 2px solid #e5e5e5;
        margin: 0 auto 5px;
        display: flex;
        .leftone {
          .tableleftkey {
            width: 115px;
            height: 37px;
            background: #f2f2f2;
            color: #000;
            border-bottom: 1px solid #e5e5e5;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .lefttwo {
          .tableleftvalue {
            width: 362px;
            height: 37px;
            background: #fff;
            color: #000;
            border-bottom: 1px solid #e5e5e5;
            border-right: 1px solid #e5e5e5;
            border-left: 1px solid #e5e5e5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 15px;
          }
        }
        .leftthree {
          .tableleftvalue2 {
            width: 238px;
            height: 37px;
            background: #fff;
            color: #000;
            border-bottom: 1px solid #e5e5e5;
            border-left: 1px solid #e5e5e5;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 15px;
          }
        }
      }
    }
  }
}
</style>
