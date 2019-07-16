<template>
  <div>
    <div class="page_view">
      <div class="flutter row">
        <section v-for="item in flutterList" :key="item.id" @click="goAsh(item)">
          <span>{{item.building_name}}</span>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { buildAllType } from "@/api/getData";
export default {
  data() {
    return {
      flutterList: []
    };
  },
  mounted() {
    //console.log(mapList)
    this.initData();
  },
  methods: {
    async initData() {
      await buildAllType().then(res => {
        if (res.code == 200) {
          this.flutterList = res.data;
        }
      });
    },
    //跳转页面
    goAsh(e) {
      this.$router.push({ path: `/BuildManage/detail/${e.building_name}` });
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
</style>
