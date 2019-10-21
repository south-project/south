<template>
  <div>
    <div class="page_view clearfix">
      <el-button @click="backSubmit" class="f_right">返回</el-button>
    </div>
    <div class="page_view">
      <div class="bannerForm">
        <el-form
          :model="formInline"
          ref="formInline"
          :rules="rules"
          class="demo-form-inline form"
          size="medium"
          label-width="120px"
          v-loading="loading"
        >
          <el-form-item class="base_long" label="banner名称" prop="name">
            <el-input v-model="formInline.name" placeholder="请输入banner名称"></el-input>
            <span class="number_compute" :style="{color:(baseNumber>=10?'red':'')}">
              <span>{{10-baseNumber}}</span>
            </span>
          </el-form-item>
          <el-form-item label="上传图片" prop="image">
            <p>
              <span>图片支持.jpg .png,建议尺寸720*360,大小不超过1M</span>
            </p>
            <div class="show_img" v-if="cover!=null">
              <img :src="cover" alt />
            </div>
            <!-- <input type="file" @change="fnUploadRequest($event)" enctype="multipart/form-data" /> -->
            <el-upload
              class="upload-demo add_upload-demo"
              accept="image/*"
              :action="baseUrl"
              :http-request="fnUploadRequest"
              :before-upload="beforeAvatarUpload"
              :disabled="disabled"
            >
              <el-button class="add_button" type="primary">选择文件</el-button>
            </el-upload>
          </el-form-item>
          <el-form-item label="排序" prop="num">
            <el-select v-model="formInline.num" placeholder="请选择" @change="changeSort">
              <el-option
                v-for="(item,index) in classItem"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="submit('formInline')" :loading="subState">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  editBanner,
  editShowBanner,
  bannerNum,
  addBanner
} from "@/api/getData";
import { url_str } from "@/config/env";
import { setTimeout } from "timers";
export default {
  name: "editBanner",
  data() {
    return {
      rowId: "",
      cover: null,
      base64: "data:image/jpg;base64,",
      formInline: {
        num: "",
        name: "",
        image: ""
      },
      subState: false,
      loading: false,
      classItem: [],
      autherItem: "",
      baseNumber: 0,
      videoFlag: true,
      baseUrl: null,
      disabled: false,
      rules: {
        name: [
          { required: true, message: "请输入banner名称", trigger: "blur" },
          { max: 10, message: "长度在 10 个字符以内", trigger: "blur" }
        ],
        image: [{ required: true, message: "请上传图片", trigger: "blur" }],
        num: [{ required: true, message: "请选择排序", trigger: "blur" }]
      }
    };
  },
  watch: {
    "formInline.name"(newVal) {
      this.baseNumber = this.formInline.name.length;
    }
  },
  created() {
    if (this.$route.params.data != "add") {
      this.$route.meta.name = "编辑Banner";
    } else {
      this.$route.meta.name = "添加Banner";
    }
    this.rowId = this.$route.params.data;
    this.baseUrl = url_str;
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      if (this.$route.params.data != "add") {
        this.loading = true;
        await editShowBanner(this.rowId).then(res => {
          if (res.code == 200) {
            this.formInline = res.data;
            this.cover = res.data.image;
            this.formInline.image = res.data.image;
            this.loading = false;
          }
        });
      }
      bannerNum().then(res => {
        let arr = [];
        if (res.code == 200) {
          res.data.map(item => {
            arr.push({ label: item, value: item });
          });
        }
        this.classItem = arr;
      });
    },
    //返回
    backSubmit() {
      this.$router.push("/BannerManage");
    },
    //文件上传之前调用做一些拦截限制
    beforeAvatarUpload(file) {
      const isJPG = true;
      const isLt2M = file.size / 1024 / 1024 < 1;
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 1M!");
      }
      return isJPG && isLt2M;
    },
    //自定义上传
    fnUploadRequest(option) {
      this.formInline.image = option.file;
      this.reads(option.file);
      this.$refs.formInline.validateField("file");
    },
    //生成预览图
    reads(file) {
      var _this = this; //定义一个文件阅读器
      var reader = new FileReader(); //文件装载后将其显示在图片预览里
      reader.onload = function(e) {
        //将bade64位图片保存至数组里供上面图片显示
        _this.cover = reader.result;
        _this.formInline.image = reader.result;
      };
      reader.readAsDataURL(file);
    },
    //排序
    changeSort(e) {},
    //提交表单
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.subState = true;
          if (this.$route.params.data != "add") {
            //编辑成功
            this.formInline.id = this.rowId;
            editBanner(this.formInline).then(res => {
              if (res.code == 200) {
                this.subState = false;
                this.$message({
                  showClose: true,
                  message: "编辑成功",
                  type: "success"
                });
                setTimeout(() => this.$router.push("/BannerManage"), 1000);
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "warning"
                });
              }
            });
          } else {
            //添加
            addBanner(this.formInline).then(res => {
              if (res.code == 200) {
                this.subState = false;
                this.$message({
                  showClose: true,
                  message: "添加成功",
                  type: "success"
                });
                setTimeout(() => this.$router.push("/BannerManage"), 1000);
              } else {
                this.$message({
                  showClose: true,
                  message: res.msg,
                  type: "warning"
                });
              }
            });
          }
        }
      });
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
.bannerForm {
  width: 60%;
}
.show_img {
  max-width: 200px;
  img {
    width: 100%;
  }
}
.base_long {
  position: relative;
  .number_compute {
    position: absolute;
    right: 20px;
    top: 0px;
  }
}
// .el-select-dropdown__item.selected {
//   display: none;
// }
</style>
