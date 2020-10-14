<template>
  <div>
    <el-dialog
      :visible.sync="tablebooleduty"
      width="500px"
      :before-close="handleClose"
      :title="code|dataFormat(code)"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="120px"
        label-position="left"
        class="demo-ruleForm"
      >
        <el-form-item label="值班单位" prop="name">
          <el-select
            v-model="ruleForm.name"
            placeholder="请选择所属公司"
            :disabled="code == 1"
            style="width:100%"
          >
            <el-option label="值班单位01" value="值班单位01"></el-option>
            <el-option label="值班单位02" value="值班单位02"></el-option>
            <el-option label="值班单位03" value="值班单位03"></el-option>
            <el-option label="值班单位04" value="值班单位04"></el-option>
          </el-select>
          <!-- <el-input v-model="ruleForm.name"></el-input> -->
        </el-form-item>
        <el-form-item label="职责" prop="company">
          <el-input v-model="ruleForm.company" @focus="companyvalue"></el-input>
        </el-form-item>
        <el-form-item label="职责成员" prop="beonduty">
          <el-input v-model="ruleForm.beonduty" @focus="openbeonduty(1)"></el-input>
        </el-form-item>
        <!-- <el-form-item label="值班管理员" prop="beondutyadmin">
          <el-input v-model="ruleForm.beondutyadmin" @focus="openbeonduty(2)"></el-input>
        </el-form-item>-->
        <el-form-item label="交接班权限" prop="span">
          <el-checkbox v-model="ruleForm.span"></el-checkbox>
        </el-form-item>
        <el-form-item class="buttons">
          <el-button v-if="code == 0" type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button v-if="code == 1" type="primary" @click="submitForm('ruleForm')">修改</el-button>
          <el-button  plain @click="handleClose">取消</el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      title="选择值班员"
      :visible.sync="dialogVisible"
      width="540px"
      :before-close="closetransfer"
      class="transfer"
    >
      <!-- <el-transfer v-model="valuelist" :data="datalsit"></el-transfer> -->
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
      <div class="footer">
        <el-button type="primary" @click="closetransfer">确 定</el-button>
        <el-button type="primary" @click="dialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 单个 -->
    <el-dialog
      title="选择值班管理员"
      :visible.sync="dialogVisiblesingle"
      width="540px"
      :before-close="closetransfer1"
      class="transfer"
    >
      <!-- <el-transfer v-model="valuelist" :data="datalsit"></el-transfer> -->
      <div class="mainboxs">
        <div class="leftboxs">
          <!-- <div class="cheaxbox" v-for="item in datalsit" :key="item">{{item}}</div> -->
          <!-- <el-checkbox
            class="cheaxbox"
            v-model="item.checkbox"
            v-for="item in datalsit"
            :key="item.id"
            @change="handlecheckbox(item.id)"
          >{{item.label}}</el-checkbox>-->

          <el-radio
            class="cheaxbox"
            v-model="radio"
            v-for="item in datalsitradio"
            :key="item.id"
            :label="item.id"
            @change="handlesingle(item.id)"
          >{{item.label}}</el-radio>
        </div>
        <div class="centerboxs">
          <el-button
            class="centerbuttons"
            type="primary"
            @click="addlistradio"
            :disabled="radiobutton"
          >添加</el-button>
          <el-button
            class="centerbuttons"
            type="primary"
            @click="dellist"
            :disabled="radiobutton1"
          >移出</el-button>
          <!-- <el-button
            class="centerbuttons"
            type="primary"
            @click="deletelsit"
            :disabled="wholebutton"
          >全部移出</el-button>-->
        </div>
        <div class="rightboxs">
          <el-radio
            class="cheaxbox"
            v-model="radio"
            v-for="item in valuelistradio"
            :key="item.id"
            :label="item.id"
            @change="handlesingle(item.id)"
          >{{item.label}}</el-radio>
        </div>
      </div>
      <div class="footer">
        <el-button type="primary" @click="closetransfer1">确 定</el-button>
        <el-button type="primary" @click="dialogVisiblesingle = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    tablebooleduty: Boolean,
    code: Number,
    forms: Object,
  },
  filters: {
    dataFormat(msg) {
      if (msg == 0) {
        return "新建值班职责";
      } else if (msg == 1) {
        return "修改值班职责";
      }
    },
  },
  data() {
    return {
      radio: null,
      datalsitradio: [
        { label: `赵信`, checkbox: false, id: 1 },
        { label: `徐鸿飞`, checkbox: false, id: 2 },
        { label: `李娜`, checkbox: false, id: 3 },
        { label: `徐飞`, checkbox: false, id: 4 },
        { label: `王一平`, checkbox: false, id: 5 },
      ],
      datalsit: [
        { label: `赵信`, checkbox: false, id: 1 },
        { label: `徐鸿飞`, checkbox: false, id: 2 },
        { label: `李娜`, checkbox: false, id: 3 },
        { label: `徐飞`, checkbox: false, id: 4 },
        { label: `王一平`, checkbox: false, id: 5 },
      ],
      valuelist: [],
      valuelistradio: [],
      checkboxlist: [],
      checkboxlistright: [],
      titles: "",
      dialogVisible: false,
      dialogVisiblesingle: false,
      ruleForm: {
        name: "",
        company: "",
        beonduty: "",
        beondutyadmin: "",
        span: false,
      },
      rules: {
        name: [{ required: true, message: "请输入内容", trigger: "blur" }],
        company: [{ required: true, message: "请输入内容", trigger: "blur" }],
        // beonduty: [{ required: true, message: "请输入内容", trigger: "blur" }],
        // beondutyadmin: [
        //   { required: true, message: "请输入内容", trigger: "blur" },
        // ],
      },
      isIndeterminate: false,
      checkAll: false,
    };
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
    radiobutton() {
      if (this.radio) {
        let a = this.datalsitradio.filter((val) => {
          if (val.id == this.radio) {
            return val;
          }
        });
        console.log(a, "22221");
        if (a.length > 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
    radiobutton1() {
      if (this.radio) {
        let a = this.valuelistradio.filter((val) => {
          if (val.id == this.radio) {
            return val;
          }
        });
        console.log(a, "22221");
        if (a.length > 0) {
          return false;
        } else {
          return true;
        }
      } else {
        return true;
      }
    },
  },
  watch: {
    
    ruleForm: {
      handler(val) {
        console.log(val, "wacth");
      },
      deep: true,
    },
  },
  methods: {
    closetransfer1() {
      this.dialogVisiblesingle = false;
      this.ruleForm.beondutyadmin = "赵信";
    },
    addlistradio() {
      if (this.valuelistradio.length == 0) {
        this.datalsitradio.map((val) => {
          if (val.id == this.radio) {
            this.valuelistradio.push(val);
          }
        });
        this.datalsitradio.map((val, index) => {
          if (val.id == this.radio) {
            this.datalsitradio.splice(index, 1);
          }
        });
      }
    },
    handlesingle(val) {
      console.log(val, "2222");
      this.radio = val;
    },
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
    rightcheckbox(val) {
      if (this.checkboxlistright.indexOf(val) == -1) {
        this.checkboxlistright.push(val);
      } else {
        this.checkboxlistright.splice(this.checkboxlistright.indexOf(val), 1);
      }
      console.log(this.checkboxlistright, "right------");
    },
    handlecheckbox(val) {
      if (this.checkboxlist.indexOf(val) == -1) {
        this.checkboxlist.push(val);
      } else {
        this.checkboxlist.splice(this.checkboxlist.indexOf(val), 1);
      }
      console.log(this.checkboxlist, "------");
    },
    companyvalue() {
      //   this.ruleForm.company = this.ruleForm.name;
    },
    closetransfer() {
      this.dialogVisible = false;
      //   console.log(this.valuelist);
      if (this.titles == 1) {
        console.log(this.valuelist);
        //值班人员可能为多个，将名字字符串拼接
        let  beonduties = '';
        for (let i = 0; i < this.valuelist.length; i++) {
          beonduties += this.valuelist[i].label+', ';
        }
        this.ruleForm.beonduty = beonduties;

      } else if (this.titles == 2) {
        this.ruleForm.beondutyadmin = "赵信";
      }
      this.titles = "";
    },
    openbeonduty(val) {
      console.log(1111111);
      this.titles = val;
      if (val == 1) {
        this.dialogVisible = true;
      } else {
        this.dialogVisiblesingle = true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.code == 0) {
          console.log(this.ruleForm, "=========");
          let params = {};
          params = this.ruleForm;
          //   this.$emit("ruleForm", this.ruleForm);
          this.$emit("ruleFormduty", params);
          this.$emit("update:tablebooleduty", false);
          //   this.resetForm(formName);
        } else if (valid && this.code == 1) {
          console.log(this.ruleForm, this.code, ">>>>>");
          this.$emit("ruleFormduty", this.ruleForm);
          this.resetForm(formName);
          this.$emit("update:tablebooleduty", false);
        }
      });
    },
    setQuery(query) {
      if (Object.keys(query).length == 0) {
        console.log(this.ruleForm, "1111111");
        this.ruleForm = {
          name: "",
          company: "",
          beonduty: "",
          beondutyadmin: "",
          span: false,
        };
      } else {
        this.ruleForm = Object.assign(this.ruleForm, query);
        console.log(this.ruleForm, "222222");
      }
    },
    resetForm(formName) {
      this.$nextTick(() => {
        console.log(1111);
        this.$refs[formName].resetFields();
      });
    },
    handleClose() {
      this.resetForm("ruleForm");
      this.$emit("update:tablebooleduty", false);
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.el-dialog {
  /deep/.el-dialog__header {
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
    .el-button+.el-button:hover{
      border: 1px solid #3ab5a0;
      color: #3ab5a0;
    }
  }
}
.transfer {
  .mainboxs {
    height: 450px;
    width: 500px;
    // background: royalblue;
    display: flex;
    .leftboxs {
      width: 40%;
      height: 450px;
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
      height: 450px;
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
}
</style>