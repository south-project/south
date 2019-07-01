<template>
  <div class="hello">
    <el-dialog  class="dialog" :title="diaTitle" :visible.sync="dialogFormVisible" center  @close="$emit('update:showpreview', false)"
        :showpreview="showpreview">
        
        <el-form :model="form">
            <el-form-item label="地区：" :label-width="formLabelWidth" v-if="!coreState">
                <div class="area">
                  <span>{{paramTips.date}}</span>
                  <span>{{paramTips.name}}</span>
                </div>
            </el-form-item>
            <el-form-item label=" " :label-width="formLabelWidth" v-else>
                <div class="area">
                  <span>已选中{{paramTips.length}}条数据</span>
                </div>
            </el-form-item>
            <el-form-item label="预设单价：" :label-width="formLabelWidth">
                <el-input v-model="form.price" autocomplete="off"></el-input>
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
    showpreview:{
      type:Boolean
    },
    diaTitle:{},
    paramTips:{},
    coreState:{type:Boolean}
  },
  data () {
    return {
      dialogFormVisible: false,
      form:{
          price:''
      },
      formLabelWidth: '120px'
    }
  },
  watch:{
    showpreview(newVal){
      this.dialogFormVisible = this.showpreview
    }
  },
  methods:{
    //提交表单
    sendMessage(){
      this.$emit('sendMessage',this.form)
      this.dialogFormVisible = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
