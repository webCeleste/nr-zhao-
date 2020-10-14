<template>
  <div>
    <el-dialog :visible.sync="popuplist" width="30%" :before-close="handleClose">
      <div class="diobox">
        <div class="menusbox" v-for="(item,index) in menusboxlist" :key="index">
          <img :src="item.url" @click="search(item)" alt />
          <div class="indvtxt">{{item.title}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    popuplist: Boolean,
  },
  data() {
    return {
      menusboxlist: [
        {
          url: require("../../assets/img/home/通信资源.png"),
          title: "值班配置",
        },
        {
          url: require("../../assets/img/home/基础数据.png"),
          title: "值班管理",
        },
        {
          url: require("../../assets/img/home/通信资源.png"),
          title: "值班工作台",
        },
        {
          url: require("../../assets/img/home/状态监视.png"),
          title: "值班资料",
        },
      ],
    };
  },
  methods: {
    search(val) {
      if (val.title == "值班配置") {
        this.$router.push({
          path: "/beonduty/configuration",
          query: { title: val.title },
        });
      } else if (val.title == "值班管理") {
        this.$router.push({
          path: "/beonduty/management",
          query: { title: val.title },
        });
      } else if (val.title == "值班工作台") {
       this.$router.push({
          path: "/beonduty/workbench",
          query: { title: val.title },
        });
      } else if (val.title == "值班资料") {
       this.$router.push({
          path: "/beonduty/information",
          query: { title: val.title },
        });
      }
    },
    handleClose() {
      this.$emit("update:popuplist", false);
    },
  },
};
</script>