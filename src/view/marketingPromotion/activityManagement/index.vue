
<template>
    <div  class="coupons-box">
        <customTable
                :buttonForm="buttonForm"
                :columns="columns"
                :tableData="tableData"
                :searchForm="searchForm"
                :ButtonList="ButtonList"
                @onTableAdd="onTableAdd"
                @onHandleClick="onHandleClick"
        >
        </customTable>
    </div>
</template>

<script>
    import customTable from '@/components/custom-table/customTable.vue'
    import { Message } from 'element-ui';
    export default {
        name: 'index',
        components:{
            customTable
        },
        data(){
            return{
                tableData:[],
                ButtonList:[

                    {
                        buttonText:'详情',
                        method: (index, row) => {
                            this.handleInfo(index, row)
                        }
                    },
                    {
                        buttonText:'暂停',
                        method: (index, row) => {
                            this.handleActiveSuspension(index, row)
                        }
                    },
                    {
                        buttonText:'结束',
                        method: (index, row) => {
                            this.handleEnd(index, row)
                        }
                    },
                    {
                        buttonText:'编辑',
                        method: (index, row) => {
                            this.handleEdit(index, row)
                        }
                    },
                    {
                        buttonText:'删除',
                        method: (index, row) => {
                            this.handleDelete(index, row)
                        }
                    }
                ],
                buttonForm: {isShowBatch:true,isShowShelves:false,isShowAdd:true,},
                columns:[
                    {prop:'name', label:'活动名称'},
                    {prop:'good', label:'活动类型'},
                    {prop:'good', label:'可使用商品'},
                    {prop:'periodValidity', label:'有效期'},
                    {prop:'status_name', label:'状态'},
                ],
                searchForm:[
                    {type:'Input',label:'活动名称:'},
                    {type:'Select',label:'活动类型:'},
                    {type:'interval',label:'有效期:'},
                    {type:'Select',label:'状态:'},
                    {type:'button'}
                ],
            }
        },
        methods:{
            handleEnd(index,row){
                this.$patch(`/shop/activities/${row.id}/close`).then(res=>{
                    Message({
                        message: "关闭成功",
                        type: 'success'
                    })
                })
            },
            handleActiveSuspension(index,row){
                const data={
                    status:'1',
                    row:row,
                    message:'暂停成功'
                }
              this.statusApi(data)
            },
            statusApi(dataInfo){
                const data={
                    status:dataInfo.status
                }
                this.$patch(`/shop/activities/${dataInfo.row.id}/enable`,data).then(res=>{
                    Message({
                        message: dataInfo.message,
                        type: 'success'
                    })
                })
            },
            getCouponsList(){
                this.$getApi('/shop/activities').then(res=>{
                    this.tableData=res.data.data
                    this.tableData.map((item)=>{
                        item.periodValidity=`${item.start_time}-${item.end_time}`
                    })
                })
            },
            handleDelete(index,row){
                this.$deleted(`/shop/activities/${row.id}`).then(res=>{
                    Message({
                        message: '活动删除成功',
                        type: 'success'
                    })
                    this.getCouponsList()
                })
            },
            onTableAdd(){
                this.$router.push('/addActivity')
            },
            onHandleClick(){

            },
            handleInfo(index,row){
                this.$router.push({
                    path:'/activityInfo',
                    query:{
                        row:row
                    }
                })
            },
            handleEdit(index,row){
                this.$router.push('/addActivity')
            }
        },
        mounted() {
            this.getCouponsList()
        }
    };
</script>

<style scoped>

</style>
