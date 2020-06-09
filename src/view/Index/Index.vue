<template>
<Layout>
  <Sider hide-trigger class="leftmenu">

    <div class="flow_filter">
      <div class="flow_menu" @click="toMyTask()">
        <div v-bind:class="step=='MyTask'?'dms-pass':'dms-process'">
          <div class="icon"></div>
        </div>
        <p>我的任务</p>
      </div>

      <div class="flow_menu" @click="toMyApply()">
        <div v-bind:class="step=='MyApply'?'dms-pass':'dms-process'">
          <div class="icon"></div>
        </div>
        <p>我的申请11</p>
      </div>


    </div>

  </Sider>
  <Layout :style="{padding: '0px 24px 0px'}">
    <Content :style="{padding: '0px 24px 10px 0px', minHeight: '663px'}">
      <router-view/>
    </Content>
  </Layout>
</Layout>
</template>
<script>
export default {
  computed: {
    step: function() {
      if (this.$route.path.includes("MyTask")) {
        return "MyTask";
      } else {
        return "MyApply";
      }
    }
  },
  methods: {
    toMyTask() {
      this.$router.push({
        name: "MyTask"
      });
    },
    toMyApply() {
      this.$router.push({
        name: "MyApply"
      });
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


