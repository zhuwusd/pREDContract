<template>
<Layout >
        <Sider hide-trigger>
          
<!--             <CellGroup >
              <Cell   to="/workflow/index" icon="md-desktop"   @click.native="filter(item.flow_category)" :title="item.flow_category"  v-for="(item,key) in c_flowtype" :key="key"/>
            </CellGroup> -->
        <div class="flow_filter">
          <div class="flow_menu" v-for="(item,key) in c_flowtype" :key="key" @click="filter(item.flow_category)">
             <div  v-bind:class="item.flow_category==flowcategory?'dms-pass':'dms-process'"  >
                 <div class="icon"></div>
             </div>
            <p>{{item.flow_category}}</p>
          </div>    
        </div> 
        </Sider>
        <Layout :style="{padding: '0px 24px 0px'}">
            <Content :style="{margin: '26px 24px 10px 0px', minHeight: '663px',background: 'white'}">
                 <router-view/>       
            </Content>
        </Layout>
</Layout>
</template>
<script>
import { mapActions,mapGetters } from "vuex";
import webfunction from "../../api/services/webfunction";
import utils from "../../api/services/common/utils";
export default {
  data() {
    return {
      flowtype: []
    };
  },
  created() {
    webfunction.getflowtype().then(response => {
      this.flowtype = response;
    });
  },
  computed: {
     ...mapGetters(["flowcategory"]),
    c_flowtype() {
      var cars = this.flowtype;
      var outObject = cars.reduce(function(a, e) {
        let estKey = e["flow_category"];
        if (!a[estKey]) {
          a[estKey] = [];
        }
        return a;
      }, {});
      var aa = [];
      aa.push({ flow_category: "全部" });
      for (var item in outObject) {
        aa.push({
          flow_category: item,
          items: []
        });
      }

      return aa;
    }
  },
  methods: {
    ...mapActions(["set_FlowCategory"]),
    filter(value) {
      this.set_FlowCategory(value);
    }
  }
};
</script>
<style scoped>
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
p{
  font-weight: 700;
  color: rgba(25, 74, 158, 1)  ;
  font-size: 13px;
  padding-top: 10px;
}
.dms-pass{
   margin-left: 60px;
   padding-top:45px;
}
.dms-process{
   margin-left: 60px;
   padding-top:45px;
}
.flow_menu:hover {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  border-color: #eee;
}
</style>


