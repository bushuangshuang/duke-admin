<template>
    <div>
        <customTable

                :columns="columns"
                :tableData="tableData"
                :searchForm="searchForm"
                :ButtonList="ButtonList"
        >
        </customTable>
    </div>
</template>

<script>
    import customTable from '@/components/custom-table/customTable.vue'
    export default {
        name: 'activityInfo',
        components:{
            customTable
        },
        data(){
            return{
                // buttonForm: {isShowBatch:true,isShowShelves:false,isShowAdd:true,},
                tableData:[],
                ButtonList:[
                    {
                        buttonText:'删除',
                        method: (index, row) => {
                            this.handleInfo(index, row)
                        }
                    },
                    ],
                searchForm:[
                    {type:'Input',label:'商品名称:'},
                    {type:'button'}
                ],
                columns:[
                    {prop:'model_name', label:'商品名称'},
                    {prop:'good', label:'库存'},
                    {prop:'good', label:'活动中销售数量'},
                ],

            }
        },
        created() {
            this.getActivityInfo()
        },
        methods:{
            getActivityInfo(){
                this.$getApi(`/shop/activities/${this.$route.query.row.id}`).then(res=>{
                    this.tableData=res.data.data.specify_models
                }).catch(err=>{

                })
            }
        },

    };
</script>

<style scoped>

</style>
