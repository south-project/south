<template>
    <div>
        <div class="page_view">
            <el-button  class="backSubmit" @click="backSubmit">返回</el-button>
            <el-form :inline="true" :model="formInline" ref="formInline"  class="demo-form-inline form" size='medium'>
                <el-form-item label="项目区位" class="middle">
                    <SelectOption @choseProvince="choseProvince" @choseCity="choseCity" @choseBlock="choseBlock" :coreState="true" ref="myChild"/>
                </el-form-item>
                
                <el-form-item>
                    <el-button @click="resetForm('formInline')">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchInfo" type="primary">搜索</el-button>
                </el-form-item>
                <el-form-item class="addNew" >
                    <router-link to="/class/addGraphic/add"> 
                        <el-button type="primary"> 导出数据</el-button>
                    </router-link>
                </el-form-item>
            </el-form>
        </div>
        <div class="page_view">
            <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                border>
                <el-table-column label="省份" width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                </el-table-column>
                <el-table-column prop="name" label="城市" width="120"></el-table-column>
                <el-table-column prop="address" label="区县" ></el-table-column>
                <el-table-column prop="address" label="平均销售单价(万元/M²)" ></el-table-column>
                <el-table-column prop="date" label="平均日出租(万元/M²)" ></el-table-column>
            </el-table>
            <div class="pagiNation">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
                </el-pagination>
            </div>
        </div>
        
    </div>
</template>

<script>
import SelectOption from '@/components/select'
export default {
    name:'constructionManageDetail',
    components:{
        SelectOption
    },
    data() {
        return {
             formInline:{
                status:'',
                sheng: '',
                qu:'',
                shi: '',
            },
            showpreview:false,
            diaTitle:'',
            paramTips:'',
            coreState:false,
            tableData: [{
                date: '浙江',
                name: '金华',
                address: '余杭'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }],
            currentPage:1,
            size:10,
            total:400, 
        }
    },
    mounted(){

    },
    methods:{
        //返回
        backSubmit(){
            this.$router.go(-1)
        },
        //搜索
        searchInfo(){
            console.log(this.formInline)
        },
        //重置
        resetForm(formName){
            this.$refs[formName].resetFields();
            this.formInline = {}
            this.$refs.myChild.resetForm()
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.size = val
        },
        //分页
        handleCurrentChange(val) {
            this.currentPage = val
            console.log(`当前页: ${val}`);
        },
         //省级选择
        choseProvince(e){
            this.formInline.sheng = e.sheng
            this.formInline.shi = e.shi
            this.formInline.qu = e.qu
        },
        //市级选择
        choseCity(e){
            this.formInline.shi = e.shi
            this.formInline.qu = e.qu
        },
        //区级选择
        choseBlock(e){
            this.formInline.qu = e.qu
        },
    }   
}
</script> 

<style lang="scss" scoped>
@import '../style.scss';
.page_view{
    padding-left: 30px;
    .use_margin{
        margin:0 -2%;
    }
    .title_list{
        margin-bottom: 10px;
    }
    .no_margin{
        margin:0 0 30px 0;
    }
    .use_list{
        .no_margin{
            margin:0;
            min-width:96%;
            .title{
                padding:10px;
                color:$blue;
                font-size: 20px;
            }
        }
    }
    
}
</style>
