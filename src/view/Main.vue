<style scoped>
.ivu-layout-header {
  padding-left: 0px;
  padding-right: 0px;
  background: white;
  height: 60px;
}

.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.layout-logo {
  width: 360px;
  height: 60px;
  background: url("../assets/images/dms_logo.png") no-repeat 100% 100%;
  background-size: 100% 100%;
  border-radius: 3px;
  float: left;
  position: relative;
}

.layout-nav {
  width: 900px;
  margin: 0 auto;
  margin-left: 250px;
  padding-left: 40px;
  font-size: 18px;
  font-weight: 700;
}

.layout-nav a {
  font-size: 18px;
  margin-right: 80px;
}

.ivu-menu-light {
  background: rgba(255, 255, 255, 1);
}

.ivu-layout {
  background: rgba(242, 242, 242, 1);
}

.layout-nav-userinfo {
  margin-right: 70px;
  width: 150px;
  float: right;
  z-index: 900;
  margin-top: -70px;
  position: relative;
}

.user {
  float: right;
  margin-top: 18px;
  line-height: 20px;
}

.layout-nav-right {
  width: 60px;
  margin-top: -60px;
  height: 60px;
  background: url("../assets/images/account.png") no-repeat 100% 100%;
  background-size: 100% 100%;
  border-radius: 3px;
  float: right;
  z-index: 900;
  position: relative;
  cursor: pointer;
}

.layout-nav-right {
  display: flex;
  justify-content: flex-end;
}

.userinfop {
  text-align: right;
  font-weight: 700;
  color: #4060ad;
}

.account {
  margin-top: 60px;
  overflow: hidden;
  position: absolute;
  background-color: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  border-radius: 4px;
  z-index: 900;
  display: none;
}

.layout-nav-right:hover .account {
  display: block;
}

.ivu-select-item:hover {
  background: #f3f3f3;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" :active-name="activename" @on-select="menuonselect">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1" to="/Index/MyTask">首页</MenuItem>
            <MenuItem v-if="!user.is_staff" name="2" to="/Distributor/Distributormaster">
              资料信息
              <!--  <MenuItem name="2" to="/Distributor/Distributormaster"> 资料信息 -->
            </MenuItem>
            <MenuItem v-if="user.is_staff" name="4" to="/Workflow/Index">流程操作</MenuItem>
            <MenuItem v-if="user.is_staff" name="3" to="/Search/Distributorinformation">信息查询</MenuItem>
          </div>
        </Menu>

        <div>
          <div class="layout-nav-right">
            <ul class="account">
              <li class="ivu-select-item" @click="EmailModal=true" v-show="!user.is_staff">
                <Icon type="md-mail"/>
                <span style="margin-left:15px;">修改邮箱</span>
              </li>
              <li class="ivu-select-item" @click="passwordModal=true" v-show="!user.is_staff">
                <Icon type="md-key"/>
                <span style="margin-left:15px;">修改密码</span>
              </li>
              <li class="ivu-select-item" @click="quit">
                <Icon type="md-log-out"/>
                <span style="margin-left:15px;">退出</span>
              </li>
            </ul>
          </div>
          <div class="layout-nav-userinfo">
            <div class="user">
              <p class="userinfop">{{user.username}}</p>
              <p class="userinfop">{{user.chinese_full_name}}</p>
            </div>
          </div>
        </div>
      </Header>
      <Layout>
        <router-view/>
      </Layout>
    </Layout>

    <Modal v-model="EmailModal" title="邮箱信息修改" :styles="{top: '250px'}">
      <p slot="header">
        <span>邮箱信息修改</span>
      </p>
      <div>
        <Form ref="EmaiformValidate" :rules="ruleValidate" :model="Email">
          <Row>
            <Col>
              <FormItem label="邮箱地址" prop="Email">
                <Input v-model="Email.Email" placeholder="请输入邮箱地址">
                  <Icon type="md-mail" slot="prefix"/>
                </Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </div>
      <div slot="footer">
        <Button type="primary" @click="EmailModal=false">取消</Button>
        <Button type="success" @click="emailOk('EmaiformValidate')">确定</Button>
      </div>
    </Modal>

    <Modal v-model="passwordModal" title="密码修改" :styles="{top: '200px'}">
      <Form ref="Password" :model="Password">
        <FormItem prop="oldPassword">
          <FormItem label="旧密码">
            <Input type="password" v-model="Password.old_password" placeholder="请输入旧密码">
              <Icon type="md-lock" slot="prefix"/>
            </Input>
          </FormItem>
          <FormItem label="新密码">
            <Input type="password" v-model="Password.first_password" placeholder="请输入新密码">
              <Icon type="md-lock" slot="prefix"/>
            </Input>
          </FormItem>
          <FormItem label="确认密码">
            <Input type="password" v-model="Password.new_password" placeholder="再次输入新密码">
              <Icon type="md-lock" slot="prefix"/>
            </Input>
          </FormItem>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="passwordModal=false">取消</Button>
        <Button type="success" @click="passwordOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import common from "../api/services/common/common";
import webfunction from "../api/services/webfunction";
export default {
  data() {
    return {
      activename: "1",
      showAccount: false,
      EmailModal: false,
      passwordModal: false,
      Email: {
        Email: ""
      },
      Password: {
        old_password: "",
        first_password: "",
        new_password: ""
      },
      ruleValidate: {
        Email: [
          {
            required: true,
            message: "请输入邮箱地址",
            trigger: "blur"
          },
          {
            type: "email",
            message: "请输入有效的邮箱地址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
    /*     activename: function() {
          if (
            this.$route.path.includes("MyTask") ||
            this.$route.path.includes("MyApply")
          ) {
            return "1";
          } else if (this.$route.path.includes("Distributormaster")) {
            return "2";
          } else if (this.$route.path.includes("Search")) {
            return "3";
          } else if (this.$route.path.includes("Workflow")) {
            return "4";
          } else {
            return "4";
          }
        } */
  },
  watch: {
    activename: function() {
      localStorage.setItem("dms-app-menu", this.activename);
    }
  },
  created() {
    if (localStorage.getItem("dms-app-menu")) {
      this.activename = localStorage.getItem("dms-app-menu");
    }
    //返回bu列表，区域列表和产品线列表的信息
    webfunction.getbu().then(response => {
      this.set_bu(response);
    });
    //获取公共的系统主数据
    webfunction.getCommon().then(response => {
      this.set_Common(response);
    });
    //返回系统支持的流程类型主数据，用于流程类型下拉控件，或是流程入口使用。
    webfunction.getflowtype().then(response => {
      this.set_flowtype(response);
    });
    this.set_user(JSON.parse(localStorage.getItem("dms-app-user")));
    //获取省市下面的主数据
    /*     webfunction.getHosipitals().then(response => {
      this.set_hosipitals(response);
    }); */
    //区域，省,市，获取3个下拉框中的数据, region,region_province,province_city
    common.get_location().then(response => {
      this.set_location(response);
    });
  },
  methods: {
    ...mapActions([
      "set_bu",
      "set_Common",
      "set_flowtype",
      "set_location",
      "set_user"
    ]),
    menuonselect(name) {
      this.activename = name;
    },
    quit() {
      //localStorage.clear();
      // localStorage.setItem("dms-app-returnURL", this.$router.);
      this.$router.push({
        name: "login"
      });
    },
    emailOk(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          webfunction.modifyEmail(this.Email.Email).then(response => {
            this.$Message.success(response.message);
          });
        }
      });
    },
    passwordOk() {
      webfunction
        .modifyPassword(this.Password.old_password, this.Password.new_password)
        .then(response => {
          this.$Message.success(response.message);
        });
    }
  }
};
</script>