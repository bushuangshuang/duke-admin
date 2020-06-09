<template>
    <div>
        <customForm
                :searchData="searchData"
                :searchForm="searchForm"
                :buttonText="buttonText"
                @onAddGoood="onAddGoood"
        >
        </customForm>
    </div>
</template>

<script>
    import customForm from "../../components/custom-form/customForm";
    export default {
        name: "updatePrice",
        components:{
            customForm
        },
        data(){
            return{
                searchData:{},
                shop_logistic_id:"",
                buttonText:'确定',
                searchForm:[
                    {type:'Input',label:'修改后价格',prop:'newPrice',placeholder:'请输入修改后的商品价格'},

                ],
            }
        },
        mounted() {
            this.getInfo()
            // this.searchForm=[
            //     {type:'Select',label:'物流',prop:'shop_logistic_id',options:[],
            //         change(prop){
            //
            //         }
            //     },
            //     {type:'Input',label:'物流订单号',prop:'newFreight',placeholder:'请输入物流订单号'},
            // ]
            // this.$getApi('/api/logistics-providers').then(res=>{
            //
            //     let data=res.data.data
            //     data.map(item=>{
            //         item.label=item.name
            //         item.value=item.id
            //     })
            //     this.searchForm[0].options=data
            //     console.log(res,"res")
            // })
        },
        methods:{
            onAddGoood(){
                if(this.$route.query.price==true){
                    const data={
                        amount:this.searchData.newPrice
                    }
                    this.$patch(`/shop/good-orders/${this.$route.query.row.id}/amount`,data).then(res=>{
                        this.$message.success("提交成功")
                        this.$router.go(-1)
                    })
                }else if(this.$route.query.Freight==true){
                    const data={
                        amount:this.searchData.newFreight
                    }
                    this.$patch(`/shop/good-orders/${this.$route.query.row.id}/freight`,data).then(res=>{
                        this.$message.success("提交成功")
                        this.$router.go(-1)
                    })
                }else if(this.$route.query.Delivery==true){
                                const data={
                                    shop_logistic_id:this.shop_logistic_id,
                                    logistics_code:this.searchForm.logistics_code
                                }
                            this.$patch(`/shop/good-orders/${this.$route.query.row.order_id}/shipping`,data).then(res=>{
                                    this.$message.success("提交成功")
                            })
                }
            },
            getInfo(){
                if(this.$route.query.price==true){
                    this.searchForm=[
                        {type:'Input',label:'修改后价格',prop:'newPrice',placeholder:'请输入修改后的商品价格'},

                    ]
                }else if(this.$route.query.Freight==true){
                    this.searchForm=[
                        {type:'Input',label:'修改后运费',prop:'newFreight',placeholder:'请输入修改后的运费'},

                    ]
                }else if(this.$route.query.Delivery==true){
                    this.searchForm=[
                        {type:'Select',label:'物流',prop:'shop_logistic_id',options:[]},
                        {type:'Input',label:'物流订单号',prop:'newFreight',placeholder:'请输入物流订单号'},
                    ]
                    this.searchForm=[
                        {type:'Select',label:'物流',prop:'shop_logistic_id',options:[],
                            change(prop){
                                this.shop_logistic_id=prop
                            }
                        },
                        {type:'Input',label:'物流订单号',prop:'logistics_code',placeholder:'请输入物流订单号'},
                    ]
                    this.$getApi('/api/logistics-providers').then(res=>{

                        let data=res.data.data
                        data.map(item=>{
                            item.label=item.name
                            item.value=item.id
                        })
                        this.searchForm[0].options=data
                        console.log(res,"res")
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
