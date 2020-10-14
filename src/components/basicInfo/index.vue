<template>
    <div class="independents">
        <el-dialog class="independents" :visible.sync="$store.state.basicInfo" width="30%" :before-close="closedialogs"
            append-to-body>
            <div class="headerbox">
                <div class="leftheader">
                    <img src="../../assets/img/components-dialog/传输设备图标.png" alt />
                    <div class="headertitle">基本信息</div>
                </div>
                <div class="rightheader">
                    <img src="../../assets/img/components-dialog/编辑.png" alt />
                    <img src="../../assets/img/components-dialog/感叹号.png" alt />
                    <img src="../../assets/img/components-dialog/最小化.png" @click="closedialogs" alt />
                    <img src="../../assets/img/components-dialog/刷新.png" alt />
                    <img src="../../assets/img/components-dialog/关闭.png" @click="closedialogs" alt />
                </div>
            </div>
            <div class="mainboxs">
                <div class="infobox">
                    <div class="titles">
                        <div class="title" v-for="(item,index) in title" :key="index">{{item}}</div>
                    </div>
                    <div class="contents">
                        <div class="content" v-for="(item,index) in content" :key="index">{{item}}</div>
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
                title: ["名称", "全局名称", "简称", "所属插槽", "显示序号", "序号", "板卡类型", "生产厂家", "厂家设备类型", "投运日期", "使用状态", "退运日期"],
                content: ["500kV桃乡变ZXMP S390","//500kV桃乡变ZXMP S390", "", "(空)", "", "51", "", "中兴", "0", "2010-12-16", "空闲", ""]
            }
        },
        props: {
            msg: String
        },
        watch:{
            msg(news,olds){
                this.content[0] = news;
                this.content[1] = " // "+news;
            }
        },
        methods: {
            closedialogs() {
                this.$store.commit("openBasicInfo", {
                    boolean: false
                });
            },
        }

    }
</script>

<style lang="scss" scoped>
    .independents {
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

                .mainboxs {
                    width: 864px;
                    height: 470px !important;
                    margin: 10px auto;

                    .infobox {
                        display: flex;
                        flex-direction: row;
                        width: 860px;
                        height: 467px;
                        margin: auto;
                        color: #000;
                        border: 1px solid #e8e8e8;

                        .titles {
                            width: 130px;

                            .title {
                                width: 100%;
                                height: 38px;
                                text-align: center;
                                line-height: 38px;
                                background: #F2F2F2;
                                border-right: 1px solid #e8e8e8;
                                border-bottom: 1px solid #e8e8e8;
                            }
                        }

                        .contents {
                            flex: 1;

                            .content {
                                height: 38px;
                                line-height: 38px;
                                padding-left: 15px;
                                border-bottom: 1px solid #e8e8e8;
                            }
                        }

                    }
                }
            }
        }
    }
</style>