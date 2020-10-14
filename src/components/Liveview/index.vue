<template>
  <div class="independent">
    <el-dialog
      class="independent"
      :visible.sync="$store.state.liveview"
      width="30%"
      :before-close="closedialogs"
      append-to-body
    >
      <div class="headerbox">
        <div class="leftheader">
          <img src="../../assets/img/components-dialog/资源实景图白.png" alt />
          <div class="headertitle">资源实景图</div>
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
        <div class="topCarousel" style="height:460px;weight:100%">
          <img :src="banderitems[imgIndex].url" />
          <div class="toleft" @click="toLeft"></div>
          <div class="toright" @click="toRight"></div>
          <div class="titles">{{banderitems[imgIndex].name}}</div>
        </div>
        <div class="bottomCarousel">
          <div
            class="bottomImg"
            v-for="(item,index) in banderitems"
            :key="index"
            :class="index == imgIndex ? 'checked':'unchecked' "
            @click="imgIndex = index"
          >
            <img :src="item.url" />
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgIndex: 0,
      banderitems: [
        {
          url: require("../../assets/img/dialogs/通信设备1.png"),
          name:'通信设备1'
        },
        {
          url: require("../../assets/img/dialogs/通信设备2.png"),
          name:'通信设备2'
        },
        {
          url: require("../../assets/img/dialogs/通信设备3.png"),
          name:'通信设备3'
        },
        {
          url: require("../../assets/img/dialogs/通信设备4.png"),
          name:'通信设备4'
        },
        {
          url: require("../../assets/img/dialogs/通信设备5.png"),
          name:'通信设备5'
        },
        {
          url: require("../../assets/img/dialogs/通信设备1.png"),
          name:'通信设备6'
        },
      ],
      curImg: 0
    };
  },
  computed:{

  },
  methods: {
    closedialogs() {
      this.$store.commit("openliveview", {
        boolean: false
      });
    },
    imgChange() {
      console.log(this.imgIndex);
    },
    toLeft() {
      this.imgIndex -= 1;
      if (this.imgIndex < 0) {
        this.imgIndex = this.banderitems.length - 1;
      }
      return this.imgIndex;
    },
    toRight() {
      this.imgIndex += 1;
      if (this.imgIndex >= this.banderitems.length) {
        this.imgIndex = 0;
      }
      return this.imgIndex;
    }
  }
};
</script>

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
        height: 617px;
        width: 864px;
        border: 2px solid #e5e5e5;
        margin: 5px auto 6px;
        .topCarousel {
          position: relative;
          white-space: nowrap;
          overflow: hidden;
          height: 460px;
          border-bottom: 1 px solid #999;
          box-shadow: 0px 5px 5px #999;
          .toleft,
          .toright {
            position: absolute;
            top: calc(50% - 25px);
            width: 50px;
            height: 50px;
            cursor: pointer;
          }
        .titles{
            position: absolute;
            top: 20px;
            left:48%;
            font-size: 18px;
            font-weight: 600;
        }
          .toleft {
            left: 50px;
            background: url("../../assets/img/dialogs/lefts.png") no-repeat;
            background-size: cover;
          }

          .toright {
            right: 50px;
            background: url("../../assets/img/dialogs/right.png") no-repeat;
            background-size: cover;
          }

          img {
            width: 100%;
            height: 460px;
          }
        }

        .bottomCarousel {
          width: 100%;
          height: 140px;
          margin-top: 20px;
          white-space: nowrap;
          overflow: auto;
          .bottomImg {
            display: inline-block;
            width: 150px;
            height: 100px;
            margin: 5px 10px;
            img {
              width: 150px;
              height: 100px;
              //   margin: 15px;
            }
          }

          .checked {
            border: 2px solid #3ab5a0;
            transition: filter 0.3s;
            filter: brightness(1.1) contrast(110%);
          }

          .unchecked {
            filter: brightness(0.5) contrast(110%);
          }
        }
      }
    }
  }
}
</style>>