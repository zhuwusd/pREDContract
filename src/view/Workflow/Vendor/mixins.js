import UIService from "../../../api/ui-service";
import DistributorMaster from "../../../api/services/Distributor/DistributorMaster.js";
import {
    mapGetters
} from "vuex";
import {
    validatePhoneTwo,
    validatePostal,
    validateCardCode,
    isInteger
} from "../../../javascript/validator";
import { missingDataMessage } from "../../../api/services/common/const.js";
import webfunction from "../../../api/services/webfunction";
import enums from "../../../api/services/common/enums.js";
export default {
    data() {
        const validateEmail = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请输入邮箱"));
            } else {
                this.validateEmail = false;
                DistributorMaster.checkEmail(
                    this.company.basic_info.company_email
                ).then(response => {
                    if (response !== "") {
                        callback(new Error(response));
                    } else {
                        callback();
                    }
                });
            }
        };
        const validateCompany_type1 = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请选择公司性质I"));
            } else {
                callback();
            }
        };
        const validateCompany_type2 = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请选择公司性质II"));
            } else {
                callback();
            }
        };
        const validateVendor_type = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请选择经销商类型"));
            } else {
                callback();
            }
        };
        const validateApply_type = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("请选择申请类型"));
            } else {
                callback();
            }
        };
        return {
            vendor_id: null,
            guid: "",
            isvalidated: false,//是否已经校验过必填项
            is_rpl_confirm: false,
            apply_info_list: [],//存储返回的apply_info_list的值
            is_newcompany: true,
            saveVendorResult: {},
            company: {
                basic_info: {
                    company_name_cn: null,
                    company_name_en: null,
                    company_province: null,
                    region: null,
                    bu: null,
                    company_city: null,
                    registered_address_cn: null,
                    registered_address_en: null,
                    registered_capital: null,
                    fax: null,
                    legal_representative: null,
                    selling_contract: null,
                    business_contact: null,
                    company_email: null,
                    company_type1: null,
                    company_type2: null
                },
                apply_info_list: [
                    {
                        vendor_type: null,
                        apply_type: null
                    }
                ],
                manager_info: {
                    shareholders: null,
                    director: null,
                    supervisor: null,
                    financial_beneficiary: null,
                    general_manager: null,
                    other_manager: null
                },
                contacts: [
                    {
                        contract_bu: [],
                        contract_agent: null,
                        is_contract_agent: true,
                        contract_delegate: null,
                        contract_recipient: null,
                        contract_recipient_phone: null,
                        contract_mail_address: null,
                        contract_mail_postcode: null,
                        business_contact: null,
                        business_contact_email: null,
                        contract_attachment: null
                    }],
                additional_warehouses: [
                    {
                        additional_warehouses_bu: [],
                        receiving_party: null,
                        receiving_address: null,
                        is_current_warehouses: false,
                        warehouse_license_attachment: null,
                        warehouse_medical_license_attachment: null,
                        warehouse_medical_license2_attachment: null,
                        warehouse_declare_attachment: null,
                        is_active: true
                    }
                ],
                invoice_info: [
                    {
                        invoice_address: null,
                        invoice_recipient: null,
                        credit_due_time: null,
                        card_number: null,
                        bank_address: null,
                        payment_type: null
                    }
                ],
                business_licenses: [
                    {
                        license_no: null,
                        license_certification_body: null,
                        license_effective_date: null,
                        license_expire_date: null,
                        is_active: true,
                        business_license_attachment: null
                    }
                ],
                medical_business_licenses: [
                    {
                        medical_business_license_id: null,
                        medical_business_license_no: null,
                        medical_business_license_certification_body: null,
                        medical_business_license_effective_date: null,
                        medical_business_license_expire_date: null,
                        is_active: true,
                        medical_business_license_business_scope: [],
                        medical_warehouses: [
                            {
                                warehouse_address: null,
                                warehouse_area: null
                            }],
                        medical_business_license_attachment: null
                    }
                ],
                medical_business_license_seconds: [
                    {
                        medical_business_license2_no: null,
                        medical_business_license2_certification_body: null,
                        medical_business_license2_record_date: null,
                        medical_business_license2_business_scope: [],
                        is_active: true,
                        medical_second_warehouses: [
                            {
                                warehouse_address: null,
                                warehouse_area: null
                            }
                        ],
                        medical_business_license2_attachment: null
                    }
                ],
                other_licenses: [
                    {
                        license_no: null,
                        is_active: true,
                        license_certification_body: null,
                        license_effective_date: null,
                        license_expire_date: null,
                        remark: null,
                        other_license_attachment: null
                    }
                ],
                provider_personnel_info: [
                    {
                        personnel_number: null,
                        personnel_list: null,
                        resume_attachment: null,
                        protocol_attachment: null,
                        train_attachment: null,
                        is_active: true
                    }
                ],
                dd_information_list: [
                    {
                        dd_code: null,
                        dd_effective_date: null,
                        dd_expire_date: null,
                        capture_attachment: null,
                        reply_attachment: null,
                        is_active: true
                    }
                ],
                application_certificate: [
                    {
                        third_party: null,
                        partner: null,
                        bid_details: null,
                        prepay: null,
                        is_cash_transaction: false,
                        cash_transaction_instruction: null,
                        similar_business: {
                            distribution_mode_list: [],
                            core_hospital: null,
                            lower_distribution_number: null,
                            direct_selling_ratio: null,
                            distribution_ratio: null
                        },
                        market_quota_first: null,
                        market_quota_second: null,
                        market_quota_third: null,
                        questionnaire_attachment: null,
                        dd_attachment: null,
                        rpl_attachment: null,
                        is_rpl_confirm: true
                    }
                ],
                approval_seal_files: [
                    {
                        remark: null,
                        approval_effective_date: null,
                        approval_expire_date: null,
                        protocol_type: null,
                        uploader: null,
                        upload_time: null,
                        approval_attachment: null
                    }
                ],
                approval_unseal_files: [
                    {
                        remark: null,
                        approval_effective_date: null,
                        approval_expire_date: null,
                        protocol_type: null,
                        uploader: null,
                        upload_time: null,
                        approval_attachment: null
                    }
                ],
                assessment_info: {},
                parent_company: {
                    company_name_cn: null
                },
            },
            ruleValidate: {
                company_name_cn: [{
                    required: true,
                    message: "请填写公司名称"
                }],
                company_name_en: [{
                    required: true,
                    message: "请填写公司英文名"
                }],
                apply_type: [{
                    required: true,
                    message: "请选择申请类型"
                },
                {
                    validator: validateApply_type,
                    trigger: "change"
                }
                ],
                vendor_type: [{
                    required: true,
                    message: "请选择经销商类型"
                },
                {
                    validator: validateVendor_type,
                    trigger: "change"
                }
                ],
                region: [{
                    required: true,
                    message: "请选择区域"
                }],
                approval_effect_date: [{
                    required: true,
                    message: "请填写申请协议生效时间"
                }],
                approval_expire_date: [{
                    required: true,
                    message: "请填写申请协议失效时间"
                }],
                company_province: [{
                    required: true,
                    message: "请选择省份",
                    trigger: "change"
                }],
                company_city: [{
                    required: true,
                    message: "请选择城市",
                    trigger: "change"
                }],
                registered_address_cn: [{
                    required: true,
                    message: "请填写公司注册地址"
                }],
                registered_address_en: [{
                    required: true,
                    message: "请填写注册地址英文"
                }],
                registered_capital: [{
                    required: true,
                    message: "请填写注册资本"
                }],
                fax: [{
                    required: true,
                    message: "请填写传真"
                }],
                legal_representative: [{
                    required: true,
                    message: "请填写法定代表人"
                }],
                selling_contract: [{
                    required: true,
                    message: "请填写捷迈渠道对口人"
                }],
                business_contact: [{
                    required: true,
                    message: "请填写捷迈销售对口人"
                }],
                company_type1: [{
                    required: true,
                    message: "请选择公司性质I"
                },
                {
                    validator: validateCompany_type1,
                    trigger: "change"
                }
                ],
                company_type2: [{
                    required: true,
                    message: "请选择公司性质II"
                },
                {
                    validator: validateCompany_type2,
                    trigger: "change"
                }
                ],
                company_email: [{
                    required: true,
                    message: "请填写公司邮箱"
                },
                {
                    type: "email",
                    message: "请输入有效的邮箱地址",
                    trigger: "blur"
                },
                {
                    validator: validateEmail,
                    trigger: "blur"
                }
                ],
                shareholders: [{
                    required: true,
                    message: "请填写股东"
                }],
                director: [{
                    required: true,
                    message: "请填写董事"
                }],
                supervisor: [{
                    required: true,
                    message: "请填写监事"
                }],
                financial_beneficiary: [{
                    required: true,
                    message: "请填写实际控制人"
                }],
                general_manager: [{
                    required: true,
                    message: "请填写总经理"
                }],
                other_manager: [{
                    required: true,
                    message: "请填写其他管理人员"
                }],
                contract_bu: [{
                    required: true,
                    type: "array",
                    min: 1,
                    message: "请至少选择一个BU",
                    trigger: "change"
                }],
                contract_agent: [{
                    required: true,
                    message: "请填写合同签约人"
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
                },
                {
                    validator: validatePhoneTwo,
                    trigger: "blur"
                }
                ],
                contract_mail_address: [{
                    required: true,
                    message: "请填写合同邮寄地址"
                }],
                contract_mail_postcode: [{
                    required: true,
                    message: "请填写合同邮寄编码"
                },
                {
                    validator: validatePostal,
                    trigger: "blur"
                }
                ],
                business_contact: [{
                    required: true,
                    message: "请填写业务联系人"
                }],
                business_contact_email: [{
                    required: true,
                    message: "请填写业务联系邮箱"
                },
                {
                    type: "email",
                    message: "请输入有效的邮箱地址",
                    trigger: "blur"
                }
                ],
                additional_warehouses_bu: [{
                    required: true,
                    type: "array",
                    min: 1,
                    message: "请至少选择一个BU",
                    trigger: "change"
                }],
                receiving_party: [{
                    required: true,
                    message: "请填写收货方"
                }],
                receiving_address: [{
                    required: true,
                    message: "请填写收货地址"
                }],

                invoice_address: [{
                    required: true,
                    message: "请填写发票接收地址"
                }],
                invoice_recipient: [{
                    required: true,
                    message: "请填写发票接收人"
                }],
                credit_due_time: [{
                    required: true,
                    message: "请填写信用期限"
                }],
                bank_address: [{
                    required: true,
                    message: "请填写开户行"
                }],
                card_number: [{
                    required: true,
                    message: "请填写银行账号"
                },
                {
                    validator: validateCardCode,
                    trigger: "blur"
                }
                ],
                payment_type: [{
                    required: true,
                    message: "请选择付款方式"
                }],

                license_no: [{
                    required: true,
                    message: "请填写统一社会信用代码"
                }],
                other_license_no: [{
                    required: true,
                    message: "请填写其他证件编号"
                }],
                license_certification_body: [{
                    required: true,
                    message: "请填写发证机构"
                }],
                license_effective_date: [{
                    required: true,
                    message: "请填写生效日期"
                }],
                license_expire_date: [{
                    required: true,
                    message: "请填写失效日期"
                }],

                medical_business_license_no: [{
                    required: true,
                    message: "请填写编号"
                }],
                medical_business_license_certification_body: [{
                    required: true,
                    message: "请填写发证机构"
                }],
                medical_business_license_effective_date: [{
                    required: true,
                    message: "请填写生效日期"
                }],
                medical_business_license_expire_date: [{
                    required: true,
                    message: "请填写失效日期"
                }],
                warehouse_address: [{
                    required: true,
                    message: "请填写仓库地址"
                }],
                warehouse_area: [{
                    required: true,
                    message: "请填写仓库面积"
                }],
                medical_business_license_business_scope: [{
                    required: true,
                    type: "array",
                    min: 1,
                    message: "请至少选择一个经营范围",
                    trigger: "change"
                }],

                medical_business_license2_no: [{
                    required: true,
                    message: "请填写编号"
                }],
                medical_business_license2_certification_body: [{
                    required: true,
                    message: "请填写发证机构"
                }],
                medical_business_license2_record_date: [{
                    required: true,
                    message: "请填写备案日期"
                }],
                warehouse2_address: [{
                    required: true,
                    message: "请填写仓库地址"
                }],
                warehouse2_area: [{
                    required: true,
                    message: "请填写仓库面积"
                }],
                medical_business_license2_business_scope: [{
                    required: true,
                    type: "array",
                    min: 1,
                    message: "请至少选择一个经营范围",
                    trigger: "change"
                }],
                remark: [{
                    required: true,
                    message: "请填写备注"
                }],
                personnel_number: [{
                    required: true,
                    message: "请填写人员数量"
                }],
                personnel_list: [{
                    required: true,
                    message: "请填写人员名单"
                }],
                dd_code: [{
                    required: true,
                    message: "请填写DD编号"
                }],
                dd_effective_date: [{
                    required: true,
                    message: "请填写DD生效日期"
                }],
                dd_expire_date: [{
                    required: true,
                    message: "请填写DD失效日期"
                }],
                commontext: [{
                    required: true,
                    message: "必填项,请填写内容"
                }],
                commonchange: [{
                    required: true,
                    message: "必填项,请选择选项"
                }],
                attachment: [{
                    required: true,
                    message: "请上传附件"
                }],
                novalidate: [{
                    required: false,
                    message: ""
                }],
            }
        }
    },
    computed: {
        ...mapGetters([
            "vendor_type_list",
            "templatePath"
        ])
    },
    methods: {
        setAssessmentInfo: function (value) {
            this.company.assessment_info = value;
            //console.log(this.company.assessment_info);
        },
        active_additional_warehouses(key) {
            this.company.additional_warehouses[key].is_active = false;
        },
        active_business_licenses(key) {
            this.company.business_licenses[key].is_active = false;
            this.company.business_licenses.push({
                license_no: null,
                license_certification_body: null,
                license_effective_date: null,
                license_expire_date: null,
                is_active: true,
                business_license_attachment: null
            })
        },
        active_medical_business_licenses(key) {
            this.company.medical_business_licenses[key].is_active = false;
            this.company.medical_business_licenses.push({
                medical_business_license_id: null,
                medical_business_license_no: null,
                medical_business_license_certification_body: null,
                medical_business_license_effective_date: null,
                medical_business_license_expire_date: null,
                is_active: true,
                medical_business_license_business_scope: [],
                medical_warehouses: [
                    {
                        warehouse_address: null,
                        warehouse_area: null
                    }],
                medical_business_license_attachment: null
            })
        },
        active_other_licenses(key) {
            this.company.other_licenses[key].is_active = false;
            this.company.other_licenses.push({
                license_no: null,
                is_active: true,
                license_certification_body: null,
                license_effective_date: null,
                license_expire_date: null,
                remark: null,
                other_license_attachment: null
            })
        },
        active_medical_business_license_seconds(key) {
            this.company.medical_business_license_seconds[key].is_active = false;
            this.company.medical_business_license_seconds.push({
                medical_business_license2_no: null,
                medical_business_license2_certification_body: null,
                medical_business_license2_record_date: null,
                medical_business_license2_business_scope: [],
                is_active: true,
                medical_second_warehouses: [
                    {
                        warehouse_address: null,
                        warehouse_area: null
                    }
                ],
                medical_business_license2_attachment: null
            })
        },
        active_dd_information_list(key) {
            this.company.dd_information_list[key].is_active = false;
            this.company.dd_information_list.push({
                dd_code: null,
                dd_effective_date: null,
                dd_expire_date: null,
                capture_attachment: null,
                reply_attachment: null,
                is_active: true
            })
        },
        active_provider_personnel_info(key) {
            this.company.provider_personnel_info[key].is_active = false;
            this.company.provider_personnel_info.push({
                personnel_number: null,
                personnel_list: null,
                resume_attachment: null,
                protocol_attachment: null,
                train_attachment: null,
                is_active: true
            })
        },
        changApply_type() {

            if (this.company.apply_info_list[0].apply_type === enums.Status.apply_type_renewcontract_status && !this.is_newcompany) {
                var index = this.apply_info_list.findIndex(item => item.vendor_type === this.company.apply_info_list[0].vendor_type)
                // console.log(index);
                if (index < 0) {
                    var t_vendor_type = this.vendor_type_list.find(item => item.code === this.company.apply_info_list[0].vendor_type)
                    if (t_vendor_type) {
                        this.$Notice.warning({
                            title: `${t_vendor_type.name}`,
                            desc: '此公司尚未以此模式合作，请选择“新建”进行申请'
                        });
                    }
                }
            }
        },
        changVendor_type() {
            // console.log(this.company.apply_info_list[0].vendor_type);
            //console.log(this.apply_info_list);
            ///根据经销商类型联动审批文件中的协议类型
            var mappingItem = enums.Mapping.find(item => item.vendor_type_code === this.company.apply_info_list[0].vendor_type);
            // console.log(mappingItem);
            this.company.approval_unseal_files[0].protocol_type = mappingItem.protocol_type_code;
            this.company.approval_seal_files[0].protocol_type = mappingItem.protocol_type_code;
            /////////////////////////////////////////////
            if (this.company.apply_info_list[0].apply_type === enums.Status.apply_type_renewcontract_status && !this.is_newcompany) {
                var index = this.apply_info_list.findIndex(item => item.vendor_type === this.company.apply_info_list[0].vendor_type)
                // console.log(index);
                if (index < 0) {
                    var t_vendor_type = this.vendor_type_list.find(item => item.code === this.company.apply_info_list[0].vendor_type)
                    this.$Notice.warning({
                        title: `${t_vendor_type.name}`,
                        desc: '此公司尚未以此模式合作，请选择“新建”进行申请'
                    });
                }
            }
            if (this.isClickSubmit) {

            }
        },
        add_contact() {
            this.company.contacts.push({
                contract_bu: [],
                contract_agent: null,
                is_contract_agent: false,
                contract_delegate: null,
                contract_attachment: null,
                contract_recipient: null,
                contract_recipient_phone: null,
                contract_mail_address: null,
                contract_mail_postcode: null,
                business_contact: null,
                business_contact_email: null
            });
        },
        add_additional_warehouses() {
            this.company.additional_warehouses.push({
                additional_warehouses_bu: [],
                receiving_party: null,
                is_active: true,
                receiving_address: null,
                is_current_warehouses: false,
                warehouse_license_attachment: null,
                warehouse_medical_license_attachment: null,
                warehouse_medical_license2_attachment: null,
                warehouse_declare_attachment: null
            });
        },
        add_medical_second_warehouses(index) {
            this.company.medical_business_license_seconds[index].medical_second_warehouses.push({
                warehouse_address: null,
                warehouse_area: null
            });
        },
        add_medical_warehouses(index) {
            this.company.medical_business_licenses[index].medical_warehouses.push({
                warehouse_address: null,
                warehouse_area: null
            });
        },
        delete_agent_intention_list(index) {
            this.company.agent_intention_list.splice(index, 1);
        },
        delete_contacts(index) {
            this.company.contacts.splice(index, 1);
        },
        delete_additional_warehouses(key) {
            this.company.additional_warehouses.splice(key, 1);
        },
        delete_medical_second_warehouses(key, cindex) {
            this.company.medical_business_license_seconds[key].medical_second_warehouses.splice(cindex, 1);
            //this.company.medical_business_license_seconds[0].medical_second_warehouses.splice(index, 1);
        },
        delete_medical_warehouses(key, cindex) {
            this.company.medical_business_licenses[key].medical_warehouses.splice(cindex, 1);
        },
        t_deleteRecord_warehouses(index) {
            this.company.additional_warehouses.splice(index, 1);
        },
        /*         uploadProgress() {
                    //UIService.processing(this.$Spin, true, "正在上传数据...");
                },
                removefile(file) {
                    console.log(file);
                },
                downloadAttachment(file) {
                    window.open(`${process.env.BASE_API_URL}${file.path}`, '_blank');
                },
                convertArray(value) {
                    var arr = [];
                    //console.log(JSON.stringify(value))
                    if (value !== null && JSON.stringify(value) !== '[]') {
                        arr.push(value);
                        delete arr[0].status;
                        delete arr[0].percentage;
                        delete arr[0].uid;
                    }
        
                    return arr;
                },
                setAttachmentData(Target, AttachmentData) {
                    Target = {
                        id: AttachmentData.id,
                        remark: AttachmentData.remark,
                        name: AttachmentData.name,
                        extension: AttachmentData.extension,
                        path: `${process.env.BASE_API_URL}AttachmentData.path`
                    };
                }, */
        clildUpload(index, type, value) {
            ///////////////////////////////////////////////////////联系人信息/////////////////////////////////////////////////
            if (type === "contract_attachment") {
                this.company.contacts[index].contract_attachment = value
                this.$refs["ref_from1"].validateField('contacts.' + index + '.contract_attachment')
            }
            ///////////////////////////////////////////////////////第三方收货地址/////////////////////////////////////////////////
            else if (type === "warehouse_license_attachment") {
                this.company.additional_warehouses[index].warehouse_license_attachment = value
            }
            else if (type === "warehouse_medical_license2_attachment") {
                this.company.additional_warehouses[index].warehouse_medical_license2_attachment = value
            }
            else if (type === "warehouse_medical_license_attachment") {
                this.company.additional_warehouses[index].warehouse_medical_license_attachment = value
            }
            else if (type === "warehouse_declare_attachment") {
                this.company.additional_warehouses[index].warehouse_declare_attachment = value
            }
            ///////////////////////////////////////////////////////候选经销商问卷调查表/////////////////////////////////////////////////
            /*             else if (this.AttachmentType === "warehouse_declare_attachment") {
                            this.setAttachmentData(this.company.additional_warehouses[this.AttachmentKey].warehouse_declare_attachment,AttachmentData);
                        } */
            ///////////////////////////////////////////////////////EF经销商调查表/////////////////////////////////////////////////
            else if (type === "ef_attachment") {
                this.company.ef_investigations[index].ef_attachment = value
            }
            else if (type === "business_license_attachment") {
                this.company.business_licenses[index].business_license_attachment = value
                this.$refs["ref_from2"].validateField('business_licenses.' + index + '.business_license_attachment')
            }
            else if (type === "medical_business_license_attachment") {
                this.company.medical_business_licenses[index].medical_business_license_attachment = value
                this.$refs["ref_from2"].validateField('medical_business_licenses.' + index + '.medical_business_license_attachment')
            }
            else if (type === "medical_business_license2_attachment") {
                this.company.medical_business_license_seconds[index].medical_business_license2_attachment = value
                this.$refs["ref_from2"].validateField('medical_business_license_seconds.' + index + '.medical_business_license2_attachment')
            }
            else if (type === "other_license_attachment") {
                this.company.other_licenses[index].other_license_attachment = value
            }
            else if (type === "capture_attachment") {
                this.company.dd_information_list[index].capture_attachment = value
                this.$refs["ref_from2"].validateField('dd_information_list.' + index + '.capture_attachment')
            }
            else if (type === "reply_attachment") {
                this.company.dd_information_list[index].reply_attachment = value
                this.$refs["ref_from2"].validateField('dd_information_list.' + index + '.reply_attachment')
            }
            ///////////////////////////////服务商服务人员信息////////////////////////////////
            else if (type === "resume_attachment") {
                this.company.provider_personnel_info[index].resume_attachment = value
                this.$refs["ref_from2"].validateField('provider_personnel_info.' + index + '.resume_attachment')
            }
            else if (type === "protocol_attachment") {
                this.company.provider_personnel_info[index].protocol_attachment = value
                this.$refs["ref_from2"].validateField('provider_personnel_info.' + index + '.protocol_attachment')
            }
            else if (type === "train_attachment") {
                this.company.provider_personnel_info[index].train_attachment = value
                this.$refs["ref_from2"].validateField('provider_personnel_info.' + index + '.train_attachment')
            }
            //////////////////////////////审批文件附件/////////////////////////
            else if (type === "approval_unseal_files_capture_attachment") {
                this.company.approval_unseal_files[index].approval_attachment = value
                this.$refs["ref_from5"].validateField('approval_unseal_files.' + index + '.approval_attachment')
            }
            else if (type === "approval_seal_files_capture_attachment") {
                this.company.approval_seal_files[index].approval_attachment = value
                this.$refs["ref_from6"].validateField('approval_seal_files.' + index + '.approval_attachment')
            }
            ////////////////////////////////////////////////////////////////////////////////
            else if (type === "questionnaire_attachment") {
                this.company.application_certificate[index].questionnaire_attachment = value
                this.$refs["ref_from3"].validateField('application_certificate.' + index + '.questionnaire_attachment')
            }
            else if (type === "dd_attachment") {
                this.company.application_certificate[index].dd_attachment = value
                this.$refs["ref_from3"].validateField('application_certificate.' + index + '.dd_attachment')
            }
            //console.log(this.company);
        },
        /*         setAttachmentType(value, key) {
                    this.AttachmentType = value;
                    this.AttachmentKey = key;
                }, */
        setStep(value) {
            this.step = value;
            this.p_setStep(value);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        },
        downTemplate(value) {
            var webUrl = window.location.href.replace(this.$route.fullPath, "");

            if (value === "questionnaire_attachment_1") {
                window.open(`${webUrl}${this.templatePath}${value}.xlsx`, '_blank');
            }
            else if (value === "questionnaire_attachment_2") {
                window.open(`${webUrl}${this.templatePath}${value}.xlsx`, '_blank');
            }
            else if (value === "dd_attachment") {
                window.open(`${webUrl}${this.templatePath}${value}.xlsx`, '_blank');
            }
        },
        gotoarray(value) {
            var a = [];
            a.push({
                name: value.name,
                url: value.path
            });
            //console.log(a);
            return a;
        },
        workflow_approve() {
            this.commentShow = true;
            this.actionname_description = "同意理由:";
            this.actionName = "approve";
            this.comments = "";
        },
        workflow_resubmit() {
            this.commentShow = true;
            this.actionname_description = "重新提交理由:";
            this.actionName = "restart";
            this.comments = "";
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
        },
        warning(nodesc) {
            this.$Notice.warning({
                title: "代理意向资料未填完整,请去完善信息",
                desc: nodesc
                    ? ""
                    : "Here is the notification description. Here is the notification description. "
            });
        },
        success(nodesc) {
            this.$Notice.success({
                title: "经销商资质发起成功",
                desc: nodesc
                    ? ""
                    : "Here is the notification description. Here is the notification description. "
            });
        },
        error(nodesc) {
            this.$Notice.error({
                title: "保存出错,请联系管理员",
                desc: nodesc
                    ? ""
                    : "Here is the notification description. Here is the notification description. "
            });
        },
        validateAll(type) {
            //console.log(this.company);
            //debugger;

            //var validateResult = false;
            this.isvalidated = true;
            this.$refs["ref_from1"].validate(valid => {
                if (!valid) {
                    this.validateResult = false;
                    this.$Message.error("公司信息未填写完整");
                    gotoStep('baseinfo')
                } else {
                    this.$refs["ref_from2"].validate(valid => {
                        if (!valid) {
                            this.validateResult = false;
                            this.$Message.error("公司证件未填写完整");
                            this.gotoStep('companycertificates')
                        } else {
                            this.validateResult = true;
                        }
                    });
                    if (!this.validateResult) return;
                    this.$refs["ref_from3"].validate(valid => {
                        if (!valid) {
                            this.validateResult = false;
                            this.$Message.error("申请依据未填写完整");
                            this.gotoStep('applyaccording')
                        } else {
                            this.validateResult = true;
                        }
                    });
                    if (!this.validateResult) return;
                    this.$refs["ref_from4"].validate(valid => {
                        if (!valid) {
                            this.validateResult = false;
                            this.$Message.error("经销商评估表未填写完整");
                            this.gotoStep('estimation')
                        } else {
                            this.validateResult = true;
                        }
                    });
                    this.validateResult = this.$refs.childen.validatedata();
                    if (!this.validateResult) {
                        this.$Message.error("经销商评估表未填写完整");
                        this.gotoStep('estimation')
                        return;
                    }

                    this.$refs["ref_from5"].validate(valid => {
                        if (!valid) {
                            this.validateResult = false;
                            this.$Message.error("审批文件未填写完整");
                            this.gotoStep('approvefile')
                        } else {
                            this.validateResult = true;
                        }
                    });
                    if (!this.validateResult) return;

                    this.$refs["ref_from6"].validate(valid => {
                        if (!valid) {
                            this.validateResult = false;
                            this.$Message.error("审批文件未填写完整");
                            this.gotoStep('approvefile')
                        } else {
                            this.validateResult = true;
                        }
                    });

                    if (!this.validateResult) return;
                    if (type === "submit") {
                        this.submit();
                    }
                    if (type === "approve") {
                        this.workflow_approve();
                    }
                }
            });
        },
        gotoStep(value) {
            this.step = value;
        }
    }
}