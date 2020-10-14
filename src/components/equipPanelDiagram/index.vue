<template>
    <div class="independent">
        <el-dialog class="independent" :visible.sync="$store.state.equipPanelDiagram" width="30%"
            :before-close="closedialogs" append-to-body>
            <div class="headerbox">
                <div class="leftheader">
                    <img src="../../assets/img/components-dialog/设备面板图.png" alt />
                    <div class="headertitle">设备面板图</div>
                </div>
                <div class="rightheader">
                    <img src="../../assets/img/components-dialog/编辑.png" alt />
                    <img src="../../assets/img/components-dialog/感叹号.png" alt />
                    <img src="../../assets/img/components-dialog/最小化.png" @click="closedialogs" alt />
                    <img src="../../assets/img/components-dialog/刷新.png" alt />
                    <img src="../../assets/img/components-dialog/关闭.png" @click="closedialogs" alt />
                </div>
            </div>
            <div class="main">
                <div class="topiconbox">
                    <img src="../../assets/img/components-dialog/四川电网.png" alt />
                    <div class="topicontxt">500kV桃乡变ZXMP S390</div>
                </div>

                <div class="bg">
                    <div v-show="tipsFlag">
                        <div class="tips" ref="tips" :style={top:infoTop,left:infoLeft}>
                            <p>名称：桃乡|11槽1端口</p>
                            <p>全局名称：E_2M[尖山I:1框-11槽-1端口-时隙：1 桃乡变：1框-11槽-3端口</p>
                            <p>简称: 11槽1端口</p>
                            <p>所属插槽：（空）</p>
                            <p>显示序号： </p>
                            <p>序号： 51</p>
                            <p>板卡类型：</p>
                            <p>生产厂家：中兴</p>
                            <p>厂家设备类型：</p>
                            <p>投运日期：2010-12-16</p>
                            <p>使用状态：空闲</p>
                            <p>退运日期：</p>
                        </div>
                    </div>
                    <img src="../../assets/img/components-dialog/topPanel.png" class="topPanel" style="left:47px"
                        @contextmenu="showMenu" @click="imgIndex = 'top1'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'top1' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/topPanel.png" class="topPanel" style="left:75px"
                        @contextmenu="showMenu" @click="imgIndex = 'top2'" @mouseover="basicInfoShow"
                        @mouseout="tipsFlag = false" :class="imgIndex == 'top2' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/topPanel.png" class="topPanel" style="left:119px"
                        @contextmenu="showMenu" @click="imgIndex = 'top3'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'top3' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/topPanel.png" class="topPanel" style="left:147px"
                        @contextmenu="showMenu" @click="imgIndex = 'top4'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'top4' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/topPanel.png" class="topPanel" style="left:162px"
                        @contextmenu="showMenu" @click="imgIndex = 'top5'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'top5' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/topPanel.png" class="topPanel" style="left:190px"
                        @contextmenu="showMenu" @click="imgIndex = 'top6'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'top6' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/topPanel.png" class="topPanel" style="left:206px"
                        @contextmenu="showMenu" @click="imgIndex = 'top7'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'top7' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/topPanel.png" class="topPanel" style="left:221px"
                        @contextmenu="showMenu" @click="imgIndex = 'top8'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'top8' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/topBigPanel.png" class="topPanel"
                        style="width: 28px;left:235px" @contextmenu="showMenu" @click="imgIndex = 'top9'"
                        @mouseover="basicInfoShow" @mouseout="basicInfoHide"
                        :class="imgIndex == 'top9' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/topBigPanel.png" class="topPanel"
                        style="width: 28px;left:262px" @contextmenu="showMenu" @click="imgIndex = 'top10'"
                        @mouseover="basicInfoShow" @mouseout="basicInfoHide"
                        :class="imgIndex == 'top10' ? 'activeImg' : ''">

                    <img src="../../assets/img/components-dialog/bottomPanel.png" class="bottomPanel" style="left:39px"
                        @contextmenu="showMenu" @click="imgIndex = 'bottom1'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'bottom1' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/bottomPanel.png" class="bottomPanel" style="left:69px"
                        @contextmenu="showMenu" @click="imgIndex = 'bottom2'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'bottom2' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/bottomPanel.png" class="bottomPanel" style="left:115px"
                        @contextmenu="showMenu" @click="imgIndex = 'bottom3'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'bottom3' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/bottomPanel.png" class="bottomPanel" style="left:146px"
                        @contextmenu="showMenu" @click="imgIndex = 'bottom4'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'bottom4' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/bottomPanel.png" class="bottomPanel" style="left:161px"
                        @contextmenu="showMenu" @click="imgIndex = 'bottom5'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'bottom5' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/bottomPanel.png" class="bottomPanel" style="left:191px"
                        @contextmenu="showMenu" @click="imgIndex = 'bottom6'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'bottom6' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/bottomPanel.png" class="bottomPanel" style="left:207px"
                        @contextmenu="showMenu" @click="imgIndex = 'bottom7'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'bottom7' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/bottomPanel.png" class="bottomPanel" style="left:222px"
                        @contextmenu="showMenu" @click="imgIndex = 'bottom8'" @mouseover="basicInfoShow"
                        @mouseout="basicInfoHide" :class="imgIndex == 'bottom8' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/bottomBigPanel.png" class="bottomPanel"
                        style="left:237px;" @contextmenu="showMenu" @click="imgIndex = 'bottom9'"
                        @mouseover="basicInfoShow" @mouseout="basicInfoHide"
                        :class="imgIndex == 'bottom9' ? 'activeImg' : ''">
                    <img src="../../assets/img/components-dialog/bottomBigPanel.png" class="bottomPanel"
                        style="left:266px;" @contextmenu="showMenu" @click="imgIndex = 'bottom10'"
                        @mouseover="basicInfoShow" @mouseout="basicInfoHide"
                        :class="imgIndex == 'bottom10' ? 'activeImg' : ''">
                </div>
            </div>
            <vue-context-menu :contextMenuData="contextMenuData" @savedata="savedata" @newdata="newdata">
            </vue-context-menu>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                tipsFlag: false,
                infoTop: "",
                infoLeft: "",
                imgIndex: '',
                contextMenuData: {
                    menuName: 'demo',
                    // The coordinates of the display(菜单显示的位置)
                    axis: {
                        x: null,
                        y: null
                    },
                    // Menu options (菜单选项)
                    menulists: [
                        //     {
                        //     fnHandler: 'newdata',
                        //     icoName: 'fa fa-home fa-fw',
                        //     btnName: '查看属性'
                        // }, 
                        {
                            fnHandler: 'savedata', // Binding events(绑定事件)
                            icoName: 'fa fa-home fa-fw', // icon (icon图标 )
                            btnName: '承载光路/通道' // The name of the menu option (菜单名称)
                        }
                    ]
                }
            }
        },
        watch: {
            visible(value) {
                if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                    document.body.removeEventListener('click', this.closeMenu)
                }
            },
            tipsFlag(news, lods) {
                console.log(news);
            }
        },
        methods: {
            closedialogs() {
                this.$store.commit("openEquipPanelDiagram", {
                    boolean: false
                });
            },
            showMenu() {
                event.preventDefault()
                var x = event.clientX
                var y = event.clientY
                // Get the current location
                this.contextMenuData.axis = {
                    x,
                    y
                }
            },
            savedata() {
                this.$store.commit("openBearingDialog", {
                    boolean: true
                })
            },
            newdata() {
                this.$store.commit("openBasicInfo", {
                    boolean: true
                })
            },
            basicInfoShow(e) {
                this.tipsFlag = true;
                var tips = this.$refs.tips;
                this.infoTop = (e.clientY - 140) + 'px';
                this.infoLeft = (e.offsetX + 48) + 'px';
            },
            basicInfoHide() {
                this.tipsFlag = false
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

                .main {
                    position: relative;
                    width: 868px;
                    height: 540px;
                    margin: 4px auto;
                    background: #F8FAF9;
                    border: 2px solid #E5E5E5;

                    .topiconbox {
                        height: 46px;
                        width: 220px;
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

                    .title {
                        margin-top: 30px;
                        margin-left: 30px;
                        font-size: 18px;
                    }

                    .bg {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 321px;
                        height: 400px;
                        transform: translate(-50%, -50%);
                        background: url("../../assets/img/components-dialog/panelBg.png") no-repeat;
                        background-size: contain;

                        img {
                            cursor: pointer;
                        }

                        .tips {
                            position: absolute;
                            box-sizing: border-box;
                            z-index: 9999;
                            width: 270px;
                            padding: 5px;
                            background: #3798C2;
                            color: #fff;
                            // opacity: 0.7;
                            border-radius: 5px;
                        }

                        img:hover {
                            transform: scale(1.1);
                        }

                        .activeImg {
                            box-shadow: -2px 2px 5px rgba($color: black, $alpha: 0.5);
                        }

                        .topPanel {
                            position: absolute;
                            height: 130px;
                            top: 30px;
                        }

                        .bottomPanel {
                            position: absolute;
                            height: 137px;
                            bottom: 59px;
                        }
                    }

                }
            }
        }
    }
</style>