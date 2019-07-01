<template>
    <div>
        <div class="page_view">
            <el-button  class="backSubmit" @click="backSubmit">返回</el-button>
            <div class="use_list">
                <span class="h5">估算用户</span>
                <img class="img" src="" alt="">
                <span class="name">岁月清风</span>
            </div>
            <div class="use_list use_margin">
               <section>
                    <span class="h5">项目编号</span>
                    <span class="code">12465841215</span>
               </section>
               <section>
                    <span class="h5">估算日期</span>
                    <span class="code">2019-04-12</span>
               </section>
               <section>
                    <span class="h5">有效估算</span>
                    <span class="code">是</span>
               </section>
            </div>
            <div class="use_list title_list">
                <span class="h5">投资估算</span>
            </div>
            <div class="use_list use_margin">
                <section>
                    <span class="title">项目基本情况表</span>
                    <div class="content">
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                        <p>
                            <span class="grey">项目区位:浙江省-杭州市-余杭区</span>
                        </p>
                        <div class="table">
                            <div class="th">
                                <span class="tr">分类名称</span>
                                <span class="tr">分类建筑面积</span>
                            </div>
                            <div class="th">
                                <span class="td">住宅</span>
                                <span class="td">233,455.00 M²</span>
                            </div>
                            <div class="th">
                                <span class="td">住宅</span>
                                <span class="td">233,455.00 M²</span>
                            </div>
                        </div>
                    </div>
                </section>
                <section>
                    <span class="title">项目建设成本估算</span>
                    <div class="content">
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                    </div>
                </section>
                <section>
                    <span class="title">项目建设其他费用估算</span>
                    <div class="content">
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                    </div>
                </section>
            </div>
            <div class="use_list title_list">
                <span class="h5">货值与资金估算</span>
            </div>
            <div class="use_list no_margin">
                <section class="no_margin">
                    <span class="title">项目总货值：19,386,499,556 万元</span>
                </section>
            </div>
            <div class="use_list use_margin">
                <section>
                    <span class="title">项目金融成本估算</span>
                    <div class="content">
                        <span class="h4_blue">项目总金额成本：939，9980 万元</span>
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                    </div>
                </section>
                <section>
                    <span class="title">项目基本情况表</span>
                    <div class="content">
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                    </div>
                </section>
                <section>
                    <span class="title">项目基本情况表</span>
                    <div class="content">
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                    </div>
                </section>
                <section>
                    <span class="title">车位货值表</span>
                    <div class="content">
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                        <p>
                            <span class="grey">项目名称:南方设计一号院</span>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name:'EstimateDetail',
    data() {
        return {

        }
    },
    mounted(){
    },
    methods:{
        //返回
        backSubmit(){
            this.$router.go(-1)
        },
    }   
}
</script> 

<style lang="scss" scoped>
@import '../style.scss';
.page_view{
    padding-left: 30px;
    .use_margin{
        margin:0 -2%;
    }
    .title_list{
        margin-bottom: 10px;
    }
    .no_margin{
        margin:0 0 30px 0;
    }
    .use_list{
        .no_margin{
            margin:0;
            min-width:96%;
            .title{
                padding:10px;
                color:$blue;
                font-size: 20px;
            }
        }
    }
    
}
</style>
