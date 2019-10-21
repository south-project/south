<template>
  <div class="flutter">
    <div class="card_title">
      <span v-for="item in crumbList" :key="item.name">
        <span class="text">{{item.meta.name}}</span>
      </span>
      <span class="img">
        <img src="../../../../../static/img/xuxian.png" alt />
      </span>
    </div>
    <div class="main" v-if="$route.name=='SystemManage'">
      <section
        v-for="item in dataList"
        :key="item.id"
        @click="changeTab(item.id)"
        :class="crumbIndex==item.id?'active':''"
      >
        <span>{{item.name}}</span>
      </section>
    </div>
  </div>
</template> 

<script>
import { mapState, mapMutations } from "vuex";
import baseManage from "@/pages/systemManage/components/baseManage";
import roleManage from "@/pages/systemManage/components/roleManage";
export default {
  components: {
    baseManage,
    roleManage
  },
  data() {
    return {
      crumbName: "",
      dataList: [
        { name: "基本设置", id: "0" },
        { name: "角色", id: "1" },
        { name: "管理员", id: "2" }
      ]
    };
  },
  computed: {
    ...mapState(["crumbList", "crumbIndex"])
  },
  watch: {},
  mounted() {},
  methods: {
    ...mapMutations(["setCrumbIndex"]),
    changeTab(e) {
      this.setCrumbIndex(e);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../styles/_mixin";
.card_title {
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    &.text {
      margin-right: 30px;
      font-size: 15px;
    }
    &.img {
      transform: rotate(90deg);
      width: 50px;
      height: 50px;
      img {
        width: 100%;
      }
    }
  }
}
.flutter {
  background: #fff;
  padding: 15px 20px;
  border-radius: 3px;
  margin-bottom: 10px;
  position: relative;
  display: flex;
  align-items: center;
  &::before {
    content: "";
    @include wh(100%, 5px);
    @include allcover();
    display: block;
    background: $blue;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
  }
  .main {
    display: flex;
    align-items: center;
    margin-left: 50px;
    section {
      width: 100px;
      text-align: center;
      position: relative;
      padding: 15px 0;
      transition: all 0.3s;
      font-size: 15px;
      &.active {
        &::before {
          content: "";
          @include wh(80%, 3px);
          background: $blue;
          display: block;
          position: absolute;
          bottom: 0;
          left: 10%;
        }
      }
      span {
        cursor: pointer;
      }
    }
  }
}
</style>
