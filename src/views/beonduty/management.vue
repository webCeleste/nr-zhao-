<template>
  <div class="backgroundbox">
    <div class="navbox">
      <div class="titlebox">值班情况：</div>
      <div class="listbox">
        <span class="linebox bgc_ff0000"></span>
        <span class="textbox">未值班</span>
      </div>
      <div class="listbox">
        <span class="linebox bgc_01ccff"></span>
        <span class="textbox">正常值班</span>
      </div>
      <div class="listbox">
        <span class="linebox bgc_ffc600"></span>
        <span class="textbox">正在值班</span>
      </div>
      <div class="listbox">
        <span class="linebox bgc_ea8100"></span>
        <span class="textbox">未按时交班</span>
      </div>
      <div class="listbox">
        <span class="linebox bgc_08ceac"></span>
        <span class="textbox">未开始</span>
      </div>
    </div>
    <div class="middleNav">
      <div class="middleNav_left">
        <span
          v-for="(item,index) in tab"
          @click="tabTag(index)"
          :key="index"
          :class="{tab:num==index}"
        >{{item}}</span>
      </div>
      <div class="middleNav_middle">
        <div class="pickerBox">
          <span class="iconfont el-icon-zuo" @click="pickerLeft"></span>
          <el-date-picker
            clear-icon
            v-model="value_date"
            style="width:150px"
            type="month"
            placeholder="选择日期"
          ></el-date-picker>
          <span class="iconfont el-icon-you" @click="pickerRight"></span>
        </div>
      </div>
      <div class="middleNav_right">
        <div class="buttons">
          <el-button plan @click="newSet">新建</el-button>
          <el-button plan @click="subSet">提交</el-button>
          <el-button plan @click="subExport">导出</el-button>
        </div>
      </div>
    </div>

    <!-- <div
      class="calendar"
      v-show="num==0"
      v-watermark="{text:'已值班',font:'46px Microsoft JhengHei',width:'100%',textColor:'rgba(180, 180, 180, 0.3)'}"
    >
      <full-calendar :config="config" :events="events"></full-calendar>
    </div>-->
    <calendar :flagList="flagList" :value_date="value_date" v-show="num==0"></calendar>
    <!-- 表格 -->
    <div
      class="tableboxs_zb"
      v-show="num==1"
      v-watermark="{text:'未提交',font:'200px Microsoft JhengHei',width:'100%',textColor:'rgba(180, 180, 180, 0.3)'}"
    >
      <div class="tablebox">
        <el-table
          class="tables"
          ref="multipleTable"
          key="xx值班单位"
          :data="tableData"
          tooltip-effect="dark"
          border
        >
          <el-table-column type="index" label="序" width="30"></el-table-column>

          <el-table-column width="50">
            <template slot-scope="scope">
              <div class="listbox1">
                <span
                  class="linebox"
                  :class="[{bgc_ff0000:scope.row.flag==true},{bgc_ffc600:scope.row.flag==false}]"
                ></span>
                <img
                  src="../../assets/img/值班/调班标志.png"
                  style="width:15px;height:15px"
                  v-if="scope.row.flag==true"
                  alt
                />
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column type="selection" width="50"></el-table-column> -->
          <el-table-column prop="data" label="日期" align="center"></el-table-column>
          <el-table-column prop="Pbnum" align="center" label="班次"></el-table-column>
          <el-table-column prop="Pbnumber" align="center" label="排班班组"></el-table-column>
          <el-table-column prop="Pbname" align="center" label="排班值班员"></el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <img
                src="../../assets/img/值班/编辑.png"
                style="width:15px;height:15px;cursor: pointer;"
                @click="flagList.centerDialogVisible1=true"
                v-if="scope.row.flag==true"
                alt
              />
              <img
                src="../../assets/img/值班/申请调班.png"
                style="width:15px;height:15px;cursor: pointer;"
                @click="flagList.centerDialogVisible5=true"
                v-if="scope.row.flag=='null'"
                alt
              />
              <img
                src="../../assets/img/值班/查看.png"
                style="width:15px;height:15px;cursor: pointer;"
                @click="flagList.centerDialogVisible4= true"
                v-if="scope.row.flag==false"
                alt
              />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <div class="pages">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="100"
          layout="prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>-->
    </div>
    <!-- 弹框 -->
    <el-dialog
      title="新建排班计划"
      :visible.sync="flagList.centerDialogVisible"
      width="540px"
      class="Visible3"
    >
      <div>
        <el-form label-width="80px" :model="form">
          <el-form-item label="月份：" label-width="150px">
            <el-date-picker v-model="form.month" type="month" placeholder="选择月" class="datapicker"></el-date-picker>
          </el-form-item>
          <el-form-item label label-width="150px">
            <el-checkbox v-model="form.checked1">周末与节假日不排班</el-checkbox>
            <a
              href="#"
              style="margin-left:70px;text-decoration: underline;color:blue;"
              @click="weekDay"
            >节假日</a>
          </el-form-item>
          <el-form-item label="排班方式：" label-width="150px">
            <el-radio v-model="form.radio" label="1">复制排班</el-radio>
            <el-radio v-model="form.radio" label="2">自动排班模板排班</el-radio>
          </el-form-item>
          <el-form-item label="复制时间范围：" label-width="150px" v-show="form.radio==1||form.radio==0">
            <el-date-picker
              v-model="form.value1"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </el-form-item>
        </el-form>

        <div class="tablebox" v-show="form.radio==2||form.radio==0">
          <el-table
            class="tables"
            ref="multipleTable"
            key="xx值班单位"
            :data="tableData1"
            tooltip-effect="dark"
            border
          >
            <el-table-column type="index" label="序" width="40"></el-table-column>
            <!-- <el-table-column type="selection" width="50"></el-table-column> -->
            <el-table-column prop="name" label="模板名称" align="center"></el-table-column>
            <el-table-column align="center" label="操作">
              <template slot-scope="scope">
                <a href="#" @click="readMB(scope.row)">查看</a>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn" @click="flagList.centerDialogVisible = false">确 定</el-button>
        <el-button @click="flagList.centerDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="节假日维护" :visible.sync="flagList.centerDialogVisible1" width="600px">
      <div>
        <div>
          <el-form label-width="80px" :model="form">
            <el-form-item label="年份：">
              <el-date-picker v-model="form.year" type="year" placeholder="选择年"></el-date-picker>
            </el-form-item>
          </el-form>
        </div>
        <div class="buttonlist">
          <div class="buttonbox" style="margin-left:14px">
            <img src="../../assets/img/值班/xinzheng.png" alt />
            <span>新建</span>
          </div>
          <!-- <div :class="['buttonbox', { noopen: buttons}]" @click="changetable">
              <img v-if="!buttons" src="../../assets/img/值班/xiugai.png" alt />
              <img v-else-if="buttons" src="../../assets/img/值班/xiugai2.png" alt />
              <span>编辑</span>
          </div>-->
          <div class="buttonbox">
            <img src="../../assets/img/值班/sanchu.png" alt />
            <span>删除</span>
          </div>
        </div>
        <div class="tablebox">
          <el-table
            class="tables"
            ref="multipleTable"
            key="xx值班单位"
            :data="tableData1"
            tooltip-effect="dark"
            border
          >
            <el-table-column type="index" label="序" width="40"></el-table-column>
            <!-- <el-table-column type="selection" width="50"></el-table-column> -->
            <el-table-column prop="name" label="日期" align="center">
              <template slot-scope="scope">
                <!-- <el-input placeholder="请输入内容" v-model="scope.row.input"></el-input> -->
                <el-date-picker v-model="scope.row.input" type="date" placeholder="选择日期"></el-date-picker>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="节日" align="center">
              <template slot-scope="scope">
                <el-input placeholder="请输入内容" v-model="scope.row.inputD"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="类型" align="center">
              <template slot-scope="scope">
                <el-select v-model="scope.row.select_Val" placeholder="请选择">
                  <el-option
                    v-for="item in options_LX"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn" @click="flagList.centerDialogVisible1 = false">确 定</el-button>
        <el-button @click="flagList.centerDialogVisible1 = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="自动排版模板名称" :visible.sync="flagList.centerDialogVisible2" width="600px">
      <div>
        <div class="tablebox">
          <el-table
            class="tables"
            ref="multipleTable"
            :data="tableData2"
            tooltip-effect="dark"
            border
          >
            <el-table-column type="index" label="序" width="40"></el-table-column>
            <el-table-column label="选择" width="50">
              <template slot-scope="scope">
                <el-radio :label="scope.$index" style="margin-left: 10px;" v-model="radio">&nbsp;</el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="Zbbz" label="班组" align="center"></el-table-column>
            <el-table-column prop="Zbcy" label="值班员" align="center"></el-table-column>
            <el-table-column prop="xhqd" label="循环起点" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer buttons">
        <el-button type="primary" class="btn" @click="flagList.centerDialogVisible2 = false">设为起点</el-button>
        <el-button @click="flagList.centerDialogVisible2 = false">取 消</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="排班计划"
      :visible.sync="flagList.centerDialogVisible3"
      width="540px"
      class="Visible3"
    >
      <el-form label-width="80px" :model="form3" :rules="rules">
        <el-form-item label="日期：" label-width="110px" prop="date">
          <el-input placeholder="请输入内容" v-model="form3.date" :disabled="true"></el-input>
          <!-- <el-date-picker v-model="form3.date" type="month" placeholder="选择月"></el-date-picker> -->
        </el-form-item>
        <el-form-item label="班次：" label-width="110px" prop="value">
          <el-input placeholder="请输入内容" v-model="form3.value" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="值班班组：" label-width="110px">
          <el-select v-model="form3.value1" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="值班员：" label-width="110px"></el-form-item>
        <div class="mainboxs">
          <div class="leftboxs">
            <!-- <div class="cheaxbox" v-for="item in datalsit" :key="item">{{item}}</div> -->
            <el-checkbox
              class="cheaxbox"
              v-model="item.checkbox"
              v-for="item in datalsit"
              :key="item.id"
              @change="handlecheckbox(item.id)"
            >{{item.label}}</el-checkbox>
          </div>
          <div class="centerboxs">
            <el-button
              class="centerbuttons"
              type="primary"
              @click="addlist"
              :disabled="leftboutton"
            >添加</el-button>
            <el-button
              class="centerbuttons"
              type="primary"
              @click="dellist"
              :disabled="rightboutton"
            >移出</el-button>
            <el-button
              class="centerbuttons"
              type="primary"
              @click="deletelsit"
              :disabled="wholebutton"
            >全部移出</el-button>
          </div>
          <div class="rightboxs">
            <el-checkbox
              class="cheaxbox"
              v-model="item.checkbox"
              v-for="item in valuelist"
              :key="item.id"
              @change="rightcheckbox(item.id)"
            >{{item.label}}</el-checkbox>
          </div>
        </div>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="submitForm('ruleForm')" class="btn">确 定</el-button>
        <el-button @click="flagList.centerDialogVisible3 = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="排班计划查看"
      :visible.sync="flagList.centerDialogVisible4"
      width="540px"
      class="Visible3"
    >
      <el-form label-width="80px" :model="form3" :rules="rules">
        <el-form-item label="日期：" label-width="110px" prop="date">
          <el-input placeholder="请输入内容" v-model="form4.date" :disabled="true"></el-input>
          <!-- <el-date-picker v-model="form3.date" type="month" placeholder="选择月"></el-date-picker> -->
        </el-form-item>
        <el-form-item label="班次：" label-width="110px" prop="value">
          <el-input placeholder="请输入内容" v-model="form4.value" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="值班班组：" label-width="110px">
          <el-input placeholder="请输入内容" v-model="form4.value1" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="值班员：" label-width="110px">
          <div class="mainboxs" style="min-height:200px">
            <div class="leftboxs" style="min-height:200px">
              <!-- <div class="cheaxbox" v-for="item in datalsit" :key="item">{{item}}</div> -->
              <el-checkbox
                disabled
                class="cheaxbox"
                v-model="item.checkbox"
                v-for="item in datalsit"
                :key="item.id"
                @change="handlecheckbox(item.id)"
              >{{item.label}}</el-checkbox>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="flagList.centerDialogVisible4= false">关闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="班次信息"
      :visible.sync="flagList.centerDialogVisible5"
      min-width="760"
      class="Visible3"
    >
      <div class="middleNav_tab">
        <span
          v-for="(item,index) in tab2"
          @click="tabTag1(index)"
          :key="index"
          :class="{tab:num1==index}"
        >{{item}}</span>
      </div>
      <div class="tab_B_cdetail" v-show="num1==0">
        <div class="onesbox">
          <slot name="firstnavtop">
            <div class="navonecur">
              <div class="tab_title">
                <span>班次信息</span>
                <span @click="tbsq">调班申请</span>
              </div>
            </div>
          </slot>

          <div class="formbox">
            <el-form label-width="80px" :model="form5" :rules="rules">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="日期：" label-width="100px" prop="date">
                    <el-input placeholder="请输入内容" v-model="form5.date" :disabled="true"></el-input>
                    <!-- <el-date-picker v-model="form3.date" type="month" placeholder="选择月"></el-date-picker> -->
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="班次：" label-width="100px" prop="value">
                    <el-input placeholder="请输入内容" v-model="form5.value" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="值班班组：" label-width="100px">
                    <el-input placeholder="请输入内容" v-model="form5.value1" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="值班员：" label-width="100px">
                    <el-input placeholder="请输入内容" v-model="form5.value2" :disabled="true"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
        <div class="onesbox">
          <slot name="firstnavtop">
            <div class="navonecur">
              <div class="tab_title">
                <span>班次信息</span>
              </div>
            </div>
          </slot>

          <div class="formbox">
            <el-form label-width="80px" :model="form5" :rules="rules">
              <el-row>
                <el-col :span="24">
                  <el-form-item label="接班人：" label-width="100px" prop="date">
                    <el-input placeholder="请输入内容" v-model="form5.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="接班时间：" label-width="100px" prop="value">
                    <el-date-picker v-model="form5.dataTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="天气：" label-width="100px">
                    <el-input placeholder="请输入天气" v-model="form5.weather"></el-input>
                   
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="温度：" label-width="100px">
                    <el-input placeholder="请输入温度" v-model="form5.temperature"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="交班人：" label-width="100px">
                    <el-input placeholder="请输入内容" v-model="form5.jbName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="交班时间：" label-width="100px">
                    <el-date-picker v-model="form5.jbTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="交班事宜：" label-width="100px">
                    <el-input type="textarea" v-model="form5.InputArea"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div class="tab_B_cdetail_sq" v-show="num1==1">
        <div class="tablebox">
          <el-table
            class="tables"
            ref="multipleTable"
            :data="tableDataTbsq"
            tooltip-effect="dark"
            border
          >
            <el-table-column type="index" label="序" width="40"></el-table-column>
            <el-table-column prop="data" label="日期" align="center"></el-table-column>
            <el-table-column prop="data" label="班次" align="center"></el-table-column>
            <el-table-column prop="data" label="调班前班组" align="center"></el-table-column>
            <el-table-column prop="data" label="调班前值班员" align="center"></el-table-column>
            <el-table-column prop="data" label="调班后班组" align="center"></el-table-column>
            <el-table-column prop="data" label="调班后值班员" align="center"></el-table-column>
            <el-table-column prop="data" label="申请人" align="center"></el-table-column>
            <el-table-column prop="data" label="申请时间" align="center"></el-table-column>
          </el-table>
        </div>
      </div>
      <div class="tab_B_cdetail_zb" v-show="num1==2">
        <!-- 值报组件 -->
        <zb></zb>
      </div>
    </el-dialog>
    <el-dialog
      title="调班申请单"
      :visible.sync="flagList.centerDialogVisible6"
      min-width="760"
      class="Visible3"
    >
      <div class="clumTable">
        <!-- <p class="Bhtitle">申请单编号:</p> -->
        <!-- <table class="mailTable" cellspacing="0" cellpadding="0">
          <tr>
            <td class="column">调班申请人</td>
            <td>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </td>
            <td class="column">申请时间</td>
            <td>
              <el-input v-model="input1" placeholder="请输入内容"></el-input>
            </td>
          </tr>
          <tr style="height:50px">
            <td class="column">调班原因</td>
            <td colspan="3">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </td>
          </tr>

          <tr>
            <td class="column">日期</td>
            <td>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </td>
            <td class="column">班次</td>
            <td>
              <el-input v-model="input2" placeholder="请输入内容"></el-input>
            </td>
          </tr>
          <tr>
            <td class="column">值班班组</td>
            <td>
              <el-input v-model="input2" placeholder="请输入内容"></el-input>
            </td>
            <td class="column">值班员</td>
            <td>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </td>
          </tr>
          <tr>
            <td class="column">调整后班组</td>
            <td>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </td>
            <td class="column">调整后值班员</td>
            <td>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </td>
          </tr>
          <tr style="height:50px">
            <td class="column">审核意见</td>
            <td colspan="3">
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </td>
          </tr>
          <tr>
            <td class="column">审批人</td>
            <td>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </td>
            <td class="column">审批时间</td>
            <td>
              <el-input v-model="input" placeholder="请输入内容"></el-input>
            </td>
          </tr>
        </table>-->
        <el-form label-width="80px" :model="form5">
          <el-row>
            <el-col :span="12">
              <el-form-item label="申请单编号 :" label-width="115px">
                <!-- <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input> -->
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-form-item label="调班申请人 :" label-width="115px">
                <el-input placeholder="请输入调班申请人" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="申请时间 :" label-width="115px">
                <el-input placeholder="请输入申请时间" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="调班原因;" label-width="115px">
            <el-input type="textarea" v-model="form5.InputArea"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="日期 :" label-width="115px">
                <el-input placeholder="请输入日期" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="班次 :" label-width="115px">
                <el-input placeholder="请输入班次" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="值班班组:" label-width="115px">
                <el-input placeholder="请输入值班班组" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="值班员:" label-width="115px">
                <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="调班后班组 :" label-width="115px">
                <el-input placeholder="请输入调班后班组" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="调班后值班员 :" label-width="115px">
                <el-input placeholder="请输入调班后值班员" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="审批意见;" label-width="115px">
            <el-input type="textarea" v-model="form5.InputArea"></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item label="审批人:" label-width="115px">
                <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="审批时间:" label-width="115px">
                <el-input placeholder="请输入工单编号" v-model="form5.weather"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn" @click="flagList.centerDialogVisible6 = false">确认</el-button>
        <el-button @click="flagList.centerDialogVisible6 = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>

  <!-- </div> -->

  <!-- <div class="backgroundbox" id="pdf-container"
      v-watermark="{text:'水印文字',font:'46px Microsoft JhengHei',width:'100%',textColor:'rgba(180, 180, 180, 0.3)'}">
  </div>-->
</template>

<script>
import moment from "moment";
import zb from "./zb";
import calendar from "./calendar";
export default {
  data() {
    return {
      // date: new Date(),

      tableData: [
        {
          data: "2020-08-08",
          flag: true,
          flg: 1,
          Pbnum: "白班",
          Pbnumber: "一班",
          Pbname: "张三，李四，许飞",
        },
        {
          data: "2020-08-08",
          flag: false,
          flg: 2,
          Pbnum: "白班",
          Pbnumber: "一班",
          Pbname: "张三，李四，许飞",
        },
        {
          data: "2020-08-08",
          flag: "null",
          flg: 1,
          Pbnum: "白班",
          Pbnumber: "一班",
          Pbname: "张三，李四，许飞",
        },
        {
          data: "2020-08-08",
          flag: true,
          flg: 2,
          Pbnum: "白班",
          Pbnumber: "一班",
          Pbname: "张三，李四，许飞",
        },
      ],
      tableDataTbsq: [{}, {}],
      tableData1: [
        { name: "xx模板", inputT: "", inputD: "", select_Val: "" },
        { name: "xx模板", inputT: "", inputD: "", select_Val: "" },
        { name: "xx模板", inputT: "", inputD: "", select_Val: "" },
      ],
      options_LX: [
        {
          value: "选项1",
          label: "节假日",
        },
        {
          value: "选项2",
          label: "工作日",
        },
      ],
      tableData2: [
        { Zbbz: "一班", Zbcy: "张三", xhqd: "否" },
        { Zbbz: "一班", Zbcy: "张三", xhqd: "否" },
        { Zbbz: "一班", Zbcy: "张三", xhqd: "否" },
        { Zbbz: "一班", Zbcy: "张三", xhqd: "否" },
      ],
      datalsit: [
        { label: `赵信`, checkbox: false, id: 1 },
        { label: `徐鸿飞`, checkbox: false, id: 2 },
        { label: `李娜`, checkbox: false, id: 3 },
        { label: `徐飞`, checkbox: false, id: 4 },
        { label: `王一平`, checkbox: false, id: 5 },
      ],
      options: [
        {
          value: "选项1",
          label: "白班",
        },
        {
          value: "选项2",
          label: "夜班",
        },
      ],
      options1: [
        {
          value: "选项1",
          label: "一组",
        },
        {
          value: "选项2",
          label: "二组",
        },
      ],

      rules: {
        date: [
          {
            type: "date",
            required: false,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        value: [{ required: false, message: "请选班次", trigger: "change" }],
      },
      num: 0,
      num1: 0,
      value: "",
      value1: "",
      radio: 0,
      value_date: new Date(),
      flagList: {
        centerDialogVisible: false,
        centerDialogVisible1: false,
        centerDialogVisible2: false,
        centerDialogVisible3: false,
        centerDialogVisible4: false,
        centerDialogVisible5: false,
        centerDialogVisible6: false,
      },
      valuelist: [],
      valuelistradio: [],
      checkboxlist: [],
      checkboxlistright: [],
      form: {
        month: "",
        radio: "1",
        checked1: false,
        value1: "",
      },
      form3: {
        date: "2020-08-12",
        value1: "",
        value: "白班",
      },
      form4: {
        date: "2020-08-12",
        value1: "一班",
        value: "白班",
      },
      form5: {
        date: "2020-08-12",
        value1: "一班",
        value: "白班",
        value2: "白班",
        name: "",
        dataTime: "",
        weather: "",
        temperature: "",
        jbName: "",
        jbTime: "",
        InputArea: "",
      },
      form1: {
        year: "",
      },
      tab: ["日历视图", "列表视图"],
      tab2: ["基本信息", "调班申请", "值报"],
      // value: new Date()
    };
  },
  components: {
    zb,
    calendar,
  },
  computed: {
    leftboutton() {
      let length = this.checkboxlist.length;
      if (length > 0) {
        return false;
      } else {
        return true;
      }
    },
    rightboutton() {
      let length = this.checkboxlistright.length;
      if (length > 0) {
        return false;
      } else {
        return true;
      }
    },
    wholebutton() {
      let length = this.valuelist.length;
      if (length > 0) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    tabTag(index) {
      this.num = index;
    },
    tabTag1(index) {
      this.num1 = index;
    },
    // 穿梭框事件
    handlecheckbox(val) {
      if (this.checkboxlist.indexOf(val) == -1) {
        this.checkboxlist.push(val);
      } else {
        this.checkboxlist.splice(this.checkboxlist.indexOf(val), 1);
      }
      console.log(this.checkboxlist, "------");
    },
    rightcheckbox(val) {
      if (this.checkboxlistright.indexOf(val) == -1) {
        this.checkboxlistright.push(val);
      } else {
        this.checkboxlistright.splice(this.checkboxlistright.indexOf(val), 1);
      }
      console.log(this.checkboxlistright, "right------");
    },
    // 穿梭框增加事件
    addlist() {
      this.datalsit.map((val) => {
        val.checkbox = false;
      });
      if (this.checkboxlist.length != 0) {
        this.checkboxlist.map((val) => {
          let s = this.datalsit.find((item) => {
            return item.id == val;
          });
          console.log(s, "sss");
          this.valuelist.push(s);
          this.datalsit.filter((item, index) => {
            if (item.id == val) {
              this.datalsit.splice(index, 1);
            }
          });
        });
        console.log(this.checkboxlist.length, "========");
      }
      this.checkboxlist = [];
      console.log(11111);
    },
    // 单个移除
    dellist() {
      this.valuelist.map((val) => {
        val.checkbox = false;
      });
      if (this.checkboxlistright.length != 0) {
        this.checkboxlistright.map((val) => {
          let s = this.valuelist.find((item) => {
            return item.id == val;
          });
          console.log(s, "sss");
          this.datalsit.push(s);
          this.valuelist.filter((item, index) => {
            if (item.id == val) {
              this.valuelist.splice(index, 1);
            }
          });
        });
        console.log(this.checkboxlistright.length, "========");
      }
      this.checkboxlistright = [];
      console.log(11111);
    },
    // 多个移除
    deletelsit() {
      this.valuelist.map((val) => {
        val.checkbox = false;
      });
      if (this.valuelist.length != 0) {
        this.datalsit = this.datalsit.concat(this.valuelist);
      }
      this.valuelist = [];
      this.checkboxlistright = [];
      console.log(11111);
    },
    // 调班申请
    tbsq() {
      this.flagList.centerDialogVisible6 = true;
      this.flagList.centerDialogVisible5 = false;
    },
    // 查看节假日
    weekDay() {
      // this.flagList.centerDialogVisible = false;
      this.$nextTick(() => {
        this.flagList.centerDialogVisible1 = true;
      });
    },
    // 查看 模板
    readMB(row) {
      // alert(99)
      this.flagList.centerDialogVisible2 = true;
      // this.flagList.centerDialogVisible = false;
    },
    // 提交事件
    submitForm(formName) {
      this.flagList.centerDialogVisible3 = false;
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });
    },
    newSet() {
      this.flagList.centerDialogVisible = true;
    },
    subSet() {
      this.$confirm("此操作将提交排班计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消提交",
          });
        });
    },
    subExport() {
      this.$confirm("此操作将导出排班计划, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "导出成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消导出",
          });
        });
    },
    //日期左右按钮事件
    pickerLeft() {
      var d = new Date(this.value_date);
      var arr = [1, 3, 5, 7, 8, 10, 12];
      var day;
      var getMon = d.getMonth();
      if (arr.includes(getMon)) {
        day = 31;
      } else {
        day = 30;
      }
      d.setDate(d.getDate() + day);
      var m = d.getMonth() - 1;
      return (this.value_date = d.getFullYear() + "-" + m + "-" + d.getDate());
    },
    pickerRight() {
      var d = new Date(this.value_date);
      var arr = [1, 3, 5, 7, 8, 10, 12];
      var day;
      var getMon = d.getMonth();
      if (arr.includes(getMon)) {
        day = 31;
      } else {
        day = 30;
      }
      d.setDate(d.getDate() + day);
      var m = d.getMonth() + 1;
      return (this.value_date = d.getFullYear() + "-" + m + "-" + d.getDate());
      // console.log(this.value_date);
      // moment(this.value_date).format("YYYY-MM-DD")
      // console.log(moment(this.value_date).format("YYYY-MM-DD"))
    },
    //
    dayClick() {
      // alert(77);
    },
    eventClick(e) {
      console.log();
      if (e.title.length == 4) {
        this.flagList.centerDialogVisible3 = true;
      } else if (e.title.length == 3) {
        this.flagList.centerDialogVisible5 = true;
      } else {
        this.flagList.centerDialogVisible4 = true;
      }
    },
    handleCurrentChange() {},
    handleSizeChange() {},
  },
};
</script>

<style lang="scss" scoped>
.padd {
  padding: 20px !important;
}
body {
  background-color: white !important;
}
.btn {
  color: white;
  background: #3ab5a0;
}

.Visible3 {
  /deep/.el-input {
    width: 100%;
  }
  /deep/ .el-textarea {
    width: 100%;
  }
  /deep/.el-form-item {
    margin-bottom: 10px;
  }
}
/deep/.el-table {
  position: static;
}
/deep/.el-table__body,
.el-table__footer,
.el-table__header {
  table-layout: auto;
}
/deep/.el-table--border th {
  border: none;
}
.tab {
  background-color: #3bb5a0;
  color: white;
}
.bgc_ff0000 {
  background: #ff0000;
  color: white;
}
.bgc_01ccff {
  background: #01ccff;
  color: white;
}

.bgc_ffc600 {
  background: #ffc600;
  color: white;
}
.bgc_ea8100 {
  background: #ea8100;
  color: white;
}
.bgc_08ceac {
  color: white;
  background-color: #08ceac;
}
// 表格公共样式

//
.listbox1 {
  display: flex;
  margin-left: -10px;
  .linebox {
    width: 4px;
    height: 40px;
    // margin-top: 4px;
    margin-right: 12px;

    display: inline-block;
    vertical-align: middle;
  }
  img {
    line-height: 40px;
    margin-top: 12px;
  }
}
.backgroundbox {
  padding: 0 25px;
  .navbox {
    height: 20px;
    // background: chartreuse;
    margin: 14px 0 0 8px;
    display: flex;
    color: #747474;
    .titlebox {
      margin-right: 12px;
    }
    .listbox {
      display: flex;
      .linebox {
        width: 8px;
        height: 16px;
        margin-top: 4px;
        margin-right: 8px;
        display: inline-block;
        vertical-align: middle;
      }
      .textbox {
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }
  .middleNav {
    display: flex;
    margin: 20px 0 10px;
    > div {
      width: 33.3%;
    }
    .middleNav_left {
      span {
        margin-top: 14px;
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        display: inline-block;
        cursor: pointer;
        border: 1px solid #3bb5a0;
      }
      :nth-of-type(1) {
        border-radius: 5px 0 0 5px;
      }
      :nth-child(2) {
        border-radius: 0 5px 5px 0;
      }
    }
    .middleNav_middle {
      .pickerBox {
        width: 200px;
        display: flex;
        margin-left: 50%;
        transform: translateX(-50%);
        > span {
          line-height: 2.3;
          cursor: pointer;
          font-size: 25px;
          color: #3ab5a0;
        }
        /deep/.el-date-editor.el-input {
          border: none;
          // height: ;
          font-size: 22px;
          border-bottom: none;
        }
        /deep/.el-input__inner {
          border: none;
          height: 100%;
        }
        /deep/.el-input__icon {
          font-size: 0;
        }
      }
    }
    .middleNav_right {
      > div {
        margin-top:10px;
        float: right;
        // button {
        //   padding: 12px 20px;
        //   font-size: 14px;
        //   border-radius: 4px;
        //   border: 1px solid #3ab5a0;
        //   text-align: center;
        //   box-sizing: border-box;
        //   background: #fff;
        //   margin-right: 10px;
        //   color: #3ab5a0;
        // }
        // :hover {
        //   color: #3ab5a0;
        // }
      }
    }
  }
  .calendar {
    /deep/.fc-unthemed th {
      padding: 10px 0;
      background-color: #3ab5a0;
    }
    /deep/.fc-toolbar.fc-header-toolbar {
      // display: none;
    }
    /deep/.fc-content {
      height: 40px;
      margin-top: 15px;
    }
    /deep/.fc-ltr .fc-basic-view .fc-day-top .fc-day-number {
      float: left;
    }
  }
  .tableboxs_zb {
    flex: 1;
    height: calc(100% - 130px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .pages {
      /deep/.el-pager li.active {
        color: #3bb5a0;
      }
    }
  }
  // 弹框样式
  /deep/.el-dialog__header {
    padding: 5px;
    background: #3bb5a0;
    .el-dialog__title {
      color: white;
    }
    .el-dialog__headerbtn .el-dialog__close {
      color: white;
    }
  }
  // 表格内radio样式
  /deep/.el-table__row {
    .el-radio__label {
      font-size: 0;
    }
    .el-input__inner {
      border: none;
    }
  }
  // 弹框部分内容样式
  .buttonlist {
    height: 34px;
    background-image: linear-gradient(#fff, #e0eded);
    display: flex;
    align-items: center;
    border-bottom: 1px solid #91cecf;
    margin-bottom: 10px;
    .buttonbox {
      height: 16px;
      // background: rosybrown;
      display: flex;
      margin-right: 22px;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
        margin-right: 7px;
      }
      span {
        font-size: 12px;
        line-height: 16px;
        color: #999;
      }
    }
    .noopen {
      pointer-events: none;
    }
  }
  // 穿梭框样式
  .mainboxs {
    padding: 10px 0;
    min-height: 300px;
    width: 500px;
    // margin-left: 33px;
    // background: royalblue;
    display: flex;
    .leftboxs {
      width: 40%;
      min-height: 300px;
      //   background: sandybrown;
      border: 1px solid #666;
      display: flex;
      flex-direction: column;
      .cheaxbox {
        width: 80%;
        line-height: 32px;
        margin-left: 20px;
        /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background: #3ab5a0;
          color: #fff;
          border-color: #3ab5a0;
        }
        /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
          color: #3ab5a0;
        }

        /deep/.el-radio__input.is-checked .el-radio__inner {
          background: #3ab5a0;
          color: #fff;
          border-color: #3ab5a0;
        }
        /deep/.el-radio__input.is-checked + .el-radio__label {
          color: #3ab5a0;
        }
      }
    }
    .centerboxs {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .centerbuttons {
        width: 80px;
        height: 30px;
        line-height: 30px;
        margin: 10px 0;
      }
      /deep/.el-button--primary {
        background: #3ab5a0;
        border: 0;
      }
      /deep/.el-button--primary.is-disabled,
      .el-button--primary.is-disabled:active,
      .el-button--primary.is-disabled:focus,
      .el-button--primary.is-disabled:hover {
        background: #b1ece2;
      }
      .el-button {
        padding: 0;
      }
    }
    .rightboxs {
      width: 40%;
      min-height: 300px;
      border: 1px solid #666;

      //   background: sandybrown;
      display: flex;
      flex-direction: column;
      .cheaxbox {
        width: 80%;
        line-height: 32px;
        margin-left: 20px;
        /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background: #3ab5a0;
          color: #fff;
          border-color: #3ab5a0;
        }
        /deep/.el-checkbox__input.is-checked + .el-checkbox__label {
          color: #3ab5a0;
        }

        /deep/.el-radio__input.is-checked .el-radio__inner {
          background: #3ab5a0;
          color: #fff;
          border-color: #3ab5a0;
        }
        /deep/.el-radio__input.is-checked + .el-radio__label {
          color: #3ab5a0;
        }
      }
    }
  }
  // 弹框内的tab切换
  .middleNav_tab {
    margin-bottom: 20px;
    span {
      width: 90px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      cursor: pointer;
      border: 1px solid #3bb5a0;
    }
    :nth-of-type(1) {
      border-radius: 5px 0 0 5px;
    }
    :nth-child(3) {
      border-radius: 0 5px 5px 0;
    }
  }
  // 班次信息内样式
  .tab_B_cdetail {
    padding: 0 2px;
    margin: 0 50px;
    .tab_title {
      // border-bottom: 1px solid #3bb5a0;
      display: flex;
      margin-bottom: 20px;
      justify-content: space-between;
      :nth-child(1) {
        width: 90px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        display: inline-block;
        // cursor: pointer;
        color: #3bb5a0;
        // border: 1px solid #3bb5a0;
        // border-bottom:none;
        margin-left: -5px;
        margin-bottom: -1px;
        border-radius: 5px;
      }
      :nth-child(2) {
        color: #1670d4;
        line-height: 30px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  // 班次信息样式
  /deep/.tab_B_cdetail,
  .tab_B_cdetail_sq,
  .tab_B_cdetail_zb {
    // height: 590px;
    // overflow: auto;
  }
  // 值报样式
  .clumTable {
    .Bhtitle {
      font-size: 14px;
      padding: 10px;
      padding-top: 0;
      padding-left: 70px;
    }
    .mailTable {
      width: 100%;
      border-top: 1px solid #e6eaee;
      border-left: 1px solid #e6eaee;
    }
    .mailTable tr td {
      // width: 200px;
      height: 40px;
      // line-height: 35px;
      box-sizing: border-box;
      // padding: 0 10px;
      border-bottom: 1px solid #e6eaee;
      border-right: 1px solid #e6eaee;
      /deep/.el-input__inner {
        border: none;
      }
    }
    .mailTable tr td.column {
      // background-color: #eff3f6;
      color: #393c3e;
      text-align: right;
      width: 45%;
    }
  }
  //提示框
  // /deep/.el-message-box{
  //   /deep/.el-message-box__btns{
  //     .el-button--primary {
  //       background-color: #3ab5a0;
  //       border: 0;
  //   }

  //   .el-button--primary.is-plain {
  //       color: #fff;
  //   }

  //   .el-button,.el-button:hover {
  //       border: 1px solid #3ab5a0;
  //       // color: #3ab5a0;
  //   }
  // }
  // }

  .datapicker{
    width: 264px;
  }
}
</style>