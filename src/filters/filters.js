function formatNumber(n) {
    const str = n.toString()
    return str[1] ? str : `0${str}`
}

export function formatTime(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    const t1 = [year, month, day].map(formatNumber).join('/')
    const t2 = [hour, minute, second].map(formatNumber).join(':')

    return `${t1} ${t2}`
}
//时间格式化
export function tableTime(date){
    if(date){
        var arr = date.split('T')
        const years = arr[0];
        const hours = arr[1]
        return years+' '+hours
    }
   
}
//时间格式化（只要年月日）
export function listTime(date){
    if(date){
        var arr = date.split(' ')
        const years = arr[0];
        const hours = arr[1]
        return years
    }
   
}
const constant = {};
constant.payObj = [
    {code:'-1',name:'已下架'},
    {code:'0',name:'待上架'},
    {code:'1',name:'已上架'},
    {code:'2',name:'禁用中'},
    {code:'3',name:'解禁申请中'},
];
constant.typeClass = [
    {code:'1',name:'图文'},
    {code:'2',name:'音频'},
    {code:'3',name:'视频'},
];
constant.typeClassTwo = [
    {code:'1',name:'图文'},
    {code:'2',name:'视频'},
    {code:'3',name:'音频'},
    {code:'4',name:'专栏'},
];
constant.typeVip = [
    {code:'1',name:'7天',num:0.23},
    {code:'2',name:'一个月',num:1},
    {code:'3',name:'3个月',num:3},
    {code:'4',name:'半年',num:6},
    {code:'5',name:'一年',num:12},
];

//表单状态过滤
export function getStatus(val){
    for(let i=0;i<constant.payObj.length;i++){
        if(val == constant.payObj[i].code){
            return  constant.payObj[i].name
        }
    }
}
//表单操作显示过滤
export function setStatusName(val){
    for(let i =0;i<constant.payObj.length;i++){
        if(val=='0' || val=='-1'){
            return '上架'
        }else if(val == '1'){
            return '下架'
        }else if(val == '2'){
            return '申请解禁'
        }else{
            return 
        }
    }
}
//是否开启信息采集
export function getInfoStatus(val){
    if(val==-1){
        return '开启信息采集'
    }else if(val==0){
        return '关闭信息采集'
    }
}
//获取列表Id
export function getListId(val){
    if(val!=null && val!='' && val!=undefined){
        let arr =[]
        let res = val.map((item)=>{
            arr.push(item.id) 
        })
        return arr
    }
}
//课程类型
export function getClassType(val){
    for(let i=0;i<constant.typeClass.length;i++){
        if(val == constant.typeClass[i].code){
            return  constant.typeClass[i].name
        }
    }
}
//课程类型2
export function getClassTypeTwo(val){
    for(let i=0;i<constant.typeClassTwo.length;i++){
        if(val == constant.typeClassTwo[i].code){
            return  constant.typeClassTwo[i].name
        }
    }
}
//去除小数点
export function getFixiedNum(val){
    return 
}
//过滤会员属性
export function getVipType(val){
    for(let i=0;i<constant.typeVip.length;i++){
        if(val == constant.typeVip[i].code){
            return  constant.typeVip[i].name
        }
    }
}
//月数
export function getVipNum(val){
    for(let i=0;i<constant.typeVip.length;i++){
        if(val == constant.typeVip[i].code){
            return  constant.typeVip[i].num
        }
    }
}
//布尔过滤成0/1
export function getBoolean(val){
        if(val){
            return 1
        }else{
            return 0
        }
}
//将字节转换为M
export function getByte(val){
    let num;
    num = val/1024/1024
    num = num.toFixed(2)
    return num
}