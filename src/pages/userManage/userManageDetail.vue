<template>
  <div>
    <div class="page_view">
      <el-button class="backSubmit" @click="backSubmit">返回</el-button>
      <div class="user_head">
        <img class="img" src alt />
        <div class="user_data">
          <ul>
            <li>
              <p>
                <span class="left">昵称</span>
                <span class="right">岁月清风</span>
              </p>
              <p>
                <span class="left">姓名</span>
                <span class="right">雷三</span>
              </p>
              <p>
                <span class="left">公司</span>
                <span class="right">南方设计</span>
              </p>
            </li>
            <li>
              <p>
                <span class="left">用户类型</span>
                <span class="right">认证会员</span>
              </p>
              <p>
                <span class="left">手机号</span>
                <span class="right">18965326650</span>
              </p>
              <p>
                <span class="left">职位</span>
                <span class="right">设计师</span>
              </p>
            </li>
            <li>
              <p>
                <span class="left">剩余免费次数</span>
                <span class="right">--</span>
              </p>
              <p>
                <span class="left">累计次数</span>
                <span class="right">56</span>
              </p>
              <p>
                <span class="left">有限次数</span>
                <span class="right">12</span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page_view">
      <h5 class="h5_title">
        <i></i>
        <span>估算记录</span>
      </h5>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        border
      >
        <el-table-column label="项目编号" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>
        <el-table-column prop="name" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="address" label="项目区位"></el-table-column>
        <el-table-column prop="address" label="建设类型"></el-table-column>
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
export default {
  components: {
    WordTip
  },
  name: "UserManageDetail",
  data() {
    return {
      showpreview: false,
      diaTitle: "",
      paramTips: "",
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
  mounted() {},
  methods: {
    //返回
    backSubmit() {
      this.$router.go(-1);
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
