<template>
  <div class="about">
    <el-row class="navs">
      <el-col :span="8" :offset="1" class="leftnav">
        <div class="logoimg">
          <img src="../../assets/img/opticalcable/yun.png" alt />
        </div>
        <div class="logotitle">发电概况</div>
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
    <el-row class="titles">
      <el-col :span="2" class="leftnav stategrid">
        <div class="logotitle">国家电网</div>
      </el-col>
      <el-col :span="2" class="leftnav present">
        <div class="logotitle">现状</div>
      </el-col>
      <el-col :span="2" class="leftnav">
        <div class="logotitle">在建规划</div>
      </el-col>
    </el-row>
    <el-row class="mainsbox">
      <el-row type="flex" class="maplistbox" justify="space-around">
        <div class="leftboxlist">
          <div class="noboxs"></div>
          <div class="listboxs">
            <div class="titletext">国家电网发电概况</div>
            <div class="liststable">
              <el-row class="tabletitle">
                <el-col :span="6">
                  <div class="grid-content bg-purple">电厂类型</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">电厂(座)</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">机组(台)</div>
                </el-col>
                <el-col :span="6">
                  <div class="grid-content bg-purple">装机(万千瓦)</div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
        <div class="mapbox"></div>
      </el-row>
    </el-row>
  </div>
</template>
<style lang="scss" scoped>
.about {
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
  .titles {
    height: 32px;
    background: #e5f3f9;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin: 5px 0;
    border: 1px solid #78b3b3;
    .leftnav {
      text-align: center;
    }
    .stategrid {
      background: #19b1f4;
      color: #fff;
    }
    .present {
      color: #fff;
      background: #3ab5a0;
    }
  }
  .mainsbox {
    // background: cyan;
    flex: 1;
    margin: auto 0;
    .maplistbox {
      height: 504px;
      background: darkcyan;
      margin: 0 15px 12px 15px;
      .leftboxlist {
        width: 60%;
        background: darkgreen;
        display: flex;
        .noboxs {
          width: 50%;
        }
        .listboxs {
          flex: 1;
          background: darkgrey;
          display: flex;
          flex-direction: column;
          .titletext {
            height: 48px;
            text-align: center;
            line-height: 48px;
          }
          /deep/.liststable {
            flex: 1;
            background: chocolate;
            margin: 0 !important;
            .tabletitle {
              height: 46px;
              line-height: 46px;
              .el-col {
                text-align: center;
              }
              
            }
          }
        }
      }
      .mapbox {
        flex: 1;
      }
    }
  }
}
</style>
<script>
// eslint-disable-next-line no-unused-vars
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>
