<template>
  <div>
    <Table border :columns="columns" :data="tableData" ref="table" style="margin-bottom: 10px;"></Table>
    <Button type="primary" @click="exportData">导出</Button>
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
      columns: [
        {
          title: '公司名称',
          key: 'companyName'
        },
        {
          title: '车型',
          key: 'carName'
        },
        {
          title: '车牌号',
          key: 'carNum'
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
          title: '车辆停放时间',
          key: 'stayTime'
        },
        {
          title: '上次收费时间',
          key: 'prePayTime'
        },
        {
          title: '总结费用',
          key: 'totalPrice'
        }
      ],
      tableData: []
    }
  },
  methods: {
    getTableData () {
      axios.get('/api/getPriceList')
      .then((res) => {
        this.tableData = res.data.list
      })
      .catch((error) => {
        console.log(error)
      })
    },
    exportData () {
      this.$refs.table.exportCsv({
        filename: 'caiwuList'
      })
    }
  },
  created () {
    this.getTableData()
  }
}
</script>

<style scoped>
</style>
