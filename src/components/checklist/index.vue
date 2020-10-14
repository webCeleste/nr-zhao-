<template>
    <el-dialog class="checklist" :visible.sync="$store.state.checklist" width="30%" :before-close="closedialogs" append-to-body>
        <div class="headerbox">
            <div class="leftheader">
                <img src="../../assets/img/components-dialog/3D机房图.png" alt />
                <div class="headertitle">通信检修票</div>
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
                    <el-tab-pane label="通信检修票" name="first">
                        <h1>通信检修票</h1>
                        <div class="form">
                            <!-- 通信检修票基本信息 -->
                            <div class="basic_info">
                                <div class="list_title">检修票基本信息</div>
                                <div class="info">
                                    <!-- prop绑定的是rules，验证规则 -->
                                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px"
                                        class="demo-ruleForm" label-position="left">
                                        <el-form-item label="检修票编号" prop="no">
                                            <el-input v-model="ruleForm.no" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="填写时间" prop="time">
                                            <el-input v-model="ruleForm.time" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="标题" prop="title" class="wholerow">
                                            <el-input v-model="ruleForm.title" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="发起单位" prop="sponsorUnit">
                                            <el-input v-model="ruleForm.sponsorUnit" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="申请单位" prop="applicantUnit">
                                            <el-input v-model="ruleForm.applicantUnit" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="申请人" prop="applyPerson">
                                            <el-input v-model="ruleForm.applyPerson" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="联系电话" prop="applyTel">
                                            <el-input v-model="ruleForm.applyTel" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="检修类型" prop="type">
                                            <el-input v-model="ruleForm.type" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="检修类别" prop="category">
                                            <el-input v-model="ruleForm.category" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label=" 检修票来源" prop="tel" class="wholerow">
                                            <el-input v-model="ruleForm.source" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="方式单处理" prop="tel" class="wholerow">
                                            <el-input v-model="ruleForm.deal" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="申请开工时间" prop="applyStartTime">
                                            <el-input v-model="ruleForm.applyStartTime" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="申请完工时间" prop="applyEndTime">
                                            <el-input v-model="ruleForm.applyEndTime" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="批准开工时间">
                                            <el-input v-model="ruleForm.approvalStartTime" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="批准完工时间">
                                            <el-input v-model="ruleForm.approvalEndTime" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                        <el-form-item label="检修工作原因" class="wholerow">
                                            <el-input v-model="ruleForm.result" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="工作地点" prop="palace" class="wholerow">
                                            <el-input v-model="ruleForm.palace" :disabled="disabled"></el-input>
                                        </el-form-item>
                                        <el-form-item label="检修工作内容" prop="content" class="textarea">
                                            <el-input type="textarea" v-model="ruleForm.content" :disabled="disabled">
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </div>
                            <!-- 检修设备 -->
                            <div class="basic_info">
                                <div class="list_title" @click="equipmentHeight = !equipmentHeight">检修设备
                                    <div class="righticonbox">
                                        <img :src="equipmentHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                            alt />
                                    </div>
                                </div>
                                <div class="info">
                                    <el-collapse-transition>
                                        <div v-show="equipmentHeight">
                                            <el-table :data="equipmentList" style="width: 100%">
                                                <el-table-column type="index" width="50" align="center">
                                                </el-table-column>
                                                <el-table-column prop="equipment" label="检修设备">
                                                </el-table-column>
                                                <el-table-column prop="type" label="设备类型">
                                                </el-table-column>
                                                <el-table-column prop="category" label="设备类别">
                                                </el-table-column>
                                                <el-table-column prop="plat" label="所属站点/一次线路">
                                                </el-table-column>
                                                <el-table-column prop="unit" label="维护单位">
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <!-- 影响业务情况 -->
                            <div class="basic_info">
                                <div class="list_title" @click="impactHeight = !impactHeight">影响业务情况
                                    <div class="righticonbox">
                                        <img :src="impactHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                            alt />
                                    </div>
                                </div>
                                <div class="info">
                                    <el-collapse-transition>
                                        <div v-show="impactHeight">
                                            <el-form :model="impactForm" :rules="impactRules" ref="impactForm"
                                                label-width="180px" class="demo-ruleForm" label-position="left">
                                                <el-form-item label="业务所属最高等级" prop="highestLevel" class="wholerow">
                                                    <el-input v-model="impactForm.highestLevel" :disabled="disabled">
                                                    </el-input>
                                                </el-form-item>
                                            </el-form>
                                            <div class="operation">
                                                <span>
                                                    <img src="../../assets/img/components-dialog/新建.png">新建
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/保存.png"> 保存
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/删除.png"> 删除
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/刷新1.png">刷新
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/撤销.png">撤销
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/复制.png"> 复制
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/粘贴.png"> 粘贴
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/分部.png"> 本单位及上级单位
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/分部.png"> 国网
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/分部.png"> 分部
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/分部.png"> 省
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/分部.png"> 地市
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/导出(3).png"> 导出
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/痕迹.png"> 痕迹
                                                </span>
                                            </div>
                                            <div class="operation">
                                                <span>
                                                    <img src="../../assets/img/components-dialog/分部.png">查看业务通道路由图
                                                </span>
                                                <span>
                                                    <img src="../../assets/img/components-dialog/分部.png"> 查看业务通道
                                                </span>
                                            </div>
                                            <el-table :data="impactData" border style="width: 100%">
                                                <el-table-column type="index" width="50" align="center">
                                                </el-table-column>
                                                <el-table-column prop="level" label="调度等级">
                                                </el-table-column>
                                                <el-table-column prop="name" label="业务名称">
                                                </el-table-column>
                                                <el-table-column prop="type" label="业务类型">
                                                </el-table-column>
                                                <el-table-column prop="landing" label="落地业务">
                                                </el-table-column>
                                                <el-table-column prop="degree" label="影响程度">
                                                </el-table-column>
                                                <el-table-column prop="measures" label="采取措施">
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <!-- 缺陷影响信息 -->
                            <div class="basic_info">
                                <div class="list_title" @click="defectHeight = !defectHeight">缺陷影响信息
                                    <div class="righticonbox">
                                        <img :src="defectHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                            alt />
                                    </div>
                                </div>
                                <div class="info">
                                    <el-collapse-transition>
                                        <div v-show="defectHeight">
                                            <el-form :model="defectList" :rules="defectRules" ref="defectList"
                                                label-width="180px" class="demo-ruleForm" label-position="left">
                                                <el-form-item label="影响范围（检修计划导入）" class="textarea">
                                                    <el-input type="textarea" v-model="defectList.range"
                                                        :disabled="disabled"></el-input>
                                                </el-form-item>
                                                <el-form-item label="采取措施" prop="measures" class="textarea">
                                                    <el-input type="textarea" v-model="defectList.measures"
                                                        :disabled="disabled"></el-input>
                                                </el-form-item>
                                                <el-form-item label="对一次系统要求" class="textarea">
                                                    <el-input type="textarea" v-model="defectList.required"
                                                        :disabled="disabled"></el-input>
                                                </el-form-item>
                                                <el-form-item label="配合单位工作内容" class="textarea">
                                                    <el-input type="textarea" v-model="defectList.required"
                                                        :disabled="disabled"></el-input>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <!-- 现场工作单位 -->
                            <div class="basic_info">
                                <div class="list_title" @click="siteWorkHeight = !siteWorkHeight">现场工作单位
                                    <div class="righticonbox">
                                        <img :src="siteWorkHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                            alt />
                                    </div>
                                </div>
                                <div class="info">
                                    <el-collapse-transition>
                                        <div v-show="siteWorkHeight">
                                            <el-table :data="siteWorkList" style="width: 100%">
                                                <el-table-column type="index" width="50" align="center">
                                                </el-table-column>
                                                <el-table-column prop="unit" label="现场工作单位">
                                                </el-table-column>
                                                <el-table-column prop="person" label="现场联系人">
                                                </el-table-column>
                                                <el-table-column prop="tel" label="现场联系电话">
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <!-- 配合工作单位 -->
                            <div class="basic_info">
                                <div class="list_title" @click="cooperateHeight = !cooperateHeight">配合工作单位
                                    <div class="righticonbox">
                                        <img :src="cooperateHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                            alt />
                                    </div>
                                </div>
                                <div class="info">
                                    <el-collapse-transition>
                                        <div v-show="cooperateHeight">
                                            <el-table :data="cooperateList" style="width: 100%">
                                                <el-table-column type="index" width="50" align="center">
                                                </el-table-column>
                                                <el-table-column prop="unit" label="配合工作单位">
                                                </el-table-column>
                                                <el-table-column prop="person" label="配合联系人">
                                                </el-table-column>
                                                <el-table-column prop="tel" label="联系电话">
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <!-- 附件 -->
                            <div class="basic_info">
                                <div class="list_title" @click="enclosureHeight = !enclosureHeight">附件
                                    <div class="righticonbox">
                                        <img :src="enclosureHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                            alt />
                                    </div>
                                </div>
                                <div class="info">
                                    <el-collapse-transition>
                                        <div v-show="enclosureHeight">
                                            <!-- action 上传的地址 -->
                                            <el-upload class="upload-demo" action="#" :on-change="handleChange"
                                                :file-list="fileList">
                                                <div class="demo_list">李永双（四川信通）.doc</div>
                                                <el-button size="small" type="primary" disabled="disabled">...
                                                </el-button>
                                            </el-upload>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                            <!-- 检修执行情况 -->
                            <div class="basic_info">
                                <div class="list_title" @click="implementHeight = !implementHeight">检修执行情况
                                    <div class="righticonbox">
                                        <img :src="implementHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                            alt />
                                    </div>
                                </div>
                                <div class="info">
                                    <el-collapse-transition>
                                        <div v-show="implementHeight">
                                            <el-form :model="implementForm" :rules="implementRules" ref="implementForm"
                                                label-width="180px" class="demo-ruleForm" label-position="left">
                                                <el-form-item label="实际开工时间" prop="startTime">
                                                    <el-input v-model="implementForm.startTime" :disabled="disabled">
                                                    </el-input>
                                                </el-form-item>
                                                <el-form-item label="实际完工时间" prop="endTime">
                                                    <el-input v-model="implementForm.endTime" :disabled="disabled">
                                                    </el-input>
                                                </el-form-item>
                                                <el-form-item label="检修完成情况" prop="completion" class="textarea">
                                                    <el-input type="textarea" v-model="implementForm.completion"
                                                        :disabled="disabled"></el-input>
                                                </el-form-item>
                                                <el-form-item label="附件" class="wholerow" style="float:left">
                                                    <!-- action 上传的地址 -->
                                                    <el-upload class="upload-demo" action="#"
                                                        :on-change="implementChange" :file-list="fileList">
                                                        <div class="demo_list">李永双（四川信通）.doc</div>
                                                        <el-button size="small" type="primary" :disabled="disabled">...
                                                        </el-button>
                                                    </el-upload>
                                                </el-form-item>
                                                <el-form-item label="改期开工时间">
                                                    <el-input v-model="implementForm.rescheduledStartTime"
                                                        :disabled="disabled"></el-input>
                                                </el-form-item>
                                                <el-form-item label="改期完工时间">
                                                    <el-input v-model="implementForm.rescheduledEndTime"
                                                        :disabled="disabled"></el-input>
                                                </el-form-item>
                                                <el-form-item label="改期原因" prop="rescheduledReason" class="textarea">
                                                    <el-input type="textarea" v-model="implementForm.rescheduledReason"
                                                        :disabled="disabled"></el-input>
                                                </el-form-item>
                                            </el-form>
                                        </div>
                                    </el-collapse-transition>
                                </div>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="日志" name="second">
                        <div class="form" style="border-color:#3AB5A0;height:630px">
                            <div class="basic_info">
                                <div class="list_title">填写检修表</div>
                                <div class="info">
                                    <div class="journalRow">
                                        <div class="key">四川检修专责</div>
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
                            <!-- 检修消缺 -->
                            <div class="basic_info">
                                <div class="list_title">检修消缺</div>
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
                            <!-- 检修分析并编制检修报告 -->
                            <div class="basic_info">
                                <div class="list_title">检修分析并编制检修报告</div>
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
                            <!-- 检修报告审核 -->
                            <div class="basic_info">
                                <div class="list_title">检修报告审核</div>
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
                ruleForm: {
                    no: '检修-桃乡-201212-0006',
                    time: '2012-12-14 13:51',
                    title: '陡贾一、二线纵联电流差动保护（RCS-931AM）电路方式变更',
                    sponsorUnit: '',
                    applicantUnit: '信通分公司',
                    applyPerson: '李永双',
                    applyTel: '13832851122',
                    type: '计划检验',
                    category: '',
                    source: '无',
                    deal: '',
                    applyStartTime: '2012-12-17 10:00',
                    applyEndTime: '2012-12-19 16:00',
                    approvalStartTime: '2012-12-17 10:00',
                    approvalEndTime: '2012-12-19 16:00',
                    result: '配合保护改造',
                    palace: '攀煤电厂',
                    content: '陡贾一、二线纵联电流差动保护（RCS-931AM）电路方式由高频变更为2M'
                },
                rules: {
                    no: [{
                        required: true,
                        message: '请输入编号',
                        trigger: 'blur'
                    }],
                    time: [{
                        required: true,
                        message: '请输入填写时间',
                        trigger: 'blur'
                    }],
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                    sponsorUnit: [{
                        required: true,
                        message: '请输入发起单位',
                        trigger: 'blur'
                    }],
                    applicantUnit: [{
                        required: true,
                        message: '请输入申请单位',
                        trigger: 'blur'
                    }],
                    applyPerson: [{
                        required: true,
                        message: '请输入申请人',
                        trigger: 'blur'
                    }],
                    applyTel: [{
                        required: true,
                        message: '请输入联系电话',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '请输入检修类型',
                        trigger: 'blur'
                    }],
                    category: [{
                        required: true,
                        message: '请输入检修类别',
                        trigger: 'blur'
                    }],
                    applyStartTime: [{
                        required: true,
                        message: '请输入申请开工时间',
                        trigger: 'blur'
                    }],
                    applyEndTime: [{
                        required: true,
                        message: '请输入申请完工时间',
                        trigger: 'blur'
                    }],
                    palace: [{
                        required: true,
                        message: '请输入工作地点',
                        trigger: 'blur'
                    }],
                    content: [{
                        required: true,
                        message: '请输入检修工作内容',
                        trigger: 'blur'
                    }]
                },
                equipmentHeight: true,
                equipmentList: [{
                    equipment: '贾安子马可尼设备',
                    type: '光传输设备',
                    category: '',
                    plat: '贾安子',
                    unit: '信通分公司'
                }],
                multipleSelection: [],
                impactHeight: true,
                impactForm: {
                    highestLevel: '省公司'
                },
                impactRules: {
                    highestLevel: [{
                        required: true,
                        message: '请输入业务所属最高等级',
                        trigger: 'blur'
                    }]
                },
                impactData: [],
                defectHeight: true,
                defectList: {
                    range: '',
                    measures: '1.工作前要核实好设备情况，不得误碰其他运行设备；2.要和保护专业履行交接手续；3.工作完毕做好回验',
                    required: '',
                    content: ''
                },
                defectRules: {
                    measures: [{
                        required: true,
                        message: '请填写采取措施',
                        trigger: 'blur'
                    }]
                },
                siteWorkHeight: true,
                siteWorkList: [{
                    unit: '信通分公司通信运检三班',
                    person: '李永双',
                    tel: '13832851122'
                }],
                cooperateHeight: true,
                cooperateList: [{
                    unit: '攀煤电厂',
                    person: '王树良',
                    tel: '15176552523'
                }],
                enclosureHeight: true,
                fileList: [],
                implementHeight: true,
                implementList: [],
                implementForm: {
                    startTime: '2012-12-17 10:00',
                    endTime: '2012-12-19 16:00',
                    completion: '因线路方式未变更，因此该更新方式未执行完成',
                    rescheduledStartTime: '',
                    rescheduledEndTime: '',
                    rescheduledReason: ''
                },
                implementRules: {
                    startTime: [{
                        required: 'true',
                        message: '请输入实际开工实际',
                        trigger: 'blur'
                    }],
                    endTime: [{
                        required: 'true',
                        message: '请输入实际完工实际',
                        trigger: 'blur'
                    }],
                    completion: [{
                        required: 'true',
                        message: '请输入检修完成情况',
                        trigger: 'blur'
                    }],
                    rescheduledReason: [{
                        required: 'true',
                        message: '请输入改期原因',
                        trigger: 'blur'
                    }],
                    auditHeight: false,
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
                this.$store.commit("openchecklist", {
                    boolean: false
                });
            },
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
            },
            implementChange(file, fileList) {
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

    .checklist {
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
                            font-size: 14px;
                            font-weight: 700;
                            line-height: 28px;
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
                                font-size: 12px;
                                height: 28px;
                                line-height: 28px;
                                padding-left: 15px;
                                background-color: #03796b;
                                color: #fff;
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

                            .el-radio__label {
                                font-size: 12px;
                                color: #000;
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
                                    font-size: 12px;
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

                            .upload-demo {
                                height: 26px;
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
                                    padding: 0 2px;
                                    color: blue;
                                    font-size: 12px;
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

                            /* collapse ------start */

                            .el-collapse-item__header {
                                position: relative;

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
                                .el-collapse-item__content {
                                    padding-bottom: 0;
                                }
                            }

                            /* collapse ------ ending */

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

                            .table_title {
                                height: 28px;
                                line-height: 28px;
                                background-color: #EDFCF1;
                                border-bottom: 1px solid #BFE4F5;
                                text-align: center;
                            }

                            .table_footer {
                                height: 32px;
                                line-height: 32px;
                                background-color: #C4F0FB;
                                padding-left: 5px;
                            }

                            .operation {
                                height: 32px;
                                line-height: 32px;
                                padding: 0 5px;
                                border: 1px solid #f2f2f2;
                                border-radius: 5px;

                                span {
                                    font-size: 12px;
                                    padding: 5px;
                                    border-right: 1px solid #e8e8e8;

                                    img {
                                        height: 12px;
                                        margin-right: 3px;
                                    }
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