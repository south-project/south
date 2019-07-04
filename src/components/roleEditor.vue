<template>
  <div class="hello">
    <el-dialog  class="dialog" :title="diaTitle" :visible.sync="dialogFormVisible" center  @close="$emit('update:show', false)"
        :show="show">
         <el-form :model="form">
            <el-form-item label="角色名称" :label-width="formLabelWidth" >
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="" :label-width="formLabelWidth" >
                <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                ref="tree"
                :default-checked-keys="menuData"
                :props="defaultProps"
                @check-change="handleCheckChange">
                </el-tree>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendMessage">确 定</el-button>
        </div> 
    </el-dialog> 
  </div>
</template>

<script>
export default {
  props:{
    show:{
      type:Boolean
    }, 
    diaTitle:{
    },
    
  },
  data () {
    return {
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form:{
          name:'',
      },
      data: [{
        id: 1,
        label: '估算记录',
      }, {
        id: 2,
        label: '用户管理',
      }, {
        id: 3,
        label: '均价数据库',
      },{
        id: 4,
        label: '建筑货值统计',
      },{
        id: 5,
        label: '车位货值统计',
      },{
        id: 6,
        label: 'banner管理',
      },{
        id: 7,
        label: '系统设置',
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      menuData:['5'],
    }
  },
  watch:{
    show(newVal){
      this.dialogFormVisible = this.show
    }
  },
  mounted(){
  },
  methods:{
    //提交表单
    sendMessage(){
      this.form.menuData = this.menuData
      this.$emit('sendMessage',this.form)
      this.dialogFormVisible = false
    },
    //权限选择
    handleCheckChange(data, checked, indeterminate) {
      this.menuData = this.$refs.tree.getCheckedNodes()
      console.log(data, this.$refs.tree.getCheckedNodes());
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    @import '../styles/_mixin';
   .open_tips{
       text-align: center;
       font-size: 15px;
       .tips_img{
           width:40px;
           display: block;
           margin:10px auto 20px auto;
       }
      
   }
</style>
