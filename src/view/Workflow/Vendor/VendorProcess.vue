<template>
<Layout>
    <Sider hide-trigger class="leftmenu">

        <div class="flow_filter">
            <div class="flow_menu" @click="gotoStep('baseinfo')">
                <div v-bind:class="step=='baseinfo'?'dms-pass':'dms-process'">
                    <div class="icon"></div>
                </div>
                <p>公司信息</p>
            </div>

            <div class="flow_menu" @click="gotoStep('companycertificates')">
                <div v-bind:class="step=='companycertificates'?'dms-pass':'dms-process'">
                    <div class="icon"></div>
                </div>
                <p>公司证件</p>
            </div>

            <div class="flow_menu" @click="gotoStep('applyaccording')" v-if="!is_renewcontrac">
                <div v-bind:class="step=='applyaccording'?'dms-pass':'dms-process'">
                    <div class="icon"></div>
                </div>
                <p>申请依据</p>
            </div>

            <div class="flow_menu" @click="gotoStep('estimation')" v-if="!is_renewcontrac">
                <div v-bind:class="step=='estimation'?'dms-pass':'dms-process'">
                    <div class="icon"></div>
                </div>
                <p>经销商评估表</p>
            </div>

            <div class="flow_menu" @click="gotoStep('approvefile')">
                <div v-bind:class="step=='approvefile'?'dms-pass':'dms-process'">
                    <div class="icon"></div>
                </div>
                <p>审批文件</p>
            </div>

            <div class="flow_menu" @click="gotoStep('approveoperation')" v-show="!isCreate||(isCreate&&isStart)">
                <div v-bind:class="step=='approveoperation'?'dms-pass':'dms-process'">
                    <div class="icon"></div>
                </div>
                <p>审批历史</p>
            </div>


        </div>

    </Sider>
    <Layout :style="{padding: '0px 24px 0px'}">
        <Content :style="{padding: '0px 24px 10px 0px', minHeight: '663px'}">

            <Form ref="ref_from1" :rules="ruleValidate" :model="company" :label-width="130">

                <div v-show="step==='baseinfo'">
                    <Card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">公司基本信息</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="公司名称" prop="basic_info.company_name_cn" :rules="isCreate?ruleValidate.company_name_cn:[]">
                                <Input :disabled="!isCreate" v-model="company.basic_info.company_name_cn" @on-blur="searchCompany"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="公司英文名" prop="basic_info.company_name_en" :rules="isCreate?ruleValidate.company_name_en:[]">
                                <Input :disabled="!isCreate" v-model="company.basic_info.company_name_en"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="申请类型" prop="apply_info_list.0.apply_type" :rules="isCreate?ruleValidate.apply_type:[]">
                                <RadioGroup v-model="company.apply_info_list[0].apply_type" @on-change="changApply_type">
                                    <Radio :disabled="!isCreate" v-for="item in apply_type_list" :key="item.code" :label="item.code">{{item.name}}</Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="经销商类型" prop="apply_info_list.0.vendor_type" :rules="isCreate?ruleValidate.vendor_type:[]">
                                <Select :disabled="!isCreate" v-model="company.apply_info_list[0].vendor_type" @on-change="changVendor_type">
                                     <Option  v-for="item in vendor_type_list" :key="item.code" :value="item.code">{{item.name}}</Option>
                               </Select>
                            </FormItem>
                            </Col>
                        </Row>


                        <Row>
                            <Col span="12">
                            <FormItem label="区域" prop="basic_info.region" :rules="isCreate?ruleValidate.region:[]">
                                <Select :disabled="!isCreate" v-model="company.basic_info.region">
                                     <Option  v-for="item in regionList" :key="item.region_code" :value="item.region_code">{{item.region_name}}</Option>
                               </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="申请协议生效时间" prop="basic_info.approval_effect_date" :rules="isCreate?ruleValidate.approval_effect_date:[]">
                                <DatePicker :disabled="!isCreate" @on-change="company.basic_info.approval_effect_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="company.basic_info.approval_effect_date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="申请协议失效时间" prop="basic_info.approval_expire_date" :rules="isCreate?ruleValidate.approval_expire_date:[]">
                                <DatePicker :disabled="!isCreate" @on-change="company.basic_info.approval_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="company.basic_info.approval_expire_date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="省份" prop="basic_info.company_province" :rules="isCreate?ruleValidate.company_province:[]">
                                <Select :disabled="!isCreate" v-model="company.basic_info.company_province" @on-change="company.basic_info.company_city=''">
                                     <Option  v-for="item in location_Provices" :key="item.province_code" :value="item.province_code">{{item.province_name}}</Option>
                               </Select>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="城市" prop="basic_info.company_city" :rules="isCreate?ruleValidate.company_city:[]">
                                <Select :disabled="!isCreate" v-model="company.basic_info.company_city">
                                     <Option v-for="item in location_Citys_ByProvices" :key="item.city_code" :value="item.city_code">{{item.city_name}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="公司注册地址" prop="basic_info.registered_address_cn" :rules="isCreate?ruleValidate.registered_address_cn:[]">
                                <Input :disabled="!isCreate" v-model="company.basic_info.registered_address_cn"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="注册地址英文" prop="basic_info.registered_address_en" :rules="isCreate?ruleValidate.registered_address_en:[]">
                                <Input :disabled="!isCreate" v-model="company.basic_info.registered_address_en"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="注册资本" prop="basic_info.registered_capital" :rules="isCreate?ruleValidate.registered_capital:[]">
                                <InputNumber style="width:100%" :disabled="!isCreate" v-model="company.basic_info.registered_capital"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="传真" prop="basic_info.fax" :rules="isCreate?ruleValidate.fax:[]">
                                <Input :disabled="!isCreate" v-model="company.basic_info.fax"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="法定代表人" prop="basic_info.legal_representative" :rules="isCreate?ruleValidate.legal_representative:[]">
                                <Input :disabled="!isCreate" v-model="company.basic_info.legal_representative"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="捷迈渠道对口人" prop="basic_info.business_contact" :rules="channel_manager_fill_form?ruleValidate.business_contact:[]">
                                <Input :disabled="isView||(isApprove&&!channel_manager_fill_form)||!channel_manager_fill_form" v-model="company.basic_info.business_contact"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12" offset="12">
                            <FormItem label="捷迈销售对口人" prop="basic_info.selling_contract" :rules="isCreate?ruleValidate.selling_contract:[]">
                                <Input :disabled="!isCreate" v-model="company.basic_info.selling_contract"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="公司性质I" prop="basic_info.company_type1" :rules="isCreate?ruleValidate.company_type1:[]">
                                <Select :disabled="!isCreate" v-model="company.basic_info.company_type1">
                                     <Option  v-for="item in company_nature1_List" :key="item.code" :value="item.code">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="公司性质II" prop="basic_info.company_type2" :rules="isCreate?ruleValidate.company_type2:[]">
                                <Select :disabled="!isCreate" v-model="company.basic_info.company_type2">
                                     <Option  v-for="item in company_nature2_List" :key="item.code" :value="item.code">{{item.name}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="母公司名称">
                                <Input v-model="company.parent_company.company_name_cn" :disabled="!isCreate" @on-blur="searchParentCompany"></Input>
                            </FormItem>
                            </Col>

                            <Col v-if="(user.is_staff&&is_newcompany)||company.basic_info.company_email!=null" span="12">
                            <FormItem label="邮箱" prop="basic_info.company_email" :rules="isCreate&&is_newcompany?ruleValidate.company_email:[]">
                                <Input :disabled="!isCreate" v-model="company.basic_info.company_email"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">

                            <FormItem label="SAP ID">
                                <Input disabled v-model="company.basic_info.sap_id"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="状态">
                                <Input disabled v-model="company.basic_info.status"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>

                    <Card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">管理人员信息</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="股东" prop="manager_info.shareholders" :rules="isCreate?ruleValidate.shareholders:[]">
                                <Input :disabled="!isCreate" v-model="company.manager_info.shareholders"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="董事" prop="manager_info.director" :rules="isCreate?ruleValidate.director:[]">
                                <Input :disabled="!isCreate" v-model="company.manager_info.director"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="监事" prop="manager_info.supervisor" :rules="isCreate?ruleValidate.supervisor:[]">
                                <Input :disabled="!isCreate" v-model="company.manager_info.supervisor"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="实际控制人" prop="manager_info.financial_beneficiary" :rules="isCreate?ruleValidate.financial_beneficiary:[]">
                                <Input :disabled="!isCreate" v-model="company.manager_info.financial_beneficiary"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="总经理" prop="manager_info.general_manager" :rules="isCreate?ruleValidate.general_manager:[]">
                                <Input :disabled="!isCreate" v-model="company.manager_info.general_manager"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="其他管理人员">
                                <Input :disabled="!isCreate" v-model="company.manager_info.other_manager"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>

                    <Card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">联系人信息</span>
                            </Col>
                            <Col v-show="isCreate" span="12" style="text-align:right">
                            <Button type="dashed" icon="md-add-circle" @click="add_contact()">添加</Button>
                            </Col>
                        </Row>

                        <div v-for="(item,key) in  company.contacts" :key="key+'a'">
                            <Divider v-show="key>0" />

                            <Row style="margin-bottom: 30px">

                                <Col span="23">
                                <span class="contentTitle_small">{{`联系人信息${key+1}`}}</span>
                                </Col>

                                <Col span="1" style="text-align:center">
                                <Tooltip v-show="company.contacts.length>1&&isCreate" content="删除" placement="right-end">
                                    <span style="cursor:pointer" @click="delete_contacts(key)"> <Icon type="md-close" /></span>
                                </Tooltip>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="24">
                                <FormItem label="BU" :prop="'contacts.'+key+'.contract_bu'" :rules="isCreate?ruleValidate.contract_bu:[]">
                                    <CheckboxGroup v-model="item.contract_bu">
                                        <Checkbox :disabled="!isCreate" v-for="(item,key) in BU" :key="key+'f'" :label="item.bu_code"><span>{{item.bu_name}}</span></Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="合同签约人" :prop="'contacts.'+key+'.contract_agent'" :rules="isCreate?ruleValidate.contract_agent:[]">
                                    <Input :disabled="!isCreate" v-model="item.contract_agent"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem :disabled="!isCreate" label="合同签约人是否法定代表人" :label-width="200">
                                    <i-switch :disabled="!isCreate" v-model="item.is_contract_agent" size="large" @on-change="contract_agent_change(key)">
                                        <span slot="open">是</span>
                                        <span slot="close">否</span>
                                    </i-switch>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row v-show="!item.is_contract_agent">
                                <Col span="12">
                                <FormItem label="法人代表委托" :prop="'contacts.'+key+'.contract_delegate'" :rules="isCreate&&!item.is_contract_agent?ruleValidate.contract_delegate:[]">
                                    <Input :disabled="!isCreate" v-model="item.contract_delegate"></Input>
                                </FormItem>
                                </Col>

                                <Col span="12">
                                <FormItem label="委托附件" :prop="'contacts.'+key+'.contract_attachment'" :rules="isCreate&&!item.is_contract_agent?ruleValidate.attachment:[]">
                                    <CustomUpload :customDisabled="!isCreate" @clildUpload='clildUpload' :uploadIndex="key" uploadType="contract_attachment" :fileList="item.contract_attachment"></CustomUpload>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="合同收件人" :prop="'contacts.'+key+'.contract_recipient'" :rules="isCreate?ruleValidate.contract_recipient:[]">
                                    <Input :disabled="!isCreate" v-model="item.contract_recipient"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="合同收件人电话" :prop="'contacts.'+key+'.contract_recipient_phone'" :rules="isCreate?ruleValidate.contract_recipient_phone:[]">
                                    <Input :disabled="!isCreate" v-model="item.contract_recipient_phone"></Input>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="合同邮寄地址" :prop="'contacts.'+key+'.contract_mail_address'" :rules="isCreate?ruleValidate.contract_mail_address:[]">
                                    <Input :disabled="!isCreate" v-model="item.contract_mail_address"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="合同邮寄编码" :prop="'contacts.'+key+'.contract_mail_postcode'" :rules="isCreate?ruleValidate.contract_mail_postcode:[]">
                                    <Input :disabled="!isCreate" v-model="item.contract_mail_postcode"></Input>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="业务联系人" :prop="'contacts.'+key+'.business_contact'" :rules="isCreate?ruleValidate.business_contact:[]">
                                    <Input :disabled="!isCreate" v-model="item.business_contact"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="业务联系邮箱" :prop="'contacts.'+key+'.business_contact_email'" :rules="isCreate?ruleValidate.business_contact_email:[]">
                                    <Input :disabled="!isCreate" v-model="item.business_contact_email"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </Card>

                    <Card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">第三方收货地址</span>
                            </Col>
                            <Col v-show="isCreate" span="12" style="text-align:right">
                            <Button type="dashed" icon="md-add-circle" @click="add_additional_warehouses()">添加</Button>
                            </Col>
                        </Row>
                        <div v-if="item.is_active" v-for="(item,key) in  company.additional_warehouses" :key="key+'b'">
                            <Divider v-show="key>0" />

                            <Row style="margin-bottom: 30px">

                                <Col span="12">
                                <span class="contentTitle_small">{{`收货地址${key+1}`}}</span>
                                </Col>

                                <Col span="12" style="text-align:right">
                                <Tooltip v-if="company.additional_warehouses.length>1&&isCreate&&!(item.additional_warehouses_id>0)" content="删除" placement="right-end">
                                    <span style="cursor:pointer" @click="delete_additional_warehouses(key)"> <Icon type="md-close" /></span>
                                </Tooltip>
                                <Button type="dashed" v-if="!is_newcompany&&item.additional_warehouses_id>0" icon="md-close" @click="active_additional_warehouses(key)">证件更新</Button>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="24">
                                <FormItem label="BU">
                                    <CheckboxGroup v-model="item.additional_warehouses_bu">
                                        <Checkbox :disabled="!isCreate||item.additional_warehouses_id>0" v-for="items in BU" :key="items.bu_code" :label="items.bu_code"><span>{{items.bu_name}}</span></Checkbox>
                                    </CheckboxGroup>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="收货方">
                                    <Input :disabled="!isCreate||item.additional_warehouses_id>0" v-model="item.receiving_party"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="收货地址">
                                    <Input :disabled="!isCreate||item.additional_warehouses_id>0" v-model="item.receiving_address"></Input>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="营业执照">
                                    <!--                                     <Upload :headers="header" :on-preview="downloadAttachment" :action="uploadAttachmentUrl" :default-file-list="convertArray(item.warehouse_license_attachment)" :on-progress="uploadProgress" :on-success="uploadsuccess">
                                        <Button :disabled="!isCreate||item.additional_warehouses_id>0" icon="ios-cloud-upload-outline" @click="setAttachmentType(`warehouse_license_attachment`,`${key}`)">上传附件</Button>
                                    </Upload> -->

                                    <CustomUpload :customDisabled="!isCreate||item.additional_warehouses_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_license_attachment" :fileList="item.warehouse_license_attachment"></CustomUpload>

                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="第二类医疗器械凭证">
                                    <!--                                     <Upload :headers="header" :on-preview="downloadAttachment" :action="uploadAttachmentUrl" :default-file-list="convertArray(item.warehouse_medical_license2_attachment)" :on-remove="removefile" :on-progress="uploadProgress" :on-success="uploadsuccess">
                                        <Button :disabled="!isCreate||item.additional_warehouses_id>0" icon="ios-cloud-upload-outline" @click="setAttachmentType(`warehouse_medical_license2_attachment`,`${key}`)">上传附件</Button>
                                    </Upload> -->
                                    <CustomUpload :customDisabled="!isCreate||item.additional_warehouses_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_medical_license2_attachment" :fileList="item.warehouse_medical_license2_attachment"></CustomUpload>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="医疗器械经营许可证">
                                    <!--                                     <Upload :headers="header" :on-preview="downloadAttachment" :action="uploadAttachmentUrl" :default-file-list="convertArray(item.warehouse_medical_license_attachment)" :on-remove="removefile" :on-progress="uploadProgress" :on-success="uploadsuccess">
                                        <Button :disabled="!isCreate||item.additional_warehouses_id>0" icon="ios-cloud-upload-outline" @click="setAttachmentType(`warehouse_medical_license_attachment`,`${key}`)">上传附件</Button>                                        
                                    </Upload> -->
                                    <CustomUpload :customDisabled="!isCreate||item.additional_warehouses_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_medical_license_attachment" :fileList="item.warehouse_medical_license_attachment"></CustomUpload>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="声明">
                                    <!--                                     <Upload :headers="header" :on-preview="downloadAttachment" :action="uploadAttachmentUrl" :default-file-list="convertArray(item.warehouse_declare_attachment)" :on-remove="removefile" :on-progress="uploadProgress" :on-success="uploadsuccess">
                                        <Button :disabled="!isCreate||item.additional_warehouses_id>0" icon="ios-cloud-upload-outline" @click="setAttachmentType(`warehouse_declare_attachment`,`${key}`)">上传附件</Button>
                                    </Upload> -->
                                    <CustomUpload :customDisabled="!isCreate||item.additional_warehouses_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_declare_attachment" :fileList="item.warehouse_declare_attachment"></CustomUpload>
                                </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </Card>

                    <Card v-for="(item,key) in company.invoice_info" :key="key+'f'">

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">发票信息</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="开户行" :prop="'invoice_info.'+key+'.bank_address'" :rules="isCreate?ruleValidate.bank_address:[]">
                                <Input :disabled="!isCreate" v-model="item.bank_address"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">

                            <FormItem label="银行账号" :prop="'invoice_info.'+key+'.card_number'" :rules="isCreate?ruleValidate.card_number:[]">
                                <Input :disabled="!isCreate" v-model="item.card_number"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="付款方式" :prop="'invoice_info.'+key+'.payment_type'" :rules="isCreate?ruleValidate.payment_type:[]">
                                <Select :disabled="!isCreate" v-model="item.payment_type" clearable>
                                     <Option  v-for="item in payment_type_List" :key="item.code" :value="item.code">{{item.name}}</Option>
                                </Select>
                            </FormItem>

                            </Col>
                            <Col span="12">

                            <FormItem label="信用期限">
                                <Input :disabled="!isCreate" v-model="item.credit_due_time"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="发票接收人" :prop="'invoice_info.'+key+'.invoice_recipient'" :rules="isCreate?ruleValidate.invoice_recipient:[]">
                                <Input :disabled="!isCreate" v-model="item.invoice_recipient"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">

                            <FormItem label="发票接收地址" :prop="'invoice_info.'+key+'.invoice_address'" :rules="isCreate?ruleValidate.invoice_address:[]">
                                <Input :disabled="!isCreate" v-model="item.invoice_address"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                    </Card>
                </div>
            </Form>
            <Form ref="ref_from2" :rules="ruleValidate" :model="company" :label-width="130">
                <div v-show="step==='companycertificates'">
                    <Card v-if="item.is_active" v-for="(item,key) in company.business_licenses" :key="key+'d'">

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">营业执照</span>
                            </Col>
                            <Col v-show="isCreate" span="12" style="text-align:right">
                            <Button type="dashed" v-if="!is_newcompany&&item.business_license_id>0" icon="md-close" @click="active_business_licenses(key)">证件更新</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="统一社会信用代码" :prop="'business_licenses.'+key+'.license_no'" :rules="isCreate?ruleValidate.license_no:[]">
                                <Input :disabled="!isCreate||(!is_newcompany&&item.business_license_id>0)" v-model="item.license_no"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="发证机构" :prop="'business_licenses.'+key+'.license_certification_body'" :rules="isCreate?ruleValidate.license_certification_body:[]">
                                <Input :disabled="!isCreate||(!is_newcompany&&item.business_license_id>0)" v-model="item.license_certification_body"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" :prop="'business_licenses.'+key+'.license_effective_date'" :rules="isCreate?ruleValidate.license_effective_date:[]">
                                <DatePicker :disabled="!isCreate||(!is_newcompany&&item.business_license_id>0)" @on-change="item.license_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.license_effective_date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" :prop="'business_licenses.'+key+'.license_expire_date'" :rules="isCreate?ruleValidate.license_expire_date:[]">
                                <DatePicker :disabled="!isCreate||(!is_newcompany&&item.business_license_id>0)" @on-change="item.license_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.license_expire_date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="营业执照" :prop="'business_licenses.'+key+'.business_license_attachment'" :rules="isCreate?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!isCreate||(!is_newcompany&&item.business_license_id>0)" @clildUpload='clildUpload' :uploadIndex="key" uploadType="business_license_attachment" :fileList="item.business_license_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>

                    <Card v-if="item.is_active" v-for="(item,key) in company.medical_business_licenses" :key="key+'e'">

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">医疗器械经营许可证</span>
                            </Col>
                            <Col v-show="isCreate" span="12" style="text-align:right">
                            <Button type="dashed" v-if="item.medical_business_license_id>0" icon="md-close" @click="active_medical_business_licenses(key)">证件更新</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="编号" :prop="'medical_business_licenses.'+key+'.medical_business_license_no'" :rules="isCreate&&!isService?ruleValidate.medical_business_license_no:ruleValidate.novalidate">
                                <Input :disabled="!isCreate||item.medical_business_license_id>0" v-model="item.medical_business_license_no"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="发证机构" :prop="'medical_business_licenses.'+key+'.medical_business_license_certification_body'" :rules="isCreate&&!isService?ruleValidate.medical_business_license_certification_body:ruleValidate.novalidate">
                                <Input :disabled="!isCreate||item.medical_business_license_id>0" v-model="item.medical_business_license_certification_body"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" :prop="'medical_business_licenses.'+key+'.medical_business_license_effective_date'" :rules="isCreate&&!isService?ruleValidate.medical_business_license_effective_date:ruleValidate.novalidate">
                                <DatePicker :disabled="!isCreate||item.medical_business_license_id>0" @on-change="item.medical_business_license_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.medical_business_license_effective_date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" :prop="'medical_business_licenses.'+key+'.medical_business_license_expire_date'" :rules="isCreate&&!isService?ruleValidate.medical_business_license_expire_date:ruleValidate.novalidate">
                                <DatePicker :disabled="!isCreate||item.medical_business_license_id>0" @on-change="item.medical_business_license_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.medical_business_license_expire_date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row v-for="(warehouseitem,cindex) in  item.medical_warehouses" :key="cindex+'f'">
                            <Col span="12">
                            <FormItem label="仓库地址" :prop="'medical_business_licenses.'+key+'.medical_warehouses.'+cindex+'.warehouse_address'" :rules="isCreate&&!isService?ruleValidate.warehouse_address:ruleValidate.novalidate">
                                <Input :disabled="!isCreate||item.medical_business_license_id>0" v-model="warehouseitem.warehouse_address" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="仓库面积" :prop="'medical_business_licenses.'+key+'.medical_warehouses.'+cindex+'.warehouse_area'" :rules="isCreate&&!isService?ruleValidate.warehouse_area:ruleValidate.novalidate">
                                <Input :disabled="!isCreate||item.medical_business_license_id>0" v-model="warehouseitem.warehouse_area" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                            <Col span="1">
                            <u v-show="isCreate&&!(item.medical_business_license_id>0)&&item.medical_warehouses.length>1" class="ubtn_delete" @click="delete_medical_warehouses(key,cindex)">[删除]</u>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <u v-show="isCreate&&!(item.medical_business_license_id>0)" class="ubtn_add" @click="add_medical_warehouses(key)">[添加仓库]</u>
                            </Col>
                        </Row>
                        <br />

                        <Row>
                            <Col span="24">
                            <FormItem label="经营范围" :prop="'medical_business_licenses.'+key+'.medical_business_license_business_scope'" :rules="isCreate&&!isService?ruleValidate.medical_business_license_business_scope:ruleValidate.novalidate">
                                <CheckboxGroup v-model="item.medical_business_license_business_scope">
                                    <Row>
                                        <Checkbox :disabled="item.medical_business_license_id>0||(!item.medical_business_license_id&&!is_qa&&!isCreate)" v-for="medical_business_license_scope_item in medical_business_license_scope" :key="medical_business_license_scope_item.code" :label="medical_business_license_scope_item.code">{{medical_business_license_scope_item.name}}</Checkbox>
                                    </Row>
                                </CheckboxGroup>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="许可证" :prop="'medical_business_licenses.'+key+'.medical_business_license_attachment'" :rules="isCreate&&!isService?ruleValidate.attachment:ruleValidate.novalidate">
                                <CustomUpload :customDisabled="!isCreate||item.medical_business_license_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="medical_business_license_attachment" :fileList="item.medical_business_license_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>

                    <Card v-if="item.is_active" v-for="(item,key) in company.medical_business_license_seconds" :key="key+'g'">

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">第二类医疗器械经营备案</span>
                            </Col>
                            <Col v-show="isCreate" span="12" style="text-align:right">
                            <Button type="dashed" v-if="!isCreate||item.medical_business_license_second_id>0" icon="md-close" @click="active_medical_business_license_seconds(key)">证件更新</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="编号" :prop="'medical_business_license_seconds.'+key+'.medical_business_license2_no'" :rules="isCreate&&!isService?ruleValidate.medical_business_license2_no:ruleValidate.novalidate">
                                <Input :disabled="!isCreate||item.medical_business_license_second_id>0" v-model="item.medical_business_license2_no"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="发证机构" :prop="'medical_business_license_seconds.'+key+'.medical_business_license2_certification_body'" :rules="isCreate&&!isService?ruleValidate.medical_business_license2_certification_body:ruleValidate.novalidate">
                                <Input :disabled="!isCreate||item.medical_business_license_second_id>0" v-model="item.medical_business_license2_certification_body"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="备案日期" :prop="'medical_business_license_seconds.'+key+'.medical_business_license2_record_date'" :rules="isCreate&&!isService?ruleValidate.medical_business_license2_record_date:ruleValidate.novalidate">
                                <DatePicker :disabled="!isCreate||item.medical_business_license_second_id>0" @on-change="item.medical_business_license2_record_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.medical_business_license2_record_date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row v-for="(medical_second_warehouses_item,cindex) in  item.medical_second_warehouses" :key="cindex+'h'">
                            <Col span="12">

                            <FormItem label="仓库地址" :prop="'medical_business_license_seconds.'+key+'.medical_second_warehouses.'+cindex+'.warehouse_address'" :rules="isCreate&&!isService?ruleValidate.warehouse2_address:ruleValidate.novalidate">
                                <Input :disabled="!isCreate||item.medical_business_license_second_id>0" v-model="medical_second_warehouses_item.warehouse_address" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                            <Col span="11">
                            <FormItem label="仓库面积" :prop="'medical_business_license_seconds.'+key+'.medical_second_warehouses.'+cindex+'.warehouse_area'" :rules="isCreate&&!isService?ruleValidate.warehouse2_area:ruleValidate.novalidate">
                                <Input :disabled="!isCreate||item.medical_business_license_second_id>0" v-model="medical_second_warehouses_item.warehouse_area" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                            <Col span="1">
                            <u v-show="isCreate&&!(item.medical_business_license_second_id>0)&&item.medical_second_warehouses.length>1" class="ubtn_delete" @click="delete_medical_second_warehouses(key,cindex)">[删除]</u>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <u v-show="isCreate&&!(item.medical_business_license_second_id>0)" class="ubtn_add" @click="add_medical_second_warehouses(key)">[添加仓库]</u>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col span="24">
                            <FormItem label="经营范围" :prop="'medical_business_license_seconds.'+key+'.medical_business_license2_business_scope'" :rules="isCreate&&!isService?ruleValidate.medical_business_license2_business_scope:ruleValidate.novalidate">
                                <CheckboxGroup v-model="item.medical_business_license2_business_scope">
                                    <Row>
                                        <Checkbox :disabled="item.medical_business_license_second_id>0||(!item.medical_business_license_second_id&&!is_qa&&!isCreate)" v-for="medical_business_license2_scope_item in medical_business_license2_scope" :key="medical_business_license2_scope_item.code"
                                            :label="medical_business_license2_scope_item.code">{{medical_business_license2_scope_item.name}}</Checkbox>
                                    </Row>
                                </CheckboxGroup>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="许可证" :prop="'medical_business_license_seconds.'+key+'.medical_business_license2_attachment'" :rules="isCreate&&!isService?ruleValidate.attachment:ruleValidate.novalidate">
                                <CustomUpload :customDisabled="!isCreate||item.medical_business_license_second_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="medical_business_license2_attachment" :fileList="item.medical_business_license2_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>

                    <Card v-if="item.is_active" v-for="(item,key) in company.other_licenses" :key="key+'c'">
                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">其他证件</span>
                            </Col>
                            <Col v-show="isCreate" span="12" style="text-align:right">
                            <Button type="dashed" v-if="!isCreate||item.other_license_id>0" icon="md-close" @click="active_other_licenses(key)">证件更新</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="编号">
                                <Input :disabled="!isCreate||item.other_license_id>0" v-model="item.license_no"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="发证机构">
                                <Input :disabled="!isCreate||item.other_license_id>0" v-model="item.license_certification_body"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期">
                                <DatePicker :disabled="!isCreate||item.other_license_id>0" @on-change="item.license_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.license_effective_date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期">
                                <DatePicker :disabled="!isCreate||item.other_license_id>0" @on-change="item.license_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.license_expire_date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <FormItem label="备注">
                                <Input :disabled="!isCreate||item.other_license_id>0" v-model="item.remark" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="其他材料">
                                <!--                                 <Upload :headers="header" :on-preview="downloadAttachment" :action="uploadAttachmentUrl" :default-file-list="convertArray(item.other_license_attachment)" :on-remove="removefile" :on-progress="uploadProgress" :on-success="uploadsuccess">
                                    <Button :disabled="!isCreate||item.other_license_id>0" icon="ios-cloud-upload-outline" @click="setAttachmentType(`other_license_attachment`,key)">上传附件</Button>
                                </Upload> -->
                                <CustomUpload :customDisabled="!isCreate||item.other_license_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="other_license_attachment" :fileList="item.other_license_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>


                    <Card v-show="isService&&item.is_active" v-for="(item,key) in company.provider_personnel_info" :key="key+'q'">

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">服务商服务人员信息</span>
                            </Col>
                            <Col v-show="isCreate" span="12" style="text-align:right">
                            <Button type="dashed" v-if="!is_newcompany&&item.provider_personnel_id>0" icon="md-close" @click="active_provider_personnel_info(key)">证件更新</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="人员数量" :prop="'provider_personnel_info.'+key+'.personnel_number'" :rules="isCreate&&isService?ruleValidate.personnel_number:[]">
                                <InputNumber :disabled="!isCreate||item.provider_personnel_id>0" v-model="item.personnel_number"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <FormItem label="人员名单" :prop="'provider_personnel_info.'+key+'.personnel_list'" :rules="isCreate&&isService?ruleValidate.personnel_list:[]">
                                <Input :disabled="!isCreate||item.provider_personnel_id>0" type="textarea" v-model="item.personnel_list" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="人员简历" :prop="'provider_personnel_info.'+key+'.resume_attachment'" :rules="isCreate&&isService?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!isCreate||item.provider_personnel_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="resume_attachment" :fileList="item.resume_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="服务协议" :prop="'provider_personnel_info.'+key+'.protocol_attachment'" :rules="isCreate&&isService?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!isCreate||item.provider_personnel_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="protocol_attachment" :fileList="item.protocol_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="培训通过文件" :prop="'provider_personnel_info.'+key+'.train_attachment'" :rules="isCreate&&isService?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!isCreate||item.provider_personnel_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="train_attachment" :fileList="item.train_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>

                    <Card v-if="item.is_active" v-for="(item,key) in company.dd_information_list" :key="key+'h'">

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">DD信息</span>
                            </Col>
                            <Col v-show="is_channel_manager" span="12" style="text-align:right">
                            <Button type="dashed" v-if="item.is_active&&item.dd_information_id>0" icon="md-close" @click="active_dd_information_list(key)">证件更新</Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="编号" :prop="'dd_information_list.'+key+'.dd_code'" :rules="is_channel_manager?ruleValidate.dd_code:[]">
                                <Input :disabled="!is_channel_manager||item.dd_information_id>0" v-model="item.dd_code"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" :prop="'dd_information_list.'+key+'.dd_effective_date'" :rules="is_channel_manager?ruleValidate.dd_effective_date:[]">
                                <DatePicker :disabled="!is_channel_manager||item.dd_information_id>0" @on-change="item.dd_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.dd_effective_date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" :prop="'dd_information_list.'+key+'.dd_expire_date'" :rules="is_channel_manager?ruleValidate.dd_expire_date:[]">
                                <DatePicker :disabled="!is_channel_manager||item.dd_information_id>0" @on-change="item.dd_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.dd_expire_date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="截图" :prop="'dd_information_list.'+key+'.capture_attachment'" :rules="is_channel_manager?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!is_channel_manager||item.dd_information_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="capture_attachment" :fileList="item.capture_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="批复邮件" :prop="'dd_information_list.'+key+'.reply_attachment'" :rules="is_channel_manager?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!is_channel_manager||item.dd_information_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="reply_attachment" :fileList="item.reply_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>
                </div>
            </Form>
            <Form ref="ref_from3" :rules="ruleValidate" :model="company">
                <div v-show="step==='applyaccording'">
                    <Card v-for="(item,key) in company.application_certificate" :key="key+'r'">
                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">申请依据</span>
                            </Col>
                        </Row>

                        <Row style="margin-left: 60px">
                            <Col span="24">
                            <FormItem label="1.您是如何认识提议的捷迈合作伙伴的?如果通过第三方认识,请说明第三方的名称" :prop="'application_certificate.'+key+'.third_party'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">

                                <Input :disabled="!isCreate" type="textarea" v-model="item.third_party" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <br/>
                        <Row style="margin-left: 60px">
                            <Col span="24">
                            <FormItem label="2.您对提议的捷迈合作伙伴的了解程度如何?您与其相识多久?" :prop="'application_certificate.'+key+'.partner'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" type="textarea" v-model="item.partner" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <br/>
                        <Row style="margin-left: 60px">
                            <Col span="24">
                            <FormItem label="3.签署合同前由捷迈合作伙伴提议或已进行的投标的详情" :prop="'application_certificate.'+key+'.bid_details'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" type="textarea" v-model="item.bid_details" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <br/>
                        <Row style="margin-left: 60px">
                            <Col span="24">
                            <FormItem label="4.请注明任何在捷迈合作伙伴提供服务以前提供的任何预付费用或预付款" :prop="'application_certificate.'+key+'.prepay'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" type="textarea" v-model="item.prepay" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <br/>
                        <Row style="margin-left: 60px">
                            <Col span="12">
                            <FormItem label="5.捷迈合作伙伴是否将从捷迈或客户处直接或间接收取任何现金(票据或货币)付款?如是,请解释原因" :prop="'application_certificate.'+key+'.is_cash_transaction'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commonchange:[]">

                                <i-switch :disabled="!isCreate" v-model="item.is_cash_transaction" size="large">
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>

                            </FormItem>
                            </Col>
                        </Row>
                        <Row v-show="item.is_cash_transaction" style="margin-left: 60px">
                            <Col span="24">
                            <FormItem label="" :prop="'application_certificate.'+key+'.cash_transaction_instruction'" :rules="isCreate&&!is_renewcontrac&&item.is_cash_transaction?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" type="textarea" v-model="item.cash_transaction_instruction" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row style="margin-left: 60px">
                            <Col span="24">
                            <span class="ivu-form-item-label">6.已有类似业务</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <FormItem label="经销模式" :label-width="130" :prop="'application_certificate.'+key+'.similar_business.distribution_mode_list'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commonchange:[]">

                                <CheckboxGroup v-model="item.similar_business.distribution_mode_list">
                                    <Checkbox :disabled="!isCreate" v-for="item in distribution_mode_List" :key="item.code" :label="item.code"><span>{{item.name}}</span></Checkbox>
                                </CheckboxGroup>

                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="核心医院" :label-width="130" :prop="'application_certificate.'+key+'.similar_business.core_hospital'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" v-model="item.similar_business.core_hospital"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="二级商数量" :label-width="130" :prop="'application_certificate.'+key+'.similar_business.lower_distribution_number'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <InputNumber style="width:100%" :disabled="!isCreate" v-model="item.similar_business.lower_distribution_number"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="直销比例" :label-width="130" :prop="'application_certificate.'+key+'.similar_business.direct_selling_ratio'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" v-model="item.similar_business.direct_selling_ratio"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="分销比例" :label-width="130" :prop="'application_certificate.'+key+'.similar_business.distribution_ratio'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" v-model="item.similar_business.distribution_ratio"></Input>
                            </FormItem>
                            </Col>
                        </Row>


                        <Row style="margin-left: 60px">
                            <Col span="24">
                            <FormItem label="7.预计开发新经销商/渠道的目标" :prop="'application_certificate.'+key+'.selling_target'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input v-model="item.selling_target" :disabled="!isCreate" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <br/>
                        <Row style="margin-left: 60px">
                            <Col span="24">
                            <FormItem label="8.目前预计捷迈产品市场份额" :prop="'application_certificate.'+key+'.current_market_quota'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input v-model="item.current_market_quota" :disabled="!isCreate"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <br/>
                        <Row style="margin-left: 60px">
                            <Col span="24">
                            <span class="ivu-form-item-label">9.目标市场份额</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="8">
                            <FormItem label="第一年" :label-width="130" :prop="'application_certificate.'+key+'.market_quota_first'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" v-model="item.market_quota_first"></Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="第二年" :label-width="130" :prop="'application_certificate.'+key+'.market_quota_second'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" v-model="item.market_quota_second"></Input>
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="第三年" :label-width="130" :prop="'application_certificate.'+key+'.market_quota_third'" :rules="isCreate&&!is_renewcontrac?ruleValidate.commontext:[]">
                                <Input :disabled="!isCreate" v-model="item.market_quota_third"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                        <br/>
                        <Row v-if="!isService">
                            <Col span="24">
                            <Row style="margin-left: 60px">
                                <Col span="24">
                                <span class="ivu-form-item-label">10.候选经销商调查问卷表</span>
                                </Col>
                            </Row>
                            <br/>
                            <Row style="margin-left: 60px">
                                <Col span="3">
                                <FormItem :prop="'application_certificate.'+key+'.questionnaire_attachment'" :rules="isCreate&&!is_renewcontrac?ruleValidate.attachment:[]">
                                    <CustomUpload :customDisabled="!isCreate||item.application_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="questionnaire_attachment" :fileList="item.questionnaire_attachment"></CustomUpload>
                                </FormItem>
                                </Col>

                                <Col span="3">
                                <Button type="text" icon="ios-cloud-download" @click="downTemplate('questionnaire_attachment_1')">模板下载</Button>
                                </Col>
                            </Row>
                            </col>
                        </row>
                        <Row v-if="isService">
                            <Col span="24">
                            <Row style="margin-left: 60px">
                                <Col span="24">
                                <span class="ivu-form-item-label">10.候选服务商调查问卷表</span>
                                </Col>
                            </Row>
                            <br/>
                            <Row style="margin-left: 60px">

                                <Col span="3">
                                <FormItem :prop="'application_certificate.'+key+'.questionnaire_attachment'" :rules="isCreate&&!is_renewcontrac?ruleValidate.attachment:[]">
                                    <CustomUpload :customDisabled="!isCreate||item.application_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="questionnaire_attachment" :fileList="item.questionnaire_attachment"></CustomUpload>
                                </FormItem>
                                </Col>

                                <Col span="3">
                                <Button type="text" icon="ios-cloud-download" @click="downTemplate('questionnaire_attachment_2')">模板下载</Button>
                                </Col>
                            </Row>
                            </col>
                        </row>

                        <br/>
                        <Row style="margin-left: 60px">
                            <Col span="24">
                            <span class="ivu-form-item-label">11.DD申请表格</span>
                            </Col>
                        </Row>
                        <br/>
                        <Row style="margin-left: 60px">
                            <Col span="3">
                            <FormItem :prop="'application_certificate.'+key+'.dd_attachment'" :rules="isCreate&&!is_renewcontrac?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!isCreate||item.application_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="dd_attachment" :fileList="item.dd_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                            <Col span="3">
                            <Button type="text" icon="ios-cloud-download" @click="downTemplate('dd_attachment')">模板下载</Button>
                            </Col>
                        </Row>
                        <br/>
                    </Card>
                </div>
            </Form>
            <Form ref="ref_from4" :rules="ruleValidate" :model="company" :label-width="130">
                <div v-show="step==='estimation'&&!is_renewcontrac">
                    <Row>
                        <Col span="24">
                        <EstimationTable ref="childen" :is_renewcontrac="is_renewcontrac" :assessment_info="company.assessment_info" @setAssessmentInfo="setAssessmentInfo"></EstimationTable>
                        </Col>
                    </Row>
                </div>
            </Form>

            <div v-show="step==='approvefile'">
                <Form ref="ref_from5" :rules="ruleValidate" :model="company" :label-width="130">
                    <Card v-for="(item,key) in company.approval_unseal_files" :key="key+'w'">
                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">主协议未盖章版</span>
                            </Col>
                        </Row>


                        <Row>
                            <Col span="12">
                            <FormItem label="主协议" :prop="'approval_unseal_files.'+key+'.approval_attachment'" :rules="!disableMasterAgreementSealless?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="disableMasterAgreementSealless" @clildUpload='clildUpload' :uploadIndex="key" uploadType="approval_unseal_files_capture_attachment" :fileList="item.approval_attachment"></CustomUpload>
                            </FormItem>
                            </Col>

                            <Col span="12">
                            <FormItem label="协议类型">
                                <Select disabled v-model="item.protocol_type">
                                     <Option  v-for="item in protocol_type_list" :key="item.code" :value="item.code">{{item.name}}</Option>
                               </Select>
                            </FormItem>
                            </Col>
                        </Row>



                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" :prop="'approval_unseal_files.'+key+'.approval_effective_date'" :rules="!disableMasterAgreementSealless?ruleValidate.commontext:[]">
                                <DatePicker :disabled="disableMasterAgreementSealless" @on-change="item.approval_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.approval_effective_date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" :prop="'approval_unseal_files.'+key+'.approval_expire_date'" :rules="!disableMasterAgreementSealless?ruleValidate.commontext:[]">
                                <DatePicker :disabled="disableMasterAgreementSealless" @on-change="item.approval_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.approval_expire_date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <FormItem label="备注" :prop="'approval_unseal_files.'+key+'.remark'" :rules="!disableMasterAgreementSealless?ruleValidate.commontext:[]">
                                <Input :disabled="disableMasterAgreementSealless" v-model="item.remark" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="上传人">
                                <Input :disabled="true" v-model="item.uploader"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="上传时间">
                                <Input :disabled="true" v-model="item.upload_time"></Input>
                            </FormItem>
                            </Col>
                        </Row>
                    </Card>
                </Form>
                <Form ref="ref_from6" :rules="ruleValidate" :model="company" :label-width="130">
                    <Card v-for="(item,key) in company.approval_seal_files" :key="key+'r'">
                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">主协议盖章版</span>
                            </Col>
                        </Row>


                        <Row>
                            <Col span="12">
                            <FormItem label="主协议" :prop="'approval_seal_files.'+key+'.approval_attachment'" :rules="!disableMasterAgreement?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="disableMasterAgreement" @clildUpload='clildUpload' :uploadIndex="key" uploadType="approval_seal_files_capture_attachment" :fileList="item.approval_attachment"></CustomUpload>
                            </FormItem>
                            </Col>

                            <Col span="12">
                            <FormItem label="协议类型">
                                <Select disabled v-model="item.protocol_type">
                                     <Option  v-for="item in protocol_type_list" :key="item.code" :value="item.code">{{item.name}}</Option>
                               </Select>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" :prop="'approval_seal_files.'+key+'.approval_effective_date'" :rules="!disableMasterAgreement?ruleValidate.commontext:[]">
                                <DatePicker :disabled="disableMasterAgreement" @on-change="item.approval_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.approval_effective_date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" :prop="'approval_seal_files.'+key+'.approval_expire_date'" :rules="!disableMasterAgreement?ruleValidate.commontext:[]">
                                <DatePicker :disabled="disableMasterAgreement" @on-change="item.approval_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.approval_expire_date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <FormItem label="备注" :prop="'approval_seal_files.'+key+'.remark'" :rules="!disableMasterAgreement?ruleValidate.commontext:[]">
                                <Input :disabled="disableMasterAgreement" v-model="item.remark" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="上传人">
                                <Input :disabled="true" v-model="item.uploader"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="上传时间">
                                <Input :disabled="true" v-model="item.upload_time"></Input>
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


            <Modal v-model="commentShow" width="700" :styles="{top: '230px'}">
                <p slot="header">
                    <span>{{actionname_description}}</span>
                </p>
                <div>
                    <Row>
                        <Col span="24">
                        <Input type="textarea" v-model="comments" :autosize="{minRows: 4,maxRows: 100}" placeholder="请填写理由"></Input>
                        </Col>
                    </Row>
                    <br />
                    <Row v-if="(is_area||is_bu_header||isCreate)&&(actionName === 'approve'||actionName==='restart')">
                        <Col span="24">
                        <Row>
                            <Col span="24">
                            <span class="ivu-form-item-label" style="margin-left:10px;">RPL经销商调查表,点击查看</span>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span="24">
                            <Checkbox style="margin-left:10px;" v-model="is_rpl_confirm">尽我所知，候选经销商及其关联方、分销商均非“限制方名单”上的公司。候选经销商及其关联方、分销商的实际控制人/财务受益人、股东、董事、管理人员、雇员、代理、代表，以及其他任何可能代表候选经销商或其关联方的人士，无论是直接还是间接的，均非“限制方名单”上的个人</Checkbox>
                            </Col>
                        </Row>
                        </Col>
                    </Row>
                    <Row v-show="actionName === 'redirect'">
                        <Col span="3">
                        <span class="custom_label">退回节点:</span>
                        </Col>
                        <Col span="10">

                        <Select v-model="redirectActivityName">
                               <Option v-for="item in redirectActivity" :key="item.name" :value="item.name">{{item.title}}</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div slot="footer">
                    <Button type="primary" @click="taskAction">确定</Button>
                </div>
            </Modal>



            <Modal v-model="rplShow" width="500" :styles="{top: '230px'}">
                <p slot="header">
                    <span>RPL经销商调查表</span>
                </p>
                <div>
                    <br/>
                    <Row>
                        <Col span="24">
                        <span class="ivu-form-item-label" style="margin-left:30px;margin-bottom:20px;">RPL经销商调查表,点击查看</span>
                        </Col>
                    </Row>
                </div>
                <br/>
                <Row>
                    <Col span="24">
                    <Checkbox style="margin-left:30px;" v-model="is_rpl_confirm">尽我所知，候选经销商及其关联方、分销商均非“限制方名单”上的公司。候选经销商及其关联方、分销商的实际控制人/财务受益人、股东、董事、管理人员、雇员、代理、代表，以及其他任何可能代表候选经销商或其关联方的人士，无论是直接还是间接的，均非“限制方名单”上的个人</Checkbox>
                    </Col>
                </Row>
                <br/>
                </div>
                <div slot="footer">
                    <Button type="primary" @click="startWorkflow">确定</Button>
                </div>
            </Modal>


            <Affix :offset-bottom="20" v-if="!isView" v-show="!isCreate&&!isStart&&isAssigned">
                <span class="workflow_approve" @click="validateAll('approve')">通过</span>
            </Affix>

            <Affix :offset-bottom="20" v-if="!isView" v-show="isStart">
                <span class="workflow_resubmit" @click="workflow_resubmit">重新提交</span>
            </Affix>

            <Affix :offset-bottom="20" v-if="!isView" v-show="isStart">
                <span class="workflow_refuse" @click="workflow_refuse">终止</span>
            </Affix>

            <Affix :offset-bottom="20" v-if="!isView" v-show="!isCreate&&!isStart&&isAssigned">
                <span class="workflow_return" @click="workflow_return">退回</span>
            </Affix>

            <Affix :offset-bottom="20" v-if="!isView" v-show="isCreate&&!isStart">
                <span class="workflow_submit" @click="validateAll('submit')">提交</span>
            </Affix>

        </Content>
    </Layout>
</Layout>
</template>

<script>
import {
    mapGetters,
    mapState,
    mapActions
} from "vuex";
import {
    TOKEN,
    startMessage,
    returnMessage,
    commentMessage,
    notRunMessage,
    noParentMessage,
    confirmRPLMessage
} from "../../../api/services/common/const.js";
import enums from "../../../api/services/common/enums.js";
import DistributorMaster from "../../../api/services/Distributor/DistributorMaster.js";
import workflow from "../../../api/services/workflow";
import utils from "../../../api/services/common/utils";

import uiservice from "../../../api/ui-service";


import mixinsmethod from "./mixins";
import WorkflowHistory from "../../../components/WorkflowHistory/WorkflowHistory.vue";
import CustomUpload from "../../../components/CustomUpload.vue";

import EstimationTable from "./EstimationTable.vue";

export default {
    mixins: [mixinsmethod],
    data() {
        return {
            // approved_history: [1, 2, 3],
            is_newcompany: false,
            validateEmail: false,
            validateResult: false,
            isStart: false,
            step: "baseinfo", //控制左边菜单操作
            isCreate: false, //判断是否为新建页面
            isView: false, //判断是否为查看页面
            isApprove: false, //判断是否为审批页面
            commentShow: false, //审批意见的弹出框显示隐藏
            rplShow: false,
            comments: "",
            vendor_id: "",
            guid: "",
            actionName: "",
            actionname_description: "",
            redirectActivityName: "",
            redirectActivity: [],
            workflowHistory: []
        };
    },
    components: {
        WorkflowHistory,
        CustomUpload,
        EstimationTable
    },
    computed: {
        ...mapState("workflow", {
            isAssigned: state => state.task && state.task.status == "ASSIGNED"
        }),
        ...mapGetters([
            "user",
            "GlobalConfig",
            "BU",
            "uploadAttachmentUrl",
            "location_Provices",
            "location_Citys",
            "distribution_mode_List",
            "company_nature1_List",
            "company_nature2_List",
            "payment_type_List",
            "medical_business_license_scope",
            "medical_business_license2_scope",
            "distribution_type_List",
            "distribution_mode_List",
            "apply_type_list",
            "vendor_type_list",
            "protocol_type_list"
        ]),
        regionList: function() {
            if (this.isCreate) {
                var bu = this.user.bu;
                if (typeof this.BU !== "undefined") {
                    return this.BU.find(item => item.bu_code === bu).region_code;
                } else {
                    return [];
                }
            } else {
                var bu = this.company.basic_info.bu;
                if (bu) {
                    return this.BU.find(item => item.bu_code === bu).region_code;
                } else {
                    return [];
                }
            }
        },
        disableMasterAgreementSealless() {
            //是否disable主协议未盖章内容
            //return this.isCreate;
            return !(!this.isCreate &&
                this.$route.query.flow_task_name ===
                enums.VendorProcess.ApproveNode.channel_operate_master_agreement
            );
        },
        disableMasterAgreement() {
            //是否disable主协议盖章内容
            return !(!this.isCreate &&
                this.$route.query.flow_task_name ===
                enums.VendorProcess.ApproveNode
                .channel_operate_master_agreement_signed
            );
        },
        header: function() {
            return {
                Authorization: localStorage.getItem("dms-app-token")
            };
        },
        location_Citys_ByProvices: function() {
            var company_province = this.company.basic_info.company_province;
            // var company_city = this.company.basic_info.company_city;
            return this.location_Citys.filter(
                item => item.province_code === company_province
            );
        },
        approveNode: function() {
            return enums.VendorProcess.ApproveNode;
        },
        is_qa() {
            return (
                this.$route.query.flow_task_name === enums.VendorProcess.ApproveNode.qa
            );
        },
        is_start() {
            return (
                this.$route.query.flow_task_name ===
                enums.VendorProcess.ApproveNode.start
            );
        },
        is_area() {
            return (
                this.$route.query.flow_task_name ===
                enums.VendorProcess.ApproveNode.area
            );
        },
        is_channel_manager: function() {
            return (
                this.$route.query.flow_task_name ===
                enums.VendorProcess.ApproveNode.channel_manager
            );
        },
        is_bu_header: function() {
            return (
                this.$route.query.flow_task_name ===
                enums.VendorProcess.ApproveNode.bu_header
            );
        },
        channel_manager_fill_form: function() {
            return (
                this.$route.query.flow_task_name ===
                enums.VendorProcess.ApproveNode.channel_manager_fill_form
            );
        },
        is_renewcontrac: function() {
            return (
                this.company.apply_info_list[0].apply_type ===
                enums.Status.apply_type_renewcontract_status
            );
        },
        isReturn: function() {
            var flow_task_name = this.$route.query.flow_task_name;
            return (
                flow_task_name === enums.VendorProcess.ApproveNode.channel_operate_dd ||
                flow_task_name ===
                enums.VendorProcess.ApproveNode.channel_operate_master_agreement ||
                flow_task_name ===
                enums.VendorProcess.ApproveNode
                .channel_operate_master_agreement_signed
            );
        },
        isService: function() {
            var vendor_type_code = this.company.apply_info_list[0].vendor_type;
            var vendor = this.vendor_type_list.find(
                item => item.code === vendor_type_code
            );
            if (vendor && vendor.name.endsWith("服务商")) {
                return true;
            } else {
                return false;
            }
        }

        ///是否显示"证件更新"的按钮
        /*         isShowInvalidBtn: function() {
                        return this.company.apply_info_list[0].apply_type === enums.Status.apply_type_renewcontract_status && !this.is_newcompany;
                    } */
    },
    mounted() {
        //判断是否新建还是从任务列表调整////
        if (
            this.$route.params.Action === "View" ||
            this.$route.params.Action === "Approve"
        ) {
            if (this.$route.params.Action === "View") {
                this.isView = true;
            } else {
                this.isApprove = true;
                if (this.is_start) {
                    this.isStart = true;
                    this.isCreate = true;
                }
                //获取退回节点集合
                workflow
                    .getRedirectActivity(
                        this.$route.query.process_id,
                        this.$route.query.task_id
                    )
                    .then(response => {
                        this.redirectActivity = response;
                    });
            }
            //获取vendor信息
            DistributorMaster.getSnapshot(this.$route.query.snapshot_id).then(
                response => {
                    this.company = response.company;
                    this.vendor_id = response.vendor_id;
                    this.guid = response.guid;

                    if (!this.disableMasterAgreementSealless) {
                        this.company.approval_unseal_files[0].uploader = this.user.username;
                        this.company.approval_unseal_files[0].upload_time = utils.curDateTime();
                    }
                    if (!this.disableMasterAgreement) {
                        this.company.approval_seal_files[0].uploader = this.user.username;
                        this.company.approval_seal_files[0].upload_time = utils.curDateTime();
                    }
                }
            );



        } else {
            this.isCreate = true;
            this.company.basic_info.bu = this.user.bu;
        }
    },
    methods: {
        //提交时验证表单
        submit() {

            if (this.validateResult) {
                this.rplShow = true;
            }
        },
        showhistory() {
            //console.log("123");
            this.value3 = true;
        },
        contract_agent_change(key) {
            if (this.company.contacts[key].is_contract_agent) {
                this.company.contacts[key].contract_delegate = "";
                this.company.contacts[key].contract_attachment = null;
            }
        },
        searchParentCompany() {
            var parent_company_name = this.company.parent_company.company_name_cn;
            //console.log(parent_company_name);
            if (parent_company_name !== "" && parent_company_name !== null) {
                DistributorMaster.getDistributorMaster({
                    company_name: parent_company_name
                }).then(response => {
                    if (JSON.stringify(response) !== "[]") {
                        this.company.parent_company.company_id = response[0].vendor_id;
                    } else {
                        this.company.parent_company.company_name_cn = null;
                        this.$Message.error(noParentMessage);
                    }
                });
            }
        },
        searchCompany() {
            if (
                this.company.basic_info.company_name_cn === null ||
                this.company.basic_info.company_name_cn === ""
            )
                return;
            if (!this.isCreate) return;
            DistributorMaster.getDistributorMaster({
                company_name: this.company.basic_info.company_name_cn
            }).then(response => {
                // console.log(response);
                if (JSON.stringify(response) !== "[]") {
                    this.is_newcompany = false;
                    this.validateEmail = true;
                    //代码10为已签约状态
                    //console.log(response[0].status);

                    var can_start_workflow = response[0].can_start_workflow;
                    if (can_start_workflow) {
                        this.vendor_id = response[0].vendor_id;
                        this.guid = response[0].guid;
                        if (response[0].status === enums.Status.contract_status) {
                            var t_company = response[0].company;

                            this.company.basic_info = t_company.basic_info;
                            this.company.manager_info = t_company.manager_info;
                            this.company.contacts = t_company.contacts;
                            this.company.additional_warehouses =
                                t_company.additional_warehouses;
                            this.company.invoice_info = t_company.invoice_info;
                            this.company.business_licenses = t_company.business_licenses;
                            this.company.medical_business_licenses =
                                t_company.medical_business_licenses;
                            this.company.medical_business_license_seconds =
                                t_company.medical_business_license_seconds;
                            this.company.other_licenses = t_company.other_licenses;
                            this.company.provider_personnel_info =
                                t_company.provider_personnel_info;
                            this.company.dd_information_list = t_company.dd_information_list;
                            this.company.application_certificate =
                                t_company.application_certificate;
                            this.company.assessment_info = t_company.assessment_info;
                            //this.company.approval_seal_files = t_company.approval_seal_files;
                            //this.company.approval_unseal_files = t_company.approval_unseal_files;
                            //console.log(t_company.parent_company);
                            if (t_company.parent_company) {
                                this.company.parent_company = t_company.parent_company;
                            } else {
                                this.company.parent_company = {
                                    company_name_cn: null
                                };
                            }
                            //返回的apply_info_list的信息存在到另外一个数组
                            this.apply_info_list = JSON.parse(
                                JSON.stringify(t_company.apply_info_list)
                            );
                            //this.validateAll();
                        }
                    } else {
                        this.company.basic_info.company_name_cn = "";
                        this.$Message.error(notRunMessage);
                    }
                } else {
                    this.is_newcompany = true;
                }
            });
        },
        approvePost() {
            //console.log(this.company);

            this.commentShow = false;
            DistributorMaster.approve_Workflow(
                this.$route.query.process_id,
                this.$route.query.task_id,
                this.$route.query.flow_task_name,
                this.guid,
                this.company,
                this.comments,
                this.actionName,
                this.vendor_id
            );
        },
        //审批操作
        taskAction() {
            //console.log(this.company);
            if (
                this.actionName === "approve" ||
                this.actionName === "restart" ||
                this.actionName === "refuse"
            ) {
                if (this.actionName === "refuse") {
                    this.approvePost();
                } else {
                    if (this.is_bu_header || this.is_area || this.is_start) {
                        if (this.is_rpl_confirm) {
                            this.approvePost();
                        } else {
                            this.$Message.error(confirmRPLMessage);
                        }
                    } else {
                        this.approvePost();
                    }
                }
            } else if (this.actionName === "redirect") {
                if (this.redirectActivityName !== "") {
                    if (this.comments !== "") {
                        this.commentShow = false;
                        DistributorMaster.redirect_Workflow(
                            this.$route.query.process_id,
                            this.$route.query.task_id,
                            this.redirectActivityName,
                            this.guid,
                            this.company,
                            this.comments,
                            this.actionName,
                            this.vendor_id
                        );
                    } else {
                        this.$Message.error(commentMessage);
                    }
                } else {
                    this.$Message.error(returnMessage);
                }
            }
        },
        //发起流程
        startWorkflow() {
            if (this.is_rpl_confirm) {
                //delete this.company.dd_information_list;
                //console.log(this.company)
                var company = {
                    company: this.company
                };
                //console.log(company);
                //如果不是服务商，删除该节点
                if (!this.isService) {
                    delete this.company.provider_personnel_info;
                }

                //判断是否为新公司
                if (this.is_newcompany) {
                    this.rplShow = false;
                    DistributorMaster.saveDistributorMaster(company).then(response => {
                        let postData = {
                            vendor_id: response.vendor_id,
                            guid: response.guid,
                            data: {
                                company: this.company
                            }
                        };
                        DistributorMaster.start_Workflow(postData);
                    });
                } else {
                    this.rplShow = false;
                    DistributorMaster.start_Workflow({
                        vendor_id: this.vendor_id,
                        guid: this.guid,
                        data: {
                            company: this.company
                        }
                    });
                }
            } else {
                this.$Message.error(confirmRPLMessage);
            }
        }
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
    width: 400px;
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

.ivu-layout-content {
    margin-top: 26px;
    background: rgba(242, 242, 242, 1);
}

.flow_menu:hover {
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
    border-color: #eee;
}

.dms-process {
    margin-left: 60px;
    padding-top: 45px;
}


/* .ivu-checkbox-wrapper {
    margin-top: 7px;
} */
</style>


