<template>
    <div class="addCoupon-box">
        <customForm
                :dayForm="dayForm"
                :searchData="searchData"
                :searchForm="searchForm"
                :buttonText="buttonText"
                @onAddGoood="onAddGoood"

        >
        </customForm>
    </div>
</template>

<script>
    import customForm from '../../../components/custom-form/customForm';
    export default {
        name: 'addCoupon',
        components:{
            customForm
        },
        data(){
            return{
                buttonText:'提交',
                searchData:{},
                dayForm:{
                    dayNumber:''
                },
                searchForm:[
                    {
                        prop:"couponType",
                        type:'Select',label:'优惠券类型:',
                        options:[{label:'现金券',value:'1'},{label:'满减卷',value: '2'},],
                        change(){

                        }
                    },
                    {type:'textarea',label:'优惠券名称:',prop:'name'},
                    {type:'Input',prop:'amount',placeholder:'面值',label:'面值:'},
                    {type:'Input',prop:'stock',placeholder:'总发行量',label:'总发行量:'},
                    {type:'Input',prop:'per_limit',placeholder:'每人限领',label:'每人限领'},
                    {type:'Radio',label:'使用条件',
                        typeT:'date',
                        radios:[{label:'无门槛',value:'1'},{label:'满',value:'2',    Radio:'input',prop:'reduction',text:'元'}],


                        change(){
                        console.log(this.searchData,"sarch")
                            console.log("999")
                        }
                    },
                    {type:'Radio',label:'有效期',
                        prop:'expire_type',

                        radios:[
                            {label:'日期范围',value:'3', typeT:'date',},
                            {label:'有效天数',value:'4',  Radio:'input',prop:'daynumber',text:'天'},
                            ],
                        placeholder:'领取后到期天数',
                        change(itemType){
                        console.log("999item",itemType)
                            if(itemType==3){
                                this.searchData.expire_type='2'
                            }else if(itemType=4){
                                this.searchData.expire_type='1'
                            }
                        }
                    },
                    {type:'Radio',
                        prop:'serviceableGoods',
                        label:'可使用商品',radios:[{label:'全部商品',value:'7'},{label:'指定商品',value:'8'}],
                        change(){
                            console.log(this.searchData,"sarch")
                            console.log("999")
                        }
                    },
                    {type:'isShowAdd',label:'添加商品:',prop:'SpecificationsText'},
                    {type:'textarea',label:'备注:',prop:'mainBusiness'},

                ],
            }
        },
        methods:{
            getGoodList(){
                this.$getApi('/shop/goods').then(res=>{
                    console.log(res,"res")
                })
            },
            onAddGoood(){
                console.log("111",this.searchData,)

                this.addCouponApi()

            },
            addCouponApi(){
                const data={
                    name:this.searchData.name,//优惠券名称
                    amount:this.searchData.amount,//面值
                    stock:this.searchData.stock,//优惠券数量
                    per_limit:this.searchData.per_limit,//每人限领张数
                    threshold:this.searchData.reduction,//门槛值
                    expire_type:'1',//过期类型：1-天数，2-日期区间
                    expire_value:this.searchData.daynumber,//过期值：类型为天数时必须
                    // expire_start_time:'',//过期开始时间：类型为2时必须
                    // expire_end_time:'',//过期借宿时间：类型为2时必须
                    specify_model:[{
                        modelable_type:'1',//模型类型：1-商品
                        modelable_id:'34'//模型id
                    }]
                }
                this.$postApi('/shop/coupons',data).then(res=>{
                    console.log(res,"res")
                  if(res.data.data==true){
                      this.searchData={}
                      this.$message.success('提交成功！');
                  }
                }).catch(err=>{

                })
            }
        },
        mounted() {
            this.getGoodList()
        }

    };
</script>

<style scoped>

</style>
