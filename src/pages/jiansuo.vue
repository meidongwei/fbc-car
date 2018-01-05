<template>
  <div>
    <Card dis-hover style="margin-bottom: 15px;">
      <div style="float: left;">
        <div style="margin-bottom: 5px;">
          <span>是否贷款：</span>
          <RadioGroup v-model="daikuan" @on-change="selectDaikuan">
            <Radio label="贷款"></Radio>
            <Radio label="非贷款"></Radio>
          </RadioGroup>
        </div>
        <div>
          <span style="float:left;">车辆颜色：</span>
          <CheckboxGroup v-model="color" style="float: left;">
            <Checkbox label="红色"></Checkbox>
            <Checkbox label="黄色"></Checkbox>
            <Checkbox label="蓝色"></Checkbox>
          </CheckboxGroup>

        </div>
      </div>
      <Input v-model="value" placeholder="车型/配置/颜色..." style="width: 300px;float: right;"></Input>
      <div style="clear: both;"></div>
    </Card>

    <Row :gutter="16">
      <Col span="6" v-for="item in colList" :key="item.id">
        <Card style="margin-bottom: 15px;">
          <div>
            <img :src="item.url" style="width: 100%;">
            <p>{{ item.daikuan+' - '+item.color+' - '+item.carName }}</p>
          </div>
        </Card>
      </Col>
    </Row>
    <Page :total="dataCount" :page-size="pageSize" style="float: right"></Page>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      value: '',
      color: [''],
      daikuan: '',
      // 数据总条数
      dataCount: 50,
      // 每页显示条数
      pageSize: 10,
      colList: []
    }
  },
  methods: {
    getColList () {
      axios.get('/api/getColList')
      .then((res) => {
        this.colList = res.data.list
      })
      .catch((error) => {
        console.log(error)
      })
    },
    selectDaikuan (daikuan) {
      var arr = new Array()
      var brr = new Array()
      this.colList.map((item) => {
        if (item.daikuan === daikuan) {
          arr.push(item)
        } else {
          brr.push(item)
        }
      })
      var crr = arr.concat(brr)
      this.colList = crr
    }
  },
  created () {
    this.getColList()
  }
}
</script>

<style scoped>
</style>
