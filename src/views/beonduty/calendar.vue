<template>
  <div style="height:650px;overflow:auto">
    <el-calendar
      v-model="value"
      @pick="pick"
      :currentmonth="false"
      :first-day-of-week="num"
      id="calendar"
      v-watermark="{text:ZbTag,font:'200px Microsoft JhengHei',width:'100%',textColor:'rgba(180, 180, 180, 0.3)'}"
    >
      <template slot="dateCell" slot-scope="{ data }">
        <div class="date-cell" @click="allcalendar(data)">
          <div class="calendar-day">
            {{
            data.day
            .split('-')
            .slice(2)
            .join('-')
            }}
            {{ dealMyDate(data.day) }}
          </div>
          <div class="calendar-day textR" v-show="data.day=='2020-08-01' || data.day=='2020-08-02'">{{'班'}}</div>
          <!-- <div v-for="(item, index) in calendarData" :key="index" @click="allcalendars(item)">
            <div v-if="data.day === item.work_day">
              <div v-if="item.type == 1" class="font_cssw">
                <div
                  class="font_cssw"
                  v-for="(i, key) in item.project_name.split(',')"
                  :key="key"
                >{{ i }}</div>
              </div>
              <div
                class="font_css"
                v-for="(i, key) in item.project_name.split(',')"
                :key="key"
              >{{ i }}</div>
            </div>
          </div>-->

          <div v-for="(item, index) in calendarData" :key="index">
            <div v-for="(val,key) in item" :key="key">
              <div
                v-if="data.day == val.work_day"
                :class="[{bg_ff0000:val.type==1,tb1: val.type==1 ,tb1:val.tbFlag==true},{bg_01ccff:val.type==2},{bg_ffc600:val.type==3},{bg_ea8100:val.type==4},{bg_08ceac:val.type==5}]"
                @click="allcalendars(val)"
                class="font_css"
              >
                <p>{{val.BC}}&nbsp:&nbsp</p>
                <p>{{val.project_name}}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "calendar",
  props:{
    value_date:{
      // type:String
    },
    flagList:{
       type:Object,
       defalut:{}  
    }
  },
  data() {
    return {
      ZbTag: "未提交",
      value: new Date(),
      num: 7,
      datastartDate: "", //点击当前日期
      calendarData: [
        [
          {
            work_day: "2020-8-01",
            BC: "白班",
            tbFlag:false,
            project_name: "张三,李四",
            type: 1,
          },
          {
            work_day: "2020-08-01",
            BC: "夜班",
            tbFlag:true,
            project_name: "李平,李四",
            type: 2,
          },
        ],
        [
          {
            work_day: "2020-8-02",
            BC: "白班",
            tbFlag:false,
            project_name: "张三,李四",
            type: 2,
          },
          {
            work_day: "2020-8-02",
            BC: "夜班",
            tbFlag:false,
            project_name: "王五",
            type: 3,
          },
        ],
        [
          {
            work_day: "2020-8-03",
            BC: "白班",
            project_name: "张三,李四",
            tbFlag:true,
            type: 1,
          },
          {
            work_day: "2020-8-03",
            BC: "夜班",
            project_name: "王五",
            tbFlag:true,
            type: 5,
          },
        ],
        [
          {
            work_day: "2020-8-04",
            BC: "白班",
            project_name: "张三,李四",
            tbFlag:true,
            type: 1,
          },
          {
            work_day: "2020-8-04",
            BC: "夜班",
            project_name: "王五",
            tbFlag:false,
            type: 5,
          },
        ],
        [
          {
            work_day: "2020-8-07",
            BC: "白班",
            project_name: `张三  赵清`,
            tbFlag:false,
            type: 2,
          },
          {
            work_day: "2020-8-07",
            BC: "夜班",
            project_name: `李欢  张海`,
            tbFlag:false,
            type: 5,
          },
        ],
        [
          {
            work_day: "2020-8-10",
            BC: "白班",
            project_name: `顾欢  张海`,
            tbFlag:false,
            type: 4,
          },
          {
            work_day: "2020-8-10",
            BC: "夜班",
            project_name: `光合  王浩`,
            tbFlag:true,
            type: 2,
          },
        ],
      ],
    };
  },
watch: {
  value_date(){
    // deep: true
    // console.log(11)
    this.value=this.value_date
  }
},
  methods: {
    // 点击拿到当前日期事件
    allcalendar(data) {
      this.datastartDate = data;
      console.log(data, "点击拿到");
      //   this.message();
    },
    pick(){
      alert(99)
    },
    // 点击拿到当前日期事件
    allcalendars(data) {
      //   this.datastartDate = data;
      console.log(data.type, "11111");
      switch (data.type) {
        case 1:
          this.flagList.centerDialogVisible3 = true;
          break;
        case 2:
          this.flagList.centerDialogVisible5 = true;
          break;
        case 3:
          this.flagList.centerDialogVisible4 = true;
          break;

        default:
          break;
      }
      //   this.message();
    },

    // 当月事件
    dealMyDate() {
      this.calendarData.forEach((item) => {
        item.forEach((val) => {
          val.work_day = moment(val.work_day).format("YYYY-MM-DD");
        });
      });
      //   console.log( this.calendarData,'====')
    },
  },
};
</script>

<style lang="scss" scoped>

.bg_ff0000 {
  background-color: rgba($color: #ff0000, $alpha: 0.1);
  color: #ff0000;
  border-left: 2px solid #ff0000;
}
.tb1{
  background-image: url("../../assets/img/值班/三角1.png");
  background-repeat: no-repeat; 
  background-position: top right;
}
.bg_01ccff {
  background: rgba($color: #01ccff, $alpha: 0.1);
  color: #01ccff;
  border-left: 2px solid #01ccff;
}
.tb2{
  background-image: url("../../assets/img/值班/三角2.png");
  background-repeat: no-repeat; 
  background-position: top right;
}
.bg_ffc600 {
  background: rgba($color: #ffc600, $alpha: 0.1);
  color: #ffc600;
  border-left: 2px solid #ffc600;
}
.tb3{
  background-image: url("../../assets/img/值班/三角3.png");
  background-repeat: no-repeat; 
  background-position: top right;
}
.bg_ea8100 {
  background: rgba($color: #ea8100, $alpha: 0.1);
  color: #ea8100;
  border-left: 2px solid #ea8100;
}
.tb4{
  background-image: url("../../assets/img/值班/三角4.png");
  background-repeat: no-repeat; 
  background-position: top right;
}
.bg_08ceac {
  background: rgba($color: #08ceac, $alpha: 0.1);
  color: #08ceac;
  border-left: 2px solid #08ceac;
}
.tb5{
   background-image: url("../../assets/img/值班/三角5.png");
  background-repeat: no-repeat; 
  background-position: top right;
}
/deep/.date-cell{
  position: relative;
}
.textR {
    text-align: right;
    position: absolute;
    right: 0;
    top: 0;
    color: #ff0000;
}
/deep/.prev{
  border: 0;
}
/deep/.el-calendar__header{
  display: none;
}
/deep/.el-calendar-table .el-calendar-day {
  font-weight: 600;
  font-size: 18px;
  height: 150px;
  border:0;
  // border: 1px solid #eee;
}
/deep/.el-calendar__body {
  padding: 0;
  thead {
    background-color: #08ceac;
    th{
      color:white
    }
  }
}
.font_css {
  font-size: 12px;
  // background: #4dc1fe;
  // text-align: center;
  border-radius: 2px;
  margin-bottom: 2px;
  /* width:30px; */
  padding: 10px 0;
  padding-left: 20px;
  margin: 5px 0;
  // color: white;
}
</style>