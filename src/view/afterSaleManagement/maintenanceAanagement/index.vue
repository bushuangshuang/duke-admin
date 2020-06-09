<template>
    <div class="refunds-box">
        <customTable
                :searchForm="searchForm"
                :tableData="tableData"
                :columns="columns"
                @handleInfo="handleInfo"
                @handleDelete="handleDelete"
                @handleAgreeRefund="handleAgreeRefund"
                @handleRefused="handleRefused"
                @handleConfirmGoods="handleConfirmGoods"
                @handleCompleteMaintenance="handleCompleteMaintenance"

        >
        </customTable>
    </div>
</template>

<script>
    import customTable from '@/components/custom-table/customTable';
    export default {
        name: 'index',
        components:{
            customTable
        },
        data(){
            return{
                tableData:[],
                columns:[
                    {prop:'good_real_amount', label:'交易金额'},
                    {prop:'created_at', label:'申请时间'},
                    {prop:'context', label:'原因'},
                    {prop:'process_status_name',label:'状态'},

                ],
                searchForm:[
                    {type:'Select',label:'申请状态:',options:[{label:'是',value:'是'},{label:'否',value:'否'}]},
                    {type:'interval',label:'申请时间:'},
                    {type:'button'},

                ],
            }
        },
        mounted() {
            this.getRefundsList()
        },
        methods:{
            // 维修完成 上门返厂 确认
            handleCompleteMaintenance(){
                this.$getApi(`/shop/repairs/goods/${row.order_item.sale_id}/receive`).then(res=>{
                    this.$message.success("提交成功")
                    this.getRefundsList()
                })
            },
            // 确认收货
            handleConfirmGoods(){
                this.$patch(`/shop/repairs/goods/${row.order_item.sale_id}/receive`).then(res=>{
                    this.$message.success("提交成功")
                    this.getRefundsList()
                })
            },
            // 拒绝收货
            handleRefused(){
                this.$patch(`/shop/good-return-refunds/${row.order_item.sale_id}/refuse/rcv`).then(res=>{
                    this.$message.success("提交成功")
                    this.getRefundsList()
                })
            },
            // 同意
            handleAgreeRefund(row){
                this.$patch(`/shop/repairs/goods/${row.order_item.sale_id}/agree`).then(res=>{
                    console.log(res,"Res")
                    this.$message.success("提交成功")
                    this.getRefundsList()

                })
            },
            // 拒绝handleRefused
            handleRefused(){
                this.$patch(` /shop/repairs/goods/${row.order_item.sale_id}/refuse`).then(res=>{
                    console.log(res,"Res")
                    this.$message.success("提交成功")
                    this.getRefundsList()

                })
            },
            getRefundsList(){
                this.$getApi(`/shop/repairs/goods`).then(res=>{
                    let data=res.data.data
                    data.map(item=>{

                        item.goodName=item.repair.good_name
                        item.piceure=item.repair.good_info.images[0]
                        item.good_real_amount=item.repair.good_real_amount
                    })
                    this.tableData=data
                    console.log( this.tableData,"res")
                }).catch(err=>{
                    console.log(err,"err")
                })
            },
            handleInfo(row){
                this.$router.push({
                    path:'/detailsMaintenance',
                    query:{
                        row:row
                    }
                })
            },
            handleDelete(){

            }
        },

    };
</script>

<style scoped>

</style>
