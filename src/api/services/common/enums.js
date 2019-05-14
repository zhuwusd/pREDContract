/**
 * Created by Tidi.Zhu on 10/30/2018.
 */
// 枚举
export default {
  pageIndex: 1,
  pageSize: 10,
  pageTotal: 0,
  workFlowReStart: "start",
  VendorProcess: {
    ApproveNode: {
      start: "start",
      area: "area",
      bu_header: "bu_header",
      qa: "qa",
      channel_manager_fill_form: "channel_manager_fill_form",
      channel_operate_dd: "channel_operate_dd",
      channel_manager: "channel_manager",
      channel_leader: "channel_leader",
      finance: "finance",
      vp: "vp",
      channel_operate_master_agreement: "channel_operate_master_agreement",
      legal_master_agreement: "legal_master_agreement",
      channel_operate_master_agreement_signed: "channel_operate_master_agreement_signed",
      legal_master_agreement_signed: "legal_master_agreement_signed"
    }
  },
  EmpowermentProcess: {
    ApproveNode: {
      start: "start",
      qa: "qa",
      area: "area",
      channel_manager: "channel_manager",
      bu_header: "bu_header",
      channel_leader: "channel_leader",
      finance_leader:"finance_leader",
      vp: "vp",
      channel_operate_upload:"channel_operate_upload",
      //check_channel_operate_upload:"check_channel_operate_upload",
      //check_channel_operate_master_agreement_signed:"check_channel_operate_master_agreement_signed",
      sales:"",
      legal_master_agreement: "legal_master_agreement",
      channel_operate_master_agreement_signed:"channel_operate_master_agreement_signed",
      legal_master_agreement_signed:"legal_master_agreement_signed",
      legal_check_sapid:"legal_check_sapid",
      sales_fill_sapid:"",
      finance:"finance"
    }
  },
  EmpowermentChange: {
    ApproveNode: {
      start: "start",
      channel_operate_upload:"channel_operate_upload",
      channel_operate_master_agreement_signed:"channel_operate_master_agreement_signed",
    }
  },
  Status: {
    apply_type_renewcontract_status: 34,//状态为续约的code
    contract_status: 11//状态为续约的code

  },
  Mapping: [
    {
      vendor_type_code: 26,
      protocol_type_code: 35
    },
    {
      vendor_type_code: 27,
      protocol_type_code: 35
    },
    {
      vendor_type_code: 28,
      protocol_type_code: 36
    },
    {
      vendor_type_code: 29,
      protocol_type_code: 37
    },
    {
      vendor_type_code: 30,
      protocol_type_code: 38
    },
    {
      vendor_type_code: 31,
      protocol_type_code: 39
    }
  ]
}
