<template>
  <div class="good-box">
    <customForm
            :options="options"
            :content="content"
            :columns="columns"
            :operation=false
            :tableData="tableData"
            :buttonText="buttonText"
            :searchForm="searchForm"
            :searchData="searchData"
            :colorList="colorList"
            :ruleInfoForm="ruleForm"
            :editorOption="editorOption"
            @onEditGood="onEditGood"
            @onAddGoood="onAddGoood"
            @emitUploadSuccess="onUploadSuccess"
            :SpecificationsList="SpecificationsList"
            @onCascaderChange="onCascaderChange"
            @addSpecifications="addSpecifications"
            @addSpecificationsColor="addSpecificationsColor"
    />
  </div>
</template>

<script>
import customForm from "@/components/custom-form/customForm";
import customTable from "../../../components/custom-table/customTable";
export default {
  name: "addGood",
  components: {
    customForm,
    customTable
  },
  data() {
    return {
      tableData:[],
      arr:[],
      index:0,
      flag:true,
      columns:[
        {label:'商品名称',prop:'title'},
        {label:'价格'},
        {label:'数量'},
      ],
      content: "",
      spec_groups:[],
      spec_group_values:[

      ],
      skus:[],
      buttonText:'提交',
      editorOption: {
        placeholder: "22"
      },
      ruleForm: {
        goodTitle: [
          { required: true, message: "商品标题不能为空", trigger: "blur" }
        ]
      },
      colorList: [],
      searchData: { categories: [1,2], valuation_value: 0 },
      SpecificationsList: [],
      searchForm: [
                    { type: "title", value: "基础信息", marginLeft: "-100px" },
                    { type: "Input", label: "商品标题:", prop: "title" },
                    { type: "title", value: "类目属性", marginLeft: "-100px" },
                    { type: "Select", label: "品牌:", options: [], prop: "brand",change(){} },
                    { type: "Select", label: "材质:", prop: "material" ,change(){} },
                    { type: "cascader", label: "产地:", prop: "areas" },
                    { type: "Upload", label: "封面图片" },
                    { type: "title", value: "销售信息", marginLeft: "-100px" },
                    { type: "isShowAdd", label: "规格组:", prop: "SpecificationsText" },
                    { type: "Specifications" },
                    { type: "skuList" },
                    { type: "specificationColorInput", prop: "specificationColorInput" },
                    { type: "Input", label: "一口价:", itype: "number", prop: "allPice" },
                    { type: "Input", label: "总数量:", itype: "number", prop: "allNumber" },
                    { type: "title", value: "图文描述", marginLeft: "-100px" },
                    { type: "quillEditor", prop: "description" },
                    {
                      type: "ElCasCader", label: "店铺中分类:", prop: "shop_category" ,
                      change(value){
                        this.searchData.shop_category=value
                        console.log(this.searchData,value)
                      }
                    },

                    { type: "title", value: "物流信息", marginLeft: "-100px" },
                    {
                      type: "Select",
                      label: "运费模板:",
                      prop: "template_id",
                      options: []
                    },
                    {
                      type: "Radio",
                      label: "计件方式",
                      radios: [
                        { label: "按件数", value: 1 },
                        { label: "按重量", value: 2 },
                        { label: "按体积", value: 3 }
                      ],
                      prop: "valuation_method"
                    },
                    { type: "NewFreightTemplate" },
                    { type: "title", value: "售后服务", marginLeft: "-100px" },
                    {
                      type: "Radio",
                      label: "是否提供发票",
                      radios: [
                        { label: "是", value: true },
                        { label: "否", value: false }
                      ],
                      prop: "is_invoice"
                    },
                    {
                      type: "Checkbox",
                      label: "退换货承诺",
                      value: true,
                      checkboxLabel: "不支持退换货",
                      prop: "support_return"
                    },
                    {
                      type: "Radio",
                      label: "上架时间",
                      radios: [
                        { label: "立即上架", value: true },
                        { label: "放入仓库", value: false }
                      ],
                      prop: "on_sale"
                    },
                    {
                      type: "Input",
                      label: "发货时间:",
                      prop: "delivery_time"
                    },
                    { type: "Input", label: "质保月:", itype: "number", prop: "shelf_life" }
                  ],
                  options: [
                    {
                      value: "1",
                      label: "2",
                      children: [
                        {
                          value: "指南",
                          label: "指南1"
                        }
                      ]
                    }
                  ]
    };
  },

  methods: {
    onCascaderChange(arr) {
      console.log(arr, "arr");
      this.searchData.categories = arr;
    },
    //接收封面图片修改事件
    onUploadSuccess(e) {
      console.log(e);
      this.searchData.images = e;
    },
    getClassificationGoods() {
      // this.$getApi(`/api/good-categories`).then(res => {
      //   let data = res.data.data;
      //   console.log(data, "Res");
      //   data.map(item => {
      //     item.label = item.name;
      //     item.value = item.id;
      //     if (item.children) {
      //       item.children.map(itemV => {
      //         itemV.label = itemV.name;
      //         itemV.value = itemV.id;
      //       });
      //     }
      //     this.options = data;
      //   });
      // });
    },
    //获取品牌信息
    getBrands() {
      this.$getApi(`/shop/brands`).then(res => {
        let data = res.data.data;
        this.setDatas(data, "brand");
      });
    },
    //获取商品材质信息
    getMaterials() {
      this.$getApi(`/shop/materials`).then(res => {
        let data = res.data.data;
        this.setDatas(data, "material");
      });
    },
    // 获取店铺分类
    getstoreCategories() {
      this.$getApi(`/shop/store-categories`).then(res => {
        let data = res.data.data;
        this.setDatas(data, "shop_category");
      });
    },
    // 获取运费模版列表
    getShopTemplate() {
      this.$getApi(`/shop/templates`).then(res => {
        let data = res.data.data;
        this.setDatas(data, "template_id");
      });
    },
    // 统一处理数据信息
    setDatas(data, prop) {
      for (var a = 0; a < data.length; a++) {
        data[a].label = data[a].name;
        data[a].value = data[a].id;
        if(data[a].children){
          data[a].children.map(item=>{
            item.label=item.name
            item.value=item.id
          })
        }
      }
      for (var j = 0; j < this.searchForm.length; j++) {
        if (this.searchForm[j].prop == prop) {
          this.searchForm[j].options = data;
          break;
        }
      }
      return data;
    },
    onAddGoood() {

      console.log(this.searchData, "searchData");
      // this.searchData.categories=
      this.searchData.areas = this.searchData.areas.map(Number); //number化地址code
      this.searchData.shelf_life = Number(this.searchData.shelf_life);
      this.searchData.delivery_time = this.searchData.delivery_time;
      this.searchData.valuation_value=12
      // this.searchData.shop_category=[1,2]
      this.searchData.images=["https://api.ljkj1688.com/storage/4604207495778304.JPG"]
      this.searchData.spec_groups=this.spec_groups
      this.searchData.skus = [
        {
          stock:100,
          amount:200,
          sku_full_name: '颜色:金色 内存:128GB'
        }
      ];

      this.$postApi(`/shop/goods`, this.searchData).then(res => {
        if (res.data) {
          this.$message.success("提交成功！");
        }
      });
    },
    onEditGood() {
      console.log("000");
    },
    addSpecifications() {
      this.SpecificationsList.push({
        specificationTitle: this.searchData.SpecificationsText,
        type: "specificationColorInput",
        prop: "specificationColorInput",
        colorList: [],
        index: this.SpecificationsList.length,
        ss: "skuList"
      });


     // this.SpecificationsList

    },
    addSpecificationsColor(item) {

      // // 作为二维数组来运算

      // console.log(result,"result")
      item.colorList.push({
        type: "ColorInput",
        prop: this.searchData.specificationColorInput
      });
      let arr=[]
      let skuarr=[]
      // const array4=[]
      item.colorList.map(itemV=>{
        this.SpecificationsList.map(item=>{
          item.spec_groups=[{
            title:item.specificationTitle,
            spec_group_values: [],
            value:[]
          }]
          arr.push(item)

          item.spec_groups.map(itemG=>{
            itemG.spec_group_values=item.colorList
            console.log(       itemG,"  itemG.value")
            itemG.spec_group_values.map(itemK=>{
              itemG.value.push( {title:itemK.prop,pictures:null})
              itemG.spec_group_values=itemG.value

              //   itemF=itemF.title

              //   let itemGroups=`${itemG.title}:${itemF.title}`
              //   // arr.proups)ush(itemG
              //   // arr.push(itemG.spec_groups_values)

              //
              delete itemG.value
              this.spec_groups.push(itemG)
              const  hash = {};
              this.spec_groups=this.spec_groups.reduce(function(item, next) {
                hash[next.title] ? '' : hash[next.title] = true && item.push(next);
                return item
              }, [])
              console.log(    this.spec_groups,"    this.spec_groups")

            })
            // console.log( this.spec_groups," this.spec_groups")
          // let arr1=  Array.from(itemG.spec_groups_values)
          //   arr1.map(v=>{
          //     arr1=v.title
          //     // console.log(v.title)
          //   })
          //   console.log(itemG.spec_groups_value,"Arr1444")
          })

          const  hash = {};
          item.colorList=item.colorList.reduce(function(item, next) {
            hash[next.prop] ? '' : hash[next.prop] = true && item.push(next);
            return item
          }, [])
        })
      })
      // array4.push(  this.skus)
      var array1 = ["1", "2"];
      var array2 = ["a", "b"];
      var array3 = ["@", "*"];
     const array4=[array1,array2,array3]
      // // last为上次运算的结果，current为数组中的当前元素
      var result = array4.reduce((last, current) => {
        const array = [];
        last.forEach(par1 => {
          current.forEach(par2 => {
            array.push(par1 + ":" + par2);
          });
        });
        return array;
      });
      // console.log( result," this.result")
    },
    reduceMethod(arr){
      var obj = {};
      arr = arr.reduce(function(item, next) {
            obj[next.title] ? '' : obj[next.title] = true && item.push(next);
          return item;
          }, []);
      console.log( arr," arr")
    }

  },
  mounted() {
    this.getClassificationGoods();
    this.getBrands();
    this.getMaterials();
    this.getstoreCategories();
    this.getShopTemplate();
  }
};
</script>

<style scoped>
</style>
