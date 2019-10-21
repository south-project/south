<template>
  <div>
    <div class="page_view">
      <el-button class="backSubmit" @click="backSubmit">返回</el-button>
      <div class="use_list" style="align-items:center">
        <span class="h5">估算用户</span>
        <!-- <img class="img" :src="headImg!=null?'headImg':'../../../static/img/login/icon.png'" alt /> -->
        <el-avatar class="img" :src="headImg"></el-avatar>
        <span class="name">{{list.name}}</span>
      </div>
      <div class="use_list use_margin">
        <section>
          <span class="h5">项目编号</span>
          <span class="code">{{list.id}}</span>
        </section>
        <section>
          <span class="h5">估算日期</span>
          <span class="code">{{list.estimateTime}}</span>
        </section>
        <section>
          <span class="h5">有效估算</span>
          <span class="code">{{list.effectiveEstimate}}</span>
        </section>
      </div>
      <div class="use_list title_list">
        <span class="h5">投资估算</span>
      </div>
      <div class="use_list use_margin">
        <!-- 111 -->
        <section>
          <span class="title">项目基本情况表</span>
          <div class="content">
            <p>
              <span class="grey">项目名称:{{list.name}}</span>
            </p>
            <p>
              <span class="grey">项目区位:{{list.projectAddress}}</span>
            </p>
            <p>
              <span class="grey">建设类型:{{list.buildType|getBuildType}}</span>
            </p>
            <p>
              <span class="grey">用地类型:{{list.landType}}</span>
            </p>
            <p>
              <span class="grey">用地面积:{{list.a1|getMetter}}</span>
            </p>
            <p>
              <span class="grey">容积率:{{list.a2}}</span>
            </p>
            <p>
              <span class="grey">绿地率:{{list.a3}}%</span>
            </p>
            <p>
              <span class="grey">建筑密度:{{list.a4}}%</span>
            </p>
            <p>
              <span class="grey">计容建筑总面积:{{list.b2|getMetter}}</span>
            </p>
            <p>
              <span class="grey">计容建筑总面积:{{list.b2|getMetter}}</span>
            </p>
            <p v-if="buildType==2">
              <span class="grey">改建部分建筑面积:{{list.a8|getMetter}}</span>
            </p>
            <p v-if="buildType==2">
              <span class="grey">新建部分建筑面积:{{list.a9|getMetter}}</span>
            </p>
            <div class="table" v-if="buildType!=1">
              <div class="th">
                <span class="tr">分类名称</span>
                <span class="tr">分类建筑面积</span>
              </div>
              <div class="th" v-for="(v,index) in tableData" :key="index">
                <span class="td">{{v.typeName}}</span>
                <span class="td">{{v.typeArea|getMetter}}</span>
              </div>
            </div>
            <p>
              <span class="grey">人防面积:{{list.a5|getMetter}}</span>
            </p>
            <p>
              <span class="grey">地下面积:{{list.a6 |getMetter}}</span>
            </p>
            <p>
              <span class="grey">车位数量:{{list.a7}}个</span>
            </p>
          </div>
        </section>
        <!-- 项目改造成本 -->
        <section>
          <span class="title">项目建设成本估算</span>
          <div class="content">
            <div class="blue_title">项目建设总成本:{{list.c25 | getEstimate}}</div>
            <!-- 新建 -->
            <div v-if="buildType==0">
              <p>
                <span class="grey">用地成本:{{list.c0 | getEstimate}}</span>
              </p>
              <p>
                <span class="grey">拆迁补偿:{{list.c1| getEstimate}}</span>
              </p>
              <p>
                <span class="grey">三通一平:{{list.c3| getEstimate}}</span>
              </p>
            </div>
            <!-- 混建 -->
            <div v-if="buildType==2">
              <p>
                <span class="grey">改建建筑总成本:{{list.c26| getEstimate}}</span>
              </p>
              <p>
                <span class="grey">新建建筑总成本:{{list.c14| getEstimate}}</span>
              </p>
            </div>
            <p>
              <span class="grey">计容建筑总造价:{{list.c16| getEstimate}}</span>
            </p>
            <div class="table" v-if="buildType!=1">
              <div class="th">
                <span class="tr">分类名称</span>
                <span class="tr">分类建筑面积</span>
              </div>
              <div class="th" v-for="(v,index) in tableData" :key="index">
                <span class="td">{{v.typeName}}</span>
                <span class="td">{{v.cost|getEstimate}}</span>
              </div>
            </div>
            <p>
              <span class="grey">地下建筑造价:{{list.c16|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">人防成本:{{list.c18|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">景观绿化成本:{{list.c20|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">装修成本:{{list.c29|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">道路管网成本:{{list.c22|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">广场硬地成本:{{list.c24|getEstimate}}</span>
            </p>
          </div>
        </section>
        <!-- 其他费用估算 -->
        <section v-if="buildType!=1">
          <span class="title">项目建设其他费用估算</span>
          <div class="content">
            <div class="blue_title">静态总投资:{{list.d17|getEstimate}}</div>
            <p>
              <span class="grey">建设管理费:{{list.d1|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">施工监理费:{{list.d2|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">前期咨询费-项目建议书编制:{{list.d3|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">前期咨询费-可行性研究报告编制:{{list.d4|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">勘察设计费-设计费:{{list.d5|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">勘察设计费-勘察费:{{list.d6|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">节能评估审查费:{{list.d7|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">施工图设计审查费:{{list.d8|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">环境影响评价费:{{list.d9|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">劳动卫生评价费:{{list.d10|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">场地准备及临时设施费:{{list.d11|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">工程保险费:{{list.d12|getEstimate}}</span>
            </p>
            <p>
              <span class="grey">市政公用设施费:按各地要求为准</span>
            </p>
            <p>
              <span class="grey">城市基础设施配套费:按各地要求为准</span>
            </p>
            <p>
              <span class="grey">供电设施高可靠性供电费:按各地要求为准</span>
            </p>
            <p>
              <span class="grey">基本预备费:{{list.c16|getEstimate}}</span>
            </p>
          </div>
        </section>
      </div>
      <!-- 111 -->
      <div class="isValue" v-if="isValueEstimation==1">
        <div class="use_list title_list">
          <span class="h5">货值与资金估算</span>
        </div>
        <div class="use_list no_margin">
          <section class="no_margin">
            <span class="title">项目总货值：{{list.h12|getEstimate}}</span>
          </section>
        </div>
        <div class="use_list use_margin">
          <!-- 成本估算 分期 -->
          <section>
            <span class="title">项目金融成本估算</span>
            <div class="content">
              <span class="h4_blue">项目总金额成本：{{list.t12|getEstimate}}</span>
              <div v-if="list.buildType==0">
                <p>
                  <span class="grey">项目用地取得费用:{{list.t01|getEstimate}}</span>
                </p>
                <p>
                  <span class="grey">项目用地取得金融成本:{{list.t02|getEstimate}}</span>
                </p>
                <p>
                  <span class="grey">项目一级整理费用:{{list.t03|getEstimate}}</span>
                </p>
                <p>
                  <span class="grey">项目一级整理金融费用:{{list.t04|getEstimate}}</span>
                </p>
              </div>
              <div v-if="list.buildType!=0">
                <p>
                  <span class="grey">项目/土地整体权益取得成本:{{list.t1|getEstimate}}</span>
                </p>
                <p>
                  <span class="grey">项目/土地整体权益取得总金融成本:{{list.t2|getEstimate}}</span>
                </p>
              </div>

              <p>
                <span class="grey">建设资金总投入:{{list.t3|getEstimate}}</span>
              </p>
              <p>
                <span class="grey">建设资金总金融成本:{{list.t10|getEstimate}}</span>
              </p>
              <div class="table">
                <div class="th">
                  <span class="tr">分期</span>
                  <span class="tr">分期建设金额成本</span>
                </div>
                <div class="th" v-for="(v,index) in tableList" :key="index">
                  <span class="td">{{index|getNumber}}期</span>
                  <span class="td">{{v.deadLine|getEstimate}}</span>
                </div>
              </div>
              <div v-if="list.buildType!=1">
                <p>
                  <span class="grey">项目建设其他费用成本:{{list.t13|getEstimate}}</span>
                </p>
                <p>
                  <span class="grey">项目建设其他费用金融成本:{{list.t14|getEstimate}}</span>
                </p>
              </div>

              <p>
                <span class="grey">销售,运营成本:{{list.t11|getEstimate}}</span>
              </p>
            </div>
          </section>
          <!-- 分类 -->
          <section
            v-for="(v,index) in tableData"
            :key="index"
            v-show="buildType!=1 &&v.isHandOver!=1"
          >
            <span class="title">{{v.typeName}}分类建筑货值表</span>
            <div class="content">
              <div class="blue_title">{{v.typeName}}分类建筑总货值:{{v.v17a|getEstimate}}</div>
              <p>
                <span
                  class="grey"
                  v-if="v.selfSustaining==1||v.selfSustaining==3"
                >销售总面积:{{v.v1a|getMetter}}</span>
              </p>
              <p>
                <span
                  class="grey"
                  v-if="v.selfSustaining==1||v.selfSustaining==3"
                >销售总收入:{{v.v14a|getEstimate}}</span>
              </p>
              <div
                class="table"
                v-if="v.partSaleTypeDtoList!=''||v.selfSustaining==3||v.selfSustaining==1"
              >
                <div class="th">
                  <span class="tr">分期</span>
                  <span class="tr">分期销售面积</span>
                  <span class="tr">分期销售收入</span>
                </div>
                <div class="th" v-for="(item,index) in v.partSaleTypeDtoList" :key="index">
                  <span class="td">{{index|getNumber}}期</span>
                  <span class="td">{{item.saleArea|getMetter}}</span>
                  <span class="td">{{item.salePrice|getEstimate}}</span>
                </div>
              </div>
              <p>
                <span
                  class="grey"
                  v-if="v.selfSustaining==2||v.selfSustaining==3"
                >出租面积:{{v.v15a|getMetter}}</span>
              </p>
              <p>
                <span
                  class="grey"
                  v-if="v.selfSustaining==2||v.selfSustaining==3"
                >出租收入:{{v.v16a|getEstimate}}</span>
              </p>
            </div>
          </section>
          <!-- 2222 -->
          <section>
            <span class="title">车位货值表</span>
            <div class="content">
              <div class="blue_title">车位总货值:{{list.h11|getEstimate}}</div>
              <p>
                <span class="grey">车位总数:{{list.a7}}个</span>
              </p>
              <p>
                <span
                  class="grey"
                  v-if="parking_space_type==0||parking_space_type==2"
                >可售车位数:{{list.h7}}个</span>
              </p>
              <p>
                <span
                  class="grey"
                  v-if="parking_space_type==1||parking_space_type==2"
                >出租车位数:{{list.h8}}个</span>
              </p>
              <p>
                <span
                  class="grey"
                  v-if="parking_space_type==0||parking_space_type==2"
                >车位销售收入:{{list.h9|getEstimate}}</span>
              </p>
              <p>
                <span
                  class="grey"
                  v-if="parking_space_type==1||parking_space_type==2"
                >车位出租收入:{{list.h10|getEstimate}}</span>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { estimateClear } from "@/api/getData";
export default {
  name: "EstimateDetail",
  data() {
    return {
      list: {},
      tableData: [],
      tableList: [],
      buildType: 0,
      headImg: null,
      isValueEstimation: 0, //0无效 1有效
      isHandOver: 0, //0有分类 1移交政府
      parking_space_type: 0
    };
  },
  mounted() {
    this.initData();
  },
  methods: {
    async initData() {
      let param = JSON.parse(localStorage.getItem("estimateParam"));
      await estimateClear(param).then(res => {
        if (res.code == 200) {
          this.list = res.data;
          this.tableData = res.data.typeAllDetailDto;
          this.tableList = res.data.deadlineList;
          this.buildType = res.data.buildType;
          this.headImg = res.data.headimg;
          this.isValueEstimation = res.data.isValueEstimation;
          this.parking_space_type = res.data.parkingSpaceType;
        } else {
          this.$message({
            showClose: true,
            message: res.msg,
            type: "warning"
          });
        }
      });
    },
    //返回
    backSubmit() {
      this.$router.go(-1);
    }
  }
};
</script> 

<style lang="scss" scoped>
@import "../style.scss";
.page_view {
  padding-left: 30px;
  .blue_title {
    color: $blue;
    padding: 10px 0;
    font-size: 16px;
  }
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
