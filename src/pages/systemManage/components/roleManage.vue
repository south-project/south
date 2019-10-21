<template>
  <div>
    <div class="card_title clearfix">
      <el-button type="primary" class="f_right" @click="addNew">添加角色</el-button>
    </div>
    <div class="page_view">
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column prop="name" label="角色名称" width="120"></el-table-column>
        <el-table-column prop="employee_num" label="员工数量"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagiNation">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>-->
    </div>
    <WordTip
      :showpreview.sync="showpreview"
      :diaTitle="diaTitle"
      @sendMessage="sendMessage"
      :paramTips="paramTips"
    />
    <roleEditor
      :show.sync="show"
      :diaTitle="diaTitle"
      @sendMessage="sendRole"
      :roleData="roleData"
      :menuData="menuData"
      :roleName="roleName"
    />
  </div>
</template>

<script>
import WordTip from "@/components/setTips";
import roleEditor from "@/components/roleEditor";
import {
  selectRoleCount,
  deleteRole,
  insertRole,
  editRoleCount,
  updateRole
} from "@/api/getData";
export default {
  components: {
    WordTip,
    roleEditor
  },
  data() {
    return {
      diaTitle: "",
      showpreview: false,
      show: false,
      state: null,
      deleteId: "",
      rowId: "",
      paramTips: "",
      roleName: "",
      menuData: [],
      roleData: [],
      tableData: [],
      currentPage: 1,
      size: 100,
      total: 400
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      selectRoleCount().then(res => {
        if (res.code == 200) {
          this.tableData = res.data;
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
      this.state = false;
      this.rowId = row.id;
      this.show = true;
      this.diaTitle = "编辑角色";
      this.roleName = row.name;
      editRoleCount(row.id).then(res => {
        let arr = [];
        res.data.map(item => arr.push(item.pId));
        this.menuData = arr;
      });
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //确认删除
    sendMessage(e) {
      deleteRole(this.deleteId).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "删除成功",
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
    //添加角色
    addNew() {
      this.state = true;
      this.show = true;
      this.diaTitle = "添加角色";
      this.roleName = "";
      this.menuData = [];
    },
    //角色提交
    sendRole(e) {
      let param = {};
      param.roleName = e.name;
      param.powerIdList = e.menuData;
      if (!this.state) {
        //编辑
        param.id = this.rowId;
        updateRole(param).then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "编辑成功",
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
      } else {
        //添加
        insertRole(param).then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "添加成功",
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
      }
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
