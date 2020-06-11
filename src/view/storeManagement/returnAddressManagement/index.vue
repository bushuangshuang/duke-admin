<template>
    <div class="return-address">
        <p>添加新地址</p>
        <customForm
                :searchData="searchData"
                :searchForm="searchForm"
                @onAddGoood="onAddGoood"
                :buttonText="buttonText"
                @addressChange="addressChange"
            >
        </customForm>
        <customTable
                :tableData="tableData"
                :columns="columns"
                :ButtonList="ButtonList"

        >
        </customTable>
    </div>
</template>

<script>
    import customForm from "../../../components/custom-form/customForm";
    import customTable from '@/components/custom-table/customTable';
    export default {
        name: 'index',
        components:{
            customForm,
            customTable
        },
        data(){
            return{
                buttonText:'提交',
                updateAddress:'',
                AddressId:'',
                areas:[],
                searchData:{},
                tableData:[],
                columns:[
                    {prop:'rcv_name', label:'联系人'},
                    {prop:'areas', label:'所在地区'},
                    {prop:'address', label:'街道地址'},
                    {prop:'post_code', label:'邮政编码'},
                    {prop:'rcv_tel', label:'电话号码'},
                ],
                searchForm:[
                    {type:'Input',label:'联系人:',prop:'contact',placeholder:'请输入联系人姓名'},
                    {type:'cascader',prop:"area",label:'所在地区:',},
                    {type:'Input',prop:'detailedAddress',placeholder:'请输入详细地址',label: "详细地址"},
                    {type:'Input',prop:'zipCode',placeholder:'请输入邮政编码',label: "邮政编码"},
                    {type:'Input',prop:'phoneNumber',placeholder:'请输入电话号码',label: "电话号码"},
                    {type:'Input',prop:'remark',label: "备注"},
                    {type:'Checkbox',checkboxLabel:'是否默认',prop:'is_default'},
                ],
                ButtonList:[
                    {
                        buttonText:'编辑',
                        method: (index, row) => {
                            this.handleEdit(index, row)
                        }
                    },
                    {
                        buttonText:'删除',
                        method: (index, row) => {
                            this.handleDelete(index, row)
                        }
                    }
                ]
            }
        },
        methods:{
            handleEdit(index,row){
                this.updateAddress=true
                this.AddressId=row.id
                this.searchData={
                    contact:row.rcv_name,
                    detailedAddress:row.address,
                    post_code:row.post_code,
                    phoneNumber:row.rcv_tel,
                    remark:row.remark,
                    areas:"22"


                }
                console.log("000",  this.searchData)

            },
            handleDelete(index,row){
                console.log("index",row)
                this.$deleted(`/shop/return-addresses/${row.id}`).then(res=>{
                    this.$message.success("提交成功")
                    this.getAddressList()
                })

            },
            onAddGoood(){
                if(this.updateAddress==true){
                    this.upAddressApi()
                }else{
                    this.addAddressApi()
                }

            },
            addAddressApi(){
                const data={
                    rcv_name:this.searchData.contact,//收货人姓名
                    areas:this.areas,//所在地区
                    address:this.searchData.detailedAddress,//详细地址
                    rcv_tel:this.searchData.phoneNumber,//收货人电话
                    remark:this.searchData.remark,//备注
                    is_default:this.searchData.is_default,//是否默认

                }
                this.$postApi('/shop/return-addresses',data).then(res=>{
                    this.searchData={}
                    this.$message.success("提交成功")
                    this.getAddressList()
                })
            },
            upAddressApi(){
                const data={
                    rcv_name:this.searchData.contact,//收货人姓名
                    areas:this.areas,//所在地区
                    address:this.searchData.detailedAddress,//详细地址
                    rcv_tel:this.searchData.phoneNumber,//收货人电话
                    remark:this.searchData.remark,//备注
                    is_default:this.searchData.is_default,//是否默认

                }
                this.$put(`/shop/return-addresses/${this.AddressId}`,data).then(res=>{
                    this.$message.success("提交成功")
                    this.searchData={}
                    this.getAddressList()
                })
            },
            addressChange(address){
                this.areas=address
            },
            getAddressList(){
                this.$getApi('/shop/return-addresses').then(res=>{
                    console.log(res,"Res")
                    let data=res.data.data
                    data.map(item=>{
                        item.areas.map(itemV=>{
                            item.areas=itemV.name
                        })
                    })
                    this.tableData=data
                }).catch(err=>{

                })
            }
        },
        mounted() {
            this.getAddressList()
        }
    };
</script>

<style scoped>

</style>
