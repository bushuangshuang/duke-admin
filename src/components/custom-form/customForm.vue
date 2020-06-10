<template>
    <div class="el-form-box">
        <!-- 搜索表单 -->
            <div class="ces-search">
                <el-form inline :rules="rules" ref="infoForm"  v-if='isHandle' >
                    <el-form-item v-for='item in searchHandle' :key="item.label">
                        <el-button :type="item.type" :size="item.size || size" @click='item.handle()'>{{item.label}}</el-button>
                    </el-form-item>
                </el-form>
                <div v-for="(item,index) in FormTwo" :key="index" class="elFormTwo">
                    <el-steps v-if='item.type==="Steps"' :active="1" align-center style="width:300px;margin: 0 auto">
                        <el-step :title="item.title" :description="item.description" v-for="(item,index) in elStepList"></el-step>
                    </el-steps>
                    <el-cascader-panel
                            v-if='item.type==="ElCasCader"'
                            :options="options"
                            @change="onCascaderChange"
                            class="el-cascader-elFormTwo">
                    </el-cascader-panel>
                    <div v-if='item.type==="ElCasCader"' class="elFormTwo-item">
                        你当前的选择是:  <span  v-for="(item,index) in arrList" :key="index">{{item}}</span>
                    </div>
                    <div v-if='item.type==="EditGood"' class="elFormTwo-item">
                        <el-button @click="onEditGood">下一步填写商品信息</el-button>
                    </div>

                </div>
            </div>
        <el-form  :labelWidth="labelWidth" :rules="rules"  :model="searchData"  ref="searchData">
            <el-form-item v-for='item in searchForm' :label="item.label" :key='item.prop'>
                <el-input v-if='item.type==="textarea"'  :type="item.type" v-model="searchData[item.prop]" :placeholder="item.placeholder" ></el-input>
                <span v-if='item.type==="title"' :style="{marginLeft:item.marginLeft}">{{item.value}}</span>
                <!-- 输入框 -->
                <el-input v-if="item.type==='Input'" v-model="searchData[item.prop]" :placeholder="item.placeholder" :style="{marginLeft:item.marginLeft}"></el-input>
                <!-- 下拉框 -->
                <el-select v-if="item.type==='Select'" v-model="searchData[item.prop]"  @change="item.change(searchData[item.prop])">
                    <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
                </el-select>
                <!-- 单选 -->
                <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]" @change="item.change(searchData[item.prop])">
                    <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">
                        {{ra.label}}
                        <el-input type="text" v-if="ra.Radio=='input'" :placeholder="item.placeholder" v-model="searchData[ra.prop]"></el-input>
                        <span v-if="ra.Radio=='input'" >{{ra.text}}</span>
                        <el-date-picker v-model="searchData[item.prop]" v-if="ra.typeT=='date'"></el-date-picker>
                        <el-date-picker v-model="searchData[item.prop]" v-if="ra.typeT=='date'"></el-date-picker>
                    </el-radio>

                </el-radio-group>
                <!-- 单选按钮 -->
                <el-radio-group v-if="item.type==='RadioButton'" v-model="searchData[item.prop]" @change="item.change && item.change(searchData[item.prop])">
                    <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
                </el-radio-group>
                <!-- 复选框 -->
                <el-checkbox-group v-if="item.type==='CheckboxMore'" v-model="searchData[item.prop]" @change="onCheckbox(searchData[item.prop])">

                    <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value" @change="onCheckbox(searchData[item.prop])">{{ch.label}}</el-checkbox>
                </el-checkbox-group>
                <el-checkbox v-model="searchData[item.prop]" v-if="item.type==='Checkbox'">{{item.checkboxLabel}}</el-checkbox>
                <!-- 日期 -->
                <el-date-picker v-if="item.type==='Date'" v-model="searchData[item.prop]" ></el-date-picker>
                <el-date-picker
                        value-format="yyyy-MM-dd HH:mm:ss"
                        v-if="item.type==='DateEnd'"
                        v-model="searchData[item.prop]"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                </el-date-picker>
                <!-- 时间 -->
                <el-time-select v-if="item.type==='Time'" v-model="searchData[item.prop]" type=''></el-time-select>
                <!-- 日期时间 -->
                <el-date-picker v-if="item.type==='DateTime'" type='datetime' v-model="searchData[item.prop]" :disabled="item.disable && item.disable(searchData[item.prop])"></el-date-picker>
                <!-- 滑块 -->
                <!-- <el-slider v-if="item.type==='Slider'" v-model="searchData[item.prop]"></el-slider> -->
<!--                图片上传-->
                <el-upload
                        v-if="item.type==='Upload'"
                        action="https://api.ljkj1688.com/api/upload/public/images"
                        :headers="token"
                        :data="reportData"
                        :show-file-list="true"
                        name="images[]"
                        :on-success="handleAvatarSuccess"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :limit=5>
                    <i style="display: block;position: relative;top: 50px;" slot="default" class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
<!--                地址插件-->
                <el-cascader
                        size="large"
                        v-if="item.type==='cascader'"
                        :options="optionsCaser"
                        v-model="searchData[item.prop]"
                        @change="addressChange">
                </el-cascader>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
                <quill-editor   v-if="item.type==='quillEditor'" ref="myTextEditor" :model="content" :options="editorOption"></quill-editor>
                <!-- 开关 -->
                <el-switch v-if="item.type==='Switch'" v-model="searchData[item.prop]" ></el-switch>
                <div style="display: flex" v-if="item.type==='isShowAdd'">
                    <el-input  v-model="searchData[item.prop]" :style="{marginLeft:item.marginLeft}"></el-input>
                    <el-button  @click="addSpecifications">添加</el-button>
                </div>

                <div v-if="item.type==='shippingMethod'" style="display: flex">默认运费<el-input style="width: 9%" v-model="searchData[item.defaultNum]" ></el-input>件内<el-input style="width: 9%" v-model="searchData[item.defaultPrice]" ></el-input>  元  每增加<el-input style="width: 9%" v-model="searchData[item.customeNumber]" ></el-input>件增加运费<el-input style="width: 9%" v-model="searchData[item.customePrice]" ></el-input>元</div>
<!--                <el-button @click="addSpecifications">添加</el-button>-->
                <el-button v-if="item.type==='NewFreightTemplate'" @click="addSpecifications">新建运费模板</el-button>
                <el-button v-if="item.type==='NewFreightTemplate'" @click="addSpecifications">刷新模板数据</el-button>
                <div v-if="item.type==='Specifications'">
                        <div  v-for="(item,index) in SpecificationsList" :key="index" style="min-height: 200px">
                        <p>{{item.specificationTitle}}</p>
                        <div v-for="(itemV,index) in item.colorList" :key="index">
                                <el-input  v-if='itemV.type==="ColorInput"' v-model="itemV.prop" style="width: 100%;display: block"></el-input>
                            </div>
                        <div class="specificationColor">
                            <el-input  v-if='item.type==="specificationColorInput"' v-model="searchData[item.prop]" style="width: 40%"></el-input>
                            <el-upload
                                action="https://jsonplaceholder.typicode.com/posts/"
                                :on-preview="handlePreview"
                                :on-remove="handleRemove"
                                :before-remove="beforeRemove"
                                multiple
                                :limit="3"
                                :on-exceed="handleExceed">
                            <el-button size="small" type="primary">点击上传</el-button>
                        </el-upload>
                           <div>
                               <el-button  @click="addSpecificationsColor(item)">添加</el-button>
                           </div>

                        </div>
                    </div>
                </div>
                <div  v-if="item.type==='skuList'">
                    <span v-for="(item,index) in SpecificationsList">
                       {{item.specificationTitle}}
                    </span>
                    <span style="display: inline-block;width: 50px">价格</span>
                    <span style="display: inline-block;width: 50px">数量</span>
                </div>
            </el-form-item>
            <el-form-item style="width:10%;margin: 0 auto">
                <el-button type="primary" @click="onAddGoood">{{buttonText}}</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>
        <script>
            import 'quill/dist/quill.core.css';
            import 'quill/dist/quill.snow.css';
            import 'quill/dist/quill.bubble.css';
            import { quillEditor } from 'vue-quill-editor';
            import { regionData,CodeToText } from 'element-china-area-data'
            export default {
                name:'customForm',
                components:{
                    quillEditor
                },
                props:{
                    dayForm:{
                        type:Object,
                        default:()=>{
                            return{
                                dayNumber:''
                            }
                        }
                    },
                    buttonText:{
                        type:String,
                        default:""
                    },

                    ruleInfoForm: {
                        type: Object,
                        default: () => {
                            return {}
                        }
                    },
                    content:{
                      type:String,
                      default:''
                    },
                    editorOption: {
                        type:Object,
                        default:()=>{
                            return{
                                placeholder: 'Hello World'
                            }
                        }
                    },
                    colorList:{
                        type:Array,
                        default:()=>[{}]
                    },
                    SpecificationsList:{
                        type:Array,
                        default:()=>[{
                            colorList:[]
                        }]
                    },
                    isHandle:{
                        type:Boolean,
                        default:true
                    },
                    labelWidth:{
                        type:String,
                        default:'8%'
                    },
                    size:{
                        type:String,
                        default:''
                    },
                    FormTwo:{
                        type:Array,
                        default:()=>{
                            return[]
                        }
                    },
                    searchForm:{
                        type:Array,
                        default:()=>{
                            return[
                                {checkboxLabel:''}
                            ]
                        }
                    },
                    options:{
                        type:Array,
                        default:()=>[]
                    },
                    searchHandle:{
                        type:Array,
                        default:()=>[]
                    },
                    searchData:{
                        type:Object,
                        default:()=>{
                            return{}
                        }
                    },
                    elStepList:{
                       type:Array,
                       default:()=>{
                           return[{}]
                       }
                    },
                },
                data () {
                    return {
                        imgurl:'',
                        token:{
                            "Authorization": '\'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9wcmFteS5uYXRhcHAxLmNjXC9hcGlcL2F1dGhcL21vYmlsZSIsImlhdCI6MTU5MTQzMzIxNiwiZXhwIjoxNjQzMjczMjE2LCJuYmYiOjE1OTE0MzMyMTYsImp0aSI6InVRYVY2Y05Cc0VCd2hpaDUiLCJzdWIiOjYxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.e4I78I0gYfRO033NgP96_dJ-neMWb6R3tfeWtefkha4'
                        },
                        reportData:{
                            name:"timg.jpg"
                        },
                        optionsCaser: regionData,
                        rules: this.ruleInfoForm,
                        dialogImageUrl: '',
                        dialogVisible: false,
                        arrList:[],
                        fileList: [{ url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
                    };
                },
                methods:{
                    onCheckbox(value){
                        this.$emit("onCheckbox",value)
                        console.log(value,"valie")
                    },
                    handleAvatarSuccess(res, file) {
                        console.log(res.data[0]);
                        this.$emit("handleAvatarSuccess",res)
                        this.imgurl.push(res.data[0])
                        console.log(this.imgurl)
                    },
                    handleChange(value){
                        this.value=this.value.pop()
                        console.log(this.value);
                    },
                    onAddGoood(){
                        this.$emit('onAddGoood')
                    },
                    handlePictureCardPreview(file) {
                        this.dialogImageUrl = file.url;
                        this.dialogVisible = true;
                    },
                    onCascaderChange(arr){
                        this.arrList=arr
                        this.$emit('onCascaderChange',arr)
                        // console.log(event,"event")
                    },
                    onEditGood(){
                        this.$emit('onEditGood')
                    },
                    addSpecifications(){
                        this.$emit('addSpecifications')
                    },
                    addSpecificationsColor(item){
                        this.$emit('addSpecificationsColor',item)
                    },
                    handleRemove(file, fileList) {
                        console.log(file, fileList);
                    },
                    handlePreview(file) {
                        console.log(file);
                    },
                    handleExceed(files, fileList) {
                        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
                    },
                    beforeRemove(file, fileList) {
                        return this.$confirm(`确定移除 ${ file.name }？`);
                    },
                    addressChange(arr) {
                        this.$emit("addressChange",arr)
                    },
                }
            }

        </script>
        <style>
            .elFormTwo{
                width: 90%;
                margin: 0 auto;
            }
            .el-cascader-panel.is-bordered {
                margin-top: 20px;
            }
            .el-upload{
                width: 100px!important;
                height:auto;
                /*border: none;*/
                background: transparent;
            }
            .elFormTwo-item{
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .specificationColor{
                width: 100%;

                display: flex;
            }
        </style>



