<template>
<Layout>
    <Content :style="{padding: '0px 100px 10px 100px', minHeight: '663px'}">
        <Card class="carddiv">
            <Row>
                <Col span="24">
                <span class="contentTitle">基础信息</span>
                </Col>
            </Row>
            <br/>
            <Row type="flex" justify="center">
                <Col span="23">
                <Table :columns="basicInfo_Column" :data="basicData" :show-header="false"></Table>
                </Col>
            </Row>
            <br/>
        </Card>
        <br/>
        <Card class="carddiv">
            <Row>
                <Col span="24">
                <span class="contentTitle">授权详细</span>
                </Col>
            </Row>
            <br/>
            <Row type="flex" justify="center">
                <Col span="23">
                <Table :columns="info_Column" :data="infoData"></Table>
                </Col>
            </Row>
            <br/>
        </Card>
    </Content>
</Layout>
</template>
<script>
import Empowerment from "../../api/services/Empowerment/Empowerment";
import expandRow from "./Table-expand.vue";
export default {
    data() {
        return {
            //basic_info: {},
            basicInfo_Column: [{
                    title: "firstColumnName",
                    key: "firstColumnName",
                    className: "columnField",
                    width: 90
                },
                {
                    title: "firstColumnValue",
                    key: "firstColumnValue",
                    align: "left"
                },
                {
                    title: "secondColumnName",
                    className: "columnField",
                    key: "secondColumnName",
                    width: 90
                },
                {
                    title: "secondColumnValue",
                    key: "secondColumnValue",
                    align: "left"
                }
            ],
            info_Column: [{
                    type: "expand",
                    width: 50,
                    render: (h, params) => {
                        return h(expandRow, {
                            props: {
                                row: params.row
                            }
                        });
                    }
                },
                {
                    title: "授权生效日期",
                    align: "center",
                    width: 150,
                    key: "empowerment_effective_date"
                },
                {
                    title: "授权失效日期",
                    align: "center",
                    width: 150,
                    key: "empowerment_expire_date"
                },
                {
                    title: "区域",
                    align: "center",
                    key: "region"
                },
                {
                    title: "经销模式",
                    align: "center",
                    key: "distribution_model"
                }
            ],
            basicData: [],
            infoData: []
        };
    },
    created() {
        this.search();
    },
    methods: {
        search() {
            Empowerment.getEmpowermentinfo({
                empowerment_guid: this.$route.query.empowerment_guid
            }).then(response => {
                if (response) {
                    var details = [];
                    details = response.empowerment_info.details;

                    this.basicData.push({
                        firstColumnName: "公司名称:",
                        firstColumnValue: response.company_name,
                        secondColumnName: "BU:",
                        secondColumnValue: response.bu
                    });
                    console.log(details);
                    details.forEach(element => {
                        /*                         var provinceStr = "";
                                                            var cityStr = "";
                                                            var hospitalStr = ""; */
                        var provinceArray = element.empowerment_area_info.empowerment_areas;
                        var productlineArray = element.product_line;

                        var show_Area_Table_Array = [];
                        var show_ProductLine_Table_Array = [];
                        //遍历授权区域
                        provinceArray.forEach(element => {
                            if (element.cities.length > 0) {
                                element.cities.forEach(item => {
                                    var choice_name = "";
                                    if (item.is_direct_choose) {
                                        choice_name = "正选";
                                    } else {
                                        choice_name = "反选";
                                    }
                                    var hospitalStr = "";
                                    item.hospitals.forEach(element => {
                                        if (hospitalStr === "") {
                                            hospitalStr = element.hospital_name;
                                        } else {
                                            hospitalStr = `${hospitalStr}\r\n${
                                                element.hospital_name
                                            }`;
                                        }
                                    });
                                    hospitalStr === "" ? (hospitalStr = "无") : hospitalStr;

                                    show_Area_Table_Array.push({
                                        province_name: element.province_name,
                                        city_name: item.city_name,
                                        choice_name: choice_name,
                                        hospitalStr: hospitalStr
                                    });
                                });
                            } else {
                                show_Area_Table_Array.push({
                                    province_name: element.province_name,
                                    city_name: "全部",
                                    choice_name: "正选",
                                    hospitalStr: "全部"
                                });
                            }
                        });
                        // console.log(productlineArray);
                        ///遍历产品线
                        productlineArray.forEach(element => {
                            var choice_name = "";
                            var Productline_name = "";
                            var parent_Productline_name = "";
                            if (element.is_direct_choose) {
                                choice_name = "正选";
                            } else {
                                choice_name = "反选";
                            }

                            if (element.products.length > 0) {

                                element.products.forEach(item => {
                                    if (Productline_name === "") {
                                        Productline_name = item.name;
                                    } else {
                                        Productline_name = `${Productline_name};${item.name}`
                                    }

                                });
                            }
                            if (element.parent) {
                                show_ProductLine_Table_Array.push({
                                    choice_name: choice_name,
                                    parent_Productline_name: element.parent.name,
                                    Productline_name: Productline_name
                                });
                            } else {
                                show_ProductLine_Table_Array.push({
                                    choice_name: "",
                                    parent_Productline_name: Productline_name,
                                    Productline_name: ""
                                });
                            }

                        });
                        this.infoData.push({
                            empowerment_effective_date: element.empowerment_effective_date,
                            empowerment_expire_date: element.empowerment_expire_date,
                            region: element.region.join(),
                            product_line: element.product_line.join(),
                            distribution_model: element.empowerment_area_info.distribution_model,
                            area_info: show_Area_Table_Array,
                            productline_info: show_ProductLine_Table_Array,
                            //provinceStr: provinceStr,
                            //cityStr: cityStr,
                            //hospitalStr: hospitalStr,
                            _expanded: true
                            // _disableExpand: true
                        });
                    });
                }
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


/* span {
    font-size: 13px;
} */
</style>
