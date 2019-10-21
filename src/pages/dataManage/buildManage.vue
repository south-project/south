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
import { buildDetailType } from "@/api/getData";
export default {
  data() {
    return {
      flutterList: []
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      await buildDetailType().then(res => {
        if (res.code == 200) {
          this.flutterList = res.data;
          this.$store.commit("setBuildType", this.flutterList);
        }
      });
    },
    //跳转页面
    goAsh(e) {
      this.$router.push({
        path: `/BuildManage/detail/${e.id}`
      });
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
</style>
