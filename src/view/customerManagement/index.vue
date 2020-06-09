<template>
    <div class="custrom-box">
        <customTable
                :searchForm="searchForm"
                :tableData="tableData"
                :columns="columns"
                :ButtonList="ButtonList"

        >
        </customTable>
        <customDialog :show.sync="show"
                      :columns="columnsDialog"
        >
        </customDialog>
    </div>
</template>

<script>
    import customTable from '../../components/custom-table/customTable';
    import customDialog from '../../components/custom-dialog/customDialog';
    export default {
        name: 'index',
        components:{
            customTable,
            customDialog
        },
        data(){
            return{
                show: false,
                columnsDialog:[
                    {label:'真实姓名',prop:'name'},
                    {label:'手机号码',prop:'name'},
                    {label:'省份城市',prop:'name'},
                    {label:'性别',prop:'name'},
                    {label:'交易次数',prop:'name'},
                    {label:'交易额',prop:'name'},
                    {label:'商品件数',prop:'name'},
                    {label:'平均订单金额',prop:'name'},
                    {label:'交易关闭数',prop:'name'},
                    {label:'是否收藏店铺',prop:'name'},
                    {label:'上次交易时间',prop:'name'},
                    {label:'客户来源',prop:'name'},
                    {label:'收货地址',prop:'name'}
                ],
                ButtonList:[
                    {
                        buttonText:'详情',
                        method: (index, row) => {
                            this.handleInfo(index, row)
                        }},
                ],
                tableData:[
                    {good:'11'}
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
                    {type:'Select',label:'是否收藏店铺:',options:[{label:'是',value:'是'},{label:'否',value:'否'}]},
                    {type:'button'}
                ],
            }
        },
        methods:{
            handleInfo(index,row){
                this.show = true;
            }
        }
    };
</script>

<style scoped>

</style>
