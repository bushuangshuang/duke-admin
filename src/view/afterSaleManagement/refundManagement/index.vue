<template>
   <div class="Refund-box">
       <customTable
               :searchForm="searchForm"
               :tableData="tableData"
               :columns="columns"
               :operates="operates"

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
                tableData:[
                    {
                        good:'1111'
                    },
                ],
                columns:[
                    {prop:'goodName', label:'商品名称'},
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
                operates: {
                    width: 200,
                    fixed: 'right',
                    list: [
                        {
                            id: '1',
                            label: '详情',
                            type: 'warning',
                            show: true,
                            icon: 'el-icon-edit',
                            plain: true,
                            disabled: false,
                            method: (index, row) => {
                                this.handleInfo(index, row)
                            }
                        },
                        {
                            id: '2',
                            label: '删除',
                            type: 'danger',
                            show: false,
                            icon: 'el-icon-edit',
                            plain: false,
                            disabled: false,
                            method: (index, row) => {
                                // this.handleInfo(index, row)
                            }
                        },
                        {
                            id: '3',
                            label: '同意',
                            type: 'danger',
                            show: true,
                            icon: 'el-icon-edit',
                            plain: false,
                            disabled: false,
                            method: (index, row) => {
                                // this.handleInfo(index, row)
                            }
                        },
                    ]
                }
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
                        const Status=item.process_status
                        if(Status=='refunding'){
                            this.operates.list[0].show=true
                            this.operates.list[1].show=false
                            this.operates.list[2].show=false
                            console.log(item,  this.operates.list[0],"this.operatesitem")
                        }else{
                            this.operates.list[0].show=false
                            this.operates.list[1].show=false
                            this.operates.list[2].show=false
                            console.log(this.operates,"this.operates")
                        }
                    })
                    this.tableData=data
                }).catch(err=>{
                        // this.activation()
                })
            },
            activation(){
                this.$postApi('/shop/activation/order',).then(res=>{
                    console.log(res,"res激活下单")
                    // this.pay()
                })
            },
            handleRefused(){

            },
            handleAgree(){

            },
            handleDele(){

            },
            handleInfo(index,row){
                this.$router.push({
                    path:'/refundInfo',
                    query:{
                        row:row
                    }

                })
                console.log(index,row)
            }

        },
    };
</script>

<style scoped>

</style>
