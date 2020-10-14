<template>
    <div class="independent">
        <el-dialog class="independent" :visible.sync="$store.state.bearingDialog" width="30%"
            :before-close="closedialogs" append-to-body>
            <div class="headerbox">
                <div class="leftheader">
                    <img src="../../assets/img/components-dialog/machineroomicon.png" alt />
                    <div class="headertitle">承载光路/通道</div>
                </div>
                <div class="rightheader">
                    <img src="../../assets/img/components-dialog/编辑.png" alt />
                    <img src="../../assets/img/components-dialog/感叹号.png" alt />
                    <img src="../../assets/img/components-dialog/最小化.png" @click="closedialogs" alt />
                    <img src="../../assets/img/components-dialog/刷新.png" alt />
                    <img src="../../assets/img/components-dialog/关闭.png" @click="closedialogs" alt />
                </div>
            </div>
            <el-tabs type="border-card">
                <el-tab-pane label="承载光路">
                    <el-table :data="lightPathData" style="width: 100%" height="587" key="lightPathData">
                        <el-table-column label="名称" width="320">
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="lightpath(scope.$index, lightPathData)" type="text"
                                    size="small">
                                    {{scope.row.name}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="runningState" label="运行状态" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="channelType" label="通道类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="rate" label="速率" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="APlat" label="A端站点" width="120">
                        </el-table-column>
                        <el-table-column prop="ZPlat" label="Z端站点" width="120">
                        </el-table-column>
                        <el-table-column prop="ANetwork" label="A端网元" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ZNetwork" label="Z端网元" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="AType" label="A端资源类型" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ZType" label="Z端资源类型" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="AResources" label="A端资源" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ZResources" label="Z端资源" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="opticalPathLength" label="光路长度（千米）" width="140" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="numberIncluding" label="包含光缆段纤芯数" width="180" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="coreRoutingDesc" label="纤芯路由描述" width="180" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="methodNo" label="方式单号" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="occupancyRate" label="占用率" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="whetherLightCutting" label="是否配置光切" width="180" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="承载通道">
                    <el-table :data="passagewayData" style="width: 100%" height="587" key="passagewayData">
                        <el-table-column prop="name" label="名称" width="240" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="passageway(scope.$index, passagewayData)" type="text"
                                    size="small">
                                    {{scope.row.name}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="runningState" label="运行状态" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="channelType" label="通道类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="rate" label="速率" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="APlat" label="A端站点" width="120">
                        </el-table-column>
                        <el-table-column prop="ZPlat" label="Z端站点" width="120">
                        </el-table-column>
                        <el-table-column prop="ANetwork" label="A端网元" width="250">
                        </el-table-column>
                        <el-table-column prop="ZNetwork" label="Z端网元" width="250">
                        </el-table-column>
                        <el-table-column prop="AType" label="A端资源类型" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ZType" label="Z端资源类型" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="AResources" label="A端资源" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="ZResources" label="Z端资源" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="coreRoutingDesc" label="纤芯路由描述" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="承载业务">
                    <el-table :data="serviceData" style="width: 100%" height="587" key="serviceData">
                        <el-table-column prop="name" label="名称" width="220" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button @click.native.prevent="service(scope.$index, serviceData)" type="text"
                                    size="small">
                                    {{scope.row.name}}
                                </el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="globalName" label="全局名称" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="system" label="所属业务系统" width="180">
                        </el-table-column>
                        <el-table-column prop="businessType" label="业务类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="detailedBusinessType" label="详细业务类型" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="APlat" label="A站点" width="120">
                        </el-table-column>
                        <el-table-column prop="ZPlat" label="Z站点" width="120">
                        </el-table-column>
                        <el-table-column prop="interfaceType" label="接口类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="specialCoreOrNot" label="是否专用纤芯" width="120">
                        </el-table-column>
                        <el-table-column prop="channelsNum" label="通道数量" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="startBusinessDesc" label="起点业务说明" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="endBusinessDesc" label="终点业务说明" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="methodNo" label="方式单号" width="180" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="dispatchingUnit" label="调度单位" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="dispatchingLevel" label="调度等级" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="userUnit" label="使用单位" width="120" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="status" label="状态" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="startTime" label="开通日期" width="100">
                        </el-table-column>
                        <el-table-column prop="endTime" label="退出日期" width="100">
                        </el-table-column>
                        <el-table-column prop="remarks" label="备注" show-overflow-tooltip>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                // 承载光路
                lightPathData: [{
                    name: '(500kV桃乡变~500kV尖山变)中兴10G光路01',
                    runningState: '在役',
                    channelType: '',
                    rate: '155M',
                    AType: '',
                    ZType: '',
                    AResources: '',
                    ZResources: '',
                    APlat: '500kV桃乡变',
                    ZPlat: '500kV尖山变',
                    ANetwork: '',
                    ZNetwork: '',
                    opticalPathLength: '48',
                    numberIncluding: '24',
                    coreRoutingDesc: '',
                    methodNo: '',
                    occupancyRate: '80%',
                    whetherLightCutting: '否',
                    remarks: ''
                }],
                // 承载通道
                passagewayData: [{
                    name: 'E_2M[桃乡I1框-11槽-1端口~时隙：1<>尖山变：1框-11槽-3端口！时隙：1',
                    globalName: '',
                    runningState: '正常',
                    channelType: 'SDH通道',
                    rate: '2M',
                    AType: '',
                    ZType: '',
                    AResources: '',
                    ZResources: '',
                    APlat: '500kV桃乡变',
                    ZPlat: '500kV尖山变',
                    ANetwork: '500kV桃乡变ZXMP S390（桃乡1）',
                    ZNetwork: '500kV尖山变ZXMP S390（尖山1）',
                    coreRoutingDesc: '',
                    remarks: ''
                }, {
                    name: 'E_2M[桃乡I:2框-11槽-1端口-时隙：1 尖山变：1框-11槽-3端口-时隙：1]',
                    globalName: '',
                    runningState: '正常',
                    channelType: 'SDH通道',
                    rate: '2M',
                    AType: '',
                    ZType: '',
                    AResources: '',
                    ZResources: '',
                    APlat: '500kV桃乡变',
                    ZPlat: '500kV尖山变',
                    ANetwork: '500kV桃乡变ZXMP S390（桃乡2）',
                    ZNetwork: '500kV尖山变ZXMP S390（尖山2）',
                    coreRoutingDesc: '',
                    remarks: ''
                }],
                // 接入业务
                serviceData: [{
                    name: '(500kV桃乡变~500kV尖山变)继电保护01',
                    globalName: '川(500kV桃乡变~500kV尖山变)继电保护01',
                    system: '省网继电业务保护系统',
                    businessType: '继电保护',
                    detailedBusinessType: '',
                    APlat: '500kV桃乡变',
                    ZPlat: '500kV尖山变',
                    interfaceType: '2M',
                    specialCoreOrNot: '否',
                    channelsNum: '1',
                    startBusinessType: '',
                    endBusinessType: '',
                    startBusinessDesc: '',
                    endBusinessDesc: '',
                    methodNo: '方式-2019-四川-桃乡-1837',
                    dispatchingUnit: '国网四川电力公司',
                    dispatchingLevel: '三级网',
                    userUnit: '国网四川电力公司',
                    status: '在役',
                    startTime: '2012-06-16',
                    endTime: '',
                    remarks: '通调方字[2012]06-J-009'
                }],
            }
        },
        methods: {
            closedialogs() {
                this.$store.commit("openBearingDialog", {
                    boolean: false
                });
            },
            lightpath() {
                this.$store.commit("openLightpath", {
                    boolean: true
                })
            },
            passageway() {
                this.$store.commit("openPassageway", {
                    boolean: true
                })
            },
            service() {
                this.$store.commit("openBusiness", {
                    boolean: true
                })
            },
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
                        width: 135px;
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

                /** el-tabs ------ start */
                .el-tabs--border-card {
                    height: 626px;
                    // margin: 4px auto 0;
                }

                .el-tabs--border-card>.el-tabs__content {
                    padding: 0;
                }

                .el-tabs--border-card>.el-tabs__header {
                    background: #e5f3f9;
                }

                .el-tabs__item {
                    color: #000;
                }

                .is-active {
                    color: #fff;
                    background: #1d6b5d;
                }

                /** el-table ------ start */

                .el-table td,
                .el-table th.is-leaf {
                    border-bottom: 1px solid #e5e5e5;
                }

                .el-table th {
                    background-color: #f2f2f2;
                    color: #000;
                    font-weight: 400;
                    height: 38px;
                    font-size: 14px;
                }

                .el-table td,
                .el-table th {
                    height: 38px;
                    padding: 0;
                    font-size: 14px;
                    color: #000;
                }

                .cell span {
                    font-size: 14px;
                    color: #297FB8;
                    cursor: pointer;
                }

                /** el-table ------ end */
            }
        }
    }
</style>