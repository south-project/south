<template>
  <div class="hello">
    <el-select v-model="formInline.sheng" @change="choseProvince" placeholder="省级地区">
      <el-option v-for="item in province" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="formInline.shi" @change="choseCity" placeholder="市级地区">
      <el-option v-for="item in shi1" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>
    <el-select v-model="formInline.qu" @change="choseBlock" placeholder="区级地区" v-if="coreState">
      <el-option v-for="item in qu1" :key="item.id" :label="item.value" :value="item.id"></el-option>
    </el-select>
  </div>
</template>

<script>
import mapList from "../../static/json/map.json";
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
      mapJson: mapList
    };
  },
  watch: {},
  mounted() {
    this.getCityData();
  },
  methods: {
    async getDepartmentList() {
      let data = JSON.stringify(this.mapJson);
      console.log(data);
      // 没有父节点的数据
      let parents = data.filter(value => value.match(/0000$/));

      // 有父节点的数据
      let children = data.filter(value => value.FatherDepartmentSysNo !== 0);
      // 定义转换方法的具体实现
      let translator = (parents, children) => {
        // 遍历父节点数据
        parents.forEach(parent => {
          // 遍历子节点数据
          children.forEach((current, index) => {
            // 此时找到父节点对应的一个子节点
            if (current.FatherDepartmentSysNo === parent.DepartmentSysNo) {
              // 对子节点数据进行深复制，这里只支持部分类型的数据深复制，对深复制不了解的童靴可以先去了解下深复制
              let temp = JSON.parse(JSON.stringify(children));
              // 让当前子节点从temp中移除，temp作为新的子节点数据，这里是为了让递归时，子节点的遍历次数更少，如果父子关系的层级越多，越有利
              temp.splice(index, 1);
              // 让当前子节点作为唯一的父节点，去递归查找其对应的子节点
              translator([current], temp);
              // 把找到子节点放入父节点的children属性中
              typeof parent.children !== "undefined"
                ? parent.children.push(current)
                : (parent.children = [current]);
            }
          });
        });
      };
      // 调用转换方法
      translator(parents, children);
      // 返回最终的结果
      return parents;
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
