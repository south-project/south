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
        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="formInline.nickname" placeholder="请输入昵称"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="formInline.mobile" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="注册时间" prop="dateTime">
          <el-date-picker
            v-model="formInline.dateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="用户类型" class="middle" prop="type">
          <el-select v-model="formInline.type" placeholder="请选择">
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
          <el-button type="primary" @click="handeleDownloadExcel">导出数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page_view">
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column label="头像昵称" width="120" prop="nickname"></el-table-column>
        <el-table-column prop="type" label="用户类型" width="120">
          <template slot-scope="scope">
            <span>{{scope.row.type | getUserType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="free_num" label="剩余免费次数"></el-table-column>
        <el-table-column prop="total_estimate_times" label="累计估算"></el-table-column>
        <el-table-column prop="valid_estimate_times" label="有效估算" :formatter="getBoole"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="create_time" label="注册日期"></el-table-column>
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
import { exportUserManage, userManage } from "@/api/getData";
import { openDownloadDialog, sheet2blob } from "@/api/downDialog";
import XLSX from "xlsx";
export default {
  data() {
    return {
      formInline: {
        nickname: "",
        name: "",
        mobile: "",
        type: "",
        dateTime: ""
      },
      classItem: [
        { label: "微信粉丝", value: "0" },
        { label: "认证会员", value: "1" }
      ],
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
      let param = {};
      param.pageNum = this.currentPage;
      param.pageSize = this.size;
      userManage(param).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.rows;
          this.currentPage = res.data.currentPage;
          this.size = res.data.currentPageTotal;
          this.total = res.data.total;
        }
      });
    },
    //是否过滤
    getBoole(val) {
      if (val.effective_estimate == 0) {
        return "否";
      } else {
        return "是";
      }
    },
    //搜索
    searchInfo() {
      let param = this.formInline;
      param.pageNum = this.currentPage;
      param.pageSize = this.size;
      if (this.formInline.dateTime != "") {
        param.beginDate = this.formInline.dateTime[0];
        param.endDate = this.formInline.dateTime[1];
      }
      userManage(param).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.rows;
          this.currentPage = res.data.currentPage;
          this.size = res.data.currentPageTotal;
          this.total = res.data.total;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initData();
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.size = val;
      this.initData();
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
      this.initData();
    },
    //详情
    handleDetail(row) {
      console.log(row);
      this.$router.push({ path: `/UserManage/detail/${row.id}` });
    },
    //导出数据
    handeleDownloadExcel() {
      // let param = this.formInline;
      // param.pageNum = this.currentPage;
      // param.pageSize = this.size;
      // if (this.formInline.dateTime != "") {
      //   param.beginDate = this.formInline.dateTime[0];
      //   param.endDate = this.formInline.dateTime[1];
      // }
      let param = {};
      // param.pageNum = this.currentPage;
      // param.pageSize = this.size;
      exportUserManage().then(res => {
        console.log(res);
        var sheet = XLSX.utils.aoa_to_sheet(res.data);
        openDownloadDialog(sheet2blob(sheet), "用户管理.xlsx");
      });
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
</style>
