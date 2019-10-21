import store from '@/store/index'

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
export function tableTime(date) {
  if (date) {
    var arr = date.split('T')
    const years = arr[0];
    const hours = arr[1]
    return years + ' ' + hours
  }

}
//时间格式化（只要年月日）
export function listTime(date) {
  if (date) {
    var arr = date.split(' ')
    const years = arr[0];
    const hours = arr[1]
    return years
  }

}
const constant = {};
constant.payObj = [{
    code: '-1',
    name: '已下架'
  },
  {
    code: '0',
    name: '待上架'
  },
  {
    code: '1',
    name: '已上架'
  },
  {
    code: '2',
    name: '禁用中'
  },
  {
    code: '3',
    name: '解禁申请中'
  },
];
constant.buidType = [{
    code: '0',
    name: '新建'
  },
  {
    code: '1',
    name: '改建'
  },
  {
    code: '2',
    name: '混建'
  },
]
//角色id过滤
export function getRoleId(val) {
  for (let i = 0; i < store.state.roleList.length; i++) {
    if (val == store.state.roleList[i].id) {
      return store.state.roleList[i].name
    } else if (val == 1) {
      return '超级管理员'
    }
  }
}
//建设类型过滤
export function getBuildType(val) {
  for (let i = 0; i < constant.buidType.length; i++) {
    if (val == constant.buidType[i].code) {
      return constant.buidType[i].name
    }
  }
}
//表单状态过滤
export function getStatus(val) {
  for (let i = 0; i < constant.payObj.length; i++) {
    if (val == constant.payObj[i].code) {
      return constant.payObj[i].name
    }
  }
}
//用户类型过滤
export function getUserType(val) {
  if (val == 0) {
    return "微信粉丝";
  } else {
    return "认证会员";
  }
}
//布尔过滤成0/1
export function getBoolean(val) {
  if (val) {
    return 1
  } else {
    return 0
  }
}
//预设/平均单价
export function getPriceType(val) {
  if (val == 0) {
    return "预设单价";
  } else {
    return "平均单价";
  }
}
//估算详情是否有值(万元)
export function getEstimate(val) {
  if (val == null) {
    return "";
  } else {
    return val + "万元";
  }
}
//估算详情是否有值(平米)
export function getMetter(val) {
  if (val == null) {
    return "";
  } else {
    return val + "M²";
  }
}
//数字匹配
export function getNumber(val) {
  var array0 = ['一', '二', '三', '四', '五', '六', '七']
  var text = array0[val]
  return text
}
//
const checkModel = ({
  model,
  year
} = {}) => {
  if (!model && !year) return 'No car';
  if (!model) return 'No car model';
  if (!year) return 'No car year';

  return `Car model: ${model}; Manufacturing year: ${year};`;
}
