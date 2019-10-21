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
            @choseBlock="choseBlock"
            :coreState="true"
            ref="myChild"
          />
        </el-form-item>
        <el-form-item label="采用数据" class="middle" prop="useData">
          <el-select v-model="formInline.useData" placeholder="请选择">
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
          <el-button type="primary" @click="handleDownloadExcel">导出数据</el-button>
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
        <el-table-column label="省份" width="120" prop="province"></el-table-column>
        <el-table-column prop="city" label="城市"></el-table-column>
        <el-table-column prop="district" label="区县"></el-table-column>
        <el-table-column prop="reservePrice" label="预设单价(万元/M²)"></el-table-column>
        <el-table-column prop="buildingTypePrice" label="平均单价(万元/M²)"></el-table-column>
        <el-table-column prop="useData" label="采用数据">
          <template slot-scope="scope">
            <span>{{scope.row.useData | getPriceType}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="handleDetail(scope.row)"
              type="text"
              v-if="scope.row.useData==1"
            >采用预设单价</el-button>
            <el-button
              @click="handleDetail(scope.row)"
              type="text"
              v-if="scope.row.useData==0"
            >采用平均单价</el-button>
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
import {
  queryAllBuildTypePrice,
  updateReservePrice,
  batchUpdateReservePrice,
  buildExpExcelData,
  setAvgAllPrice
} from "@/api/getData";
import { openDownloadDialog, sheet2blob } from "@/api/downDialog";
import XLSX from "xlsx";
export default {
  name: "BuildManageDetail",
  components: {
    PriceTip,
    SelectOption
  },
  data() {
    return {
      formInline: {
        areaCode: "",
        useData: "",
        sheng: "110000",
        shi: "",
        qu: ""
      },
      multipleSelection: [],
      showpreview: false,
      diaTitle: "",
      paramTips: {},
      coreState: false,
      buildName: "",
      param: "",
      classItem: [
        { label: "平均单价", value: "1" },
        { label: "预设单价", value: "2" }
      ],
      tableData: [],
      currentPage: 1,
      size: 10,
      total: 400
    };
  },
  mounted() {
    let typeId = this.$route.params.data;
    let buildType = this.$store.state.buildType;
    buildType.map(item => {
      if (item.id == typeId) {
        this.$route.meta.name = item.building_name;
        this.buildName = item.building_name;
      }
    });
    this.initData(typeId);
  },
  methods: {
    initData(id) {
      let param = {};
      param.pageNum = this.currentPage;
      param.pageSize = this.size;
      param.typeId = id;
      param.provinceCode = this.formInline.sheng;
      param.cityCode = this.formInline.shi;
      param.districtCode = this.formInline.qu;
      param.useData = this.formInline.useData;
      this.param = param;
      queryAllBuildTypePrice(param).then(res => {
        if (res.code == 200) {
          this.tableData = res.data.rows;
          this.currentPage = res.data.currentPage;
          this.size = res.data.currentPageTotal;
          this.total = res.data.total;
        }
      });
    },
    //返回
    backSubmit() {
      this.$router.go(-1);
    },
    //导出数据
    handleDownloadExcel() {
      buildExpExcelData(this.param).then(res => {
        var sheet = XLSX.utils.aoa_to_sheet(res.data);
        openDownloadDialog(sheet2blob(sheet), this.buildName + ".xlsx");
      });
    },
    //搜索
    searchInfo() {
      this.initData(this.$route.params.data);
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$refs.myChild.resetForm();
      this.formInline.sheng = "";
      this.formInline.shi = "";
      this.formInline.qu = "";
      this.initData(this.$route.params.data);
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
      let param = {};
      param.len = this.multipleSelection.length;
      this.paramTips = param;
    },
    //分页
    handleSizeChange(val) {
      this.size = val;
      this.initData(this.$route.params.data);
    },
    //分页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.initData(this.$route.params.data);
    },
    //采用预设单价
    handleDetail(row) {
      let param = {};
      param.id = row.id;
      if (row.useData == 0) {
        param.useData = 1;
      } else {
        param.useData = 0;
      }
      setAvgAllPrice(param).then(res => {
        if (res.code == 200) {
          this.$message({
            showClose: true,
            message: "修改成功",
            type: "success"
          });
          this.initData(this.$route.params.data);
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    //设置(有效估算)
    handleSet(row) {
      this.showpreview = true;
      this.diaTitle = "修改预设单价";
      this.coreState = false;
      this.paramTips = row;
    },
    //修改预设单价表单提交
    sendMessage(e) {
      let param = {};
      param.reservePrice = e.price;
      if (!this.coreState) {
        param.id = this.paramTips.id;
        updateReservePrice(param).then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "修改成功",
              type: "success"
            });
            setTimeout(() => this.initData(this.$route.params.data), 500);
          } else {
          }
        });
      } else {
        let arr = [];
        this.multipleSelection.map(item => arr.push(item.id));
        param.idList = arr;
        batchUpdateReservePrice(param).then(res => {
          if (res.code == 200) {
            this.$message({
              showClose: true,
              message: "批量修改成功",
              type: "success"
            });
            setTimeout(() => this.initData(this.$route.params.data), 500);
          } else {
          }
        });
      }
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
