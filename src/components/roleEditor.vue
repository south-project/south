<template>
  <div class="hello">
    <el-dialog  class="dialog" :title="diaTitle" :visible.sync="dialogFormVisible" center  @close="$emit('update:showpreview', false)"
        :showpreview="showpreview">
         <div class="open_tips">
            <img class="tips_img" src="static/img/tishi.png" alt="">
            <p>{{paramTips}}</p>
        </div>
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
    diaTitle:{
    },
    paramTips:{
      type:String
    }
  },
  data () {
    return {
      dialogFormVisible: false,
      form:{
          pass:'',
          newPass:'',
          confirmPass:'',
      },
      formLabelWidth: '120px'
    }
  },
  watch:{
    showpreview(newVal){
      this.dialogFormVisible = this.showpreview
    }
  },
  mounted(){
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
