<template>
  <div class="good-box">
    <customForm
            :buttonText="buttonText"
            :FormTwo="FormTwo"
            :options="options"
            :searchForm="searchForm"
            :elStepList="elStepList"
            :searchData="searchData"
            :editorOption="editorOption"
            :SpecificationsList="SpecificationsList"
            :colorList="colorList"
            :ruleInfoForm="ruleForm"
            :content="content"
            @emitUploadSuccess="onUploadSuccess"
            @onEditGood="onEditGood"
            @onAddGoood="onAddGoood"
            @onCascaderChange="onCascaderChange"
            @addSpecifications="addSpecifications"
            @addSpecificationsColor="addSpecificationsColor"
    />
  </div>
</template>

<script>
import customForm from "@/components/custom-form/customForm";
export default {
  name: "addGood",
  components: {
    customForm
  },
  data() {
    return {
      content: "",
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
      searchData: { categories: [], valuation_value: "" },
      SpecificationsList: [],
      searchForm: [
        { type: "title", value: "基础信息", marginLeft: "-100px" },
        { type: "Input", label: "商品标题:", prop: "title" },
        { type: "title", value: "类目属性", marginLeft: "-100px" },
        { type: "Select", label: "品牌:", options: [], prop: "brand" },
        { type: "Select", label: "材质:", prop: "material" },
        { type: "cascader", label: "产地:", prop: "areas" },
        // { type: "Checkbox", label: "宝贝定制", checkboxLabel: "支持定制" },
        { type: "Upload", label: "封面图片" },
        { type: "title", value: "销售信息", marginLeft: "-100px" },
        { type: "isShowAdd", label: "规格组:", prop: "SpecificationsText" },
        { type: "Specifications" },
        { type: "skuList" },
        { type: "specificationColorInput", prop: "specificationColorInput" },
        { type: "Input", label: "一口价:", itype:"number", prop: "allPice" },
        { type: "Input", label: "总数量:", itype:"number", prop: "allNumber" },
        { type: "title", value: "图文描述", marginLeft: "-100px" },
        { type: "quillEditor", prop: "description" },
        { type: "Select", label: "店铺中分类:", prop: "shop_category" },
        // {type:'title',value:'支付方式',marginLeft:'-100px'},
        // {type:'Radio',label:'付款方式',radios:[{label:'一口价(普通交易模式)',value:"0"}]},
        // {type:'Radio',label:'库存计数',radios:[{label:'买家拍下减库存',value:"0"},{label:'买家付款减库存',value:"1"}]},

        { type: "title", value: "物流信息", marginLeft: "-100px" },
        // {
        //   type: "Radio",
        //   label: "提取方式",
        //   radios: [{ label: "使用物流配送", value: "0" }]
        // },
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
        { type: "Input", label: "发货时间:",itype:"number", prop: "delivery_time" },
        { type: "Input", label: "质保月:",itype:"number", prop: "shelf_life" }
      ],
      FormTwo: [{ type: "Steps" }, { type: "ElCasCader" }],
      elStepList: [{ title: "选择商品分类" }, { title: "填写商品信息" }],
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
      this.$getApi(`/api/good-categories`).then(res => {
        let data = res.data.data;
        console.log(data, "Res");
        data.map(item => {
          item.label = item.name;
          item.value = item.id;
          if (item.children) {
            item.children.map(itemV => {
              itemV.label = itemV.name;
              itemV.value = itemV.id;
            });
          }
          this.options = data;
        });
      });
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
      this.searchData.areas = this.searchData.areas.map(Number); //number化地址code
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
    },
    addSpecificationsColor(item) {
      let colorItem = item.colorList;
      let colorList = [];
      item.colorList.push({
        type: "ColorInput",
        prop: this.searchData.specificationColorInput
      });
      colorItem.map(item => {
        console.log(item, "itemColor");
      });
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
