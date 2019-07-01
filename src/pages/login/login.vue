<template>
    <div class="clearfix" id="login_wrap">
        <div class="f_left">
            <img src="static/img/login/illustration.png" alt="">
        </div>
        <div class="f_right">
            <h4 class="large_title"><img src="static/img/login/logo.png" alt="logo">基沐知识付费</h4>
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="" class="demo-ruleForm">
                <h5 class="small_title"><img src="static/img/login/denglu.png" alt="登录">密码登录</h5>
                <el-form-item  prop="pass" class="icon_content">
                    <img class="icon_item" src="static/img/login/shouji.png" alt="">
                    <el-input class="content_indent" type="text" v-model="ruleForm.pass" placeholder="请输入手机号/账号" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item prop="checkPass" class="icon_content" >
                    <img class="icon_item" src="static/img/login/mima.png" alt="">
                    <el-input class="content_indent" type="password" v-model="ruleForm.checkPass" placeholder="请输入密码" autocomplete="off" ></el-input>
                </el-form-item>
                <el-form-item class="icon_content type_code"  prop="captcha">
                    <el-input type="text" class="code_put pic_code" @keyup.enter.native="submitForm('ruleForm')" v-model="ruleForm.captcha"  placeholder="请输入验证码" autocomplete="off" ></el-input>
                    <el-button type="primary" class="get_code get_pic" @click="getCaptchaCode">
                        <img :src="captchaCodeImg" />
                    </el-button>.
                </el-form-item> 
                 <el-form-item class="icon_content clearFix">
                   <el-checkbox class="f_left" v-model="ruleForm.checked">记住密码</el-checkbox>
                    <span class="fort_blue f_right" @click="goAsh('/forgot')">忘记密码</span>
                </el-form-item>
                <el-form-item class="icon_content login_margin">
                    <el-button class="login_button" type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </el-form-item>
                <el-form-item class="icon_content">
                    <p><span class="nac_grey">没有账号？</span><span @click="goAsh('/register')" class="rit_blue">立即注册</span></p>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import {accountLogin} from '@/api/getData'
import {url_str} from '../../config/env'
export default { 
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入账号'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        var validateCaptcha = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入验证码'));
            } else {
                callback();
            }
        };
        return {
           captchaCodeImg:'',
           ruleForm: {
                pass: '',
                checkPass: '',
                captcha:'',
                checked:true,
            },
            rules: {
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                captcha: [
                    { validator: validateCaptcha, trigger: 'blur' }
                ]
            }
        }
    },
    mounted(){
        this.getCaptchaCode()
        this.getCookie()
    },
    methods: {
        login(){

        },
        //获取验证码
        async getCaptchaCode(){
            this.captchaCodeImg = url_str+'/'+'captcha.jpg?date='+new Date()
        },
        //登录表单
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.ruleForm.checked) { // 记住密码
                        this.setCookie(this.ruleForm.pass, this.ruleForm.checkPass, 30); // 保存期限为30天
                    } else {
                        this.clearCookie(); // 清空 Cookie
                    }
                    accountLogin(this.ruleForm.pass,this.ruleForm.checkPass,this.ruleForm.captcha).then(res=>{
                        if(res.code == 200){
                            let token = res.data.token;
                            this.$store.commit('LOGIN_IN',token);
                            this.$router.replace('/shopContent')
                            //this.$router.replace('/')
                        }else{
                            this.$message(res.msg);
                        }
                        
                    }).catch(err=>{
                        console.log(err)
                    })

                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
         // 设置Cookie
        setCookie(username, password, exdays) { // 用户名, 密码, 保存天数
            let exdate = new Date(); // 获取时间
            exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays);
            // 字符串拼接cookie
            window.document.cookie = 'userName=' + username + ';path=/;expires=' + exdate.toGMTString();
            window.document.cookie = 'userPwd=' + password + ';path=/;expires=' + exdate.toGMTString();
        },
        // 读取Cookie
        getCookie() {
            if (document.cookie.length > 0) {
                let arr = document.cookie.split('; '); // 这里显示的格式需要切割一下自己可输出看下
                for (let i = 0; i < arr.length; i++) {
                    let arr2 = arr[i].split('='); // 再次切割
                    // 判断查找相对应的值
                    if (arr2[0] == 'userName') {
                       
                        this.ruleForm.pass = arr2[1]; // 保存到保存数据的地方
                    } else if (arr2[0] == 'userPwd') {
                        this.ruleForm.checkPass = arr2[1];
                    }
                }
            }
        },
        // 清除Cookie
        clearCookie() {
            this.setCookie('', '', -1); // 修改2值都为空，天数为负1天就好了
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        goAsh(e){
            this.$router.push(e)
        }
    },
}
</script>

<style scoped lang="scss">
@import './log'
</style>
