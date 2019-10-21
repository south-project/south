<template>
  <div>
    <div class="page_view">
      <baseManage v-if="crumbIndex==0" />
      <roleManage v-if="crumbIndex==1" />
      <adminManage v-if="crumbIndex==2" />
    </div>
  </div>
</template>

<script>
import baseManage from "./components/baseManage";
import roleManage from "./components/roleManage";
import adminManage from "./components/adminManage";
import { mapState } from "vuex";
export default {
  name: "systemManage",
  components: {
    baseManage,
    roleManage,
    adminManage
  },
  data() {
    return {
      formInline: {
        sort: "",
        name: "",
        picture: "11"
      },
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
  computed: {
    ...mapState(["crumbIndex"])
  },
  watch: {
    "formInline.name"(newVal) {
      this.baseNumber = this.formInline.name.length;
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
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
