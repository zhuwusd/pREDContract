<template>
<Layout>
  <Sider hide-trigger class="leftmenu">
    <div class="flow_filter">
      <div class="flow_menu" v-show="!this.$route.query.guid" @click="toIntention()">
        <div v-bind:class="step=='agentintention'?'dms-pass':'dms-process'">
          <div class="icon"></div>
        </div>
        <p>代理意向</p>
      </div>

      <div class="flow_menu" @click="toBasicinfo()">
        <div v-bind:class="step=='baseinfo'?'dms-pass':'dms-process'">
          <div class="icon"></div>
        </div>
        <p>公司信息</p>
      </div>

      <div class="flow_menu" @click="toCompanyCertificates()">
        <div v-bind:class="step=='companycertificates'?'dms-pass':'dms-process'">
          <div class="icon"></div>
        </div>
        <p>公司证件</p>
      </div>

      <div class="flow_menu" @click="toapprovefile()">
        <div v-bind:class="step=='approvefile'?'dms-pass':'dms-process'">
          <div class="icon"></div>
        </div>
        <p>审批文件</p>
      </div>

    </div>

  </Sider>
  <Layout :style="{padding: '0px 24px 0px'}">
    <Content :style="{padding: '0px 24px 10px 0px', minHeight: '663px'}">
      <router-view ref="childen" />
    </Content>
  </Layout>
</Layout>
</template>
<script>
export default {
  data() {
    return {
      step: "agentintention"
    };
  },
/*   provide() {
    return {
      p_setStep: this.setStep
    };
  }, */
  mounted() {
    if (this.$route.query.guid) {
      this.toBasicinfo();
    }
  },
  methods: {
    toIntention() {
      this.step = "agentintention";
      this.$refs.childen.setStep(this.step);
    },
    toBasicinfo() {
      this.step = "baseinfo";
      this.$refs.childen.setStep(this.step);
    },
    toCompanyCertificates() {
      this.step = "companycertificates";
      this.$refs.childen.setStep(this.step);
    },
    toapprovefile() {
      this.step = "approvefile";
      this.$refs.childen.setStep(this.step);
    },
    setStep(value) {
      this.step = value;
    }
  }
};
</script>
<style scoped>
.leftmenu {
  background: "#fff";
  width: 300px;
}

.ivu-layout-sider {
  background: rgba(242, 242, 242, 1);
}

.ivu-layout {
  background: rgba(242, 242, 242, 1);
}

.flow_filter {
  margin-top: 26px;
  margin-left: 60px;
}

.flow_menu {
  height: 136px;
  width: 136px;
  background: white;
  margin-bottom: 5px;
  text-align: center;
  cursor: pointer;
}

.flow_menu:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #eee;
}

p {
  font-weight: 700;
  color: rgba(25, 74, 158, 1);
  font-size: 13px;
  padding-top: 10px;
}

.ivu-layout-content {
  margin-top: 26px;
  background: rgba(242, 242, 242, 1);
}

.dms-pass {
  margin-left: 60px;
  padding-top: 45px;
}

.dms-process {
  margin-left: 60px;
  padding-top: 45px;
}
</style>


