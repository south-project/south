<template>
  <div class="hello">
    <el-select v-model="formInline.sheng" @change="choseProvince" placeholder="省级地区">
      <el-option
        v-for="item in province"
        :key="item.area_code"
        :label="item.area_name"
        :value="item.area_code"
      ></el-option>
    </el-select>
    <el-select v-model="formInline.shi" @change="choseCity" placeholder="市级地区">
      <el-option
        v-for="item in city"
        :key="item.area_code"
        :label="item.area_name"
        :value="item.area_code"
      ></el-option>
    </el-select>
    <el-select v-model="formInline.qu" @change="choseBlock" placeholder="区级地区" v-if="coreState">
      <el-option
        v-for="item in block"
        :key="item.area_code"
        :label="item.area_name"
        :value="item.area_code"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import { queryArea } from "@/api/getData";
export default {
  props: {
    coreState: {
      type: Boolean
    }
  },
  data() {
    return {
      formInline: {
        sheng: "",
        shi: "",
        qu: ""
      },
      province: "",
      shi1: [],
      qu1: [],
      city: "",
      block: "",
      code: 0,
      state: 0
    };
  },
  watch: {},
  mounted() {
    //this.getCityData();
    this.initData(this.code, this.state);
  },
  methods: {
    initData(code, state) {
      queryArea(code).then(res => {
        if (res.code == 200) {
          if (state == 0) {
            this.province = res.data;
          } else if (state == 1) {
            this.city = res.data;
          } else {
            this.block = res.data;
          }
        }
      });
    },
    //省级选择
    choseProvince(e) {
      this.code = e;
      this.state = 1;
      this.initData(this.code, this.state);
      this.formInline.sheng = e;
      this.formInline.shi = "";
      this.formInline.qu = "";
      this.$emit("choseProvince", this.formInline);
    },
    //市级选择
    choseCity(e) {
      this.code = e;
      this.state = 2;
      this.initData(this.code, this.state);
      this.formInline.shi = e;
      this.formInline.qu = "";
      this.$emit("choseCity", this.formInline);
    },
    //区级选择
    choseBlock(e) {
      this.formInline.qu = e;
      this.$emit("choseBlock", this.formInline);
      this.E = e;
    },
    //重置表单
    resetForm() {
      this.city = "";
      this.block = "";
      this.formInline.sheng = "";
      this.formInline.shi = "";
      this.formInline.qu = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/_mixin";
</style>
