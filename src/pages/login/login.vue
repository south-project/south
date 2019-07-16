<template>
  <div class="clearfix" id="login_wrap">
    <div class="login_content">
      <img src="static/img/login/design.jpg" alt />
    </div>
    <div class="f_left">
      <!-- <img src="static/img/login/illustration.png" alt=""> -->
      <!-- <img src="static/img/login/design.jpg" alt=""> -->
      <!-- <div class="about-south">
                 <p class="mb15">南方简介</p>
                <img src="http://www.zsad.com.cn/static/web/img/about3.png?v=v3 " alt="">
                <p class="line"></p>
                <div class="content">
                    <p>浙江南方建筑设计有限公司（简称“南方设计”）成立于1999年1月，拥有建筑行业（建筑工程）甲级、风景园林工程设计乙级和城乡规划乙级资质，可提供建筑、结构、公用设备等13大专业全方位服务，特色小镇、乡村再生、城市更新、创意地产、居住建筑、文化会展等17大产品体系覆盖所有建设类型。南方设计至今已完成2000多个项目案例，业绩遍及全国25省150市，跨越各种项目类型和产业特点，彰显了南方设计强大的业务能力及深厚的设计实力。</p><p><br></p><p>南方设计秉承“和而不同，顺势而为，知行合一”的企业文化。2015年，南方设计顺势而为，借特色小镇发展之势，旗下子公司、工作室数量由20多家成长为70多家，员工人数由300人扩张到近1000人，服务专业由单一的建筑设计发展成为涵盖策划、产业、建设、运营、互联网、金融、能源、科技等跨专业、跨行业的综合型公司。</p><p><br></p><p>通过对创新生态系统下平台的发展，南方设计以设计咨询为切入口，整合产业、运营、金融等各类优质资源，形成整体和谐、良性循环的产业生态圈；以建筑专业为龙头，以深度专业化为目的，统领和延伸其它专业，主要包括建筑、结构、公用设备、室内、工程管理、幕墙、产业规划、景观、BIM、绿建、灯光、效果图、动画、新型智能墙体材料研发等，成为行业内最具影响力的整体解决方案服务商。</p>                </div>
      </div>-->
    </div>
    <div class="f_right">
      <h4 class="large_title" style="color:#fff">
        <img src="static/img/login/south.png" class="logo_icon" alt="logo" />南方设计
      </h4>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width
        class="demo-ruleForm"
      >
        <h5 class="small_title">
          <img src="static/img/login/denglu.png" alt="登录" />密码登录
        </h5>
        <el-form-item prop="pass" class="icon_content">
          <img class="icon_item" src="static/img/login/shouji.png" alt />
          <el-input
            class="content_indent"
            type="text"
            v-model="ruleForm.pass"
            placeholder="请输入账号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="checkPass" class="icon_content">
          <img class="icon_item" src="static/img/login/mima.png" alt />
          <el-input
            class="content_indent"
            type="password"
            v-model="ruleForm.checkPass"
            placeholder="请输入密码"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- <el-form-item class="icon_content type_code"  prop="captcha">
                    <el-input type="text" class="code_put pic_code" @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.captcha"  placeholder="请输入验证码" autocomplete="off" ></el-input>
                    <el-button type="primary" class="get_code get_pic" @click="getCaptchaCode">
                        <img :src="captchaCodeImg" />
                    </el-button>.
        </el-form-item>-->
        <el-form-item class="icon_content clearFix">
          <el-checkbox class="f_left" v-model="ruleForm.checked">记住密码</el-checkbox>
          <!-- <span class="fort_blue f_right" @click="goAsh('/forgot')">忘记密码</span> -->
        </el-form-item>
        <el-form-item class="icon_content login_margin">
          <el-button class="login_button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
        </el-form-item>
        <!-- <el-form-item class="icon_content">
                    <p><span class="nac_grey">没有账号？</span><span @click="goAsh('/register')" class="rit_blue">立即注册</span></p>
        </el-form-item>-->
      </el-form>
    </div>
  </div>
</template>
<script>
import { accountLogin } from "@/api/getData";
import { url_str } from "../../config/env";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateCaptcha = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      captchaCodeImg: "",
      ruleForm: {
        pass: "",
        checkPass: "",
        captcha: "",
        checked: true
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        captcha: [{ validator: validateCaptcha, trigger: "blur" }]
      }
    };
  },
  mounted() {
    //this.getCaptchaCode();
    this.getCookie();
  },
  methods: {
    login() {},
    //获取验证码
    async getCaptchaCode() {
      this.captchaCodeImg = url_str + "/" + "captcha.jpg?date=" + new Date();
    },
    //登录表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.ruleForm.checked) {
            // 记住密码
            this.setCookie(this.ruleForm.pass, this.ruleForm.checkPass, 30); // 保存期限为30天
          } else {
            this.clearCookie(); // 清空 Cookie
          }
          accountLogin(
            this.ruleForm.pass,
            this.ruleForm.checkPass,
            this.ruleForm.captcha
          )
            .then(res => {
              if (res.code == 200) {
                let token = res.data.token;
                let param = {};
                param.id = res.data.id;
                param.name = res.data.name;
                param.account = res.data.account;
                param.roleId = res.data.role_id;
                localStorage.setItem("userInfo", JSON.stringify(param));
                this.$store.commit("LOGIN_IN", token);
                this.$router.replace("/");
              } else {
                this.$message(res.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 设置Cookie
    setCookie(username, password, exdays) {
      // 用户名, 密码, 保存天数
      let exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
      // 字符串拼接cookie
      window.document.cookie =
        "userName=" + username + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd=" + password + ";path=/;expires=" + exdate.toGMTString();
    },
    // 读取Cookie
    getCookie() {
      if (document.cookie.length > 0) {
        let arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (let i = 0; i < arr.length; i++) {
          let arr2 = arr[i].split("="); // 再次切割
          // 判断查找相对应的值
          if (arr2[0] == "userName") {
            this.ruleForm.pass = arr2[1]; // 保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.ruleForm.checkPass = arr2[1];
          }
        }
      }
    },
    // 清除Cookie
    clearCookie() {
      this.setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    goAsh(e) {
      this.$router.push(e);
    }
  }
};
</script>

<style scoped lang="scss">
@import "./log";
</style>
