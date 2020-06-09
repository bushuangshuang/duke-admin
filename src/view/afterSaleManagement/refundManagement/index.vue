<template>
   <div class="Refund-box">
       <customTable
               :searchForm="searchForm"
               :tableData="tableData"
               :columns="columns"
               @handleInfo="handleInfo"
               @handleDelete="handleDelete"

       >
       </customTable>
   </div>
</template>

<script>
    import customTable from '@/components/custom-table/customTable';
    import { Message } from 'element-ui';
    export default {
        name: 'index',
        components:{
            customTable
        },
        data(){
            return{
                tableData:[
                    {
                        good:'1111'
                    },
                ],
                columns:[
                    {prop:'goodName', label:'商品名称222'},
                    {prop:'sku_real_amount', label:'交易金额'},
                    {prop:'numberTransactions', label:'退款金额'},
                    {prop:'averageTransactionAmount', label:'申请时间'},
                    {prop:'refund_reason', label:'原因'},
                    {prop:'process_status_name', label:'退款状态'},

                ],
                searchForm:[
                    {type:'Select',label:'退款状态:',options:[{label:'是',value:'是'},{label:'否',value:'否'}]},
                    {type:'interval',label:'申请时间:'},
                    {type:'button'},

                ],
            }
        },
        created() {
            this.getRefundsList()
        },
        updated() {
            console.log("22")
        },
        methods:{
            getRefundsList(){
                this.$getApi('/shop/good-refunds').then(res=>{
                    console.log(res,"res")
                    let data=res.data.data
                    data.map(item=>{
                        item.goodName=item.order_item.good_name
                        item.sku_real_amount=item.order_item.sku_real_amount

                    })
                    this.tableData=data
                }).catch(err=>{
                        // this.activation()
                })
            },
            handleDelete(row){
                    const data={
                        reason:'不想要'
                    }
                this.$deleted(`/shop/good-refunds/${row.id}`,data).then(res=>{
                    this.$message.success('删除成功！');
                    this.getRefundsList()
                })
            },
            handleInfo(row){
                this.$router.push({
                    path:'/refundInfo',
                    query:{
                        row:row
                    }

                })
            }

        },
    };
</script>

<style scoped>

</style>
