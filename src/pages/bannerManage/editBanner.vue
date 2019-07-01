<template>
    <div> 
        <div class="page_view clearfix">
            <el-button  @click="backSubmit" class="f_right">返回</el-button>
        </div>
        <div class="page_view">
            <div class="bannerForm">
                <el-form :model="formInline" ref="formInline"  class="demo-form-inline form" size='medium' label-width="120px">
                    <el-form-item class="base_long" label="banner名称" prop="name" required>
                        <el-input v-model="formInline.name"  placeholder="请输入banner名称"></el-input>
                        <span class="number_compute" :style="{color:(baseNumber>=10?'red':'')}"><span>{{10-baseNumber}}</span></span>
                    </el-form-item>
                    <el-form-item label="上传图片" prop="picture" required>
                        <p><span>图片支持.jpg .png,建议尺寸750*360,大小不超过5M</span></p>
                        <el-upload
                            class="upload-demo add_upload-demo"
                            accept="image/*"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            :http-request="fnUploadRequest"
                            :disabled="disabled"
                            >
                            <el-button class="add_button" type="primary">选择文件</el-button>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort" required>
                        <el-select v-model="formInline.sort"  placeholder="请选择" @change="changeSort">
                            <el-option v-for="(item,index) in classItem" :key="index"
                            :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="submit('formInline')">保存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'UserManageDetail',
    data() {
        return {
            formInline:{
                sort:'',
                name:'',
                picture:'11'
            },
            classItem:[
                {label:'1',value:'1'},
                {label:'2',value:'2'},
                {label:'3',value:'3'},
                {label:'4',value:'4'},
                {label:'5',value:'5'}, 
                {label:'6',value:'6'},
            ], 
            autherItem:'',
            baseNumber:0,
            videoFlag:true,
            baseUrl:null,
            disabled:false
        }
    },
    watch:{
        'formInline.name'(newVal){
            this.baseNumber = this.formInline.name.length
        }
    },
    created(){
        if(this.$route.params.data!="add"){
            this.$route.meta.name = '编辑Banner'
        }else{
            this.$route.meta.name = '添加Banner'
        }
    },
    mounted(){
       
    },
    methods:{
        //返回
        backSubmit(){
            this.$router.go(-1)
        },
        //自定义上传
        fnUploadRequest(){

        },
        //排序
        changeSort(e){
            let data = this.classItem
            
            if(this.autherItem!=""){
                let cur = this.autherItem.label 
                data.push(this.autherItem)
            }
            data.map((item,index)=>{
                if(e===item.label){
                    data.splice(index,1)
                    this.autherItem = item
                }
            })
            
        },
        //提交表单
        submit(formName){
            this.$refs[formName].validate((valid)=>{
                if(valid){
                    console.log(this.formInline)
                }
            })
        }

    }   
}
</script> 

<style lang="scss" scoped>
@import '../style.scss';
.bannerForm{
    width:60%;
}
.base_long{
    position: relative;
    .number_compute{
        position: absolute;
        right:20px;
        top:0px;
    }
}
</style>
