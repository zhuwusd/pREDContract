export const location_Provices = state => state.location_Provices
export const location_Citys = state => state.location_Citys

export const user = state => state.user

export const BU = state => state.BU.BU

export const templatePath = state => state.templatePath

export const ProductLine = state => state.BU.ProductLine

export const flowtype = state => state.flowtype
export const flowcategory = state => state.flow_category

export const GlobalConfig = state => state.Global_Config


export const uploadAttachmentUrl = state => state.uploadAttachmentUrl

export const mytask_status = state =>state.Global_Config.filter((item => item.type === "mytask_status"));

export const myapply_status= state =>state.Global_Config.filter((item => item.type === "myapply_status"));

export const medical_business_license_scope=state=>state.Global_Config.filter((item => item.type === "medical_business_license_scope"));

export const medical_business_license2_scope=state=>state.Global_Config.filter((item => item.type === "medical_business_license2_scope"));

export const distribution_type_List=state=>state.Global_Config.filter((item => item.type === "distribution_type"));

export const distribution_mode_List=state=>state.Global_Config.filter((item => item.type === "distribution_mode"));

export const company_nature1_List=state=>state.Global_Config.filter((item => item.type === "company_nature1"));

export const company_nature2_List=state=>state.Global_Config.filter((item => item.type === "company_nature2"));

export const payment_type_List=state=>state.Global_Config.filter((item => item.type === "payment_type"));

export const apply_type_list=state=>state.Global_Config.filter((item => item.type === "apply_type"));

export const vendor_type_list=state=>state.Global_Config.filter((item => item.type === "vendor_type"));

export const protocol_type_list=state=>state.Global_Config.filter((item => item.type === "protocol_type"));

export const distribution_type2_list=state=>state.Global_Config.filter((item => item.type === "distribution_type2"));




