<template>
  <div>
    <Table border :columns="columns" :data="tableData" style="margin-bottom: 10px"></Table>
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
          title: 'ID',
          key: 'id'
        },
        {
          title: '省市',
          key: 'address',
          filters: [
            {
              label: '河北省',
              value: '河北省'
            },
            {
              label: '湖南省',
              value: '湖南省'
            },
            {
              label: '山东省',
              value: '山东省'
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            return row.address.indexOf(value) > -1
          }
        },
        {
          title: '车库',
          key: 'park'
        },
        {
          title: '车位',
          key: 'parking'
        },
        {
          title: '时间',
          key: 'stayTime'
        },
        {
          title: '视频',
          key: 'carVideo',
          algin: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }, '查看视频')
            ])
          }
        }
      ],
      tableData: []
    }
  },
  methods: {
    getTableData () {
      axios.get('/api/getCarVideoList')
      .then((res) => {
        this.tableData = res.data.list
      })
      .catch((error) => {
        console.log(error)
      })
    },
    show (index) {
      this.$Modal.info({
        title: `车位：${this.tableData[index].parking}`,
        content: `<video src="/src/assets/big_buck_bunny.mp4" controls="controls" style="width: 100%;"></video>`
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
