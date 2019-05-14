import UIService from "../../api/ui-service";
export default {
    data() {
        return {
            status: null,
            company: {
                agent_intention_list: [
                    {
                        distribution_type: null,
                        upper_distribution: null,
                        distribution_mode: null,
                        contact_name: null,
                        contact_phone: null,
                        agent_intention_areas: [],
                        agent_effective_date: null,
                        agent_expire_date: null,
                        product_line_level: null,
                        is_existing_distribution: true,
                        apply_years: null,
                        first_purchase_qty: null,
                        channel_volume_forecast: null,
                        sales_target_first_year: null,
                        remark: null
                    }
                ],
                basic_info: {
                    company_name_cn: null,
                    company_name_en: null,
                    company_province: null,
                    company_city: null,
                    registered_address_cn: null,
                    registered_address_en: null,
                    registered_capital: null,
                    fax: null,
                    legal_representative: null,
                    business_contact: null
                },
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
                    }
                ],
                additional_warehouses: [
                    {
                        additional_warehouses_bu: [],
                        receiving_party: null,
                        receiving_address: null,
                        is_current_warehouses: false,
                        warehouse_license_attachment: null,
                        warehouse_medical_license_attachment: null,
                        warehouse_medical_license2_attachment: null,
                        warehouse_declare_attachment: null
                    }
                ],
                similar_business: {
                    distribution_mode_list: [],
                    core_hospital: null,
                    lower_distribution_number: null,
                    direct_selling_ratio: null,
                    distribution_ratio: null
                },
                ef_investigations: [
                    {
                        is_confirm: true,
                        ef_attachment: null
                    }
                ],
                business_licenses: [
                    {
                        license_no: null,
                        license_certification_body: null,
                        license_effective_date: null,
                        license_expire_date: null,
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
                        medical_business_license_business_scope: [],
                        medical_warehouses: [
                            {
                                warehouse_address: null,
                                warehouse_area: null
                            },
                            {
                                warehouse_address: null,
                                warehouse_area: null
                            }
                        ],
                        medical_business_license_attachment: null
                    }
                ],
                medical_business_license_seconds: [
                    {
                        medical_business_license2_no: null,
                        medical_business_license2_certification_body: null,
                        medical_business_license2_record_date: null,
                        medical_business_license2_business_scope: [],
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
                        license_certification_body: null,
                        license_effective_date: null,
                        license_expire_date: null,
                        remark: null,
                        other_license_attachment: null
                    }
                ],
                dd_information_list: [
                    {
                        dd_effective_date: null,
                        dd_expire_date: null,
                        capture_attachment: null,
                        reply_attachment: null
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
                ]
            }
        }
    },
    methods: {
        add_agent_intention_list() {
            this.company.agent_intention_list.push({
                distribution_type: null,
                upper_distribution: null,
                distribution_mode: null,
                contact_name: null,
                contact_phone: null,
                agent_effective_date: null,
                agent_expire_date: null,
                product_line_level: null,
                is_existing_distribution: false,
                apply_years: null,
                first_purchase_qty: null,
                channel_volume_forecast: null,
                sales_target_first_year: null,
                remark: null
            });
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
                receiving_address: null,
                is_current_warehouses: false,
                warehouse_license_attachment: null,
                warehouse_medical_license_attachment: null,
                warehouse_medical_license2_attachment: null,
                warehouse_declare_attachment: null
            });
        },
        delete_agent_intention_list(index) {
            this.company.agent_intention_list.splice(index, 1);
        },
        delete_contacts(index) {
            this.company.contacts.splice(index, 1);
        },
        delete_additional_warehouses(index) {
            this.company.additional_warehouses.splice(index, 1);
        },
        validateData() {
            let reslut = false;
            let name = "agent_intention_list";
            this.$refs[name].forEach(item => {
                item.validate(valid => {
                    reslut = valid;
                });
            });
            return reslut;
        },
        t_deleteRecord_warehouses(index) {
            this.company.additional_warehouses.splice(index, 1);
        },
        setHospital(value, index) {
            this.company.agent_intention_list[index].agent_intention_areas= value;
        },
        clildUpload(index, type, value) {
            ///////////////////////////////////////////////////////联系人信息/////////////////////////////////////////////////
            if (type === "contract_attachment") {
                this.company.contacts[index].contract_attachment = value
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
            }
            else if (type === "medical_business_license_attachment") {
                this.company.medical_business_licenses[index].medical_business_license_attachment = value
            }
            else if (type === "medical_business_license2_attachment") {
                this.company.medical_business_license_seconds[index].medical_business_license2_attachment = value
            }
            else if (type === "other_license_attachment") {
                this.company.other_licenses[index].other_license_attachment = value
            }
            else if (type === "capture_attachment") {
                this.company.dd_information_list[index].capture_attachment = value
            }
            else if (type === "reply_attachment") {
                this.company.dd_information_list[index].reply_attachment = value
            }
            //console.log(this.company);
        },
        setStep(value) {
            //console.log(value);
            this.step = value;
            //console.log(this.company);
            //this.p_setStep(value);
            /*             document.body.scrollTop = 0;
                        document.documentElement.scrollTop = 0; */
        },
    }
}