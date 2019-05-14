import EmpowermentChange from "../../../api/services/EmpowermentChange/EmpowermentChange.js";
export default {
    data() {
        return {

            step: 'baseinfo',
            HospitalsModal: false,
            hospitalShow: false,
            productShow: false,
            checkType: "",
            areaname: "",
            basicData: [],
            basicInfo_Column: [{
                title: "firstColumnName",
                key: "firstColumnName",
                className: "columnField",
                width: 230
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
                width: 230
            },
            {
                title: "secondColumnValue",
                key: "secondColumnValue",
                align: "left"
            }
            ],
            filterData: {
                company_name: null,
                bu: null,
                vendor_type: null,
                effect_date: null
            },
            EmpowermentChangeData: {
                basic_info: {
                    company_name: null,
                    bu_code: null,
                    bu_name: null,
                    vendor_type: null,
                    vendor_type_name: null,
                    change_effect_date: null,
                    protocol_effect_data: null,
                    protocol_expire_data: null,
                    medical_business_license_effective_date: null,
                    medical_business_license_expire_date: null,
                    medical_business_license_business_scope: null,
                    medical_business_license2_record_date: null,
                    medical_business_license2_business_scope: null,
                    sap_id: null,
                    parent_company_name: null,
                    status: null
                },
                empowerment_info: {
                    empowerment_info_id: null,
                    empowerment_product: {
                        empowerment_area_info: {
                            empowerment_areas: [],
                            change_empowerment_areas: []
                        },
                        product_line: null,
                        change_product_line: null,
                    },
                    empowerment_file: {
                        bu: null,
                        effect_date: null,
                        expire_date: null,
                        uploader: null,
                        empowerment_attachment: null
                    },
                    empowerment_seal_file: {
                        bu: null,
                        effect_date: null,
                        expire_date: null,
                        uploader: null,
                        empowerment_seal_attachment: null
                    },
                    empowerment_target: {
                        is_share_master: false,
                        year: null,
                        target_jan: null,
                        target_feb: null,
                        target_mar: null,
                        target_apr: null,
                        target_may: null,
                        target_june: null,
                        target_july: null,
                        target_aug: null,
                        target_sep: null,
                        target_oct: null,
                        target_nov: null,
                        target_dec: null
                    },
                    change_empowerment_target: {
                        is_share_master: false,
                        year: null,
                        target_jan: null,
                        target_feb: null,
                        target_mar: null,
                        target_apr: null,
                        target_may: null,
                        target_june: null,
                        target_july: null,
                        target_aug: null,
                        target_sep: null,
                        target_oct: null,
                        target_nov: null,
                        target_dec: null
                    }
                }
            },
            filterRuleValidate: {
                company_name: [{
                    required: true,
                    message: "请输入经销商名称"
                }],
                vendor_type: [{
                    required: true,
                    message: "请选择经销商类型"
                }],
                effect_date: [{
                    required: true,
                    message: "请填写授权变更开始日期"
                }]
            },
            ruleValidate: {
                effect_date: [{
                    required: true,
                    message: "请填写生效日期"
                }],
                expire_date: [{
                    required: true,
                    message: "请填写失效日期"
                }],
                empowerment_target: [{
                    required: true,
                    message: "请填写指标值"
                }],
                attachment: [{
                    required: true,
                    message: "请上传附件"
                }]
            }
        }
    },
    methods: {
        validateAll() {
            var result = false;
            this.$refs["ref_from1"].validate(valid => {
                result = valid;
                if (!result) {
                    this.$Message.error("授权信息未填写完整");
                }
            });
            return result;
        },
        clildUpload(index, type, value) {
            if (type === "empowerment_attachment") {
                this.EmpowermentChangeData.empowerment_info.empowerment_file.empowerment_attachment = value
            }
            if (type === "empowerment_seal_attachment") {
                this.EmpowermentChangeData.empowerment_info.empowerment_seal_file.empowerment_seal_attachment = value
            }
        },
        setProductLine(value) {
            this.EmpowermentChangeData.empowerment_info.empowerment_product.change_product_line = value;
        },
        setHospital(value) {
            this.EmpowermentChangeData.empowerment_info.empowerment_product.empowerment_area_info.change_empowerment_areas = value;
        },
        startWorkflow() {
            //console.log(this.EmpowermentChangeData);
            if (!this.EmpowermentChangeData.vendor_id) {
                this.$Message.error("未经查询，不允许发起流程");
            }
            else {
                if (this.validateAll()) {
                    EmpowermentChange.start_Workflow({
                        data: this.EmpowermentChangeData
                    });
                }
            }
        },
        operateWorkflow(actionName, comments, redirectActivityName) {
            if (
                actionName === "approve" ||
                actionName === "restart" ||
                actionName === "refuse"
            ) {
                EmpowermentChange.approve_Workflow(
                    this.$route.query.process_id,
                    this.$route.query.task_id,
                    this.$route.query.flow_task_name,
                    comments,
                    actionName,
                    this.EmpowermentChangeData
                );
            } else {
                EmpowermentChange.redirect_Workflow(
                    this.$route.query.process_id,
                    this.$route.query.task_id,
                    redirectActivityName,
                    comments,
                    actionName,
                    this.EmpowermentChangeData
                );
            }
        }
    }
}