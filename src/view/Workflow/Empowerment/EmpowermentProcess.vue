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
            <div v-show="step==='baseinfo'">
                <Form ref="ref_from1" :model="company" :rules="ruleValidate" :label-width="110">

                    <card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">经销商基本信息</span>
                            </Col>
                        </Row>

                        <Row v-if="isCreate&&!is_start">
                            <Col span="8">
                            <FormItem label="经销商名称">
                                <Input v-model="filterData.company_name" enter-button />
                            </FormItem>
                            </Col>
                            <Col span="8">
                            <FormItem label="经销商类型">
                                <Select v-model="filterData.vendor_type">
                                     <Option v-for="item in vendor_type_list" :key="item.code" :value="item.code">{{item.name}}</Option>
                               </Select>
                            </FormItem>
                            </Col>
                            <Col span="3" style="text-align:center">
                            <Button type="primary" style="withd:200px" @click="searchEmpowerment">查询</Button>
                            </Col>
                            <br/>
                        </Row>


                        <Row v-if="vendor_id!==null" type="flex" justify="center">
                            <Col span="24">
                            <Table :columns="basicInfo_Column" :data="basicData" :show-header="false"></Table>
                            </Col>
                        </Row>


                        <br/>
                    </card>

                    <card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">联系人信息</span>
                            </Col>
                        </Row>



                        <div v-for="(item,key) in company.contacts" :key="key">

                            <Row v-if="vendor_id!==null&&(is_start||isCreate)">
                                <Col span="24">
                                <FormItem label="选择已有联系人">
                                    <Button type="dashed" v-if="isCreate" @click="selectContractModel=true">选择已有联系人</Button>
                                    <Button type="dashed" v-if="isCreate" @click="resetContract">重置联系人</Button>
                                </FormItem>
                                </Col>
                            </Row>


                            <Row>
                                <Col span="12">
                                <FormItem label="合同签约人" :prop="'contacts.'+key+'.contract_agent'" :rules="isCreate?ruleValidate.contract_agent:[]">
                                    <Input :disabled="!isCreate||item.contract_id>0" v-model="item.contract_agent"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="合同签约人是否法定代表人" :prop="'contacts.'+key+'.is_contract_agent'" :rules="isCreate?ruleValidate.is_contract_agent:[]" :label-width="200">
                                    <i-switch :disabled="!isCreate||item.contract_id>0" v-model="item.is_contract_agent" size="large">
                                        <span slot="open">是</span>
                                        <span slot="close">否</span>
                                    </i-switch>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row v-show="!item.is_contract_agent">
                                <Col span="12">
                                <FormItem label="法人代表委托" :prop="'contacts.'+key+'.contract_delegate'" :rules="isCreate&&!item.is_contract_agent?ruleValidate.contract_delegate:[]">
                                    <Input :disabled="!isCreate||item.contract_id>0" v-model="item.contract_delegate"></Input>
                                </FormItem>
                                </Col>

                                <Col span="12">
                                <FormItem label="委托附件" :prop="'contacts.'+key+'.contract_attachment'" :rules="isCreate&&!item.is_contract_agent?ruleValidate.attachment:[]">
                                    <CustomUpload :customDisabled="!isCreate||item.contract_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="contract_attachment" :fileList="item.contract_attachment"></CustomUpload>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="合同收件人" :prop="'contacts.'+key+'.contract_recipient'" :rules="isCreate?ruleValidate.contract_recipient:[]">
                                    <Input :disabled="!isCreate||item.contract_id>0" v-model="item.contract_recipient"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="合同收件人电话" :prop="'contacts.'+key+'.contract_recipient_phone'" :rules="isCreate?ruleValidate.contract_recipient_phone:[]">
                                    <Input :disabled="!isCreate||item.contract_id>0" v-model="item.contract_recipient_phone"></Input>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="合同邮寄地址" :prop="'contacts.'+key+'.contract_mail_address'" :rules="isCreate?ruleValidate.contract_mail_address:[]">
                                    <Input :disabled="!isCreate||item.contract_id>0" v-model="item.contract_mail_address"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="合同邮寄邮编" :prop="'contacts.'+key+'.contract_mail_postcode'" :rules="isCreate?ruleValidate.contract_mail_postcode:[]">
                                    <Input :disabled="!isCreate||item.contract_id>0" v-model="item.contract_mail_postcode"></Input>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="业务联系人" :prop="'contacts.'+key+'.business_contact'" :rules="isCreate?ruleValidate.business_contact:[]">
                                    <Input :disabled="!isCreate||item.contract_id>0" v-model="item.business_contact"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="业务联系邮箱" :prop="'contacts.'+key+'.business_contact_email'" :rules="isCreate?ruleValidate.business_contact_email:[]">
                                    <Input :disabled="!isCreate||item.contract_id>0" v-model="item.business_contact_email"></Input>
                                </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </card>


                    <card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">第三方收货地址</span>
                            </Col>
                        </Row>

                        <Row v-if="isCreate||is_start">
                            <Col span="24">
                            <FormItem label="仓库">
                                <Button v-if="vendor_id!==null&&(is_start||isCreate)" type="dashed" @click="selectWarehousesModel=true">选择已有仓库</Button>
                                <Button type="dashed" v-if="isCreate||is_start" @click="addNewWarehouses">新增仓库</Button>
                            </FormItem>
                            </Col>
                        </Row>
                        <div v-for="(item,key) in company.additional_warehouses" :key="key">
                            <Divider v-if="key>0" />

                            <Row style="margin-bottom: 30px">

                                <Col span="23">
                                <span class="contentTitle_small">{{item.additional_warehouses_id>0?`${item.receiving_party}(已审核)`:`仓库信息(新增)`}}</span>
                                </Col>

                                <Col span="1" style="text-align:center">
                                <Tooltip v-show="isCreate" content="删除" placement="right-end">
                                    <span style="cursor:pointer" @click="delete_warehouses(key)"> <Icon type="md-close" /></span>
                                </Tooltip>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="收货方" :prop="'additional_warehouses.'+key+'.receiving_party'" :rules="isCreate?ruleValidate.receiving_party:[]">
                                    <Input :disabled="!isCreate||item.additional_warehouses_id>0" v-model="item.receiving_party" placeholder="请输入收货方"></Input>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="收货地址" :prop="'additional_warehouses.'+key+'.receiving_address'" :rules="isCreate?ruleValidate.receiving_address:[]">
                                    <Input :disabled="!isCreate||item.additional_warehouses_id>0" v-model="item.receiving_address" placeholder="请输入收货地址"></Input>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="营业执照" :prop="'additional_warehouses.'+key+'.warehouse_license_attachment'" :rules="isCreate?ruleValidate.attachment:[]">
                                    <CustomUpload :customDisabled="!isCreate||item.additional_warehouses_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_license_attachment" :fileList="item.warehouse_license_attachment"></CustomUpload>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="二类医疗许可" :prop="'additional_warehouses.'+key+'.warehouse_medical_license2_attachment'" :rules="isCreate?ruleValidate.attachment:[]">
                                    <CustomUpload :customDisabled="!isCreate||item.additional_warehouses_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_medical_license2_attachment" :fileList="item.warehouse_medical_license2_attachment"></CustomUpload>
                                </FormItem>
                                </Col>
                            </Row>

                            <Row>
                                <Col span="12">
                                <FormItem label="医疗许可" :prop="'additional_warehouses.'+key+'.warehouse_medical_license_attachment'" :rules="isCreate?ruleValidate.attachment:[]">
                                    <CustomUpload :customDisabled="!isCreate||item.additional_warehouses_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_medical_license_attachment" :fileList="item.warehouse_medical_license_attachment"></CustomUpload>
                                </FormItem>
                                </Col>
                                <Col span="12">
                                <FormItem label="声明" :prop="'additional_warehouses.'+key+'.warehouse_declare_attachment'" :rules="isCreate?ruleValidate.attachment:[]">
                                    <CustomUpload :customDisabled="!isCreate||item.additional_warehouses_id>0" @clildUpload='clildUpload' :uploadIndex="key" uploadType="warehouse_declare_attachment" :fileList="item.warehouse_declare_attachment"></CustomUpload>
                                </FormItem>
                                </Col>
                            </Row>
                        </div>
                    </card>

                    <card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">授权产品信息</span>
                            </Col>
                        </Row>

                        <Row v-if="false">
                            <Col span="12">
                            <FormItem label="经销商类型">
                                <RadioGroup v-model="company.empowerment_info.empowerment_product.distribution_type">
                                    <Radio :disabled="!isCreate" v-for="(item,key) in distribution_type2_list" :key="key+'a'" :label="item.code"> <span>{{item.name}}</span></Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                        </Row>



                        <Row>
                            <Col span="24">
                            <FormItem label="产品线">
                                <Button type="dashed" v-if="isCreate" @click="productShow=true">编辑</Button>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="22">
                            <ProductLine @closeProduct="productShow=false" @setProductLine="setProductLine" :masterproductLineList="company.empowerment_info.empowerment_product.product_line" :displayProduct="productShow"></ProductLine>
                            </Col>
                        </Row>


                    </card>

                    <card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">授权区域信息</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="所属销售区域" prop="empowerment_info.empowerment_product.selling_region" :rules="isCreate?ruleValidate.selling_region:[]">
                                <CheckboxGroup v-model="company.empowerment_info.empowerment_product.selling_region">
                                    <Row>
                                        <Checkbox :disabled="!isCreate" v-for="region_item in bu_region" :key="region_item.region_code" :label="region_item.region_code">{{region_item.region_name}}</Checkbox>
                                    </Row>
                                </CheckboxGroup>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="经销模式" prop="empowerment_info.empowerment_product.empowerment_area_info.distribution_mode" :rules="isCreate?ruleValidate.distribution_mode:[]">
                                <RadioGroup v-model="company.empowerment_info.empowerment_product.empowerment_area_info.distribution_mode">
                                    <Radio :disabled="!isCreate" v-for="(distribution_mode_item,key) in distribution_mode_List" :key="key+'a'" :label="distribution_mode_item.code"> <span>{{distribution_mode_item.name}}</span></Radio>
                                </RadioGroup>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="授权开始日期" prop="empowerment_info.empowerment_product.empowerment_effective_date" :rules="isCreate?ruleValidate.empowerment_effective_date:[]">
                                <DatePicker :disabled="!isCreate" @on-change="company.empowerment_info.empowerment_product.empowerment_effective_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="company.empowerment_info.empowerment_product.empowerment_effective_date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="授权终止日期" prop="empowerment_info.empowerment_product.empowerment_expire_date" :rules="isCreate?ruleValidate.empowerment_expire_date:[]">
                                <DatePicker :disabled="!isCreate" @on-change="company.empowerment_info.empowerment_product.empowerment_expire_date=$event" format="yyyy-MM-dd" :editable="false" type="date" :value="company.empowerment_info.empowerment_product.empowerment_expire_date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <FormItem label="授权医院">
                                <Button type="dashed" v-if="isCreate" @click="hospitalShow=true">编辑</Button>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row type="flex" justify="center" class="code-row-bg">
                            <Col span="22">
                            <Hospital @closeHospital="hospitalShow=false" :hosptialList="company.empowerment_info.empowerment_product.empowerment_area_info.empowerment_areas" @setHospital="setHospital" :displayHospital="hospitalShow"></Hospital>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col span="12">
                            <FormItem label="大区经理" prop="empowerment_info.empowerment_product.regional_manager" :rules="isCreate?ruleValidate.regional_manager:[]">
                                <Input :disabled="!isCreate" v-model="company.empowerment_info.empowerment_product.regional_manager"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="地区经理" prop="empowerment_info.empowerment_product.district_manager" :rules="isCreate?ruleValidate.district_manager:[]">
                                <Input :disabled="!isCreate" v-model="company.empowerment_info.empowerment_product.district_manager"></Input>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="销售代表" prop="empowerment_info.empowerment_product.sales_manager" :rules="isCreate?ruleValidate.sales_manager:[]">
                                <Input :disabled="!isCreate" v-model="company.empowerment_info.empowerment_product.sales_manager"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="资质信息确认人" prop="empowerment_info.empowerment_product.sponsor" :rules="isCreate?ruleValidate.sponsor:[]">
                                <Input :disabled="!isCreate" v-model="company.empowerment_info.empowerment_product.sponsor"></Input>
                            </FormItem>
                            </Col>
                        </Row>





                        <Row>
                            <Col span="24">
                            <FormItem label="是否享受返利">
                                <i-switch :disabled="!isCreate" v-model="company.empowerment_info.empowerment_product.empowerment_area_info.is_rebate" size="large">
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>
                            </FormItem>
                            </Col>
                        </Row>
                    </card>


                    <card>
                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">授权书未盖章文件</span>
                            </Col>
                        </Row>
                        <!--                         <Row>
                            <Col span="12">
                            <FormItem label="所属BU">
                                <Select :disabled="!isCreate" v-model="company.empowerment_info.empowerment_file.bu" clearable>
                                   <Option  v-for="item in BU" :value="item.bu_code"  :key="item.bu_code">{{item.bu_name}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row> -->

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" prop="empowerment_info.empowerment_file.effect_date" :rules="is_channel_operate_upload?ruleValidate.effect_date:[]">
                                <DatePicker :disabled="!is_channel_operate_upload" @on-change="company.empowerment_info.empowerment_file.effect_date=$event" :value="company.empowerment_info.empowerment_file.effect_date" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" prop="empowerment_info.empowerment_file.expire_date" :rules="is_channel_operate_upload?ruleValidate.expire_date:[]">
                                <DatePicker :disabled="!is_channel_operate_upload" @on-change="company.empowerment_info.empowerment_file.expire_date=$event" :value="company.empowerment_info.empowerment_file.expire_date" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="上传人">
                                <Input disabled v-model="company.empowerment_info.empowerment_file.uploader"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="授权书" prop="empowerment_info.empowerment_file.empowerment_attachment" :rules="is_channel_operate_upload?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!is_channel_operate_upload" @clildUpload='clildUpload' uploadType="empowerment_attachment" :fileList="company.empowerment_info.empowerment_file.empowerment_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>

                    </card>


                    <card>
                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">授权书盖章文件</span>
                            </Col>
                        </Row>
                        <!--                         <Row>
                            <Col span="12">
                            <FormItem label="所属BU">
                                <Select :disabled="!isCreate" v-model="company.empowerment_info.empowerment_seal_file.bu" clearable>
                                     <Option   v-for="item in BU" :value="item.bu_code"  :key="item.bu_code">{{item.bu_name}}</Option>
                               </Select>
                            </FormItem>
                            </Col>
                        </Row> -->

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" prop="empowerment_info.empowerment_seal_file.effect_date" :rules="is_channel_operate_master_agreement_signed?ruleValidate.effect_date:[]">
                                <DatePicker :disabled="!is_channel_operate_master_agreement_signed" @on-change="company.empowerment_info.empowerment_seal_file.effect_date=$event" :value="company.empowerment_info.empowerment_seal_file.effect_date" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" prop="empowerment_info.empowerment_seal_file.expire_date" :rules="is_channel_operate_master_agreement_signed?ruleValidate.expire_date:[]">
                                <DatePicker :disabled="!is_channel_operate_master_agreement_signed" @on-change="company.empowerment_info.empowerment_seal_file.expire_date=$event" :value="company.empowerment_info.empowerment_seal_file.expire_date" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="上传人">
                                <Input disabled v-model="company.empowerment_info.empowerment_seal_file.uploader"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="授权书" prop="empowerment_info.empowerment_seal_file.empowerment_seal_attachment" :rules="is_channel_operate_master_agreement_signed?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!is_channel_operate_master_agreement_signed" @clildUpload='clildUpload' uploadType="empowerment_seal_attachment" :fileList="company.empowerment_info.empowerment_seal_file.empowerment_seal_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>
                    </card>



                    <card v-if="is_rebate">
                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">返利协议未盖章文件</span>
                            </Col>
                        </Row>
                        <!--                         <Row>
                            <Col span="12">
                            <FormItem label="所属BU">
                                <Select :disabled="!isCreate" v-model="company.empowerment_info.rebate_protocol_file.bu" clearable>
                                  <Option   v-for="item in BU" :value="item.bu_code"  :key="item.bu_code">{{item.bu_name}}</Option>
                               </Select>
                            </FormItem>
                            </Col>
                        </Row> -->

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" prop="empowerment_info.rebate_protocol_file.effect_date" :rules="is_rebate&&is_channel_operate_upload?ruleValidate.effect_date:[]">
                                <DatePicker :disabled="!(is_rebate&&is_channel_operate_upload)" @on-change="company.empowerment_info.rebate_protocol_file.effect_date=$event" :value="company.empowerment_info.rebate_protocol_file.effect_date" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" prop="empowerment_info.rebate_protocol_file.expire_date" :rules="is_rebate&&is_channel_operate_upload?ruleValidate.expire_date:[]">
                                <DatePicker :disabled="!(is_rebate&&is_channel_operate_upload)" @on-change="company.empowerment_info.rebate_protocol_file.expire_date=$event" :value="company.empowerment_info.rebate_protocol_file.expire_date" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="上传人">
                                <Input disabled v-model="company.empowerment_info.rebate_protocol_file.uploader"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="返利协议" prop="empowerment_info.rebate_protocol_file.rebate_protocol_attachment" :rules="is_rebate&&is_channel_operate_upload?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!(is_rebate&&is_channel_operate_upload)" @clildUpload='clildUpload' uploadType="rebate_protocol_attachment" :fileList="company.empowerment_info.rebate_protocol_file.rebate_protocol_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>

                    </card>

                    <card v-if="is_rebate">
                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">返利协议盖章文件</span>
                            </Col>
                        </Row>
                        <!--                         <Row>
                            <Col span="12">
                            <FormItem label="所属BU">
                                <Select :disabled="!isCreate" v-model="company.empowerment_info.rebate_protocol_seal_file.bu" clearable>
                                   <Option  v-for="item in BU" :value="item.bu_code"  :key="item.bu_code">{{item.bu_name}}</Option>
                                </Select>
                            </FormItem>
                            </Col>
                        </Row> -->

                        <Row>
                            <Col span="12">
                            <FormItem label="生效日期" prop="empowerment_info.rebate_protocol_seal_file.effect_date" :rules="is_rebate&&is_channel_operate_master_agreement_signed?ruleValidate.effect_date:[]">
                                <DatePicker :disabled="!(is_rebate&&is_channel_operate_master_agreement_signed)" @on-change="company.empowerment_info.rebate_protocol_seal_file.effect_date=$event" :value="company.empowerment_info.rebate_protocol_seal_file.effect_date" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="失效日期" prop="empowerment_info.rebate_protocol_seal_file.expire_date" :rules="is_rebate&&is_channel_operate_master_agreement_signed?ruleValidate.expire_date:[]">
                                <DatePicker :disabled="!(is_rebate&&is_channel_operate_master_agreement_signed)" @on-change="company.empowerment_info.rebate_protocol_seal_file.expire_date=$event" :value="company.empowerment_info.rebate_protocol_seal_file.expire_date" type="date"></DatePicker>
                            </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="12">
                            <FormItem label="上传人">
                                <Input disabled v-model="company.empowerment_info.rebate_protocol_seal_file.uploader"></Input>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="返利协议" prop="empowerment_info.rebate_protocol_seal_file.rebate_protocol_seal_attachment" :rules="is_rebate&&is_channel_operate_master_agreement_signed?ruleValidate.attachment:[]">
                                <CustomUpload :customDisabled="!(is_rebate&&is_channel_operate_master_agreement_signed)" @clildUpload='clildUpload' uploadType="rebate_protocol_seal_attachment" :fileList="company.empowerment_info.rebate_protocol_seal_file.rebate_protocol_seal_attachment"></CustomUpload>
                            </FormItem>
                            </Col>
                        </Row>

                    </card>

                    <card>

                        <Row style="margin-bottom: 30px">
                            <Col span="12">
                            <span class="contentTitle">指标信息</span>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="24">
                            <FormItem label="是否与母公司共享" :label-width="150">
                                <!-- <RadioGroup v-model="is_share_master" @on-change="changParentShareMaster">
                                    <Radio :disabled="!isCreate" label="是"></Radio>
                                    <Radio :disabled="!isCreate" label="否"></Radio>
                                    <Radio :disabled="!isCreate||exsitParentCompany" label="无母公司"></Radio>
                                </RadioGroup> -->

                                <i-switch :disabled="!isCreate" v-model="company.empowerment_info.empowerment_target.is_share_master" size="large">
                                    <span slot="open">是</span>
                                    <span slot="close">否</span>
                                </i-switch>

                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="1月指标" prop="empowerment_info.empowerment_target.target_jan" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_jan"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="2月指标" prop="empowerment_info.empowerment_target.target_feb" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_feb"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="3月指标" prop="empowerment_info.empowerment_target.target_mar" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_mar"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="4月指标" prop="empowerment_info.empowerment_target.target_apr" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_apr"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="5月指标" prop="empowerment_info.empowerment_target.target_may" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_may"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="6月指标" prop="empowerment_info.empowerment_target.target_june" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_june"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="7月指标" prop="empowerment_info.empowerment_target.target_july" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_july"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="8月指标" prop="empowerment_info.empowerment_target.target_aug" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_aug"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="9月指标" prop="empowerment_info.empowerment_target.target_sep" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_sep"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="10月指标" prop="empowerment_info.empowerment_target.target_oct" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_oct"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="11月指标" prop="empowerment_info.empowerment_target.target_nov" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_nov"></InputNumber>
                            </FormItem>
                            </Col>
                            <Col span="12">
                            <FormItem label="12月指标" prop="empowerment_info.empowerment_target.target_dec" :rules="isCreate?ruleValidate.empowerment_target:[]">
                                <InputNumber :disabled="!isCreate||company.empowerment_info.empowerment_target.is_share_master" :min="0" v-model="company.empowerment_info.empowerment_target.target_dec"></InputNumber>
                            </FormItem>
                            </Col>
                        </Row>

                        <Row>
                            <Col span="12">
                            <FormItem label="总指标">
                                <p class="ivu-input-number-input">{{target_Total}}</p>
                            </FormItem>
                            </Col>
                        </Row>
                    </card>
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
                    <Row v-show="actionName === 'redirect'">
                        <Col span="3">
                        <span class="custom_label">退回节点:</span>
                        </Col>
                        <Col span="10">

                        <Select placeholder="" v-model="redirectActivityName">
                               <Option v-for="item in redirectActivity" :key="item.name" :value="item.name">{{item.title}}</Option>
                            </Select>
                        </Col>
                    </Row>
                </div>
                <div slot="footer">
                    <Button type="primary" @click="taskAction">确定</Button>
                </div>
            </Modal>
            <Affix :offset-bottom="20" v-if="!isView" v-show="!isCreate&&!isStart&&isAssigned">
                <span class="workflow_approve" @click="workflow_approve">通过</span>
            </Affix>

            <Affix :offset-bottom="20" v-if="!isView" v-show="isStart">
                <span class="workflow_resubmit" @click="workflow_resubmit">重新提交</span>
            </Affix>

            <Affix :offset-bottom="20" v-if="!isView" v-show="isStart">
                <span class="workflow_refuse" @click="workflow_refuse">终止</span>
            </Affix>

            <Affix :offset-bottom="20" v-if="!isView" v-show="!isReturn&&!isCreate&&!isStart&&isAssigned">
                <span class="workflow_return" @click="workflow_return">退回</span>
            </Affix>

            <Affix :offset-bottom="20" v-if="!isView" v-show="isCreate&&!isStart">
                <span class="workflow_submit" @click="startWorkflow()">提交</span>
            </Affix>


            <Drawer v-model="selectContractModel" width="900">
                <Row>
                    <Col span="24">
                    <Tabs>
                        <TabPane v-for="(item,key) in contract_bu" :key="key" :label="item.bu_name" :name="item.bu_name">
                            <Collapse accordion>
                                <Panel v-for="(items,index) in item.contacts" :key="index+'a'">
                                    合同签约人:{{items.contract_agent}}
                                    <p slot="content">
                                        <Form :label-width="100">
                                            <Row>
                                                <Col span="12">
                                                <FormItem label="合同签约人">
                                                    <Input v-model="items.contract_agent" disabled></Input>
                                                </FormItem>
                                                </Col>
                                                <Col span="12">
                                                <FormItem label="合同签约人是否法定代表人" :label-width="200">
                                                    <i-switch v-model="items.is_contract_agent" disabled size="large">
                                                        <span slot="open">是</span>
                                                        <span slot="close">否</span>
                                                    </i-switch>
                                                </FormItem>
                                                </Col>
                                            </Row>

                                            <Row v-show="!items.is_contract_agent">
                                                <Col span="12">
                                                <FormItem label="法人代表委托">
                                                    <Input disabled v-model="items.contract_delegate"></Input>
                                                </FormItem>
                                                </Col>

                                                <Col span="12">
                                                <FormItem label="委托附件">
                                                    <CustomUpload :customDisabled="true" @clildUpload='clildUpload' :uploadIndex="key" uploadType="contract_attachment" :fileList="items.contract_attachment"></CustomUpload>
                                                </FormItem>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span="12">
                                                <FormItem label="合同收件人">
                                                    <Input v-model="items.contract_recipient" disabled></Input>
                                                </FormItem>
                                                </Col>
                                                <Col span="12">
                                                <FormItem label="合同收件人电话">
                                                    <Input v-model="items.contract_recipient_phone" disabled></Input>
                                                </FormItem>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span="12">
                                                <FormItem label="合同邮寄地址">
                                                    <Input v-model="items.contract_mail_address" disabled></Input>
                                                </FormItem>
                                                </Col>
                                                <Col span="12">
                                                <FormItem label="合同邮寄邮编">
                                                    <Input v-model="items.contract_mail_postcode" disabled></Input>
                                                </FormItem>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col span="12">
                                                <FormItem label="业务联系人">
                                                    <Input v-model="items.business_contact" disabled></Input>
                                                </FormItem>
                                                </Col>
                                                <Col span="12">
                                                <FormItem label="业务联系邮箱">
                                                    <Input v-model="items.business_contact_email" disabled></Input>
                                                </FormItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span="24" style="text-align:center">
                                                <Button type="primary" style="width:150px;" @click="selectContact(items,key,index)">选择</Button>
                                                <Checkbox style="margin-left:30px;" v-model="items.confirm_current_contact">同意选择当前联系人</Checkbox>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </p>
                                </Panel>
                            </Collapse>
                        </TabPane>
                    </Tabs>
                    </Col>
                </Row>
            </Drawer>

            <Drawer v-if="vendor_id!==null&&(is_start||isCreate)" v-model="selectWarehousesModel" width="900">
                <Row>
                    <Col span="24">
                    <Tabs>
                        <TabPane v-for="(item,key) in additional_warehouses_bu" :key="key" :label="item.bu_name" :name="item.bu_name">
                            <Collapse>
                                <Panel v-for="(items,index) in item.additional_warehouses" :key="index+'a'">
                                    收货方:{{items.receiving_party}}
                                    <p slot="content">
                                        <Form :label-width="100">
                                            <Row>
                                                <Col span="12">
                                                <FormItem label="收获方">
                                                    <Input v-model="items.receiving_party" disabled></Input>
                                                </FormItem>
                                                </Col>
                                                <Col span="12">
                                                <FormItem label="收获地址" :label-width="200">
                                                    <Input v-model="items.receiving_address" disabled></Input>
                                                </FormItem>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span="24" style="text-align:center">
                                                <Button type="primary" style="width:150px;" @click="selectAdditionalWarehouses(items)">选择此仓库信息</Button>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </p>
                                </Panel>
                            </Collapse>
                        </TabPane>
                    </Tabs>
                    </Col>
                </Row>
            </Drawer>
        </Content>
    </Layout>
</Layout>
</template>
<script>
import {
    mapGetters,
    mapState
} from "vuex";
import {
    TOKEN,
    startMessage,
    returnMessage,
    commentMessage,
    notRunMessage,
    mustConfirmContractMessage
} from "../../../api/services/common/const.js";
import Empowerment from "../../../api/services/Empowerment/Empowerment.js";
import WorkflowHistory from "../../../components/WorkflowHistory/WorkflowHistory.vue";
import CustomUpload from "../../../components/CustomUpload.vue";
import enums from "../../../api/services/common/enums.js";
import Hospital from "../../../components/Hospitals.vue";
import workflow from "../../../api/services/workflow";
import ProductLine from "../../../components/ProductLine.vue";
import mixinsmethod from "./mixins";
export default {
    mixins: [mixinsmethod],
    data() {
        return {
            selectContractModel: false,
            selectWarehousesModel: false,
            hospitalShow: false,
            productShow: false,
            exsitParentCompany: false,
            isStart: false,
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
                vendor_type: null
            }
        };
    },
    computed: {
        ...mapState("workflow", {
            isAssigned: state => state.task && state.task.status == "ASSIGNED"
        }),
        ...mapGetters([
            "BU",
            "vendor_type_list",
            "location_Provices",
            "location_Citys",
            "distribution_mode_List",
            "medical_business_license_scope",
            "uploadAttachmentUrl",
            "user",
            "distribution_type2_list"
        ]),
        target_Total: function() {
            return (
                this.company.empowerment_info.empowerment_target.target_jan +
                this.company.empowerment_info.empowerment_target.target_feb +
                this.company.empowerment_info.empowerment_target.target_mar +
                this.company.empowerment_info.empowerment_target.target_apr +
                this.company.empowerment_info.empowerment_target.target_may +
                this.company.empowerment_info.empowerment_target.target_june +
                this.company.empowerment_info.empowerment_target.target_july +
                this.company.empowerment_info.empowerment_target.target_aug +
                this.company.empowerment_info.empowerment_target.target_sep +
                this.company.empowerment_info.empowerment_target.target_oct +
                this.company.empowerment_info.empowerment_target.target_nov +
                this.company.empowerment_info.empowerment_target.target_dec
            );
        },
        is_start: function() {
            return (
                this.$route.query.flow_task_name ===
                enums.VendorProcess.ApproveNode.start
            );
        },
        is_rebate: function() {
            return this.company.empowerment_info.empowerment_product
                .empowerment_area_info.is_rebate;
        },
        is_channel_operate_upload() {
            return (
                this.$route.query.flow_task_name ===
                enums.EmpowermentProcess.ApproveNode.channel_operate_upload
            );
        },
        is_channel_operate_master_agreement_signed() {
            return (
                this.$route.query.flow_task_name ===
                enums.EmpowermentProcess.ApproveNode
                .channel_operate_master_agreement_signed
            );
        },
        isReturn: function() {
            var flow_task_name = this.$route.query.flow_task_name;
            return (
                flow_task_name ===
                enums.EmpowermentProcess.ApproveNode.channel_operate_upload ||
                flow_task_name ===
                enums.EmpowermentProcess.ApproveNode
                .channel_operate_master_agreement_signed ||
                flow_task_name ===
                enums.EmpowermentProcess.ApproveNode.legal_check_sapid ||
                flow_task_name ===
                enums.EmpowermentProcess.ApproveNode.sales_fill_sapid ||
                flow_task_name === enums.EmpowermentProcess.ApproveNode.finance
            );
        },
        bu_region: function() {
            //this.company.empowerment_info.empowerment_product.selling_region = [];

            if (this.isCreate) {
                var bu = this.user.bu;
                if (typeof this.BU !== "undefined") {
                    var regionIndex = this.BU.findIndex(
                        element => element.bu_code === this.user.bu
                    );
                    return regionIndex > -1 ? this.BU[regionIndex].region_code : [];
                }
                //console.log(typeof(this.BU));
                //return []
            } else {
                var bu_code = this.company.basic_info.bu_code;

                if (bu_code) {
                    var regionIndex = this.BU.findIndex(
                        element => element.bu_code === bu_code
                    );
                    return regionIndex > -1 ? this.BU[regionIndex].region_code : [];
                } else {
                    return [];
                }
            }
        },
        target_year: function() {
            return this.company.empowerment_info.empowerment_product
                .empowerment_expire_date;
        },
        is_share_master: function() {
            return this.company.empowerment_info.empowerment_target.is_share_master;
        }
    },
    watch: {
        target_year: function() {
            if (this.target_year) {
                this.company.empowerment_info.empowerment_target.year = Number.parseInt(
                    this.target_year.substr(0, 4)
                );
            } else {
                this.company.empowerment_info.empowerment_target.year = null;
            }
        },
        is_share_master: function() {
            //console.log(this.snapshot_is_share_master);
            /*             if (this.is_share_master === "是") {
                            this.company.empowerment_info.empowerment_target.is_share_master = true;
                        } else if (this.is_share_master === "否") {
                            this.company.empowerment_info.empowerment_target.is_share_master = false;
                        } else {
                            this.company.empowerment_info.empowerment_target.is_share_master = null;
                        } */
            if (this.is_share_master) {
                this.company.empowerment_info.empowerment_target.target_jan = 0;
                this.company.empowerment_info.empowerment_target.target_feb = 0;
                this.company.empowerment_info.empowerment_target.target_mar = 0;
                this.company.empowerment_info.empowerment_target.target_apr = 0;
                this.company.empowerment_info.empowerment_target.target_may = 0;
                this.company.empowerment_info.empowerment_target.target_june = 0;
                this.company.empowerment_info.empowerment_target.target_july = 0;
                this.company.empowerment_info.empowerment_target.target_aug = 0;
                this.company.empowerment_info.empowerment_target.target_sep = 0;
                this.company.empowerment_info.empowerment_target.target_oct = 0;
                this.company.empowerment_info.empowerment_target.target_nov = 0;
                this.company.empowerment_info.empowerment_target.target_dec = 0;
            }
        },
        is_rebate: function() {
            if (this.isCreate || this.is_start) {
                if (this.is_rebate) {
                    this.company.empowerment_info.rebate_protocol_file = {
                        bu: null,
                        effect_date: null,
                        expire_date: null,
                        uploader: null,
                        rebate_protocol_attachment: null
                    };
                    this.company.empowerment_info.rebate_protocol_seal_file = {
                        bu: null,
                        effect_date: null,
                        expire_date: null,
                        uploader: null,
                        rebate_protocol_seal_attachment: null
                    };
                } else {
                    if (this.company.empowerment_info.rebate_protocol_file) {
                        delete this.company.empowerment_info.rebate_protocol_file;
                    }
                    if (this.company.empowerment_info.rebate_protocol_seal_file) {
                        delete this.company.empowerment_info.rebate_protocol_seal_file;
                    }
                }
            }
        }
    },
    mounted() {
        //console.log(this.$route);
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
            Empowerment.getSnapshot(this.$route.query.snapshot_id).then(response => {
                this.vendor_id = response.vendor_id;
                this.guid = response.guid;
                this.company.basic_info = response.basic_info;
                //console.log(response);
                this.company.contacts = response.contacts;
                //console.log(this.company.contacts);
                this.company.additional_warehouses = response.additional_warehouses;
                this.company.empowerment_info = response.empowerment_info;

/*                 var snapshot_is_share_master =
                    response.empowerment_info.empowerment_target.is_share_master;
                if (snapshot_is_share_master === true) {
                    this.is_share_master = "是";
                } else if (snapshot_is_share_master === false) {
                    this.is_share_master = "否";
                } else {
                    this.is_share_master = null;
                } */
                //给查询条件重新赋值进行查询，获取联系人及仓库地址
                this.filterData.company_name = this.company.basic_info.company_name;
                this.filterData.vendor_type = this.company.basic_info.vendor_type;
                //绑定公司基本信息
                this.setBasicinfo();
                //退回到申请人的时候加载联系人，仓库
                if (this.is_start) {
                    this.searchEmpowerment();
                }
                if (this.is_channel_operate_upload) {
                    this.company.empowerment_info.empowerment_file.uploader = this.user.username;
                    this.company.empowerment_info.empowerment_file.bu = this.company.basic_info.bu_code;
                }
                if (this.is_channel_operate_master_agreement_signed) {
                    this.company.empowerment_info.empowerment_seal_file.uploader = this.user.username;
                    this.company.empowerment_info.empowerment_seal_file.bu = this.company.basic_info.bu_code;
                }

                if (this.is_channel_operate_upload && this.is_rebate) {
                    this.company.empowerment_info.rebate_protocol_file.uploader = this.user.username;
                    this.company.empowerment_info.rebate_protocol_file.bu = this.company.basic_info.bu_code;
                }
                if (this.is_channel_operate_master_agreement_signed && this.is_rebate) {
                    this.company.empowerment_info.rebate_protocol_seal_file.uploader = this.user.username;
                    this.company.empowerment_info.rebate_protocol_seal_file.bu = this.company.basic_info.bu_code;
                }
                console.log(this.company);
                //console.log(this.company.empowerment_info.empowerment_target);
                //this.vendor_id = response.vendor_id;
                //this.guid = response.guid;
            });
            // this.isCreate = false;
        } else {
            this.isCreate = true;

            var bu_array = [];
            bu_array.push(this.user.bu);

            this.company.contacts[0].contract_bu = bu_array;
            this.company.empowerment_info.empowerment_product.empowerment_bu = this.user.bu;
            this.company.empowerment_info.empowerment_file.bu = this.user.bu;
            this.company.empowerment_info.empowerment_seal_file.bu = this.user.bu;

            /*             this.company.empowerment_info.empowerment_file.uploader = this.user.username;
                                    this.company.empowerment_info.empowerment_seal_file.uploader = this.user.username;
                                    this.company.empowerment_info.rebate_protocol_file.uploader = this.user.username;
                                    this.company.empowerment_info.rebate_protocol_seal_file.uploader = this.user.username; */

            //console.log(this.company.empowerment_info.empowerment_product.empowerment_bu)
        }
    },
    components: {
        WorkflowHistory,
        Hospital,
        CustomUpload,
        ProductLine
    },
    methods: {
        changParentShareMaster(value) {
            if (value === "是") {
                this.company.empowerment_info.empowerment_target.target_jan = 0;
                this.company.empowerment_info.empowerment_target.target_feb = 0;
                this.company.empowerment_info.empowerment_target.target_mar = 0;
                this.company.empowerment_info.empowerment_target.target_apr = 0;
                this.company.empowerment_info.empowerment_target.target_may = 0;
                this.company.empowerment_info.empowerment_target.target_june = 0;
                this.company.empowerment_info.empowerment_target.target_july = 0;
                this.company.empowerment_info.empowerment_target.target_aug = 0;
                this.company.empowerment_info.empowerment_target.target_sep = 0;
                this.company.empowerment_info.empowerment_target.target_oct = 0;
                this.company.empowerment_info.empowerment_target.target_nov = 0;
                this.company.empowerment_info.empowerment_target.target_dec = 0;
            }
        },
        setHospital: function(value) {
            //this.hospitalShow = false
            this.company.empowerment_info.empowerment_product.empowerment_area_info.empowerment_areas = value;
        },
        startWorkflow() {
            //console.log(this.validateAll());
            if (this.validateAll()) {
                Empowerment.start_Workflow({
                    data: {
                        vendor_id: this.vendor_id,
                        guid: this.guid,
                        basic_info: this.company.basic_info,
                        contacts: this.company.contacts,
                        additional_warehouses: this.company.additional_warehouses,
                        empowerment_info: this.company.empowerment_info
                    }
                });
            }
        },
        //审批操作
        taskAction() {
            //console.log(this.company);
            if (
                this.actionName === "approve" ||
                this.actionName === "restart" ||
                this.actionName === "refuse"
            ) {
                this.commentShow = false;
                Empowerment.approve_Workflow(
                    this.$route.query.process_id,
                    this.$route.query.task_id,
                    this.$route.query.flow_task_name,
                    this.guid,
                    this.company,
                    this.comments,
                    this.actionName,
                    this.vendor_id
                );
            } else if (this.actionName === "redirect") {
                if (this.redirectActivityName !== "") {
                    if (this.comments !== "") {
                        this.commentShow = false;
                        Empowerment.redirect_Workflow(
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
        searchEmpowerment: function() {
            this.additional_warehouses_bu = [];
            this.contract_bu = [];

            Empowerment.getEmpowermenMaster({
                company_name: this.filterData.company_name,
                vendor_type: this.filterData.vendor_type,
                bu: this.user.bu
            }).then(response => {
                var can_start_workflow = response.can_start_workflow;

                //新建的时候或者退回到start的时候，可以获取信息
                if (can_start_workflow || (!can_start_workflow && this.is_start)) {
                    // this.company.basic_info.company_name = this.filterData.company_name;
                    if (!this.is_start) {
                        this.vendor_id = response.vendor_id;
                        this.guid = response.guid;
                        this.company.basic_info = response.basic_info;
                        this.company.basic_info.vendor_type = this.filterData.vendor_type;
                        if (this.company.basic_info.vendor_type != null) {
                            this.company.basic_info.vendor_type_name = this.vendor_type_list.find(
                                item => item.code === this.filterData.vendor_type
                            ).name;
                        }
                        var bu_code = this.user.bu;
                        var bu_name = this.BU.find(item => item.bu_code === bu_code)
                            .bu_name;
                        var parent_company_name = response.basic_info.parent_company_name;
                        if (parent_company_name) {
                            this.exsitParentCompany = true;
                        }

                        (this.company.basic_info.bu_code = bu_code),
                        (this.company.basic_info.bu_name = bu_name);
                    }

                    // console.log(this.company.basic_info)

                    this.setBasicinfo();

                    //console.log(contacts);
                    var additional_warehouses = response.additional_warehouses;
                    var contacts = response.contacts;
                    contacts.forEach(element => {
                        element.contract_bu.forEach(item => {
                            var bu_name = this.BU.find(bu_item => bu_item.bu_code === item)
                                .bu_name;

                            if (
                                this.contract_bu.findIndex(items => items.bu_code === item) < 0
                            ) {
                                this.contract_bu.push({
                                    bu_code: item,
                                    bu_name: bu_name,
                                    contacts: [{
                                        contract_id: element.contract_id,
                                        contract_attachment: element.contract_attachment,
                                        contract_agent: element.contract_agent,
                                        confirm_current_contact: false,
                                        is_contract_agent: element.is_contract_agent,
                                        contract_delegate: element.contract_delegate,
                                        contract_recipient: element.contract_recipient,
                                        contract_recipient_phone: element.contract_recipient_phone,
                                        contract_mail_address: element.contract_mail_address,
                                        contract_mail_postcode: element.contract_mail_postcode,
                                        business_contact: element.business_contact,
                                        business_contact_email: element.business_contact_email
                                    }]
                                });
                            } else {
                                var a = this.contract_bu.find(items => items.bu_code === item);
                                a.contacts.push({
                                    contract_id: element.contract_id,
                                    contract_agent: element.contract_agent,
                                    confirm_current_contact: false,
                                    is_contract_agent: element.is_contract_agent,
                                    contract_attachment: element.contract_attachment,
                                    contract_delegate: element.contract_delegate,
                                    contract_recipient: element.contract_recipient,
                                    contract_recipient_phone: element.contract_recipient_phone,
                                    contract_mail_address: element.contract_mail_address,
                                    contract_mail_postcode: element.contract_mail_postcode,
                                    business_contact: element.business_contact,
                                    business_contact_email: element.business_contact_email
                                });
                            }
                        });
                    });

                    additional_warehouses.forEach(element => {
                        element.additional_warehouses_bu.forEach(item => {
                            var bu_name = this.BU.find(bu_item => bu_item.bu_code === item)
                                .bu_name;

                            if (
                                this.additional_warehouses_bu.findIndex(
                                    items => items.bu_code === item
                                ) < 0
                            ) {
                                this.additional_warehouses_bu.push({
                                    bu_code: item.bu_code,
                                    bu_name: bu_name,
                                    additional_warehouses: [{
                                        additional_warehouses_id: element.additional_warehouses_id,
                                        receiving_party: element.receiving_party,
                                        additional_warehouses_bu: element.additional_warehouses_bu,
                                        receiving_address: element.receiving_address,
                                        warehouse_license_attachment: element.warehouse_license_attachment,
                                        warehouse_medical_license_attachment: element.warehouse_medical_license_attachment,
                                        warehouse_medical_license2_attachment: element.warehouse_medical_license2_attachment,
                                        warehouse_declare_attachment: element.warehouse_declare_attachment
                                    }]
                                });
                            } else {
                                var a = this.additional_warehouses_bu.find(
                                    items => items.bu_code === item
                                );
                                a.additional_warehouses.push({
                                    additional_warehouses_id: element.additional_warehouses_id,
                                    receiving_party: element.receiving_party,
                                    additional_warehouses_bu: element.additional_warehouses_bu,
                                    receiving_address: element.receiving_address,
                                    warehouse_license_attachment: element.warehouse_license_attachment,
                                    warehouse_medical_license_attachment: element.warehouse_medical_license_attachment,
                                    warehouse_medical_license2_attachment: element.warehouse_medical_license2_attachment,
                                    warehouse_declare_attachment: element.warehouse_declare_attachment
                                });
                            }
                        });
                    });
                } else {
                    this.$Message.error(notRunMessage);
                }
            });
            // console.log(this.contract_bu);
        },
        selectContact(item, key, index) {
            //console.log(item);
            //this.is_new_contact = false;
            if (item.confirm_current_contact) {
                this.company.contacts[0].contract_id = item.contract_id;

                this.company.contacts[0].contract_agent = item.contract_agent;
                this.company.contacts[0].is_contract_agent = item.is_contract_agent;
                this.company.contacts[0].contract_delegate = item.contract_delegate;
                this.company.contacts[0].contract_attachment = item.contract_attachment;
                this.company.contacts[0].contract_recipient = item.contract_recipient;
                this.company.contacts[0].contract_recipient_phone =
                    item.contract_recipient_phone;
                this.company.contacts[0].contract_mail_address =
                    item.contract_mail_address;
                this.company.contacts[0].contract_mail_postcode =
                    item.contract_mail_postcode;
                this.company.contacts[0].business_contact = item.business_contact;
                this.company.contacts[0].business_contact_email =
                    item.business_contact_email;
                this.selectContractModel = false;
                ///选择完后，清空对应的复选框
                this.contract_bu[key].contacts[index].confirm_current_contact = false;
            } else {
                this.$Message.error(mustConfirmContractMessage);
            }
        },
        selectAdditionalWarehouses(item) {
            //console.log(item);

            var additional_warehouses_index = this.company.additional_warehouses.findIndex(
                element =>
                element.additional_warehouses_id === item.additional_warehouses_id
            );
            if (additional_warehouses_index < 0) {
                var bu_array = [];
                item.additional_warehouses_bu.forEach(warehouses_bu_item => {
                    bu_array.push(warehouses_bu_item.bu_code);
                });
                this.company.additional_warehouses.push({
                    additional_warehouses_id: item.additional_warehouses_id,

                    additional_warehouses_bu: bu_array,

                    receiving_party: item.receiving_party,
                    receiving_address: item.receiving_address,

                    warehouse_license_attachment: item.warehouse_license_attachment,
                    warehouse_medical_license_attachment: item.warehouse_medical_license_attachment,
                    warehouse_medical_license2_attachment: item.warehouse_medical_license2_attachment,
                    warehouse_declare_attachment: item.warehouse_declare_attachment
                });
            }
            this.selectWarehousesModel = false;
        },
        setBasicinfo() {
            var basic_info = this.company.basic_info;
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
                firstColumnName: "第二类医疗器械经营备案-备案日期:",
                firstColumnValue: basic_info.medical_business_license2_record_date,
                secondColumnName: "第二类医疗器械经营备案-经营范围:",
                secondColumnValue: basic_info.medical_business_license2_business_scope
            }, {
                firstColumnName: "SAP ID:",
                firstColumnValue: basic_info.sap_id,
                secondColumnName: "状态:",
                secondColumnValue: basic_info.status
            });
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