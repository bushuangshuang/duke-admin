<template>
    <div class="order-box">
        <customTabs
                :columns="columns"
                :tableData="tableData"
                :elTabList="elTabList"
                :buttonForm="buttonForm"
                :searchForm="searchForm"
                :activeName="TabactiveName"
                @onTableAdd="onTableAdd"
                @handleInfo="handleInfo"
                @onHandleClick="onHandleClick"
                @handleUpdatePrice="handleUpdatePrice"
                @handleFreight="handleFreight"
                @handleDelivery="handleDelivery"
                @handleDelete="handleDelete"
        >
        </customTabs>
    </div>
</template>

<script>
    import customTabs from "../../components/custom-tabs/customTabs";
    export default {
        name: 'orderList',
        components:{
            customTabs
        },
        data(){
            return{
                tableData:[],
                TabactiveName:'1',
                buttonForm: {isShowBatch:true,isShowShelves:false,isShowAdd:true,},
                // wait_pay 待付款
                // wait_delivery 待发货
                // wait_receive 待收货
                // wait_eval 待评价
                // trade_closed 交易关闭
                elTabList:[
                    {label:'全部订单',name:'1'},
                    {label:'待付款',name:'2'},
                    {label:'待发货',name:'3'},
                    {label:'待收货',name:'4'},
                    {label:'待评价',name:'5'},
                    {label:'交易关闭',name:'6'},
                ],
                columns:[
                    {prop:'good_name', label:'商品'},
                    {prop:'good_real_amount', label:'单价'},
                    {prop:'good_num', label:'数量'},
                    // {prop:'process_status_name',label:'买家'},
                    {prop:'process_status_des', label:'交易状态'},
                    {prop:'good_real_amount',label:'实收款'},

                ],
                searchForm:[
                    {type:'Input',label:'商品名称:',},
                    {type:'interval',label:'成交时间:'},
                    {type:'Select',label:'申请状态:',options:[{label:'是',value:'是'},{label:'否',value:'否'}]},
                    {type:'interval',label:'申请时间:'},
                    {type:'Input',label:'买家名称:',},
                    {type:'Select',label:'交易状态:',options:[{label:'是',value:'是'},{label:'否',value:'否'}]},
                    {type:'Input',label:'订单编号:',},
                    {type:'button'},

                ],
            }
        },
        mounted() {
            this.getList()
        },
        methods:{
            getList(){
                this.$getApi('/shop/good-orders').then(res=>{
                    let data=res.data.data
                    data.map(item=>{
                            item.items.map(itemV=>{
                                this.tableData.push(itemV)
                                itemV.process_status=item.process_status
                                itemV.process_status_des=item.process_status_des
                                })

                    })
                    console.log("this.tableData",this.tableData)
                })

            },
            onTableAdd(){

            },
            onHandleClick(){

            },
            handleInfo(row){
                this.$router.push({
                    path:'/orderInfo',
                    query:{
                        row:row
                    }
                })
            },
            // 修改价格
            handleUpdatePrice(row){
                // alert("修改价格")
                this.$router.push({
                    path:'/updatePrice',
                    query:{
                        row:row,
                        price:true
                    }
                })
                // this.$patch(`/shop/good-orders/${row.id}/amount`).then(res=>{
                //
                // })
            },
            // 修改运费
            handleFreight(row){
                this.$router.push({
                    path:'/updatePrice',
                    query:{
                        row:row,
                        Freight:true
                    }
                })
            },
            // 发货
            handleDelivery(row){
                this.$router.push({
                    path:'/updatePrice',
                    query:{
                        row:row,
                        Delivery:true
                    }
                })
                // this.$patch(`/shop/good-orders/${row.id}/shipping`).then(res=>{
                //     this.$message.success("提交成功")
                // })
            },
            handleDelete(row){
                this.$deleted(`/shop/good-orders/${row.order_id}`).then(res=>{
                    this.$message.success("提交成功")
                    this.getList()
                })
            }
        }
    };
</script>

<style scoped>

</style>
