<template>
    <div class="storeDeposit-box">
        <p>保证金</p>
            <div class="content">
                <li><p>保证金 1000</p>
                    <el-button type="primary" v-if="this.cert_status==true"  @click="onThaw" >解冻</el-button>
                    <el-button type="primary" v-if="this.cert_status==false" @click="pay">缴纳</el-button>
                </li>
                <li class="text">注意：保证金是您开店的基础保证 如果解冻店铺将不能继续运行 解除后保证金将会回到您的账户</li>

            </div>
    </div>
</template>

<script>
    export default {
        name: 'index',
        data(){
            return{
                cert_status:''
            }
        },
        methods:{
            onThaw(){
                const data={
                    apply_reason:'不想开'
                }
                this.$postApi('/shop/uncerts',data).then(res=>{
                    this.$message.success("提交成功")
                    console.log(res,"res")
                })
            },
            getInfo(){
                this.$getApi('/shop/stores').then(res=>{
                    console.log(res,"res")
                    this.cert_status=res.data.data.cert_status
                }).catch(err=>{
                    console.log(err,"err")
                })
            },
            pay(){
                this.$router.push("/dashboard")
            }
        },
        mounted() {

            this.getInfo()
        }
    };
</script>

<style scoped>
    *{
        list-style: none;
    }
    .content{
        padding-left: 40px;
    }
    li{
        display: flex;
        padding-top: 30px;
       /*height: 70px;*/
    }
    p{
        margin-right: 30px;
    }
    .text{
        margin-top: 20px;
    }
</style>
