<template>
  <div>
    <div class="page_view">
      <div class="bannerForm">
        <el-form
          :model="formInline"
          ref="formInline"
          class="demo-form-inline form"
          size="medium"
          label-width="120px"
        >
          <el-form-item class="base_long" label="客服热线" prop="line">
            <el-input v-model="formInline.line" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item class="el_editor" label="关于我们">
            <QuillEditor
              class="editor_content"
              v-model="editorContentValue"
              :value="editorContentValue"
              @onEditorChange="onEditorChange"
            />
          </el-form-item>
          <el-form-item>
            <el-button @click="submit('formInline')">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import QuillEditor from "@/components/editor";
import { insertBaseInfo, showBaseInfo } from "@/api/getData";
export default {
  name: "UserManageDetail",
  components: {
    QuillEditor
  },
  data() {
    return {
      formInline: {
        line: ""
      },
      editorContentValue: "",
      rowId: "",
      classItem: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
        { label: "5", value: "5" },
        { label: "6", value: "6" }
      ],
      autherItem: "",
      baseNumber: 0,
      videoFlag: true,
      baseUrl: null,
      disabled: false
    };
  },
  watch: {
    "formInline.name"(newVal) {
      this.baseNumber = this.formInline.name.length;
    }
  },
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      showBaseInfo().then(res => {
        if (res.code == 200) {
          this.formInline.line = res.data.hotline;
          this.editorContentValue = res.data.description;
          this.rowId = res.data.id;
        }
      });
    },
    //返回
    backSubmit() {
      this.$router.go(-1);
    },
    //自定义上传
    fnUploadRequest() {},
    //排序
    changeSort(e) {
      let data = this.classItem;

      if (this.autherItem != "") {
        let cur = this.autherItem.label;
        data.push(this.autherItem);
      }
      data.map((item, index) => {
        if (e === item.label) {
          data.splice(index, 1);
          this.autherItem = item;
        }
      });
    },
    //图文详情change事件
    onEditorChange(editor) {
      this.editorContentValue = editor.html;
    },
    //提交表单
    submit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let param = {};
          param.hotline = this.formInline.line;
          param.description = this.editorContentValue;
          param.id = this.rowId;
          insertBaseInfo(param).then(res => {
            if (res.code == 200) {
              this.$message({
                showClose: true,
                message: "保存成功",
                type: "success"
              });
            } else {
              this.$message({
                showClose: true,
                message: res.msg,
                type: "warning"
              });
            }
          });
        }
      });
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../../style.scss";
.bannerForm {
  width: 60%;
}
.base_long {
  position: relative;
  .number_compute {
    position: absolute;
    right: 20px;
    top: 0px;
  }
}
</style>
