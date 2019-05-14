import { mapGetters } from "vuex";
import {
    validatePhoneTwo,
    validatePostal
} from "../../../javascript/validator";
export default {
    data() {
        const validate_distribution_mode = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请选择经销模式"));
            } else {
                callback();
            }
        };
        return {
            step: 'baseinfo',
            //is_share_master: null,
            vendor_id: null,
            guid: "",
            commentShow: false, //审批意见的弹出框显示隐藏
            comments: "",
            actionName: "",
            redirectActivityName: "",
            actionname_description: "",
            redirectActivity: [],

            //is_new_contact: true,
            //is_new_warehouses: true,
            actionname_description: "",
            isCreate: false, //判断是否为新建页面
            isView: false, //判断是否为查看页面
            isApprove: false, //判断是否为审批页面

            contacts: {},

            contract_bu: [],
            additional_warehouses_bu: [],
            company: {
                basic_info: {
                    company_name: null,
                    bu_code: null,
                    bu_name: null,
                    vendor_type: null,
                    vendor_type_name: null,
                    protocol_effect_data: null,
                    protocol_expire_data: null,
                    medical_business_license_effective_date: null,
                    medical_business_license_expire_date: null,
                    medical_business_license_business_scope: null,
                    medical_business_license2_record_date: null,
                    medical_business_license2_business_scope: null,
                    sap_id: null,
                    status: null
                },
                contacts: [{
                    contract_bu: [],
                    contract_agent: null,
                    is_contract_agent: false,
                    contract_delegate: null,
                    contract_recipient: null,
                    contract_recipient_phone: null,
                    contract_mail_address: null,
                    contract_mail_postcode: null,
                    business_contact: null,
                    business_contact_email: null,
                    is_current_contact: true,
                    contract_attachment: null
                }],
                additional_warehouses: [],
                empowerment_info: {
                    empowerment_product: {
                        distribution_type: null,
                        empowerment_bu: null,
                        selling_region: [],
                        product_line: [],
                        empowerment_effective_date: null,
                        empowerment_expire_date: null,
                        regional_manager: null,
                        district_manager: null,
                        sales_manager: null,
                        sponsor: null,
                        empowerment_area_info: {
                            distribution_mode: null,
                            empowerment_areas: [],
                            is_rebate: false,
                        }

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
                        target_jan: 0.00,
                        target_feb: 0.00,
                        target_mar: 0.00,
                        target_apr: 0.00,
                        target_may: 0.00,
                        target_june: 0.00,
                        target_july: 0.00,
                        target_aug: 0.00,
                        target_sep: 0.00,
                        target_oct: 0.00,
                        target_nov: 0.00,
                        target_dec: 0
                    }
                }
            },
            ruleValidate: {
                contract_agent: [{
                    required: true,
                    message: "请填写合同签约人"
                }],
                is_contract_agent: [{
                    required: true,
                    message: "请选择合同签约人是否法定代表人"
                }],
                contract_delegate: [{
                    required: true,
                    message: "请填写法人代表委托"
                }],
                contract_recipient: [{
                    required: true,
                    message: "请填写合同收件人"
                }],
                contract_recipient_phone: [{
                    required: true,
                    message: "请填写合同收件人电话"
                },{
                    validator: validatePhoneTwo,
                    trigger: "blur"
                }],
                contract_mail_address: [{
                    required: true,
                    message: "请填写合同邮寄地址"
                }],
                contract_mail_postcode: [{
                    required: true,
                    message: "请填写合同邮寄邮编"
                },{
                    validator: validatePostal,
                    trigger: "blur"
                }],
                business_contact: [{
                    required: true,
                    message: "请填写业务联系人"
                }],
                business_contact_email: [{
                    required: true,
                    message: "请填写业务联系邮箱"
                },{
                    type: "email",
                    message: "请输入有效的邮箱地址",
                    trigger: "blur"
                }],
                receiving_party: [{
                    required: true,
                    message: "请填写收货方"
                }],
                receiving_address: [{
                    required: true,
                    message: "请填写收货地址"
                }],
                selling_region: [{
                    required: true,
                    type: "array",
                    min: 1,
                    message: "请至少选择一个所属销售区域",
                    trigger: "change"
                }],
                empowerment_effective_date: [{
                    required: true,
                    message: "请填写授权开始日期"
                }],
                empowerment_expire_date: [{
                    required: true,
                    message: "请填写授权终止日期"
                }],
                regional_manager: [{
                    required: true,
                    message: "请填写大区经理"
                }],
                district_manager: [{
                    required: true,
                    message: "请填写地区经理"
                }],
                sales_manager: [{
                    required: true,
                    message: "请填写销售代表"
                }],
                sponsor: [{
                    required: true,
                    message: "请填写资质信息确认人"
                }],
                effect_date: [{
                    required: true,
                    message: "请填写生效日期"
                }],
                expire_date: [{
                    required: true,
                    message: "请填写失效日期"
                }],
                distribution_mode: [{
                    required: true,
                    message: "请选择经销模式"
                }, {
                    validator: validate_distribution_mode,
                    trigger: "change"
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
    computed: {
        ...mapGetters(["user"])
    },
    methods: {
        validateAll() {
            var result = false;
            this.$refs["ref_from1"].validate(valid => {
                result = valid;
                if(!result){
                    this.$Message.error("授权信息未填写完整");
                }
/*                 if (result) {
                    if (this.company.additional_warehouses.length === 0) {
                        this.$Message.error("请添加仓库信息");
                        result = false;
                    }
                    else {
                        result = true;
                    }
                } */
                if (result) {
                    if (this.company.empowerment_info.empowerment_product.product_line.length === 0) {
                        this.$Message.error("请添加产品线信息");
                        result = false;
                    }
                    else {
                        result = true;
                    }
                }
                if (result) {
                    if (this.company.empowerment_info.empowerment_product.empowerment_area_info.empowerment_areas.length === 0) {
                        this.$Message.error("请添加授权医院信息");
                        result = false;
                    }
                    else {
                        result = true;
                    }
                }
            });
            return result;
        },
        resetContract() {

            var bu_array = [];
            bu_array.push(this.user.bu);

            this.company.contacts[0].contract_id = null;
            this.company.contacts[0].contract_bu = bu_array;
            this.company.contacts[0].contract_agent = null;
            this.company.contacts[0].is_contract_agent = false;
            this.company.contacts[0].contract_delegate = null;
            this.company.contacts[0].contract_attachment = null;
            this.company.contacts[0].contract_recipient = null;
            this.company.contacts[0].contract_recipient_phone = null;
            this.company.contacts[0].contract_mail_address = null;
            this.company.contacts[0].contract_mail_postcode = null;
            this.company.contacts[0].business_contact = null;
            this.company.contacts[0].business_contact_email = null;

        },
        setProductLine(value) {
            console.log(value);
            this.company.empowerment_info.empowerment_product.product_line = value;
        },
        addNewWarehouses() {
            var bu_array = [];
            bu_array.push(this.user.bu);
            this.company.additional_warehouses.push({
                additional_warehouses_bu: bu_array,
                receiving_party: null,
                receiving_address: null,
                is_current_warehouses: true,
                warehouse_license_attachment: null,
                warehouse_medical_license_attachment: null,
                warehouse_medical_license2_attachment: null,
                warehouse_declare_attachment: null
            })
        },
        delete_warehouses(index) {
            this.company.additional_warehouses.splice(index, 1);
        },
        clildUpload(index, type, value) {
            ///////////////////////////////////////////////////////联系人信息/////////////////////////////////////////////////
            if (type === "contract_attachment") {
                this.company.contacts[index].contract_attachment = value
                this.$refs["ref_from1"].validateField('contacts.' + index + '.contract_attachment')
            }
            ///////////////////////////////////////////////////////仓库/////////////////////////////////////////////////
            if (type === "warehouse_license_attachment") {
                this.company.additional_warehouses[index].warehouse_license_attachment = value
                this.$refs["ref_from1"].validateField('additional_warehouses.' + index + '.warehouse_license_attachment')
            }
            if (type === "warehouse_medical_license_attachment") {
                this.company.additional_warehouses[index].warehouse_medical_license_attachment = value
                this.$refs["ref_from1"].validateField('additional_warehouses.' + index + '.warehouse_medical_license_attachment')
            }
            if (type === "warehouse_medical_license2_attachment") {
                this.company.additional_warehouses[index].warehouse_medical_license2_attachment = value
                this.$refs["ref_from1"].validateField('additional_warehouses.' + index + '.warehouse_medical_license2_attachment')
            }
            if (type === "warehouse_declare_attachment") {
                this.company.additional_warehouses[index].warehouse_declare_attachment = value
                this.$refs["ref_from1"].validateField('additional_warehouses.' + index + '.warehouse_declare_attachment')
            }
            ///////////////////////////////////////////////////////盖章/////////////////////////////////////////////////
            if (type === "empowerment_attachment") {
                this.company.empowerment_info.empowerment_file.empowerment_attachment = value
                this.$refs["ref_from1"].validateField('empowerment_info.empowerment_file.empowerment_attachment')
            }
            if (type === "empowerment_seal_attachment") {
                this.company.empowerment_info.empowerment_seal_file.empowerment_seal_attachment = value
                this.$refs["ref_from1"].validateField('empowerment_info.empowerment_seal_file.empowerment_seal_attachment')
            }
            if (type === "rebate_protocol_attachment") {
                this.company.empowerment_info.rebate_protocol_file.rebate_protocol_attachment = value
                this.$refs["ref_from1"].validateField('empowerment_info.rebate_protocol_file.rebate_protocol_attachment')
            }
            if (type === "rebate_protocol_seal_attachment") {
                this.company.empowerment_info.rebate_protocol_seal_file.rebate_protocol_seal_attachment = value
                this.$refs["ref_from1"].validateField('empowerment_info.rebate_protocol_seal_file.rebate_protocol_seal_attachment')
            }
        },
        workflow_approve() {
            if (this.validateAll()) {
            this.commentShow = true;
            this.actionname_description = "同意理由:";
            this.actionName = "approve";
            this.comments = "";
            }

        },
        workflow_resubmit() {
            if (this.validateAll()) {
            this.commentShow = true;
            this.actionname_description = "重新提交理由:";
            this.actionName = "restart";
            this.comments = "";
            }
        },
        workflow_return() {
            this.commentShow = true;
            this.actionname_description = "退回理由:";
            this.actionName = "redirect";
            this.comments = "";
        },
        workflow_refuse() {
            this.commentShow = true;
            this.actionname_description = "终止理由:";
            this.actionName = "refuse";
            this.comments = "";
        }
    }

}