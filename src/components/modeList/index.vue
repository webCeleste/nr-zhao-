<template>
    <el-dialog class="independent" :visible.sync="$store.state.methodsheet" width="30%" :before-close="closedialogs" append-to-body>
        <div class="headerbox">
            <div class="leftheader">
                <img src="../../assets/img/components-dialog/方式单icon.png" alt />
                <div class="headertitle">通信方式单</div>
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
                    <el-tab-pane label="通信方式单" name="first">
                        <h1>通信方式单</h1>
                        <div class="form">
                            <!-- 通信方式单基本信息 -->
                            <div class="basic_info">
                                <div class="list_title">方式单基本信息</div>
                                <div class="info">
                                    <!-- prop绑定的是rules，验证规则 -->
                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px"
                                        class="demo-ruleForm" label-position="left">
                                        <el-form-item label="编号" prop="no">
                                            <el-input v-model="ruleForm.no" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="填写时间" prop="time">
                                            <el-input v-model="ruleForm.time" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="标题" prop="title" class="wholerow">
                                            <el-input v-model="ruleForm.title" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="方式来源" prop="source">
                                            <el-input v-model="ruleForm.source" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="方式类型" prop="type">
                                            <el-input v-model="ruleForm.type" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="申请单位/部门" prop="unit">
                                            <el-input v-model="ruleForm.unit" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="要求完成时间" prop="endTime">
                                            <el-input v-model="ruleForm.endTime" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="申请人" prop="person">
                                            <el-input v-model="ruleForm.person" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="联系电话" prop="tel">
                                            <el-input v-model="ruleForm.tel" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="备注" class="textarea">
                                            <el-input type="textarea" v-model="ruleForm.remarks" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="附件" class="wholerow">
                                            <!-- action 上传的地址 -->
                                            <el-upload class="upload-demo" action="#" :on-change="handleChange"
                                                :file-list="fileList">
                                                <div class="demo_list">李峰（四川信通）.doc</div>
                                                <el-button size="small" type="primary" disabled="disabled">...
                                                </el-button>
                                            </el-upload>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <!-- 业务申请内容 -->
                            <div class="basic_info">
                                <div class="list_title">业务申请内容</div>
                                <div class="info">
                                    <el-collapse accordion>
                                        <el-collapse-item v-for="(item,index) in applicationContent" :key="index">
                                            <template slot="title">
                                                <span class="fl">{{index+1}}.{{item.title}}</span>
                                            </template>
                                            <el-form :model="item" class="demo-ruleForm" label-position="left"
                                                label-width="180px">
                                                <el-form-item label="承载方式光路" class="textarea">
                                                    <el-input type="textarea" v-model="item.roadName"
                                                        :disabled="disabled"></el-input>
                                                </el-form-item>
                                                <el-form-item label="调度单位">
                                                    <el-input v-model="item.unit" :disabled="disabled">
                                                    </el-input>
                                                </el-form-item>
                                                <el-form-item label="调度等级">
                                                    <el-input v-model="item.level" :disabled="disabled">
                                                    </el-input>
                                                </el-form-item>
                                                <el-form-item label="备注" class="wholerow">
                                                    <el-input v-model="item.remarks" :disabled="disabled">
                                                    </el-input>
                                                </el-form-item>
                                            </el-form>
                                            <div class="list_title_two" style="background:#22a79a">通道信息</div>
                                            <el-collapse accordion>
                                                <el-collapse-item class="collapseTwo" v-for="(items,index) in item.type"
                                                    :key="index">
                                                    <template slot="title">
                                                        <span class="fl">{{index+1}}.{{items.type}}
                                                            {{items.roadName}}</span>
                                                    </template>
                                                    <!-- 拓扑图 -->
                                                    <div class="topology" style="height:150px">
                                                        <iframe src="./html/modeList.html" width="820" height="150"
                                                            frameborder="0" scrolling="auto" style="margin: 10px;">
                                                        </iframe>
                                                    </div>
                                                    <el-table :data="item.type" border style="width: 100%">
                                                        <el-table-column type="index" width="50">
                                                        </el-table-column>
                                                        <el-table-column prop="roadName" label="通道名称" width="250">
                                                        </el-table-column>
                                                        <el-table-column prop="type" label="类别">
                                                        </el-table-column>
                                                        <el-table-column prop="raodType" label="通道类型">
                                                        </el-table-column>
                                                        <el-table-column prop="startPlat" label="起始站点" width="100">
                                                        </el-table-column>
                                                        <el-table-column prop="endPlat" label="终止站点" width="100">
                                                        </el-table-column>
                                                        <el-table-column prop="unit" label="承建单位">
                                                        </el-table-column>
                                                        <el-table-column prop="desc" label="详细描述">
                                                        </el-table-column>
                                                    </el-table>
                                                </el-collapse-item>
                                            </el-collapse>
                                        </el-collapse-item>
                                    </el-collapse>
                                </div>
                            </div>
                            <!-- 方式拆分&编制 -->
                            <div class="basic_info">
                                <div class="list_title"> 方式拆分&编制 </div>
                                <div class="info">
                                    <el-form :model="methodList" :rules="methodRules" class="demo-ruleForm"
                                        label-width="180px" label-position="left">
                                        <el-form-item label="编制人" prop="prePerson">
                                            <el-input v-model="methodList.prePerson" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="联系电话" prop="preTel">
                                            <el-input v-model="methodList.preTel" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="资源需求" class="textarea">
                                            <el-input type="textarea" v-model="methodList.requirements"
                                                :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="编制备注" class="textarea">
                                            <el-input type="textarea" v-model="methodList.remarks" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="工作协调负责人" prop="coorPerson">
                                            <el-input v-model="methodList.coorPerson" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="联系电话" prop="coorTel">
                                            <el-input v-model="methodList.coorTel" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <!-- 方式开通反馈 -->
                            <div class="basic_info">
                                <div class="list_title">方式开通反馈</div>
                                <div class="info">
                                    <el-table :data="feedbackList" border style="width: 100%">
                                        <el-table-column type="index" width="40" align="center">
                                        </el-table-column>
                                        <el-table-column prop="unit" label="开通单位/部门" width="160">
                                        </el-table-column>
                                        <el-table-column prop="person" label="负责人">
                                        </el-table-column>
                                        <el-table-column prop="time" label="完成时间" width="140">
                                        </el-table-column>
                                        <el-table-column prop="tel" label="联系电话">
                                        </el-table-column>
                                        <el-table-column prop="question" label="遗留问题">
                                        </el-table-column>
                                        <el-table-column prop="completion" label="完成情况">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </div>
                            <!-- 资源数据更新 -->
                            <div class="basic_info">
                                <div class="list_title" @click="updateHeight = !updateHeight"> 资源数据更新 </div>
                                <div class="info">
                                    <div class="table_title">本次方式完成业务数据</div>
                                    <el-form :model="uploadList" class="demo-ruleForm" label-position="left"
                                        label-width="180px">
                                        <el-form-item label="新增业务" prop="prePerson">
                                            <el-input v-model="uploadList.add" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="退出业务" prop="preTel">
                                            <el-input v-model="uploadList.preTel" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                    <div class="table_footer">
                                        有<span>{{uploadList.surplus}}</span>条新增通道未关联业务
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="日志" name="second">
                        <div class="form" style="border-color:#3AB5A0;height:630px">
                            <div class="basic_info">
                                <div class="list_title">填写方式表</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">四川方式专责</div>
                                        <div class="val">{{auditList.fillIn.person}}</div>
                                        <div class="key">电话</div>
                                        <div class="val">{{auditList.fillIn.tel}}</div>
                                    </div>
                                    <div class="journalRow">
                                        <div class="key">申请时间</div>
                                        <div class="val">{{auditList.fillIn.time}}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 方式消缺 -->
                            <div class="basic_info">
                                <div class="list_title">方式消缺</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">桃乡通信调度员</div>
                                        <div class="val">{{auditList.defects.person}}</div>
                                        <div class="key">电话</div>
                                        <div class="val">{{auditList.defects.tel}}</div>
                                    </div>
                                    <div class="journalRow">
                                        <div class="key">查看/填写时间</div>
                                        <div class="val">{{auditList.defects.time}}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 消缺验收 -->
                            <div class="basic_info">
                                <div class="list_title">消缺验收</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">四川通调主值，四川信通调度值长</div>
                                        <div class="val">{{auditList.checkAcceptance.person}}</div>
                                        <div class="key">电话</div>
                                        <div class="val">{{auditList.checkAcceptance.tel}}</div>
                                    </div>
                                    <div class="journalRow">
                                        <div class="key">确认结果</div>
                                        <div class="val">{{auditList.checkAcceptance.result}}</div>
                                        <div class="key">查看/确认时间</div>
                                        <div class="val">{{auditList.checkAcceptance.time}}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 方式分析并编制方式报告 -->
                            <div class="basic_info">
                                <div class="list_title">方式分析并编制方式报告</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">承德故障专责</div>
                                        <div class="val">{{auditList.presentation.person}}</div>
                                        <div class="key">电话</div>
                                        <div class="val">{{auditList.presentation.tel}}</div>
                                    </div>
                                    <div class="journalRow">
                                        <div class="key">查看/填写时间</div>
                                        <div class="val">{{auditList.presentation.time}}</div>
                                    </div>
                                </div>
                            </div>
                            <!-- 方式报告审核 -->
                            <div class="basic_info">
                                <div class="list_title">方式报告审核</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">四川调控中心领导</div>
                                        <div class="val">{{auditList.examine.person}}</div>
                                        <div class="key">电话</div>
                                        <div class="val">{{auditList.examine.tel}}</div>
                                    </div>
                                    <div class="journalRow">
                                        <div class="key">审核结果</div>
                                        <div class="val">{{auditList.examine.result}}</div>
                                        <div class="key">查看/审核时间</div>
                                        <div class="val">{{auditList.examine.time}}</div>
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
                applicationHeight: false,
                ruleForm: {
                    no: '方式-2019-四川-桃乡-1837',
                    time: '2019-11-28 17:34',
                    title: 'PanZhihua-2019-F1577-1583（220kV银川热电传输设备改造相关方式）--桃乡部分业务',
                    source: '直接启动的方式',
                    type: '正式方式',
                    unit: '国网四川信通公司',
                    endTime: '2019-12-20 14：18',
                    person: '李峰',
                    tel: '0313-8693408',
                    remarks: ''
                },
                rules: {
                    no: [{
                        required: true,
                        message: '请输入编号',
                        trigger: 'blur'
                    }],
                    time: [{
                        required: true,
                        message: '请输入申请时间',
                        trigger: 'blur'
                    }],
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                    source: [{
                        required: true,
                        message: '请输入方式来源',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '请输入方式类型',
                        trigger: 'blur'
                    }],
                    unit: [{
                        required: true,
                        message: '请输入申请部门/单位',
                        trigger: 'blur'
                    }],
                    endTime: [{
                        required: true,
                        message: '请输入要求完成时间',
                        trigger: 'blur'
                    }],
                    person: [{
                        required: true,
                        message: '请输入申请人',
                        trigger: 'blur'
                    }],
                    tel: [{
                        required: true,
                        message: '请输入联系电话',
                        trigger: 'blur'
                    }]
                },
                // 文件上传内容
                fileList: [],
                multipleSelection: [],
                recordHeight: false,
                applicationContent: [{
                    title: '光路',
                    roadName: '【35kV拉日马变~110kV南桥变 光纤专用01】',
                    type: [{
                        roadName: '35kV拉日马变~110kV南桥变 光纤专用01',
                        type: '新增',
                        raodType: '光纤专用',
                        startPlat: '35kV拉日马变',
                        endPlat: '110kV南桥变',
                        unit: '四川',
                        desc: ''
                    }],
                    unit: '国网四川信通公司',
                    level: '省公司',
                    remarks: ''
                }],
                // 方式拆分&编制 
                modeHeight: false,
                methodList: {
                    prePerson: '李玉娇',
                    preTel: '0313-8693408',
                    requirements: '',
                    remarks: '',
                    coorPerson: '李嵘',
                    coorTel: '7553507'
                },
                methodRules: {
                    prePerson: [{
                        required: true,
                        message: '请输入编制人',
                        trigger: 'blur'
                    }],
                    preTel: [{
                        required: true,
                        message: '请输入联系电话',
                        trigger: 'blur'
                    }],
                    coorPerson: [{
                        required: true,
                        message: '请输入工作协调负责人',
                        trigger: 'blur'
                    }],
                    coorTel: [{
                        required: true,
                        message: '请输入联系电话',
                        trigger: 'blur'
                    }]
                },
                feedbackHeight: false,
                feedbackList: [{
                    unit: '信息通信监控调度中心',
                    person: '段寒硕',
                    time: '2020-01-15 10:21',
                    tel: '',
                    question: '无',
                    completion: '已完成'
                }],
                updateHeight: false,
                uploadList: {
                    add: '6',
                    exit: '',
                    surplus: '0'
                },
                auditList: {
                    fillIn: {
                        person: '王彦璋',
                        tel: '83910',
                        time: '2019-12:16 08:14:58'
                    },
                    defects: {
                        person: '武伟荣',
                        tel: '7883368',
                        time: '2019-12-16 08:59:23/2019-12-16 19:20:32'
                    },
                    checkAcceptance: {
                        person: '赵烨',
                        tel: '83337',
                        result: '同意',
                        time: '2019-12-16 08:59:23/2019-12-16 19:20:32'
                    },
                    presentation: {
                        person: '何巍',
                        tel: '7883368',
                        time: '2019-12-17 19:06:10/2019-12-18 10:20:32'
                    },
                    examine: {
                        person: '许鸿飞',
                        tel: '83208',
                        result: '同意',
                        time: '2019-12-18 18:51:59/2019-12-16 19:20:32'
                    },
                },
            }
        },
        methods: {
            closedialogs() {
                this.$store.commit("openmethodsheet", {
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
                            background-color: transparent;
                            color: #fff;
                            background: #3AB5A0;
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

                            .list_title,
                            .list_title_two {
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
                                    line-height: 82px;
                                }

                                .tips {
                                    color: #999;
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
                                height: 25px;
                                color: #fff;
                                font-size: 12px;
                                background: #00887a;

                                .fl {
                                    position: absolute;
                                    left: 20px;
                                }

                                .fr {
                                    position: absolute;
                                    right: 10px;
                                }

                                .el-collapse-item__arrow {
                                    margin: 0 0 0 5px;
                                }
                            }


                            .el-collapse-item__content {
                                padding-bottom: 0;
                            }


                            .collapseTwo .el-collapse-item__header {
                                color: #fff;
                                font-size: 12px;
                                background: #4cb6ac;
                            }

                            /* collapse ------ ending */

                            .table_title {
                                height: 28px;
                                line-height: 28px;
                                color: #000;
                                font-size: 12px;
                                background-color: #EDFCF1;
                                border-bottom: 1px solid #BFE4F5;
                                text-align: center;
                            }

                            .table_footer {
                                height: 26px;
                                line-height: 26px;
                                font-size: 12px;
                                color: #000;
                                background-color: #C4F0FB;
                                padding-left: 5px;
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