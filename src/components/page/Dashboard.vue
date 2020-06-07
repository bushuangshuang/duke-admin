<template>
    <div class="homePage-box">
        <div class="content">
            <p class="content-p"> 请先缴纳保证金激活店铺，保证金金额￥1000</p>
            <el-button type="primary" class="content-button" @click="storeActivation">店铺激活</el-button>
        </div>

    </div>
</template>

<script>
export default {
    name: 'dashboard',
    data() {
        return {

        }
    },
    methods:{
        storeActivation(){
            // this.$postApi('/shop/activation/order').then(res=>{
               this.$router.push("/pay")
            // })
        },
        storePay(){
            const data={
                client:'pc',
                pay_method:'wechat'
            }
          this.$postApi('/shop/activation/pay',data).then(res=>{
              console.log(res,"res")
          })
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}
.homePage-box{
    /*position: relative;*/
    display: flex;
    justify-content: center;
    align-items: center;
    height: 500px;
}
.content-p{
    display: block;
    width: 100%;
}
.content-button{
    display: block;
    margin-left: 100px;
    margin-top: 40px;

}
.content{
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    height: auto;

}




</style>
