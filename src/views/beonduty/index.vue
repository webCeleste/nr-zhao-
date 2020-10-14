<template>
  <div class="indexbox">
    <el-row class="navs">
      <el-col :span="8" :offset="1" class="leftnav">
        <div class="logoimg">
          <img src="../../assets/img/opticalcable/yun.png" alt />
        </div>
        <div class="logotitle">{{title}}</div>
      </el-col>
      <el-col :span="6" :offset="9" class="imgbox">
        <div class="imgs">
          <img src="../../assets/img/opticalcable/编辑.png" alt />
        </div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/问号.png" alt />
        </div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/感叹号.png" alt />
        </div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/铃铛.png" alt />
        </div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/个人.png" alt />
        </div>
        <div class="texts" style="margin: 0 10px">Admin</div>
        <div class="imgs">
          <img src="../../assets/img/opticalcable/删除.png" alt />
        </div>
      </el-col>
    </el-row>

    <router-view class="mains"></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  mounted() {
    this.title = this.$route.query.title;
  },
  methods: {
  
  },
};
</script>

<style lang="scss" scoped>
.indexbox {
  height: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
  .navs {
    height: 55px;
    // background: chocolate;
    background: url("../../assets/img/opticalcable/bjtop.png") no-repeat center;
    background-size: cover;
    border-bottom: 5px solid #77cdd1;

    .leftnav {
      display: flex;
      // justify-content: center;
      align-items: center;

      .logoimg {
        width: 34px;
        height: 24px;
        margin-right: 20px;

        img {
          width: 34px;
          height: 24px;
        }
      }

      .logotitle {
        font-size: 19px;
        color: #46a9dc;
        line-height: 50px;
      }
    }

    .imgbox {
      height: 55px;
      display: flex;
      justify-content: center;
      align-items: center;

      .imgs {
        height: 27px;

        img {
          width: 27px;
          height: 27px;
          margin-right: 10px;
        }
      }

      .texts {
        border-right: 2px solid #919191;
        padding-right: 10px;
        height: 20px;
        color: #919191;
      }
    }
  }
  .viewsbox {
    height: 100%;
    //   background: cadetblue;
    display: flex;
  }
  .mains {
    flex: 1;
  }
}
</style>