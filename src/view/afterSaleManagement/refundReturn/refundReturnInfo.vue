<template>
    <div class="refundReturnInfo">
        <h3>退货退款状态:{{this.refundForm.process_status_name}}</h3>
        <h3>退货退款信息:</h3>
        <div style="padding-left: 40px">
            <p v-if="this.refundForm.refund_reason"> 退货退款原因:<span>{{this.refundForm.refund_reason}}</span></p>
            <p v-if="this.refundForm.rrefund_amount">退货退款金额:<span>{{this.refundForm.refund_amount}}</span></p>
            <p v-if="this.refundForm.refund_des">退货退款说明:<span>{{this.refundForm.refund_des}}</span></p>
            <p v-if="this.refundForm.refund_pictures!==null">退货退款凭证:<img :src=this.refundForm.refund_pictures alt="" v-if="this.refundForm.refund_pictures!==null" style="width: 80px;height:80px;vertical-align: middle"></p>
            <p >处理时间:<span>{{this.refundForm.shop_process_time}}</span></p>
        </div>
        <h3 v-if="this.refundForm.appeal">申诉信息:</h3>
        <div style="padding-left: 40px">
            <p v-if="this.refundForm.appeal"> <span>{{this.refundForm.appeal.updated_at}}</span><span>{{this.refundForm.appeal.context}}</span><span>{{this.refundForm.appeal.reason}}</span></p>

        </div>
        <h3 v-if="this.refundForm.logistics">物流信息:</h3>
        <div style="padding-left: 40px" v-if="this.refundForm.logistics">
            <p v-for="(item,index) in this.refundForm.logistics.detail" :key="index" style="width: 700px">
                <span > {{item.time}}</span>
                <span > {{item.context}}</span>
            </p>
        </div>
        <h3>商品信息:</h3>
        <customTable
                :columns="columns"
                :tableData="tableData"
                :operation=false
        >
        </customTable>
</div>
</template>

<script>
    import customTable  from '../../../components/custom-table/customTable';
    export default {
        name: 'refundReturnInfo',
        components:{
            customTable
        },
        data(){
            return{
                tableData:[],
                refundForm:{},
                columns:[
                    {src:true, label:'商品图片'},
                    {prop:'good_name', label:'商品标题'},
                    {prop:'sku_real_amount', label:'单价'},
                    // {prop:'advertisingName', label:'数量'},
                    // {prop:'advertisingName', label:'优惠'},
                    {prop:'sku_amount', label:'总价'},
                ],
            }
        },
        mounted() {
            this.getInfo()
        },
        methods:{
            getInfo(){
                this.$getApi(`/shop/good-return-refunds/${this.$route.query.row.id}`).then(res=>{
                    console.log(res,"res")
                    this.refundForm=res.data.data
                    this.tableData.push(this.refundForm)
                    this.tableData.map(item=>{
                            item.good_name=item.order_item.good_name
                            item.piceure=item.order_item.good_info.images[0]
                            item.sku_amount=item.order_item.sku_amount
                            item.sku_real_amount=item.order_item.sku_real_amount
                    })

                    // this.tableData=
                }).catch(err=>{

                })
            }
        }
    };
</script>

<style scoped>
    .refundReturnInfo{
        width: 100%;
        padding-left: 10%;
        padding-top: 3%;
    }
    p{
        line-height: 40px;
    }
</style>
