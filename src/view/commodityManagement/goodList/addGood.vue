<template>
    <div class="good-box">
            <customForm
                    :FormTwo="FormTwo"
                    :options="options"
                    :searchForm="searchForm"
                    :elStepList="elStepList"
                    :searchData="searchData"
                    :editorOption="editorOption"
                    :SpecificationsList="SpecificationsList"
                    :colorList="colorList"
                    :ruleInfoForm="ruleForm"
                    :content="content"
                    @onEditGood="onEditGood"
                    @onAddGoood='onAddGoood'
                    @onCascaderChange="onCascaderChange"
                    @addSpecifications="addSpecifications"
                    @addSpecificationsColor="addSpecificationsColor"
            >
            </customForm>
    </div>
</template>

<script>
    import customForm from '@/components/custom-form/customForm';
    export default {
        name: 'addGood',
        components:{
            customForm
        },
        data(){
            return{
                content:'',
                editorOption:{
                    placeholder:'22'
                },
                ruleForm:{
                    goodTitle:[{ required: true, message: '商品标题不能为空', trigger: 'blur' }]
                },
                colorList:[],
                searchData:{},
                SpecificationsList:[
                ],
                searchForm:[
                    {type:'title',value:'基础信息',marginLeft:'-100px'},
                    {type:'Input',label:'商品标题:',prop:'goodTitle'},
                    {type:'title',value:'类目属性',marginLeft:'-100px'},
                    {type:'Select',label:'品牌:',options:[{label:'1',value:'2'}]},
                    {type:'Select',label:'材质:'},
                    {type:'Select',label:'产地:'},
                    {type:'Checkbox',label:'宝贝定制',checkboxLabel:'支持定制'},
                    {type:'title',value:'销售信息',marginLeft:'-100px'},
                    {type:'isShowAdd',label:'规格组:',prop:'SpecificationsText'},
                    {type:'Specifications'},
                    {type:'skuList'},
                    {type:'specificationColorInput',prop:'specificationColorInput'},
                    {type:'Input',label:'一口价:',prop:'allPice'},
                    {type:'Input',label:'总数量:',prop:'allNumber'},
                    {type:'title',value:'图文描述',marginLeft:'-100px'},
                    {type:'Upload',label:'图片'},
                    {type:'quillEditor'},
                    {type:'Select',label:'店铺中分类:'},
                    {type:'title',value:'支付方式',marginLeft:'-100px'},
                    {type:'Radio',label:'付款方式',radios:[{label:'一口价(普通交易模式)',}]},
                    {type:'Radio',label:'库存计数',radios:[{label:'买家拍下减库存',},{label:'买家付款减库存',}]},
                    {type:'title',value:'物流信息',marginLeft:'-100px'},
                    {type:'Radio',label:'提取方式',radios:[{label:'使用物流配送',}]},
                    {type:'Select',label:'运费模板:'},
                    {type:'NewFreightTemplate',},
                    {type:'title',value:'售后服务',marginLeft:'-100px'},
                    {type:'Radio',label:'是否提供发票',radios:[{label:'是',},{label:'否',}]},
                    {type:'Checkbox',label:'退换货承诺',checkboxLabel:'不支持退换货'},
                    {type:'Radio',label:'上架时间',radios:[{label:'立即上架',},{label:'放入仓库',}]},
                    {type:'Input',label:'发货时间:',prop:'deliveryTime'},
                ],
                FormTwo:[
                    {type:'Steps'},
                    {type:'ElCasCader'},
                ],
                elStepList:[
                    {title:'选择商品分类'},
                    {title:'填写商品信息'}
                ],
                options:[
                    {
                        value: '1',
                        label: '2',
                        children:[
                            {
                                value: '指南',
                                label: '指南1',
                            }
                        ]
                    }
                ]
            }
        },
        methods:{
            onCascaderChange(arr){
                console.log(arr,"arr")

                this.options.map((item)=>{
                        arr.map(itemV=>{

                        })
                })
            },
            getClassificationGoods(){
                    this.$getApi(`/api/good-categories`).then(res=>{
                        let data=res.data.data
                        console.log(data,"Res")
                        data.map((item)=>{
                            item.label=item.name
                            item.value=item.id
                            if(item.children){
                                item.children.map(itemV=>{
                                    itemV.label=itemV.name
                                    itemV.value=itemV.id
                                })
                            }
                            this.options=data
                        })
                    })
            },
            getBrands(){
               this.$getApi(`/shop/brands`).then(res=>{
                   console.log(res,"res")
               })
            },
            addGoodApi(data){
                this.$postApi(`/shop/goods`,data).then(res=>{
                    if(res.data){
                        this.$message.success('提交成功！');
                    }

                })
            },
            onAddGoood(){
                console.log(this.searchData,"searchData")
                    // const data={
                    //     categories:22,
                    //         title:this.searchData.goodTitle,

                    //
                    // }
                    // this.addGoodApi(data)
            },
            onEditGood(){
                console.log("000")
            },
            addSpecifications(){
                 this.SpecificationsList.push(
                     {
                         specificationTitle:this.searchData.SpecificationsText,
                         type:'specificationColorInput',
                         prop:'specificationColorInput',
                         colorList:[],
                         index:this.SpecificationsList.length,
                         ss:'skuList'
                     })
            },
            addSpecificationsColor(item){
                    let colorItem=item.colorList
                    let colorList=[]
                    item.colorList.push({type:'ColorInput',prop:this.searchData.specificationColorInput})
                    colorItem.map((item)=>{
                        console.log(item,"itemColor")

                    })
            },

        },
        mounted() {
            this.getClassificationGoods()
            // this.getBrands()
        }
    };
</script>

<style scoped>

</style>
