<template>
  <div>
    <Table style="margin-bottom: 20px;" border :columns="columns1" :data="data1"></Table>
    <!-- 当 Select 组件选项发生改变的时候监听 @on-change，触发一个自定义方法，如“changeRole”，
    这个方法默认返回一个 value ，即当前所选的选项的值 -->
    <!-- <Select v-model="role" style="width:200px;margin-bottom: 20px;" @on-change="changeRole">
      <Option v-for="item in roleList" :value="item.label"
        :key="item.value">{{ item.label }}</Option>
    </Select> -->
    <Button type="primary" @click="modal3 = true" style="margin-bottom: 10px;float:left;">账号分配</Button>
    <Modal v-model="modal3" width="360">
        <p slot="header" style="color:gray;text-align:center">
          <span>联邦车局 - 账号分配</span>
        </p>
        <div>
          <Form :model="formValidate" label-position="right" :label-width="100">
            <FormItem label="省">
              <Select v-model="formValidate.select">
                <Option value="hebei">河北省</Option>
                <Option value="hunan">湖南省</Option>
                <Option value="shandong">山东省</Option>
              </Select>
            </FormItem>
            <FormItem label="市">
              <Select v-model="formValidate.select">
                <Option value="shijiazhaung">石家庄市</Option>
                <Option value="xingtai">邢台市</Option>
                <Option value="tangshan">唐山市</Option>
              </Select>
            </FormItem>
            <FormItem label="账号">
              <Input v-model="formValidate.name" placeholder="请输入账号"></Input>
            </FormItem>
            <FormItem label="密码">
              <Input v-model="formValidate.pwd" placeholder="请输入密码"></Input>
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button type="primary" size="large" long @click="addAccount">确认分配</Button>
        </div>
    </Modal>
    <Page :total="dataCount" :page-size="pageSize" style="float: right"></Page>
    <!-- <table>
      <tr>
        <td v-for="item in columns1">{{ item.title }}</td>
      </tr>
      <tr v-for="item1 in data1" v-show="item1.isShow">
        <td>{{ item1.id }}</td>
        <td>{{ item1.name }}</td>
        <td>{{ item1.role }}</td>
        <td>{{ item1.address }}</td>
        <td>{{ item1.account }}</td>
      </tr>
    </table> -->
  </div>
</template>

<script>
import axios from 'axios'
// import _ from 'lodash'
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
      role: '全部',
      roleList: [
        {
          value: 'all',
          label: '全部'
        },
        {
          value: 'guanli',
          label: '管理员'
        },
        {
          value: 'hezuo',
          label: '合作机构'
        },
        {
          value: 'fengkong',
          label: '风控'
        },
        {
          value: 'kuguan',
          label: '库管'
        },
        {
          value: 'baoan',
          label: '保安'
        },
        {
          value: 'caiwu',
          label: '财务'
        }
      ],
      columns1: [
        {
          title: 'ID',
          key: 'id'
        },
        {
          title: '姓名',
          key: 'name'
        },
        {
          title: '角色',
          key: 'role',
          filters: [
            {
              label: '管理员',
              value: 1
            },
            {
              label: '合作机构',
              value: 2
            },
            {
              label: '风控',
              value: 3
            },
            {
              label: '库管',
              value: 4
            },
            {
              label: '保安',
              value: 5
            },
            {
              label: '财务',
              value: 6
            }
          ],
          filterMultiple: false,
          filterMethod (value, row) {
            if (value === 1) {
              return row.role === '管理员';
            } else if (value === 2) {
              return row.role === '合作机构';
            } else if (value === 3) {
              return row.role === '风控';
            } else if (value === 4) {
              return row.role === '库管';
            } else if (value === 5) {
              return row.role === '保安';
            } else if (value === 6) {
              return row.role === '财务';
            }
          }
        },
        {
          title: '工作地点',
          key: 'address'
        },
        {
          title: '账号',
          key: 'account'
        }
      ],
      data1: [
        // {
        //   id: '10001',
        //   name: 'John Brown',
        //   role: '管理员',
        //   address: '北京市 朝阳区 125号',
        //   account: 'admin666'
        // },
        // {
        //   id: '10001',
        //   name: 'Jim Green',
        //   role: '管理员',
        //   address: '北京市 朝阳区 125号',
        //   account: 'admin666'
        // },
        // {
        //   id: '10001',
        //   name: 'Joe Black',
        //   role: '管理员',
        //   address: '北京市 朝阳区 125号',
        //   account: 'admin666'
        // },
        // {
        //   id: '10001',
        //   name: 'Jon Snow',
        //   role: '管理员',
        //   address: '北京市 朝阳区 125号',
        //   account: 'admin666'
        // }
      ]
    }
  },
  created () {
    this.getDatas()
  },
  methods: {
    getDatas () {
      axios.get('/api/getAccountList')
      .then((res) => {
        this.data1 = res.data.list
      })
      .catch((error) => {
        console.log(error)
      })
    },
    addAccount () {
      this.modal3 = false;
      this.$Message.success('分配成功！');
      this.isBtnShow = false
    }
  }
}
</script>

<style scoped>
</style>
