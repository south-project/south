<template>
  <div class="menu-container">
    <template v-for="v in menuList">
      <el-submenu
        :index="v.name"
        @mouseover.native="selectStyle(v.name)"
        @mouseout.native="outStyle($event)"
        :class="select==v.name?'selected':''"
        v-if="v.children&&v.children.length>0"
        :key="v.name"
      >
        <template slot="title">
          <i class="iconfont" :class="v.meta.icon"></i>
          <span>{{v.meta.name}}</span>
        </template>
        <el-menu-item-group>
          <my-nav :menuList="v.children"></my-nav>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item
        :key="v.name"
        :style="{display:v.meta.isActive==true?'block':'none'}"
        :index="v.name"
        @click="gotoRoute(v.name)"
        v-else
      >
        <i :class="v.meta.icon"></i>
        <span slot="title">{{v.meta.name}}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "my-nav",
  data() {
    return {
      select: null
    };
  },
  props: {
    menuList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  mounted() {
    //console.log(this.menuList)
  },
  methods: {
    gotoRoute(name) {
      this.$router.push({ name });
    },
    //切换侧边栏状态
    selectStyle(e) {
      this.select = e;
    },
    outStyle(e) {
      this.select = null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/_mixin";
.isActive {
  display: none;
}
.menu-container {
  .el-menu-item,
  .el-submenu__title {
    @include hl(50px, 50px);
  }
}
</style>
