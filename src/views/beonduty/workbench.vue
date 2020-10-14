<template>
  <div class="workbenchbox">
    <div class="handerbox">
      <div class="tabslistbox">
        <div
          :class="['tabsboxs',cur==index?'select':'unchecked' ]"
          v-for="(val,index) in tabslist"
          :key="index"
          @click="handlecur(index)"
        >
          <p class="title">{{val.lable}}</p>
          <p class="nums" v-if="index == 0|| index == tabslist.length-1">全部：{{val.nums}}</p>
          <p class="nums" v-else>代办：{{val.nums}}</p>
        </div>
      </div>
      <!-- <div class="boxs"></div> -->
      <div class="displaybox">
        <div class="textdisplay">
          <img src="../../assets/img/值班/工作台/rili.png" alt style="margin-right:5px" />
          <div class="texts">2020年08月10日 星期一 白班[xxx电力公司]</div>
        </div>
        <img src="../../assets/img/值班/用户.png" alt />
        <div class="openpuopen" @click="openbeonduty">张平，刘洋</div>
        <div class="submitbox" @click="shiftoveropen">交班</div>
      </div>
    </div>
    <el-dialog title="值班员变更" :visible.sync="beonduty" width="540px" class="beonduty-dialog">
      <el-form label-width="80px" :model="beondutyform" :rules="rules" ref="beondutyform">
        <el-form-item label="日期:" label-width="100px" prop="date">
          <el-input placeholder="请输入内容" v-model="beondutyform.date" disabled></el-input>
        </el-form-item>
        <el-form-item label="班次:" label-width="100px" prop="frequency">
          <el-input placeholder="请输入内容" v-model="beondutyform.frequency" disabled></el-input>
        </el-form-item>
        <el-form-item label="值班班组:" label-width="100px" prop="team">
          <el-select v-model="beondutyform.team" placeholder="请选择" style="width:100%" disabled>
            <el-option
              v-for="item in teamlist"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更原因:" label-width="100px" prop="reason">
          <el-input placeholder="请输入内容" v-model="beondutyform.reason"></el-input>
        </el-form-item>

        <el-form-item label="变更时间:" label-width="100px" prop="time">
          <el-date-picker
            style="width:100%"
            v-model="beondutyform.time"
            type="datetime"
            placeholder="选择日期时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="值班员：" label-width="100px"></el-form-item>
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
              @click="dellists"
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
      <span class="buttons">
        <el-button type="primary" @click="beondutyForm('beondutyform')" class="btn">确 定</el-button>
        <el-button @click="beonduty = false">取 消</el-button>
      </span>
    </el-dialog>
    <div class="mainbox" v-if="cur == 0">
      <div class="lienbox">
        <div class="buttonbox" style="margin-left:14px" @click="newlybuild">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div class="buttonbox" @click="deletelist">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
        <!-- <div class="buttonbox">
          <img src="../../assets/img/值班/分页.png" alt />
          <span>分页</span>
        </div>-->
        <!-- <div class="buttonbox">
          <img src="../../assets/img/值班/查询.png" alt />
          <span>查询</span>
        </div>-->
        <div class="buttonbox">
          <img src="../../assets/img/值班/导出.png" alt />
          <span>导出</span>
        </div>
        <div class="buttonbox" @click="toppinglist">
          <img src="../../assets/img/值班/置顶.png" alt />
          <span>置顶</span>
        </div>
        <div class="buttonbox" @click="canceltop">
          <img src="../../assets/img/值班/取消.png" alt />
          <span>取消置顶</span>
        </div>
        <div class="selectsbox">
          <div class="selectitle">来源:</div>
          <el-select v-model="selectsvalue" @change="selectlist" placeholder="请选择" size="mini">
            <el-option
              v-for="item in optionslsit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
            ref="multipleTable"
            key="Operationrecord"
            :row-class-name="tableRowClassName"
            :data="tableData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
            @row-dblclick="handlecellopen"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
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
      <Operationrecord
        :Operationrecord.sync="Operationrecord"
        :code="code"
        @operationchange="operationchanges"
        ref="operationrecord"
      ></Operationrecord>
    </div>
    <div class="mainbox" v-if="cur == 1">
      <div class="lienbox">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/值班/工作台/suaxin.png" alt />
          <span>刷新</span>
        </div>
        <div class="selectsbox">
          <div class="selectitle">来源:</div>
          <el-select v-model="overhaulvalue" @change="selectoverhau" placeholder="请选择" size="mini">
            <el-option
              v-for="item in overhaullsit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
            key="overhaulData"
            :data="overhaulData"
            @row-dblclick="handleoverhaul"
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
              </template>
            </el-table-column>
            <el-table-column
              prop="abnormal"
              align="center"
              label="异常情况"
              width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span
                  style="color: #00c;text-decoration: underline;cursor: pointer;"
                  @click="editpage(scope.row.nums)"
                  v-if="scope.row.abnormal =='' "
                >{{'无'}}</span>
                <span v-else @click="editpage(scope.row.nums)">{{scope.row.abnormal}}</span>
              </template>
            </el-table-column>
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
    </div>
    <div class="mainbox" v-if="cur == 2">
      <div class="lienbox">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/值班/工作台/suaxin.png" alt />
          <span>刷新</span>
        </div>

        <div class="selectsbox">
          <div class="selectitle">分类：</div>
          <el-select v-model="modevalue" @change="handleseltmode" placeholder="请选择" size="mini">
            <el-option
              v-for="item in modelsit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>

        <div class="querylist" style="margin-left:18px">
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
            key="modeData"
            :data="modeData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
            @row-dblclick="handlemode"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
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
            <el-table-column prop="businesstypes" align="center" label="业务类型" show-overflow-tooltip></el-table-column>
            <el-table-column
              prop="states"
              align="center"
              label="状态"
              width="120"
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
    </div>
    <div class="mainbox" v-if="cur == 3">
      <div class="lienbox">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/值班/工作台/suaxin.png" alt />
          <span>刷新</span>
        </div>

        <div class="selectsbox">
          <div class="selectitle">分类：</div>
          <el-select v-model="defectvalue" @change="handedefect" placeholder="请选择" size="mini">
            <el-option
              v-for="item in defectlsit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
            key="defectData"
            :data="defectData"
            tooltip-effect="dark"
            border
            @row-dblclick="handledefec"
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
            <el-table-column
              prop="workorder"
              align="center"
              label="工单状态"
              width="120"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="grade"
              align="center"
              label="安全等级"
              width="170"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.grade" placeholder="请选择">
                  <el-option label="未达八级" value="未达八级"></el-option>
                  <el-option label="八级" value="八级"></el-option>
                  <el-option label="七级" value="七级"></el-option>
                  <el-option label="六级" value="六级"></el-option>
                  <el-option label="五级" value="五级"></el-option>
                </el-select>
              </template>
            </el-table-column>
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

            <el-table-column prop="source" align="center" label="缺陷来源" show-overflow-tooltip></el-table-column>
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
    </div>
    <div class="mainbox" v-if="cur == 4">
      <div class="lienbox">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/值班/工作台/suaxin.png" alt />
          <span>刷新</span>
        </div>

        <div class="selectsbox">
          <div class="selectitle">分类：</div>
          <el-select v-model="contactvalue" placeholder="请选择" size="mini">
            <el-option
              v-for="item in contactlsit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
              prop="states"
              align="center"
              label="状态"
              width="120"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.states" placeholder="请选择">
                  <el-option label="执行中" value="执行中"></el-option>
                  <el-option label="已完成" value="已完成"></el-option>
                </el-select>
              </template>
            </el-table-column>
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
              prop="datenode"
              align="center"
              width="170"
              label="时间节点"
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
    </div>

    <div class="mainbox" v-if="cur == 5">
      <div class="lienbox">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/值班/工作台/suaxin.png" alt />
          <span>刷新</span>
        </div>

        <div class="selectsbox">
          <div class="selectitle">分类：</div>
          <el-select v-model="riskvalue" placeholder="请选择" size="mini">
            <el-option
              v-for="item in risklsit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
            key="riskData"
            :row-class-name="tableRowClassName"
            :data="riskData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
            @row-dblclick="handlerisk"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
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
              prop="types"
              align="center"
              label="状态"
              width="140"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <el-select v-model="scope.row.types" placeholder="请选择">
                  <el-option label="执行中" value="执行中"></el-option>
                  <el-option label="已完成" value="已完成"></el-option>
                </el-select>
              </template>
            </el-table-column>
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
    </div>
    <div class="mainbox" v-if="cur == 6">
      <div class="lienbox">
        <div class="buttonbox" style="margin-left:14px">
          <img src="../../assets/img/值班/工作台/suaxin.png" alt />
          <span>刷新</span>
        </div>

        <div class="selectsbox">
          <div class="selectitle">分类：</div>
          <el-select v-model="secondvalue" placeholder="请选择" size="mini">
            <el-option
              v-for="item in secondlsit"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
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
            key="secondData"
            :data="secondData"
            tooltip-effect="dark"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
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
    </div>

    <div class="mainbox" v-if="cur == 7">
      <div class="lienbox">
        <div class="buttonbox" style="margin-left:14px" @click="newlybuild">
          <img src="../../assets/img/值班/xinzheng.png" alt />
          <span>新建</span>
        </div>
        <div class="buttonbox" @click="deletelist">
          <img src="../../assets/img/值班/sanchu.png" alt />
          <span>删除</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/工作台/suaxin.png" alt />
          <span>刷新</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/导出.png" alt />
          <span>导出</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/工作台/plcl.png" alt />
          <span>批量处理</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/工作台/plgz.png" alt />
          <span>批量关注</span>
        </div>
        <div class="buttonbox">
          <img src="../../assets/img/值班/工作台/plwc.png" alt />
          <span>批量完成</span>
        </div>
        <div class="querylist" style="margin-right:10px">
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
            ref="multipleTable"
            key="record"
            :data="recordData"
            tooltip-effect="dark"
            @row-dblclick="newlybuild"
            border
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="index" width="30"></el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
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
      <Operationrecord
        :Operationrecord.sync="Operationrecord"
        :code="code"
        @operationchange="operationchanges"
        ref="operationrecord"
      ></Operationrecord>
    </div>
    <Shiftover
      :shiftover.sync="shiftover"
      :overcode.sync="overcode"
      @shiftoveropen="shiftoveropen"
      @newlybuild="newlybuild"
      @handleoverhaul="handleoverhaul"
    >
      <template v-slot:froms v-if="overcode == 1">
        <div></div>
      </template>
      <template v-slot:firstnavtop v-if="overcode !== 1">
        <div class="navone">
          <div class="titleboxs">交班事项</div>
        </div>
      </template>
      <template v-slot:bottons v-if="overcode !== 1">
        <div></div>
      </template>
      <template v-slot:bottons2 v-if="overcode !== 2">
        <div></div>
      </template>
      <template v-slot:firstnavmain v-if="overcode == 1">
        <div></div>
      </template>
      <template v-slot:maintwo v-if="overcode == 1">
        <div></div>
      </template>
    </Shiftover>

    <el-dialog
      :title="titles"
      :visible.sync="editpagedialog"
      width="30%"
      :before-close="handleCloseeditpage"
    >
      <div class="onelist" style="margin:10px 0">
        <el-input type="textarea" v-model="abnormallist" :rows="8" disabled></el-input>
      </div>
      <p style="margin:10px 0">异常情况：</p>
      <div class="twolist">
        <el-input type="textarea" v-model="abnormavalue" :rows="6"></el-input>
      </div>

      <div class="buttons" style="margin:10px 0">
        <el-button type="primary" @click="handlechangelist">确 定</el-button>
        <el-button @click="editpagedialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="选择查看的值班单位" :visible.sync="companydialog" width="380px">
      <!-- :before-close="handlecompanydialog" -->
      <div class="radiovalue" style="margin:10px 0">
        <el-radio-group v-model="radiovalue">
          <el-radio :label="1">四川信通公司</el-radio>
          <el-radio :label="2">浙江信通公司</el-radio>
          <el-radio :label="3">江苏信通公司</el-radio>
          <el-radio :label="4">安徽信通公司</el-radio>
          <el-radio :label="5">辽宁信通公司</el-radio>
          <el-radio :label="6">吉林信通公司</el-radio>
          <el-radio :label="7">黑龙江信通公司</el-radio>
          <el-radio :label="8">上海信通公司</el-radio>
          <el-radio :label="9">江西信通公司</el-radio>
        </el-radio-group>
      </div>

      <div class="buttons" style="margin:10px 0">
        <el-button type="primary" @click="closehandechage">确 定</el-button>
        <el-button @click="companydialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <div class="shiftovers" v-if="shiftoverremind == true">
      <div class="hander">
        <p style="margin-left:20px">交班提醒</p>
      </div>
      <div class="texttitle" style="margin:10px 0">班次结束时间已到，请及时交班</div>
      <div class="buttons" style="margin:10px 0">
        <el-button type="primary" @click="shiftoverremind = false">交班</el-button>
        <el-button @click="shiftoverremind = false">关闭</el-button>
      </div>
      <div class="chamges">
        <div class="textsl">提示框3s后关闭</div>
        <div class="chexc">
          <el-checkbox v-model="chexc">不在提醒</el-checkbox>
        </div>
        <div class="zanwei"></div>
      </div>
    </div>

    <!-- <el-dialog
      title="交班提醒"
      :visible.sync="shiftoverremind"
      width="25%"
      :modal="false"
      class="shiftovers"
      :close-on-click-modal="false"
    >
      
      <div class="texttitle" style="margin:10px 0">班次结束时间已到，请及时交班</div>
      <div class="buttons" style="margin:10px 0">
        <el-button type="primary" @click="shiftoverremind = false">交班</el-button>
        <el-button @click="shiftoverremind = false">关闭</el-button>
      </div>
    </el-dialog>-->

    <Checklist></Checklist>
    <ModeList></ModeList>
    <DefectList></DefectList>
    <Riskwarning></Riskwarning>
  </div>
</template>

<script>
import Operationrecord from "../../components/workbenchDialog/operationrecord";
import Shiftover from "../../components/workbenchDialog/shiftover";
import Checklist from "../../components/checklist/index";
import ModeList from "../../components/modeList/index"; //方式单
import DefectList from "../../components/defectList/index"; //缺陷单
import Riskwarning from "../../components/riskwarning/index"; //风险预警单

import moment from "moment";

export default {
  components: {
    Operationrecord,
    Shiftover,
    Checklist,
    ModeList,
    DefectList,
    Riskwarning,
  },
  filters: {
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
      titles: "",
      chexc: "",
      radiovalue: 1,
      companydialog: true,
      shiftoverremind: false,
      mallist: [],
      abnormavalue: "",
      editpagedialog: false,
      shiftover: false,
      overcode: 1,
      rules: {
        date: [{ required: true, message: "请输入日期", trigger: "change" }],
        frequency: [
          { required: true, message: "请输入内容", trigger: "change" },
        ],
        team: [{ required: true, message: "请选择班组", trigger: "change" }],
        reason: [{ required: true, message: "请输入内容", trigger: "change" }],
        time: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
      },
      datalsit: [
        { label: `赵信`, checkbox: false, id: 1 },
        { label: `徐鸿飞`, checkbox: false, id: 2 },
        { label: `李娜`, checkbox: false, id: 3 },
        { label: `徐飞`, checkbox: false, id: 4 },
        { label: `王一平`, checkbox: false, id: 5 },
      ],
      beonduty: false,
      beondutyform: {
        date: "2020-08-10",
        frequency: "夜班",
        team: "选项1",
        reason: "",
        time: "",
        admin: "",
      },
      teamlist: [
        {
          value: "选项1",
          label: "一组",
        },
        {
          value: "选项2",
          label: "二组",
        },
      ],
      code: 0,
      indexrow: "",
      currentPage: 5,
      Operationrecord: false,
      inputs: "",
      tableDatalist: [],
      //   运行记录
      tableData: [
        {
          source: "02",
          time: "2020-08-12",
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
      overhaulDatalist: [],
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
          condition: "待办",
          major: "否",
          abnormal: "",
          range: "攀煤电厂",
        },
        {
          nums: "检修-20140805-西南-四川-成都-2",
          title: "陡贾一、二线纵联电流差动保护（RCS-931AM）电路方式变更",
          apply: "信通分公司",
          types: "计划检验",
          category: "",
          equipment: "计划检验",
          content:
            "陡贾一、二线纵联电流差动保护（RCS-931AM）电路方式由高频变更为2M",
          reason: "配合保护改造",
          time: "2020-08-12 10:00",
          condition: "审批中",
          major: "否",
          abnormal: "",
          range: "攀煤电厂",
        },
      ],
      modeDatalist: [],

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
          states: "待办",
        },
        {
          nums: "方式-2019-四川-桃乡-1858",
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
          states: "未归档",
        },
      ],

      defectDatalist: [],
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
          grade: "八级",
        },
        {
          nums: "缺陷-20191216-四川-桃乡-1",
          workorder: "未归档",
          defect: "川.四川/桃乡中兴SDH光传输系统",
          describe:
            "12月16日7：51国网四川信通调度监控发现桃乡中兴SDH光传输系统银江地区220kV银江变至小关子电站主备通道中断。—— ——2019年12月16日08：13 王彦璋",
          source: "实时监视",
          times: "08:00",
          report: "是",
          grade: "未达八级",
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
      //风险预警单
      riskData: [
        {
          nums: "预警-TX-20190808-国网信通-1",
          title: "关于2019年第9号台风“利奇马”的风险预警",
          states: "",
          types: "执行中",
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
          states: "待办",
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
      secondlsit: [
        {
          value: "选项1",
          label: "待办",
        },
        {
          value: "选项2",
          label: "未归档",
        },
      ],
      risklsit: [
        {
          value: "选项1",
          label: "待办",
        },
        {
          value: "选项2",
          label: "未归档",
        },
      ],
      contactlsit: [
        {
          value: "选项1",
          label: "待办",
        },
        {
          value: "选项2",
          label: "未归档",
        },
      ],
      defectlsit: [
        {
          value: "选项1",
          label: "待办",
        },
        {
          value: "选项2",
          label: "未归档",
        },
      ],
      modelsit: [
        {
          value: "选项1",
          label: "待办",
        },
        {
          value: "选项2",
          label: "未归档",
        },
      ],

      overhaullsit: [
        {
          value: "选项1",
          label: "待办",
        },
        {
          value: "选项2",
          label: "审批中",
        },
        {
          value: "选项3",
          label: "待开工",
        },
        {
          value: "选项4",
          label: "已开工",
        },
        {
          value: "选项5",
          label: "地市检修票",
        },
      ],
      optionslsit: [
        {
          value: "01",
          label: "用户申告",
        },
        {
          value: "02",
          label: "通信运维",
        },
        {
          value: "03",
          label: "实时监视",
        },
        {
          value: "04",
          label: "其他",
        },
        {
          value: "00",
          label: "全部",
        },
      ],
      overhaulvalue: "选项1",
      selectsvalue: "00",
      modevalue: "选项1",
      contactvalue: "选项1",
      riskvalue: "选项1",
      defectvalue: "选项1",
      secondvalue: "选项1",
      tabslist: [
        { lable: "运行记录", nums: "43" },
        { lable: "检修记录", nums: "4" },
        { lable: "方式管理", nums: "12" },
        { lable: "缺陷管理", nums: "8" },
        { lable: "工作联系单", nums: "3" },
        { lable: "风险预警单", nums: "2" },
        { lable: "第二种工作票", nums: "16" },
        { lable: "工作记录", nums: "43" },
      ],
      cur: 0,
      choicelist: [],
      dellist: [],
      valuelist: [
        { label: `张平`, checkbox: false, id: 6 },
        { label: `刘洋`, checkbox: false, id: 7 },
      ],
      checkboxlist: [],
      checkboxlistright: [],
    };
  },
  computed: {
    abnormallist() {
      let len = this.mallist.length;
      if (len == 0) {
        return "";
      } else {
        let str = "";
        this.mallist.forEach((val) => {
          str += `${val}\n`;
        });
        // let str = this.mallist.split(",");
        return str;
      }
    },
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
  mounted() {
    this.overhaulDatalist = JSON.parse(JSON.stringify(this.overhaulData));
    this.tableDatalist = JSON.parse(JSON.stringify(this.tableData));
    this.modeDatalist = JSON.parse(JSON.stringify(this.modeData));
    this.defectDatalist = JSON.parse(JSON.stringify(this.defectData));
    // setTimeout(() => {
    //   this.shiftoverremind = false;
    // }, 3000);
  },
  methods: {
    closehandechage() {
      this.companydialog = false;
      this.shiftoverremind = true;
      setTimeout(() => {
        this.shiftoverremind = false;
      }, 3000);
    },
    handlechangelist() {
      this.editpagedialog = false;
      this.overhaulData.map((val) => {
        if (val.nums == this.titles.replace(/<|>/g, "")) {
          val.abnormal = this.abnormavalue;
        }
      });
      // this.overhaulData[0].abnormal = this.abnormavalue;
      console.log(
        this.titles.replace(/<|>/g, ""),
        " this.overhaulData.abnormal"
      );

      let date = moment().format("YYYY-MM-DD HH:mm:ss");
      console.log(date, "dates");
      let res = `[${date}],${this.abnormavalue}--马跃`;
      this.mallist.unshift(res);

      this.abnormavalue = "";
    },
    handleCloseeditpage() {
      this.editpagedialog = false;
    },
    editpage(val) {
      this.titles = `<${val}>`;
      console.log(111111111111);
      this.editpagedialog = true;
    },
    shiftoveropen() {
      this.shiftover = true;
      //   this.overcode = 1;
    },
    beondutyForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.beonduty = false;
          this.$refs[formName].resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
    dellists() {
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
    openbeonduty() {
      this.beonduty = true;
    },
    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    operationchanges(val) {
      if (this.code == 0) {
        let vals = JSON.parse(JSON.stringify(val));
        this.tableData.push(vals);
        console.log(vals, "val**");
        this.$refs.operationrecord.resetForm("ruleForm");
        // let obj = {};
        // this.$refs.operationrecord.echo(obj);
      } else if (this.code == 1) {
        let vals = JSON.parse(JSON.stringify(val));
        this.tableData.splice(this.indexrow, 1, vals);
        console.log(vals);
        this.$refs.operationrecord.resetForm("ruleForm");
        // let obj = {};
        // this.$refs.operationrecord.echo(obj);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handlerisk() {
      this.$store.commit("openriskwarningsheet", {
        boolean: true,
      });
    },
    handleoverhaul() {
      this.$store.commit("openchecklist", {
        boolean: true,
      });
    },
    handledefec() {
      this.$store.commit("opendefectlist", {
        boolean: true,
      });
    },
    handlemode() {
      this.$store.commit("openmethodsheet", {
        boolean: true,
      });
    },
    handlecellopen(row) {
      console.log(row, "row");
      console.log(row.index, "row");
      this.indexrow = row.index;
      this.Operationrecord = true;
      this.code = 1;
      this.$refs.operationrecord.echo(row);
    },
    newlybuild() {
      this.Operationrecord = true;
      this.code = 0;
      let obj = {};
      this.$refs.operationrecord.echo(obj);
    },
    handedefect(val) {
      console.log(val, "==");
      let arrs = this.defectlsit.filter((item) => {
        if (item.value == val) {
          return item;
        }
      });
      console.log(arrs[0].label, "--");

      this.defectData = this.defectDatalist;
      let arr = this.defectData.filter((item) => {
        if (item.workorder == arrs[0].label) {
          return item;
        }
      });
      this.defectData = arr;
    },
    handleseltmode(val) {
      console.log(val, "==");
      let arrs = this.modelsit.filter((item) => {
        if (item.value == val) {
          return item;
        }
      });
      console.log(arrs[0].label, "--");

      this.modeData = this.modeDatalist;
      let arr = this.modeData.filter((item) => {
        if (item.states == arrs[0].label) {
          return item;
        }
      });
      this.modeData = arr;
    },
    selectoverhau(val) {
      console.log(val, "===");
      // console.log(this.overhaulDatalist, "--===");
      let arrs = this.overhaullsit.filter((item) => {
        if (item.value == val) {
          return item;
        }
      });
      console.log(arrs[0].label, "--");

      this.overhaulData = this.overhaulDatalist;
      let arr = this.overhaulData.filter((item) => {
        if (item.condition == arrs[0].label) {
          return item;
        }
      });
      this.overhaulData = arr;
    },

    selectlist(val) {
      console.log(val, "===");
      console.log(this.tableDatalist, "--===");

      if (val != "00") {
        this.tableData = this.tableDatalist;
        let arr = this.tableData.filter((item) => {
          if (item.source == val) {
            return item;
          }
        });
        this.tableData = arr;
      } else {
        this.tableData = this.tableDatalist;
      }
    },
    canceltop() {
      if (this.choicelist.length != 0) {
        this.choicelist.map((val) => {
          this.tableData.filter((item, indexs) => {
            if (val.time == item.time) {
              val.index = "";
              val.top = false;
              let arr = this.tableData.splice(indexs, 1);
              this.dellist.push(arr[0]);
            }
          });
        });
        console.log(this.dellist, "arrrrr");
        this.tableData.unshift(...this.dellist);

        // this.tableData = this.tableData.sort(this.compare("time"));
        this.dellist = [];
      }
    },
    toppinglist() {
      if (this.choicelist.length != 0) {
        this.choicelist.map((val) => {
          this.tableData.filter((item, indexs) => {
            if (val.time == item.time) {
              val.index = "";
              val.top = true;
              let arr = this.tableData.splice(indexs, 1);
              this.dellist.push(arr[0]);
            }
          });
        });
        console.log(this.dellist, "arrrrr");
        this.tableData.unshift(...this.dellist);
        this.dellist = [];
      }
    },
    deletelist() {
      if (this.choicelist.length != 0) {
        console.log(1111);
        this.choicelist.map((val) => {
          this.tableData.map((item, indexs) => {
            if (val.time == item.time) {
              this.tableData.splice(indexs, 1);
            }
          });
        });
      }
    },
    handleSelectionChange(row) {
      this.choicelist = row;
      console.log(row);
    },
    handlecur(val) {
      this.cur = val;
      console.log(val, "-->");
    },
  },
};
</script>

<style lang="scss" scoped>
.workbenchbox {
  height: 100%;
  display: flex;
  flex-direction: column;
  .handerbox {
    height: 50px;
    padding: 0 20px 0 30px;
    display: flex;
    justify-content: space-between;
    .tabslistbox {
      //   background: coral;
      display: flex;
      // width: 900px;
      flex: 1;
      align-items: flex-end;
      .tabsboxs {
        cursor: pointer;
        margin-right: 15px;
        width: 96px;
        height: 45px;
        // border: 1px solid #e6e6e6;
        text-align: center;
        .title {
          font-size: 13px;
          line-height: 30px;
          color: #333;
        }
        .nums {
          font-size: 12px;
          line-height: 12px;
          color: #e37224;
        }
      }
    }
    .select {
      //   background: linear-gradient(to bottom, #3ab5a0, #fff);
      // border-radius: 5px 5px 0 0;
      background: url("../../assets/img/值班/标签1.png") no-repeat;
      background-size: cover;
    }
    .unchecked {
      background: url("../../assets/img/值班/标签2.png") no-repeat;
    }

    .displaybox {
      width: 500px;
      // flex: 1;
      height: 32px;
      //   background: crimson;
      border: 1px solid #b5b5b5;
      margin-top: 12px;
      background: linear-gradient(to bottom, #fff, #efeeef);
      display: flex;
      font-size: 12px;
      line-height: 30px;
      align-items: center;
      justify-content: center;
      .textdisplay {
        margin: 0 10px 0 8px;
        color: #666;
        display: flex;
        align-items: center;
      }
      img {
        width: 17px;
        height: 17px;
      }
      .openpuopen {
        color: #00c;
        text-decoration: underline;
        cursor: pointer;
        margin: 0 13px 0 5px;
      }
      .submitbox {
        width: 50px;
        height: 20px;
        border: 1px solid #3ab5a0;
        line-height: 20px;
        text-align: center;
        color: #3ab5a0;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    // background: chartreuse;
  }
  .shiftovers {
    width: 380px;
    height: 200px;
    background: #fff;
    position: absolute;
    right: 10px;
    bottom: 20px;
    z-index: 3;
    border: 1px solid rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    .hander {
      height: 40px;
      width: 100%;
      background: #3bb5a0;
      color: #fff;
      font-size: 13px;
      // padding-left: 15px;
      line-height: 40px;
    }
    .texttitle {
      height: 50px;
      line-height: 50px;
      text-align: center;
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

      .el-button,
      .el-button:hover {
        border: 1px solid #3ab5a0;
        // color: #3ab5a0;
      }
    }
    .chamges {
      height: 30px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      .textsl {
        font-size: 12px;
        line-height: 30px;
        margin-left: 20px;
      }
      /deep/.chexc {
        font-size: 12px;
        line-height: 30px;
        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          background: #3ab5a0;
          color: #fff;
          border-color: #3ab5a0;
        }
        .el-checkbox.is-checked>.el-checkbox__label {
          color: #3ab5a0;
        }

       
      }
      .zanwei {
        width: 90px;
      }
    }
  }
  .beonduty-dialog {
    /deep/.el-dialog {
      margin-top: 3% !important;
    }
  }
  /deep/.el-dialog {
    // margin-top: 6%;
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

    .radiovalue {
      height: 360px;
      /deep/.el-radio-group {
        display: flex;
        flex-direction: column;
        .el-radio {
          height: 35px;
          line-height: 20px;
          margin-left: 50px;
        }

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
      .el-button + .el-button:hover {
        border: 1px solid #3ab5a0;
        color: #3ab5a0;
      }
    }
  }
  .mainbox {
    flex: 1;
    // background: chocolate;
    display: flex;
    flex-direction: column;
    .lienbox {
      height: 33px;
      border-top: 1px solid #91cecf;
      background: linear-gradient(to bottom, #fff, #e0eded);
      padding: 0 20px 0 30px;
      display: flex;
      align-items: center;
      .buttonbox {
        height: 16px;
        // background: rosybrown;
        display: flex;
        margin-right: 22px;
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
      //   background: orchid;
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
          .el-input__inner {
            height: 30px;
          }
          .el-input__suffix {
            display: flex;
            align-items: center;
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
}
</style>