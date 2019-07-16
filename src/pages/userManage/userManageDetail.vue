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
                <span class="right">{{userData.nickname}}</span>
              </p>
              <p>
                <span class="left">姓名</span>
                <span class="right">{{userData.name}}</span>
              </p>
              <p>
                <span class="left">公司</span>
                <span class="right">{{userData.company}}</span>
              </p>
            </li>
            <li>
              <p>
                <span class="left">用户类型</span>
                <span class="right">{{userData.type | getUserType}}</span>
              </p>
              <p>
                <span class="left">手机号</span>
                <span class="right">{{userData.mobile}}</span>
              </p>
              <p>
                <span class="left">职位</span>
                <span class="right">{{userData.position}}</span>
              </p>
            </li>
            <li>
              <p>
                <span class="left">剩余免费次数</span>
                <span class="right">{{userData.free_num}}</span>
              </p>
              <p>
                <span class="left">累计次数</span>
                <span class="right">{{userData.total_estimate_times}}</span>
              </p>
              <p>
                <span class="left">有限次数</span>
                <span class="right">{{userData.valid_estimate_times}}</span>
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
        <el-table-column label="项目编号" prop="id" width="120"></el-table-column>
        <el-table-column prop="project_name" label="项目名称" width="120"></el-table-column>
        <el-table-column prop="project_address" label="项目区位"></el-table-column>
        <el-table-column prop="build_type" label="建设类型">
          <template slot-scope="scope">
            <span>{{scope.row.build_type | getBuildType}}</span>
          </template>
        </el-table-column>
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
  </div>
</template>

<script>
import { userManageList, userManageRecords, setEffective } from "@/api/getData";
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
      rowId: "",
      param: {},
      userData: {},
      tableData: [],
      currentPage: 1,
      size: 10,
      total: 400
    };
  },
  mounted() {
    this.rowId = this.$route.params.id;
    this.initData();
  },
  methods: {
    async initData() {
      await userManageList(this.rowId).then(res => {
        //用户信息
        if (res.code == 200) {
          this.userData = res.data;
        }
      });
      await userManageRecords(this.rowId).then(res => {
        //估算记录
        if (res.code == 200) {
          this.tableData = res.data;
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
    //返回
    backSubmit() {
      //this.$router.go(-1);
      this.$router.push("/UserManage");
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
    },
    //提交表单
    sendMessage(e) {
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
