<template>
  <div>
    <el-dialog :visible.sync="management" width="30%" :before-close="handleClose">
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
    management: Boolean,
  },
  data() {
    return {
      menusboxlist: [
        {
          url: require("../../assets/img/home/通信资源.png"),
          title: "检修计划管理(月度)",
        },
        {
          url: require("../../assets/img/home/通信资源.png"),
          title: "检修计划管理(年度)",
        },
        {
          url: require("../../assets/img/home/基础数据.png"),
          title: "检修票管理",
        },
      ],
    };
  },
  methods: {
    search(val) {
      if (val.title == "检修计划管理(月度)") {
        this.$router.push({
          path: "/overhaul/plan",
          query: { title: val.title },
        });
      } else if (val.title == "检修计划管理(年度)") {
        this.$router.push({
          path: "/overhaul/plan",
          query: { title: val.title },
        });
      } else if (val.title == "检修票管理") {
        this.$router.push({
          path: "/overhaul/administration",
          query: { title: val.title },
        });
      }
    },
    handleClose() {
      this.$emit("update:management", false);
    },
  },
};
</script>