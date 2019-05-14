<style scoped>
@import "../assets/css/Login.css";
</style>
<template>
<Layout id="bg">
  <Layout id="form-Con">
    <Header :style="{height: 'auto',lineHeight: 'initial',padding: '100px 0'}">
      <h3><span style="color:white;font-size:20px">Welcome</span></h3>
      <br>
      <h1>友情提示:系统仅支持chrome浏览器、IE11及以上版本</h1>
    </Header>
    <Content>
      <Form ref="formInline" :model="loginInfo" :rules="ruleValidate" id="form">
        <FormItem prop="username">
          <i-input placeholder="用户" v-model="loginInfo.username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem prop="password">
          <i-input type="password" placeholder="密码" v-model="loginInfo.password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </i-input>
        </FormItem>
        <FormItem style="margin-top: -22px;text-align: right;color: #fff;  cursor: pointer;">
          <span @click="goto_register">注册</span>
        </FormItem>
        <FormItem>
          <Button type="primary" shape="circle" :style="{width: '70%',background: '#0066cc',borderColor: '#0066cc'}" @keydown.13.native="test()" @click="login('formInline')">登录</Button>
        </FormItem>
      </Form>
    </Content>
    <Footer :style="{color: '#fff',padding: '24px 0',fontSize: '12px'}">
      <span>捷迈(上海)医疗国际贸易有限公司 版权所有</span>
    </Footer>
  </Layout>
</Layout>
</template>
<script>
import tokenService from "../api/services/common/token";
export default {
  data() {
    return {
      loginInfo: {
        username: "",
        password: "",
        returnURL: ""
        // verifyCode: '000'
      },
      ruleValidate: {
        username: [{
          required: true,
          message: "用户名不能为空！"
        }],
        password: [{
          required: true,
          message: "密码不能为空！"
        }]
      }
    };
  },
  created() {
    localStorage.removeItem('dms-app-token');
    localStorage.removeItem('dms-app-user');
    localStorage.removeItem('dms-app-menu');
    if (this.$route.query.access_token) {
      tokenService
        .loginfromprotal({access_token:this.$route.query.access_token})
        .then(response => {
          this.setLoginConfig(response)
        })
        .catch(err => {
          if (err) {
            this.$router.push({
              name: "login"
            });
          }
        });
    }
  },
  methods: {
    login(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          tokenService
            .Login(this.loginInfo)
            .then(response => {
              console.log(response);
              this.setLoginConfig(response)
            })
            .catch(err => {
              if (err) {
                this.$router.push({
                  name: "login"
                });
              }
            });
        }
      });
    },
    goto_register() {
      this.$router.push({
        name: "register"
      });
    },
    setLoginConfig(response) {
      console.log(response);
      localStorage.setItem("dms-app-token", `JWT ${response.user.token}`);
      localStorage.setItem("dms-app-user", JSON.stringify(response.user));
      if (localStorage.getItem("dms-app-returnURL")) {
        let returnURL = localStorage.getItem("dms-app-returnURL");

        if (returnURL !== '/' && !returnURL.includes("page404") && !returnURL.includes("register") && !returnURL.includes("IndexRouter")) {
          this.$router.push({
            path: returnURL
          });
        } else {
          this.$router.push({
            path: "/index/MyTask"
          });
        }
      } else {
        this.$router.push({
          path: "/index/MyTask"
        });
      }
    }
  }
};
</script>
