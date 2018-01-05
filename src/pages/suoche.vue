<template>
  <div>
    <Table border :columns="columns" :data="tableData" style="margin-bottom: 10px;"></Table>
    <Upload action="//jsonplaceholder.typicode.com/posts/" style="float: left">
      <Button type="primary" icon="ios-cloud-upload-outline">导入车辆</Button>
    </Upload>
    <Page :total="dataCount" :page-size="pageSize" style="float: right"></Page>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      formValidate: {
        name: '',
        pwd: '',
        select: ''
      },
      modal3: false,
      // 数据总条数
      dataCount: 50,
      // 每页显示条数
      pageSize: 10,
      columns: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '公司名称',
          key: 'companyName'
        },
        {
          title: '车牌号',
          key: 'carNum'
        },
        {
          title: '车型',
          key: 'carName'
        },
        {
          title: '入库时间',
          key: 'inDate'
        },
        {
          title: '出库时间',
          key: 'outDate'
        },
        {
          title: '锁车',
          key: 'lockCar',
          align: 'center',
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'primary',
                size: 'small'
              },
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.lockCar(params.index)
                }
              }
            }, '锁车')
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    getTableData () {
      axios.get('/api/getLockCarList')
      .then((res) => {
        this.tableData = res.data.list
      })
      .catch((error) => {
        console.log(error)
      })
    },
    lockCar (index) {
      this.$Message.info('锁车成功！')
    },
    addAccount () {
      this.modal3 = false;
      this.$Message.success('导入成功！');
      this.isBtnShow = false
    }
  },
  created () {
    this.getTableData()
  }
}
</script>

<style>
.ivu-table .demo-table-info-row td{
    background-color: pink;
    color: #fff;
}
.ivu-table .demo-table-error-row td{
    background-color: #ff6600;
    color: #fff;
}
</style>
