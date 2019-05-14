<style>
@import "../assets/css/Login.css";
.ivu-form .ivu-form-item-label {
  font-size: 13px;
  color: black;
}

.ivu-btn {
  width: 100px;
}
</style>
<template>
<Layout id="bg">
  <Layout id="form-Con">
    <Header :style="{height: 'auto',lineHeight: 'initial',padding: '50px 0'}">
    </Header>
    <Content>
      <Form ref="formInline" :model="registerData" :rules="ruleValidate">
        <Row>
          <Col span="24">
          <FormItem label="公司名称" prop="company_name">
            <Input v-model="registerData.company_name" enter-button placeholder="请输入公司名称" />
          </FormItem>
          </Col>
        </Row>
        <FormItem label="注册邮箱" prop="email">
          <Input v-model="registerData.email" enter-button placeholder="请输入注册邮箱" />
        </FormItem>
        <FormItem label="密码" prop="password">
          <Input type="password" v-model="registerData.password" enter-button placeholder="请输入密码" />
        </FormItem>
        <FormItem label="确认密码" prop="comfirm_password">
          <Input type="password" v-model="registerData.comfirm_password" enter-button placeholder="请输入确认密码" />
        </FormItem>
        <FormItem label="验证码" prop="register_code">
          <Input v-model="registerData.register_code" enter-button placeholder="请输入验证码">
          <Button :disabled="btn_Status" slot="append" @click="getRegister">{{button_text}}</Button>
          </Input>
        </FormItem>
        <FormItem>
          <Button type="primary" shape="circle" :style="{width: '70%',background: '#0066cc',borderColor: '#0066cc'}" @keydown.13.native="test()" @click="register('formInline')">立即注册</Button>
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
import webfunction from "../api/services/webfunction";
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 8) {
        callback(new Error("密码长度至少8位"));
      } else {
        if (this.registerData.comfirm_password !== "") {
          // 对第二个密码框单独验证
          this.$refs.formInline.validateField("comfirm_password");
        }
        callback();
      }
    };
    const validatePassCheck = (rule, value, callback) => {
      console.log(value);
      if (value === "") {
        callback(new Error("请再次填写密码"));
      } else if (value !== this.registerData.password) {
        callback(new Error("两次填写的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      registerData: {
        company_name: "",
        email: "",
        password: "",
        comfirm_password: "",
        register_code: ""
      },
      button_text: "获取验证码",
      btn_Status: false,
      ruleValidate: {
        company_name: [{
          required: true,
          message: "请填写公司名称"
        }],
        email: [{
            required: true,
            message: "请填写邮箱"
          },
          {
            type: "email",
            message: "请输入有效的邮箱地址",
            trigger: "blur"
          }
        ],
        password: [{
          required: true,
          message: "请输入密码"
        }, {
          validator: validatePass,
          trigger: "blur"
        }],
        comfirm_password: [{
          required: true,
          message: "请再次填写密码"
        }, {
          validator: validatePassCheck,
          trigger: "blur"
        }],
        register_code: [{
          required: true,
          message: "请填写验证码"
        }]
      }
    };
  },
  methods: {
    register(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          webfunction
            .register(JSON.stringify(this.registerData))
            .then(response => {
              this.$Message.success("注册成功,5秒后跳转到首页");
              let count = 5;
              this.timer = setInterval(() => {
                count--;
                if (count === 0) {
                  clearInterval(this.timer)
                  this.$Spin.hide();
                  this.$router.push({
                    name: "login"
                  });
                }
              }, 1000);
            });
        }
      });
    },
    getRegister() {
      /*       this.button_text = "60秒";
            this.btn_Status=true; */
      this.$refs["formInline"].validateField("email", bool => {
        if (!bool) {
          webfunction
            .getRegistercode(this.registerData.email)
            .then(response => {
              this.$Message.success("发送验证码成功");
              //console.log(response);
            });
        }
      });
    },
    goto_login() {
      this.$router.push({
        name: "login"
      });
    }
  }
};
</script>
