<template>
  <div class="el-form-box">
    <!-- 搜索表单 -->
    <div class="ces-search">
      <el-form inline :rules="rules" ref="infoForm" v-if="isHandle">
        <el-form-item v-for="item in searchHandle" :key="item.label">
          <el-button
            :type="item.type"
            :size="item.size || size"
            @click="item.handle()"
          >{{item.label}}</el-button>
        </el-form-item>
      </el-form>
      <div v-for="(item,index) in FormTwo" :key="index" class="elFormTwo">
        <el-steps
          v-if="item.type==='Steps'"
          :active="1"
          align-center
          style="width:300px;margin: 0 auto"
        >
          <el-step
            :title="item.title"
            :description="item.description"
            v-for="(item,index) in elStepList"
            :key="index"
          ></el-step>
        </el-steps>
        <el-cascader-panel
          v-if="item.type==='ElCasCader'"
          :options="options"
          @change="onCascaderChange"
          class="el-cascader-elFormTwo"
        ></el-cascader-panel>
        <div v-if="item.type==='ElCasCader'" class="elFormTwo-item">
          你当前的选择是:
          <span v-for="(item,index) in arrList" :key="index">{{item}}</span>
        </div>
        <div v-if="item.type==='EditGood'" class="elFormTwo-item">
          <el-button @click="onEditGood">下一步填写商品信息</el-button>
        </div>
      </div>
    </div>
    <el-form :labelWidth="labelWidth" :rules="rules" :model="searchData" ref="searchData">
      <el-form-item v-for="item in searchForm" :label="item.label" :key="item.prop">
        <el-input
          v-if="item.type==='textarea'"
          :type="item.type"
          v-model="searchData[item.prop]"
          :placeholder="item.placeholder"
        ></el-input>
        <span v-if="item.type==='title'" :style="{marginLeft:item.marginLeft}">{{item.value}}</span>
        <!-- 输入框 -->
        <el-input
          v-if="item.type==='Input'"
          :type="item.itype"
          v-model="searchData[item.prop]"
          :placeholder="item.placeholder"
          :style="{marginLeft:item.marginLeft}"
        ></el-input>
        <!-- 下拉框 -->
        <el-select
          v-if="item.type==='Select'"
          v-model="searchData[item.prop]"
          @change="SelectChange"
        >
          <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
        </el-select>
        <!-- 单选 -->
        <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]">
          <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">
            {{ra.label}}
            <input
              type="text"
              v-if="ra.Radio=='input'"
              :placeholder="item.placeholder"
              v-model="searchData[item.propInput]"
            />
            <span v-if="ra.Radio=='input'">元</span>
            <el-date-picker v-model="searchData[item.prop]" v-if="ra.typeT=='date'"></el-date-picker>
            <el-date-picker v-model="searchData[item.prop]" v-if="ra.typeT=='date'"></el-date-picker>
          </el-radio>
        </el-radio-group>
        <!-- 单选按钮 -->
        <el-radio-group v-if="item.type==='RadioButton'" v-model="searchData[item.prop]">
          <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
        </el-radio-group>
        <!-- 复选框 -->
        <el-checkbox-group v-if="item.type==='CheckboxMore'" v-model="searchData[item.prop]">
          <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{ch.label}}</el-checkbox>
        </el-checkbox-group>
        <el-checkbox
          v-model="searchData[item.prop]"
          v-if="item.type==='Checkbox'"
        >{{item.checkboxLabel}}</el-checkbox>
        <!-- 日期 -->
        <el-date-picker v-if="item.type==='Date'" v-model="searchData[item.prop]"></el-date-picker>
        <!-- 时间 -->
        <el-time-select v-if="item.type==='Time'" v-model="searchData[item.prop]" type></el-time-select>
        <!-- 日期时间 -->
        <el-date-picker
          v-if="item.type==='DateTime'"
          type="datetime"
          v-model="searchData[item.prop]"
          :disabled="item.disable && item.disable(searchData[item.prop])"
        ></el-date-picker>
        <!-- 滑块 -->
        <!-- <el-slider v-if="item.type==='Slider'" v-model="searchData[item.prop]"></el-slider> -->
        <!--                图片上传-->
        <el-upload
          v-if="item.type==='Upload'"
          :action="uploadUrl"
          :headers="headers"
          :data="reportData"
          :show-file-list="true"
          name="images[]"
          :on-success="handleCoverimg"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :limit="5"
        >
          <i slot="default" class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <!--                地址插件-->
        <el-cascader
          size="large"
          v-if="item.type==='cascader'"
          :options="optionsCaser"
          v-model="searchData[item.prop]"
          @change="addressChange"
        ></el-cascader>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
        <quill-editor
          v-if="item.type==='quillEditor'"
          ref="myTextEditor"
          v-model="searchData[item.prop]"
          :options="editorOption"
        ></quill-editor>
        <!-- 开关 -->
        <el-switch v-if="item.type==='Switch'" v-model="searchData[item.prop]"></el-switch>
        <div style="display: flex" v-if="item.type==='isShowAdd'">
          <el-input v-model="searchData[item.prop]" :style="{marginLeft:item.marginLeft}"></el-input>
          <el-button @click="addSpecifications">添加</el-button>
        </div>
        <!--                <el-button @click="addSpecifications">添加</el-button>-->
        <el-button v-if="item.type==='NewFreightTemplate'" @click="addSpecifications">新建运费模板</el-button>
        <el-button v-if="item.type==='NewFreightTemplate'" @click="addSpecifications">刷新模板数据</el-button>
        <div v-if="item.type==='Specifications'">
          <div v-for="(item,index) in SpecificationsList" :key="index" style="min-height: 200px">
            <p>{{item.specificationTitle}}</p>
            <div v-for="(itemV,index) in item.colorList" :key="index">
              <el-input
                v-if="itemV.type==='ColorInput'"
                v-model="itemV.prop"
                style="width: 100%;display: block"
              ></el-input>
            </div>
            <div class="specificationColor">
              <el-input
                v-if="item.type==='specificationColorInput'"
                v-model="searchData[item.prop]"
                :type="item.itype"
                style="width: 40%"
              ></el-input>
              <el-upload
                :action="uploadUrl"
                :headers="headers"
                :data="reportData"
                :show-file-list="true"
                name="images[]"
                :on-success="handleAvatarSuccess"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :limit="5"
              >
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <div>
                <el-button @click="addSpecificationsColor(item)">添加</el-button>
              </div>
            </div>
          </div>
        </div>
        <div v-if="item.type==='skuList'">
          <span v-for="(item,index) in SpecificationsList" :key="index">{{item.specificationTitle}}</span>
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
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
import { regionData, CodeToText } from "element-china-area-data";
export default {
  name: "customForm",
  components: {
    quillEditor
  },
  props: {
    buttonText: {
      type: String,
      default: "添加"
    },
    ruleInfoForm: {
      type: Object,
      default: () => {
        return {};
      }
    },
    content: {
      type: String,
      default: ""
    },
    editorOption: {
      type: Object,
      default: () => {
        return {
          placeholder: "Hello World"
        };
      }
    },
    colorList: {
      type: Array,
      default: () => [{}]
    },
    SpecificationsList: {
      type: Array,
      default: () => [
        {
          colorList: []
        }
      ]
    },
    isHandle: {
      type: Boolean,
      default: true
    },
    labelWidth: {
      type: String,
      default: "8%"
    },
    size: {
      type: String,
      default: ""
    },
    FormTwo: {
      type: Array,
      default: () => {
        return [];
      }
    },
    searchForm: {
      type: Array,
      default: () => {
        return [{ checkboxLabel: "" }];
      }
    },
    options: {
      type: Array,
      default: () => []
    },
    searchHandle: {
      type: Array,
      default: () => []
    },
    searchData: {
      type: Object,
      default: () => {
        return {};
      }
    },
    elStepList: {
      type: Array,
      default: () => {
        return [{}];
      }
    }
  },
  data() {
    return {
      imgurl: [],
      headers: {
        Authorization: localStorage.getItem("X-TOKEN")
      },
      uploadUrl: "https://api.ljkj1688.com/api/upload/public/images",
      reportData: {
        name: "timg.jpg"
      },
      optionsCaser: regionData,
      rules: this.ruleInfoForm,
      dialogImageUrl: "",
      dialogVisible: false,
      arrList: [],
      fileList: []
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {},

    ///封面图片上传成功
    handleCoverimg(res, file) {
      this.imgurl.push(res.data[0]);
      this.$emit("emitUploadSuccess", this.imgurl);
    },

    handleChange(value) {
      this.value = this.value.pop();
      console.log(this.value);
    },
    onAddGoood() {
      this.$emit("onAddGoood");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onCascaderChange(arr) {
      this.arrList = arr;
      this.$emit("onCascaderChange", arr);
      // console.log(event,"event")
    },
    onEditGood() {
      this.$emit("onEditGood");
    },
    addSpecifications() {
      this.$emit("addSpecifications");
    },
    addSpecificationsColor(item) {
      this.$emit("addSpecificationsColor", item);
    },
    uploadSuccess(file, fileList) {
      console.log(file, fileList);
    },
    //封面图片删除  //处理数组移除
    handleRemove(file, fileList) {

      let url = file.response.data[0];
      for (var a = 0; a < this.imgurl.length; a++) {
        if (this.imgurl[a] == url) {
          this.imgurl.splice(a, 1);
        }
      }
      this.$emit("emitUploadSuccess", this.imgurl);
    },

    handlePreview(file) {
      console.log(file);
    },
    SelectChange(e) {
      console.log(e);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },

    addressChange(arr) {
      this.$emit("addressChange", arr);
    }
    
  }
};
</script>
        <style>
.elFormTwo {
  width: 90%;
  margin: 0 auto;
}
.el-cascader-panel.is-bordered {
  margin-top: 20px;
}
.el-upload {
  width: 100px !important;
  height: auto;
  /*border: none;*/
  background: transparent;
}
.elFormTwo-item {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.specificationColor {
  width: 100%;

  display: flex;
}
</style>



