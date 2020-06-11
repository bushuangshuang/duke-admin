<template>
    <div class="freightTemplate-box">
        <customForm
             :searchForm="searchForm"
             :searchData="searchData"
             :buttonText="buttonText"
             @onAddGoood="onAddGoood"
             @addressChange="addressChange"
        >
        </customForm>
    </div>
</template>

<script>
    import customForm from "../../../components/custom-form/customForm";
    export default {
        name: "freightTemplate",
        components:{
            customForm
        },
        data(){
            return{
                buttonText:'提交',
                areas:[],
                shipping:'',
                valuation_methodT:'',
                searchForm: [
                                { type: "title", value: "新增运费模板", marginLeft:'-100px'},
                                { type: "Input", label: "模板名称:", prop: "templateName" },
                                {
                                    type: "Radio",
                                    label: "是否包邮",
                                    radios: [
                                        { label: "自定义运费", value: 1},
                                        { label: "包邮", value: 2 },
                                    ],
                                    prop: "shipping_type",
                                    change(value){
                                        this.shipping=value
                                        if(value==1){

                                        }
                                    }
                                },
                                {
                                    type: "Radio",
                                    label: "计件方式",
                                    radios: [
                                        { label: "按件数", value: 1 },
                                        { label: "按重量", value: 2 },
                                        { label: "按体积", value: 3 }
                                    ],
                                    prop: "valuation_method",
                                    change(value){
                                            this.valuation_methodT=value
                                        console.log(this.valuation_methodT,"valuation_methodT")
                                    }
                                },
                                {
                                   type:'shippingMethod',
                                    label:'运送方式',
                                    defaultNum:'defaultNum',
                                    defaultPrice:'defaultPrice',
                                    customeNumber:'customeNumber',
                                    customePrice:'customePrice',

                                },
                                 // {type:'cascader',prop:"area",label:'所在地区:',},
                    ],
                searchData:{}

            }
        },
        methods:{
            onAddGoood(){
                if(this.$route.query.update==true){
                    this.updateApi()
                }else{
                    this.addApi()
                }

            },
            addressChange(address){
                this.areas=address
            },
            addApi(){
                const data={
                    name:this.searchData.templateName,//模板名称
                    shipping_type:this.searchData.shipping_type,//运费类型 1 自定义 2包邮
                    valuation_method:this.searchData.valuation_method,//计价方式 运费类型为1时必须 1 按件数 2 按重量 3按体积
                     default:{
                         init_num:this.searchData.defaultNum,//默认运费初始计价初始值运费类型为1-时必须）
                         init_price:this.searchData.defaultPrice,//默认运费初始费用（运费类型为1-时必须）
                         incre_num:this.searchData.customeNumber,//默认运费递增数量类型为1-时必须）
                         incre_price:this.searchData.customePrice,//默认运费递增数量类型为1-时必须）
                     },
                    // specify:{
                    //      areas:this.areas,
                    //     custome:{
                    //         incre_num: this.searchData.customeNumber,//递增计价数量
                    //         incre_price: this.searchData.customePrice,//递增计价价格
                    //         init_num: this.searchData.defaultNum,//自定义区域计价初始值
                    //         init_price: this.searchData.defaultNum,//自定义区域计价初费用
                    //     }
                    // }
                }
                this.$postApi('/shop/templates',data).then(res=>{
                    console.log("res",res)
                })
            },
            isUpdate(){
                if(this.$route.query.update==true){
                    console.log(this.$route.query.row.name)
                    this.searchData={
                        templateName:this.$route.query.row.name,
                        shipping_type:this.$route.query.row.shipping_type,
                        valuation_method:this.$route.query.row.shipping_type,
                        defaultNum:this.$route.query.row.default.init_num,
                        defaultPrice:this.$route.query.row.default.init_price,
                        customeNumber:this.$route.query.row.default.incre_num,
                        customePrice:this.$route.query.row.default.incre_price,
                    }
                }
            },
            updateApi(){
                const data={
                    name:this.searchData.templateName,//模板名称
                    shipping_type:this.searchData.shipping_type,//运费类型 1 自定义 2包邮
                    valuation_method:this.searchData.valuation_method,//计价方式 运费类型为1时必须 1 按件数 2 按重量 3按体积
                    default:{
                        init_num:this.searchData.defaultNum,//默认运费初始计价初始值运费类型为1-时必须）
                        init_price:this.searchData.defaultPrice,//默认运费初始费用（运费类型为1-时必须）
                        incre_num:this.searchData.customeNumber,//默认运费递增数量类型为1-时必须）
                        incre_price:this.searchData.customePrice,//默认运费递增数量类型为1-时必须）
                    },
                    // specify:{
                    //      areas:this.areas,
                    //     custome:{
                    //         incre_num: this.searchData.customeNumber,//递增计价数量
                    //         incre_price: this.searchData.customePrice,//递增计价价格
                    //         init_num: this.searchData.defaultNum,//自定义区域计价初始值
                    //         init_price: this.searchData.defaultNum,//自定义区域计价初费用
                    //     }
                    // }
                }
                this.$postApi(`/shop/templates/${this.$route.query.row.id}`,data).then(res=>{
                    console.log("res",res)
                })
            }
        },
        mounted() {
            this.isUpdate()
        }
    }
</script>

<style scoped>

</style>
