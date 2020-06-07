<template>
    <div class="refundInfo">
        <div>
            <p>当前退款状态:买家申请金额:{{this.refundForm.refund_amount}}</p>
            <p v-if="this.refundForm.process_status=='refunding'">如果卖家不确认</p>
            <p v-if="this.refundForm.process_status=='refunding'">
                <el-button type="primary">同意申请</el-button>
                <el-button type="primary">拒绝申请</el-button>
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'refundInfo',
        components:{

        },
        data(){
            return{
                refundForm:{

                }
            }
        },
        created() {
            console.log(this.$route.query.row.order_item.sale_id,"this.$route.query.row")
            this.getInfo()
        },
        updated() {
            console.log("11")
        },
        methods:{
            getInfo(){
                this.$getApi(`/shop/good-refunds/${this.$route.query.row.order_item.sale_id}`).then(res=>{

                    this.refundForm=res.data.data
                    console.log(this.refundForm,"Res")
                })
            }
        },

    };
</script>

<style scoped>

</style>
