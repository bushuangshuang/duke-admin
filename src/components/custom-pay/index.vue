<template>
    <div class="payment">
        <div class="tt">付款</div>

        <div class="gozhifu">
            <div class="jine">
                <span class="jinemiao">支付金额：</span>
            </div>
            <el-radio-group v-model="radio" @change="onRadioChange" style="margin-bottom: 10px;" fill="#89E617" text-color="#89E617">
                <el-radio :label="1">支付宝</el-radio><br />
                <el-radio :label="2">微信</el-radio><br />
            </el-radio-group>
            <el-button class="go" type="text" v-if="this.radio==1" @click="zhifubao">去支付</el-button>
            <el-button class="go" type="text" v-if="this.radio==2" @click="weixin">去支付</el-button>

            <el-dialog title="确认付款" :visible.sync="dialogVisible">
                <span slot="footer" class="dialog-footer">
			    	<el-button type="primary" @click="onSubmit">确认支付{{this.jin}}</el-button>
			  	</span>
            </el-dialog>
        </div>
        <div class="yin" v-show="weixin1">
            <div class="yincon" style="width: 500px;height: 420px;">
<!--                <i class="el-icon-close chacha" @click="que"></i>-->
                <div style="margin-bottom: 20px;font-size: 18px;">微信支付</div>
                <div style="color: #979998;margin-bottom: 10px;">请使用微信扫码支付</div>
                <div style="width: 100%;text-align: center;margin: 0 auto;">
                    <div id="qrcode" ref="qrcode" style="display: inline-block;"></div>
                </div>
                <span class="queren" @click="que">确认</span>
            </div>
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcodejs2'
    export default {
        // inject: ['reload'],
        data() {
            return {
                radio:'',
                user:'',
                jin:'',
                name:'',
                weixin1:false,
                form:{},
                dialogVisible:false,
                pay_method:''
            }
        },
        methods:{
            zhifubo(){
            },
            weixin(){
                this.weixin1=true
                // this.qrcode('weixin://wxpay/bizpayurl?pr=09ZEr8X')
                // this.weixin1=true
                this.payApi()
                // console.log("11")
            },
            onRadioChange(){
                switch (this.radio) {
                    case 1:
                        this.pay_method='alipay'
                        break;
                    case 2:
                        this.pay_method='wechat'
                        break;
                }
            },
            onSubmit(){

            },
            que(){
                this.weixin1=false
                this.$router.push("/goodList")
            },
            payApi(){
                const data={
                    client:'pc',
                    pay_method:this.pay_method,
                }
                this.$postApi('/shop/activation/pay',data).then(res=>{
                    // this.weixin1=false
                    console.log(res.data,"res")
                    this.qrcode(res.data.code_url)
                })
            },
            qrcode (url) {
                let qrcode = new QRCode('qrcode',{
                    width: 200, // 设置宽度，单位像素
                    height: 200, // 设置高度，单位像素
                    text: url // 设置二维码内容或跳转地址
                })
            }

        }
    }

</script>

<style scoped="scoped">
    .payment{
        width: 1200px;
        overflow: hidden;
        margin: 0 auto;
        margin-top: 30px;
        min-height:961px;
    }
    .payment .tt{
        font-size:24px;
        font-weight:400;
        color:rgba(31,33,32,1);
        line-height:24px;
        margin-bottom: 30px;
    }
    .success .img11{
        width: 40px;
        height: 40px;
        float: left;
        margin-right: 20px;
        font-size: 40px;
        color: #89E617;
    }
    .success .span1{
        display: block;
        font-size:16px;
        font-weight:400;
        color:rgba(31,33,32,1);
        line-height: 16px;
    }
    .success .span2{
        display: block;
        font-size:14px;
        font-weight:400;
        color:rgba(31,33,32,1);
        line-height: 14px;
        margin-top: 10px;
    }
    .gozhifu{
        width:1200px;
        height:290px;
        background:rgba(255,255,255,1);
        border:1px solid rgba(237,237,237,1);
        margin-top: 30px;
        padding: 20px;
    }
    .mc{
        font-size:14px;
        font-weight:400;
        color:rgba(31,33,32,1);
        line-height:14px;
        margin-bottom: 20px;
    }
    .jine{
        margin-bottom: 20px;
    }
    .jinemiao{
        font-size:14px;
        font-weight:400;
        color:rgba(31,33,32,1);
        line-height: 14px;
        position: relative;
        top: -4px;
        margin-right: 10px;
    }
    .jine .price{
        font-size:24px;
        font-weight:bold;
        color:rgba(253,69,25,1);
        line-height: 24px;
    }
    .zhye{
        text-align: center;
        margin-bottom: 30px;
    }
    .zhye .zhyemiao{
        font-size:14px;
        font-weight:bold;
        color:rgba(31,33,32,1);
        line-height:14px;
        position: relative;
        top: -4px;
        margin-right: 20px;
    }
    .zhye .zhyepri{
        font-size:24px;
        font-weight:bold;
        color:rgba(253,69,25,1);
        line-height: 24px;
    }
    .el-radio{
        margin-right: 0;
        margin-bottom: 20px;
    }
    .go{
        display: block;
        width:160px;
        height:40px;
        background:rgba(137,230,23,1);
        border-radius:4px;
        font-size:16px;
        font-weight:400;
        color:rgba(255,255,255,1);
        text-align: center;
    }
    .el-radio{
        font-size:14px;
        font-weight:400;
        color:rgba(31,33,32,1);
    }
    .order .el-step__title.is-process{
        font-size: 14px;
        color: #89E617;
        text-align: center;
    }
    .order .el-step__main{
        text-align: center;
        font-size: 14px;
        color: black;
    }
    .order .el-step.is-horizontal .el-step__line{
        position: relative;
        left: 50px;
    }
    .order .el-dialog{
        width: 657px;
        height: 327px;
    }
    .el-icon-close:before{
        width: 16px;
        height: 16px;
        color: #1F2120;
        font-size: 16px;
    }
    .order .el-dialog__header{
        padding-top: 30px;
        padding-left: 30px;
    }
    .el-button--primary{
        width:180px;
        height:40px;
        background:rgba(137,230,23,1);
        border:1px solid rgba(237,237,237,1);
        border-radius:4px;
        position: relative;
        top: -11px;
        left: -260px;
    }
    .el-select{
        width: 400px;
    }
    .el-textarea{
        width: 400px;
    }
    .el-input{
        width: 400px;
    }
    .el-form-item{
        margin-bottom: 20px;
    }
    .el-dialog__body{
        padding-top: 20px;
    }
    .el-form-item__label{
        font-size:14px;
        font-weight:400;
        color:rgba(31,33,32,1);
    }
    .order .el-radio__input.is-checked .el-radio__inner {
        border-color: #89E617;
        background: #89E617;
    }
    .yin{
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,.4);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
    }
    .yin .yincon{
        width:800px;
        height:600px;
        /* overflow: hidden; */
        background:rgba(255,255,255,1);
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        padding: 30px;
    }
    .yincon .tt1{
        font-size: 18px;
        line-height: 18px;
        color: #1F2120;
        margin-bottom: 20px;
    }
    .yincon i{
        font-size: 20px;
        color: #1F2120;
        position: absolute;
        top: 20px;
        right: 20px;
        cursor: pointer;
    }
    .queren{
        display: inline-block;
        width:120px;
        height:40px;
        background:rgba(137,230,23,1);
        border-radius:4px;
        font-size:16px;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:40px;
        text-align: center;
        margin-top: 40px;
        margin-left: 35%;
    }
</style>
