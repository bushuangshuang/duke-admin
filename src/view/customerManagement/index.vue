<template>
    <div class="custrom-box">
        <customTable
                :searchForm="searchForm"
                :tableData="tableData"
                :columns="columns"
                :operates="operates"

        >
        </customTable>
    </div>
</template>

<script>
    import customTable from '../../components/custom-table/customTable';
    export default {
        name: 'index',
        components:{
            customTable
        },
        data(){
            return{
                tableData:[
                    {
                        good:'1111'
                    },
                ],
                columns:[
                    {prop:'customerInformation', label:'客户信息'},
                    {prop:'transactionAmount', label:'交易金额(元)'},
                    {prop:'numberTransactions', label:'交易笔数(笔)'},
                    {prop:'averageTransactionAmount', label:'平均交易金额(元)'},
                    {prop:'collectionShopNot', label:'是否收藏店铺'},
                    {prop:'lastTradingTime', label:'上次交易时间'},
                ],
                searchForm:[
                    {type:'Input',label:'买家昵称:',prop:'buyersNickname'},

                    {type:'interval',label:'交易金额:',prop:'transactionAmount'},
                    {type:'interval',label:'交易笔数:',prop:'numberTransactions'},
                    {type:'interval',label:'上次交易时间',prop:'buyersNickname'},
                    {type:'Select',label:'是否收藏店铺:',options:[{label:'是',value:'是'},{label:'否',value:'否'}]},
                    {type:'button'}
                ],
                operates: {
                    width: 200,
                    fixed: 'right',
                    list: [
                        {
                            id: '1',
                            label: '详情',
                            type: 'warning',
                            show: true,
                            icon: 'el-icon-edit',
                            plain: true,
                            disabled: false,
                            method: (index, row) => {
                                this.handleInfo(index, row)
                            }
                        },
                    ]
                }
            }
        },
        methods:{
            handleInfo(index,row){

            }
        }
    };
</script>

<style scoped>

</style>
