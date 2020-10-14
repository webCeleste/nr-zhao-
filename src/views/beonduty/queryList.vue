<template>
	<div class="query_box">
		<div class="condition_query">
			<div class="condition_label">
				<img style="position:relative;top:8px;right:-14px;" src="../../assets/img/components-dialog/bg.png" alt="">
				<span style="position:relative;top:-18px;right:-24px;color:#fff;">条件查询</span>
			</div>
			<div class="condition_box search_bc">
				<div class="condition_dianwang conditions_box">
					<div class="condition_title">
						电网
					</div>
					<div class="condition_content">
						<div class="condition_selectiona">
							<div class="condition_keyboard">
								<div style="width:22px;height:28px;line-height: 28px;margin-right: 18px;">
									<img style="width:100%;height:14px;" src="../../assets/img/jp/jp.png" alt="">
								</div>
								<div>
									<ul style="display: flex;">
										<li v-for="(item,index) in keyboard_data" :key="index">
											<span :class="item.isSelect?'active':''" @click="keyboardSelect(item)">{{item.key}}</span>
										</li>
									</ul>
								</div>
							</div>
							<div class="condition_address">
								<div>国</div>
								<div>区</div>
								<div>省</div>
								<div>地</div>
								<div>县</div>
							</div>
						</div>
						<div class="condition_selectionb">
							<div class="condition_region">
								<div :class="(dianwangIndex=='a'&&isDianwangSingleChoice)?'condition_all condition_active':'condition_all'" @click="dianwangSelectAll">全部</div>
								<div style="width:calc(100% - 80px)">
									<ul>
										<li v-for="(item,index) in region_data" :key="index">
											<span :class="dianwangIndex==index?'active':''" @click="dianwangSelect(index)" v-show="isDianwangSingleChoice">{{item.region}}</span>
											<el-checkbox v-show="!isDianwangSingleChoice" v-model="checked">{{item.region}}</el-checkbox>
										</li>
									</ul>
								</div>
							</div>
							<div class="condition_shaixuan">
								<div><el-checkbox v-model="checked">包含</el-checkbox></div>
								<div style="cursor: pointer;">
									更多
									<img style="width:12px;height:6px;" src="../../assets/img/components-dialog/pullUp.png" alt="">
								</div>
								<div style="cursor: pointer;" @click="dianwangMultichoice">
									<img style="width:12px;height:12px;" src="../../assets/img/components-dialog/multi.png" alt="">
									多选
								</div>
							</div>
						</div>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="condition_diaodujigou conditions_box">
					<div class="condition_title">
						调度机构
					</div>
					<div class="condition_content">
						<div class="condition_selectiona">
							<div class="condition_keyboard">
								<div style="width:22px;height:28px;line-height: 28px;margin-right: 18px;">
									<img style="width:100%;height:14px;" src="../../assets/img/jp/jp.png" alt="">
								</div>
								<div>
									<ul style="display: flex;">
										<li v-for="(item,index) in keyboard_data1" :key="index">
											<span :class="item.isSelect?'active':''" @click="keyboardSelect1(item)">{{item.key}}</span>
										</li>
									</ul>
								</div>
							</div>
							<div class="condition_address">
								<div>国</div>
								<div>区</div>
								<div>省</div>
								<div>地</div>
								<div>县</div>
							</div>
						</div>
						<div class="condition_selectionb">
							<div class="condition_region">
								<div :class="(diaoduIndex=='a'&&isDiaoduSingleChoice)?'condition_all condition_active':'condition_all'" @click="diaoduSelectAll">全部</div>
								<div style="width:calc(100% - 80px)">
									<ul>
										<li v-for="(item,index) in region_data" :key="index">
											<span :class="diaoduIndex==index?'active':''" v-show="isDiaoduSingleChoice" @click="diaoduSelect(index)">{{item.region}}</span>
											<el-checkbox v-show="!isDiaoduSingleChoice" v-model="checked">{{item.region}}</el-checkbox>
										</li>
									</ul>
								</div>
							</div>
							<div class="condition_shaixuan">
								<div><el-checkbox v-model="checked">包含</el-checkbox></div>
								<div style="cursor: pointer;">
									更多
									<img style="width:12px;height:6px;" src="../../assets/img/components-dialog/pullUp.png" alt="">
								</div>
								<div style="cursor: pointer;" @click="diaoduMultichoice">
									<img style="width:12px;height:12px;" src="../../assets/img/components-dialog/multi.png" alt="">
									多选
								</div>
							</div>
						</div>
					</div>
				</div>
				<el-divider></el-divider>
				<div style="display: flex;">
					<div class="condition_biandianzhan conditions_box">
						<div class="condition_title" style="margin-right: 40px;">
							变电站类型
						</div>
						<div class="condition_content">
							<div class="condition_selectionb" style="margin-top: 0px;">
								<div class="condition_station">
									<div :class="biandianzhanIndex=='a'?'condition_all condition_active':'condition_all'" @click="biandianzhanIndex='a'">全部</div>
									<div style="width: calc(100% - 80px)">
										<ul>
											<li v-for="(item,index) in biandianzhan_data" :key="index">
												<span :class="biandianzhanIndex==index?'active':''" @click="biandianzhanSelect(index)">{{item.region}}</span>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="condition_dianya conditions_box">
						<div class="condition_title">
							最高电压等级
						</div>
						<div class="condition_content">
							<div class="condition_selectionb" style="margin-top: 0px;">
								<div class="condition_status">
									<div :class="dianyaIndex=='a'?'condition_all condition_active':'condition_all'" @click="dianyaIndex='a'">全部</div>
									<div style="width: calc(100% - 80px)">
										<ul>
											<li v-for="(item,index) in biandianzhan_data" :key="index">
												<span :class="dianyaIndex == index?'active':''" @click="dianyaSelect(index)">{{item.region}}</span>
											</li>
										</ul>
									</div>
								</div>
								<div class="condition_shaixuan">
									<div style="cursor: pointer;">
										更多
										<img style="width:12px;height:6px;" src="../../assets/img/components-dialog/pullUp.png" alt="">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<el-divider></el-divider>
				<div class="condition_state conditions_box">
					<div class="condition_title">
						状态
					</div>
					<div class="condition_content">
						<div class="condition_selectionb">
							<div class="condition_region" style="width: calc(100% - 180px)">
								<div :class="(stateIndex=='a' && isStateSingleChoice)?'condition_all condition_active':'condition_all'" @click="stateSelectAll">全部</div>
								<div style="width:calc(100% - 80px);height:100px;background:#f8f8f8;border:1px solid #f0f0f0;padding:4px 14px;">
									<ul>
										<li v-for="(item,index) in state_data" :key="index" style="width:15%;">
											<span :class="stateIndex==index?'active':''" v-show="isStateSingleChoice" @click="stateSelect(index)">{{item.region}}</span>
											<el-checkbox v-show="!isStateSingleChoice" v-model="checked">{{item.region}}</el-checkbox>
										</li>
									</ul>
								</div>
							</div>
							<div class="condition_shaixuan">
								<div style="cursor: pointer;">
									更多
									<img style="width:12px;height:6px;" src="../../assets/img/components-dialog/pullUp.png" alt="">
								</div>
								<div style="cursor: pointer;" @click="stateMultichoice">
									<img style="width:12px;height:12px;" src="../../assets/img/components-dialog/multi.png" alt="">
									多选
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="condition_button" v-show="!isStateSingleChoice||!isDianwangSingleChoice||!isDiaoduSingleChoice">
					<div class="button_box">
						<div @click="confirmState">确认</div>
						<div @click="selectallState">全选</div>
						<div @click="clearState">清除</div>
					</div>
				</div>
			</div>
		</div>
		<div class="function_button">
			<div class="fuzzy_query">
				<div class="fuzzy_label">
					<img style="position:relative;top:8px;right:-14px;" src="../../assets/img/components-dialog/bg.png" alt="">
					<span style="position:relative;top:-18px;right:-24px;color:#fff;">模糊查询</span>
				</div>
				<div class="fuzzy_box search_bc">	
					<el-input v-model="input" placeholder="请输入搜索关键字"></el-input>
					<el-button size="small" icon="el-icon-search"></el-button>
				</div>
			</div>
			<!-- <div class="custom_query">
				<div class="custom_label">
					自定义查询
				</div>
				<div class="custom_box search_bc">
					<el-button type="success" size="small" icon="el-icon-search"></el-button>
					<el-divider direction="vertical"></el-divider>
					<el-button type="success" size="small" icon="el-icon-search">刷新</el-button>
					<el-button type="success" size="small" icon="el-icon-search">导出</el-button>
					<el-button type="success" size="small" icon="el-icon-search">帮助</el-button>
					<el-button type="success" size="small" icon="el-icon-search">反馈</el-button>
				</div>
			</div> -->
		</div>
		<div class="tableboxs">
			<div class="tablebox">
				<el-table class="tables" ref="multipleTable" key="站点查询" :data="tableData" tooltip-effect="dark" border
				 @selection-change="handleSelectionChange">
					<el-table-column type="index" label="序号" width="50"></el-table-column>
					<el-table-column type="selection"></el-table-column>
					<el-table-column prop="zlName" label="名称" align="center"></el-table-column>
					<el-table-column prop="zlFj" align="center" label="变电容量(MVA)"></el-table-column>
					<el-table-column prop="zlBz" align="center" label="电压等级"></el-table-column>
					<el-table-column prop="updataName" align="center" label="电网"></el-table-column>
					<el-table-column prop="updataTime" align="center" label="类型"></el-table-column>
					<el-table-column prop="updataTime" align="center" label="调度机构"></el-table-column>
					<el-table-column prop="updataTime" align="center" label="投运日期"></el-table-column>
				</el-table>
			</div>
			<div class="pages" style="text-align: center;margin-top:4px;">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3"
				 :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				checked:false,
				keyboardIndex:'a',//键盘1
				keyboardInde2:'a',//键盘2
				dianwangIndex:'a',//电网全选状态
				diaoduIndex:'a',//调度全选状态
				biandianzhanIndex:'a',//变电站全选状态
				dianyaIndex:'a',//电压等级全选状态
				stateIndex:'a',//状态全选状态
				isDianwangSingleChoice:true,//电网单选状态
				isDiaoduSingleChoice:true,//调度单选状态
				isStateSingleChoice:true,//状态单选状态
				keyboard_data:[
					{
						key:'A',
						isSelect:false,
					},
					{
						key:'B',
						isSelect:false,
					},
					{
						key:'C',
						isSelect:false,
					},
					{
						key:'D',
						isSelect:false,
					},
					{
						key:'E',
						isSelect:false,
					},
					{
						key:'F',
						isSelect:false,
					},
					{
						key:'G',
						isSelect:false,
					},
					{
						key:'H',
						isSelect:false,
					},
					{
						key:'I',
						isSelect:false,
					},
					{
						key:'J',
						isSelect:false,
					},
					{
						key:'K',
						isSelect:false,
					},
					{
						key:'L',
						isSelect:false,
					},
					{
						key:'M',
						isSelect:false,
					},
					{
						key:'N',
						isSelect:false,
					},
					{
						key:'O',
						isSelect:false,
					},
					{
						key:'P',
						isSelect:false,
					},
					{
						key:'Q',
						isSelect:false,
					},
					{
						key:'R',
						isSelect:false,
					},
					{
						key:'S',
						isSelect:false,
					},
					{
						key:'T',
						isSelect:false,
					},
					{
						key:'U',
						isSelect:false,
					},
					{
						key:'V',
						isSelect:false,
					},
					{
						key:'W',
						isSelect:false,
					},
					{
						key:'X',
						isSelect:false,
					},
					{
						key:'Y',
						isSelect:false,
					},
					{
						key:'Z',
						isSelect:false,
					},
				],
				keyboard_data1:[
					{
						key:'A',
						isSelect:false,
					},
					{
						key:'B',
						isSelect:false,
					},
					{
						key:'C',
						isSelect:false,
					},
					{
						key:'D',
						isSelect:false,
					},
					{
						key:'E',
						isSelect:false,
					},
					{
						key:'F',
						isSelect:false,
					},
					{
						key:'G',
						isSelect:false,
					},
					{
						key:'H',
						isSelect:false,
					},
					{
						key:'I',
						isSelect:false,
					},
					{
						key:'J',
						isSelect:false,
					},
					{
						key:'K',
						isSelect:false,
					},
					{
						key:'L',
						isSelect:false,
					},
					{
						key:'M',
						isSelect:false,
					},
					{
						key:'N',
						isSelect:false,
					},
					{
						key:'O',
						isSelect:false,
					},
					{
						key:'P',
						isSelect:false,
					},
					{
						key:'Q',
						isSelect:false,
					},
					{
						key:'R',
						isSelect:false,
					},
					{
						key:'S',
						isSelect:false,
					},
					{
						key:'T',
						isSelect:false,
					},
					{
						key:'U',
						isSelect:false,
					},
					{
						key:'V',
						isSelect:false,
					},
					{
						key:'W',
						isSelect:false,
					},
					{
						key:'X',
						isSelect:false,
					},
					{
						key:'Y',
						isSelect:false,
					},
					{
						key:'Z',
						isSelect:false,
					},
				],
				region_data:[
					{
						region:'国家电网',
					},
					{
						region:'东北电网',
					},
					{
						region:'华北电网',
					},
					{
						region:'华东电网',
					},
					{
						region:'东北电网',
					}
				],
				biandianzhan_data:[
					{
						region:'变电站',
					},
					{
						region:'开关站',
					},
					{
						region:'牵引站',
					},
					{
						region:'串补站',
					}
				],
				state_data:[
					{
						region:'规划',
					},
					{
						region:'在建',
					},
					{
						region:'在运',
					},
					{
						region:'退运',
					},
					{
						region:'调试',
					},
					{
						region:'扩建',
					}
				],
				
				input:'',
				currentPage3: 5,
				code: 0,
				tableData: [{
						zlName: "夜班资料",
						zlFj: "值班附件",
						zlBz: "xx值班单位01",
						updataName: "王一平",
						updataTime: "2020-03-05 22:00:43"
					},
					{
						zlName: "夜班资料",
						zlFj: "值班附件",
						zlBz: "xx值班单位01",
						updataName: "王一平",
						updataTime: "2020-03-05 22:00:43"
					}, {
						zlName: "夜班资料",
						zlFj: "值班附件",
						zlBz: "xx值班单位01",
						updataName: "王一平",
						updataTime: "2020-03-05 22:00:43"
					}
				],
			};
		},
		watch: {
		},
		mounted() {
			this.$nextTick(() => {
				
			});
		},
		methods: {
			keyboardSelect(item){//键盘选择
				item.isSelect = !item.isSelect
			},
			keyboardSelect1(item){//键盘选择
				item.isSelect = !item.isSelect
			},
			stateSelectAll(){//点击状态调度全选
				if(this.isStateSingleChoice){
					this.stateIndex='a';
				}else{
					this.checked =!this.checked;
				}
			},
			diaoduSelectAll(){//点击调度全选
				if(this.isDiaoduSingleChoice){
					this.diaoduIndex='a';
				}else{
					this.checked =!this.checked;
				}
			},
			dianwangSelectAll(){//点击电网全选
				if(this.isDianwangSingleChoice){
					this.dianwangIndex='a';
				}else{
					this.checked =!this.checked;
				}
			},
			stateSelect(index){//状态单选逻辑
				if(this.stateIndex == index){
					this.stateIndex ='a';
				}else if(this.stateIndex == 'a' || this.stateIndex!=index){
					this.stateIndex = index;
				}
			},
			dianyaSelect(index){//电压单选逻辑
				if(this.dianyaIndex == index){
					this.dianyaIndex ='a';
				}else if(this.dianyaIndex == 'a' || this.dianyaIndex!=index){
					this.dianyaIndex = index;
				}
			},
			biandianzhanSelect(index){//变电站单选逻辑
				if(this.biandianzhanIndex == index){
					this.biandianzhanIndex = 'a'
				}else if(this.biandianzhanIndex == 'a' || this.biandianzhanIndex!=index){
					this.biandianzhanIndex = index;
				}
			},
			diaoduSelect(index){//调度单选逻辑
				if(this.diaoduIndex == index){
					this.diaoduIndex = 'a';
				}else if(this.diaoduIndex == 'a' || this.diaoduIndex !=index){
					this.diaoduIndex = index;
				}
			},
			dianwangSelect(index){//电网单选逻辑
				if(this.dianwangIndex == index){
					this.dianwangIndex = 'a';
				}else if(this.dianwangIndex == 'a'||this.dianwangIndex != index){
					this.dianwangIndex = index;
				}
			},
			dianwangMultichoice(){//点击电网多选
				this.isDianwangSingleChoice = !this.isDianwangSingleChoice;
			},
			diaoduMultichoice(){//点击调度多选
				this.isDiaoduSingleChoice = !this.isDiaoduSingleChoice;
			},
			clearState(){//清除状态选择
				this.checked = false;
			},
			selectallState(){//状态全选
				
			},
			confirmState(){//状态确认
				
			},
			stateMultichoice(){//点击状态多选
				this.isStateSingleChoice = !this.isStateSingleChoice;
			},
			handleSizeChange(val) {
				// console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				// console.log(`当前页: ${val}`);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
				console.log(this.multipleSelection);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.query_box {
		height: 100%;
		.condition_query{
			display:flex;
			margin:12px 12px 10px;
			font-size: 13px;
			.condition_label{
				width:100px;
			}
			.condition_box{
				padding:8px 14px 8px 26px;
				width:100%;
				.conditions_box{
					display: flex;
					.condition_title{
						width:100px;
						margin-right:36px;
						color:#949494;
						line-height: 30px;
					}
					.condition_content{
						width: calc(100% - 100px);
						.condition_selectiona{
							display: flex;
							justify-content: space-between;
							.condition_keyboard{
								display: flex;
								color:#005aa0;
								ul li{
									margin-right: 12px;
									cursor: pointer;
									font-size:13px;
									line-height: 28px;
									span{
										display: inline-block;
										width:18px;
										height:18px;
										text-align: center;
										line-height: 18px;
									}
								}
								ul .active{
									background:#0077AA;
									color:#fff;
								}
							}
							.condition_address{
								display: flex;
								div{
									border:1px solid #3bb5a0;
									border-radius:4px;
									width:24px;
									height:24px;
									font-size:13px;
									color:#00706b;
									line-height: 24px;
									text-align: center;
									margin-right: 10px;
									cursor: pointer;
								}
								.active{
									background:#55A532;
									color:#fff;
								}
							}
						}
						.condition_selectionb{
							display: flex;
							justify-content: space-between;
							margin-top: 8px;
							font-size:13px;
							.condition_region{
								width: calc(100% - 280px);
								display: flex;
								ul{
									display: flex;
									justify-content: flex-start;
									flex-wrap: wrap;
									width:100%;
									li{
										cursor: pointer;
										width:18%;
										height:28px;
										line-height:28px;
										font-size:13px;
										color:#5a5a5a;
									}
									.active{
										background:#3cb5a0;
										color:#fff;
										border-radius:4px;
										padding:4px 8px;
									}
								}
								.condition_all{
									width:48px;
									height:28px;
									line-height:28px;
									text-align: center;
									color:#333;
									font-size:13px;
									margin-right:24px;
									cursor: pointer;
								}
								.condition_active{
									width:48px;
									height:28px;
									line-height:28px;
									text-align: center;
									background:#00706b;	
									color:#fff;
								}
							}
							.condition_shaixuan{
								display: flex;
								div{
									padding:0px 8px;
									height:28px;
									line-height: 28px;
									border:1px solid #ccc;
									border-radius:4px;
									margin-right: 8px;
								}
							}
						}
					}
				}
			}
			.condition_biandianzhan{
				width:48%;
				.condition_station{
					width:100%;
					display: flex;
					.condition_all{
						width:48px;
						height:28px;
						line-height:28px;
						text-align: center;
						color:#333;
						font-size:13px;
						margin-right:24px;
						cursor: pointer;
					}
					.condition_active{
						width:48px;
						height:28px;
						line-height:28px;
						text-align: center;
						background:#00706b;	
						color:#fff;
					}
					ul{
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						width:100%;
						li{
							cursor: pointer;
							width:24%;
							height:28px;
							line-height:28px;
							font-size:13px;
							color:#5a5a5a;
						}
						.active{
							background:#3cb5a0;
							color:#fff;
							border-radius:4px;
							padding:4px 8px;
						}
					}
				}
			}
			.condition_dianya{
				width:52%;
				.condition_status{
					width: calc(100% - 88px);
					display: flex;
					.condition_all{
						width:48px;
						height:28px;
						line-height:28px;
						text-align: center;
						color:#333;
						font-size:13px;
						margin-right:24px;
						cursor: pointer;
					}
					.condition_active{
						width:48px;
						height:28px;
						line-height:28px;
						text-align: center;
						background:#00706b;	
						color:#fff;
					}
					ul{
						display: flex;
						justify-content: flex-start;
						flex-wrap: wrap;
						width:100%;
						li{
							cursor: pointer;
							width:24%;
							height:28px;
							line-height:28px;
							font-size:13px;
							color:#5a5a5a;
						}
						.active{
							background:#3cb5a0;
							color:#fff;
							border-radius:4px;
							padding:4px 8px;
						}
					}
				}
					
				
			}
			.condition_button{
				width:100%;
				margin-top: 8px;
				text-align: center;
				.button_box{
					div{
						display: inline-block;
						width:125px;
						height:28px;
						line-height:28px;
						cursor: pointer;
					}
					div:nth-child(1){
						background:#ec971f;
						color:#fff;
						margin-right: 28px;
					}
					div:nth-child(2){
						background:#60c888;
						color:#fff;
						margin-right: 28px;
					}
					div:nth-child(3){
						background:#f1f1f1;
						color:#333;
						border:1px solid #ccc;
					}
				}
				
			}
		}
		.el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner{
			background:none;
			color:#333;
			border:1px solid #DCDFE6;
		}
		.function_button{
			display: flex;
			margin-left:12px;
			margin-right: 12px;
			margin-bottom: 10px;
			.fuzzy_query{
				display: flex;
				width:100%;
				font-size: 13px;
				// width: calc(100% - 10px);
				.fuzzy_label{
					width:100px;
				}
				.fuzzy_box{
					display: flex;
					justify-content:flex-start;
					align-items: center;
					padding:8px 14px 8px 26px;
					width:100%;
					// margin-left: 10px;
					
				}
			}
			.custom_query{
				display: flex;
				.custom_box{
					padding:8px 14px 8px 26px;
				}
			}
			.el-input{
				width:320px;
			}
			/deep/.el-input__inner {
				width:320px;
			  height: 32px;
			  border-radius:5px;
			  border:1px solid #ccc;
			}
			.el-select .el-input__inner:focus {
			  border-color: #3ab5a0;
			}
			.el-button{
				width: 60px;
				margin-left:20px;
				background: #0fa081;
				color:#f3faf9;
				border-radius:5px;
			}
			.el-button:active{
				border: 1px solid #3bb5a0;
			}
			// .el-button:focus, .el-button:hover{
			// 	border: 1px solid #3bb5a0;
			// }
		}
		.el-divider--horizontal{
		     margin: 8px 0;
		     background: 0 0;
		     border-top: 1px dashed #DCDFE6;
		 } 
		.search_bc{
			background:#f9f9f9;
			border:1px solid #ccc;
		}
			// background: #f2f2f2;
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

				.noopen {
					pointer-events: none;
				}
			}

			.tableboxs {
				flex: 1;
				//   background: orchid;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.tablebox {
					width: calc(100% - 20px);
					margin: 0 10px;

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
					/deep/.el-pager li:hover {
						color: #3bb5a0;
					}
				}
			}
		
	}
</style>

