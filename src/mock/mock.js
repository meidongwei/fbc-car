import Mock from 'mockjs'

Mock.mock(/getNavList/, {
    'list|6': [{
        'name': '@ctitle(4, 5)',
        'icon': '@ctitle(3)',
        'url|1': ['/fenpei','/jiansuo','/pinggu','/caiwu','/shipin','/suoche'],
        'id': '@increment'
    }]
})

Mock.mock(/getAccountList/, {
    'list|8': [{
        'id': '@id',
        'name': '@cname(3)',
        'role|1': ['管理员','合作机构','风控','库管','保安','财务'],
        // 'roleVal|1': ['guanli','hezuo','fengkong','kuguan','baoan','caiwu'],
        'address': '@city(true)',
        'account|6': '@character("lower")',
        'isShow': 'true'
    }]
})

Mock.mock(/getCarList/, {
  'list|8': [{
    'carName|1': ['奥迪A4L','奔驰c200L','宝马3'],
    'carNum': '冀A@integer(10000, 99999)',
    'apply': '@cname(3)',
    'carState|1': ['非常好','好','一般'],
    'nowState|1': ['已入库','未入库'],
    'carPrice': '@integer(300000, 400000) 元'
  }]
})

Mock.mock(/getPriceList/, {
  'list|8': [{
    'companyName': '@ctitle(2, 3)有限公司',
    'carName|1': ['奥迪A4L','奔驰c200L','宝马3'],
    'carNum': '冀A@integer(10000, 99999)',
    'inDate': '@date("yyyy-MM-dd")',
    'outDate': '@date("yyyy-MM-dd")',
    'stayTime': '@string("number", 2)天',
    'prePayTime': '@date("yyyy-MM-dd")',
    'totalPrice': '@integer(300000, 400000) 元'
  }]
})

Mock.mock(/getCarVideoList/, {
  'list|8': [{
    'id': '@id',
    'address': '@city(true)',
    'park|1': ['大润发车库','雨润车库','好孩子车库'],
    'parking': '@string("number", 2)号',
    'stayTime': '@string("number", 2)天'
  }]
})

Mock.mock(/getLockCarList/, {
  'list|8': [{
    'id': '@id',
    'companyName': '@ctitle(2, 3)有限公司',
    'carNum': '冀A@integer(10000, 99999)',
    'carName|1': ['奥迪A4L','奔驰c200L','宝马3'],
    'inDate': '@date("yyyy-MM-dd")',
    'outDate': '@date("yyyy-MM-dd")',
  }]
})
function getRImg () {
	return Mock.Random.image('300x150', Mock.Random.hex())
}

Mock.mock(/getColList/, {
  'list|8': [{
    'id': '@id',
    'carName|1': ['奥迪A4L','奔驰c200L','宝马3'],
    'url': getRImg (),
    'color|1': ['红色','黄色','蓝色'],
    'daikuan|1': ['贷款','非贷款']
  }]
})
