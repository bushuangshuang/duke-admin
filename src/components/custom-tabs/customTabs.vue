<template>
	<div class="el-tabs-box">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane v-for="(item,index) in elTabList" :key="index" :label="item.label" :name="item.name">
					<customTable
							:searchForm="searchForm"
							:tableData="tableData"
							:columns="columns"
							:searchData="searchData"
							:operates="operates"
							:buttonForm="buttonForm"
							@onTableAdd="onTableAdd"
							:ButtonList="ButtonList"

					>
					</customTable>
			</el-tab-pane>
		</el-tabs>
	</div>

</template>

<script>
	import customForm from '../custom-form/customForm';
	import customTable from '../custom-table/customTable';
	export default {
		components:{
			customForm,
			customTable
		},
		data(){
			return{
				activeName:'1'
			}
		},
		props:{
			ButtonList:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			buttonForm:{
				type:Object,
				default:()=>{
					return{
							isShowBatch:false,
							isShowShelves:false,
							isShowAdd:false,
							isShowUpShelve:false
					}
				}
			},
			operates:{
				type:Object,
				default:()=>{
					return{}
				}
			},
			searchData:{
				type:Object,
				default:()=>{
					return{}
				}
			},
			columns:{
				type:Array,
				default:()=>{
					return[{}]
				}
			},
			tableData:{
				type:Array,
				default:()=>[]
			},
			searchForm:{
				type:Array,
				default:()=>{
					return[]
				}
			},
			elTabList:{
				type:Array,
				default:()=>{
					return[{}]
				}
			}
		},
		methods:{
			handleClick(tab){
				this.$emit("onHandleClick",tab)
			},
			onTableAdd(){
				this.$emit('onTableAdd')
			}
		}
	}
</script>

<style>
</style>
