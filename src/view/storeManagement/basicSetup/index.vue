<template>
    <div class="store-box">
        <customForm
                :searchData="searchData"
                :searchForm="searchForm"
                @onAddGoood="onAddGoood"
                :buttonText="buttonText"
                @addressChange="addressChange"
                @onEditorChange="onEditorChange"
                @handleAvatarSuccess="handleAvatarSuccess"
        >
        </customForm>
    </div>
</template>

<script>
    import customForm from '../../../components/custom-form/customForm';
    import { Message } from 'element-ui';
    export default {
        name: 'index',
        components:{
            customForm
        },
        data(){
            return{
                buttonText:'保存',
                storeLogo:'',
                areaCode:[],
                quillEditorContent:'',
                searchData:{},
                searchForm:[
                    {type:'Input',label:'店铺名称:',prop:'storeName',placeholder:'请输入店铺名称 店铺名称一但保存无法修改'},
                    {type:'Upload',label:'店铺标志:'},
                    {type:'textarea',label:'主营业务:',prop:'mainBusiness'},
                    {type:'cascader',prop:"area",label:'经营地址:',},
                    {type:'Input',prop:'detailedAddress',placeholder:'请输入详细地址'},
                    {type:'textarea',label:'店铺介绍:',prop:'shopIntroduced'},
                    {type:'Checkbox',checkboxLabel:'我声明，此页面所填写的内容真实有效'},

                ],
            }
        },
        methods:{
            handleAvatarSuccess(res){
                console.log(res,"imgurl")
                this.storeLogo=res.data[0]
            },
            onAddGoood(){
                console.log(this.searchData,"searchData")
                this.updateStore()
            },
            onEditorChange({ editor, html, text }) {
                this.quillEditorContent = html;
                console.log('0000')
            },
            updateStore(){
                const data={
                    title:this.searchData.storeName,//店铺名
                    image:this.storeLogo,//店铺logo
                    major_bus:this.searchData.mainBusiness,//店铺主营业务
                    area:this.areaCode,//地址code
                    address:this.searchData.detailedAddress,//详细地址
                    description:this.searchData.shopIntroduced,//图文描述

                }
                this.$put('/shop/stores',data).then(res=>{
                    console.log(res,"Res")
                    // if(res==true){
                        Message({
                            message: '店铺保存成功',
                            type: 'success'
                        })
                  this.searchData=null
                    // }
                })
            },
            addressChange(arr){
                this.areaCode=arr
                console.log(arr,"arr")
            }
        }

    };
</script>

<style scoped>
    .store-box{

    }
</style>
