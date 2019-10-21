<template>
  <div>
    <div class="page_view">
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
            @choseBlock="choseBlock"
            :coreState="true"
            ref="myChild"
          />
        </el-form-item>

        <el-form-item>
          <el-button @click="resetForm('formInline')">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchInfo" type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item class="addNew">
          <el-button type="primary" @click="handleDownloadExcel">导出数据</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="page_view">
      <el-table :data="tableData" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column label="省份" width="120" prop="province"></el-table-column>
        <el-table-column prop="city" label="城市" width="120"></el-table-column>
        <el-table-column prop="district" label="区县"></el-table-column>
        <el-table-column prop="carPrice" label="平均销售单价(万元/M²)"></el-table-column>
        <el-table-column prop="yearPrice" label="平均年租金(元)"></el-table-column>
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
import SelectOption from "@/components/select";
import { queryAllCarValueType, carExpExcelData } from "@/api/getData";
import { openDownloadDialog, sheet2blob } from "@/api/downDialog";
import XLSX from "xlsx";
export default {
  name: "constructionManageDetail",
  components: {
    SelectOption
  },
  data() {
    return {
      formInline: {
        status: "",
        sheng: "",
        qu: "",
        shi: ""
      },
      param: "",
      showpreview: false,
      diaTitle: "",
      paramTips: "",
      coreState: false,
      tableData: [],
      currentPage: 1,
      size: 10,
      total: 400
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let param = {};
      param.pageNum = this.currentPage;
      param.pageSize = this.size;
      param.provinceCode = this.formInline.sheng;
      param.cityCode = this.formInline.shi;
      param.districtCode = this.formInline.qu;
      this.param = param;
      queryAllCarValueType(param).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.rows;
          this.currentPage = res.data.currentPage;
          this.size = res.data.currentPageTotal;
          this.total = res.data.total;
        }
      });
    },
    //导出数据
    handleDownloadExcel() {
      carExpExcelData(this.param).then(res => {
        var sheet = XLSX.utils.aoa_to_sheet(res.data);
        openDownloadDialog(sheet2blob(sheet), "车位货值.xlsx");
      });
    },
    //返回
    backSubmit() {
      this.$router.go(-1);
    },
    //搜索
    searchInfo() {
      console.log(this.formInline);
      this.initData();
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.myChild.resetForm();
      this.formInline.sheng = "";
      this.formInline.shi = "";
      this.formInline.qu = "";
      this.initData();
    },
    //分页
    handleSizeChange(val) {
      this.size = val;
      this.initData();
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initData();
    },
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
