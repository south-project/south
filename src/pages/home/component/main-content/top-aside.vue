<template>
  <div>
    <aside class="aside__top">
      <!-- <el-breadcrumb separator="/">
                <transition-group name="breadcrumb">
                    <el-breadcrumb-item
                        v-for="(route,i) in crumbList"
                        :key="route.name" 
                        :to="{name:route.name}"
                        :class="{'is-last-link':i==crumbList.length-1}"
                    >
                        <span class="iconfont" ></span>
                        {{route.meta.name}}
                    </el-breadcrumb-item>
                </transition-group> 
      </el-breadcrumb>-->
      <div class="aside__top--right">
        <div class="quit-system">
          <div class="head">
            <span class="el-icon-user-solid icon"></span>
            <span class="user">{{userInfo.name}}</span>
            <span class="el-icon-caret-bottom icon"></span>
          </div>
          <div class="user_item">
            <div class="user_edit">
              <span @click="changePassWord">
                <img src="static/img/login/tuichudenglu.png" alt />修改密码
              </span>
              <span @click="loginOut">
                <img src="static/img/login/zhuye.png" alt />退出登录
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
    <el-dialog class="dialog" title="修改新密码" :visible.sync="dialogFormVisible" center>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="原密码" :label-width="formLabelWidth" prop="oldPassword">
          <el-input v-model="form.oldPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" :label-width="formLabelWidth" prop="newPassword">
          <el-input v-model="form.newPassword" autocomplete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" :label-width="formLabelWidth" prop="checkPassword">
          <el-input v-model="form.checkPassword" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { updatePassword } from "@/api/getData";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        callback();
      }
    };
    var validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认新密码"));
      } else {
        if (this.form.newPassword != this.form.checkPassword) {
          this.$message({
            showClose: true,
            message: "两次输入的密码不一致",
            type: "warning"
          });
          return;
        }
        callback();
      }
    };
    return {
      userData: "",
      userHead: "",
      userInfo: "",
      dialogFormVisible: false,
      form: {
        oldPassword: "",
        newPassword: "",
        checkPassword: ""
      },
      rules: {
        oldPassword: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, validator: validatePassCheck, trigger: "blur" }
        ]
      },

      formLabelWidth: "120px"
    };
  },
  computed: {
    ...mapState(["isSidebarNavCollapse", "crumbList"])
  },
  mounted() {
    this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
  },
  methods: {
    toggleNavCollapse() {
      this.$store.commit("toggleNavCollapse");
    },
    //退出登录
    loginOut() {
      this.$store.commit("LOGIN_OUT");
      this.$router.push("/Login");
      /* 防止切换角色时addRoutes重复添加路由导致出现警告 */
      //window.location.reload();
    },
    //修改密码
    changePassWord() {
      this.dialogFormVisible = true;
    },
    //提交表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.form.id = this.userInfo.id;
          updatePassword(this.form).then(res => {
            if (res.code == 200) {
              this.$message({
                showClose: true,
                message: "修改成功,请重新登录",
                type: "success"
              });
              setTimeout(() => {
                this.$store.commit("LOGIN_OUT");
                this.$router.push("/Login");
              }, 1000);
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "warning"
              });
            }
          });
          this.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goAsh(e) {
      this.$router.push(e);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../styles/_mixin";
.aside__top .aside__top--right > div.quit-system:hover .user_item {
  display: block;
}
.aside__top {
  border-bottom: 1px solid #e5e5e5;
  height: 50px;
  line-height: 50px;
  position: fixed;
  left: 160px;
  top: 0;
  right: 0;
  background: #fff;
  z-index: 1000;
  transition: left 0.25s;
  @include fj();
  .toggleNavCollapse {
    display: inline-block;
    margin-left: 8px;
    padding: 0 10px;
    @include sc(26px, #ccc);
    vertical-align: middle;
    cursor: pointer;
    transition: all 0.5s;
    &.active {
      transform: rotate(90deg);
    }
  }
  .el-breadcrumb {
    flex: 1;
    line-height: 50px;
  }
  .aside__top--left {
    @include wh(160px, 50px);
    background-color: $blue;
    text-align: center;
    color: #fff;
    img {
      width: 35px;
      vertical-align: middle;
    }
  }
  .aside__top--right {
    position: absolute;
    right: 10px;
    top: -1px;
    bottom: 0px;
    @include sc(14px, $fc);
    > div {
      position: relative;
      display: inline-block;
      text-align: center;
      vertical-align: middle;
      margin-left: 10px;
      padding: 0 15px;
      cursor: pointer;
      &:hover::after {
        transform-origin: 0 0;
        transform: scaleX(1);
      }
      &:first-child:before {
        border: none;
      }
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 2px;
        background: $blue;
        transform: scaleX(0);
        transform-origin: right 0;
        transition: transform 0.5s;
      }
      &::before {
        content: "";
        position: absolute;
        height: 20px;
        top: 50%;
        left: -8px;
        margin-top: -10px;
        border-left: 1px solid #ccc;
      }
      &.email {
        position: relative;
        i {
          position: absolute;
          right: 2px;
          top: 2px;
          border-radius: 20px;
          background: red;
          color: #fff;
          text-align: center;
          font-size: 12px;
          line-height: 1.5;
          min-width: 20px;
          min-height: 20px;
        }
      }
      &.quit-system {
        position: relative;
        margin-right: 20px;
        .head {
          height: 50px;
          vertical-align: middle;
          display: flex;
          align-items: center;
          min-width: 140px;
          span {
            display: inline-block;
            &.user {
              white-space: nowrap;
              text-overflow: ellipsis;
              flex: 1;
              margin: 0 10px;
            }
          }
          .icon {
            color: $blue;
            font-size: 20px;
          }
        }
        .user_item {
          display: none;
          min-width: 140px;
          transition: all 0.25s;
          @include allcover;
          background: $bg;
          line-height: 40px;
          width: 100%;
          top: 48px;
          padding: 10px 0;
          border: 1px solid #ebebeb;
          box-shadow: 0 2px 15px 0 #eceef0;
          @include borderRadius(3px);
          .head_img {
            display: block;
            margin: 8px auto;
            width: 40px;
            height: 40px;
          }
          .user_name {
            color: $mainColor;
            padding-bottom: 20px;
          }
          .user_edit {
            span {
              display: block;
              @include hl(40px, 40px);
              text-align: left;
              font-size: 12px;
              margin: 0 10px;
              padding: 0 5px;
              &:hover {
                background: #f1f7ff;
              }
              img {
                width: 13px;
                vertical-align: middle;
                display: inline-block;
                margin-right: 5px;
                margin-bottom: 3px;
              }
            }
          }
        }
      }
      &.user-msg {
        .user-img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .user-name {
          color: #758eb5;
          padding: 0 4px;
        }
      }
      .iconfont {
        position: relative;
        font-size: 24px;
        color: #758eb5;
      }
    }
  }
}
.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.6s;
}

.breadcrumb-leave-active {
  position: absolute;
}
.navCollapsed .aside__top {
  left: 64px !important;
}
</style>
