<template>
  <div>
    <div class="card_title clearfix">
      <el-button type="primary" class="f_right" @click="addNew(true)">添加管理员</el-button>
    </div>
    <div class="page_view">
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column prop="name" label="管理员姓名" width="120"></el-table-column>
        <el-table-column prop="mobile" label="联系方式"></el-table-column>
        <el-table-column prop="roleName" label="角色"></el-table-column>
        <el-table-column prop="account" label="登录账号"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
            <el-button @click="handleEdit(false,scope.row)" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagiNation">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <WordTip
      :showpreview.sync="showpreview"
      :diaTitle="diaTitle"
      @sendMessage="sendMessage"
      :paramTips="paramTips"
    />
    <Manager :show.sync="show" :diaTitle="diaTitle" @sendMessage="sendRole" :formData="formData" />
  </div>
</template>

<script>
import {
  adminManageList,
  editAdminManage,
  adminCheck,
  deleteAdminManage,
  addAdminManage
} from "@/api/getData";
import WordTip from "@/components/setTips";
import Manager from "@/components/manager";

export default {
  components: {
    WordTip,
    Manager
  },
  data() {
    return {
      diaTitle: "",
      showpreview: false,
      show: false,
      paramTips: "",
      deleteId: "",
      state: null,
      formData: [],
      tableData: [],
      currentPage: 1,
      size: 10,
      total: 400
    };
  },
  mounted() {
    //console.log(mapList)
    this.initData();
  },
  methods: {
    initData() {
      adminManageList(this.currentPage, this.size).then(res => {
        if (res.code == 200) {
          let tab = res.data;
          this.tableData = tab.rows;
          this.total = tab.total;
          this.size = tab.currentPageTotal;
          this.currentPage = tab.currentPage;
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
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
    handleEdit(e, row) {
      this.state = e;
      this.show = true;
      this.diaTitle = "编辑管理员";
      adminCheck(row.id).then(res => {
        if (res.code == 200) {
          this.formData = res.data;
        }
      });
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.initData();
    },
    //分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.initData();
    },
    //确认删除
    sendMessage() {
      deleteAdminManage(this.deleteId).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "已删除",
            type: "success"
          });
          this.initData();
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    //管理员编辑
    sendRole(e) {
      if (!this.state) {
        editAdminManage(e).then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "编辑成功",
              type: "success"
            });
            this.initData();
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "warning"
            });
          }
        });
      } else {
        addAdminManage(e).then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "添加成功",
              type: "success"
            });
            this.initData();
          } else {
            this.$message({
              showClose: true,
              message: res.msg,
              type: "warning"
            });
          }
        });
      }
    },
    //添加管理员
    addNew(e) {
      this.state = e;
      this.show = true;
      this.diaTitle = "添加管理员";
      this.formData = "";
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../../style.scss";
.banner {
  width: 200px;
  margin: 0 auto;
  img {
    width: 100%;
  }
}
</style>
