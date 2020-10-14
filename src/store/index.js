import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    site: false, //站点
    sitetopo: false, //站点平面
    opticalcable: false, //站点光缆
    powersupply: false, //站点电源
    liveview: false, //实景图
    Lightpath: false, // 光路
    Passageway: false, //通道
    Business: false, //业务
    // Cabinet: false, // 机柜
    checklist: false, // 检修单
    defectlist: false, // 缺陷单
    methodsheet: false, // 方式单
    riskwarningsheet: false, // 风险预警单
    equipment: false, // 设备
    computerroom: false, //机房
    D3machineroom: false, //3d机房
    cabinet: false, //机柜
    transTopology: false, //传输拓扑图
    equipPanelDiagram: false, //设备面板图
    bearingDialog: false, //承载光路/通道
    powerSupply: false, //电源卡片
    basicInfo: false, //基本信息
    connection: false,  //电源接线图

    DialogVisible2:false,//弹框的控制值
  },
  mutations: {
    openTransTopology(state, payload) {
      state.transTopology = payload.boolean
    },
    openEquipPanelDiagram(state, payload) {
      state.equipPanelDiagram = payload.boolean
    },
    openBearingDialog(state, payload) {
      state.bearingDialog = payload.boolean
    },
    openPowerSupply(state, payload) {
      state.powerSupply = payload.boolean
    },
    openBasicInfo(state, payload) {
      state.basicInfo = payload.boolean
    },
    openpowersupply(state, payload) {
      state.powersupply = payload.boolean
    },
    openopticalcable(state, payload) {
      state.opticalcable = payload.boolean
    },
    opensitetopo(state, payload) {
      state.sitetopo = payload.boolean
    },
    opencabinet(state, payload) {
      state.cabinet = payload.boolean
    },
    openD3machineroom(state, payload) {
      state.D3machineroom = payload.boolean
    },
    opencomputerroom(state, payload) {
      state.computerroom = payload.boolean
    },
    openequipment(state, payload) {
      state.equipment = payload.boolean
    },
    openchecklist(state, payload) {
      state.checklist = payload.boolean
    },
    opendefectlist(state, payload) {
      state.defectlist = payload.boolean
    },
    openmethodsheet(state, payload) {
      state.methodsheet = payload.boolean
    },
    openriskwarningsheet(state, payload) {
      state.riskwarningsheet = payload.boolean
    },
    opensite(state, payload) {
      state.site = payload.boolean
    },
    openliveview(state, payload) {
      state.liveview = payload.boolean
    },
    openLightpath(state, payload) {
      state.Lightpath = payload.boolean
    },
    openPassageway(state, payload) {
      state.Passageway = payload.boolean
    },
    openBusiness(state, payload) {
      state.Business = payload.boolean
    },
    // openCabinet(state, payload) {
    //   state.Cabinet = payload.boolean
    // },
    openConnection(state,payload){
      state.connection = payload.boolean
    }
  },
  actions: {},
  modules: {}
})