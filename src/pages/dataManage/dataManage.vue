<template>
    <div>
        <div class="page_view">
           <div class="flutter">
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
               {name:'建筑分类建安成本价',id:'1'},
               {name:'挂牌价',id:'2'},
               {name:'三通一平',id:'3'},
               {name:'地下空间建安成本单价',id:'4'},
               {name:'人防建安附加成本单价',id:'5'},
               {name:'装修成本单价',id:'6'},
               {name:'景观绿化单价',id:'7'},
               {name:'道路综合管网单价',id:'8'},
               {name:'广场硬地单价',id:'9'},
           ]
        }
    },
    mounted(){
        //console.log(mapList)
    },
    methods:{
        //跳转页面
        goAsh(e){
            this.$router.push({path:`/DataManage/detail/${e.name}`})
        },
    }   
}
</script> 

<style lang="scss" scoped>
@import '../style.scss'
</style>
