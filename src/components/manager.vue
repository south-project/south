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
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="管理员姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" class="select" :label-width="formLabelWidth" prop="role">
          <el-select v-model="form.role" placeholder="请选择" style="width:80%">
            <el-option
              v-for="(item) in classItem"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="登录账号" :label-width="formLabelWidth" prop="account">
          <el-input v-model="form.account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" :label-width="formLabelWidth" required prop="password">
          <el-input v-model="form.password" autocomplete="off" disabled></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendMessage('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { selectAdmin } from "@/api/getData";
import { mPattern } from "@/filters/rules";
export default {
  props: {
    show: {
      type: Boolean
    },
    diaTitle: {},
    formData: {}
  },
  data() {
    var validateAccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        if (!mPattern.test(value)) {
          callback(new Error("手机号格式不对"));
        } else {
          callback();
        }
      }
    };
    return {
      dialogFormVisible: false,
      formLabelWidth: "120px",
      form: {
        name: "",
        mobile: "",
        role: "",
        account: "",
        password: "abc123"
      },
      rules: {
        name: [
          { required: true, message: "请输入管理员姓名", trigger: "blur" }
        ],
        mobile: [
          { required: true, validator: validateAccount, trigger: "blur" }
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        account: [
          { required: true, message: "请输入登录账号", trigger: "blur" }
        ]
      },
      classItem: []
    };
  },
  watch: {
    show(newVal) {
      this.dialogFormVisible = this.show;
    },
    formData(newVal) {
      let data = this.form;
      data.name = newVal.name;
      data.mobile = newVal.mobile;
      data.account = newVal.account;
      data.role = newVal.role_id;
    }
  },
  mounted() {
    selectAdmin().then(res => {
      this.$store.commit("setRoleManage", res.data);
      res.data.map(item => {
        item.value = item.id;
        item.label = item.name;
      });
      this.classItem = res.data;
    });
  },
  methods: {
    //提交表单
    sendMessage(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.role_id = this.form.role;
          this.$emit("sendMessage", this.form);
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
