<template>
    <div class="independent">
        <el-dialog class="independent" :visible.sync="$store.state.transTopology" width="30%"
            :before-close="closedialogs" append-to-body>
            <div class="headerbox">
                <div class="leftheader">
                    <img src="../../assets/img/components-dialog/machineroomicon.png" alt />
                    <div class="headertitle">传输拓扑图</div>
                </div>
                <div class="rightheader">
                    <img src="../../assets/img/components-dialog/编辑.png" alt />
                    <img src="../../assets/img/components-dialog/感叹号.png" alt />
                    <img src="../../assets/img/components-dialog/最小化.png" @click="closedialogs" alt />
                    <img src="../../assets/img/components-dialog/刷新.png" alt />
                    <img src="../../assets/img/components-dialog/关闭.png" @click="closedialogs" alt />
                </div>
            </div>
            <iframe src="./html/transTopology.html" width="881" height="540" frameborder="0" scrolling="auto">
            </iframe>
            <!-- <bearingData></bearingData> -->
        </el-dialog>
    </div>
</template>

<script>
    // import bearingData from "../../components/bearingDialog/index"; //承载光路/通道

    export default {
        // components: {
        //     bearingData
        // },
        created() {
            //承载通道/光路
            window["bearingData"] = () => {
                this.openBearingDialog();
            };
            // 设备卡片
            window["viewCard"] = () => {
                this.openViewCard();
            };
            // 光缆卡片
            window["viewCable"] = () => {
                this.openViewCable();
            };
        },
        methods: {
            closedialogs() {
                this.$store.commit("openTransTopology", {
                    boolean: false
                });
            },
            openBearingDialog() {
                this.$store.commit("openBearingDialog", {
                    boolean: true
                });
            },
            openViewCard() {
                this.$store.commit("openTransTopology", {
                    boolean: false
                });
            },
            openViewCable() {
                this.$store.commit("openopticalcable", {
                    boolean: true
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
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
            }
        }
    }
</style>