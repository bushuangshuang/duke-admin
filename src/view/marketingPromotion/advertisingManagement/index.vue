<template>
    <div class="activity-box">
        <customTabs
                :elTabList="elTabList"
                :columns="columns"
                :tableData="tableData"
                :searchForm="searchForm"
                :ButtonList="ButtonList"
                :buttonForm="buttonForm"
                @onTableAdd="onTableAdd"
                @onHandleClick="onHandleClick"
        >
        </customTabs>
    </div>
</template>

<script>
    import customTabs from '@/components/custom-tabs/customTabs.vue'
    import customTable from '@/components/custom-table/customTable.vue'
    export default {
        name: 'index',
        components:{
            customTable,
            customTabs
        },
        data(){
            return{
                ShufflingFigure:false,
                Advertising:false,
                tableData:[],
                elTabList:[
                    {label:'轮播图',name:'1'},
                    {label:'广告位',name:'2'},
                ],
                buttonForm: {isShowBatch:true,isShowShelves:false,isShowAdd:true,},
                columns:[
                    {prop:'title', label:'广告名称'},
                    {prop:'advertisingName', label:'广告位置'},
                    {prop:'piceure', label:'广告图片',src:true},
                ],
                searchForm:[
                    {type:'Input',label:'优惠券名称:'},
                    {type:'Select',label:'优惠券类型:'},
                    {type:'interval',label:'有效期:'},
                    {type:'Select',label:'状态:'},
                    {type:'button'}
                ],
                ButtonList:[
                    {
                        buttonText:'编辑',
                        method: (index, row) => {
                            this.handleEdit(index, row)
                        }},
                ],
            }
        },
        mounted() {
            this.getAdvertisingManagement()
        },
        methods:{
            handleEdit(index,row){
                this.$router.push({
                    path:'/advertisingInfo',
                    query:{
                        row:row,
                        ShufflingFigure:this.ShufflingFigure,
                        Advertising:this.Advertising
                    }
                })
            },
            onTableAdd(){
                if(this.ShufflingFigure==true){
                    this.$router.push({
                        path:'/advertisingInfo',
                        query:{
                            ShufflingFigure:this.ShufflingFigure,
                            ShufflingFigureAdd:true
                        }
                    })
                }else if(this.Advertising==true){
                    this.$router.push({
                        path:'/advertisingInfo',
                        query:{
                            Advertising:this.Advertising,
                            AdvertisingAdd:true
                        }
                    })
                }

            },
            onHandleClick(tab){
                let activeName=tab.label
                if(activeName=='轮播图'){
                    this.ShufflingFigure=true
                    this.Advertising=null
                    this.getShufflingFigure()
                }else if(activeName=='广告位'){
                    this.Advertising=true
                    this.ShufflingFigure=null
                    this.getAdvertisingManagement()

                }
            },
            getAdvertisingManagement(){
                    // 广告位
                this.$getApi('/shop/ad-section-specifies').then(res=>{
                    this.columns=[
                        {prop:'piceure', label:'广告图片',src:true},
                    ],
                       this.tableData=res.data.data
                    this.tableData.map((item)=>{
                        item.advertisingName=item.ad_section.position_name
                        item.title=item.ad_section.title
                        item.piceure=item.ad_section.picture
                        console.log(item,"item")
                    })


                })
            },
            getShufflingFigure(){
                // 轮播图
                this.$getApi('/shop/banners').then(res=>{
                    this.tableData=res.data.data
                    this.columns=[
                        {prop:'piceure', label:'轮播图片',src:true},
                    ]
                    this.tableData.map((item)=>{

                        item.piceure=item.picture
                        console.log(item,"item")
                    })
                })
            }
        }
    };
</script>

<style scoped>

</style>
