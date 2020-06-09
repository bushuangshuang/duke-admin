<template>
    <div class="refundInfo">
        <h3>退款状态:{{this.refundForm.process_status_name}}</h3>
        <h3>退款信息:</h3>
        <div style="padding-left: 40px">

            <p v-if="this.refundForm.refund_reason"> 退款原因:<span>{{this.refundForm.refund_reason}}</span></p>
            <p v-if="this.refundForm.rrefund_amount">退款金额:<span>{{this.refundForm.refund_amount}}</span></p>
            <p v-if="this.refundForm.refund_des">退款说明:<span>{{this.refundForm.refund_des}}</span></p>
            <p v-if="this.refundForm.refund_pictures!==null">退款凭证:<img :src=this.refundForm.refund_pictures alt="" v-if="this.refundForm.refund_pictures!==null" style="width: 80px;height:80px;vertical-align: middle"></p>
            <p >处理时间:<span>{{this.refundForm.shop_process_time}}</span></p>
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
    .refundInfo{
        width: 100%;
        padding-left: 10%;
        padding-top: 3%;
    }
    p{
        line-height: 40px;
    }
</style>
