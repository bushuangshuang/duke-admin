<template>
    <div class="addCoupon-box">
        <customForm
                :dayForm="dayForm"
                :searchData="searchData"
                :searchForm="searchForm"
                :buttonText="buttonText"
                @onAddGoood="onAddGoood"
                @handleAvatarSuccess="handleAvatarSuccess"

        >
        </customForm>
    </div>
</template>

<script>
    import customForm from '../../../components/custom-form/customForm';
    export default {
        name: 'advertisingInfo',
        components:{
            customForm
        },
        data(){
            return{
                queryRoute:this.$route.query,
                imgAdvertising:'',
                buttonText:'提交',
                searchData:{},
                dayForm:{
                    dayNumber:''
                },
                searchForm:[
                ],
            }
        },
        created() {
            this.getGoodList()
            console.log("created")
        },
        methods:{
            handleAvatarSuccess(res){
                console.log(res,"imgurl")
                this.imgAdvertising=res.data[0]
            },
            getGoodList(){
                console.log(this.$route.query,"this.$route.query")
                if(this.$route.query.ShufflingFigure==true){
                   this.searchForm=[
                        {type:'Upload',label:'轮播图片:'},
                        {type:'DateEnd',prop:'periodValidity',label:'有效期'}
                    ]
                }else if(this.$route.query.Advertising==true){
                    console.log("22")
                    this.searchForm=[
                        {type:'Upload',label:'广告位图片:'},
                        {type:'DateEnd',prop:'periodValidity',label:'有效期'}
                    ]
                }
            },
            onAddGoood(){
                // ShufflingFigureAdd==true轮播图新增/shop/banners
                // AdvertisingAdd:true广告位新增
                // ShufflingFigure:true轮播图编辑
                // Advertising:true广告位编辑
                // if(this.queryRoute.ShufflingFigureAdd==true){//轮播图新增
                //     this.addShufflingFigure()
                //
                // }else if(this.queryRoute.ShufflingFigure==true){
                //    this.updateShufflingFigureApi()
                // }else if(this.queryRoute.AdvertisingAdd==true){
                //         console.log(this.queryRoute,"queryRoute")
                // }else if(this.queryRoute.Advertising==true){
                //
                // }
                this.AdvertisingAdd()
                // this.addCouponApi()
                // this.updateApi()

            },
            // 轮播图新增
            addShufflingFigure(){
                const data={
                    picture:this.imgAdvertising,//海报图
                    good_id:36,//商品id
                    start_time:this.searchData.periodValidity[1],//结束时间
                    end_time:this.searchData.periodValidity[0],//
                     is_on:true,//是否开启
                     sort:4//排序
                }
                this.$postApi(`/shop/banners`,data).then(res=>{
                        this.$message.success('提交成功！');
                }).catch(err=>{

                })
            },
            // 轮播图编辑
            updateShufflingFigureApi(){
                const data={
                    picture:this.imgAdvertising,//海报图
                    good_id:36,//商品id
                    start_time:this.searchData.periodValidity[1],//结束时间
                    end_time:this.searchData.periodValidity[0],//
                    is_on:true,//是否开启
                    sort:4//排序
                }
                this.$put(`/shop/banners/${this.$route.query.row.id}`,data).then(res=>{
                    this.$message.success('提交成功！');
                }).catch(err=>{

                })
            },
            AdvertisingAdd(){
                let data={
                    picture:this.imgAdvertising,
                    specify_type:'1',//指定类型1-店铺
                    ad_section_setting_id:this.queryRoute.row.ad_section_setting_id,//动态板块id
                    specify_id:this.queryRoute.row.specify_id,//类型id
                    start_time:this.searchData.periodValidity[1],//开始时间
                    end_time:this.searchData.periodValidity[0],//结束时间
                    sort:'2',//排序
                    pass_status:'1',//审核
                    modelable_id:this.queryRoute.row.id,//广告数据id
                    is_on:true,//是否显示
                }
                // /admin/ad-section-specifies
                this.$put(`/shop/banner-specifies/${this.queryRoute.row.id}`,data).then(res=>{
                    this.$message.success('提交成功！');
                })
            },
        },


    };
</script>

<style scoped>

</style>
