<template>
    <div>
        <div class="card_title clearfix">
            <el-button type="primary" class="f_right" @click="addNew">添加角色</el-button>
        </div>
        <div class="page_view">
            <el-table
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                border>
                <el-table-column prop="name" label="角色名称" width="120"></el-table-column>
                <el-table-column prop="num" label="员工数量" ></el-table-column>
                <el-table-column label="操作" >
                    <template slot-scope="scope">
                        <el-button @click="handleDelete(scope.row)" type="text" >删除</el-button>
                        <el-button @click="handleEdit(scope.row)" type="text" >编辑</el-button>
                    </template>
                </el-table-column> 
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
        <WordTip :showpreview.sync="showpreview" :diaTitle="diaTitle" @sendMessage="sendMessage" :paramTips="paramTips"/>
        <roleEditor :show.sync="show" :diaTitle="diaTitle" @sendMessage="sendRole" />
    </div>
</template>

<script>
import WordTip from '@/components/setTips'
import roleEditor from '@/components/roleEditor'
export default {
     components:{
        WordTip,
        roleEditor
    },
    data() {
        return {
            diaTitle:'',
            showpreview:false,
            show:false,
            paramTips:'',
            tableData: [{
                date: '六一儿童节',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                img:'../../static/img/1.jpg',
                num:'1'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                img:'../../static/img/1.jpg',
                num:'2'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄',
                img:'../../static/img/1.jpg',
                num:'3'
                },
            ],
            currentPage:1,
            size:10,
            total:400,
        }
    },
    mounted(){
        //console.log(mapList)
    },
    methods:{
        //删除
        handleDelete(row){
            this.showpreview = true
            this.diaTitle = "删除"
            this.paramTips = "您确定删除"+row.name
        },
        //编辑
        handleEdit(row){
            this.show = true
            this.diaTitle = "编辑角色"
        },
         //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        //分页
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        //确认删除
        sendMessage(e){

        },
        //添加角色
        addNew(){
            this.show = true
            this.diaTitle = "添加角色"
        },
        //角色提交
        sendRole(e){
            console.log(e)
        }
    }   
}
</script> 

<style lang="scss" scoped>
@import '../../style.scss';
.banner{
    width:200px;
    margin:0 auto;
    img{
        width:100%;
    }
}
</style>
