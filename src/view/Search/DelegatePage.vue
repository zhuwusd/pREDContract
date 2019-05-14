<template>
<Layout>
  <Content>
    <Card class="carddiv" shadow>
      <Form :model="filterData" :label-width="140">

        <Row>
          <Col span="24">
          <span class="contentTitle">查询条件</span>
          </Col>
        </Row>
        <br>
        <Row>

          <Col span="8">
          <FormItem label="公司名称">
            <Input v-model="filterData.company_name" enter-button placeholder="请输入公司名称" />
          </FormItem>
          </Col>

          <Col span="8">
          <FormItem label="所属BU">
            <Select clearable v-model="filterData.bu_code" filterable placeholder="请选择所属BU">
                    <Option  v-for="item in BU" :value="item.bu_code"  :key="item.bu_code">{{item.bu_name}}</Option>
                </Select>
          </FormItem>
          </Col>

          <Col span="8">
          <FormItem label="区域">
            <Select clearable v-model="filterData.region_code" filterable placeholder="请选择区域">
                    <Option  v-for="item in RegionList" :value="item.region_code"  :key="item.region_code">{{item.region_name}}</Option>
                </Select>
          </FormItem>
          </Col>

        </Row>


        <Row>
          <Col span="8">
          <FormItem label="产品线">
            <Cascader v-model="product_line_code_list" :data="ProductLineList" change-on-select :render-format="format"></Cascader>
          </FormItem>
          </Col>

          <Col span="8">
          <FormItem label="省份">
            <Select clearable v-model="filterData.province_code" placeholder="请选择省份" @on-change="filterData.city_code=''">
                    <Option  v-for="item in location_Provices" :key="item.province_code"  :value="item.province_code">{{item.province_name}}</Option>
                </Select>
          </FormItem>
          </Col>


          <Col span="8">
          <FormItem label="城市">
            <Select clearable v-model="filterData.city_code" filterable placeholder="请选择城市">
                    <Option  v-for="item in location_Citys_ByProvices" :value="item.city_code"  :key="item.city_code">{{item.city_name}}</Option>
                </Select>
          </FormItem>
          </Col>

        </Row>
        <Row>



          <Col span="8">
          <FormItem label="医院名称">
            <Input v-model="filterData.Hospitalname" enter-button placeholder="请输入医院名称" />
          </FormItem>
          </FormItem>
          </Col>

          <Col span="8">
          <FormItem label="授权生效日期From">
            <DatePicker @on-change="filterData.effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" placeholder="请选择授权生效日期From"></DatePicker>
          </FormItem>
          </Col>

          <Col span="8">
          <FormItem label="授权失效日期To">
            <DatePicker @on-change="filterData.expire_data=$event" format="yyyy-MM-dd" :editable="false" type="date" placeholder="请选择授权失效日期To"></DatePicker>
          </FormItem>
          </FormItem>
          </Col>

        </Row>


        <Row type="flex" justify="end">
          <Col span="24" style="text-align: right">
          <Button style="margin-right:20px" type="primary" @click="search">查询</Button>
          <Button style="margin-right:20px" type="primary" @click="exportToExcel_target">导出指标</Button>
          <Button style="margin-right:20px" type="primary" @click="exportToExcel_delegate">导出授权</Button>
          </Col>
        </Row>


        <br/>

      </Form>
      <Table border :data="vendor_list" :columns="vendorlistColumns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" show-eleva :current="filterData.page" :page-size="page_size" @on-change="changePage" show-total></Page>
        </div>
      </div>
    </Card>
  </Content>
</Layout>
</template>
<script>
import {
  mapGetters
} from "vuex";
import Empowerment from "../../api/services/Empowerment/Empowerment";
export default {
  data() {
    return {
      product_line_code_list: [],
      filterData: {
        company_name: null,
        bu_code: null,
        region_code: null,
        product_line_code: null,
        province_code: null,
        city_code: null,
        Hospitalname: null,
        effective_date: null,
        expire_data: null,
        page: 1
      },
      vendor_list: [],
      page_size: 10,
      total: 0,
      vendorlistColumns: [{
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "公司名称",
          key: "company_name"
        },
        {
          title: "所属BU",
          key: "bu"
        },
        {
          title: "主协议生效日期",
          align: "center",
          key: "empowerment_effective_date"
        },
        {
          title: "主协议终止日期",
          align: "center",
          key: "empowerment_expire_date"
        },
        {
          title: "详细信息",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button", {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  class: "table_btn",
                  nativeOn: {
                    click: () => {
                      this.$router.push({
                        name: 'DelegatePage',
                        query: {
                          empowerment_guid: params.row.empowerment_guid,
                        }
                      });
                    }
                  }
                },
                "查看授权"
              ), h(
                "Button", {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  class: "table_btn",
                  nativeOn: {
                    click: () => {
                      this.$router.push({
                        name: 'TargetPage',
                        query: {
                          empowerment_guid: params.row.empowerment_guid,
                        }
                      });
                    }
                  }
                },
                "查看指标"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["BU", "location_Provices", "location_Citys"]),
    RegionList: function() {
      var bu_code = this.filterData.bu_code;
      this.filterData.region_code = "";
      if (bu_code!==null) {
        let t_Regin = this.BU.find(item => item.bu_code === bu_code);
        return JSON.parse(JSON.stringify(t_Regin)).region_code;
      } else {
        return [];
      }
    },
    ProductLineList: function() {
      var bu_code = this.filterData.bu_code;
      this.filterData.product_line_code = "";
      if (bu_code!==null) {
        let t_product_line_code = this.BU.find(
          item => item.bu_code === bu_code
        );
        let data = JSON.parse(JSON.stringify(t_product_line_code))
          .product_line_code;
        data = this.toTree(data);
        return data;
      } else {
        return [];
      }
    },
    location_Citys_ByProvices: function() {
      var province_code = this.filterData.province_code;

      return this.location_Citys.filter(
        item => item.province_code === province_code
      );
    }
  },
  watch: {
    product_line_code_list: function() {
      var selectedData = this.product_line_code_list;
      if (selectedData.length > 0) {
        this.filterData.product_line_code = selectedData[
          selectedData.length - 1
        ];
      } else {
        this.filterData.product_line_code = null;
      }
    }
  },
  created() {
    this.search();
  },
  methods: {
    search() {
      Empowerment.getEmpowermentlist(this.filterData).then(response => {
        this.vendor_list = response.results;
        this.page_size = response.page_size;
        this.filterData.page = response.page;
        this.total = response.count;
      });
    },
    format(labels, selectedData) {
      //console.log(selectedData);
      return labels[selectedData.length - 1];
    },
    exportToExcel_target: function() {
      let data = {
        company_name: this.filterData.company_name,
        bu_code: this.filterData.bu_code,
        region_code: this.filterData.region_code,
        product_line_code: this.filterData.product_line_code,
        province_code: this.filterData.province_code,
        city_code: this.filterData.city_code,
        Hospitalname: this.filterData.Hospitalname,
        effective_date: this.filterData.effective_date,
        expire_data: this.filterData.expire_data
      }
      Empowerment.getExcelexportTarget(data).then(response => {
        var webUrl = window.location.href.replace(this.$route.fullPath, "");
        window.open(`${webUrl}${response.url}`, '_blank');
      });
    },
    exportToExcel_delegate: function() {
      let data = {
        company_name: this.filterData.company_name,
        bu_code: this.filterData.bu_code,
        region_code: this.filterData.region_code,
        product_line_code: this.filterData.product_line_code,
        province_code: this.filterData.province_code,
        city_code: this.filterData.city_code,
        Hospitalname: this.filterData.Hospitalname,
        effective_date: this.filterData.effective_date,
        expire_data: this.filterData.expire_data
      }
      Empowerment.getExcelexportDelegate(data).then(response => {
        var webUrl = window.location.href.replace(this.$route.fullPath, "");
        window.open(`${webUrl}${response.url}`, '_blank');
      });
    },
    changePage(page) {
      this.filterData.page = page;
      this.search();
    },
    toTree(arr) {
      var top = [],
        sub = [],
        arrObj = {};

      arr.forEach(function(item) {
        let obj = {};
        obj.parentId = item.product_line_parent_code;
        obj.value = item.product_line_code;
        obj.label = item.product_line_name;
        obj.children = [];
        if (item.product_line_parent_code === null) {
          top.push(obj);
        } else {
          sub.push(obj);
        }
        arrObj[item.product_line_code] = obj;
      });

      sub.forEach(function(item) {
        var parent = arrObj[item.parentId] || {
          children: []
        };
        parent.children.push(item);
      });

      return top;
    }
  }
};
</script>

<style scoped>
.carddiv {
  margin-bottom: 40px;
  width: 99%;
}

.ivu-date-picker {
  width: 100%;
}

a {
  color: #2d8cf0;
  transition: color 0.2s ease;
  cursor: pointer;
  outline: 0;
  text-decoration: none;
  background: 0 0;
  margin-right: 25px;
}


/* .ivu-card {
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
} */
</style>

