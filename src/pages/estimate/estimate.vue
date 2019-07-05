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
        <el-form-item label="项目编号" prop="code">
          <el-input v-model="formInline.code" placeholder="请输入项目编号"></el-input>
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
        <el-form-item label="估算用户">
          <el-input v-model="formInline.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="建设类型" class="middle">
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option
              v-for="(item,index) in classItem"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="有效估算" class="middle">
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option
              v-for="(item,index) in classItem"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="估算时间">
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
        <el-table-column type="selection" width="55" label="全选"></el-table-column>
        <el-table-column label="项目编号" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="address" label="项目区位"></el-table-column>
        <el-table-column prop="address" label="建设类型"></el-table-column>
        <el-table-column prop="address" label="估算用户"></el-table-column>
        <el-table-column prop="address" label="总建设成本(万元)"></el-table-column>
        <el-table-column prop="address" label="总货值(万元)"></el-table-column>
        <el-table-column prop="date" label="估算日期"></el-table-column>
        <el-table-column prop="address" label="有效估算"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text">详情</el-button>
            <el-button type="text" @click="handleSet(scope.row)">设为有效估算</el-button>
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
        code: "",
        status: "",
        name: "",
        sheng: "",
        shi: "",
        qu: "",
        dateTime: ""
      },
      showpreview: false,
      diaTitle: "",
      paramTips: "11",
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
      multipleSelection: [],
      currentPage: 1,
      size: 10,
      total: 400
    };
  },
  mounted() {
    //console.log(mapList)
  },
  methods: {
    //省级选择
    choseProvince(e) {
      this.formInline.sheng = e.sheng;
      this.formInline.shi = e.shi;
      this.formInline.qu = e.qu;
    },
    //市级选择
    choseCity(e) {
      this.formInline.shi = e.shi;
      this.formInline.qu = e.qu;
    },
    //区级选择
    choseBlock(e) {
      this.formInline.qu = e.qu;
    },
    //搜索
    searchInfo() {
      console.log(this.formInline);
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formInline = {};
      this.$refs.myChild.resetForm();
    },
    //批量设为有效估算
    handleBauch() {
      if (this.multipleSelection == "") {
        this.$message({
          showClose: true,
          message: "请选择",
          type: "warning"
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
    //设置(有效估算)
    handleSet(row) {
      this.showpreview = true;
      this.diaTitle = "设为有效估算";
      this.paramTips =
        "设为有效估算,该记录的相关数据将作为‘采集样本数据’参与各项数据的平均价格计算当中去，确认设为有效估算吗？";
    },
    //提交表单
    sendMessage(e) {
      console.log(e);
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
</style>
