<template>
<Layout>
    <Sider hide-trigger class="leftmenu">

        <div class="flow_filter">

            <div class="flow_menu" @click="step='baseinfo'">
                <div v-bind:class="step=='baseinfo'?'dms-pass':'dms-process'">
                    <div class="icon"></div>
                </div>
                <p>授权信息</p>
            </div>

            <div class="flow_menu" @click="step='approveoperation'" v-show="!isCreate||(isCreate&&isStart)">
                <div v-bind:class="step=='approveoperation'?'dms-pass':'dms-process'">
                    <div class="icon"></div>
                </div>
                <p>审批历史</p>
            </div>


        </div>

    </Sider>
    <Layout :style="{padding: '0px 24px 0px'}">
        <Content :style="{padding: '0px 24px 10px 0px', minHeight: '663px'}">

            <div v-if="step==='baseinfo'">
                <Form ref="ref_filterform" :rules="filterRuleValidate" :model="filterData" :label-width="140">
                    <Card>
                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">经销商基本信息</span>
                            </Col>
                        </Row>

                        <div v-if="isCreate">
                            <Row>
                                <Col span="12">
                                <FormItem label="经销商名称" prop="company_name">
                                    <Input v-model="filterData.company_name" enter-button placeholder="请输入经销商名称" />
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="经销商类型" prop="vendor_type">
                                    <Select clearable v-model="filterData.vendor_type">
                                <Option  v-for="item in vendor_type_list" :value="item.code"  :key="item.code">{{item.name}}</Option>
                            </Select>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="授权变更开始日期" prop="effect_date">
                                    <DatePicker @on-change="filterData.effect_date=$event" :value="filterData.effect_date" format="yyyy-MM-dd" :editable="false" type="date"></DatePicker>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="24" align="middle">
                                <Button type="primary" style="withd:200px" @click="search">查询</Button>
                                </Col>
                            </Row>
                            <br/>
                        </div>
                        <Row v-if="EmpowermentChangeData.vendor_id" type="flex" justify="center">
                            <Col span="24">
                            <Table :columns="basicInfo_Column" :data="basicData" :show-header="false"></Table>
                            </Col>
                        </Row>


                    </Card>
                </Form>




                <Form ref="ref_from1" :model="EmpowermentChangeData" :rules="ruleValidate" :label-width="140">

                    <Card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">授权产品信息</span>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="22">
                            <FormItem label="产品线" :label-width="60">
                                <Button type="dashed" style="margin-left:0px" v-if="isCreate" @click="productShow=true">编辑</Button>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="22">
                            <ProductLine @closeProduct="productShow=false" @setProductLine="setProductLine" :masterproductLineList="EmpowermentChangeData.empowerment_info.empowerment_product.change_product_line" :displayProduct="productShow"></ProductLine>
                            </Col>
                        </Row>
                        <div v-show="EmpowermentChangeData.vendor_id">
                            <br>
                            <Row type="flex" justify="center" class="code-row-bg">
                                <Col span="22">
                                <span class="ivu-form-item-label"> 修改前:</span>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center" class="code-row-bg">
                                <Col span="22">
                                <ProductLine :masterproductLineList="EmpowermentChangeData.empowerment_info.empowerment_product.product_line"></ProductLine>
                                </Col>
                            </Row>
                        </div>
                    </Card>


                    <Card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">授权区域信息</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="24">
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="22">
                            <FormItem label="授权医院" :label-width="60">
                                <Button type="dashed" style="margin-left:0px" v-if="isCreate" @click="hospitalShow=true">编辑</Button>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="22">
                            <Hospital @closeHospital="hospitalShow=false" :hosptialList="EmpowermentChangeData.empowerment_info.empowerment_product.empowerment_area_info.change_empowerment_areas" @setHospital="setHospital" :displayHospital="hospitalShow"></Hospital>
                            </Col>
                        </Row>
                        <div v-show="EmpowermentChangeData.vendor_id">
                            <br>
                            <Row type="flex" justify="center" class="code-row-bg">
                                <Col span="22">
                                <span class="ivu-form-item-label"> 修改前:</span>
                                </Col>
                            </Row>
                            <Row type="flex" justify="center" class="code-row-bg">
                                <Col span="22">
                                <Hospital :hosptialList="EmpowermentChangeData.empowerment_info.empowerment_product.empowerment_area_info.empowerment_areas"></Hospital>
                                </Col>
                            </Row>
                        </div>
                    </Card>


                    <Card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">补充协议未盖章文件</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" prop="empowerment_info.empowerment_file.effect_date" :rules="is_channel_operate_upload?ruleValidate.effect_date:[]">
                                <DatePicker :disabled="!is_channel_operate_upload" @on-change="EmpowermentChangeData.empowerment_info.empowerment_file.effect_date=$event" :value="EmpowermentChangeData.empowerment_info.empowerment_file.effect_date" format="yyyy-MM-dd" :editable="false"
                                    type="date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" prop="empowerment_info.empowerment_file.expire_date" :rules="is_channel_operate_upload?ruleValidate.expire_date:[]">
                                <DatePicker :disabled="!is_channel_operate_upload" @on-change="EmpowermentChangeData.empowerment_info.empowerment_file.expire_date=$event" :value="EmpowermentChangeData.empowerment_info.empowerment_file.expire_date" format="yyyy-MM-dd" :editable="false"
                                    type="date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="上传人" >
                                <Input disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_file.uploader" enter-button />
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="补充协议" prop="empowerment_info.empowerment_file.empowerment_attachment" :rules="is_channel_operate_upload?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!is_channel_operate_upload" @clildUpload='clildUpload' uploadType="empowerment_attachment" :fileList="EmpowermentChangeData.empowerment_info.empowerment_file.empowerment_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>


                    <Card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">补充协议盖章文件</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期">
                                <DatePicker :disabled="!is_channel_operate_master_agreement_signed" @on-change="EmpowermentChangeData.empowerment_info.empowerment_seal_file.effect_date=$event" :value="EmpowermentChangeData.empowerment_info.empowerment_seal_file.effect_date" format="yyyy-MM-dd"
                                    :editable="false" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期">
                                <DatePicker :disabled="!is_channel_operate_master_agreement_signed" @on-change="EmpowermentChangeData.empowerment_info.empowerment_seal_file.expire_date=$event" :value="EmpowermentChangeData.empowerment_info.empowerment_seal_file.expire_date" format="yyyy-MM-dd"
                                    :editable="false" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="上传人">
                                <Input disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_seal_file.uploader" enter-button />
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="补充协议">
                                <CustomUpload :customDisabled="!is_channel_operate_master_agreement_signed" @clildUpload='clildUpload' uploadType="empowerment_seal_attachment" :fileList="EmpowermentChangeData.empowerment_info.empowerment_seal_file.empowerment_seal_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>

                    </Card>


                    <Card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">指标信息</span>
                            </Col>
                        </Row>


                        <Row>
                            <Col span="12">
                            <FormItem label="是否与母公司共享" :label-width="200">
                                <i-switch :disabled="!isCreate" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.is_share_master" size="large">
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </FormItem>
                            </Col>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="1月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_jan"></InputNumber>
                                ->
                                <InputNumber class="test" :disabled="!isCreate||1<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_jan"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="2月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_feb"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||2<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_feb"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="3月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_mar"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||3<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_mar"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="4月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_apr"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||4<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_apr"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="5月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_may"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||5<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_may"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="6月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_june"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||6<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_june"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="7月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_july"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||7<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_july"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="8月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_aug"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||8<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_aug"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="9月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_sep"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||9<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_sep"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="10月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_oct"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||10<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_oct"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="11月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_nov"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||11<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_nov"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="12月指标">
                                <InputNumber disabled v-model="EmpowermentChangeData.empowerment_info.empowerment_target.target_dec"></InputNumber>
                                ->
                                <InputNumber :disabled="!isCreate||12<change_month" v-model="EmpowermentChangeData.empowerment_info.change_empowerment_target.target_dec"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <FormItem label="总指标">
                                <p class="ivu-input-number-input">{{source_target_Total}}->{{final_target_Total}}</p>
                            </FormItem>
                            </Col>
                        </Row>

                    </Card>
                </Form>

            </div>
            <div v-show="step==='approveoperation'">
                <Card>

                    <Row style="margin-bottom: 30px">
                        <Col span="12">
                        <span class="contentTitle">审批历史</span>
                        </Col>
                    </Row>
                    <Row style="margin-bottom: 30px">
                        <Col span="24">
                        <WorkflowHistory></WorkflowHistory>
                        </Col>
                    </Row>
                </Card>
            </div>

            <WorkflowOperation @validateAll="validateAll" @startWorkflow="startWorkflow" @operateWorkflow="operateWorkflow"></WorkflowOperation>


        </Content>
    </Layout>
</Layout>
</template>
<script>
import {
    mapGetters
} from "vuex";
import {
    TOKEN,
    startMessage,
    returnMessage,
    commentMessage,
    notRunMessage,
    mustConfirmContractMessage
} from "../../../api/services/common/const.js";
import EmpowermentChange from "../../../api/services/EmpowermentChange/EmpowermentChange.js";
import WorkflowHistory from "../../../components/WorkflowHistory/WorkflowHistory.vue";
import Hospital from "../../../components/Hospitals.vue";
import CustomUpload from "../../../components/CustomUpload.vue";
import WorkflowOperation from "../../../components/WorkflowOperation.vue";
import ProductLine from "../../../components/ProductLine.vue";
import enums from "../../../api/services/common/enums.js";
import mixinsmethod from "./mixins";
export default {
    mixins: [mixinsmethod],
    data() {
        return {

            sel_hospitals_table: [{
                    type: "selection",
                    width: 100,
                    align: "center"
                },
                {
                    title: "城市代号",
                    width: 100,
                    key: "city_code"
                },
                {
                    title: "城市名称",
                    width: 100,
                    key: "city_name"
                },
                {
                    title: "选择方式",
                    width: 100,
                    key: "is_selected",
                    render: (h, params) => {
                        if (params.row.is_selected === false) {
                            return h("div", "反选");
                        } else {
                            return h("div", "正选");
                        }
                    }
                },
                {
                    title: "医院名称",
                    key: "hospital_name"
                }
            ]
        };
    },
    components: {
        WorkflowHistory,
        CustomUpload,
        WorkflowOperation,
        ProductLine,
        Hospital
    },
    mounted() {
        if (this.$route.params.Action === "View" || this.$route.params.Action === "Approve") {
            this.getSnapshot()

        } else {
            this.EmpowermentChangeData.empowerment_info.empowerment_seal_file.bu = this.user.bu;
            this.EmpowermentChangeData.empowerment_info.empowerment_file.bu = this.user.bu;
            this.filterData.bu = this.user.bu;
        }

    },
    computed: {
        ...mapGetters(["BU", "vendor_type_list", "location_Provices", "user"]),
        provices_list: function() {
            var a = this.location_Provices;
            return a.filter(item =>
                this.province_code_list.includes(item.province_code)
            );
        },
        isCreate: function() {
            return this.$route.params.Action === "Create" || this.$route.query.flow_task_name === enums.workFlowReStart;
        },
        isView: function() {
            return this.$route.params.Action === "View";
        },
        isStart: function() {
            return this.$route.query.flow_task_name === enums.workFlowReStart;
        },
        isApprove: function() {
            return this.$route.params.Action === "Approve"
        },
        is_channel_operate_upload() {
            return (
                this.$route.query.flow_task_name ===
                enums.EmpowermentChange.ApproveNode.channel_operate_upload
            );
        },
        is_channel_operate_master_agreement_signed() {
            return (
                this.$route.query.flow_task_name ===
                enums.EmpowermentChange.ApproveNode
                .channel_operate_master_agreement_signed
            );
        },
        source_target_Total: function() {
            return (
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_jan +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_feb +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_mar +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_apr +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_may +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_june +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_july +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_aug +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_sep +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_oct +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_nov +
                this.EmpowermentChangeData.empowerment_info.empowerment_target.target_dec
            );
        },
        final_target_Total: function() {
            return (
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_jan +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_feb +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_mar +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_apr +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_may +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_june +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_july +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_aug +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_sep +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_oct +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_nov +
                this.EmpowermentChangeData.empowerment_info.change_empowerment_target.target_dec
            );
        },
        change_month: function() {
            var change_effect_date = this.EmpowermentChangeData.basic_info.change_effect_date;
            if (change_effect_date != null) {
                console.log(Number.parseInt(change_effect_date.substr(5, 2)));
                return Number.parseInt(change_effect_date.substr(5, 2))
            } else {
                return 0;
            }
        }
    },
    methods: {
        search() {
            this.$refs["ref_filterform"].validate(valid => {
                if (valid) {
                    EmpowermentChange.getEmpowermentChangeMaster(this.filterData).then(
                        response => {
                            var can_start_workflow = response.can_start_workflow;
                            //console.log(response)
                            if (can_start_workflow || (!can_start_workflow && this.$route.params.Action !== "Create")) {

                                this.EmpowermentChangeData.vendor_id = response.vendor_id;
                                this.EmpowermentChangeData.guid = response.guid;
                                this.EmpowermentChangeData.basic_info = response.basic_info;
                                this.EmpowermentChangeData.basic_info.bu_code = this.user.bu;
                                var bu_name = this.BU.find(item => item.bu_code === this.user.bu).bu_name;
                                this.EmpowermentChangeData.basic_info.bu_name = bu_name;

                                this.EmpowermentChangeData.basic_info.change_effect_date = this.filterData.effect_date;

                                this.EmpowermentChangeData.basic_info.vendor_type = this.filterData.vendor_type;

                                if (this.EmpowermentChangeData.basic_info.vendor_type != null) {
                                    this.EmpowermentChangeData.basic_info.vendor_type_name = this.vendor_type_list.find(
                                        item => item.code === this.filterData.vendor_type
                                    ).name;
                                }

                                this.EmpowermentChangeData.empowerment_info.empowerment_target = response.empowerment_info.empowerment_target;
                                this.EmpowermentChangeData.empowerment_info.change_empowerment_target = JSON.parse(JSON.stringify(response.empowerment_info.empowerment_target));

                                this.EmpowermentChangeData.empowerment_info.empowerment_product.product_line = response.empowerment_info.empowerment_product.product_line;
                                this.EmpowermentChangeData.empowerment_info.empowerment_product.empowerment_area_info.empowerment_areas = response.empowerment_info.empowerment_product.empowerment_area_info.empowerment_areas;

                                this.EmpowermentChangeData.empowerment_info.empowerment_info_id = response.empowerment_info.empowerment_info_id

                                this.EmpowermentChangeData.empowerment_info.empowerment_product.empowerment_product_id = response.empowerment_info.empowerment_product.empowerment_product_id

                                this.EmpowermentChangeData.empowerment_info.empowerment_product.empowerment_area_info.empowerment_area_id = response.empowerment_info.empowerment_product.empowerment_area_info.empowerment_area_id



                                this.setBasicinfo();
                            } else {
                                this.$Message.error(notRunMessage);
                            }
                        }
                    );
                }
            });
        },
        getSnapshot: function() {
            EmpowermentChange.getSnapshot(this.$route.query.snapshot_id).then(response => {
                this.EmpowermentChangeData = response;
                this.setBasicinfo();
                if (this.is_channel_operate_master_agreement_signed) {
                    this.EmpowermentChangeData.empowerment_info.empowerment_seal_file.uploader = this.user.username;
                }
                if (this.is_channel_operate_upload) {
                    this.EmpowermentChangeData.empowerment_info.empowerment_file.uploader = this.user.username;
                }
            })
        },
        modify_hospital(row, index) {
            this.HospitalsModal = true;
            if (row.is_selected === true) {
                this.checkType = "正选";
            } else {
                this.checkType = "反选";
            }
            console.log(row);
        },
        setBasicinfo() {
            var basic_info = this.EmpowermentChangeData.basic_info
            this.basicData = [];



            this.basicData.push({
                firstColumnName: "经销商名称:",
                firstColumnValue: basic_info.company_name,
                secondColumnName: "BU:",
                secondColumnValue: basic_info.bu_name
            }, {
                firstColumnName: "经销商类型:",
                firstColumnValue: basic_info.vendor_type_name,
                secondColumnName: "",
                secondColumnValue: ""
            }, {
                firstColumnName: "主协议生效日期:",
                firstColumnValue: basic_info.protocol_effect_data,
                secondColumnName: "主协议失效日期:",
                secondColumnValue: basic_info.protocol_expire_data
            }, {
                firstColumnName: "医疗器械经营许可证-生效日期:",
                firstColumnValue: basic_info.medical_business_license_effective_date,
                secondColumnName: "医疗器械经营许可证-失效日期:",
                secondColumnValue: basic_info.medical_business_license_expire_date
            }, {
                firstColumnName: "医疗器械经营许可证-经营范围:",
                firstColumnValue: basic_info.medical_business_license_business_scope,
                secondColumnName: "",
                secondColumnValue: ""
            }, {
                firstColumnName: "SAP ID:",
                firstColumnValue: basic_info.sap_id,
                secondColumnName: "状态:",
                secondColumnValue: basic_info.status
            });
        },
    }
};
</script>
<style scoped>
.ivu-alert {
    font-size: 13px;
    font-weight: 700;
}

.top {
    padding: 10px;
    background: rgba(0, 153, 229, 0.7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}

.ivu-input-number {
    width: 180px;
}

.ivu-card {
    margin: 0px 0px 10px 0px;
}

.targetTotal {
    margin-left: 20px;
    font-size: 15px;
    font-weight: 700;
    color: #4060ad;
}

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

p {
    font-weight: 700;
    color: rgba(25, 74, 158, 1);
    font-size: 13px;
}

.dms-pass {
    margin-left: 60px;
    padding-top: 45px;
}

.dms-process {
    margin-left: 60px;
    padding-top: 45px;
}

.ivu-layout-content {
    margin-top: 26px;
    background: rgba(242, 242, 242, 1);
}

.flow_menu:hover {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-color: #eee;
}
</style>