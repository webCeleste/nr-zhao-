<template>
	<div class="home">
		<div class="banderbox">
			<el-carousel :interval="3000" arrow="never" style="height:312px;width:100%">
				<el-carousel-item v-for="(item,index) in banderitems" :key="index" style="height:312px;width:100%">
					<img :src="item.url" alt style="height:312px;width:100%" />
				</el-carousel-item>
			</el-carousel>
			<div class="nav">
				<div class="logobox">
					<img src="../../assets/img/home/yun.png" alt="">
				</div>
				<div :class="cur === index ? 'nav-item': 'nav-active'" v-for=" (item,index) in navlist" :key="item" @click="cur = index">{{item}}</div>
			</div>
			<div class="right-icon">
				<img class="query" src="../../assets/img/home/搜索.png" alt @click="opens" />
				<img class="home" src="../../assets/img/home/主页.png" alt @click="open" />
				<div class="user">
					<img class="userimg" src="../../assets/img/home/个人.png" alt />
					<span>admin</span>
				</div>

				<img class="voice" src="../../assets/img/home/声音.png" alt />
			</div>
			<div class="banderbootom">
				<div class="leftbander">
					<div class="notice">
						<img src="../../assets/img/home/公告.png" alt />
						<span>公告</span>
					</div>
					<div class="querytxt">暂无相关数据</div>
				</div>
				<div class="rightbander">更多</div>
			</div>
		</div>
		<div class="bootombox">
			<div class="leftmenus">
				<div class="tabsmenus">
					<div class="titlemen">{{text}}</div>
				</div>
				<div class="mainmeus">
					<div class="individual" v-for="(item,index) in mainmeuslists" :key="index" @click="openlist(item)">
						<img :src="item.url" alt />
						<div class="indvtxt">{{item.title}}</div>
					</div>
				</div>
			</div>
			<div class="rightmenus">
				<div class="saas">SaaS</div>
				<div class="menus">
					<div :class="index ==menucur ? 'menunavlan':'menunav' " v-for="(item,index) in menulist" :key="index" @click="menucur = index,txtechage(item)">{{item}}</div>
				</div>
			</div>
		</div>
		<el-dialog :title="dialogtitlies" :visible.sync="dialogVisible" width="30%">
			<div class="diobox">
				<div class="menusbox" v-for="(item,index) in menusboxlist" :key="index">
					<img :src="item.url" @click="search(item)" alt />
					<div class="indvtxt">{{item.title}}</div>
				</div>
			</div>
		</el-dialog>
		<Beondutydialog :popuplist.sync='popuplist'></Beondutydialog>
		<Management :management.sync='management'></Management>

		<Site @save="save"></Site>
		<Liveview></Liveview>
		<Lightpath @save="save"></Lightpath>
		<Passageway @save="save"></Passageway>
		<Business @save="save"></Business>
		<DefectList></DefectList>
		<Checklist></Checklist>
		<ModeList></ModeList>
		<Riskwarning></Riskwarning>
		<MachineBasic></MachineBasic>
		<Equipment></Equipment>
		<Cabinet></Cabinet>
		<Sitetopo></Sitetopo>
		<Opticalcable ref="opticalcable"></Opticalcable>
		<Powersupply></Powersupply>
		<D3machineroom></D3machineroom>
		<transTopology></transTopology>
		<equipPanelDiagram></equipPanelDiagram>
		<Connection></Connection>
		<BasicInfo></BasicInfo>
		<BearingDialog></BearingDialog>
	</div>
</template>

<script>
	import Site from "../../components/site/index"; //通信站
	import Liveview from "../../components/Liveview/index"; //通信站=>实景图
	import Lightpath from "../../components/lightpath/index"; //光路
	import Passageway from "../../components/passageway/index"; //通道
	import Business from "../../components/business/index"; //业务
	import DefectList from "../../components/defectList/index"; //缺陷单
	import Checklist from "../../components/checklist/index"; //检修单
	import ModeList from "../../components/modeList/index"; //方式单
	import Riskwarning from "../../components/riskwarning/index"; //风险预警单
	import MachineBasic from "../../components/machineBasic/index"; //机房
	import Equipment from "../../components/equipment/index"; //设备
	import Cabinet from "../../components/cabinet/index"; //机柜
	import Sitetopo from "../../components/sitetopo/index"; //平面图
	import Opticalcable from "../../components/opticalcable/index"; //站点光缆
	import Powersupply from "../../components/powersupply/index"; //站点电源
	import D3machineroom from "../../components/D3machineroom/index"; //3D实景图
	import transTopology from "../../components/transTopology/index"; //传输拓扑图
	import equipPanelDiagram from "../../components/equipPanelDiagram/index"; //设备面板图
	import Connection from "../../components/connection/index"; //电源接线图
	import BasicInfo from "../../components/basicInfo/index"; //基本信息
	import BearingDialog from "../../components/bearingDialog/index"; //承载光路/通道



	import Beondutydialog from "../../components/beondutydialog/index"; //班组列表
	import Management from "../../components/management/index"; //检修管理列表

	export default {
		components: {
			Site,
			Liveview,
			Lightpath,
			Passageway,
			Business,
			DefectList,
			Checklist,
			ModeList,
			Riskwarning,
			MachineBasic,
			Equipment,
			Cabinet,
			Sitetopo,
			Opticalcable,
			Powersupply,
			D3machineroom,
			transTopology,
			equipPanelDiagram,
			Connection,
			BasicInfo,
			BearingDialog,
			Beondutydialog,
			Management
		},
		data() {
			return {
				dialogVisible: false,
				popuplist: false,
				management: false,
				dialogtitlies: "",
				text: "统计报表",
				banderitems: [{
						url: require("../../assets/img/home/bander1.png")
					},
					{
						url: require("../../assets/img/home/bander1.png")
					},
					{
						url: require("../../assets/img/home/bander1.png")
					},
					{
						url: require("../../assets/img/home/bander1.png")
					}
				],
				navlist: ["My", "SasS", "PaaS", "LaaS", "省级云"],
				cur: 0,
				menucur: 0,
				menulist: [
					"统计报表",
					"电网模型",
					"电网运行",
					"仿真控制",
					"继电保护",
					"通信管理",
					"调度自动化",
					"OMS管理应用",
					"电网运行",
					"电网模型",
					"电网运行"
				],
				mainmeuslists: [],
				mainmeuslist: [{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					},
					{
						url: require("../../assets/img/home/基础数据.png"),
						title: "基础数据"
					},
					{
						url: require("../../assets/img/home/数据专题查询.png"),
						title: "数据专题查询"
					}
				],
				communication: [{
						url: require("../../assets/img/home/基础数据.png"),
						title: "数据查询与展示"
					},
					{
						url: require("../../assets/img/home/通信资源.png"),
						title: "资源查询统计"
					},
					{
						url: require("../../assets/img/home/状态监视.png"),
						title: "运行状态监视"
					},
					{
						url: require("../../assets/img/home/辅助决策.png"),
						title: "智能辅助决策"
					},
					{
						url: require("../../assets/img/home/辅助决策.png"),
						title: "值班"
					},
					{
						url: require("../../assets/img/home/辅助决策.png"),
						title: "检修管理"
					}
				],
				menusboxlist: [{
						url: require("../../assets/img/home/通信资源.png"),
						title: "通信全网搜索"
					}, {
						url: require("../../assets/img/home/基础数据.png"),
						title: "站点查询"
					},
					{
						url: require("../../assets/img/home/通信资源.png"),
						title: "机房查询"
					},
					{
						url: require("../../assets/img/home/状态监视.png"),
						title: "设备查询"
					},
					{
						url: require("../../assets/img/home/辅助决策.png"),
						title: "电源查询"
					},
					{
						url: require("../../assets/img/home/通信资源.png"),
						title: "光路查询"
					},
					{
						url: require("../../assets/img/home/状态监视.png"),
						title: "通道查询"
					},
					{
						url: require("../../assets/img/home/辅助决策.png"),
						title: "业务查询"
					},
					{
						url: require("../../assets/img/home/辅助决策.png"),
						title: "机柜查询"
					},
					{
						url: require("../../assets/img/home/通信资源.png"),
						title: "检修票"
					},
					{
						url: require("../../assets/img/home/状态监视.png"),
						title: "方式单"
					},
					{
						url: require("../../assets/img/home/辅助决策.png"),
						title: "缺陷单"
					},
					{
						url: require("../../assets/img/home/辅助决策.png"),
						title: "风险预警单"
					}
				]
			};
		},
		methods: {
			save() {
				this.$refs.opticalcable.chagenss();
			},
			openlist(val) {
				console.log(val);
				if (val.title == "数据查询与展示") {
					this.dialogVisible = true;
					this.dialogtitlies = val.title;
				} else if (val.title == "资源查询统计") {
					// this.$router.push("/about");
				} else if (val.title == "值班") {
					this.popuplist = true
				} else if (val.title == "检修管理") {
					this.management = true
				}
			},
			opens() {
				this.$router.push("/search");
			},
			open() {
				this.$router.push("/about");
			},
			txtechage(val) {
				this.text = val;
				if (val == "通信管理") {
					this.mainmeuslists = this.communication;
				} else {
					this.mainmeuslists = this.mainmeuslist;
				}
			},
			search(val) {
				if (val.title == "通信全网搜索") {
					this.$router.push("/search")
				} else if (val.title == "检修票") {
					this.$store.commit("openchecklist", {
						boolean: true
					});
				} else if (val.title == "缺陷单") {
					this.$store.commit("opendefectlist", {
						boolean: true
					});
				} else if (val.title == "方式单") {
					this.$store.commit("openmethodsheet", {
						boolean: true
					});
				} else if (val.title == "风险预警单") {
					this.$store.commit("openriskwarningsheet", {
						boolean: true
					});
				} else if (val.title == "站点查询") {
					this.$router.push({
						path: "/beonduty/querylist",
						query: {
							title: val.title
						},
					});
					// this.$store.commit("opensite", {
					//   boolean: true
					// });
				} else if (val.title == "机房查询") {
					this.$store.commit("opencomputerroom", {
						boolean: true
					});
				} else if (val.title == "设备查询") {
					this.$store.commit("openequipment", {
						boolean: true
					});
				} else if (val.title == "电源查询") {
					this.$store.commit("openPowerSupply", {
						boolean: true
					});
				} else if (val.title == "光路查询") {
					this.$store.commit("openLightpath", {
						boolean: true
					});
				} else if (val.title == "通道查询") {
					this.$store.commit("openPassageway", {
						boolean: true
					});
				} else if (val.title == "业务查询") {
					this.$store.commit("openBusiness", {
						boolean: true
					});
				} else if (val.title == "机柜查询") {
					this.$store.commit("opencabinet", {
						boolean: true
					});
				}
			}
		},
		mounted() {
			this.mainmeuslists = this.mainmeuslist;
		}
	};
</script>

<style lang="scss" scoped>
	.home {
		width: 100%;
		height: 100%;

		// background: #efefef;
		/deep/.el-dialog {
			margin-top: 30vh !important;
			width: 50% !important;
			// height: 35%;
			border-radius: 20px;

			/deep/.el-dialog__header {
				padding: 10px 10px 5px;

				/deep/.el-dialog__title {
					font-size: 15px;
				}

				/deep/i.el-dialog__close.el-icon.el-icon-close {
					display: none;
				}
			}

			/deep/.el-dialog__body {
				padding: 10px 5px;
			}

			.diobox {
				width: 100%;
				height: 250px;
				// background: orchid;
				border-radius: 0 0 20px 20px;
				display: flex;
				flex-wrap: wrap;
				overflow: auto;

				.menusbox {
					width: 25%;
					height: 50%;
					// border: 1px solid #fff;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					img {
						width: 90px;
						height: 90px;
					}

					.indvtxt {
						font-size: 14px;
						color: #000;
					}
				}
			}
		}

		.banderbox {
			height: 313px;
			position: relative;

			.nav {
				position: absolute;
				z-index: 9;
				top: 0;
				left: 0;
				height: 50px;
				width: 100%;
				// background: #01e9f9;
				display: flex;
				align-items: center;

				.logobox {
					width: 47px;
					height: 33px;
					// background: hotpink;
					margin-left: 9%;
					margin-right: 34px;

					img {
						width: 47px;
						height: 33px;
					}
				}

				.nav-item {
					color: #f5f5b5;
					margin-right: 47px;
				}

				.nav-active {
					color: #fff;
					margin-right: 47px;
				}
			}

			.right-icon {
				position: absolute;
				z-index: 9;
				right: 10px;
				top: 0;
				height: 50px;
				display: flex;
				align-items: center;

				img {
					width: 18px;
					height: 18px;
				}

				.query {
					margin-right: 40px;
				}

				.home {
					margin-right: 24px;
				}

				.user {
					display: flex;
					align-items: center;
					margin-right: 60px;

					.userimg {
						margin-right: 8px;
					}

					span {
						color: #fff;
						font-size: 12px;
					}
				}

				.voice {
					margin-right: 36px;
				}
			}

			.banderbootom {
				position: absolute;
				bottom: 0;
				width: 84%;
				left: 8%;
				height: 30px;
				z-index: 9;
				display: flex;
				// background: paleturquoise;
				align-items: center;
				justify-content: space-between;
				font-size: 13px;
				color: #fff;

				.leftbander {
					display: flex;
					margin-left: 18px;
					align-items: center;

					img {
						width: 15px;
						height: 15px;
						margin-right: 14px;
					}

					.querytxt {
						margin-left: 33px;
					}
				}

				.rightbander {
					line-height: 30px;
					color: #fff;
				}
			}
		}

		.bootombox {
			width: 85%;
			height: calc(100% - 313px);
			background: #efefef;
			margin: 0 auto;
			display: flex;

			.leftmenus {
				width: 90%;
				height: calc(100% - 15px);
				// background: chocolate;
				margin-top: 15px;
				display: flex;

				.tabsmenus {
					width: 114px;
					height: 100%;
					background: #b3efec;

					.titlemen {
						height: 75px;
						background: #c7faf1;
						line-height: 75px;
						text-align: center;
					}
				}

				.mainmeus {
					flex: 1;
					// background: red;
					margin-right: 5px;
					display: flex;
					flex-wrap: wrap;
					align-content: flex-start;
					overflow: auto;

					.individual {
						width: 14.05%;
						height: 140px;
						border: 1px solid #e4e4e4;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;

						img {
							width: 90px;
							height: 90px;
						}

						.indvtxt {
							font-size: 14px;
						}
					}
				}
			}

			.rightmenus {
				width: 10%;
				height: 100%;
				background: #fff;
				border-left: 2px solid #77dbec;
				display: flex;
				flex-direction: column;

				.saas {
					height: 37px;
					font-size: 17px;
					line-height: 25px;
					margin-top: 12px;
					text-align: center;
				}

				.menus {
					flex: 1;
					overflow: auto;

					.menunav {
						cursor: pointer;
						width: 96px;
						height: 26px;
						margin-top: 16px;
						background: url("../../assets/img/home/beijing.png") no-repeat;
						line-height: 26px;
						font-size: 12px;
						color: #8d8d8d;
						text-align: center;
					}

					.menunavlan {
						cursor: pointer;
						background: url("../../assets/img/home/beijing1.png") no-repeat;
						color: #fff;
						text-align: center;
						line-height: 26px;
						font-size: 12px;
						width: 96px;
						height: 25px;
						margin-top: 16px;
						border-radius: 0 10px 10px 0;
						box-shadow: -3px 5px 12px #999;
					}
				}
			}
		}
	}
</style>
