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

                    {prop:'goodName', label:'商品名称'},
                    {prop:'sku_real_amount', label:'交易金额'},
                    {prop:'refund_amount', label:'退款金额'},
                    {prop:'created_at', label:'申请时间'},
                    {prop:'refund_reason', label:'原因'},
                    {prop:'process_status_name', label:'退货退款状态'},

                ],
                searchForm:[
                    {type:'Select',label:'退款状态:',options:[{label:'是',value:'是'},{label:'否',value:'否'}]},
                    {type:'interval',label:'申请时间:'},
                    {type:'button'},

                ],
            }
        },
        mounted() {
            this.getRefundsList()
        },
        methods:{
            // 确认收货
            handleConfirmGoods(){
                this.$patch(`/shop/good-return-refunds/${row.order_item.sale_id}/agree/rcv`).then(res=>{
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
                this.$patch(`/shop/good-return-refunds/${row.order_item.sale_id}/agree`).then(res=>{
                    console.log(res,"Res")
                        this.$message.success("提交成功")
                        this.getRefundsList()

                })
            },
            // 拒绝handleRefused
            handleRefused(){
                this.$patch(`/shop/good-return-refunds//${row.order_item.sale_id}/refuse`).then(res=>{
                    console.log(res,"Res")
                    this.$message.success("提交成功")
                    this.getRefundsList()

                })
            },
            getRefundsList(){
                this.$getApi(`/shop/good-return-refunds`).then(res=>{
                    console.log(res,"res")
                    let data=res.data.data
                        data.map(item=>{
                            item.goodName=item.order_item.good_namee
                        })
                    this.tableData=data
                }).catch(err=>{
                    console.log(err,"err")
                })
            },
            handleInfo(row){
                    this.$router.push({
                        path:'/refundReturnInfo',
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
