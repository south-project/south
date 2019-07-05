<template>
  <div>
    <div class="card_title">
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline form"
        size="medium"
      >
        <el-form-item label="昵称" prop="code">
          <el-input v-model="formInline.code" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="code">
          <el-input v-model="formInline.code" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="code">
          <el-input v-model="formInline.code" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="注册时间">
          <el-date-picker
            v-model="formInline.dateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="用户类型" class="middle">
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option
              v-for="(item,index) in classItem"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchInfo" type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item class="addNew">
          <router-link to="/class/addGraphic/add">
            <el-button type="primary">导出数据</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
    <div class="page_view">
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column label="头像昵称" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="用户类型" width="120"></el-table-column>
        <el-table-column prop="address" label="剩余免费次数"></el-table-column>
        <el-table-column prop="address" label="累计估算"></el-table-column>
        <el-table-column prop="address" label="有效估算"></el-table-column>
        <el-table-column prop="address" label="姓名"></el-table-column>
        <el-table-column prop="address" label="手机号"></el-table-column>
        <el-table-column prop="date" label="注册日期"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text">详情</el-button>
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        code: "",
        status: "",
        name: "",
        dateTime: ""
      },
      classItem: [
        { label: "已上架", value: "1" },
        { label: "已下架", value: "2" },
        { label: "待上架", value: "3" },
        { label: "禁用中", value: "4" },
        { label: "解禁中", value: "5" }
      ],
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      currentPage: 1,
      size: 10,
      total: 400
    };
  },
  mounted() {
    //console.log(mapList)
  },
  methods: {
    initData() {
      userManageList(this.currentPage, this.size).then(res => {
        console.log(res);
      });
    },
    //搜索
    searchInfo() {
      console.log(this.formInline);
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formInline = {};
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    //详情
    handleDetail(row) {
      this.$router.push("/UserManage/detail");
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
</style>
