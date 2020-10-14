<template>
    <el-dialog class="independent" :visible.sync="$store.state.riskwarningsheet" width="30%"
        :before-close="closedialogs" append-to-body>
        <div class="headerbox">
            <div class="leftheader">
                <img src="../../assets/img/components-dialog/风险预警icon.png" alt />
                <div class="headertitle">风险预警单</div>
            </div>
            <div class="rightheader">
                <div v-if="activeName=='first'">
                    <img src="../../assets/img/components-dialog/导入.png">
                </div>
                <img src="../../assets/img/components-dialog/编辑.png" alt />
                <img src="../../assets/img/components-dialog/感叹号.png" alt />
                <img src="../../assets/img/components-dialog/最小化.png" @click="closedialogs" alt />
                <img src="../../assets/img/components-dialog/刷新.png" alt />
                <img src="../../assets/img/components-dialog/关闭.png" @click="closedialogs" alt />
            </div>
        </div>
        <div class="mainbox">
            <div class="list">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane label="风险预警单" name="first">
                        <h1>风险预警单</h1>
                        <div class="form">
                            <!-- 风险预警单基本信息 -->
                            <div class="basic_info">
                                <div class="list_title">风险预警单基本信息</div>
                                <div class="info">
                                    <!-- prop绑定的是rules，验证规则 -->
                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px"
                                        class="demo-ruleForm" label-position="left">
                                        <el-form-item label="工单编号" prop="no">
                                            <el-input v-model="ruleForm.no" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="填写时间" prop="time">
                                            <el-input v-model="ruleForm.time" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="标题" prop="title" class="wholerow">
                                            <el-input v-model="ruleForm.title" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="编制人" prop="person">
                                            <el-input v-model="ruleForm.person" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="拟制单位">
                                            <el-input v-model="ruleForm.company" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="编制人联系电话" prop="tel">
                                            <el-input v-model="ruleForm.tel" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="编制人联系邮箱">
                                            <el-input v-model="ruleForm.email" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="预警事项" prop="matter" class="textarea">
                                            <el-input type="textarea" v-model="ruleForm.matter" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="预警开始时间" prop="startTime">
                                            <el-input v-model="ruleForm.startTime" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="预警结束时间" prop="endTime">
                                            <el-input v-model="ruleForm.endTime" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="主送单位" prop="mainUnit" class="wholerow mainUnit">
                                            <div class="tips">主送单位以中文顿号【、】分隔，如单位1、单位2</div>
                                            <el-input v-model="ruleForm.mainUnit" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="抄送单位" class="wholerow">
                                            <el-input v-model="ruleForm.ccUnit" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="涉及通信信通" prop="system" class="wholerow">
                                            <el-input v-model="ruleForm.system" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="风险预警对象" class="wholerow">
                                            <el-input v-model="ruleForm.alertObj" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="风险预警来源" class="wholerow">
                                            <el-input v-model="ruleForm.alertSource" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="风险预警等级" prop="alertLevel" class="wholerow">
                                            <el-input v-model="ruleForm.alertLevel" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="承载继电保护、安控类业务" class="textarea">
                                            <el-input type="textarea" v-model="ruleForm.business" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="通信系统风险分析" prop="analysis" class="textarea">
                                            <el-input type="textarea" v-model="ruleForm.analysis" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="风险预控要求" prop="requirement" class="textarea">
                                            <el-input type="textarea" v-model="ruleForm.requirement"
                                                :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="附件" class="wholerow">
                                            <!-- action 上传的地址 -->
                                            <el-upload class="upload-demo" action="#" :on-change="handleChange"
                                                :file-list="fileList">
                                                <div class="demo_list">张涵（四川信通）.doc</div>
                                                <el-button size="small" type="primary" :disabled="disabled">...
                                                </el-button>
                                            </el-upload>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <!-- 处理反馈 -->
                            <div class="basic_info">
                                <div class="list_title">处理反馈</div>
                                <div class="info">
                                    <el-table border ref="feedbackTable" :data="feedbackList" tooltip-effect="dark"
                                        style="width: 100%" @selection-change="handleSelectionChange">
                                        <el-table-column type="index" width="40" align="center">
                                        </el-table-column>
                                        <el-table-column label="填写时间" width="140">
                                            <template slot-scope="scope">{{ scope.row.time }}</template>
                                        </el-table-column>
                                        <el-table-column prop="person" label="编制人">
                                        </el-table-column>
                                        <el-table-column prop="tel" label="联系电话" width="100">
                                        </el-table-column>
                                        <el-table-column prop="email" label="联系邮箱" width="160">
                                        </el-table-column>
                                        <el-table-column prop="unit" label="反馈单位" width="160">
                                        </el-table-column>
                                        <el-table-column prop="situation" label="风险管控措施落实情况" width="160"
                                            show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <!-- 签收风险预警单 -->
                            <el-collapse>
                                <el-collapse-item v-for="(item,index) in earltWarningList" :key="index">
                                    <template slot="title">
                                        <span class="fl">华北</span>
                                        <span class="fr">签收风景预警单：{{item.person}}({{item.tel}})
                                            审核结果：{{item.status}}</span>
                                    </template>
                                    <div class="list_title">签收风险预警单</div>
                                    <div class="info">
                                        <div class="journalRow">
                                            <div class="key">通信调度员</div>
                                            <div class="val">{{item.person}}</div>
                                            <div class="key">电话</div>
                                            <div class="val">{{item.tel}}</div>
                                        </div>
                                        <div class="journalRow">
                                            <div class="key">审核结果</div>
                                            <div class="val">{{item.result}}</div>
                                            <div class="key">审核时间</div>
                                            <div class="val">{{item.time}}</div>
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-collapse>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="日志" name="second">
                        <div class="form" style="border-color:#3AB5A0;height:630px">
                            <!-- 签收风险预警单 -->
                            <div class="basic_info">
                                <div class="list_title">签收风险预警单</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">四川通信调度员，四川值班员</div>
                                        <div class="val">{{riskWarningForm.person}}</div>
                                        <div class="key">电话</div>
                                        <div class="val">{{riskWarningForm.tel}}</div>
                                    </div>
                                    <div class="journalRow">
                                        <div class="key">查看时间</div>
                                        <div class="val">{{riskWarningForm.time}}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 编制风险预警反馈 -->
                            <div class="basic_info">
                                <div class="list_title">编制风险预警反馈</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">风险预警编制人</div>
                                        <div class="val">{{riskFeedback.person}}</div>
                                        <div class="key">电话</div>
                                        <div class="val">{{riskFeedback.tel}}</div>
                                    </div>
                                    <div class="journalRow">
                                        <div class="key">查看时间</div>
                                        <div class="val">{{riskFeedback.time}}</div>
                                        <div class="key">查看/会签时间</div>
                                        <div class="val">{{riskFeedback.time}}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 审核风险预警反馈 -->
                            <div class="basic_info">
                                <div class="list_title">审核风险预警反馈</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">风险预警编制人</div>
                                        <div class="val">{{auditFeedback.person}}</div>
                                        <div class="key">电话</div>
                                        <div class="val">{{auditFeedback.tel}}</div>
                                    </div>
                                    <div class="journalRow">
                                        <div class="key">查看时间</div>
                                        <div class="val">{{auditFeedback.time}}</div>
                                        <div class="key">查看/会签时间</div>
                                        <div class="val">{{auditFeedback.time}}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 签发风险预警反馈 -->
                            <div class="basic_info">
                                <div class="list_title">签发风险预警反馈</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">风险预警编制人</div>
                                        <div class="val">{{issueFeedback.person}}</div>
                                        <div class="key">电话</div>
                                        <div class="val">{{issueFeedback.tel}}</div>
                                    </div>
                                    <div class="journalRow">
                                        <div class="key">查看时间</div>
                                        <div class="val">{{issueFeedback.time}}</div>
                                        <div class="key">查看/会签时间</div>
                                        <div class="val">{{issueFeedback.time}}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data() {
            return {
                disabled: true,
                activeName: 'first',
                ruleForm: {
                    no: '预警-TX-20190808-国网信通-1',
                    time: '2019-08-08 19:50',
                    title: '关于2019年第9号台风“利奇马”的风险预警',
                    person: '张涵',
                    company: '国家电网公司信息通信分公司',
                    tel: '5777',
                    email: 'yunxing@sgcc.com.cn',
                    matter: '今年底9号台风“利奇马”（超强台风级）的中心8月8日上午5时位于浙江省象山县南偏东方大约880公里的西北太平洋面上（北纬22.4度、东经126.0度），中心附近最大风力16级。预计，“利奇马”将以每小时15公里的速度向北偏西方向移动，逐渐向浙江沿岸靠近，10日白天将在浙江中北部一带沿海登陆（台风级或强台风及13-15级。40-48米/秒）；但也可能在浙江岸海面北上。',
                    startTime: '2019-08-09 08:00',
                    endTime: '2019-08-15 18:00',
                    mainUnit: '国网华北、东北分部，国网山东、河北、天津、四川、辽宁、黑龙江、吉林电力',
                    ccUnit: '国调中心',
                    system: '一级骨干网 .国网信通/',
                    alertObj: '',
                    alertSource: '',
                    alertLevel: '八级',
                    business: '',
                    analysis: '台风引起的降水和大风可能会对通信线路、设备带来一定的破坏，影响通信系统安全稳定运行。',
                    requirement: '1.合理安排应急值班，加强监测控，调配好抢险队伍、救援装备和物资，强化客户服务，认真做好各项应急准备工作。2.各单位要加强与当地气象、海洋等部门的联系，密切关注气象变化情况，根据情况变化几室采取措施。3.合理安排信息通信系统运行方式，做好事故预想，落实灾害预防、预警措施，确保系统安全稳定运行。4.科学救灾，合理避险，切实落实各项安全措施，加强抢修安全管理，确保抢修工作人员安全。5.加强应急值班和信息报告工作，严格执行“零汇报”机制，发生异常情况和突发事件，即使向国网信通调度汇报。6.请相关单位于8月9日9：00前在系统中反馈预警跟踪落实情况。'
                },
                rules: {
                    no: [{
                        required: true,
                        message: '请输入工单编号',
                        trigger: 'blur'
                    }],
                    time: [{
                        required: true,
                        message: '请输入填写时间',
                        trigger: 'blur'
                    }],
                    person: [{
                        required: true,
                        message: '请输入编制人',
                        trigger: 'blur'
                    }],
                    tel: [{
                        required: true,
                        message: '请输入编制人联系电话',
                        trigger: 'blur'
                    }],
                    matter: [{
                        required: true,
                        message: '请输入预警事项',
                        trigger: 'blur'
                    }],
                    startTime: [{
                        required: true,
                        message: '请输入预警开始时间',
                        trigger: 'blur'
                    }],
                    endTime: [{
                        required: true,
                        message: '请输入预警结束时间',
                        trigger: 'blur'
                    }],
                    mainUnit: [{
                        required: true,
                        message: '请输入主送单位',
                        trigger: 'blur'
                    }],
                    system: [{
                        required: true,
                        message: '请输入涉及通信系统',
                        trigger: 'blur'
                    }],
                    alertLevel: [{
                        required: true,
                        message: '请输入风险预警等级',
                        trigger: 'blur'
                    }],
                    analysis: [{
                        required: true,
                        message: '请输入通信系统风险分析',
                        trigger: 'blur'
                    }],
                    requirement: [{
                        required: true,
                        message: '请输入风险预控要求',
                        trigger: 'blur'
                    }]
                },
                // 文件上传内容
                fileList: [],
                feedbackList: [{
                    time: '2019-08-08 20:41:07',
                    person: '许鸿飞',
                    tel: '',
                    email: '',
                    unit: '四川电力有限公司',
                    situation: '四川公司已安排加强监测预警，落实通信'
                }, {
                    time: '2019-08-09 07:22:34',
                    person: '程凯',
                    tel: '',
                    email: '',
                    unit: '国网天津市电力公司',
                    situation: '天津信通调度已按照风险预控要求：'
                }, {
                    time: '2019-08-08 20:41:07',
                    person: '许鸿飞',
                    tel: '',
                    email: '',
                    unit: '四川电力有限公司',
                    situation: '四川公司已安排加强监测预警，落实通信'
                }, {
                    time: '2019-08-09 07:41:24',
                    person: '孙勇健',
                    tel: '13708920823',
                    email: 'sunyongjian@sgcc.com',
                    unit: '国网山东省电力公司',
                    situation: '山东已接收，按照上级调度单位要求已做好'
                }, {
                    time: '2019-08-09 08:42:12',
                    person: '孟显',
                    tel: '18003217181',
                    email: '',
                    unit: '国网河北省电力有限公司',
                    situation: '按要求执行。'
                }, {
                    time: '2019-08-09 08:51:30',
                    person: '张东波',
                    tel: '01083582900',
                    email: '',
                    unit: '国家电网公司华北分部',
                    situation: '华北分部通信调度已安排加强检测预警，落实'
                }],
                multipleSelection: [],
                recordHeight: false,
                earltWarningList: [{
                    person: '宋德华',
                    tel: '010-83582900',
                    result: '同意',
                    status: '批准',
                    time: '2019-08-08 20:30:51'
                }, {
                    person: '张维',
                    tel: '010-83582902',
                    result: '同意',
                    status: '批准',
                    time: '2019-08-08 20:30:51'
                }],
                riskWarningForm: {
                    person: '李群',
                    tel: '83910',
                    time: '20919-08-08 20:04:07/20919-08-08 20:07:10'
                },
                riskFeedback: {
                    person: '李群',
                    tel: '83910',
                    result: '同意',
                    time: '20919-08-08 20:07:16/20919-08-08 20:08:09'
                },
                auditFeedback: {
                    person: '徐鸿飞',
                    tel: '83208',
                    result: '同意',
                    time: '20919-08-08 20:35:08/20919-08-08 20:42:52'
                },
                issueFeedback: {
                    person: '李群',
                    tel: '83910',
                    result: '同意',
                    time: '20919-08-08 20:43:51/20919-08-08 20:44:17'
                },
            }
        },
        methods: {
            closedialogs() {
                this.$store.commit("openriskwarningsheet", {
                    boolean: false
                });
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .fl {
        float: left;
    }

    .fr {
        float: right;
    }

    .independent {
        /deep/.el-dialog {
            width: 885px !important;
            height: 724px;
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

                .mainbox {
                    h1 {
                        font-size: 18px;
                        height: 50px;
                        line-height: 50px;
                        text-align: center;
                        font-weight: bold;
                    }

                    .list {
                        margin: 10px;
                        margin-top: 0;
                        position: relative;

                        /* tab ------start */
                        .el-tabs {
                            margin-top: 16px;
                        }

                        .el-tabs--card>.el-tabs__header {
                            border: none;
                        }

                        .el-tabs__header {
                            margin: 0;
                        }

                        .el-tabs__item {
                            width: 120px;
                            height: 28px;
                            line-height: 28px;
                            font-size: 14px;
                            font-weight: 700;
                            text-align: center;
                            color: #3AB5A0;
                            border: 1px solid #3AB5A0;
                            background-color: #F8FAF9;
                        }

                        .is-active {
                            background-color: #3AB5A0;
                            color: #fff;
                        }

                        /* tab ------ending */

                        .form {
                            height: 578px;
                            border: 1px solid #E7E7E7;
                            border-top: none;
                            overflow: auto;

                            .basic_info {
                                border-bottom: 1px solid #e8e8e8;
                            }

                            .list_title {
                                height: 28px;
                                line-height: 28px;
                                padding-left: 15px;
                                background-color: #03796b;
                                color: #fff;
                                font-size: 12px;
                            }

                            /* form ------start */
                            .el-form-item {
                                box-sizing: border-box;
                                display: inline-block;
                                width: 50%;
                                height: 26px;
                                border-bottom: 1px solid #e8e8e8;
                                border-right: 1px solid #E8E8E8;
                                  margin-bottom: 0;
                            }

                            .el-form-item__label {
                                width: 180px;
                                line-height: 25px;
                                color: #000;
                                font-size: 12px;
                                background-color: #F2F2F2;
                                padding: 0 0 0 12px;
                                border-right: 1px solid #E8E8E8;
                            }

                            .el-form-item__content {
                                height: 100%;
                                line-height: 25px;

                                .el-input {
                                    height: 24px;
                                    font-size: 12px;

                                    .el-input__inner {
                                        height: 22px;
                                        border: none;
                                        border-radius: 0;
                                        color: #000;
                                    }
                                }

                                .el-textarea {
                                    height: 100%;

                                    .el-textarea__inner {
                                        height: 100%;
                                        font-size: 12px;
                                        color: #000;
                                        border: none;
                                        border-radius: 0;
                                        resize: none;
                                    }
                                }
                            }

                            .el-input.is-disabled .el-input__inner,
                            .el-textarea.is-disabled .el-textarea__inner {
                                background: #fff;
                            }

                            /* form ------ending */

                            .wholerow,
                            .textarea {
                                width: 100%;
                            }

                            .textarea {
                                height: 60px;

                                .el-form-item__label {
                                    line-height: 59px;
                                }
                            }

                            .righticonbox {
                                float: right;

                                img {
                                    width: 17px;
                                    margin-right: 20px;
                                }
                            }

                            .mainUnit {
                                height: 82px;

                                .el-form-item__label {
                                    line-height: 81px;
                                }

                                .tips {
                                    color: #999;
                                    font-size: 12px;
                                    padding: 0 15px;
                                    border-bottom: 1px solid #E8E8E8;
                                }
                            }

                            /* file ------ start */
                            .el-upload {
                                float: right;
                            }

                            .el-upload-list__item {
                                display: inline-block;
                                width: auto;
                                margin-top: 0;
                            }

                            .el-button--small,
                            .el-button--small.is-round {
                                width: 20px;
                                height: 20px;
                                background-color: #F0F0F0;
                                border: 1px solid #969696;
                                color: #666;
                                margin-right: 5px;
                            }

                            .upload-demo {
                                position: relative;
                                height: 25px;

                                .demo_list {
                                    position: absolute;
                                    left: 5px;
                                    top: 2px;
                                    height: 20px;
                                    text-align: center;
                                    line-height: 20px;
                                    color: blue;
                                    font-size: 12px;
                                    padding: 0 2px;
                                    border: 1px solid #e8e8e8;
                                    border-radius: 5px;

                                }
                            }

                            /* file ------ ending */

                            .title {
                                padding-left: 10px;
                                background-color: #C6CBFC;
                                height: 32px;
                                line-height: 32px;
                                font-size: 14px;
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
                                height: 26px;
                                font-size: 12px;
                            }

                            .el-table td,
                            .el-table th {
                                height: 26px;
                                padding: 0;
                                font-size: 12px;
                                color: #000;
                            }

                            /** el-table ------ end */

                            /* collapse ------start */

                            .el-collapse-item__header {
                                position: relative;
                                height: 28px;
                                color: #fff;
                                font-size: 12px;
                                background: #03796b;

                                .fl {
                                    position: absolute;
                                    left: 26px;
                                    height: 26px;
                                    line-height: 26px;
                                }

                                .fr {
                                    position: absolute;
                                    right: 10px;
                                    height: 26px;
                                    line-height: 26px;
                                }

                                .el-collapse-item__arrow {
                                    font-size: 20px;
                                    margin: 0 0 0 5px;
                                    background-color: transparent !important;
                                }

                                // .is-active {
                                //     background-color: none!important;
                                // }
                            }

                            .el-collapse-item__content {
                                padding-bottom: 0;

                                .list_title {
                                    background: #00887a;
                                    height: 26px;
                                    line-height: 26px;
                                }
                            }

                            .journalRow {
                                // float: left;
                                height: 25px;
                                line-height: 25px;
                                font-size: 12px;
                                color: #000;
                                display: flex;
                                flex-wrap: nowrap;
                                border-bottom: 1px solid #e8e8e8;

                                .key {
                                    box-sizing: border-box;
                                    width: 180px;
                                    padding-left: 12px;
                                    border-right: 1px solid #e8e8e8;
                                    background-color: #F2F2F2;
                                    text-align: left;

                                }

                                .val {
                                    margin-left: 12px;
                                    flex: 1;
                                    text-align: left;
                                    overflow: hidden;
                                    /*对超出容器的部分强制截取，高度不确定则换行*/
                                    text-overflow: ellipsis;
                                    /*显示省略符号来代表被修剪的文本。*/
                                    white-space: nowrap;
                                }
                            }

                            .journalTextarea {
                                height: 60px;
                            }
                        }
                    }
                }
            }
        }
    }
</style>