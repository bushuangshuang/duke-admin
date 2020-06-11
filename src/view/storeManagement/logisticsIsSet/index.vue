<template>
    <div>
        <customTabs
                :columns="columns"
                :tableData="tableData"
                :elTabList="elTabList"
                :buttonForm="buttonForm"
                :activeName="TabactiveName"
                :ButtonList="ButtonList"
                @onHandleClick="onHandleClick"
                @onTableAdd="onTableAdd"
        >
        </customTabs>
    </div>
</template>

<script>
    import customTabs from "../../../components/custom-tabs/customTabs";
    export default {
        name: 'index',
        components:{
            customTabs
        },
        data(){
            return{
                ButtonList:[],
                columns:[
                    {prop:'good', label:'物流公司'},
                    {prop:'good', label:'开通服务商'},
                    {prop:'good', label:'快递状态'},
                ],
                tableData:[],
                TabactiveName:'1',
                buttonForm: {isShowBatch:false,isShowShelves:false,isShowAdd:false,},
                elTabList:[
                    {label:'服务商设置',name:'1'},
                    {label:'运费模板设置',name:'2'},
                ],

            }
        },
        methods:{
            onHandleClick(tab){
                const name=tab.label
                if(name=="服务商设置"){
                        this.getLogisticsProviders()
                    this.buttonForm={isShowBatch:false,isShowShelves:false,isShowAdd:false}
                }else if(name=="运费模板设置"){
                    this.buttonForm={isShowBatch:false,isShowShelves:false,isShowAdd:true}
                        this.getTemplatesList()
                    this. columns=[
                        {prop:'shipping_type_name', label:'模板'},
                        {prop:'good', label:'运送方式'},
                        {prop:'name', label:'运送到'},

                        {prop:'incre_num', label:'收件'},
                        {prop:'init_price', label:'运费'},
                        {prop:'good', label:'续件'},
                        {prop:'good', label:'续费'},
                    ]
                }
            },
            getLogisticsProviders(){
                this.$getApi('/api/logistics-providers').then(res=>{

                    let data=res.data.data
                    data.map(item=>{
                        item.piceure=item.logo
                        if(item.enable==true){
                            this.ButtonList=[
                                {
                                    buttonText:'停用',
                                    method:(index,row)=>{
                                        this.onDisable(index,row)
                                    }
                                }
                            ]
                        }else{
                            this.ButtonList=[
                                {buttonText:'开启'}
                            ]
                        }
                    })
                    this.columns=[
                        {prop:'name', label:'物流公司'},
                        {src:true},
                        {prop:'good', label:'快递状态'},
                    ],

                    this.tableData=data
                    console.log(  this.tableData,"  this.tableData")
                })
            },
            getTemplatesList(){
                this.$getApi("/shop/templates").then(res=>{
                    // console.log(res,"Res")
                    this.ButtonList=[
                        {
                            buttonText:'编辑',
                            method:(index,row)=>{
                                this.handleEdit(index,row)
                            }
                        },
                        {
                            buttonText:'删除',
                            method:(index,row)=>{
                                this.handleDelete(index,row)
                            }
                        }
                    ]
                    let data=res.data.data
                        data.map(item=>{
                            item.incre_num=item.default.incre_num
                            item.init_price=item.default.init_price
                            item.incre_num=item.incre_num
                        })
                    this.tableData=data
                })
            },
            onDisable(index,row){
                const data={
                    enable:false
                }
                this.$patch(`/shop/logistics-providers/${row.id}/enable`,data).then(res=>{
                    this.$message.success("提交成功")
                    this.getLogisticsProviders()
                })
            },
            // 编辑
            handleEdit(index,row){
                    this.$router.push({
                        path:'/freightTemplate',
                        query:{
                            row:row,
                            update:true
                        }
                    })
            },
            // 删除
            handleDelete(index,row){
                    this.$deleted(`/shop/templates/${row.id}`).then(res=>{
                        this.$message.success("提交成功")
                        this.getTemplatesList()
                    })
            },
            // 添加运费模板
            onTableAdd(){
                this.$router.push('/freightTemplate')
            }
        },
        mounted() {
            this.getLogisticsProviders()
        }
    };
</script>

<style scoped>

</style>
