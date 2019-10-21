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
import mapList from "../../static/json/map.json";
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
      mapJson: mapList,
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
    getCityData() {
      let that = this;
      let data = this.mapJson;
      that.province = [];
      that.city = [];
      that.block = [];
      // 省市区数据分类
      for (var item in data) {
        if (item.match(/0000$/)) {
          //省
          that.province.push({ id: item, value: data[item], children: [] });
        } else if (item.match(/00$/)) {
          //市
          that.city.push({ id: item, value: data[item], children: [] });
        } else {
          //区
          that.block.push({ id: item, value: data[item] });
        }
      }
      // 分类市级
      for (var index in that.province) {
        for (var index1 in that.city) {
          if (
            that.province[index].id.slice(0, 2) ===
            that.city[index1].id.slice(0, 2)
          ) {
            that.province[index].children.push(that.city[index1]);
          }
        }
      }
      // 分类区级
      for (var item1 in that.city) {
        for (var item2 in that.block) {
          if (
            that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)
          ) {
            that.city[item1].children.push(that.block[item2]);
          }
        }
      }
    },
    //省级选择
    choseProvince(e) {
      this.code = e;
      this.state = 1;
      this.initData(this.code, this.state);
      for (var index2 in this.province) {
        if (e === this.province[index2].id) {
          this.formInline.sheng = this.province[index2].value;
          this.shi1 = this.province[index2].children;
          this.formInline.shi = this.province[index2].children[0].value;
          this.qu1 = this.province[index2].children[0].children;
          this.formInline.qu = this.province[
            index2
          ].children[0].children[0].value;
          this.E = this.qu1[0].id;
        }
      }
      this.$emit("choseProvince", this.formInline);
    },
    //市级选择
    choseCity(e) {
      this.code = e;
      this.state = 2;
      this.initData(this.code, this.state);
      for (var index3 in this.city) {
        if (e === this.city[index3].id) {
          this.formInline.shi = this.city[index3].value;
          this.qu1 = this.city[index3].children;
          this.formInline.qu = this.city[index3].children[0].value;
          this.E = this.qu1[0].id;
        }
      }
      this.$emit("choseCity", this.formInline);
    },
    //区级选择
    choseBlock(e) {
      for (var index4 in this.qu1) {
        if (e === this.qu1[index4].id) {
          this.formInline.qu = this.qu1[index4].value;
        }
      }
      this.$emit("choseBlock", this.formInline);
      this.E = e;
    },
    //重置表单
    resetForm() {
      this.formInline = {};
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "../styles/_mixin";
</style>
