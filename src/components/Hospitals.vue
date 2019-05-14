<template>
<div>
  <Modal v-model="ProvincesModal" width="700" @on-visible-change="closeModel" :styles="{top: '230px'}" :mask-closable="false">
    <p slot="header">
      <span>请选择:省份</span>
    </p>
    <div>
      <CheckboxGroup v-model="seleted_Province_Arrary">
        <Checkbox v-for="item in location_Provices" :key="item.province_code" :label="item.province_code">{{item.province_name}}</Checkbox>
      </CheckboxGroup>
    </div>
    <div slot="footer">
      <Button type="primary" @click="gotoCitysModel">下一步</Button>
      <Button type="primary" @click="provincesave">确定</Button>
    </div>
  </Modal>

  <Modal v-model="CitysModal" width="800" :styles="{top: '30px'}" :mask-closable="false">
    <p slot="header">
      <span>请选择:省份->城市</span>
    </p>
    <div>
      <Tabs v-model="tabpane_Proveice_Index">
        <TabPane :label="item.province_name" v-for="item in seleted_Province" :key="item.province_code" :name="item.province_code">
        </TabPane>
      </Tabs>
      <Table stripe height="525" :columns="table_Citys_Header" :data="table_Citys_Array" @on-select-all-cancel="cancelCityAll" @on-select-all="selectCityAll" @on-select="selectCity" @on-select-cancel="cancelCity"></Table>
    </div>
    <div slot="footer">
      <Button type="primary" @click="save">确定</Button>
    </div>
  </Modal>

  <Modal v-model="HospitalsModal" width="700" :styles="{top: '30px'}" :mask-closable="false">
    <p slot="header">
      <span>城市:{{city_name}}</span>
    </p>
    <div>
      <Row>
        <Col span="6">
        <div style="padding-top:8px;padding-left:10px;">
          <label class="selecttype">选择方式:</label>
          <RadioGroup v-model="is_direct_choose_name">
            <Radio label="正选"></Radio>
            <Radio label="反选"></Radio>
          </RadioGroup>
        </div>
        </Col>
        <Col span="18">
        <Input v-model="hospitalName" style="padding-right:20px;" @on-search="searchHospital" search enter-button placeholder="请输入医院名称..." />
        </Col>
      </Row>
      <br />
      <Row>
        <Col span="24">
        <Table height="480" stripe :columns="table_Hospitals_Header" :data="table_Hospitals_Arrary" @on-select-all-cancel="cancelHospitalAll" @on-select-all="selecthospitalAll" @on-select="selecthospital" @on-select-cancel="cancelhospital"></Table>
        </Col>
      </Row>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="total" show-eleva :current="page_number" :page-size="page_size" @on-change="changePage" show-total></Page>
        </div>
      </div>
    </div>
    <div slot="footer">
      <Button type="primary" @click="resetHospital">重置</Button>
      <Button type="primary" @click="addHospital">确定</Button>
    </div>
  </Modal>

  <Table v-if="show_Tabel" stripe :columns="show_Table_Header" :data="show_Table_Array"></Table>

</div>
</template>
<script>
import {
  mapGetters,
  mapActions
} from "vuex";
import webfunction from "../api/services/webfunction.js";
import enums from "../api/services/common/enums";
export default {
  data() {
    return {
      hospitalName: "",
      ProvincesModal: false,
      CitysModal: false,
      HospitalsModal: false,
      show_Tabel: false,
      is_direct_choose_name: "正选",
      city_name: "",
      city_code: null,

      status: null,

      seleted_Province_Arrary: [],

      tabpane_Proveice_Index: "",
      resultData: [],

      seleted_Hospitals_Arrary: [],
      table_Hospitals_Arrary: [],

      page_size: enums.pageSize,
      page_number: enums.pageIndex,
      total: enums.pageTotal,
      show_Table_Array: [],
      show_Table_Header: [{
          title: "省份名称",
          key: "province_name"
        },
        {
          title: "城市名称",
          key: "city_name"
        },
        {
          title: "选择方式",
          key: "choice_name"
        },
        {
          title: "医院",
          tooltip: true,
          className: "column_cursor",
          key: "hospitalStr"
        },
      ],
      table_Citys_Header: [{
          type: "selection",
          width: 100,
          align: "center"
        },
        {
          title: "城市代号",
          key: "city_code"
        },
        {
          title: "城市名称",
          key: "city_name"
        },
        {
          title: "选择方式",
          render: (h, params) => {
            return h(
              "div",
              params.row.hospitals.length > 0 ?
              params.row.is_direct_choose ? "正选" : "反选" :
              ""
            );
          }
        },
        {
          title: "已选医院",
          tooltip: true,
          className: "column_cursor",
          key: "hospitalStr"
        },
        {
          title: "操作",
          key: "URL",
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
                      //console.log(params);
                      if (params.row._checked === true) {
                        this.CitysModal = false;
                        if (params.row.is_direct_choose) {
                          this.is_direct_choose_name = "正选";
                        } else {
                          this.is_direct_choose_name = "反选";
                        }
                        this.HospitalsModal = true;
                        this.city_code = params.row.city_code;
                        this.city_name = params.row.city_name;
                        this.gotoHospitalsModel();
                      } else {
                        this.$Message.warning("请先选择该城市");
                      }
                    }
                  }
                },
                "选择医院"
              )
            ]);
          }
        }
      ],
      table_Hospitals_Header: [{
          type: "selection",
          width: 100,
          align: "center"
        },
        {
          title: "医院代号",
          key: "hospital_code"
        },
        {
          title: "医院名称",
          key: "hospital_name"
        }
      ]
    };
  },
  props: ["displayHospital", "hosptialIndex", "hosptialList"],
  computed: {
    ...mapGetters(["location_Provices", "location_Citys"]),
    seleted_Province: function() {
      var seleted_Province_Arrary = this.seleted_Province_Arrary;

      return this.location_Provices.filter(item =>
        seleted_Province_Arrary.includes(item.province_code)
      );
    },
    table_Citys_Array: function() {
      var citys_Result_Array = [];
      var tabpane_Proveice_Index = this.tabpane_Proveice_Index;
      var citys = this.location_Citys.filter(
        item => item.province_code === tabpane_Proveice_Index
      );
      citys.forEach(element => {
        var arr = this.resultData.find(
          item => item.province_code === element.province_code
        );
        var index = arr.cities.findIndex(
          item => item.city_code === element.city_code
        );
        if (index > -1) {
          var hospitalStr = "";
          arr.cities[index].hospitals.forEach(element => {
            if (hospitalStr === "") {
              hospitalStr = element.hospital_name
            } else {
              hospitalStr = `${hospitalStr}\r\n${element.hospital_name}`
            }
          });
          hospitalStr === "" ? hospitalStr = "" : hospitalStr;
          citys_Result_Array.push({
            city_code: element.city_code,
            city_name: element.city_name,
            order_number: element.order_number,
            province_code: element.province_code,
            hospitals: arr.cities[index].hospitals,
            hospitalStr: hospitalStr,
            is_direct_choose: arr.cities[index].is_direct_choose,
            _checked: true
          });
        } else {
          citys_Result_Array.push({
            city_code: element.city_code,
            city_name: element.city_name,
            order_number: element.order_number,
            province_code: element.province_code,
            hospitalStr: "",
            hospitals: [],
            is_direct_choose: true,
            _checked: false
          });
        }
      });
      //console.log(citys_Result_Array);
      return citys_Result_Array;
    }
  },
  watch: {
    displayHospital: function() {
      this.ProvincesModal = this.displayHospital;
    },
    show_Table_Array: function() {
      if (this.show_Table_Array.length) {
        this.show_Tabel = true;
      }
    },
    hosptialList: function() {
      //console.log(this.hosptialList);
      this.convertToTable(this.hosptialList);
    }
  },
  /*   created() {
      console.log(this.hosptialList);
    }, */
  methods: {
    closeModel: function(value) {
      if (!value) {
        this.$emit("closeHospital");
      }
    },
    changePage: function(page) {
      this.page_number = page;
      this.gotoHospitalsModel();
    },

    selectCityAll: function(selection) {
      selection.forEach(element => {
        var arr = this.resultData.find(
          item => item.province_code === element.province_code
        );
        var index = arr.cities.findIndex(
          item => item.city_code === element.city_code
        );
        if (index < 0) {
          arr.cities.push({
            city_code: element.city_code,
            city_name: element.city_name,
            order_number: element.order_number,
            province_code: element.province_code,
            is_direct_choose: true,
            hospitals: []
          });
        }
      });
      //(this.resultData);
    },
    cancelCityAll: function(selection) {
      this.table_Citys_Array.forEach(element => {
        var arr = this.resultData.find(
          item => item.province_code === element.province_code
        );
        var index = arr.cities.findIndex(
          item => item.city_code === element.city_code
        );
        if (index > -1) {
          arr.cities.splice(index, 1);
        }
      });
      //console.log(this.resultData);
    },
    selectCity: function(selection, row) {
      //console.log(row.province_code);
      var arr = this.resultData.find(
        item => item.province_code === row.province_code
      );
      //console.log(arr.cities);
      arr.cities.push({
        city_code: row.city_code,
        city_name: row.city_name,
        order_number: row.order_number,
        province_code: row.province_code,
        is_direct_choose: true,
        hospitals: []
      });
      // console.log(this.resultData);
    },
    cancelCity: function(selection, row) {
      var arr = this.resultData.find(
        item => item.province_code === row.province_code
      );
      var index = arr.cities.findIndex(item => item.city_code === row.city_code);
      arr.cities.splice(index, 1);
      //console.log(this.resultData);
    },

    selecthospitalAll: function(selection) {
      selection.forEach(element => {
        if (
          this.seleted_Hospitals_Arrary.findIndex(
            item => item.hospital_code === element.hospital_code
          ) < 0
        ) {
          this.seleted_Hospitals_Arrary.push({
            city_code: element.city_code,
            city_name: element.city_name,
            hospital_code: element.hospital_code,
            hospital_name: element.hospital_name,
            order_number: element.order_number,
            province_code: element.province_code,
            province_name: element.province_name
          });
        }
      });
    },
    cancelHospitalAll: function(selection) {
      this.table_Hospitals_Arrary.forEach(element => {
        var index = this.seleted_Hospitals_Arrary.findIndex(
          item => item.hospital_code === element.hospital_code
        );
        this.seleted_Hospitals_Arrary.splice(index, 1);
      });
    },
    selecthospital: function(selection, row) {
      //this.seleted_Hospitals_Arrary.push(row);
      //console.log(row);
      /*       var arr = this.resultData.find(item => item.province_code === row.province_code).citys.find(item => item.city_code === row.city_code)
            arr.hospitals.push({
              city_code: row.city_code,
              city_name: row.city_name,
              hospital_code: row.hospital_code,
              hospital_name: row.hospital_name,
              order_number: row.order_number,
              province_code: row.province_code,
              province_name: row.province_name
            }); */
      this.seleted_Hospitals_Arrary.push({
        city_code: row.city_code,
        city_name: row.city_name,
        hospital_code: row.hospital_code,
        hospital_name: row.hospital_name,
        order_number: row.order_number,
        province_code: row.province_code,
        province_name: row.province_name
      });
      // console.log(this.resultData);
    },
    cancelhospital: function(selection, row) {
      // var arr = this.resultData.find(item => item.province_code === row.province_code).citys.find(item => item.city_code === row.city_code)
      var index = this.seleted_Hospitals_Arrary.findIndex(
        item => item.hospital_code === row.hospital_code
      );
      this.seleted_Hospitals_Arrary.splice(index, 1);
    },
    gotoCitysBefore() {
      ////////设置第一个Tabel/////////
      this.tabpane_Proveice_Index = this.seleted_Province[0].province_code;
      ////////主数据中Push选择的城市信息///////////////         /*  
      this.seleted_Province.forEach(element => {
        var index = this.resultData.findIndex(item => item.province_code === element.province_code)
        if (index < 0) {
          this.resultData.push({
            province_code: element.province_code,
            province_name: element.province_name,
            cities: []
            //citys: this.get_Citys(element.province_code)
          });
        }
      });
      ///记录resultData删除的省份记录
      var notExisttArr = [];
      this.resultData.forEach(element => {
        if (this.seleted_Province.findIndex(item => item.province_code === element.province_code) < 0) {
          notExisttArr.push(element.province_code);
        }
      })
      ///删除的省份从数组中剔除
      notExisttArr.forEach(element => {
        var index = this.resultData.findIndex(item => item.province_code === element);
        this.resultData.splice(index, 1);
      })
    },
    gotoCitysModel: function() {
      if (JSON.stringify(this.seleted_Province) === "[]") {
        this.$Message.warning("请选择至少一个省份");
      } else {
        this.gotoCitysBefore();
        this.ProvincesModal = false;
        this.CitysModal = true;
      }
    },
    gotoHospitalsModel: function() {
      var t_city = [];
      t_city.push(this.city_code);
      this.seleted_Hospitals_Arrary = this.resultData
        .find(item => item.province_code === this.tabpane_Proveice_Index)
        .cities.find(item => item.city_code === this.city_code).hospitals;

      //console.log(arr);
      webfunction
        .getHospital({
          hospital_name: this.hospitalName,
          //province_code: JSON.stringify([]),
          city_code: this.city_code,
          page: this.page_number
        })
        .then(response => {
          //console.log(response);
          this.table_Hospitals_Arrary = [];
          //this.sel_hospitals_data = response.results;
          var hospitals = response.results;

          hospitals.forEach(element => {
            var index = this.seleted_Hospitals_Arrary.findIndex(
              item => item.hospital_code === element.hospital_code
            );
            if (index > -1) {
              this.table_Hospitals_Arrary.push({
                city_code: element.city_code,
                city_name: element.city_name,
                hospital_code: element.hospital_code,
                hospital_name: element.hospital_name,
                province_code: element.province_code,
                province_name: element.province_name,
                order_number: element.order_number,
                _checked: true
              });
            } else {
              this.table_Hospitals_Arrary.push({
                city_code: element.city_code,
                city_name: element.city_name,
                hospital_code: element.hospital_code,
                hospital_name: element.hospital_name,
                province_code: element.province_code,
                province_name: element.province_name,
                order_number: element.order_number,
                _checked: false
              });
            }
          });
          this.page_size = response.page_size;
          this.page_number = response.page;
          this.total = response.count;
        });
    },
    get_Citys: function(province_code) {
      let citys = [];
      let t_citys = this.location_Citys.filter(
        item => item.province_code === province_code
      );
      t_citys.forEach(element => {
        citys.push({
          city_code: element.city_code,
          city_name: element.city_name,
          _checked: false
        });
      });
      return citys;
    },
    addHospital: function() {
      this.HospitalsModal = false;
      this.CitysModal = true;
      var arr = this.resultData
        .find(item => item.province_code === this.tabpane_Proveice_Index)
        .cities.find(item => item.city_code === this.city_code);
      // console.log(this.is_direct_choose_name);
      this.is_direct_choose_name === "正选" ? arr.is_direct_choose = true : arr.is_direct_choose = false;
      arr.hospitals = [];
      this.seleted_Hospitals_Arrary.forEach(element => {
        arr.hospitals.push(element);
      });
      this.seleted_Hospitals_Arrary = [];
      (this.page_size = enums.pageSize),
      (this.page_number = enums.pageIndex),
      (this.total = enums.pageTotal)
      //console.log(this.resultData);
    },
    resetHospital: function() {
      var arr = this.resultData
        .find(item => item.province_code === this.tabpane_Proveice_Index)
        .cities.find(item => item.city_code === this.city_code);
      arr.hospitals = [];
      this.seleted_Hospitals_Arrary = [];
      this.gotoHospitalsModel();
    },
    provincesave() {
      if (JSON.stringify(this.seleted_Province) === "[]") {
        this.$Message.warning("请选择至少一个省份");
      } else {
        this.gotoCitysBefore();
        this.save();
      }
    },
    save: function() {

      this.ProvincesModal = false;
      this.CitysModal = false;
      this.HospitalsModal = false;
      this.convertToTable(this.resultData);
      if (typeof this.hosptialIndex!=="undefined") {
        this.$emit("setHospital", this.resultData, this.hosptialIndex);
      } else {
        this.$emit("setHospital", this.resultData);
      }
    },
    searchHospital: function() {
      //console.log("123");
      this.gotoHospitalsModel();
    },
    convertToTable: function(hospitalData) {
      this.show_Table_Array = [];
      hospitalData.forEach(element => {
        if (element.cities.length > 0) {
          element.cities.forEach(item => {
            var choice_name = "";
            if (item.is_direct_choose && item.hospitals.length > 0) {
              choice_name = "正选";
            }
            if (item.is_direct_choose === false && item.hospitals.length > 0) {
              choice_name = "反选";
            }
            var hospitalStr = "";
            item.hospitals.forEach(element => {
              if (hospitalStr === "") {
                hospitalStr = element.hospital_name
              } else {
                hospitalStr = `${hospitalStr}\r\n${element.hospital_name}`
              }
            });
            hospitalStr === "" ? hospitalStr = "" : hospitalStr;

            this.show_Table_Array.push({
              province_name: element.province_name,
              city_name: item.city_name,
              choice_name: choice_name,
              hospitalStr: hospitalStr
            });
          })
        } else {
          this.show_Table_Array.push({
            province_name: element.province_name,
            city_name: "",
            choice_name: "",
            hospitalStr: ""
          });
        }
      })
    }
  }
};
</script>
<style scoped>

</style>


