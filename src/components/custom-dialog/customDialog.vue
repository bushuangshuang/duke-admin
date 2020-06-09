<template>
        <el-dialog
                :width="dialogForm.width"
                :title="dialogForm.title"
                :visible.sync="visible"
                @close="$emit('update:show', false)"
                :show="show"
                append-to-body>
                <custom-table
                        :columns="columns"
                        :tableData="tableData"
                >
                </custom-table>
        </el-dialog>
</template>

<script>
import customTable from '../custom-table/customTable';
    export default {
        name: 'custom-dialog',
        components:{
            customTable
        },
        data(){
            return{
                visible: this.show
            }
        },
        props: {
            tableData:{
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
            dialogForm:{
               type:Object,
               default:()=>{
                   return{
                       width:'70%',
                       title:''
                   }
               }
            },
            show: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show () {
                this.visible = this.show;
            }
        }

    };
</script>

<style scoped>

</style>
