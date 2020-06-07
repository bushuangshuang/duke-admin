<template>
    <div class="couponinfo-box">
        <customTable
                :columns="columns"
                :tableData="tableData"
        >
        </customTable>
    </div>
</template>

<script>
    import customTable from '@/components/custom-table/customTable';
    export default {
        name: 'couponInfo',
        components:{
            customTable
        },
        data(){
            return{
                columns:[
                    {prop:'name', label:'优惠券名称'},
                    {prop:'good', label:'优惠券类型'},
                    {prop:'good', label:'可使用商品'},
                    {prop:'good', label:'使用条件'},
                    {prop:'amount', label:'面值'},
                    {prop:'good', label:'状态'},
                    {prop:'good', label:'有效期'},
                    {prop:'good', label:'总发行量'},
                    {prop:'good', label:'已领取'},
                    {prop:'good', label:'待领取'},
                    {prop:'good', label:'已使用'},
                    {prop:'good', label:'未使用'},
                ],
                tableData:[]
            }
        },
        methods:{
                getInfo(){
                    this.$getApi(`/shop/coupons/${this.$route.query.row.id}`).then(res=>{
                        console.log(res,"res")
                        this.tableData.push(res.data.data)
                    }).catch(err=>{
                        console.log(err,"err")
                    })
                }
        },
        mounted() {
            console.log(this.$route.query.row.id,"row")
            this.getInfo()
        }
    };
</script>

<style scoped>

</style>
