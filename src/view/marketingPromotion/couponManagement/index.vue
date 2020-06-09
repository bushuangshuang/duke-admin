<template>
    <div  class="coupons-box">
        <customTable
                :buttonForm="buttonForm"
                :columns="columns"
                :operates="operates"
                :tableData="tableData"
                :searchForm="searchForm"
                :ButtonList="ButtonList"
                @onTableAdd="onTableAdd"
                @onHandleClick="onHandleClick"
        >
        </customTable>
    </div>
</template>

<script>
    import customTable from '@/components/custom-table/customTable.vue'
    import { Message } from 'element-ui';
    export default {
        name: 'index',
        components:{
            customTable
        },
        data(){
            return{
                tableData:[],
                ButtonList:[
                    {
                        buttonText:'编辑',
                        method: (index, row) => {
                            this.handleEdit(index, row)
                        }},
                    {
                        buttonText:'详情',
                        method: (index, row) => {
                            this.handleInfo(index, row)
                        }
                    },
                    {
                        buttonText:'删除',
                        method: (index, row) => {
                            this.handleDelete(index, row)
                        }
                    }
                ],
                buttonForm: {isShowBatch:true,isShowShelves:false,isShowAdd:true,},
                operates: {
                    width: 200,
                    fixed: 'right',
                    list: [
                        {
                            id: '1',
                            label: '编辑',
                            type: 'warning',
                            show: true,
                            icon: 'el-icon-edit',
                            plain: true,
                            disabled: false,
                            method: (index, row) => {
                                this.handleEdit(index, row)
                            }
                        },
                        {
                            id: '2',
                            label: '删除',
                            type: 'danger',
                            icon: 'el-icon-delete',
                            show: true,
                            plain: false,
                            disabled: false,
                            method: (index, row) => {
                                this.handleDel(index, row)
                            }
                        }
                    ]
                },
                columns:[
                    {prop:'name', label:'优惠券名称'},
                    {prop:'good', label:'优惠卷类型'},
                    {prop:'good', label:'可使用商品'},
                    {prop:'good', label:'使用条件'},
                    {prop:'amount', label:'面值'},
                    {prop:'periodValidity', label:'有效期'},
                    {prop:'good', label:'状态'},
                ],
                searchForm:[
                    {type:'Input',label:'优惠券名称:'},
                    {type:'Select',label:'优惠券类型:'},
                    {type:'interval',label:'有效期:'},
                    {type:'Select',label:'状态:'},
                    {type:'button'}
                ],
            }
        },
        methods:{
            getCouponsList(){
                this.$getApi('/shop/coupons').then(res=>{

                    let data=res.data.data
                    this.tableData=data
                    data.map((item)=>{
                        item.periodValidity=`${item.expire_start_time}-${item.expire_end_time}`
                    })
                    console.log(data,"res")
                })
            },
            handleDelete(index,row){
                this.$deleted(`/shop/coupons/${row.id}`).then(res=>{
                    Message({
                        message: '优惠券删除成功',
                        type: 'success'
                    })
                    this.getCouponsList()
                })
            },
            onTableAdd(){
                this.$router.push('/addCoupon')
            },
            onHandleClick(){

            },
            handleInfo(index,row){
                this.$router.push({
                    path:'/couponInfo',
                    query:{
                        row:row
                    }
                })
            },
            handleEdit(index,row){
                this.$router.push('/addCoupon')
            }
        },
        mounted() {
            this.getCouponsList()
        }
    };
</script>

<style scoped>

</style>
