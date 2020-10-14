<template>
  <div class="viewsbox">
    <div class="treebox">
      <!-- <el-tree
        id="tree"
        class="tree"
        ref="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        highlight-current
        :default-expanded-keys="[1,2]"
        @node-click="handleNodeClick"
        :render-content="renderContent"
      ></el-tree>-->
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :default-expanded-keys="[10]"
        highlight-current
        node-key="id"
      ></el-tree>
    </div>

    <div class="mainboxs" v-show="titles == '待办'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/检修票管理/查看流程图.png" alt />
          <span>查看流程图</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/检修票管理/查看工作日志.png" alt />
          <span>查看工作日志</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/导出.png" alt />
          <span>导出</span>
        </div>
        <div class="querylist" style="margin-left:20px">
          <el-input v-model="inputs" placeholder="请输入查询内容"></el-input>
          <div class="botons">
            <img src="../../assets/img/值班/工作台/sousuo.png" alt />
            <div class="chaxun">查询</div>
          </div>
        </div>
      </div>
      <div class="tableboxs">
        <div class="tablebox">
          <el-table
            class="tables"
            key="todolist"
            :data="todolist"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="标题" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column
              prop="states"
              align="center"
              width="180"
              label="检修票状态"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="month"
              align="center"
              label="月份"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="originator"
              align="center"
              label="发起人"
              width="160"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="times"
              align="center"
              label="发起时间"
              width="250"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="note" align="center" label="备注" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div class="mainboxs" v-show="titles == '经办'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/检修票管理/查看流程图.png" alt />
          <span>查看流程图</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/检修票管理/查看工作日志.png" alt />
          <span>查看工作日志</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/导出.png" alt />
          <span>导出</span>
        </div>
        <div class="querylist" style="margin-left:20px">
          <el-input v-model="inputs" placeholder="请输入查询内容"></el-input>
          <div class="botons">
            <img src="../../assets/img/值班/工作台/sousuo.png" alt />
            <div class="chaxun">查询</div>
          </div>
        </div>
      </div>
      <div class="tableboxs">
        <div class="tablebox">
          <el-table
            class="tables"
            key="handlelist"
            :data="handlelist"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="标题" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column
              prop="states"
              align="center"
              width="180"
              label="检修票状态"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="month"
              align="center"
              label="月份"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="originator"
              align="center"
              label="发起人"
              width="160"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="times"
              align="center"
              label="发起时间"
              width="250"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="note" align="center" label="备注" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div class="mainboxs" v-show="titles == '全部未完成'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/检修票管理/查看流程图.png" alt />
          <span>查看流程图</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/检修票管理/查看工作日志.png" alt />
          <span>查看工作日志</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/导出.png" alt />
          <span>导出</span>
        </div>
        <div class="querylist" style="margin-left:20px">
          <el-input v-model="inputs" placeholder="请输入查询内容"></el-input>
          <div class="botons">
            <img src="../../assets/img/值班/工作台/sousuo.png" alt />
            <div class="chaxun">查询</div>
          </div>
        </div>
      </div>
      <div class="tableboxs">
        <div class="tablebox">
          <el-table
            class="tables"
            key="allunfinished"
            :data="allunfinished"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="标题" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>
            <el-table-column
              prop="states"
              align="center"
              width="180"
              label="检修票状态"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="month"
              align="center"
              label="月份"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="originator"
              align="center"
              label="发起人"
              width="160"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="times"
              align="center"
              label="发起时间"
              width="250"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="note" align="center" label="备注" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>

    <div class="mainboxs" v-show="titles == '归档工单'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/检修票管理/查看流程图.png" alt />
          <span>查看流程图</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/检修票管理/查看工作日志.png" alt />
          <span>查看工作日志</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/导出.png" alt />
          <span>导出</span>
        </div>
        <div class="querylist" style="margin-left:20px">
          <el-input v-model="inputs" placeholder="请输入查询内容"></el-input>
          <div class="botons">
            <img src="../../assets/img/值班/工作台/sousuo.png" alt />
            <div class="chaxun">查询</div>
          </div>
        </div>
      </div>
      <div class="tableboxs">
        <div class="tablebox">
          <el-table
            class="tables"
            key="thearchive"
            :data="thearchive"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="标题" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>

            <el-table-column
              prop="month"
              align="center"
              label="月份"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="originator"
              align="center"
              label="发起人"
              width="160"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="times"
              align="center"
              label="发起时间"
              width="250"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="dates"
              align="center"
              width="180"
              label="归档时间"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="note" align="center" label="备注" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="mainboxs" v-show="titles == '撤销工单'">
      <div class="buttonlist">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/检修票管理/查看流程图.png" alt />
          <span>查看流程图</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/检修票管理/查看工作日志.png" alt />
          <span>查看工作日志</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/导出.png" alt />
          <span>导出</span>
        </div>
        <div class="querylist" style="margin-left:20px">
          <el-input v-model="inputs" placeholder="请输入查询内容"></el-input>
          <div class="botons">
            <img src="../../assets/img/值班/工作台/sousuo.png" alt />
            <div class="chaxun">查询</div>
          </div>
        </div>
      </div>
      <div class="tableboxs">
        <div class="tablebox">
          <el-table
            class="tables"
            key="undolist"
            :data="undolist"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column label="标题" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.title }}</template>
            </el-table-column>

            <el-table-column
              prop="month"
              align="center"
              label="月份"
              width="150"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="originator"
              align="center"
              label="发起人"
              width="160"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="times"
              align="center"
              label="发起时间"
              width="200"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="dates"
              align="center"
              width="180"
              label="撤销时间"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="why"
              align="center"
              width="180"
              label="撤销原因"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column prop="note" align="center" label="备注" show-overflow-tooltip></el-table-column>
          </el-table>
        </div>
        <div class="pages">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="prev, pager, next, jumper"
            :total="1000"
          ></el-pagination>
        </div>
      </div>
    </div>
    <div class="maintenance">
      <el-dialog title="检修票" :visible.sync="maintenance" width="100%" :before-close="handleClose">
        <div class="tabslist">
          <div
            :class="['tabsnav',curs==index?'tabscur':'']"
            v-for="(item,index) in tabslist"
            :key="index"
            @click="handeltabs(index)"
          >{{item}}</div>
          <!-- <div class="tabsnav">工单</div>
          <div class="tabscur">流程足迹</div>-->
        </div>
        <div class="nvas" v-show="curs == 0">
          <div class="buttonbox" style="margin-left:14px" @click="handleClose">
            <img src="../../assets/img/值班/工作台/保存.png" alt />
            <span>保存</span>
          </div>
          <div class="buttonbox">
            <img src="../../assets/img/值班/sanchu.png" alt />
            <span>删除</span>
          </div>
          <div class="buttonbox">
            <img src="../../assets/img/检修票管理/签收工单.png" alt />
            <span>签收工单</span>
          </div>
          <div class="buttonbox">
            <img src="../../assets/img/检修票管理/审批.png" alt />
            <span>审批工单</span>
          </div>
          <div class="buttonbox">
            <img src="../../assets/img/检修票管理/管理计划项.png" alt />
            <span>管理计划项</span>
          </div>
          <div class="buttonbox">
            <img src="../../assets/img/检修票管理/复制检修票.png" alt />
            <span>复制检修票</span>
          </div>
          <div class="buttonbox" @click="handlepupop">
            <img src="../../assets/img/检修票管理/关联运行数据.png" alt />
            <span>关联运行数据</span>
          </div>
        </div>
        <div class="mainsbox" v-show="curs == 0">
          <div class="titlesh1">通信检修票</div>
          <div class="formboxs">
            <div class="hadertext">检修票基本信息</div>
            <div class="forms">
              <el-form ref="form" :model="form" label-width="120px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="检修单编号：">
                      <el-input v-model="form.nums"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="填写时间：">
                      <el-input v-model="form.time"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="标题：">
                      <el-input v-model="form.title"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="发起单位：">
                      <el-input v-model="form.initiate"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="申请单位：">
                      <el-input v-model="form.applyfor"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="申请人：">
                      <el-input v-model="form.people"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话：">
                      <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="检修类型：">
                      <el-input v-model="form.types"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="检修类别：">
                      <el-input v-model="form.category"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="检修票来源：">
                      <el-input v-model="form.source"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="方式单处理：">
                      <el-input v-model="form.dispose"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="申请开工时间：">
                      <el-input v-model="form.startstime"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="申请完工时间：">
                      <el-input v-model="form.completetime"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="批准开工时间：">
                      <el-input v-model="form.approvalsatrts"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="批准完工时间：">
                      <el-input v-model="form.approvalcomplete"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="维修工作原因：">
                      <el-input v-model="form.why"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="工作地点：">
                      <el-input v-model="form.place"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="检修工作内容：">
                      <el-input type="textarea" v-model="form.mains"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>

          <div class="formboxs">
            <div class="hadertext">检修设备</div>
            <div class="forms">
              <div class="tablebox">
                <el-table
                  class="tables"
                  key="equipment"
                  :data="equipment"
                  tooltip-effect="dark"
                  border
                  max-height="240"
                >
                  <el-table-column label="检修设备" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.maintenance }}</template>
                  </el-table-column>

                  <el-table-column
                    prop="types"
                    align="center"
                    label="设备类型"
                    width="240"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="category"
                    align="center"
                    label="设备类别"
                    width="240"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="site"
                    align="center"
                    label="所属站点/一次线路"
                    width="300"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="through"
                    align="center"
                    width="180"
                    label="审批通过"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column prop="unit" align="center" label="维护单位" show-overflow-tooltip></el-table-column>
                </el-table>
              </div>
            </div>
          </div>

          <div class="formboxs">
            <div class="hadertext">影响业务情况</div>
            <div class="forms">
              <el-form ref="forms" :model="form" label-width="150px">
                <el-row>
                  <el-form-item label="业务影响最高等级：">
                    <el-input v-model="form.level"></el-input>
                  </el-form-item>
                </el-row>
              </el-form>
              <div class="nvas">
                <div class="buttonbox" style="margin-left:14px">
                  <img src="../../assets/img/值班/xinzheng.png" alt />
                  <span>新建</span>
                </div>
                <div class="buttonbox" @click="resetForm('ruleForm')">
                  <img src="../../assets/img/值班/sanchu.png" alt />
                  <span>删除</span>
                </div>
                <div class="selectsbox">
                  <div class="selectitle">来源:</div>
                  <el-select v-model="selectsvalue" placeholder="请选择" size="mini">
                    <el-option
                      v-for="item in optionslsit"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <div class="tablebox">
                <el-table
                  class="tables"
                  key="business"
                  :data="business"
                  tooltip-effect="dark"
                  border
                  max-height="240"
                >
                  <el-table-column label="调度等级" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.level }}</template>
                  </el-table-column>

                  <el-table-column
                    prop="names"
                    align="center"
                    label="业务名称"
                    width="240"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="types"
                    align="center"
                    label="业务类型"
                    width="240"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="ground"
                    align="center"
                    label="落地业务"
                    width="300"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="degree"
                    align="center"
                    width="180"
                    label="影响程度"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="measures"
                    align="center"
                    label="采取措施"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </div>
              <el-form ref="forms2" :model="form" label-width="150px" style="margin-top:20px">
                <el-row>
                  <el-form-item label="影响范围(计划导入)：">
                    <el-input v-model="form.level"></el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="采取措施：">
                    <el-input v-model="form.level"></el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="对一次系统要求：">
                    <el-input v-model="form.level"></el-input>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-form-item label="配合单位工作内容：">
                    <el-input v-model="form.level"></el-input>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>

          <div class="formboxs">
            <div class="hadertext">现场工作单位</div>
            <div class="forms">
              <div class="tablebox">
                <el-table
                  class="tables"
                  key="scenelist"
                  :data="scenelist"
                  tooltip-effect="dark"
                  border
                  max-height="240"
                >
                  <el-table-column label="现场工作单位" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.unit }}</template>
                  </el-table-column>

                  <el-table-column
                    prop="contact"
                    align="center"
                    label="现场联系人"
                    width="270"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="phone"
                    align="center"
                    label="联系电话"
                    width="300"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </div>
            </div>
          </div>

          <div class="formboxs">
            <div class="hadertext">配合工作单位</div>
            <div class="forms">
              <div class="tablebox">
                <el-table
                  class="tables"
                  key="coordinate"
                  :data="coordinate"
                  tooltip-effect="dark"
                  border
                  max-height="240"
                >
                  <el-table-column label="配合工作单位" align="center" show-overflow-tooltip>
                    <template slot-scope="scope">{{ scope.row.unit }}</template>
                  </el-table-column>

                  <el-table-column
                    prop="contact"
                    align="center"
                    label="配合联系人"
                    width="270"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="phone"
                    align="center"
                    label="联系电话"
                    width="300"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </div>
              <el-form ref="forms" :model="form" label-width="150px" style="margin-top:20px">
                <el-row>
                  <el-form-item label="附件：">
                    <el-input v-model="form.accessory"></el-input>
                  </el-form-item>
                </el-row>
              </el-form>
            </div>
          </div>

          <div class="formboxs">
            <div class="hadertext">检修执行情况</div>
            <div class="forms">
              <el-form ref="form" :model="form" label-width="120px">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="实际开工时间：">
                      <el-input v-model="form.nums"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="实际完工时间：">
                      <el-input v-model="form.time"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-form-item label="检修完成情况：">
                    <el-input v-model="form.title"></el-input>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-form-item label="附件：">
                    <el-input v-model="form.initiate"></el-input>
                  </el-form-item>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-form-item label="改期开工时间：">
                      <el-input v-model="form.people"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="改期完工时间：">
                      <el-input v-model="form.phone"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item label="改期原因：">
                      <el-input v-model="form.source"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
        <div class="formss" style="border-color:#3AB5A0;height:630px" v-show="curs == 1">
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
      </el-dialog>
    </div>
    <div class="relation">
      <el-dialog
        title="检修票关联数据"
        :visible.sync="relation"
        width="70%"
        :before-close="handleCloserelation"
      >
        <div class="navtext">选择检修计划关联的运行数据</div>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tabsbox" type="border-card">
          <el-tab-pane label="月检修计划" name="1">
            <div class="tableboxs">
              <div class="tablebox">
                <el-table
                  class="tables"
                  key="monthlist"
                  :data="monthlist"
                  tooltip-effect="dark"
                  border
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="index" width="30"></el-table-column>
                  <el-table-column type="selection" width="50"></el-table-column>
                  <el-table-column
                    prop="nums"
                    align="center"
                    width="200"
                    label="计划编号"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="states"
                    align="center"
                    label="执行状态"
                    width="100"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="units"
                    align="center"
                    label="编制单位"
                    width="160"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="ascription"
                    align="center"
                    label="归属单位"
                    width="160"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="implementation"
                    align="center"
                    label="实施单位"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="names"
                    align="center"
                    label="计划名称"
                    width="200"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="tiems"
                    align="center"
                    label="开始时间"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="dates"
                    align="center"
                    label="结束时间"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="mains"
                    align="center"
                    label="工作内容"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="grades"
                    align="center"
                    label="影响等级"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </div>
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="年检修计划" name="2">
            <div class="tableboxs">
              <div class="tablebox">
                <el-table
                  class="tables"
                  key="yearslist"
                  :data="yearslist"
                  tooltip-effect="dark"
                  border
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="index" width="30"></el-table-column>
                  <el-table-column type="selection" width="50"></el-table-column>
                  <el-table-column
                    prop="nums"
                    align="center"
                    width="200"
                    label="项目编号"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="states"
                    align="center"
                    label="执行状态"
                    width="100"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="units"
                    align="center"
                    label="编制单位"
                    width="160"
                    show-overflow-tooltip
                  ></el-table-column>

                  <el-table-column
                    prop="implementation"
                    align="center"
                    label="实施单位"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="titeles"
                    align="center"
                    label="标题"
                    width="160"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="places"
                    align="center"
                    label="工作地点"
                    width="200"
                    show-overflow-tooltip
                  ></el-table-column>

                  <el-table-column
                    prop="mains"
                    align="center"
                    label="工作内容"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </div>
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="缺陷单" name="3">
            <div class="tableboxs">
              <div class="tablebox">
                <el-table
                  class="tables"
                  key="defectlist"
                  :data="defectlist"
                  tooltip-effect="dark"
                  border
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="index" width="30"></el-table-column>
                  <el-table-column type="selection" width="50"></el-table-column>
                  <el-table-column
                    prop="nums"
                    align="center"
                    width="200"
                    label="工单编号"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="texts"
                    align="center"
                    label="标题"
                    width="100"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="grades"
                    align="center"
                    label="缺陷等级"
                    width="160"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="times"
                    align="center"
                    label="缺陷开始时间"
                    width="160"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="date"
                    width="160"
                    align="center"
                    label="缺陷终止时间"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="htmltxt"
                    align="center"
                    label="缺陷现象描述"
                    width="200"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="ands"
                    align="center"
                    label="缺陷来源"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </div>
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="工作联系单" name="4">
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
                  <el-table-column type="selection" width="50"></el-table-column>
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
                </el-table>
              </div>
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
            </div>
          </el-tab-pane>
          <el-tab-pane label="方式单" name="5">
            <div class="tableboxs">
              <div class="tablebox">
                <el-table
                  class="tables"
                  key="modelist"
                  :data="modelist"
                  tooltip-effect="dark"
                  border
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="index" width="30"></el-table-column>
                  <el-table-column type="selection" width="50"></el-table-column>
                  <el-table-column label="工单编号" align="center" width="240" show-overflow-tooltip>
                    <template slot-scope="scope">
                      <!-- <span class="toptops" v-if="scope.row.top==true">顶</span> -->
                      <span>{{ scope.row.nums }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="title" align="center" label="标题" show-overflow-tooltip></el-table-column>
                  <el-table-column
                    prop="contact"
                    align="center"
                    label="联系单联系"
                    width="340"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="units"
                    align="center"
                    label="申请单位"
                    width="440"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="penren"
                    align="center"
                    label="申请人"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="phone"
                    align="center"
                    label="联系电话"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="mains"
                    align="center"
                    label="申请内容"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                  <el-table-column
                    prop="times"
                    align="center"
                    label="要求完成时间"
                    width="180"
                    show-overflow-tooltip
                  ></el-table-column>
                </el-table>
              </div>
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
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="buttons" style="margin-top:15px">
          <el-button type="primary" @click="handleCloserelation">确认</el-button>
          <el-button plain @click="handleCloserelation">取消</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </div>
      </el-dialog>
    </div>

    <div class="relation">
      <el-dialog title="选择检修设备" :visible.sync="overhaul" width="70%" :before-close="handleoverhaul">
        <div class="handerbox" style="margin-bottom:20px">
          <div class="liboxs" style="border-top: 1px solid #e7e7e7; ">
            <div class="leftbox">选择方式</div>
            <div class="rightbox">
              <div
                :class="['spanbox', item.ivcur == true?'spanboxcur':'' ]"
                v-for="(item,index) in listones"
                :key="index"
                @click="addlists(item)"
              >{{item.label}}</div>
            </div>
          </div>
          <div class="liboxs">
            <div class="leftbox">所属站点类型</div>
            <div class="rightbox">
              <div
                :class="['spanbox', item.ivcur == true?'spanboxcur':'' ]"
                v-for="(item,index) in listones1"
                :key="index"
                @click="addlists(item)"
              >{{item.label}}</div>
            </div>
          </div>
          <div class="liboxs">
            <div class="leftbox">站点电压等级</div>
            <div class="rightbox">
              <div
                :class="['spanbox', item.ivcur == true?'spanboxcur':'' ]"
                v-for="(item,index) in listones2"
                :key="index"
                @click="addlists(item)"
              >{{item.label}}</div>
            </div>
          </div>
          <div class="liboxs">
            <div class="leftbox">设备类型</div>
            <div class="rightbox">
              <div
                :class="['spanbox', item.ivcur == true?'spanboxcur':'' ]"
                v-for="(item,index) in listones3"
                :key="index"
                @click="addlists(item)"
              >{{item.label}}</div>
            </div>
          </div>
          <div class="liboxs"></div>
        </div>
        <div class="centerbox">
          <div class="centerleft">
            <el-tree
              ref="tree"
              :data="centerleftdata"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :default-expanded-keys="[10]"
              highlight-current
              node-key="id"
            ></el-tree>
          </div>
          <div class="centerright">
            <el-table
              :data="tableData"
              class="tables"
              row-key="id"
              max-height="280"
              border
              default-expand-all
              :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
            >
              <el-table-column prop="date" label="类型"  width="180"></el-table-column>
              <el-table-column prop="name" label="设备"  width="180"></el-table-column>
              <el-table-column prop="address" label="型号" width="300"></el-table-column>
            </el-table>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      titles: "待办",
      activeName: "1",
      currentPage: 5,
      overhaul: true,
      centerleftdata: [
        {
          label: "河南",
          id: 1,
          children: [
            {
              label: "河南电力省公司",
              id: 10,
              children: [
                {
                  label: "河南电力省公司",
                  id: 100,
                },
                {
                  label: "核心机房",
                  // icon: "iconfont el-icon-banzu",
                  id: 101,
                },
                {
                  label: "自动化接入机房",
                  id: 102,
                },
              ],
            },
            {
              label: "河南省电力计量中心",
              id: 11,
            },
            {
              label: "西区检修中心",
              id: 12,
            },
            {
              label: "河南送变电建设公司",
              id: 13,
            },
          ],
        },
        {
          label: "安阳",
          id: 2,
          children: [
            {
              label: "河南电力省公司",
              id: 20,
              children: [
                {
                  label: "河南电力省公司",
                  id: 200,
                },
                {
                  label: "核心机房",
                  // icon: "iconfont el-icon-banzu",
                  id: 201,
                },
                {
                  label: "自动化接入机房",
                  id: 202,
                },
              ],
            },
            {
              label: "河南省电力计量中心",
              id: 21,
            },
            {
              label: "西区检修中心",
              id: 22,
            },
            {
              label: "河南送变电建设公司",
              id: 23,
            },
          ],
        },
      ],
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          children: [
            {
              id: 31,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
            {
              id: 32,
              date: "2016-05-01",
              name: "王小虎",
              address: "上海市普陀区金沙江路 1519 弄",
            },
          ],
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      tableData1: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          id: 3,
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
          hasChildren: true,
        },
        {
          id: 4,
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      listones: [
        {
          label: "按空间位置",
          ivcur: false,
        },
        {
          label: "按设备类型",
          ivcur: false,
        },
        {
          label: "按归属系统",
          ivcur: false,
        },
      ],
      listones1: [
        {
          label: "中心站",
          ivcur: false,
        },
        {
          label: "变电站",
          ivcur: false,
        },
        {
          label: "用户变电厂",
          ivcur: false,
        },
        {
          label: "营业所",
          ivcur: false,
        },
      ],
      listones2: [
        {
          label: "1000kV",
          ivcur: false,
        },
        {
          label: "500kV",
          ivcur: false,
        },
        {
          label: "2200kV",
          ivcur: false,
        },
        {
          label: "110kV",
          ivcur: false,
        },
      ],
      listones3: [
        {
          label: "光传输设备",
          ivcur: false,
        },
        {
          label: "微波传输设备",
          ivcur: false,
        },
        {
          label: "载波传输设备",
          ivcur: false,
        },
        {
          label: "PCM设备",
          ivcur: false,
        },
      ],
      auditList: {
        fillIn: {
          person: "王彦璋",
          tel: "83910",
          time: "2019-12:16 08:14:58",
        },
        defects: {
          person: "武伟荣",
          tel: "7883368",
          time: "2019-12-16 08:59:23/2019-12-16 19:20:32",
        },
        checkAcceptance: {
          person: "赵烨",
          tel: "83337",
          result: "同意",
          time: "2019-12-16 08:59:23/2019-12-16 19:20:32",
        },
        presentation: {
          person: "何巍",
          tel: "7883368",
          time: "2019-12-17 19:06:10/2019-12-18 10:20:32",
        },
        examine: {
          person: "许鸿飞",
          tel: "83208",
          result: "同意",
          time: "2019-12-18 18:51:59/2019-12-16 19:20:32",
        },
      },
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectsvalue: "01",
      optionslsit: [
        {
          value: "01",
          label: "本单位及上级单位",
        },
        {
          value: "02",
          label: "国网",
        },
        {
          value: "03",
          label: "分部",
        },
        {
          value: "04",
          label: "省",
        },
        {
          value: "00",
          label: "地市",
        },
      ],
      form: {
        nums: "",
        time: "",
        title: "",
        initiate: "",
        applyfor: "",
        people: "",
        phone: "",
        types: "",
        category: "",
        source: "",
        dispose: "",
        startstime: "",
        completetime: "",
        approvalsatrts: "",
        approvalcomplete: "",
        why: "",
        place: "",
        mains: "",
        level: "",
        accessory: "",
      },
      curs: 0,
      tabslist: ["工单", "流程足迹"],
      maintenance: false,
      relation: false,
      data: [
        {
          label: "检修票追踪",
          id: 1,
          children: [
            {
              label: "待办",
              id: 10,
            },
            {
              label: "经办",
              // icon: "iconfont el-icon-banzu",
              id: 11,
            },
            {
              label: "全部未完成",
              id: 12,
            },
          ],
        },
        {
          label: "启动检修票",
          id: 2,
          children: [
            {
              label: "新建工单",
              id: 20,
            },
          ],
        },
        {
          label: "检修票管理",
          id: 3,
          children: [
            {
              label: "归档工单",
              id: 30,
            },
            {
              label: "撤销工单",
              id: 31,
            },
          ],
        },
      ],
      currentPage3: 5,
      code: 0,
      //待办
      todolist: [
        {
          title: "检修-桃乡-202008-0006",
          states: "待办",
          originator: "王一平",
          month: "2020-08-15",
          times: "2020-08-15 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0004",
          states: "待办",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0002",
          states: "待办",
          originator: "王一平",
          month: "2020-08-10",
          times: "2020-08-10 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0001",
          states: "待办",
          originator: "王一平",
          month: "2020-08-07",
          times: "2020-08-07 08:00:00",
          note: "",
        },
      ],
      //   已办
      handlelist: [
        {
          title: "检修-桃乡-202008-0006",
          states: "已办",
          originator: "王一平",
          month: "2020-08-15",
          times: "2020-08-15 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0004",
          states: "已办",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0002",
          states: "已办",
          originator: "王一平",
          month: "2020-08-10",
          times: "2020-08-10 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0001",
          states: "已办",
          originator: "王一平",
          month: "2020-08-07",
          times: "2020-08-07 08:00:00",
          note: "",
        },
      ],
      //   全部未完成
      allunfinished: [
        {
          title: "检修-桃乡-202008-0006",
          states: "未归档",
          originator: "王一平",
          month: "2020-08-15",
          times: "2020-08-15 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0004",
          states: "未归档",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0002",
          states: "未归档",
          originator: "王一平",
          month: "2020-08-10",
          times: "2020-08-10 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0001",
          states: "未归档",
          originator: "王一平",
          month: "2020-08-07",
          times: "2020-08-07 08:00:00",
          note: "",
        },
      ],

      // 归档工单
      thearchive: [
        {
          title: "检修-桃乡-202008-0006",
          dates: "2020-08-15 08:00",
          originator: "王一平",
          month: "2020-08-15",
          times: "2020-08-15 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0004",
          dates: "2020-08-15 08:00",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0002",
          dates: "2020-08-15 08:00",
          originator: "王一平",
          month: "2020-08-10",
          times: "2020-08-10 08:00:00",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0001",
          dates: "2020-08-15 08:00",
          originator: "王一平",
          month: "2020-08-07",
          times: "2020-08-07 08:00:00",
          note: "",
        },
      ],
      // 撤销工单
      undolist: [
        {
          title: "检修-桃乡-202008-0006",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-15",
          times: "2020-08-15 08:00:00",

          why: "",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0004",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          why: "",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0002",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-10",
          times: "2020-08-10 08:00:00",
          why: "",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0001",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-07",
          times: "2020-08-07 08:00:00",
          why: "",
          note: "",
        },
      ],

      equipment: [
        {
          maintenance: "贾安子马可尼设备",
          types: "光传输设备",
          category: "光传输设备2",
          site: "信通分公司",
          through: "通过",
          unit: "信通分公司通信运检三班",
        },
        {
          title: "检修-桃乡-202008-0004",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          why: "",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0002",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-10",
          times: "2020-08-10 08:00:00",
          why: "",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0001",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-07",
          times: "2020-08-07 08:00:00",
          why: "",
          note: "",
        },
      ],

      business: [
        {
          level: "三级",
          names: "(500kV桃乡变-500kV尖山变)继电保护业务01",
          types: "继电保护",
          ground: "",
          degree: "",
          measures: "",
        },
        {
          title: "检修-桃乡-202008-0004",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          why: "",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0002",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-10",
          times: "2020-08-10 08:00:00",
          why: "",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0001",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-07",
          times: "2020-08-07 08:00:00",
          why: "",
          note: "",
        },
      ],

      scenelist: [
        {
          unit: "信通分公司通信运检三班",
          contact: "马跃",
          phone: "13845784695",
        },
        {
          title: "检修-桃乡-202008-0004",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          why: "",
          note: "",
        },
      ],
      coordinate: [
        {
          unit: "信通分公司通信运检五班",
          contact: "王一平",
          phone: "13845784695",
        },
        {
          title: "检修-桃乡-202008-0004",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          why: "",
          note: "",
        },
      ],

      monthlist: [
        {
          nums: "2020-09-20",
          states: "未开始",
          units: "",
          ascription: "四川信通公司",
          implementation: "信通分公司通信运检五班",
          names: "",
          tiems: "2020-09-20",
          dates: "2020-09-30",
          mains: "",
          grades: "三级",
        },
        {
          nums: "2020-09-20",
          states: "未开始",
          units: "",
          ascription: "四川信通公司",
          implementation: "信通分公司通信运检五班",
          names: "",
          tiems: "2020-09-20",
          dates: "2020-09-30",
          mains: "",
          grades: "三级",
        },
        {
          title: "检修-桃乡-202008-0004",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          why: "",
          note: "",
        },
        {
          title: "检修-桃乡-202008-0004",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          why: "",
          note: "",
        },
      ],

      yearslist: [
        {
          nums: "",
          states: "进行中",
          units: "四川信通公司",
          implementation: "信通分公司通信运检五班",
          titeles: "",
          places: "",
          mains: "",
        },
        {
          title: "检修-桃乡-202008-0004",
          dates: "2020-08-11 08:00",
          originator: "王一平",
          month: "2020-08-12",
          times: "2020-08-12 08:00:00",
          why: "",
          note: "",
        },
      ],

      defectlist: [
        {
          nums: "缺陷-20191216-四川-桃乡-1",
          texts:
            "桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断",
          grades: "三级",
          times: "2019-12-16 07:51",
          date: "2019-12-16 19:25",
          htmltxt:
            "12月16日7：51国网四川信通调度监控发现桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断。—— ——2019年12月16日08：13 王彦璋",
          ands: "实时监视",
        },
        {
          nums: "缺陷-20191216-四川-桃乡-2",
          texts:
            "桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断",
          grades: "三级",
          times: "2019-12-16 07:51",
          date: "2019-12-16 19:25",
          htmltxt:
            "12月16日7：51国网四川信通调度监控发现桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断。—— ——2019年12月16日08：13 王彦璋",
          ands: "实时监视",
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
          states: "执行中",
          datenode: "",
        },
      ],
      modelist: [
        {
          nums: "方式-2019-四川-桃乡-1837",
          title: "（220kV银川热电传输设备改造相关方式）--桃乡部分业务",
          contact: "国网四川信通公司",
          units: "220kV银川热电传输设备改造相关方式",
          penren: "08:00",
          phone: "执行中",
          mains: "",
          times: "",
        },
      ],

      listsprop: [],
      multipleSelection: [],
      inputs: "",
      ids: 10,
      varlist: [],
    };
  },
  watch: {},
  mounted() {
    this.$nextTick(() => {
      this.$refs.tree.setCurrentKey(10);
    });
  },
  methods: {
    addlists(val) {
      let aa = this.varlist.some((item) => {
        return item == val;
      });
      if (aa == true) {
        this.varlist.filter((item, index) => {
          if (item == val) {
            val.ivcur = false;
            this.varlist.splice(index, 1);
          }
        });
      } else {
        val.ivcur = true;
        this.varlist.push(val);
      }
      console.log(aa, "===");
    },
    handleoverhaul() {
      this.overhaul = false;
    },
    handeltabs(index) {
      this.curs = index;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleCloserelation() {
      this.relation = false;
    },
    handlepupop() {
      this.relation = true;
    },
    onSubmit() {
      console.log("submit!");
    },
    handleClose() {
      this.maintenance = false;
    },
    renderContent(h, { node, data }) {
      return (
        <span>
          <i class={data.icon}></i>
          <span> {node.label}</span>
        </span>
      );
    },
    handleNodeClick(data) {
      if (
        data.label !== "检修票追踪" &&
        data.label !== "启动检修票" &&
        data.label !== "检修票管理"
      ) {
        if (data.label !== "新建工单") {
          console.log(data);
          this.titles = data.label;
          this.ids = data.id;
        } else {
          this.$nextTick(() => {
            this.$refs.tree.setCurrentKey(this.ids);
          });
          console.log(1111);
          this.maintenance = true;
        }
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(this.multipleSelection);
    },
  },
};
</script>

<style lang="scss" scoped>
.viewsbox {
  height: 100%;
  display: flex;
  .treebox {
    width: 18%;
    background: #f2f2f2;
    // margin-right: 10px;
    .el-tree {
      background: #f2f2f2;
      margin-top: 20px;
      height: calc(100% - 20px);
      /deep/.el-tree-node__expand-icon:before {
        color: #08b2aa;
      }
      /deep/.is-leaf:before {
        color: transparent;
      }

      /deep/.is-current > .el-tree-node__content {
        background: #f4f6f8;
      }

      /deep/.is-current > .el-tree-node__content {
        // content: "";
        background: #08b2aa;
        color: #fff;
        /deep/.el-tree-node__expand-icon:before {
          color: #fff;
        }
        /deep/.is-leaf:before {
          color: transparent;
        }
      }
    }

    // /deep/.el-tree-node:focus > .el-tree-node__content {
    //   // color: #fff;

    //   // background: #08b2aa;
    //   /deep/.el-tree-node__expand-icon:before {
    //     color: #fff;
    //   }

    //   // /deep/.is-leaf:before {
    //   //   color: transparent;
    //   // }
    // }
    font-size: 14px;
  }
  .mainboxs {
    flex: 1;
    display: flex;
    flex-direction: column;
    // background: #f40;
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
      .querylist {
        display: flex;
        align-items: center;
        // margin-left: 10px;
        /deep/.el-input__inner {
          height: 28px;
        }
        .el-select .el-input__inner:focus {
          border-color: #3ab5a0;
        }
        .botons {
          display: flex;
          cursor: pointer;
          align-items: center;
          width: 70px;
          img {
            margin-left: 10px;
            width: 15px;
            height: 15px;
          }
          .chaxun {
            margin-left: 5px;
            height: 20px;
            font-size: 12px;
            line-height: 20px;
            color: #666666;
            text-align: center;
          }
        }
      }
    }
    .tableboxs {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tablebox {
        /deep/.tables {
          /deep/.el-table__header tr,
          .el-table__header th {
            padding: 0;
            height: 40px;
            background: #3bb5a0;
            color: #fff;
          }
          /deep/.el-table__body tr,
          .el-table__body td {
            padding: 0;
            height: 40px;
          }
          /deep/.el-checkbox__input.is-checked .el-checkbox__inner,
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
        }
      }
      .pages {
        /deep/.el-pager li.active {
          color: #3bb5a0;
        }
      }
    }
  }
  /deep/.maintenance {
    height: 100%;

    .el-dialog {
      margin: 0 !important;
      height: 100%;
      //   overflow: hidden;

      .el-dialog__header {
        padding: 5px;
        background: #3ab5a0;
        color: #fff;

        .el-dialog__headerbtn {
          top: 12px;
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
        height: calc(100% - 70px);
        // height: 100%;
      }
    }
    .tabslist {
      height: 30px;
      width: 200px;
      //   background: #999;
      display: flex;
      align-items: center;
      font-size: 13px;
      line-height: 30px;
      text-align: center;
      margin-bottom: 15px;
      .tabsnav {
        width: 98px;
        border: 1px solid #3ab5a0;
        background: #fff;
        cursor: pointer;
      }
      .tabscur {
        cursor: pointer;

        width: 100px;
        background: #3ab5a0;
        color: #fff;
      }
    }
    .nvas {
      height: 33px;
      border-top: 1px solid #91cecf;
      background: linear-gradient(to bottom, #fff, #e0eded);
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .buttonbox {
        height: 16px;
        // background: rosybrown;
        display: flex;
        margin-right: 22px;
        align-items: center;
        cursor: pointer;
        img {
          width: 15px;
          height: 15px;
          margin-right: 7px;
        }
        span {
          font-size: 12px;
          line-height: 16px;
          color: #999;
        }
      }
      .texta {
        line-height: 33px;
      }
      .selectsbox {
        display: flex;
        align-items: center;
        /deep/.selectitle {
          margin-right: 7px;
          font-size: 12px;
          color: #999;
        }
        .el-select .el-input.is-focus .el-input__inner {
          border-color: #3ab5a0;
        }
        .el-select .el-input__inner:focus {
          border-color: #3ab5a0;
        }
        .el-scrollbar__view
          .el-select-dropdown__list
          > li.el-select-dropdown__item.selected.hover {
          color: #3ab5a0 !important;
        }
        .el-select-dropdown__item .selected {
          color: #3ab5a0 !important;
        }
      }
    }
    .mainsbox {
      //   height: 50vh;
      height: calc(100% - 90px);
      overflow: auto;
      .titlesh1 {
        height: 88px;
        font-size: 18px;
        line-height: 88px;
        text-align: center;
        color: #333;
        font-weight: 800;
      }
      .formboxs {
        border: 1px solid #e5e5e5;
        margin-bottom: 20px;
        .hadertext {
          height: 40px;
          background: #f2f2f2;
          color: #3ab5a0;
          padding-left: 20px;
          line-height: 40px;
          font-size: 14px;
        }
        .forms {
          padding: 20px 20px;
        }
      }
    }
    .formss {
      height: 578px;
      border: 1px solid #e7e7e7;
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
          border-bottom: 1px solid #e8e8e8;
        }
      }

      /* file ------ start */

      .el-button--small,
      .el-button--small.is-round {
        width: 20px;
        height: 20px;
        background-color: #f0f0f0;
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
        background-color: #c6cbfc;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
      }

      /* collapse ------start */

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
          background-color: #f2f2f2;
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
    .buttons {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0;

      .el-button--primary {
        background: #3ab5a0;
        border: 0;
      }

      .el-button--primary.is-plain {
        color: #fff;
      }

      .el-button:hover {
        border-color: #3ab5a0;
      }
    }
  }
  /deep/.relation {
    .el-dialog {
      .el-dialog__header {
        padding: 5px;
        background: #3ab5a0;
        color: #fff;

        .el-dialog__headerbtn {
          top: 12px;
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
        height: 500px;
      }
    }
    .navtext {
      height: 45px;
      line-height: 45px;
      font-size: 13px;
      color: #ffb400;
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
            height: 300px;
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
        .pages {
          /deep/.el-pager li.active {
            color: #3bb5a0;
          }
        }
      }
    }

    .buttons {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0;

      .el-button--primary {
        background: #3ab5a0;
        border: 0;
      }

      .el-button--primary.is-plain {
        color: #fff;
      }

      .el-button:hover {
        border-color: #3ab5a0;
      }
    }
    .handerbox {
      //   height: 180px;
      //   background: #3ab5a0;
      .liboxs {
        height: 35px;
        border-bottom: 1px solid #e7e7e7;
        border-left: 1px solid #e7e7e7;
        border-right: 1px solid #e7e7e7;
        display: flex;
        .leftbox {
          width: 20%;
          background: #f9f9f9;
          border-right: 1px solid #e7e7e7;
          line-height: 35px;
          font-size: 14px;
          text-align: center;
        }
        .rightbox {
          flex: 1;
          display: flex;
          align-items: center;
          text-align: center;
          .spanbox {
            width: 90px;
            height: 25px;
            margin-right: 20px;
            line-height: 25px;
            cursor: pointer;
          }
          .spanbox:first-child {
            margin-left: 15px;
          }
          .spanboxcur {
            width: 90px;
            height: 25px;
            margin-right: 20px;
            line-height: 25px;
            background: #e6faf7;
            border: 1px solid #3ab5a0;
            cursor: pointer;

            color: #3ab5a0;
          }
          .spanboxcur:first-child {
            margin-left: 15px;
          }
        }
      }
    }
    .centerbox {
      height: 280px;
      //   background: #3ab5a0;
      display: flex;
      .centerleft {
        width: 30%;
        height: 100%;
        overflow: auto;
        // background: palegreen;
        .el-tree {
          background: #fff;
          height: 100%;
          /deep/.el-tree-node__expand-icon:before {
            color: #08b2aa;
          }
          /deep/.is-leaf:before {
            color: transparent;
          }

          /deep/.is-current > .el-tree-node__content {
            background: #f4f6f8;
          }

          /deep/.is-current > .el-tree-node__content {
            // content: "";
            background: #08b2aa;
            color: #fff;
            /deep/.el-tree-node__expand-icon:before {
              color: #fff;
            }
            /deep/.is-leaf:before {
              color: transparent;
            }
          }
        }
      }
      .centerright {
        flex: 1;

        .tables {
            width: 100%;
            
          .el-table__header tr,
          .el-table__header th {
            padding: 0;
            height: 40px;
            background: #3bb5a0;
            color: #fff;
          }
          .el-dialog__headerbtn {
            top: 12px;
            right: 12px;
            .el-icon-close:before {
              color: #fff;
            }
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
        }
      }
    }
  }
}
</style>