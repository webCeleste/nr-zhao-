<template >
  <div class="search">
    <el-container>
      <el-header>
        <el-row :gutter="20" class="navs">
          <el-col :span="6" :offset="18">
            <div class="imgbox">
              <div class="imgs">
                <img src="../../assets/img/search/编辑.png" alt />
              </div>
              <div class="imgs">
                <img src="../../assets/img/search/问号(1).png" alt />
              </div>
              <div class="imgs">
                <img src="../../assets/img/search/感叹号.png" alt />
              </div>
              <div class="imgs">
                <img src="../../assets/img/search/铃铛.png" alt />
              </div>
              <div class="imgs">
                <img src="../../assets/img/search/个人(1).png" alt />
              </div>
              <div class="texts" style="margin: 0 10px">Admin</div>
              <div class="imgs">
                <img src="../../assets/img/search/删除.png" alt />
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="intelligentsearch">
          <img class="logos" src="../../assets/img/search/yun.png" alt />
          <div class="logotxt">通信全网搜索</div>
        </div>
      </el-header>
      <el-main>
        <div class="inputbox">
          <el-input class="input" style="height: 46px" v-model="input" placeholder="请输入内容"></el-input>
          <div class="sousubox" @click="searchs">
            <img src="../../assets/img/search/sousuo.png" alt />
          </div>
        </div>
        <div class="sousuolis" v-if="querylist.length != 0">
          <div class="leftsoutx">搜索记录:</div>
          <div class="mainsousuo">
            <div class="lishisous" v-for="item in querylist" :key="item" @click="query(item)">{{item}}</div>
          </div>
          <div class="rightsanc">
            <img src="../../assets/img/search/sanchu.png" alt @click="deleteist" />
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: "",
      querylist: [
          "四川",
          "检修",
          "变压器",
          "自动化",
          "储能",
          "缺陷",
          "运维分析",
          "光伏"
        ],
    };
  },
  methods: {
    deleteist() {
      this.querylist = [];
    },
    searchs() {
      if (this.input) {
        this.$router.push("/opticla");
      }
    },
    query(val){
      this.input = val;
      this.$router.push({path:'/opticla',query:{query:val}});
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  height: 100%;
  // background: chocolate;
  .el-container {
    height: 100%;
    position: relative;
    .el-header {
      position: relative;
      height: 42% !important;
      background-color: #3bb5a0;
      color: #fff;
      .navs {
        height: 55px;
        // background: chocolate;
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
            border-right: 2px solid #fff;
            padding-right: 10px;
            height: 20px;
          }
        }
      }
      .intelligentsearch {
        position: absolute;
        width: 390px;
        height: 46px;
        top: 62%;
        left: calc(50% - 180px);
        display: flex;
        // background: chartreuse;
        .logos {
          width: 66px;
          height: 46px;
        }
        .logotxt {
          margin-left: 20px;
          font-size: 45px;
          line-height: 46px;
        }
      }
    }
    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
      .inputbox {
        width: 470px;
        height: 46px;
        // background: chocolate;
        position: absolute;
        box-shadow: 2px 2px 5px rgba(000, 000, 000, 0.3);
        border-radius: 22px;
        margin: 10px;
        top: calc(42% - 23px);
        left: calc(50% - 235px);
        z-index: 9;
        display: flex;
        /deep/.el-input__inner {
          height: 46px;
          width: 417px;
          border-radius: 22px 0 0 22px;
        }
        .sousubox {
          width: 63px;
          height: 46px;
          background: #0fa081;
          vertical-align: bottom;
          border-radius: 0 22px 22px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            height: 24px;
            width: 24px;
          }
        }
      }
      .sousuolis {
        width: 470px;
        height: 78px;
        // background: chocolate;
        margin: 40px auto 0;
        display: flex;
        font-size: 13px;
        .leftsoutx {
          width: 70px;
        }
        .mainsousuo {
          width: 350px;
          display: flex;
          flex-wrap: wrap;
          .lishisous {
            width: 116px;
            height: 25px;
            cursor: pointer;
          }
        }
        .rightsanc {
          width: 14px;
          height: 14px;
          img {
            width: 14px;
            height: 14px;
          }
        }
      }
    }
  }
}
</style>