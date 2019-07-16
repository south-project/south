<template>
  <div class="hello">
    <el-dialog
      class="dialog"
      :title="diaTitle"
      :visible.sync="dialogFormVisible"
      center
      @close="$emit('update:show', false)"
      :show="show"
    >
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label :label-width="formLabelWidth">
          <el-tree
            :data="data"
            show-checkbox
            node-key="id"
            ref="tree"
            :default-checked-keys="puriew"
            :props="defaultProps"
            @check-change="handleCheckChange"
          ></el-tree>
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
import { allRoleCount } from "@/api/getData";
export default {
  props: {
    show: {
      type: Boolean
    },
    diaTitle: {},
    roleData: {},
    roleName: {},
    menuData: {
      type: Array
    }
  },
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: ""
      },
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      puriew: []
    };
  },
  watch: {
    show(newVal) {
      this.dialogFormVisible = this.show;
    },
    menuData(newVal) {
      this.puriew = newVal;
      this.setTree(newVal);
    },
    roleName(newVal) {
      this.form.name = newVal;
    }
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      allRoleCount().then(res => {
        if (res.code == 200) {
          this.data = res.data;
        }
      });
    },
    //设置树形状态
    setTree(val) {
      this.$nextTick(() => {
        this.$refs.tree.setCheckedKeys(val);
      });
    },
    //提交表单
    sendMessage() {
      if (this.form.name == "") {
        this.$message({
          showClose: true,
          message: "请输入角色名称",
          type: "warning"
        });
        return;
      } else if (this.puriew == "") {
        this.$message({
          showClose: true,
          message: "请至少选择一个权限",
          type: "warning"
        });
        return;
      }
      this.puriew = this.puriew.map(item => item.id);
      this.form.menuData = this.puriew;
      this.$emit("sendMessage", this.form);
      this.dialogFormVisible = false;
    },
    //权限选择
    handleCheckChange(data, checked, indeterminate) {
      this.puriew = this.$refs.tree.getCheckedNodes();
      //console.log(data, this.$refs.tree.getCheckedNodes());
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/_mixin";
.open_tips {
  text-align: center;
  font-size: 15px;
  .tips_img {
    width: 40px;
    display: block;
    margin: 10px auto 20px auto;
  }
}
</style>
