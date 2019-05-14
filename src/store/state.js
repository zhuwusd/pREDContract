const state = {
    uploadAttachmentUrl:`${process.env.BASE_API_URL}/api/attachment/upload`,
    templatePath:'/assets/template/',
    location_Provices: [],
    location_Citys: [],
    flow_category: "全部",
    user:{},

    flowtype: [],

    Global_Config: [],
    hosipitals: {},

    BU: {},
    Region: [],
    Product_Line: []
};
export default state;