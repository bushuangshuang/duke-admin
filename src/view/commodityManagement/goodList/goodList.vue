<template>
	<div class="goodList-box">
		<customTabs
			:columns="columns"
			:operates="operates"
			:tableData="tableData"
			:elTabList="elTabList"
			:buttonForm="buttonForm"
			:searchForm="searchForm"
			:activeName="TabactiveName"
			@onTableAdd="onTableAdd"
			@onHandleClick="onHandleClick"
		>
		</customTabs>
	</div>
</template>

<script>
	import customTabs from '@/components/custom-tabs/customTabs.vue'

	export default{
		components:{
			customTabs
		},
		data(){
			return{
				buttonForm: {isShowBatch:true,isShowShelves:false,isShowAdd:true,},
				tableData:[
					{
						good:'1111'
					},
				],
				columns:[
					{prop:'good', label:'商品名称'},
					{prop:'good', label:'价格'},
					{prop:'good', label:'库存'},
					{prop:'good', label:'销量'},
					{prop:'good', label:'创建时间'},
					{prop:'good', label:'审核状态'},
				],
				searchForm:[
					{type:'Input',label:'商品标题:'},
					{type:'Select',label:'一级类目:'},
					{type:'interval',label:'价格:'},
					{type:'interval',label:'销量:'},
					{type:'Select',label:'审核状态:'},
					{type:'button'}
				],
				TabactiveName:'1',
				elTabList:[
					{label:'全部商品',name:'1'},
					{label:'出售中的商品',name:'2'},
					{label:'仓库中的商品',name:'3'},
					{label:'被下架违规商品',name:'4'},
				],
				operates: {
					width: 200,
					fixed: 'right',
					list: [
						{
							id: '1',
							label: '编辑',
							type: 'warning',
							show: true,
							icon: 'el-icon-edit',
							plain: true,
							disabled: false,
							method: (index, row) => {
								this.handleEdit(index, row)
							}
						},
						{
							id: '2',
							label: '删除',
							type: 'danger',
							icon: 'el-icon-delete',
							show: true,
							plain: false,
							disabled: false,
							method: (index, row) => {
								this.handleDel(index, row)
							}
						}
					]
				}
			}

		},
		mounted() {
			// this.getList()
		},
		methods:{
			onHandleClick(tab){
				const tabName=tab.label;
				switch(tabName){
					case '全部':
						this.searchForm=[
							{type:'Input',label:'商品标题:'},
							{type:'Select',label:'一级类目:'},
							{type:'interval',label:'价格:'},
							{type:'interval',label:'销量:'},
							{type:'Select',label:'审核状态:'},
							{type:'button'}
						]
						this.buttonForm={
							isShowBatch:true,
							isShowAdd:true,
						}
						break;
						case '出售中的商品':
							this.searchForm=[
								{type:'Input',label:'商品标题:'},
								{type:'Select',label:'一级类目:'},
								{type:'interval',label:'价格:'},
								{type:'interval',label:'销量:'},
								{type:'button'}
							]
							this.buttonForm={
									isShowBatch:true,
									isShowShelves:true,
									isShowAdd:true,
							}
							break;
							case '仓库中的商品':
								this.searchForm=[
									{type:'Input',label:'商品标题:'},
									{type:'Select',label:'一级类目:'},
									{type:'interval',label:'价格:'},
									{type:'interval',label:'销量:'},
									{type:'button'}
								]
								this.buttonForm={
									isShowBatch:true,
									isShowShelves:false,
									isShowAdd:true,
									isShowUpShelve:true
								}
							break;
							case '被下架违规商品':
								this.searchForm=[
									{type:'Input',label:'商品标题:'},
									{type:'button'}
								]
								this.buttonForm={
									isShowBatch:false,
									isShowShelves:false,
									isShowAdd:false,
									isShowUpShelve:false
									}
								this.operates= {
										width: 200,
												fixed: 'right',
												list: [
														{
															id: '1',
															label: '立即申诉',
															type: 'warning',
															show: true,
															icon: 'el-icon-edit',
															plain: true,
															disabled: false,
															method: (index, row) => {
																this.handleEdit(index, row)
															}
														},
														{
															id: '2',
															label: '删除',
															type: 'danger',
															icon: 'el-icon-delete',
															show: true,
															plain: false,
															disabled: false,
															method: (index, row) => {
																this.handleDel(index, row)
															}
														}
										]
									}
				}

			},
			getList(){
				this.$getApi(`/shop/goods`).then(res=>{
					console.log(res,"REs")
				})
			},
			onTableAdd(){
				this.$router.push("/addGood")
			}
		}


	}
</script>

<style>
</style>
