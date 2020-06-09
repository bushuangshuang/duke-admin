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
        name: 'addActivity',
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
                        type:'Select',label:'活动类型:',
                        options:[{label:'限时打折',value:'1'}],
                        change(){

                        }
                    },
                    {type:'Input',label:'活动名称:',prop:'name'},
                    {type:'DateEnd',prop:'periodValidity',placeholder:'有效期',label:'有效期:'},
                    {type:'Radio',label:'可使用商品',
                        prop:'date',
                        radios:[{label:'全部商品',value:'1'},{label:'指定商品',value:'2',    }],
                        change(){
                            console.log(this.searchData,"periodValidity")
                            console.log("999")
                        }
                    },
                    {type:'isShowAdd',label:'添加商品:',prop:'SpecificationsText'},
                    {
                        type:'Input',label:'设置折扣',prop:'discount'
                    }
                ],
            }
        },
        methods:{
            getGoodList(){
                this.$getApi('/shop/goods').then(res=>{

                })
            },
            onAddGoood(){
                console.log("111",this.searchData,)

                this.addCouponApi()

            },
            addCouponApi(){
                const data={
                    name:this.searchData.name,//活动名称
                    start_time:this.searchData.periodValidity[0],//开始时间
                    end_time:this.searchData.periodValidity[1],//结束时间
                    specify_model:[{
                        modelable_type:'1',//模型类型：1-商品
                        modelable_id:'34',//模型id
                        discount:1,//折扣值
                    }],
                    discount:this.searchData.discount,
                }
                this.$postApi('/shop/activities',data).then(res=>{
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
