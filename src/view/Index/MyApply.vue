<template>
<Layout>
  <Content>
    <Card class="carddiv" shadow>
      <Form :model="filterData" :label-width="130">

        <Row>
          <Col span="24">
          <span class="contentTitle">查询条件</span>
          </Col>
        </Row>
        <br>
        <Row>
          <Col span="8">
          <FormItem label="申请类型">
            <Select clearable v-model="filterData.flow_id" filterable placeholder="请选择申请类型">
                    <Option  v-for="item in flowtype" :value="item.flow_id"  :key="item.flow_id">{{item.flow_name}}</Option>
                </Select>
          </FormItem>
          </Col>

          <Col span="8">
          <FormItem label="公司名称">
            <Input v-model="filterData.company_name" enter-button placeholder="请输入公司名称" />
          </FormItem>
          </Col>

          <Col span="8">
          <FormItem label="申请编号">
            <Input v-model="filterData.business_no" enter-button placeholder="请输入申请编号" />
          </FormItem>
          </Col>

        </Row>

        <row>

          <Col span="8">
          <FormItem label="申请时间From">
            <DatePicker @on-change="filterData.task_from_date=$event" format="yyyy-MM-dd" :editable="false" type="date" placeholder="请选择申请时间From"></DatePicker>
          </FormItem>
          </Col>

          <Col span="8">
          <FormItem label="申请时间To">
            <DatePicker @on-change="filterData.task_to_date=$event" format="yyyy-MM-dd" :editable="false" type="date" placeholder="请选择申请时间To"></DatePicker>
          </FormItem>
          </Col>


          <Col span="8">
          <FormItem label="操作类型">
            <RadioGroup v-model="filterData.task_type_code">
              <Radio v-for="item in myapply_status" :key="item.code" :label="item.code">{{item.name}}</Radio>
            </RadioGroup>
          </FormItem>
          </Col>

        </row>

        <Row type="flex" justify="end">
          <Col span="2">
          <Button type="primary" style="withd:200px" @click="search">查询</Button>
          </Col>
        </Row>

        <br/>

      </Form>
      <Table  border  :data="MyApplyList" :columns="MyApplyColumns" stripe></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" show-eleva :current="page_number" :page-size="page_size" @on-change="changePage" show-total></Page>
        </div>
      </div>
    </Card>
  </Content>
</Layout>
</template>

<script>
import { mapGetters } from "vuex";
import enums from "../../api/services/common/enums";
import workflow from "../../api/services/workflow";
export default {
  data() {
    return {
      filterData: {
        flow_id: null,
        company_name: "",
        business_no: "",
        task_from_date: null,
        task_to_date: null,
        task_type_code: 18
      },
      MyApplyList: [],
      page_size: enums.pageSize,
      page_number: enums.pageIndex,
      total: enums.pageTotal,
      MyApplyColumns: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "申请类型",
          key: "flow_name"
        },
        {
          title: "公司名称",
          key: "company_name"
        },
        {
          title: "申请编号",
          key: "process_no"
        },
        {
          title: "申请时间",
          key: "task_start_date"
        },
        {
          title: "详细信息",
          key: "URL",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  class: "cursorPointer",
                  nativeOn: {
                    click: () => {
                      this.$router.push({
                        name: `${params.row.URL}`,
                        params: {
                          Action: "View"
                        },
                        query: {
                          process_no: params.row.process_no,
                          process_id: params.row.process_id,
                          task_id: params.row.task_id,
                          snapshot_id: params.row.snapshot_id
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
    ...mapGetters(["myapply_status", "flowtype"])
  },
  created() {
    this.search();
  },
  methods: {
    toMyTask() {
      this.$router.push("/Index/MyTask");
    },
    search() {
      workflow
        .getMyApplyData(this.filterData, this.page_number)
        .then(response => {
          this.MyApplyList = response.results;
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
