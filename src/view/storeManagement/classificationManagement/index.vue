<template>
    <div>

        <!--表单添加-->
        <el-button type="success" @click="AddListRow()" round>添加行信息</el-button>
        <customTable
                :tableData="tableData"
                :columns="columns"
                :ButtonList="ButtonList"
                :treeData="treeData"

        >
        </customTable>
    </div>
</template>

<script>
    import customTable from "../../../components/custom-table/customTable";
    export default {
        name: 'index',
        components:{
            customTable
        },
        data(){
            return{
                tableData:[],
                treeData:[],
                ButtonList:[
                    {
                        buttonText:'删除',
                        method:(index,row)=>{
                            this.onDisable(index,row)
                        }
                    },
                    {
                        buttonText:'查看',
                        method:(index,row)=>{
                            this.onToView(index,row)
                        }
                    }
                ],
                columns:[
                    {tree:true,},
                    {label:'分类名称',prop:'name'},
                    {label:'创建时间',prop:'created_at'},
                ],
            }
        },
        mounted() {
            this.getList()
        },
        methods:{
            AddListRow() {
                this.tableData.push({

                });
            },
            getList(){
                this.$getApi('/shop/store-categories').then(res=>{
                    let data=res.data.data
                    this.tableData=data
                    this.tableData.map(item=>{
                        console.log(item.children,"item")
                        if(item.children){
                            item.label=item.name
                            item.children.map(itemV=>{
                                itemV.label=itemV.name
                                console.log(itemV,"itemv")

                            })
                        }
                        this.treeData=item.children
                    })

                    console.log("this.tableData",this.tableData)
                })
            },
            onToView(index,row){

            }
        },

    };
</script>

<style scoped>

</style>
