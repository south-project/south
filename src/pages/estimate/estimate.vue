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
        <el-form-item label="项目编号" prop="id">
          <el-input v-model="formInline.id" placeholder="请输入项目编号"></el-input>
        </el-form-item>
        <el-form-item label="项目区位" class="middle">
          <SelectOption
            @choseProvince="choseProvince"
            @choseCity="choseCity"
            @choseBlock="choseBlock"
            :coreState="true"
            ref="myChild"
          />
        </el-form-item>
        <el-form-item label="估算用户" prop="name">
          <el-input v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="建设类型" class="middle" prop="buildType">
          <el-select v-model="formInline.buildType" placeholder="请选择">
            <el-option
              v-for="(item,index) in buildType"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效估算" class="middle" prop="effectiveEstimate">
          <el-select v-model="formInline.effectiveEstimate" placeholder="请选择">
            <el-option
              v-for="(item,index) in option"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="估算时间" prop="dateTime">
          <el-date-picker
            v-model="formInline.dateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
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
      <div class="set_button">
        <el-button @click="handleBauch" type="primary">批量设为有效估算</el-button>
        <el-button @click="handleDebauch">批量取消有效估算</el-button>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="项目编号" prop="id" width="120"></el-table-column>
        <el-table-column prop="project_name" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="project_address" label="项目区位"></el-table-column>
        <el-table-column prop="build_type" label="建设类型">
          <template slot-scope="scope">
            <span>{{scope.row.build_type | getBuildType}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="估算用户"></el-table-column>
        <el-table-column prop="c25" label="总建设成本(万元)"></el-table-column>
        <el-table-column prop="h12" label="总货值(万元)"></el-table-column>
        <el-table-column prop="estimate_time" label="估算日期"></el-table-column>
        <el-table-column prop="effective_estimate" label="有效估算" :formatter="getBoole"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text">详情</el-button>
            <el-button
              type="text"
              @click="handleSet(scope.row)"
              v-if="scope.row.effective_estimate==1"
            >取消有效设置</el-button>
            <el-button
              type="text"
              @click="handleSet(scope.row)"
              v-if="scope.row.effective_estimate==0"
            >设为有效估算</el-button>
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
  </div>
</template>

<script>
import {
  estimateManage,
  setEffective,
  setEstimateEffect,
  setEstimateUnEffect
} from "@/api/getData";
import WordTip from "@/components/setTips";
import SelectOption from "@/components/select";
export default {
  components: {
    WordTip,
    SelectOption
  },
  data() {
    return {
      formInline: {
        id: "",
        buildType: "",
        effectiveEstimate: "",
        name: "",
        province: "",
        city: "",
        district: "",
        dateTime: ""
      },
      param: [],
      showpreview: false,
      diaTitle: "",
      paramTips: "11",
      option: [
        { label: "无效估算", value: "0" },
        { label: "有效估算", value: "1" }
      ],
      buildType: [
        { label: "新建", value: "0" },
        { label: "改建", value: "1" },
        { label: "混建", value: "2" }
      ],
      classItem: [
        { label: "已上架", value: "1" },
        { label: "已下架", value: "2" },
        { label: "待上架", value: "3" },
        { label: "禁用中", value: "4" },
        { label: "解禁中", value: "5" }
      ],
      tableData: [],
      multipleSelection: [],
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
      let param = this.formInline;
      param.pageNum = this.currentPage;
      param.pageSize = this.size;
      estimateManage(param).then(res => {
        if (res.code == 200) {
          let tab = res.data;
          this.tableData = tab.rows;
          this.total = tab.total;
          this.size = tab.currentPageTotal;
          this.currentPage = tab.currentPage;
        }
      });
    },
    //省级选择
    choseProvince(e) {
      this.formInline.province = e.sheng;
      this.formInline.city = e.shi;
      this.formInline.district = e.qu;
    },
    //市级选择
    choseCity(e) {
      this.formInline.city = e.shi;
      this.formInline.district = e.qu;
    },
    //区级选择
    choseBlock(e) {
      this.formInline.district = e.qu;
    },
    //搜索
    searchInfo() {
      console.log(this.formInline);
      if (this.formInline.dateTime != "") {
        this.formInline.beginDate = this.formInline.dateTime[0];
        this.formInline.endDate = this.formInline.dateTime[1];
      }
      this.initData();
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.myChild.resetForm();
      this.initData();
    },
    //是否过滤
    getBoole(val) {
      if (val.effective_estimate == 0) {
        return "否";
      } else {
        return "是";
      }
    },
    //设置(有效估算)
    handleSet(row) {
      let param = {};
      param.id = row.id;
      if (row.effective_estimate == 0) {
        this.diaTitle = "设为有效估算";
        this.paramTips =
          "设为有效估算,该记录的相关数据将作为‘采集样本数据’参与各项数据的平均价格计算当中去，确认设为有效估算吗？";
        param.effective_estimate = 1;
      } else {
        this.diaTitle = "取消有效设置";
        this.paramTips = "确认取消有效设置吗？";
        param.effective_estimate = 0;
      }
      this.showpreview = true;
      this.param = param;
      console.log(this.param);
    },
    //批量设为有效估算
    handleBauch() {
      if (this.multipleSelection == "") {
        this.$message({
          showClose: true,
          message: "请选择",
          type: "warning"
        });
      } else {
        let arr = [];
        this.multipleSelection.map(item => arr.push(item.id));
        setEstimateEffect(arr).then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "设置成功",
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
    },
    //批量取消有效估算
    handleDebauch() {
      if (this.multipleSelection == "") {
        this.$message({
          showClose: true,
          message: "请选择",
          type: "warning"
        });
      } else {
        let arr = [];
        this.multipleSelection.map(item => arr.push(item.id));
        setEstimateUnEffect(arr).then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "取消成功",
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
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    //表格选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    //分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //详情
    handleDetail(row) {
      this.$router.push("/Estimate/detail");
    },
    //提交表单
    sendMessage(e) {
      console.log(this.param);
      setEffective(this.param.id, this.param.effective_estimate).then(res => {
        if (res.code == 200) {
          console.log(res);
          this.$message({
            showClose: true,
            message: "设置成功",
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
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
</style>
