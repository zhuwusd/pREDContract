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

          <Col span="7">
          <FormItem label="公司名称">
            <Input v-model="filterData.company_name" enter-button placeholder="请输入公司名称" />
          </FormItem>
          </Col>

        </Row>


        <Row>

          <Col span="7">
          <FormItem label="主协议生效日期From">
            <DatePicker @on-change="filterData.effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" placeholder="请选择主协议生效日期From"></DatePicker>
          </FormItem>
          </Col>

          <Col span="7">
          <FormItem label="主协议生效日期To">
            <DatePicker @on-change="filterData.expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" placeholder="请选择主协议生效日期To"></DatePicker>
          </FormItem>
          </Col>



          <Col span="7">
          <FormItem label="签约状态">
            <Select clearable v-model="filterData.contract_status" placeholder="请选择签约状态">
                    <Option  v-for="item in contract_status" :key="item.code"  :value="item.code">{{item.name}}</Option>
                </Select>
          </FormItem>
          </Col>

        </Row>

        <Row type="flex" justify="end">
          <Col span="24" style="text-align: right">
          <Button style="margin-right:20px" type="primary" @click="search">查询</Button>
          <Button v-if="is_exprotExcel" style="margin-right:20px" type="primary" @click="exportToExcel">导出Excel</Button>
          </Col>
        </Row>

        <br/>

      </Form>
      <Row>
        <Col span="24">
        <Table border :data="vendor_list" :columns="vendorlistColumns" stripe></Table>
        <div style="overflow: hidden">
          <div style="float: right;">
            <Page :total="total" show-eleva :current="page_number" :page-size="page_size" @on-change="changePage" show-total></Page>
          </div>
        </div>
        </Col>
      </row>
    </Card>
  </Content>
</Layout>
</template>
<script>
import {
  mapGetters
} from "vuex";
import DistributorMaster from "../../api/services/Distributor/DistributorMaster";
export default {
  data() {
    return {
      filterData: {
        company_name: "",
        effective_date: null,
        expire_date: null,
        contract_status: ""
      },
      vendor_list: [],
      page_size: 10,
      page_number: 1,
      total: 0,
      vendorlistColumns: [{
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "公司名称",
          width: 200,
          key: "company_name"
        },
        {
          title: "主协议生效日期",
          align: "center",
          key: "effective_date"
        },
        {
          title: "主协议终止日期",
          align: "center",
          key: "expire_data"
        },
        {
          title: "签约状态",
          key: "contract_status"
        },
        {
          title: "详细信息",
          key: "URL",
          width: 160,
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
                        name: 'distributormaster',
                        query: {
                          guid: params.row.guid,
                        }
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["BU", "GlobalConfig", "user"]),
    contract_status: function() {
      return this.GlobalConfig.filter(
        item => item.type === "contract_status"
      );
    },
    is_exprotExcel: function() {
      return this.user.groups.findIndex(item => item.name === "sys_master_vendor_super") > -1 
    }
  },
  created() {
    this.search();
  },
  methods: {
    exportToExcel() {
      let data = {
        company_name: this.filterData.company_name,
        effective_date: this.filterData.effective_date,
        expire_date: this.filterData.expire_date,
        contract_status: this.filterData.contract_status,
      }
      DistributorMaster.getExcelexportVendor(data).then(response => {
        var webUrl = window.location.href.replace(this.$route.fullPath, "");
        window.open(`${webUrl}${response.url}`, '_blank');
      });
    },
    search() {
      let data = {
        company_name: this.filterData.company_name,
        effective_date: this.filterData.effective_date,
        expire_date: this.filterData.expire_date,
        contract_status: this.filterData.contract_status,
        page: this.page_number
      }
      DistributorMaster.getVendorlist(data).then(response => {
        this.vendor_list = response.results;
        this.page_size = response.page_size;
        this.page_number = response.page;
        this.total = response.count;
      });
    },
    changePage(page) {
      this.page_number = page;
      this.search();
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

