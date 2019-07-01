<template>
    <div>
        <div class="page_view">
           <div class="flutter row">
               <section v-for="item in flutterList" :key="item.id" @click="goAsh(item)">
                   <span>{{item.name}}</span>
               </section>
           </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
           flutterList:[
               {name:'改建',id:'1'},
               {name:'住宅',id:'2'},
               {name:'商业经营',id:'3'},
               {name:'酒店住宿',id:'4'},
               {name:'餐饮服务',id:'5'},
               {name:'专门市场',id:'6'},
               {name:'物业运营',id:'7'},
               {name:'商务办公',id:'8'},
               {name:'创新创业',id:'9'},
               {name:'金融保险',id:'10'},
               {name:'娱乐康体',id:'11'},
               {name:'公共网点',id:'12'},
               {name:'行政办公',id:'13'},
               {name:'文化展览',id:'14'},
               {name:'广播电视',id:'15'},
               {name:'体育场馆',id:'16'},
               {name:'幼儿园',id:'17'},
               {name:'中小学',id:'18'},
               {name:'高等院校',id:'19'},
               {name:'医疗卫生',id:'20'},
               {name:'外事使馆',id:'21'},
               {name:'古迹宗教',id:'22'},
               {name:'旅游集散',id:'23'},
               {name:'消防减灾',id:'24'},
               {name:'环卫服务',id:'25'},
               {name:'供应设施',id:'26'},
               {name:'公园绿地',id:'27'},
               {name:'防护绿地',id:'28'},
               {name:'广场用地',id:'29'},
           ]
        }
    },
    mounted(){
        //console.log(mapList)
    },
    methods:{
        //跳转页面
        goAsh(e){
            this.$router.push({path:`/ConstructionManage/detail/${e.name}`})
        },
    }   
}
</script> 

<style lang="scss" scoped>
@import '../style.scss'
</style>
