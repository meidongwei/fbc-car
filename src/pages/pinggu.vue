<template>
  <div>
    <Table border :columns="columns1" :data="data1" style="margin-bottom: 10px"></Table>
    <Page :total="dataCount" :page-size="pageSize" style="float: right"></Page>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      // 数据总条数
      dataCount: 50,
      // 每页显示条数
      pageSize: 10,
      columns1: [
        {
          title: '车型',
          key: 'carName'
        },
        {
          title: '车牌号',
          key: 'carNum'
        },
        {
          title: '申请人',
          key: 'apply'
        },
        {
          title: '车况',
          key: 'carState'
        },
        {
          title: '当前状态',
          key: 'nowState'
        },
        {
          title: '评估价格',
          key: 'carPrice'
        },
        {
          title: '签名并提交',
          key: 'submit',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.$Message.success('操作成功！')
                  }
                }
              }, '通过')
            ])
          }
        }
      ],
      data1: [
        // {
        //   carName: '奥迪A4L',
        //   carNum: '冀A88888',
        //   apply: '姚明晨',
        //   carState: 1,
        //   nowState: 1,
        //   carPrice: 400000
        // },
        // {
        //   carName: '奥迪A4L',
        //   carNum: '冀A88888',
        //   apply: '姚明晨',
        //   carState: 1,
        //   nowState: 1,
        //   carPrice: 400000
        // },
        // {
        //   carName: '奥迪A4L',
        //   carNum: '冀A88888',
        //   apply: '姚明晨',
        //   carState: 1,
        //   nowState: 1,
        //   carPrice: 400000
        // }
      ]
    }
  },
  methods: {
    getDatas () {
      axios.get('/api/getCarList')
      .then((res) => {
        this.data1 = res.data.list
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created () {
    this.getDatas()
  }
}
</script>

<style scoped>
</style>
