<template>
<div class="menu">
  <ul>
    <li v-for="item in c_flowtype" :key="item.flow_id">
      <Card>
        <router-link :to="{name:`${item.url}`,params:{Action:'Create'}}">
          <img style="width:210px;height:150px" :src="require(`../../assets/images/${item.flow_img}.jpg`)" :alt="item.flow_tips">
          <p>{{item.flow_name}}</p>
        </router-link>
      </Card>
    </li>
  </ul>
</div>
</template>
<script>
import webfunction from "../../api/services/webfunction";
export default {
  data() {
    return {
      flowtype: []
    };
  },
  computed: {
    c_flowtype() {
      var flow_category = this.$store.state.flow_category;
      if (flow_category === "全部") {
        return this.flowtype;
      } else {
        return this.flowtype.filter(function(item) {
          return item.flow_category === flow_category;
        });
      }
    },
    t_flowtype() {
      return this.$store.state.flowtype;
    }
  },
  watch: {
    t_flowtype: function() {
      this.flowtype = this.$store.state.flowtype;
    }
  },
  mounted() {
    this.flowtype = this.$store.state.flowtype;
  },
  methods: {
    setActive(index) {
      console.log(index);
    }
  }
};
</script>
<style scoped>
/* ul li以横排显示 */


/* 所有class为menu的div中的ul样式 */

div.menu ul {
  list-style: none;
  /* 去掉ul前面的符号 */
  margin: 0px;
  /* 与外界元素的距离为0 */
  padding: 0px;
  /* 与内部元素的距离为0 */
  width: auto;
  /* 宽度根据元素内容调整 */
}


/* 所有class为menu的div中的ul中的li样式 */

div.menu ul li {
  float: left;
  /* 向左漂移，将竖排变为横排 */
  margin-left: 60px;
  cursor: pointer;
  margin-bottom: 30px;
  text-align: center;
  font-size: 12px;
  font-weight: 400;
}

.ivu-card {
  margin-top: 30px;
}
</style>


