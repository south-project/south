<template>
  <div>
    <div class="card_title clearfix">
      <el-button type="primary" class="f_right" @click="addNew">添加</el-button>
    </div>
    <div class="page_view">
      <el-table
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        v-loading="loading"
      >
        <el-table-column prop="name" label="banner名称" width="120"></el-table-column>
        <el-table-column prop="image" label="banner图片">
          <template slot-scope="scope">
            <p class="banner">
              <img :src="scope.row.image" alt />
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="num" label="排序"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <WordTip
      :showpreview.sync="showpreview"
      :diaTitle="diaTitle"
      @sendMessage="sendMessage"
      :paramTips="paramTips"
    />
  </div>
</template>

<script>
import WordTip from "@/components/setTips";
import { bannerManageList, deleteBanner } from "@/api/getData";
export default {
  components: {
    WordTip
  },
  data() {
    return {
      diaTitle: "",
      showpreview: false,
      paramTips: "",
      base64: "data:image/jpg;base64,",
      deleteId: "",
      tableData: [],
      loading: false
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      this.loading = true;
      await bannerManageList().then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
          this.loading = false;
        } else {
          this.loading = false;
          this.$message({
            showClose: true,
            message: "未知异常,请刷新",
            type: "warning"
          });
        }
      });
    },
    //删除
    handleDelete(row) {
      this.showpreview = true;
      this.diaTitle = "删除";
      this.paramTips = "您确定删除" + row.name;
      this.deleteId = row.id;
    },
    //编辑
    handleEdit(row) {
      this.$router.push(`/BannerManage/EditBanner/${row.id}`);
    },
    //确认删除
    sendMessage() {
      deleteBanner(this.deleteId).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "已删除",
            type: "success"
          });
          setTimeout(() => this.initData(), 300);
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    //添加banner
    addNew() {
      if (this.tableData.length >= 8) {
        this.$message("最多添加8张banner图");
        return;
      }
      this.$router.push({ path: `/BannerManage/EditBanner/add` });
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
.banner {
  width: 200px;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
</style>
