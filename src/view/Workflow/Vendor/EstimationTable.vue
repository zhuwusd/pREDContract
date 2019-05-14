<template>
<Card>
    <Form ref="ref_from1" :rules="ruleValidate" :model="estimationData">
        <Row style="margin-bottom: 30px">
            <Col span="12">
            <span class="contentTitle">经销商评估表</span>
            </Col>
        </Row>

        <Row style="margin-bottom: 10px">

            <Col span="23">
            <span class="estimation_title">一.捷迈合作伙伴与捷迈目前的关系</span>
            </Col>

        </Row>

        <Row style="margin-left: 60px">
            <Col span="24">
            <span class="ivu-form-item-label">1.捷迈之前是否使用过该捷迈合作伙伴?如果是,请填写以下表格</span>
            </Col>
        </Row>
        <Row style="margin-bottom: 10px;margin-left: 60px">
            <Col span="24">
            <RadioGroup v-model="estimationData.isUsedZimmer">
                <Radio :disabled="!channel_manager_fill_form" label="true">是</Radio>
                <Radio :disabled="!channel_manager_fill_form" label="false">否</Radio>
            </RadioGroup>
            </Col>
        </Row>
        <Row v-if="estimationData.isUsedZimmer==='true'">
            <Col span="24">
            <Row style="margin-left: 60px">
                <Col offset="22" span="2">
                <Button v-show="channel_manager_fill_form" type="info" @click="isUsedZimmerModel=true">添加记录</Button>
                </Col>
            </Row>
            <br/>
            <Row style="margin-left: 60px">
                <Table border :columns="table1_column" :data="estimationData.usedZimmerDetail" stripe></Table>
                <FormItem prop="usedZimmerDetail" :rules="estimationData.isUsedZimmer==='true'&&!is_renewcontrac&&channel_manager_fill_form?ruleValidate.recards:ruleValidate.novalidate">
                </FormItem>
            </Row>
            </Col>
        </Row>
        <!--   <div class="errormsg" v-show="estimationData.isUsedZimmer==='true'&&estimationData.usedZimmerDetail.length===0">必须添加至少一条数据</div> -->
        <br/>


        <Row style="margin-left: 60px">
            <Col span="24">
            <span class="ivu-form-item-label">2.捷迈是否使用过该捷迈合作伙伴的子公司,关联公司或相关公司?如果是,请填写以下表格</span>
            </Col>
        </Row>

        <Row style="margin-bottom: 10px;margin-left: 60px">
            <Col span="24">
            <RadioGroup v-model="estimationData.isUsedSonZimmer">
                <Radio :disabled="!channel_manager_fill_form" label="true">是</Radio>
                <Radio :disabled="!channel_manager_fill_form" label="false">否</Radio>
            </RadioGroup>
            </Col>
        </Row>
        <Row v-if="estimationData.isUsedSonZimmer==='true'">
            <Col span="24">
            <Row style="margin-left: 60px">
                <Col offset="22" span="2">
                <Button v-show="channel_manager_fill_form" type="info" @click="isUsedSonZimmerModel=true">添加记录</Button>
                </Col>
            </Row>
            <br/>
            <Row style="margin-left: 60px">
                <Table border :columns="table2_column" :data="estimationData.usedSonZimmerDetail" stripe></Table>
                <FormItem prop="usedSonZimmerDetail" :rules="estimationData.isUsedZimmer==='true'&&!is_renewcontrac&&channel_manager_fill_form?ruleValidate.recards:ruleValidate.novalidate">
                </FormItem>
            </Row>
            </Col>
        </Row>
        <br/>
        <Row style="margin-bottom: 10px">

            <Col span="23">
            <span class="estimation_title">二.捷迈合作伙伴信息</span>
            </Col>

        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="oneInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commontext:ruleValidate.novalidate" label="1.请描述合作伙伴在医疗器械分销/营销/或销售的相关经验,包括经销/销售/营销类似于捷迈产品的特定经验(如果合作伙伴为经销商、分销商、销售代理、销售代表或销售中介,则填写)">
                <Input v-model="estimationData.oneInfo" :disabled="!channel_manager_fill_form" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="twoInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commontext:ruleValidate.novalidate" label="2.捷迈合作伙伴与地域客户的关系如何,捷迈合作伙伴如何拓展市场份额?是否存在与捷迈产品相关的任何特定销售机会?请提供捷迈合作伙伴在区域内预估的市场份额">
                <Input v-model="estimationData.twoInfo" :disabled="!channel_manager_fill_form" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="threeInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commontext:ruleValidate.novalidate" label="3.请简要描述捷迈合作伙伴的具体资源(即,人员数量、办事地点数目、仓库面积等)">
                <Input v-model="estimationData.threeInfo" :disabled="!channel_manager_fill_form" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="fourInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commontext:ruleValidate.novalidate" label="4.您是否掌握了与捷迈合作伙伴财务稳定性和信贷记录相关的信息?如有,请注明">
                <Input v-model="estimationData.fourInfo" :disabled="!channel_manager_fill_form" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="fiveInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commontext:ruleValidate.novalidate" label="5.为何捷迈提议聘用该合作伙伴?如果该捷迈合作伙伴将成为一家平台经销商,请说明">
                <br/> (1)拟议经销区域现在经销商的数量
                <br/> (2)现在经销商是否将转为该合作伙伴的分销商?
                <Input v-model="estimationData.fiveInfo" :disabled="!channel_manager_fill_form" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="sixInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commontext:ruleValidate.novalidate" label="6.对于此次聘用/本地区域是否曾考虑任何其他捷迈合作伙伴,如有,为何拒绝?">
                <Input v-model="estimationData.sixInfo" :disabled="!channel_manager_fill_form" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="sevenInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commontext:ruleValidate.novalidate" label="7.您是否知晓聘用该捷迈合作伙伴会带来任何不利之处?如是,请在下方提供详细信息">
                <Input v-model="estimationData.sevenInfo" :disabled="!channel_manager_fill_form" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row style="margin-bottom: 10px">

            <Col span="23">
            <span class="estimation_title">三.合同信息</span>
            </Col>

        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="contractOneInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commontext:ruleValidate.novalidate" label="1.请说明捷迈合作伙伴拟议销售产品的地域、服务类型,如适用,请列出捷迈合作伙伴在拟议销售区域将分销的捷迈产品">
                <Input v-model="estimationData.contractOneInfo" :disabled="!channel_manager_fill_form" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
            </FormItem>
            </Col>
        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="contractTwoInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commonchange:ruleValidate.novalidate" label="2.聘用协议">
                <br>
                <RadioGroup v-model="estimationData.contractTwoInfo">
                    <Radio :disabled="!channel_manager_fill_form" label="Exclusive排他性">Exclusive排他性</Radio>
                    <Radio :disabled="!channel_manager_fill_form" label="Non-Exclusive">Non-Exclusive</Radio>
                </RadioGroup>
            </FormItem>
            </Col>
        </Row>
        <Row style="margin-left: 60px">
            <Col span="24">
            <FormItem prop="contractThreeInfo" :rules="!is_renewcontrac&&channel_manager_fill_form?ruleValidate.commontext:ruleValidate.novalidate" label="3.捷迈是否已有任何其他捷迈合作伙伴在地域中提供服务?请指明">
                <Input v-model="estimationData.contractThreeInfo" :disabled="!channel_manager_fill_form" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
            </FormItem>
            </Col>
        </Row>
    </Form>

    <Modal v-model="isUsedZimmerModel" width="700" :styles="{top: '230px'}">
        <p slot="header">
            <span>使用经历</span>
        </p>
        <div>
            <Form ref="ref_UsedZimmerDetail" :rules="ruleValidate_UsedZimmerDetail" :model="isUsedZimmerDetail" :label-width="95">
                <Row>
                    <Col span="12">
                    <FormItem label="合作时间(年)" prop="usedYear">
                        <Input v-model="isUsedZimmerDetail.usedYear"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="协议类型(如有)">
                        <Input v-model="isUsedZimmerDetail.usedAgreementType"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="协议生效日期" prop="usedStartTime">
                        <DatePicker @on-change="isUsedZimmerDetail.usedStartTime=$event" style="width:100%" format="yyyy-MM-dd" :editable="false" type="date" :value="isUsedZimmerDetail.usedStartTime"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="协议失效日期" prop="usedEndTime">
                        <DatePicker @on-change="isUsedZimmerDetail.usedEndTime=$event" style="width:100%" format="yyyy-MM-dd" :editable="false" type="date" :value="isUsedZimmerDetail.usedEndTime"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="addUsedZimmerDetail">确定</Button>
        </div>
    </Modal>

    <Modal v-model="isUsedSonZimmerModel" width="700" :styles="{top: '230px'}">
        <p slot="header">
            <span>使用经历</span>
        </p>
        <div>
            <Form ref="ref_UsedSonZimmerDetail" :rules="ruleValidate_UsedZimmerDetail" :model="isUsedSonZimmerDetail" :label-width="110">
                <Row>
                    <Col span="12">
                    <FormItem label="相关公司的名称" prop="sonRelation">
                        <Input v-model="isUsedSonZimmerDetail.sonRelation"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="合作时间(年)" prop="usedYear">
                        <Input v-model="isUsedSonZimmerDetail.usedYear"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="协议类型(如有)">
                        <Input v-model="isUsedSonZimmerDetail.usedAgreementType"></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="协议生效日期" prop="usedStartTime">
                        <DatePicker @on-change="isUsedSonZimmerDetail.usedStartTime=$event" style="width:100%" format="yyyy-MM-dd" :editable="false" type="date" :value="isUsedSonZimmerDetail.usedStartTime"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="协议失效日期" prop="usedEndTime">
                        <DatePicker @on-change="isUsedSonZimmerDetail.usedEndTime=$event" style="width:100%" format="yyyy-MM-dd" :editable="false" type="date" :value="isUsedSonZimmerDetail.usedEndTime"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </div>
        <div slot="footer">
            <Button type="primary" @click="addUsedSonZimmerDetail">确定</Button>
        </div>
    </Modal>

</Card>
</template>
<script>
import enums from "../../../api/services/common/enums.js";
export default {
    data() {
        return {
            isUsedZimmerModel: false,
            isUsedSonZimmerModel: false,
            is_cash_transaction: "",

            isUsedZimmerDetail: {
                usedYear: null,
                usedAgreementType: null,
                usedStartTime: null,
                usedEndTime: null
            },
            isUsedSonZimmerDetail: {
                sonRelation: null,
                usedYear: null,
                usedAgreementType: "",
                usedStartTime: "",
                usedEndTime: ""
            },
            ruleValidate: {
                commontext: [{
                    required: true,
                    message: "必填项,请填写内容"
                }],
                commonchange: [{
                    required: true,
                    message: "必填项,请选择选项"
                }],
                recards: [{
                    required: true,
                    type: "array",
                    min: 1,
                    message: "请至少添加一条记录",
                    trigger: "change"
                }],
                novalidate: [{
                    required: false,
                    message: ""
                }]
            },
            estimationData: {
                isUsedZimmer: "false",
                usedZimmerDetail: [],
                isUsedSonZimmer: "false",
                usedSonZimmerDetail: [],
                oneInfo: "",
                twoInfo: "",
                threeInfo: "",
                fourInfo: "",
                fiveInfo: "",
                sixInfo: "",
                sevenInfo: "",
                contractOneInfo: "",
                contractTwoInfo: null,
                contractThreeInfo: ""
            },
            ruleValidate_UsedZimmerDetail: {
                sonRelation: [{
                    required: true,
                    message: "请填写子公司,关联公司或相关公司的名称"
                }],
                usedYear: [{
                    required: true,
                    message: "请填写合作时间"
                }],
                usedStartTime: [{
                    required: true,
                    message: "请填写协议生效日期"
                }],
                usedEndTime: [{
                    required: true,
                    message: "请填写协议失效日期"
                }]
            },
            table1_column: [{
                    title: "合作时间(年)",
                    key: "usedYear"
                },
                {
                    title: "协议类型",
                    key: "usedAgreementType"
                },
                {
                    title: "协议生效日期",
                    key: "usedStartTime"
                },
                {
                    title: "协议失效日期",
                    key: "usedEndTime"
                },
                {
                    title: "操作",
                    key: "URL",
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button", {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.estimationData.usedZimmerDetail.splice(
                                                params.index,
                                                1
                                            );
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ],
            table2_column: [{
                    title: "子公司,关联公司或相关公司的名称",
                    width: 270,
                    key: "sonRelation"
                },
                {
                    title: "合作时间(年)",
                    key: "usedYear"
                },
                {
                    title: "协议类型(如有)",
                    key: "usedAgreementType"
                },
                {
                    title: "协议生效日期",
                    key: "usedStartTime"
                },
                {
                    title: "协议失效日期",
                    key: "usedEndTime"
                },
                {
                    title: "操作",
                    key: "URL",
                    width: 120,
                    align: "center",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button", {
                                    props: {
                                        type: "text",
                                        size: "small"
                                    },
                                    on: {
                                        click: () => {
                                            this.estimationData.usedSonZimmerDetail.splice(
                                                params.index,
                                                1
                                            );
                                        }
                                    }
                                },
                                "删除"
                            )
                        ]);
                    }
                }
            ]
        }
    },
    props: ["assessment_info","is_renewcontrac"],
    watch: {
        estimationData: {　　　　
            handler(newValue, oldValue) {　　　　　　
                this.$emit("setAssessmentInfo", newValue);
            },
            deep: true　　
        },
        assessment_info: function() {
            if (this.assessment_info) {
                this.estimationData = this.assessment_info;
            }
        }
    },
    computed: {
        channel_manager_fill_form: function() {
            return (
                this.$route.query.flow_task_name ===
                enums.VendorProcess.ApproveNode.channel_manager_fill_form
            );
        }
    },
    methods: {
        addUsedZimmerDetail() {
            this.$refs["ref_UsedZimmerDetail"].validate((valid) => {
                if (valid) {
                    this.estimationData.usedZimmerDetail.push(JSON.parse(JSON.stringify(this.isUsedZimmerDetail)));
                    this.isUsedZimmerModel = false;
                    this.isUsedZimmerDetail.usedYear = null;
                    this.isUsedZimmerDetail.usedAgreementType = null;
                    this.isUsedZimmerDetail.usedStartTime = null;
                    this.isUsedZimmerDetail.usedEndTime = null;
                    this.$refs["ref_from1"].validateField('usedZimmerDetail')
                }
            });
        },
        addUsedSonZimmerDetail() {

            this.$refs["ref_UsedSonZimmerDetail"].validate((valid) => {
                if (valid) {
                    this.estimationData.usedSonZimmerDetail.push(JSON.parse(JSON.stringify(this.isUsedSonZimmerDetail)));

                    //console.log("123");

                    this.isUsedSonZimmerModel = false;
                    this.isUsedSonZimmerDetail.sonRelation = null;
                    this.isUsedSonZimmerDetail.usedYear = null;
                    this.isUsedSonZimmerDetail.usedAgreementType = null;
                    this.isUsedSonZimmerDetail.usedStartTime = null;
                    this.isUsedSonZimmerDetail.usedEndTime = null;
                    this.$refs["ref_from1"].validateField('usedSonZimmerDetail')
                }
            });
        },
        validatedata() {
            var result = false;
            this.$refs["ref_from1"].validate(valid => {
                result = valid
            });
            return result;
        }
    }
}
</script>
<style scoped>
.errormsg {
    font-size: 12px;
    color: #ed4014;
    padding-top: 6px;
    margin-left: 60px;
}
</style>

