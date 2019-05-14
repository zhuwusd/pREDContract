<template>
<div class="inetention">

    <div v-show="step==='agentintention'&&!this.$route.query.guid">
        <Card>
            <Row style="margin-bottom: 30px">
                <Col span="12">
                <span class="contentTitle">代理意向</span>
                </Col>
                <Col span="12" style="text-align:right">
                <Button type="dashed" icon="md-add-circle" @click="add_agent_intention_list()">添加</Button>
                </Col>
            </Row>
            <div v-for="(item,key) in  company.agent_intention_list" :key="key">
                <Divider v-show="key>0" />
                <Form ref="agent_intention_list" :model="item" :rules="ruleValidate" :label-width="120">


                    <Row style="margin-bottom: 30px">

                        <Col span="23">
                        <span class="contentTitle_small">{{`代理意向${key+1}`}}</span>
                        </Col>

                        <Col span="1" style="text-align:center">
                        <Tooltip v-show="company.agent_intention_list.length>1" content="删除" placement="right-end">
                            <span style="cursor:pointer" @click="delete_agent_intention_list(key)"> <Icon type="md-close" /></span>
                        </Tooltip>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="经销商类型">
                            <Select v-model="item.distribution_type" placeholder="请选择经销商类型">
                            <Option  v-for="(distribution_type_item,key) in distribution_type_List" :value="distribution_type_item.code"  :key="key">{{distribution_type_item.name}}</Option>
                         </Select>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="上级经销商名称">
                            <Input v-model="item.upper_distribution" placeholder="请输入上级经销商名称"></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="24">
                        <FormItem label="经销模式">
                            <RadioGroup v-model="item.distribution_mode">
                                <Radio v-for="(distribution_mode_item,key) in distribution_mode_List" :key="key+'a'" :label="distribution_mode_item.code"> <span>{{distribution_mode_item.name}}</span></Radio>
                            </RadioGroup>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="联系人">
                            <Input v-model="item.contact_name" placeholder="请输入联系人"></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="联系电话">
                            <Input v-model="item.contact_phone" placeholder="请输入联系电话"></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="申请代理生效日期" prop="agent_effective_date">
                            <DatePicker @on-change="item.agent_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.agent_effective_date" placeholder="请选择代理生效日期"></DatePicker>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="申请代理终止日期" prop="agent_expire_date">
                            <DatePicker @on-change="item.agent_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.agent_expire_date" placeholder="请选择代理终止日期"></DatePicker>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="申请BU">
                            <Select v-model="item.agent_intention_bu" placeholder="请选择申请BU">
                                 <Option  v-for="item in BU" :value="item.bu_code"  :key="item.bu_code">{{item.bu_name}}</Option>
                            </Select>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="是否为现有经销商">
                            <i-switch v-model="item.is_existing_distribution" size="large">
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="24">
                        <FormItem label="申请授权医院">
                            <Button type="dashed" @click="hospitalShow=true">添加</Button>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row type="flex" justify="center" class="code-row-bg">
                        <Col span="23">
                        <Hospital @closeHospital="hospitalShow=false" :hosptialIndex="key" :hosptialList="item.agent_intention_areas" @setHospital="setHospital" :displayHospital="hospitalShow"></Hospital>
                        </Col>
                    </Row>
                    <br>
                    <Row>
                        <Col span="12">
                        <FormItem label="产品经销年限" prop="apply_years">
                            <Input v-model="item.apply_years" placeholder="请输入产品经销年限"></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="预计首次进货量" prop="first_purchase_qty">
                            <Input v-model="item.first_purchase_qty" placeholder="请输入预计首次进货量"></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="预计渠道开发量" prop="channel_volume_forecast">
                            <Input v-model="item.channel_volume_forecast" placeholder="请输入预计渠道开发量"></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="第一年销售指标" prop="sales_target_first_year">
                            <Input v-model="item.sales_target_first_year" placeholder="请输入第一年销售指标"></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="24">
                        <FormItem label="备注">
                            <Input v-model="item.remark" type="textarea" :autosize="{minRows: 8,maxRows: 100}" placeholder="请输入备注"></Input>
                        </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Card>

    </div>

    <Form :model="company" :label-width="120">

        <div v-show="step==='baseinfo'">
            <Card>

                <Row style="margin-bottom: 30px">
                    <Col span="12">
                    <span class="contentTitle">公司基本信息</span>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="公司名称">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.company_name_cn"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="公司英文名">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.company_name_en"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="省份">
                        <Select :disabled="isView||!is_Edit" v-model="company.basic_info.company_province" @on-change="company.basic_info.company_city=''">
                          <Option  v-for="(item,key) in location_Provices" :key="key+'y'" :value="item.province_code">{{item.province_name}}</Option>
                       </Select>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="城市">
                        <Select :disabled="isView||!is_Edit" v-model="company.basic_info.company_city">
                           <Option v-for="item in location_Citys_ByProvices" :key="item.city_code" :value="item.city_code">{{item.city_name}}</Option>
                        </Select>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="公司注册地址">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.registered_address_cn"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="注册地址英文">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.registered_address_en"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="注册资本">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.registered_capital"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="传真">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.fax"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="法定代表人">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.legal_representative"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="捷迈对口人">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.business_contact"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="主协议生效时间">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="company.basic_info.starttime=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="company.basic_info.starttime"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="主协议失效时间">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="company.basic_info.endtime=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="company.basic_info.endtime"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="SAP ID">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.sap_id"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="状态">
                        <Input :disabled="isView||!is_Edit" v-model="company.basic_info.status"></Input>
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
                    <FormItem label="股东">
                        <Input :disabled="isView||!is_Edit" v-model="company.manager_info.shareholders"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="董事">
                        <Input :disabled="isView||!is_Edit" v-model="company.manager_info.director"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="监事">
                        <Input :disabled="isView||!is_Edit" v-model="company.manager_info.supervisor"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="实际控制人">
                        <Input :disabled="isView||!is_Edit" v-model="company.manager_info.financial_beneficiary"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="总经理">
                        <Input :disabled="isView||!is_Edit" v-model="company.manager_info.general_manager"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="其他管理人员">
                        <Input :disabled="isView||!is_Edit" v-model="company.manager_info.other_manager"></Input>
                    </FormItem>
                    </Col>
                </Row>
            </Card>

            <Card>

                <Row style="margin-bottom: 30px">
                    <Col span="12">
                    <span class="contentTitle">联系人信息</span>
                    </Col>
                    <Col span="12" style="text-align:right">
                    <Button v-if="is_Edit" type="dashed" icon="md-add-circle" @click="add_contact()">添加</Button>
                    </Col>
                </Row>

                <div v-for="(item,key) in  company.contacts" :key="key+'a'">
                    <Divider v-show="key>0" />

                    <Row style="margin-bottom: 30px">

                        <Col span="23">
                        <span class="contentTitle_small">{{`联系人信息${key+1}`}}</span>
                        </Col>

                        <Col span="1" style="text-align:center">
                        <Tooltip v-show="company.contacts.length>1&&is_Edit" content="删除" placement="right-end">
                            <span style="cursor:pointer" @click="delete_contacts(key)"> <Icon type="md-close" /></span>
                        </Tooltip>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="24">
                        <FormItem label="BU">
                            <CheckboxGroup v-model="item.contract_bu">
                                <Checkbox :disabled="isView||!is_Edit" v-for="(item,key) in BU" :key="key+'f'" :label="item.bu_code"><span>{{item.bu_name}}</span></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="合同签约人">
                            <Input :disabled="isView||!is_Edit" v-model="item.contract_agent"></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="合同签约人是否法定代表人" :label-width="200">
                            <i-switch :disabled="isView||!is_Edit" v-model="item.is_contract_agent" size="large">
                                <span slot="open">是</span>
                                <span slot="close">否</span>
                            </i-switch>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="委托附件">
                            <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="contract_attachment" :fileList="item.contract_attachment"></CustomUpload>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="合同收件人">
                            <Input :disabled="isView||!is_Edit" v-model="item.contract_recipient"></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="合同收件人电话">
                            <Input :disabled="isView||!is_Edit" v-model="item.contract_recipient_phone"></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="合同邮寄地址">
                            <Input :disabled="isView||!is_Edit" v-model="item.contract_mail_address"></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="合同邮件邮编">
                            <Input :disabled="isView||!is_Edit" v-model="item.contract_mail_postcode"></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="业务联系人">
                            <Input :disabled="isView||!is_Edit" v-model="item.business_contact"></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="业务联系邮箱">
                            <Input :disabled="isView||!is_Edit" v-model="item.business_contact_email"></Input>
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
                    <Col span="12" style="text-align:right">
                    <Button v-if="is_Edit" type="dashed" icon="md-add-circle" @click="add_additional_warehouses()">添加</Button>
                    </Col>
                </Row>
                <div v-for="(item,key) in  company.additional_warehouses" :key="key+'b'">
                    <Divider v-show="key>0" />

                    <Row style="margin-bottom: 30px">

                        <Col span="23">
                        <span class="contentTitle_small">{{`收货地址${key+1}`}}</span>
                        </Col>

                        <Col span="1" style="text-align:center">
                        <Tooltip v-show="company.additional_warehouses.length>1&&is_Edit" content="删除" placement="right-end">
                            <span style="cursor:pointer" @click="delete_additional_warehouses(key)"> <Icon type="md-close" /></span>
                        </Tooltip>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="24">
                        <FormItem label="BU">
                            <CheckboxGroup v-model="item.additional_warehouses_bu">
                                <Checkbox :disabled="isView||!is_Edit" v-for="item in BU" :key="item.bu_code" :label="item.bu_code"><span>{{item.bu_name}}</span></Checkbox>
                            </CheckboxGroup>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="收货方">
                            <Input :disabled="isView||!is_Edit" v-model="item.receiving_party"></Input>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="收货地址">
                            <Input :disabled="isView||!is_Edit" v-model="item.receiving_address"></Input>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="营业执照">
                            <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_license_attachment" :fileList="item.warehouse_license_attachment"></CustomUpload>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="二类医疗许可">
                            <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_medical_license2_attachment" :fileList="item.warehouse_medical_license2_attachment"></CustomUpload>
                        </FormItem>
                        </Col>
                    </Row>

                    <Row>
                        <Col span="12">
                        <FormItem label="医疗许可">
                            <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_medical_license_attachment" :fileList="item.warehouse_medical_license_attachment"></CustomUpload>
                        </FormItem>
                        </Col>
                        <Col span="12">
                        <FormItem label="声明">
                            <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_declare_attachment" :fileList="item.warehouse_declare_attachment"></CustomUpload>
                        </FormItem>
                        </Col>
                    </Row>
                </div>
            </Card>
        </div>

        <div v-show="step==='companycertificates'">
            <Card v-for="(item,key) in company.business_licenses" :key="key+'d'">

                <Row style="margin-bottom: 30px">
                    <Col span="12">
                    <span class="contentTitle">营业执照</span>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="编号">
                        <Input :disabled="isView||!is_Edit" v-model="item.license_no"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="发证机构">
                        <Input :disabled="isView||!is_Edit" v-model="item.license_certification_body"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="生效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.license_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.license_effective_date"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="失效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.license_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.license_expire_date"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="营业执照">
                        <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="business_license_attachment" :fileList="item.business_license_attachment"></CustomUpload>
                    </FormItem>
                    </Col>
                </Row>
            </Card>

            <Card v-for="(item,key) in company.medical_business_licenses" :key="key+'e'">

                <Row style="margin-bottom: 30px">
                    <Col span="12">
                    <span class="contentTitle">医疗器械经营许可证</span>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="编号">
                        <Input :disabled="isView||!is_Edit" v-model="item.medical_business_license_no"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="发证机构">
                        <Input :disabled="isView||!is_Edit" v-model="item.medical_business_license_certification_body"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="生效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.medical_business_license_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.medical_business_license_effective_date"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="失效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.medical_business_license_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.medical_business_license_expire_date"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row v-for="(item,key) in  item.medical_warehouses" :key="key+'f'">
                    <Col span="12">
                    <FormItem label="仓库地址">
                        <Input :disabled="isView||!is_Edit" v-model="item.warehouse_address" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="仓库面积">
                        <Input :disabled="isView||!is_Edit" v-model="item.warehouse_area" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                    <FormItem label="经营范围">
                        <CheckboxGroup v-model="item.medical_business_license_business_scope">
                            <Row>
                                <Checkbox :disabled="isView||!is_Edit" v-for="item in medical_business_license_scope" :key="item.code" :label="item.code">{{item.name}}</Checkbox>
                            </Row>
                        </CheckboxGroup>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="许可证">
                        <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="medical_business_license_attachment" :fileList="item.medical_business_license_attachment"></CustomUpload>
                    </FormItem>
                    </Col>
                </Row>
            </Card>

            <Card v-for="(item,key) in company.medical_business_license_seconds" :key="key+'g'">

                <Row style="margin-bottom: 30px">
                    <Col span="12">
                    <span class="contentTitle">第二类医疗器械经营备案</span>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="编号">
                        <Input :disabled="isView||!is_Edit" v-model="item.medical_business_license2_no"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="发证机构">
                        <Input :disabled="isView||!is_Edit" v-model="item.medical_business_license2_certification_body"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="备案日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.medical_business_license2_record_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.medical_business_license2_record_date"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row v-for="(item,key) in  item.medical_second_warehouses" :key="key+'h'">
                    <Col span="12">
                    <FormItem label="仓库地址">
                        <Input :disabled="isView||!is_Edit" v-model="item.warehouse_address" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="仓库面积">
                        <Input :disabled="isView||!is_Edit" v-model="item.warehouse_area" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                    <FormItem label="经营范围">
                        <CheckboxGroup v-model="item.medical_business_license2_business_scope">
                            <Row>
                                <Checkbox :disabled="isView||!is_Edit" v-for="item in medical_business_license2_scope" :key="item.code" :label="item.code">{{item.name}}</Checkbox>
                            </Row>
                        </CheckboxGroup>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="许可证">
                        <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="medical_business_license2_attachment" :fileList="item.medical_business_license2_attachment"></CustomUpload>
                    </FormItem>
                    </Col>
                </Row>
            </Card>

            <Card v-for="(item,key) in company.other_licenses" :key="key+'c'">
                <Row style="margin-bottom: 30px">
                    <Col span="12">
                    <span class="contentTitle">其他证件</span>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="编号">
                        <Input :disabled="isView||!is_Edit" v-model="item.license_no"></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="发证机构">
                        <Input :disabled="isView||!is_Edit" v-model="item.license_certification_body"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="生效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.license_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.license_effective_date"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="失效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.license_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.license_expire_date"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                    <FormItem label="备注">
                        <Input :disabled="isView||!is_Edit" v-model="item.remark" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="其他材料">
                        <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="other_license_attachment" :fileList="item.other_license_attachment"></CustomUpload>
                    </FormItem>
                    </Col>
                </Row>
            </Card>

            <Card v-for="(item,key) in company.dd_information_list" :key="key+'h'">

                <Row style="margin-bottom: 30px">
                    <Col span="12">
                    <span class="contentTitle">DD信息</span>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="编号">
                        <Input :disabled="isView||!is_Edit" v-model="item.dd_code"></Input>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="生效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.dd_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.dd_effective_date"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="失效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.dd_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.dd_expire_date"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="截图">
                        <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="capture_attachment" :fileList="item.capture_attachment"></CustomUpload>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="批复邮件">
                        <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="reply_attachment" :fileList="item.reply_attachment"></CustomUpload>
                    </FormItem>
                    </Col>
                </Row>
            </Card>
        </div>
    </Form>

    <Form ref="ref_approvefile" :model="company" :label-width="130">
        <div v-show="step==='approvefile'">
            <Card v-for="(item,key) in company.approval_unseal_files" :key="key+'w'">
                <Row style="margin-bottom: 30px">
                    <Col span="12">
                    <span class="contentTitle">主协议未盖章版</span>
                    </Col>
                </Row>


                <Row>
                    <Col span="12">
                    <FormItem label="主协议">
                        <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="approval_unseal_files_capture_attachment" :fileList="item.approval_attachment"></CustomUpload>
                    </FormItem>
                    </Col>

                    <Col span="12">
                    <FormItem label="协议类型">
                        <Select :disabled="isView||!is_Edit" v-model="item.protocol_type">
                                     <Option  v-for="item in protocol_type_list" :key="item.code" :value="item.code">{{item.name}}</Option>
                               </Select>
                    </FormItem>
                    </Col>
                </Row>



                <Row>
                    <Col span="12">
                    <FormItem label="生效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.approval_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.approval_effective_date"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="失效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.approval_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.approval_expire_date"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                    <FormItem label="备注">
                        <Input :disabled="isView||!is_Edit" v-model="item.remark" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
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

            <Card v-for="(item,key) in company.approval_seal_files" :key="key+'r'">
                <Row style="margin-bottom: 30px">
                    <Col span="12">
                    <span class="contentTitle">主协议盖章版</span>
                    </Col>
                </Row>


                <Row>
                    <Col span="12">
                    <FormItem label="主协议">
                        <CustomUpload :customDisabled="isView||!is_Edit" @clildUpload='clildUpload' :uploadIndex="key" uploadType="approval_seal_files_capture_attachment" :fileList="item.approval_attachment"></CustomUpload>
                    </FormItem>
                    </Col>

                    <Col span="12">
                    <FormItem label="协议类型">
                        <Select :disabled="isView||!is_Edit" v-model="item.protocol_type">
                                     <Option  v-for="item in protocol_type_list" :key="item.code" :value="item.code">{{item.name}}</Option>
                               </Select>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="12">
                    <FormItem label="生效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.approval_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.approval_effective_date"></DatePicker>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="失效日期">
                        <DatePicker :disabled="isView||!is_Edit" @on-change="item.approval_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="item.approval_expire_date"></DatePicker>
                    </FormItem>
                    </Col>
                </Row>

                <Row>
                    <Col span="24">
                    <FormItem label="备注">
                        <Input :disabled="isView||!is_Edit" v-model="item.remark" type="textarea" :autosize="{minRows: 4,maxRows: 100}"></Input>
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
        </div>
    </Form>

    <Affix :offset-bottom="20" v-if="!isView">
        <span class="workflow_submit" @click="submit()">提交</span>
    </Affix>




</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import {
    TOKEN
} from "../../api/services/common/const.js";
import DistributorMaster from "../../api/services/Distributor/DistributorMaster.js";
import {
    missingDataMessage,
    errorMessage,
    successMessage
} from "../../api/services/common/const.js";
import webfunction from "../../api/services/webfunction.js";
import mixinsmethod from "./mixins";
import enums from "../../api/services/common/enums";
import Hospital from "../../components/Hospitals.vue";
import CustomUpload from "../../components/CustomUpload.vue";
export default {
    mixins: [mixinsmethod],
    data() {
        return {
            step: "agentintention",
            hospitalShow: false,
            is_direct_choose: true,
            ruleValidate: {
                distribution_type: [{
                    required: true,
                    message: "请选择经销商类型",
                    trigger: "change"
                }],
                upper_distribution: [{
                    required: true,
                    message: "请输入上级经销商名称",
                    trigger: "blur"
                }],
                distribution_mode: [{
                    required: true,
                    message: "请选择经销模式",
                    trigger: "change"
                }],
                contact_name: [{
                    required: true,
                    message: "请输入联系人",
                    trigger: "blur"
                }],
                contact_phone: [{
                    required: true,
                    message: "请输入联系电话",
                    trigger: "blur"
                }],
                agent_effective_date: [{
                    required: true,
                    type: "string",
                    message: "请选择代理生效日期",
                    trigger: "change"
                }],
                agent_expire_date: [{
                    required: true,
                    type: "string",
                    message: "请选择代理终止日期",
                    trigger: "change"
                }],
                product_line_level: [{
                    required: true,
                    message: "请选择申请产品线",
                    trigger: "change"
                }],
                apply_years: [{
                    required: true,
                    message: "请输入产品经销年限",
                    trigger: "blur"
                }],
                first_purchase_qty: [{
                    required: true,
                    message: "请输入预计首次进货量",
                    trigger: "blur"
                }],
                channel_volume_forecast: [{
                    required: true,
                    message: "请输入预计渠道开发量",
                    trigger: "blur"
                }],
                sales_target_first_year: [{
                    required: true,
                    message: "请输入第一年销售指标",
                    trigger: "blur"
                }]
            }
        };
    },
    //inject: ["p_setStep"],
    computed: {
        ...mapGetters([
            "GlobalConfig",
            "BU",
            "uploadAttachmentUrl",
            "location_Provices",
            "location_Citys",
            "medical_business_license_scope",
            "medical_business_license2_scope",
            "distribution_type_List",
            "distribution_mode_List",
            "protocol_type_list"
        ]),
        header: function() {
            return {
                Authorization: TOKEN
            };
        },
        location_Citys_ByProvices: function() {
            var company_province = this.company.basic_info.company_province;

            return this.location_Citys.filter(
                item => item.province_code === company_province
            );
        },
        is_Edit: function() {
            return this.status === null;
        },
        isView: function() {
            if (this.$route.query.guid) {
                return true;
            } else {
                return false;
            }
        }
    },
    created() {
        if (this.$route.query.guid) {
            DistributorMaster.getDistributorMaster({
                guid: this.$route.query.guid
            }).then(response => {
                if (JSON.stringify(response) !== "[]") {
                    this.company = response[0].company;
                    this.status = response[0].status;
                    console.log(this.company);
                }
            });
        } else {
            DistributorMaster.getDistributorMaster("").then(response => {
                if (JSON.stringify(response) !== "[]") {
                    this.company = response[0].company;
                    this.status = response[0].status;
                }
            });
        }
    },
    watch: {},
    components: {
        Hospital,
        CustomUpload
    },
    methods: {
        submit() {
            if (this.validateData()) {
                console.log(this.company);
                var companydata = {
                    company: this.company
                };
                DistributorMaster.saveDistributorMaster(companydata)
                    .then(response => {
                        this.$Message.success(successMessage);
                    })
                    .catch(err => {
                        if (err) {
                            this.$Message.error(errorMessage);
                        }
                    });
            } else {
                this.$Message.error(missingDataMessage);
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

.ivu-card {
    margin: 0px 0px 10px 0px;
}

.top {
    padding: 10px;
    background: rgba(0, 153, 229, 0.7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
}

.history {
    float: right;
    cursor: pointer;
}

.ivu-card {
    margin-bottom: 30px;
}

.ivu-date-picker {
    width: 100%;
}

.ivu-table th {
    height: 20px;
}

.ivu-table td {
    height: 20px;
}

.selecttype {
    font-size: 13px;
    font-weight: 700;
    line-height: 18px;
}
</style>
