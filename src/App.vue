<template>
  <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
    <Row type="flex">
      <Col :span="spanLeft" class="layout-menu-left">
        <Menu :active-name="activeState" theme="dark" width="auto">
          <div class="layout-logo-left">
            <img src="./assets/logo.png">
            <h2 style="color: lightgray;text-align: center;">联邦车局管理系统</h2>
          </div>
          <MenuItem :name="item.id" v-for="item in navList" :key="item.id" @click.native="toPage(item)">
            <Icon :type="item.icon" :size="iconSize"></Icon>
            <span class="layout-text">{{ item.name }}</span>
          </MenuItem>
        </Menu>
      </Col>
      <Col :span="spanRight">
          <div class="layout-header">
              <Button type="text" @click="toggleClick">
                  <Icon type="navicon" size="32"></Icon>
              </Button>
              <span style="position: absolute; right: 20px; top: 13px;">
                <Button type="text" v-if="isBtnShow" @click="modal2 = true">登录</Button>
                <Button v-if="!isBtnShow" type="text">欢迎您，{{ username }}</Button>
                <Button v-if="!isBtnShow" type="text" @click="logout">退出</Button>
                <Modal v-model="modal2" width="360">
                    <p slot="header" style="color:gray;text-align:center">
                      <span>联邦车局 - 登录</span>
                    </p>
                    <div style="text-align:center">
                      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" label-position="right" :label-width="100">
                        <FormItem label="用户名" prop="name">
                          <Input v-model="formValidate.name" placeholder="请输入用户名"></Input>
                        </FormItem>
                        <FormItem label="密码" prop="pwd">
                          <Input v-model="formValidate.pwd" placeholder="请输入密码"></Input>
                        </FormItem>
                      </Form>
                    </div>
                    <div slot="footer">
                      <Button type="primary" size="large" long :loading="modal_loading" @click="login('formValidate')">登录</Button>
                    </div>
                </Modal>
              </span>
          </div>
          <div class="layout-breadcrumb">
              <Breadcrumb>
                  <BreadcrumbItem href="#">管理员</BreadcrumbItem>
                  <BreadcrumbItem>{{ breadPage }}</BreadcrumbItem>
              </Breadcrumb>
          </div>
          <div class="layout-content">
              <div class="layout-content-main">
                <router-view></router-view>
              </div>
          </div>
          <div class="layout-copy">
              2011-2016 &copy; fbc-car
          </div>
      </Col>
    </Row>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    return {
      isBtnShow: true,
      username: '小柠檬',
      formValidate: {
        name: '',
        pwd: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        pwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      },
      modal2: false,
      modal_loading: false,
      spanLeft: 5,
      spanRight: 19,
      navList: [
        {
          name: '分配账号',
          icon: 'ios-navigate',
          url: '/fenpei',
          id: '1'
        },
        {
          name: '检索车辆',
          icon: 'ios-keypad',
          url: '/jiansuo',
          id: '2'
        },
        {
          name: '评估列表',
          icon: 'ios-analytics',
          url: '/pinggu',
          id: '3'
        },
        {
          name: '财务列表',
          icon: 'ios-list',
          url: '/caiwu',
          id: '4'
        },
        {
          name: '查看视频',
          icon: 'ios-videocam',
          url: '/shipin',
          id: '5'
        },
        {
          name: '锁车',
          icon: 'ios-locked',
          url: '/suoche',
          id: '6'
        }
      ],
      breadMap: {
        '/fenpei': '分配账号',
        '/jiansuo': '检索车辆',
        '/pinggu': '评估列表',
        '/caiwu': '财务列表',
        '/shipin': '查看视频',
        '/suoche': '锁车'
      },
      activeMap: {
        '/': '1',
        '/fenpei': '1',
        '/jiansuo': '2',
        '/pinggu': '3',
        '/caiwu': '4',
        '/shipin': '5',
        '/suoche': '6'
      }
    }
  },
  computed: {
    iconSize () {
      return this.spanLeft === 5 ? 14 : 24;
    },
    breadPage () {
      return this.breadMap[this.$route.path]
    },
    activeState () {
      return this.activeMap[this.$route.path]
    }
  },
  methods: {
    toggleClick () {
      if (this.spanLeft === 5) {
        this.spanLeft = 2;
        this.spanRight = 22;
      } else {
        this.spanLeft = 5;
        this.spanRight = 19;
      }
    },
    toPage (item) {
      this.$router.push({path: item.url})
    },
    login (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.modal_loading = true;
          setTimeout(() => {
            this.modal_loading = false;
            this.modal2 = false;
            this.$Message.success('登录成功！');
            this.isBtnShow = false
          }, 1000);
        } else {
          this.$Message.error('登录失败！');
        }
      })
    },
    logout () {
      this.isBtnShow = true
      this.$Message.success('退出成功！');
    }
  },
  mounted () {
    // axios.get('api/getNavList')
    // .then((res) => {
    //   this.navList = res.data.list
    // })
    // .catch((error) => {
    //   console.log(error)
    // })
  }
}
</script>

<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 600px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
        position: relative;
    }
    .layout-logo-left{
        width: 90%;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
        padding: 10px 0 5px 0;
        text-align: center;
    }
    .layout-logo-left img {
      width: 70px;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
