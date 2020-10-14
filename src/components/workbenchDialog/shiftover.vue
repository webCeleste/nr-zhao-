<template>
  <div>
    <el-dialog
      :visible.sync="shiftover"
      width="100%"
      :before-close="handleClose"
      :title="overcode|dataFormat(overcode)"
      class="shiftover"
    >
      <div class="onesbox">
        <slot name="firstnavtop">
          <div class="navonecur">
            <div class="titleboxs">填写交班事项</div>
          </div>
        </slot>

        <div class="formbox">
          <el-form ref="form" :model="form" label-width="80px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="班次日期" label-width="100px">
                  <el-input v-model="form.date" :disabled="disabledone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="交接班次">
                  <el-input v-model="form.frequency" :disabled="disabledone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="值班员">
                  <el-input v-model="form.admin" :disabled="disabledone"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="8">
                <el-form-item label="班次接班时间" label-width="100px">
                  <el-input v-model="form.time" :disabled="disabledone"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="天气">
                  <el-input v-model="form.weather" :disabled="disabledtwo"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="温度">
                  <el-input v-model="form.temperature" :disabled="disabledtwo"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

            <slot name="froms">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="班次交班时间" label-width="100px">
                    <el-input v-model="form.time2" :disabled="disabledtwo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="交班人">
                    <el-input v-model="form.admin2" :disabled="disabledtwo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </slot>

            <el-form-item label="交班事宜" label-width="100px">
              <el-input type="textarea" v-model="form.matters" :disabled="disabledtwo"></el-input>
            </el-form-item>

            <slot name="bottons">
              <el-form-item class="footer">
                <el-button type="primary" @click="handleshiftover">交班</el-button>
              </el-form-item>
            </slot>
          </el-form>
        </div>
      </div>

      <div class="onesbox" v-if="overcode !==1">
        <slot name="firstnavmain">
          <div :class="[overcode==3?'navone':'navonecur']">
            <div class="titleboxs">接班</div>
          </div>
        </slot>

        <slot name="maintwo">
          <div class="formbox">
            <el-form ref="form" :model="formtwo" label-width="80px">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="班次日期" label-width="100px">
                    <el-input v-model="formtwo.date" :disabled="disabledtwo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="交接班次">
                    <el-input v-model="formtwo.frequency" :disabled="disabledtwo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="值班员">
                    <el-input v-model="formtwo.admin" :disabled="disabledtwo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="8">
                  <el-form-item label="班次接班时间" label-width="100px">
                    <el-input v-model="formtwo.time" :disabled="disabledtwo"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="接班人">
                    <el-input v-model="formtwo.weather" :disabled="disabledtwo"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <slot name="bottons2">
                <el-row>
                  <el-col :span="3">
                    <el-form-item label="接班人验证" label-width="100px"></el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="用户名：" label-width="80px">
                      <el-input v-model="formtwo.users" :disabled="disabledtheer"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item label="密码：">
                      <el-input
                        v-model="formtwo.password"
                        type="password"
                        :disabled="disabledtheer"
                      ></el-input>
                    </el-form-item>
                  </el-col>

                  <el-col :span="3">
                    <el-form-item class="footer">
                      <el-button type="primary" @click="verification">验证</el-button>
                    </el-form-item>
                  </el-col>
                </el-row>
              </slot>
            </el-form>
          </div>
        </slot>
      </div>
      <slot name="firstnavbootom">
        <div class="navone">
          <div class="titleboxs">{{overcode == 3?'交班未结束事项':"未结束事项"}}</div>
        </div>
      </slot>

      <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsbox" type="border-card">
        <el-tab-pane label="运行记录" name="1">
          <div class="tableboxs">
            <div class="tablebox">
              <el-table
                class="tables"
                ref="multipleTable"
                key="Operationrecord"
                :data="tableData"
                tooltip-effect="dark"
                border
                @selection-change="handleSelectionChange"
                @row-dblclick="handlecellopen"

              >
                <el-table-column type="index" width="30"></el-table-column>
                <el-table-column label="来源" align="center" width="120">
                  <template slot-scope="scope">
                    <span class="toptops" v-if="scope.row.top==true">顶</span>
                    <span>{{ scope.row.source|tablechange(scope.row.source) }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="time"
                  align="center"
                  width="200"
                  label="日期"
                  sortable
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="frequency"
                  align="center"
                  label="班次"
                  width="100"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="title"
                  align="center"
                  label="工作标题"
                  width="160"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="main"
                  align="center"
                  label="工作内容"
                  width="160"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column prop="equipment" align="center" label="资源设备" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="recovery"
                  align="center"
                  label="恢复时间"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="apply"
                  align="center"
                  label="申请单位"
                  width="180"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="people"
                  align="center"
                  label="申报人"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="news"
                  align="center"
                  label="最新处理"
                  width="170"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="检修记录" name="2">
          <div class="tableboxs">
            <div class="tablebox">
              <el-table
                class="tables"
                key="overhaulData"
                :data="overhaulData"
                tooltip-effect="dark"
                border
                @row-dblclick="handleoverhaul"
                @selection-change="handleSelectionChange" 
              >
                <el-table-column type="index" width="30"></el-table-column>
               
                <el-table-column label="工单编号" align="center" width="240" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <!-- <span class="toptops" v-if="scope.row.top==true">顶</span> -->
                    <span>{{ scope.row.nums }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="title"
                  align="center"
                  label="标题"
                  width="240"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column prop="apply" align="center" label="申请单位" width="120"></el-table-column>
                <el-table-column
                  prop="types"
                  align="center"
                  label="检修类型"
                  width="100"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="major"
                  align="center"
                  label="是否重大检修"
                  width="120"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.major" placeholder="请选择">
                      <el-option label="否" value="否"></el-option>
                      <el-option label="是" value="是"></el-option>
                    </el-select>
                    <!-- <span>{{ scope.row.abnormal }}</span> -->
                  </template>
                </el-table-column>
                <el-table-column
                  prop="abnormal"
                  align="center"
                  label="异常情况"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="category"
                  align="center"
                  width="100"
                  label="检修类别"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column prop="equipment" align="center" label="报备类型" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="content"
                  align="center"
                  label="检修工作内容"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="reason"
                  align="center"
                  label="检修工作原因"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="time"
                  align="center"
                  label="开工时间"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="condition"
                  align="center"
                  label="状态"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="range"
                  align="center"
                  label="检修影响范围"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="方式管理" name="3">
          <div class="tableboxs">
            <div class="tablebox">
              <el-table
                class="tables"
                key="modeData"
                :data="modeData"
                tooltip-effect="dark"
                border
                @row-dblclick="handlemode"
              >
                <el-table-column type="index" width="30"></el-table-column>
               
                <el-table-column label="方式单号" align="center" width="240" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <!-- <span class="toptops" v-if="scope.row.top==true">顶</span> -->
                    <span>{{ scope.row.nums }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="title"
                  align="center"
                  label="标题"
                  width="240"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="apply"
                  align="center"
                  label="申请单位"
                  width="140"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="types"
                  align="center"
                  label="方式类型"
                  width="100"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="source"
                  align="center"
                  label="方式来源"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="applicationno"
                  align="center"
                  label="业务申请单号"
                  width="220"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="names"
                  align="center"
                  width="200"
                  label="业务名称"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="businesstypes"
                  align="center"
                  label="业务类型"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="content"
                  align="center"
                  label="申请内容"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="organization"
                  align="center"
                  label="方式编制"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="person"
                  align="center"
                  label="方式开通负责人"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="缺陷管理" name="4">
          <div class="tableboxs">
            <div class="tablebox">
              <el-table
                class="tables"
                key="defectData"
                :data="defectData"
                tooltip-effect="dark"
                border
                @row-dblclick="handledefec"
                @selection-change="handleSelectionChange" 
              >
                <el-table-column type="index" width="30"></el-table-column>
               
                <el-table-column label="工单编号" align="center" width="240" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <!-- <span class="toptops" v-if="scope.row.top==true">顶</span> -->
                    <span>{{ scope.row.nums }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="workorder"
                  align="center"
                  label="工单状态"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="defect"
                  align="center"
                  label="缺陷设备"
                  width="320"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="describe"
                  align="center"
                  label="缺陷现象描述"
                  width="480"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="source"
                  align="center"
                  label="缺陷来源"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="times"
                  align="center"
                  label="缺陷时长"
                  width="180"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="report"
                  align="center"
                  width="170"
                  label="是否编制缺陷报告"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column prop="grade" align="center" label="安全等级" show-overflow-tooltip></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工作联系单" name="5">
          <div class="tableboxs">
            <div class="tablebox">
              <el-table
                class="tables"
                key="contactData"
                :data="contactData"
                tooltip-effect="dark"
                border
                @selection-change="handleSelectionChange" 
              >
                <el-table-column type="index" width="30"></el-table-column>
               
                <el-table-column label="工单编号" align="center" width="240" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <!-- <span class="toptops" v-if="scope.row.top==true">顶</span> -->
                    <span>{{ scope.row.nums }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="title" align="center" label="标题" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="release"
                  align="center"
                  label="发布单位"
                  width="340"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="mains"
                  align="center"
                  label="工作内容"
                  width="440"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="times"
                  align="center"
                  label="要求完成时间"
                  width="180"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="states"
                  align="center"
                  label="状态"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="datenode"
                  align="center"
                  width="170"
                  label="时间节点"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="风险预警单" name="6">
          <div class="tableboxs">
            <div class="tablebox">
              <el-table
                class="tables"
                key="riskData"
                :data="riskData"
                tooltip-effect="dark"
                border
                @row-dblclick="handlerisk"
                @selection-change="handleSelectionChange" 
              >
                <el-table-column type="index" width="30"></el-table-column>
               
                <el-table-column label="编号" align="center" width="240" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <!-- <span class="toptops" v-if="scope.row.top==true">顶</span> -->
                    <span>{{ scope.row.nums }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="title" align="center" label="标题" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="release"
                  align="center"
                  label="拟制单位"
                  width="240"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="dates"
                  align="center"
                  label="预警时间"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="times"
                  align="center"
                  label="预警实际结束时间"
                  width="200"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="chief"
                  align="center"
                  label="主送单位"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="communication"
                  align="center"
                  width="170"
                  label="涉及通信系统"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="grade"
                  align="center"
                  width="150"
                  label="风险预警等级"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="control"
                  align="center"
                  width="280"
                  label="风险预控要求"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="第二种工作票" name="7">
          <div class="tableboxs">
            <div class="tablebox">
              <el-table
                class="tables"
                key="secondData"
                :data="secondData"
                tooltip-effect="dark"
                border
                @selection-change="handleSelectionChange" 
              >
                <el-table-column type="index" width="30"></el-table-column>
               
                <el-table-column label="编号" align="center" width="240" show-overflow-tooltip>
                  <template slot-scope="scope">
                    <!-- <span class="toptops" v-if="scope.row.top==true">顶</span> -->
                    <span>{{ scope.row.nums }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="title" align="center" label="标题" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="states"
                  align="center"
                  label="工单状态"
                  width="150"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="release"
                  align="center"
                  label="拟制单位"
                  width="240"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="matter"
                  align="center"
                  label="预警事项"
                  width="150"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="dates"
                  align="center"
                  label="预警开始时间"
                  width="140"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="times"
                  align="center"
                  label="预警结束时间"
                  width="140"
                  show-overflow-tooltip
                ></el-table-column>

                <el-table-column
                  prop="control"
                  align="center"
                  width="280"
                  label="风险预控要求"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="grade"
                  align="center"
                  width="170"
                  label="风险预警等级"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工作记录" name="8">
          <div class="tableboxs">
            <div class="tablebox">
              <el-table
                class="tables"
                ref="multipleTable"
                key="record"
                :data="recordData"
                tooltip-effect="dark"
                border
                @row-dblclick="handlecellopen"
                @selection-change="handleSelectionChange" 
              >
                <el-table-column type="index" width="30"></el-table-column>
               
                <el-table-column
                  prop="times"
                  align="center"
                  width="180"
                  label="日期"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="frequency"
                  align="center"
                  label="班次"
                  width="100"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="dates"
                  align="center"
                  label="时间"
                  width="150"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="title"
                  align="center"
                  label="标题"
                  width="380"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column prop="record" align="center" label="记录" show-overflow-tooltip></el-table-column>
                <el-table-column
                  prop="enclosure"
                  align="center"
                  label="附件"
                  width="480"
                  show-overflow-tooltip
                ></el-table-column>
                <el-table-column
                  prop="states"
                  align="center"
                  label="状态"
                  width="120"
                  show-overflow-tooltip
                ></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
    </el-dialog>
    <Operationrecord></Operationrecord>
  </div>
</template>

<script>
import Operationrecord from "../../components/workbenchDialog/operationrecord";

export default {
  props: {
    shiftover: Boolean,
    overcode: Number,
  },
  components:{
    Operationrecord
  },
  filters: {
    dataFormat(msg) {
      if (msg == 1) {
        return "第一步：交班";
      } else if (msg == 2) {
        return "第二步：接班";
      } else if (msg == 3) {
        return "第三步：完成";
      }
    },
    tablechange(msg) {
      if (msg == "01") {
        return "用户申告";
      } else if (msg == "02") {
        return "通信运维";
      } else if (msg == "03") {
        return "实时监视";
      } else if (msg == "04") {
        return "其他";
      }
    },
  },

  data() {
    return {
      activeName: "1",
      currentPage: 5,

      form: {
        date: "2020-08-10",
        frequency: "白班",
        admin: "王一平，马跃",
        admin2: "赵信",
        time: "16:00",
        time2: "08:00",
        weather: "",
        temperature: "",
        matters: "",
      },
      formtwo: {
        date: "2020-08-10",
        frequency: "白班",
        admin: "李虎,赵伟",
        admin2: "赵信",
        time: "16:00",
        weather: "刘国伟",
        users: "",
        password: "",
      },

      //   运行记录
      tableData: [
        {
          source: "02",
          time: "2020-08-11",
          frequency: "白班",
          title: "检修05",
          main: "检修变电站",
          equipment: "500kV桃乡变ZXMP S390(桃乡2)",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
          recovery: "2020-08-12",
        },
        {
          source: "03",
          time: "2020-08-10",
          frequency: "白班",
          title: "检修05",
          main: "检修变电站",
          equipment: "500kV桃乡变ZXMP S390(桃乡2)",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
          recovery: "2020-08-12",
        },
        {
          source: "04",
          time: "2020-08-08",
          frequency: "白班",
          title: "检修05",
          main: "检修变电站",
          equipment: "500kV桃乡变ZXMP S390(桃乡2)",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
          recovery: "2020-08-12",
        },
        {
          source: "01",
          time: "2020-08-07",
          frequency: "白班",
          title: "检修05",
          main: "检修变电站",
          equipment: "500kV桃乡变ZXMP S390(桃乡2)",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
          recovery: "2020-08-01",
        },
        {
          source: "04",
          time: "2020-08-03",
          frequency: "白班",
          title: "检修05",
          main: "检修变电站",
          equipment: "500kV桃乡变ZXMP S390(桃乡2)",
          apply: "四川省电力公司",
          people: "马跃",
          news: "",
          recovery: "2020-08-12",
        },
      ],
      // 检修记录
      overhaulData: [
        {
          nums: "检修-20140805-西南-四川-成都-1",
          title: "陡贾一、二线纵联电流差动保护（RCS-931AM）电路方式变更",
          apply: "信通分公司",
          types: "计划检验",
          category: "",
          equipment: "计划检验",
          content:
            "陡贾一、二线纵联电流差动保护（RCS-931AM）电路方式由高频变更为2M",
          reason: "配合保护改造",
          time: "2020-08-12 10:00",
          condition: "处理中",
          major: "否",
          abnormal: "无",
          range: "攀煤电厂",
        },
      ],
      //方式管理
      modeData: [
        {
          nums: "方式-2019-四川-桃乡-1837",
          title:
            "PanZhihua-2019-F1577-1583（220kV银川热电传输设备改造相关方式）--桃乡部分业务",
          apply: "国网四川信通公司",
          types: "正式方式",
          source: "直接启动的方式",
          applicationno: "(500kV桃乡变-500kV尖山变)继电保护业务01",
          names: "(500kV桃乡变-500kV尖山变)继电保护业务01",
          businesstypes: "继电保护",
          content: "220kV银川热电传输设备改造相关方式",
          organization: "",
          person: "马跃",
        },
      ],

      //缺陷管理
      defectData: [
        {
          nums: "缺陷-20191216-四川-桃乡-1",
          workorder: "待办",
          defect: "川.四川/桃乡中兴SDH光传输系统",
          describe:
            "12月16日7：51国网四川信通调度监控发现桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断。—— ——2019年12月16日08：13 王彦璋",
          source: "实时监视",
          times: "08:00",
          report: "是",
          grade: "三级",
        },
      ],

      //工作联系单
      contactData: [
        {
          nums: "方式-2019-四川-桃乡-1837",
          title: "（220kV银川热电传输设备改造相关方式）--桃乡部分业务",
          release: "国网四川信通公司",
          mains: "220kV银川热电传输设备改造相关方式",
          times: "08:00",
          states: "进行中",
          datenode: "",
        },
      ],
      //风险预警单
      riskData: [
        {
          nums: "预警-TX-20190808-国网信通-1",
          title: "关于2019年第9号台风“利奇马”的风险预警",
          states: "",
          release: "国家电网公司信息通信分公司",
          matter: "",
          dates: "2019-08-09 08:00",
          times: "2019-08-15 18:00",
          control:
            "1.合理安排应急值班，加强监测控，调配好抢险队伍、救援装备和物资，强化客户服务，认真做好各项应急准备工作。2.各单位要加强与当地气象、海洋等部门的联系，密切关注气象变化情况，根据情况变化几室采取措施。3.合理安排信息通信系统运行方式，做好事故预想，落实灾害预防、预警措施，确保系统安全稳定运行。4.科学救灾，合理避险，切实落实各项安全措施，加强抢修安全管理，确保抢修工作人员安全。5.加强应急值班和信息报告工作，严格执行“零汇报”机制，发生异常情况和突发事件，即使向国网信通调度汇报。6.请相关单位于8月9日9：00前在系统中反馈预警跟踪落实情况。",
          grade: "八级",
        },
      ],
      //第二种工作票
      secondData: [
        {
          nums: "预警-TX-20190808-国网信通-1",
          title: "关于2019年第9号台风“利奇马”的风险预警",
          release: "国家电网公司信息通信分公司",
          dates: "2019-08-09 08:00",
          times: "2019-08-15 18:00",
          chief:
            "国网华北、东北分部，国网山东、河北、天津、四川、辽宁、黑龙江、吉林电力",
          communication: "一级骨干网 .国网信通",
          grade: "八级",
          control:
            "1.合理安排应急值班，加强监测控，调配好抢险队伍、救援装备和物资，强化客户服务，认真做好各项应急准备工作。2.各单位要加强与当地气象、海洋等部门的联系，密切关注气象变化情况，根据情况变化几室采取措施。3.合理安排信息通信系统运行方式，做好事故预想，落实灾害预防、预警措施，确保系统安全稳定运行。4.科学救灾，合理避险，切实落实各项安全措施，加强抢修安全管理，确保抢修工作人员安全。5.加强应急值班和信息报告工作，严格执行“零汇报”机制，发生异常情况和突发事件，即使向国网信通调度汇报。6.请相关单位于8月9日9：00前在系统中反馈预警跟踪落实情况。",
        },
      ],
      //工作记录
      recordData: [
        {
          times: "2019-08-15 18:00",
          frequency: "白班",
          dates: "08:00",
          title: "关于2019年第9号台风“利奇马”的风险预警",
          record: "国家电网公司信息通信分公司",
          enclosure:
            "国网华北、东北分部，国网山东、河北、天津、四川、辽宁、黑龙江、吉林电力",
          states: "进行中",
        },
      ],
    };
  },
  computed: {
    disabledone() {
      if (this.overcode == 1 || this.overcode == 2 || this.overcode == 3) {
        return true;
      } else {
        return false;
      }
    },
    disabledtwo() {
      if (this.overcode == 2 || this.overcode == 3) {
        return true;
      } else {
        return false;
      }
    },
    disabledtheer() {
      if (this.overcode == 3) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    console.log(this.overcode, "overcode");
  },
  methods: {
    
    handlerisk(){
       this.$parent.handlerisk();

    },
    handlemode(){
       this.$parent.handlemode();

    },
    handledefec(){
       this.$parent.handledefec();
    },
    handleoverhaul(){
      this.$emit("handleoverhaul");

    },
    handlecellopen(){
      this.$emit("newlybuild");

    },
    verification() {
      this.$emit("update:shiftover", false);
      this.$emit("update:overcode", 3);
      this.$emit("shiftoveropen");
    },
    handleshiftover() {
      this.$emit("update:shiftover", false);
      this.$emit("update:overcode", 2);
      this.$emit("shiftoveropen");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      console.log(val, "val");
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    formatDate(date) {
      var year = date.getFullYear();
      var month = this.format(date.getMonth() + 1);
      var da = this.format(date.getDate());
      var h = this.format(date.getHours());
      var m = this.format(date.getMinutes());
      var s = this.format(date.getSeconds());
      return year + "-" + month + "-" + da + " " + h + ":" + m + ":" + s;
      // return year + "-" + month + "-" + da;
    },
    format(val) {
      return Number(val) < 10 ? "0" + val : "" + val;
    },
    //  getSTime(val) {
    //    console.log(val,'val===')
    //   this.ruleForm.time = val;
    // },
    submitForm() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
      // console.log(this.ruleForm, "ruleForm");
      this.$emit("update:shiftover", false);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose() {
      this.$emit("update:shiftover", false);
    },
  },
};
</script>

<style lang="scss" scoped>
.shiftover {
  /deep/.el-dialog {
    margin-top: 0 !important;
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    .el-dialog__header {
      padding: 5px;

      background: #3ab5a0;
      color: #fff;
      .el-dialog__headerbtn {
        top: 8px;
        right: 12px;
        .el-icon-close:before {
          color: #fff;
        }
      }
      .el-dialog__title {
        margin-left: 15px;
        font-size: 13px;
        line-height: 30px;
        color: #fff;
        font-weight: 600;
      }
    }
    .el-dialog__body {
      padding: 10px 20px 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      .onesbox {
        border: 2px solid #f2f2f2;
        // padding:0 10px ;
        margin-bottom: 5px;
        .formbox {
          padding: 5px 20px;
        }
      }
      .navone {
        height: 30px;
        background: #f2f2f2;
        margin-bottom: 2px;
        .titleboxs {
          height: 30px;
          color: #999;
          font-size: 15px;
          line-height: 30px;
          text-align: left;
          margin-left: 20px;
          font-weight: 600;
        }
      }
      .navonecur {
        height: 30px;
        background: #f2f2f2;
        margin-bottom: 2px;
        // border-bottom: 1px solid #3ab5a0;
        .titleboxs {
          margin-left: 20px;

          height: 30px;
          color: #3ab5a0;
          font-size: 15px;
          line-height: 30px;
          font-weight: 600;
          text-align: left;
        }
      }

      .footer {
        height: 45px;
        line-height: 45px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        .el-button {
          width: 70px;
          height: 30px;
          padding: 0;
        }
        /deep/.el-button--primary {
          background: #3ab5a0;
          border: 0;
        }
      }

      /deep/.tabsbox {
        flex: 1;
        display: flex;
        flex-direction: column;
        .el-tabs__item.is-active {
          color: #3ab5a0;
          font-weight: 700;
        }
        .el-tabs__active-bar {
          background: #3ab5a0;
        }
        .el-tabs__header {
          margin-bottom: 2px;
          // margin: 0;
        }
        .el-tabs__content {
          flex: 1;
        }
        .el-tab-pane {
          height: 100%;
        }

        .tableboxs {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .tablebox {
            width: 100%;
            // margin: 0 10px;
            /deep/.tables {
              .el-table__header tr,
              .el-table__header th {
                padding: 0;
                height: 40px;
                background: #3bb5a0;
                color: #fff;
              }
              .el-table__body tr,
              .el-table__body td {
                padding: 0;
                height: 40px;
              }
              .el-checkbox__input.is-checked .el-checkbox__inner,
              .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                background: #3bb5a0;
                border-color: #3bb5a0;
              }
              .cell {
                .el-button--primary {
                  background: #3ab5a0;
                  border: 0;
                }
              }
              .toptops {
                color: #fff;
                width: 20px;
                height: 20px;
                line-height: 20px;
                display: inline-block;
                margin-right: 5px;
                background: cornflowerblue;
              }
            }
          }
        }
      }
      .pages {
        height: 35px;
        //   background: #fff;
        /deep/.el-pager li.active {
          color: #3bb5a0;
        }
      }
    }
  }
}
</style>