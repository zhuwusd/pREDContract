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
                <span class="contentTitle">指标详细</span>
                </Col>
            </Row>
            <br/>
            <Row type="flex" justify="center">
                <Col span="23">
                <Table :columns="target_Column" :data="targetData"></Table>
                </Col>
            </Row>
            <br/>
        </Card>
    </Content>
</Layout>
</template>
<script>
import Empowerment from "../../api/services/Empowerment/Empowerment";
export default {
    data() {
        return {
            //basic_info: {},
            basicInfo_Column: [{
                    title: 'firstColumnName',
                    key: 'firstColumnName',
                    className: "columnField",
                    width: 150
                },
                {
                    title: 'firstColumnValue',
                    key: 'firstColumnValue',
                    align: "left",
                },
                {
                    title: 'secondColumnName',
                    className: "columnField",
                    key: 'secondColumnName',
                    width: 150
                },
                {
                    title: 'secondColumnValue',
                    key: 'secondColumnValue',
                    align: "left",
                }
            ],
            target_Column: [{
                    title: '日期',
                    align: "center",
                    key: 'dateTime'
                },
                {
                    title: '初始指标',
                    align: "center",
                    key: 'origin_target'
                },
                {
                    title: '目标指标',
                    align: "center",
                    key: 'current_target'
                }
            ],
            basicData: [],
            targetData: []
        }
    },
    created() {
        this.search();
    },
    methods: {
        search() {
            Empowerment.getEmpowermenttarget({
                empowerment_guid: this.$route.query.empowerment_guid
            }).then(response => {

                if (response) {
                    var basic_info = response.basic_info;
                    var year = response.details[0].year;
                    var origin_target = response.details[0].origin_target;
                    var current_target = response.details[0].current_target;
                    // console.log(year);
                    this.basicData.push({
                        firstColumnName: '公司名称:',
                        firstColumnValue: basic_info.company_name,
                        secondColumnName: '性质:',
                        secondColumnValue: basic_info.company_nature
                    }, {
                        firstColumnName: 'BU:',
                        firstColumnValue: basic_info.bu,
                        secondColumnName: '',
                        secondColumnValue: ''
                    }, {
                        firstColumnName: '续约/新增:',
                        firstColumnValue: basic_info.contract_type,
                        secondColumnName: '公司SAP Code:',
                        secondColumnValue: basic_info.sap_code
                    }, {
                        firstColumnName: '母公司名称:',
                        firstColumnValue: basic_info.master_company_name,
                        secondColumnName: '母公司SAP Code:',
                        secondColumnValue: basic_info.master_sap_code
                    }, {
                        firstColumnName: '生效日期:',
                        firstColumnValue: basic_info.effect_date,
                        secondColumnName: '失效日期:',
                        secondColumnValue: basic_info.expire_date
                    }, {
                        firstColumnName: '是否享受返利:',
                        firstColumnValue: basic_info.is_rebate ? "是" : "否",
                        secondColumnName: '是否签署完成:',
                        secondColumnValue: basic_info.is_rebate ? "是" : "否",
                    }, {
                        firstColumnName: '年度指标:',
                        firstColumnValue: basic_info.annual_target,
                        secondColumnName: '',
                        secondColumnValue: ''
                    });
                    this.targetData.push({
                        dateTime: `${year}-01`,
                        origin_target: origin_target.target_jan,
                        current_target: current_target.target_jan
                    }, {
                        dateTime: `${year}-02`,
                        origin_target: origin_target.target_feb,
                        current_target: current_target.target_feb
                    }, {
                        dateTime: `${year}-03`,
                        origin_target: origin_target.target_mar,
                        current_target: current_target.target_mar
                    }, {
                        dateTime: `${year}-04`,
                        origin_target: origin_target.target_apr,
                        current_target: current_target.target_apr
                    }, {
                        dateTime: `${year}-05`,
                        origin_target: origin_target.target_may,
                        current_target: current_target.target_may
                    }, {
                        dateTime: `${year}-06`,
                        origin_target: origin_target.target_june,
                        current_target: current_target.target_june
                    }, {
                        dateTime: `${year}-07`,
                        origin_target: origin_target.target_july,
                        current_target: current_target.target_july
                    }, {
                        dateTime: `${year}-08`,
                        origin_target: origin_target.target_aug,
                        current_target: current_target.target_aug
                    }, {
                        dateTime: `${year}-09`,
                        origin_target: origin_target.target_sep,
                        current_target: current_target.target_sep
                    }, {
                        dateTime: `${year}-10`,
                        origin_target: origin_target.target_oct,
                        current_target: current_target.target_oct
                    }, {
                        dateTime: `${year}-11`,
                        origin_target: origin_target.target_nov,
                        current_target: current_target.target_nov
                    }, {
                        dateTime: `${year}-12`,
                        origin_target: origin_target.target_dec,
                        current_target: current_target.target_dec
                    })
                }
            });

        },
    }
}
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
