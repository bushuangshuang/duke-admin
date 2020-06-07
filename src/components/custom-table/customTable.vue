<template>
    <div class="custom-table-box">
        <div class="ces-search">
            <el-form :size="size" inline :label-width="labelWidth">
                <el-form-item v-for='item in searchForm' :label="item.label" :key='item.prop'>
                    <!-- 输入框 -->
                    <el-input v-if="item.type==='Input'" v-model="searchData[item.prop]" size="mini" ></el-input>
                    <!-- 下拉框 -->
                    <el-select v-if="item.type==='Select'" v-model="searchData[item.prop]" size="mini" @change="item.change(searchData[item.prop])">
                        <el-option v-for="op in item.options" :label="op.label" :value="op.value" :key="op.value"></el-option>
                    </el-select>
                    <!-- 单选 -->
                    <el-radio-group v-if="item.type==='Radio'" v-model="searchData[item.prop]">
                        <el-radio v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio>
                    </el-radio-group>
                    <!-- 单选按钮 -->
                    <el-radio-group v-if="item.type==='RadioButton'" v-model="searchData[item.prop]" @change="item.change && item.change(searchData[item.prop])">
                        <el-radio-button v-for="ra in item.radios" :label="ra.value" :key="ra.value">{{ra.label}}</el-radio-button>
                    </el-radio-group>
                    <!-- 复选框 -->
                    <el-checkbox-group v-if="item.type==='Checkbox'" v-model="searchData[item.prop]" >
                        <el-checkbox v-for="ch in item.checkboxs" :label="ch.value" :key="ch.value">{{ch.label}}</el-checkbox>
                    </el-checkbox-group>
                    <!-- 日期 -->
                    <el-date-picker v-if="item.type==='Date'" v-model="searchData[item.prop]" ></el-date-picker>
                    <!-- 时间 -->
                    <el-time-select v-if="item.type==='Time'" v-model="searchData[item.prop]" type=''></el-time-select>
                    <!-- 日期时间 -->
                    <el-date-picker v-if="item.type==='DateTime'" type='datetime' v-model="searchData[item.prop]" :disabled="item.disable && item.disable(searchData[item.prop])"></el-date-picker>
                    <!-- 滑块 -->
                    <!-- <el-slider v-if="item.type==='Slider'" v-model="searchData[item.prop]"></el-slider> -->
                    <!-- 开关 -->
                    <el-switch v-if="item.type==='Switch'" v-model="searchData[item.prop]" ></el-switch>
                    <div v-if="item.type==='interval'"  style="display: flex">
                        <el-input type="text" ></el-input><span>-</span><el-input type="text"></el-input>
                    </div>
                    <div class="button" v-if="item.type==='button'">
                        <el-button type="primary">查询</el-button>
                        <el-button type="primary">重置</el-button>
                    </div>

                </el-form-item>


            </el-form>
<!--            <el-form inline v-if='isHandle'>-->
<!--                <el-form-item v-for='item in searchHandle' :key="item.label">-->
<!--                    <el-button :type="item.type" :size="item.size || size" @click='item.handle()'>{{item.label}}</el-button>-->
<!--                </el-form-item>-->
<!--            </el-form>-->
        </div>
        <div  class="operation-button" >
                <el-button type="primary" v-if="buttonForm.isShowBatch==true">批量删除</el-button>
                <el-button type="primary" v-if="buttonForm.isShowShelves==true">批量下架</el-button>
                <el-button type="primary" v-if="buttonForm.isShowUpShelve==true">批量上架</el-button>
                <el-button type="primary" v-if="buttonForm.isShowAdd==true" @click="onTableAdd">添加</el-button>
        </div>
        <el-table
                :data="tableData"
        >
            <template v-for="(column, index) in columns">
                <el-table-column :prop="column.prop"
                                 :key='column.label'
                                 :label="column.label"
                                 :align="column.align"
                                 :width="column.width">
                    <template slot-scope="scope">
                        <template v-if="!column.render">
                            <template v-if="column.formatter">
                                <span v-html="column.formatter(scope.row, column)"></span>
                            </template>
                            <template v-else>
                                <span>{{scope.row[column.prop]}}</span>
                            </template>
                        </template>
                        </template>
            </el-table-column>

            </template>
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="200">
                <template slot-scope="scope">

                    <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.process_status==='refunding'"></el-button>
                    <el-button type="text" size="small" v-for="(item,index) in ButtonList" @click.native.prevent="item.method(index,scope.row)" :key="index">{{item.buttonText}}</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'customTable',
        props:{
            buttonForm:{
                type:Object,
                default:()=>{
                    return{
                            isShowBatch:false,
                            isShowShelves:false,
                            isShowAdd:false,
                            isShowUpShelve:false
                    }

                }
            },
            ButtonList:{
                type:Array,
                default:()=>{
                    return[]
                }
            },
            columns:{
                type:Array,
                default:()=>{
                    return[{}]
                }
            },
            operates: {
                type:Object,
                default:()=>{
                    return{}
                }

            } ,// table
            isHandle:{
                type:Boolean,
                default:true
            },
            labelWidth:{
                type:String,
                default:'100px'
            },
            size:{
                type:String,
                default:'mini'
            },
            searchForm:{
                type:Array,
                default:[]
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
            tableData:{
                type:Array,
                default:[]
            }
        },
        data(){
            return{

            }
        },
        methods:{
            onTableAdd(){
                this.$emit('onTableAdd')
            },
            handleClick(row){
                console.log(row,"row")
            }
        }
    };
</script>

<style scoped >
    .custom-table-box{
        min-height: 500px;

    }
    .operate-group{

    }
    .operation-button{
        width: 98%;
        display: flex;
        /*justify-content: space-between;*/
        height: 50px;
        align-items: center;
    }
</style>
