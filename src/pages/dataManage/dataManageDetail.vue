<template>
  <div>
    <div class="page_view">
      <el-button class="backSubmit" @click="backSubmit">返回</el-button>
      <el-form
        :inline="true"
        :model="formInline"
        ref="formInline"
        class="demo-form-inline form"
        size="medium"
      >
        <el-form-item label="项目区位" class="middle">
          <SelectOption
            @choseProvince="choseProvince"
            @choseCity="choseCity"
            :coreState="false"
            ref="myChild"
          />
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
      <div class="set_button">
        <!-- <el-button @click="searchInfo" type="primary">批量设为有效估算</el-button> -->
        <el-button @click="ChangeSelection">批量修改预设单价</el-button>
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
        <el-table-column label="省份" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="城市" width="120"></el-table-column>
        <el-table-column prop="address" label="预设单价(万元/亩)"></el-table-column>
        <el-table-column prop="address" label="平均单价(万元/亩)"></el-table-column>
        <el-table-column prop="date" label="采用数据"></el-table-column>
        <el-table-column prop="address" label="有效估算"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text">采用预设单价</el-button>
            <el-button type="text" @click="handleSet(scope.row)">修改预设单价</el-button>
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
    <PriceTip
      :showpreview.sync="showpreview"
      :diaTitle="diaTitle"
      @sendMessage="sendMessage"
      :paramTips="paramTips"
      :coreState="coreState"
    />
  </div>
</template>

<script>
import PriceTip from "@/components/priceTips";
import SelectOption from "@/components/select";
export default {
  name: "DataManageDetail",
  components: {
    PriceTip,
    SelectOption
  },
  data() {
    return {
      formInline: {
        status: "",
        sheng: "",
        shi: ""
      },
      multipleSelection: [],
      showpreview: false,
      diaTitle: "",
      paramTips: "",
      coreState: false,
      classItem: [
        { label: "平均单价", value: "1" },
        { label: "预设单价", value: "2" }
      ],
      tableData: [
        {
          date: "浙江",
          name: "金华",
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
    this.$route.meta.name = this.$route.params.data;
  },
  methods: {
    //返回
    backSubmit() {
      this.$router.go(-1);
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
    //表格选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //批量修改预设单价
    ChangeSelection() {
      if (this.multipleSelection == "") {
        this.$message("请选择");
        return;
      }
      this.showpreview = true;
      this.diaTitle = "批量修改预设单价";
      this.coreState = true;
      this.paramTips = this.multipleSelection;
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
      this.$router.push("/Estimate/detail");
    },
    //设置(有效估算)
    handleSet(row) {
      console.log(row);
      this.showpreview = true;
      this.diaTitle = "修改预设单价";
      this.paramTips = row;
    },
    //修改预设单价表单提交
    sendMessage() {},
    //省级选择
    choseProvince(e) {
      this.formInline.sheng = e.sheng;
      this.formInline.shi = e.shi;
    },
    //市级选择
    choseCity(e) {
      this.formInline.shi = e.shi;
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
.page_view {
  padding-left: 30px;
  .use_margin {
    margin: 0 -2%;
  }
  .title_list {
    margin-bottom: 10px;
  }
  .no_margin {
    margin: 0 0 30px 0;
  }
  .use_list {
    .no_margin {
      margin: 0;
      min-width: 96%;
      .title {
        padding: 10px;
        color: $blue;
        font-size: 20px;
      }
    }
  }
}
</style>
