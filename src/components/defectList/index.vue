<template>
    <div class="independent">
        <el-dialog class="independent" :visible.sync="$store.state.defectlist" width="30%" :before-close="closedialogs" append-to-body>
            <div class="headerbox">
                <div class="leftheader">
                    <img src="../../assets/img/components-dialog/缺陷单icon.png" alt />
                    <div class="headertitle">通信缺陷单</div>
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
                    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                        <el-tab-pane label="通信缺陷单" name="first">
                            <h1>通信缺陷单</h1>
                            <div class="form">
                                <!-- 缺陷单基本信息 -->
                                <div class="basic_info">
                                    <div class="list_title">缺陷单基本信息</div>
                                    <div class="info">
                                        <!-- prop绑定的是rules，验证规则 -->
                                        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="170px"
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
                                            <el-form-item label="缺陷填写人">
                                                <el-input v-model="ruleForm.fillinPerson" :disabled="disabled">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="填写人联系电话" prop="fillinTel">
                                                <el-input v-model="ruleForm.fillinTel" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="填写人单位" prop="fillinUnit" class="wholerow">
                                                <el-input v-model="ruleForm.fillinUnit" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="缺陷上报人" prop="reportPerson">
                                                <el-input v-model="ruleForm.reportPerson" :disabled="disabled">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="上报人联系电话" prop="reportTel">
                                                <el-input v-model="ruleForm.reportTel" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="上报人单位" prop="reportUnit" class="wholerow">
                                                <el-input v-model="ruleForm.reportUnit" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="缺陷来源" prop="source">
                                                <el-input v-model="ruleForm.source" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="缺陷类型" prop="type">
                                                <el-input v-model="ruleForm.type" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item prop="describe" class="textarea">
                                                <span slot="label">缺陷现象描述<br>(需描述清楚现象及影响情况)</span>
                                                <el-input type="textarea" v-model="ruleForm.describe"
                                                    :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="当前缺陷等级" prop="level">
                                                <el-input v-model="ruleForm.level" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="最高缺陷等级" prop="highestLevel">
                                                <el-input v-model="ruleForm.highestLevel" :disabled="disabled">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="缺陷发生地点" prop="place">
                                                <el-input v-model="ruleForm.place" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="缺陷影响最高单位" prop="company">
                                                <el-input v-model="ruleForm.company" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="缺陷处理单位" prop="dealUnit" class="wholerow">
                                                <el-input v-model="ruleForm.dealUnit" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="缺陷起始时间" prop="startTime">
                                                <el-input v-model="ruleForm.startTime" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="缺陷终止时间" prop="endTime">
                                                <el-input v-model="ruleForm.endTime" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="业务是否中断" prop="isBreak">
                                                <el-input v-model="ruleForm.isBreak" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="业务恢复时间" prop="recoveryTime">
                                                <el-input v-model="ruleForm.recoveryTime" :disabled="disabled">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="业务通道是否中断" prop="businessIsBreak">
                                                <el-input v-model="ruleForm.businessIsBreak" :disabled="disabled">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="业务通道恢复时间" prop="businessTime">
                                                <el-input v-model="ruleForm.businessTime" :disabled="disabled">
                                                </el-input>
                                            </el-form-item>
                                            <el-form-item label="缺陷原因" prop="reason">
                                                <el-input v-model="ruleForm.reason" :disabled="disabled"></el-input>
                                            </el-form-item>
                                            <el-form-item label="是否编辑缺陷分析报告" prop="analysisReport">
                                                <el-input v-model="ruleForm.analysisReport" :disabled="disabled">
                                                </el-input>
                                            </el-form-item>
                                        </el-form>
                                    </div>
                                </div>
                                <!-- 缺陷定级记录 -->
                                <div class="basic_info">
                                    <div class="list_title" @click="recordHeight = !recordHeight">缺陷定级记录
                                        <div class="righticonbox">
                                            <img :src="recordHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                                alt />
                                        </div>
                                    </div>
                                    <div class="info">
                                        <el-collapse-transition>
                                            <div v-show="recordHeight">
                                                <el-table :data="gradingList" border style="width: 100%">
                                                    <el-table-column prop="level" label="缺陷等级" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="person" label="缺陷定级人" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="result" label="缺陷调级原因" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="time" label="缺陷定级时间" align="center"
                                                        width="160">
                                                    </el-table-column>
                                                    <el-table-column prop="isbusiness" label="业务是否中断" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="ispassageway" label="通道是否中断" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="duration" label="缺陷历时" align="center">
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </el-collapse-transition>
                                    </div>
                                </div>
                                <!-- 缺陷设备信息 -->
                                <div class="basic_info">
                                    <div class="list_title" @click="inforHeight = !inforHeight">缺陷设备信息
                                        <div class="righticonbox">
                                            <img :src="inforHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                                alt />
                                        </div>
                                    </div>
                                    <div class="info noHeader">
                                        <el-collapse-transition>
                                            <div v-show="inforHeight">
                                                <el-form :model="infoForm" ref="infoForm" :rules="infoRules"
                                                    label-width="170px" class="demo-ruleForm" label-position="left">
                                                    <el-form-item label="设备名称" prop="name" class="wholerow">
                                                        <el-input v-model="infoForm.name" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="缺陷部位" class="wholerow">
                                                        <el-input v-model="infoForm.position" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="所属系统" prop="system">
                                                        <el-input v-model="infoForm.system" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="所属区域" prop="area">
                                                        <el-input v-model="infoForm.area" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="所在站点" prop="plat">
                                                        <el-input v-model="infoForm.plat" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="设备厂家" prop="manufactor">
                                                        <el-input v-model="infoForm.manufactor" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="设备类型" prop="type">
                                                        <el-input v-model="infoForm.type" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="设备型号" prop="equipmentModel">
                                                        <el-input v-model="infoForm.equipmentModel"
                                                            :disabled="disabled"></el-input>
                                                    </el-form-item>
                                                    <el-form-item label="板卡类型">
                                                        <el-input v-model="infoForm.boardType" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="板卡型号">
                                                        <el-input v-model="infoForm.boardModel" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="投运时间" prop="time">
                                                        <el-input v-model="infoForm.time" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="运行维护单位" prop="company">
                                                        <el-input v-model="infoForm.company" :disabled="disabled">
                                                        </el-input>
                                                    </el-form-item>
                                                    <el-form-item label="相关附件" class="wholerow">
                                                        <el-upload class="upload-demo" action="#"
                                                            :on-change="handleChange" :file-list="fileList">
                                                            <div class="demo_list">王彦璋（四川信通）.doc</div>
                                                            <el-button size="small" type="primary" :disabled="disabled">
                                                                ...</el-button>
                                                        </el-upload>
                                                    </el-form-item>
                                                </el-form>
                                            </div>
                                        </el-collapse-transition>
                                    </div>
                                </div>
                                <!-- 缺陷影响信息 -->
                                <div class="basic_info">
                                    <div class="list_title" @click="impactinforHeight = !impactinforHeight">缺陷影响信息
                                        <div class="righticonbox">
                                            <img :src="impactinforHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                                alt />
                                        </div>
                                    </div>
                                    <div class="info">
                                        <el-collapse-transition>
                                            <div v-show="impactinforHeight">
                                                <el-table :data="recordList" border style="width: 100%">
                                                    <el-table-column prop="type" label="业务类型" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="businessInter" label="中断业务" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="channelInter" label="中断通道" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="businessDuration" label="业务中断时长"
                                                        align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="channelDuration" label="通道中断时长"
                                                        align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="impactUnit" label="最高影响单位" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="time" label="最终恢复时间" align="center">
                                                    </el-table-column>
                                                </el-table>
                                                <div class="timing">
                                                    <div class="halfrow" style="width:361px">
                                                        <div class="rowtitle">业务中断时长（分）</div>
                                                        <div class="rowtxt">0</div>
                                                    </div>
                                                    <div class="halfrow" style="width:479px">
                                                        <div class="rowtitle">通话中断时长</div>
                                                        <div class="rowtxt">0</div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="rowtitle">影响业务分类统计</div>
                                                        <div class="rowtxt">
                                                            <el-radio-group v-model="radio">
                                                                <el-radio :label="0">本单位及以上服务</el-radio>
                                                                <el-radio :label="1">全部服务</el-radio>
                                                                <el-radio :label="2">国网</el-radio>
                                                                <el-radio :label="3">分部</el-radio>
                                                                <el-radio :label="4">省</el-radio>
                                                                <el-radio :label="5">地市</el-radio>
                                                            </el-radio-group>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </el-collapse-transition>
                                    </div>
                                </div>
                                <!-- 影响业务数 -->
                                <div class="basic_info">
                                    <div class="list_title" @click="businessNumHeight = !businessNumHeight">
                                        影响业务数：{{businessNumList.length}}
                                        <div class="righticonbox">
                                            <img :src="businessNumHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                                alt />
                                        </div>
                                    </div>
                                    <div class="info">
                                        <el-collapse-transition>
                                            <div v-show="businessNumHeight">
                                                <el-table :data="businessNumList" border style="width: 100%">
                                                    <el-table-column prop="no" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="type" label="业务类型" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="name" label="业务名称" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="degree" label="影响程度" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="detail" label="详情" align="center">
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </el-collapse-transition>
                                    </div>
                                </div>
                                <!-- 影响通道数 -->
                                <div class="basic_info">
                                    <div class="list_title" @click="influenceNumHeight = !influenceNumHeight">
                                        影响通道数：{{influenceNumList.length}}
                                        <div class="righticonbox">
                                            <img :src="influenceNumHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                                alt />
                                        </div>
                                    </div>
                                    <div class="info">
                                        <el-collapse-transition>
                                            <div v-show="influenceNumHeight">
                                                <el-table :data="influenceNumList" border style="width: 100%">
                                                    <el-table-column prop="no" width="30">
                                                    </el-table-column>
                                                    <el-table-column label="影响业务类型" prop="inBusinessType">
                                                    </el-table-column>
                                                    <el-table-column label="影响通道名称" prop="name">
                                                    </el-table-column>
                                                    <el-table-column label="影响程度" prop="degree">
                                                    </el-table-column>
                                                    <el-table-column label="详情" type="expand">
                                                        <template slot-scope="props">
                                                            <div class="journalRow">
                                                                <div class="key">通道名称</div>
                                                                <div class="val">{{props.row.name}}</div>
                                                            </div>
                                                            <div class="journalRow">
                                                                <div class="key">通道类型</div>
                                                                <div class="val">{{props.row.type}}</div>
                                                                <div class="key">通道速率</div>
                                                                <div class="val">{{props.row.rate}}</div>
                                                            </div>
                                                            <div class="journalRow">
                                                                <div class="key">承载业务类型</div>
                                                                <div class="val">{{props.row.loadBusinessType}}</div>
                                                                <div class="key">影响程度</div>
                                                                <div class="val">{{props.row.degree}}</div>
                                                            </div>
                                                            <div class="journalRow">
                                                                <div class="key">通道中断起始时间</div>
                                                                <div class="val">{{props.row.startTime}}</div>
                                                                <div class="key">通道中断终止时间</div>
                                                                <div class="val">{{props.row.endTime}}</div>
                                                            </div>
                                                            <div class="journalRow">
                                                                <div class="key">A端</div>
                                                                <div class="val">{{props.row.A}}</div>
                                                                <div class="key">Z端</div>
                                                                <div class="val">{{props.row.Z}}</div>
                                                            </div>
                                                            <div class="journalRow journalTextarea">
                                                                <div class="key">采取措施</div>
                                                                <div class="val">{{props.row.measures}}</div>
                                                            </div>
                                                            <div class="journalRow journalTextarea">
                                                                <div class="key">备注</div>
                                                                <div class="val">{{props.row.remarks}}</div>
                                                            </div>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </el-collapse-transition>
                                    </div>
                                </div>
                                <!-- 备件调拨记录 -->
                                <div class="basic_info">
                                    <div class="list_title" @click="allocationHeight = !allocationHeight">备件调拨记录
                                        <div class="righticonbox">
                                            <img :src="allocationHeight == true ? require('../../assets/img/components-dialog/formPullUp.png') : require('../../assets/img/components-dialog/formPush.png')"
                                                alt />
                                        </div>
                                    </div>
                                    <div class="info">
                                        <el-collapse-transition>
                                            <div v-show="allocationHeight">
                                                <el-table :data="allocationList" border style="width: 100%">
                                                    <el-table-column prop="level" align="center" width="45">
                                                    </el-table-column>
                                                    <el-table-column prop="person" label="备件名称" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="result" label="备件型号" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="time" label="备件库所在地" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="isbusiness" label="备件出库时间" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="ispassageway" label="备件到达时间" align="center">
                                                    </el-table-column>
                                                    <el-table-column prop="duration" label="详情" align="center">
                                                    </el-table-column>
                                                </el-table>
                                            </div>
                                        </el-collapse-transition>
                                    </div>
                                </div>
                                <!-- 缺陷处理过程 -->
                                <div class="basic_info">
                                    <div class="list_title"> 缺陷处理过程 </div>
                                    <div class="info noHeader">
                                        <el-collapse v-model="activeProcess" accordion>
                                            <el-collapse-item :title="item.id +'.'+ item.company" name="1"
                                                v-for="(item,index) in activeList" :key="index">
                                                <el-table :data="activeList" style="width: 100%">
                                                    <el-table-column>
                                                        <template slot-scope="props">
                                                            <div class="journalRow">
                                                                <div class="key">处理单位</div>
                                                                <div class="val">{{props.row.company}}</div>
                                                            </div>
                                                            <div class="journalRow">
                                                                <div class="key">温度</div>
                                                                <div class="val">{{props.row.temp}}</div>
                                                                <div class="key">湿度</div>
                                                                <div class="val">{{props.row.hum}}</div>
                                                            </div>
                                                            <div class="journalRow">
                                                                <div class="key">当地天气</div>
                                                                <div class="val">{{props.row.weather}}</div>
                                                            </div>
                                                            <div class="journalRow journalTextarea">
                                                                <div class="key">处理过程</div>
                                                                <div class="val">{{props.row.process}}</div>
                                                            </div>
                                                            <div class="journalRow">
                                                                <div class="key">缺陷原因分析</div>
                                                                <div class="val">{{props.row.result}}</div>
                                                            </div>
                                                        </template>
                                                    </el-table-column>
                                                </el-table>
                                            </el-collapse-item>
                                        </el-collapse>
                                    </div>
                                </div>
                                <!-- 缺陷报告 -->
                                <div class="basic_info">
                                    <div class="list_title"> 缺陷报告 </div>
                                    <div class="info">
                                        <div class="presentCom" v-for="(item,index) in presentationList" :key="index">
                                            <span>{{item.company}}({{item.person}})</span>
                                            <div style="float:right;" @click="edit">
                                                <img style="margin-top:3px;height:15px"
                                                    src="../../assets/img/components-dialog/edit.png">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="日志" name="second">
                            <div class="form" style="border-color:#3AB5A0;height:630px">
                                <div class="basic_info">
                                    <div class="list_title">填写缺陷表</div>
                                    <div class="info">
                                        <div class="journalRow">
                                            <div class="key">四川故障专责</div>
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
                                <!-- 缺陷消缺 -->
                                <div class="basic_info">
                                    <div class="list_title">缺陷消缺</div>
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
                                <!-- 缺陷分析并编制缺陷报告 -->
                                <div class="basic_info">
                                    <div class="list_title">缺陷分析并编制缺陷报告</div>
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
                                <!-- 缺陷报告审核 -->
                                <div class="basic_info">
                                    <div class="list_title">缺陷报告审核</div>
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
    </div>
</template>

<script>
    export default {
        data() {
            return {
                disabled: true,
                activeName: 'first',
                ruleForm: {
                    no: '缺陷-20191216-四川-桃乡-1',
                    time: '2019-12-16 08:11',
                    title: '桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断',
                    fillinPerson: '王彦璋',
                    fillinTel: '83910',
                    fillinUnit: '国网四川信通公司',
                    reportPerson: '王彦璋',
                    reportTel: '83910',
                    reportUnit: '国网四川信通公司',
                    source: '实时监视',
                    type: '设备缺陷',
                    describe: '12月16日7：51国网四川信通调度监控发现桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断。—— ——2019年12月16日08：13 王彦璋',
                    level: '三级',
                    highestLevel: '三级',
                    place: '银江',
                    company: '省公司',
                    dealUnit: '桃乡',
                    startTime: '2019-12-16 07:51',
                    endTime: '2019-12-16 19:25',
                    isBreak: '是',
                    recoveryTime: '2019-12-16 19:25',
                    businessIsBreak: '是',
                    businessTime: '2019-12-16 19:25',
                    reason: '性能故障',
                    analysisReport: '是'
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
                    title: [{
                        required: true,
                        message: '请输入标题',
                        trigger: 'blur'
                    }],
                    fillinTel: [{
                        required: true,
                        message: '请输入填写人联系电话',
                        trigger: 'blur'
                    }],
                    reportPerson: [{
                        required: true,
                        message: '请输入缺陷上报人',
                        trigger: 'blur'
                    }],
                    reportTel: [{
                        required: true,
                        message: '请输入上报人联系电话',
                        trigger: 'blur'
                    }],
                    reportUnit: [{
                        required: true,
                        message: '请输入上报人单位',
                        trigger: 'blur'
                    }],
                    source: [{
                        required: true,
                        message: '请输入缺陷来源',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '请输入缺陷类型',
                        trigger: 'blur'
                    }],
                    describe: [{
                        required: true,
                        message: '请输入缺陷现象描述',
                        trigger: 'blur'
                    }],
                    level: [{
                        required: true,
                        message: '请输入当前缺陷等级',
                        trigger: 'blur'
                    }],
                    level: [{
                        required: true,
                        message: '请输入当前缺陷等级',
                        trigger: 'blur'
                    }],
                    highestLevel: [{
                        required: true,
                        message: '请输入最高缺陷等级',
                        trigger: 'blur'
                    }],
                    place: [{
                        required: true,
                        message: '请输入缺陷发生地点',
                        trigger: 'blur'
                    }],
                    company: [{
                        required: true,
                        message: '请输入缺陷影响最高单位',
                        trigger: 'blur'
                    }],
                    dealUnit: [{
                        required: true,
                        message: '请输入缺陷处理单位',
                        trigger: 'blur'
                    }],
                    startTime: [{
                        required: true,
                        message: '请输入缺陷起始时间',
                        trigger: 'blur'
                    }],
                    endTime: [{
                        required: true,
                        message: '请输入缺陷终止时间',
                        trigger: 'blur'
                    }],
                    isBreak: [{
                        required: true,
                        message: '请输入业务是否中断',
                        trigger: 'blur'
                    }],
                    recoveryTime: [{
                        required: true,
                        message: '请输入业务恢复时间',
                        trigger: 'blur'
                    }],
                    businessIsBreak: [{
                        required: true,
                        message: '请输入业务通道是否中断',
                        trigger: 'blur'
                    }],
                    businessTime: [{
                        required: true,
                        message: '请输入业务通道恢复时间',
                        trigger: 'blur'
                    }],
                    reason: [{
                        required: true,
                        message: '请输入当前缺陷原因',
                        trigger: 'blur'
                    }],
                    analysisReport: [{
                        required: true,
                        message: '请输入是否编辑缺陷分析报告',
                        trigger: 'blur'
                    }]
                },
                recordHeight: false,
                gradingList: [{
                    level: '三级',
                    person: '王彦璋',
                    result: '---',
                    time: '2019-12-16 08:14:58',
                    isbusiness: '是',
                    ispassageway: '是',
                    duration: '00:23:58'
                }],
                inforHeight: true,
                infoForm: {
                    name: '川.四川/桃乡中兴SDH光传输系统',
                    position: '',
                    system: '桃乡中兴SDH光传输系统',
                    area: '川.四川/桃乡',
                    plat: '220kV银江变',
                    manufactor: '中兴',
                    type: '光传输系统',
                    equipmentModel: 'ZXMP S390',
                    boardType: '',
                    boardModel: '',
                    time: '2011-05-31 00：00',
                    company: '国网四川信通公司'
                },
                infoRules: {
                    name: [{
                        required: true,
                        message: '请输入设备名称',
                        trigger: 'blur'
                    }],
                    system: [{
                        required: true,
                        message: '请输入所属系统',
                        trigger: 'blur'
                    }],
                    area: [{
                        required: true,
                        message: '请输入所属区域',
                        trigger: 'blur'
                    }],
                    plat: [{
                        required: true,
                        message: '请输入所在站点',
                        trigger: 'blur'
                    }],
                    manufactor: [{
                        required: true,
                        message: '请输入设备厂家',
                        trigger: 'blur'
                    }],
                    type: [{
                        required: true,
                        message: '请输入设备类型',
                        trigger: 'blur'
                    }],
                    equipmentModel: [{
                        required: true,
                        message: '请输入设备型号',
                        trigger: 'blur'
                    }],
                    time: [{
                        required: true,
                        message: '请输入投运时间',
                        trigger: 'blur'
                    }],
                    company: [{
                        required: true,
                        message: '请输入运行维护单位',
                        trigger: 'blur'
                    }]
                },
                impactinforHeight: false,
                recordList: [{
                    type: '保护',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '安控',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '自动化',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '行政电话',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '调度电话',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '电视电话会议',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '调度数据网',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '综合数据网',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '保护系统',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '其他',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }, {
                    type: '统计',
                    businessInter: 0,
                    channelInter: 0,
                    businessDuration: 0,
                    channelDuration: 0,
                    impactUnit: '---',
                    time: '---'
                }],
                radio: 0,
                businessNumHeight: false,
                businessNumList: [],
                influenceNumHeight: false,
                influenceNumList: [{
                    no: '1',
                    inBusinessType: '通信PCM',
                    name: 'E-2M[润城亚字：1框-3槽-RCYXZGF_1662_1/r01s1b03p01c01端口^时隙：1<>袁庄集控：01框-17槽-YZJK_1662_1/r01s1b17p24c01端口^时隙：1]',
                    degree: '受阻',
                    type: 'SDH通道',
                    rate: '2M',
                    loadBusinessType: 'SDH通道',
                    startTime: '2019-12-16 07:51:00',
                    endTime: '2019-12-16 19:25:08',
                    A: '---',
                    Z: '---',
                    measures: 'SNCF',
                    remarks: '---'
                }, {
                    no: '2',
                    inBusinessType: '调度数据网',
                    name: 'E-2M[润城亚字：1框-3槽-RCYXZGF_1662_1/r01s1b03p01c01端口^时隙：1<>袁庄集控：01框-17槽-YZJK_1662_1/r01s1b17p24c01端口^时隙：1]',
                    degree: '受阻',
                    type: 'SDH通道',
                    rate: '2M',
                    loadBusinessType: 'SDH通道',
                    startTime: '2019-12-16 07:51:00',
                    endTime: '2019-12-16 19:25:08',
                    A: '---',
                    Z: '---',
                    measures: 'SNCF',
                    remarks: '---'
                }, {
                    no: '3',
                    inBusinessType: '调度数据网',
                    name: 'E-2M[润城亚字：1框-3槽-RCYXZGF_1662_1/r01s1b03p01c01端口^时隙：1<>袁庄集控：01框-17槽-YZJK_1662_1/r01s1b17p24c01端口^时隙：1]',
                    degree: '受阻',
                    type: 'SDH通道',
                    rate: '2M',
                    loadBusinessType: 'SDH通道',
                    startTime: '2019-12-16 07:51:00',
                    endTime: '2019-12-16 19:25:08',
                    A: '---',
                    Z: '---',
                    measures: 'SNCF',
                    remarks: '---'
                }],
                allocationHeight: true,
                allocationList: [],
                activeProcess: "1",
                activeList: [{
                    id: 1,
                    company: '国网四川信通公司',
                    temp: '0',
                    hum: '40',
                    weather: '大雪',
                    process: '12月16日11：20围场通信运维人员到达220kV银江变，现场发现站内一体化电源直流进线空开跳闸，导致通信设备失电，造成220kV银江变至小关子电站SDH光传输系统通道中断，12：05现场将两路20A直流空开更换为32A直流空开后，通信设备回复正常供电，桃乡中兴SDH光传输系统220kV银江变至小关子电站光通道回复正常运行。————2019年12月16日19：18 武荣伟',
                    result: '站内一体化电源直流进线空开跳闸，导致通信设备失电是造成本次缺陷的原因。'
                }],
                // 缺陷报告
                presentationList: [{
                    company: "国网四川信通公司",
                    person: '何巍'
                }, {
                    company: "国网四川信通公司",
                    person: '何巍'
                }, {
                    company: "国网四川信通公司",
                    person: '何巍'
                }],
                // 审批信息
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
                fileList: []
            };
        },
        methods: {
            closedialogs() {
                this.$store.commit("opendefectlist", {
                    boolean: false
                });
            },
            handleClick(tab, event) {},
            handleChange(file, fileList) {
                this.fileList = fileList.slice(-3);
            },
            edit() {}
        }
    }
</script>

<style lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
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
                                border-bottom: 2px solid #f2f2f2;
                            }

                            .list_title {
                                height: 30px;
                                line-height: 30px;
                                padding-left: 15px;
                                background-color: #03796b;
                                color: #fff;
                            }

                            /* form ------start */
                            .el-form-item {
                                display: inline-block;
                                box-sizing: border-box;
                                width: 50%;
                                height: 26px;
                                border-right: 1px solid #E8E8E8;
                                border-bottom: 1px solid #E8E8E8;
                                 margin-bottom: 0;
                            }

                            .el-form-item__label {
                                height: 25px;
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
                                    height: 100%;
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

                            .el-radio {
                                margin-right: 15px !important;

                                .el-radio__label {
                                    font-size: 12px;
                                    padding-left: 5px;
                                }
                            }

                            .el-input.is-disabled .el-input__inner,
                            .el-textarea.is-disabled .el-textarea__inner {
                                background: #fff;
                            }

                            /* form ------ending */

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


                            .cell {
                                overflow: hidden;
                                white-space: nowrap;
                                text-overflow: ellipsis;
                            }

                            /** el-table ------ end */

                            /** el-collapse ------ start */
                            .el-collapse-item__header {
                                color: #fff;
                                padding: 0 15px;
                                background: #00887a;
                                height: 25px;
                            }

                            .el-collapse-item__content {
                                padding: 0;
                            }

                            .el-collapse-item__arrow {
                                font-size: 20px;
                                margin-right: 5px;
                                background-color: transparent!important;
                            }

                            // .mainbox .list .el-collapse-item__header .is-active {
                            //     background-color: none !important;
                            // }

                            /** el-collapse ------ ending */

                            .wholerow,
                            .textarea {
                                // display: flex;
                                width: 100%;
                            }

                            .textarea {
                                height: 60px;

                                .el-form-item__label {
                                    width: 100%;
                                    height: 100%;
                                    line-height: 25px;
                                }

                                .el-input__inner {
                                    height: 58px;
                                }
                            }

                            .righticonbox {
                                float: right;

                                img {
                                    width: 17px;
                                    margin-right: 20px;
                                }
                            }

                            .timing {
                                border: 1px solid #e8e8e8;
                                border-top: none;
                                font-size: 12px;
                                color: #000;

                                .halfrow,
                                .row {
                                    display: inline-block;
                                    box-sizing: border-box;
                                    width: 100%;
                                    height: 25px;
                                    line-height: 25px;
                                    text-align: center;
                                    border-bottom: 1px solid #E8E8E8;
                                }

                                .halfrow {
                                    border-right: 1px solid #E8E8E8;
                                }
                            }

                            .rowtitle {
                                float: left;
                                box-sizing: border-box;
                                width: 121px;
                                border-right: 1px solid #E8E8E8;
                                padding-left: 12px;
                            }

                            .rowtxt {
                                float: left;
                                padding-left: 20px;
                            }

                            .el-table__expanded-cell {
                                padding: 0;
                            }

                            .el-table td,
                            .el-table th {
                                padding: 0;
                            }

                            .noHeader {
                                .cell {
                                    padding: 0;
                                }

                                .el-table__header-wrapper {
                                    display: none;
                                }

                            }

                            .presentCom {
                                height: 24px;
                                line-height: 24px;
                                font-size: 12px;
                                border: 1px solid #C2E5F5;
                                background: #EDFCF1;
                                margin: 5px;
                                padding: 0 5px;
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

                            .row {
                                width: 100%;
                            }

                        }
                    }
                }
            }
        }
    }
</style>