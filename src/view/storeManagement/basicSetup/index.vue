<template>
    <div class="store-box">
        <customForm

                :searchData="searchData"
                :searchForm="searchForm"
                @onAddGoood="onAddGoood"
                @onEditorChange="onEditorChange"
        >
        </customForm>
    </div>
</template>

<script>
    import customForm from '../../../components/custom-form/customForm';
    export default {
        name: 'index',
        components:{
            customForm
        },
        data(){
            return{
                quillEditorContent:'',
                searchData:{},
                searchForm:[
                    {type:'Input',label:'店铺名称:',prop:'storeName',placeholder:'请输入店铺名称 店铺名称一但保存无法修改'},
                    {type:'Upload',label:'店铺标志:'},
                    {type:'textarea',label:'主营业务:',prop:'mainBusiness'},
                    {type:'Select',label:'经营地址:',placeholder:'省'},
                    {type:'Select',placeholder:'市'},
                    {type:'Select',placeholder:'区'},
                    {type:'Input',prop:'detailedAddress',placeholder:'请输入详细地址'},
                    {type:'quillEditor',label:'店铺介绍:',prop:'shopIntroduced'},
                    {type:'Checkbox',checkboxLabel:'我声明，此页面所填写的内容真实有效'},
                ],
            }
        },
        methods:{
            onAddGoood(){
                console.log(this.searchData,"searchData")
            },
            onEditorChange({ editor, html, text }) {
                this.quillEditorContent = html;
                console.log('0000')
            },
        }

    };
</script>

<style scoped>
    .store-box{

    }
</style>
