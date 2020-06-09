<template>
    <div class="refundReturnInfo">
        <h3>交易状态:{{this.refundForm.process_status_name}}</h3>
        <h3 v-if="this.refundForm.logistics">物流信息:</h3>
        <div style="padding-left: 40px" v-if="this.refundForm.logistics">
            <p v-for="(item,index) in this.refundForm.logistics.detail" :key="index" style="width: 700px">
                <span > {{item.time}}</span>
                <span > {{item.context}}</span>
            </p>
        </div>
        <h3 v-if="this.refundForm.logistics">发票信息:</h3>
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
    import customTable  from '../../components/custom-table/customTable';
    export default {
        name: 'orderInfo',
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
                this.$getApi(`/shop/good-orders/${this.$route.query.row.order_id}`).then(res=>{

                    this.refundForm=res.data.data
                    this.tableData=this.refundForm.items
                    console.log( this.tableData,"res")
                    this.tableData.map(item=>{
                        // item.good_name=item.order_item.good_name
                        item.piceure=item.good_info.images[0]
                        item.sku_amount=item.sku_amount
                        // item.sku_real_amount=item.order_item.sku_real_amount
                        console.log(item,"item")
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
