<style>
.expand-row {
    margin-top: 5px;
    margin-bottom: 7px;
}

.expand-key {
    font-weight: 700;
    font-size: 13px;
    margin-right: 20px;
}

.ivu-table .child-table-info-row th {
    background-color: rgba(163, 183, 216, 0.5);
    font-size: 8px;
    /*  opacity:0.5; */
}

.ivu-table .child-table-info-row .ivu-table-header .ivu-table-cell {
    font-size: 12px;
    /*  opacity:0.5; */
}
</style>
<template>
<div style="margin-left:40px;margin-right:40px;margin-bottom:30px;">
    <Row class="expand-row">
        <Col span="24">
        <span class="expand-key">产品线:</span>
        </Col>
    </Row>
    <Row class="expand-row">
        <Col span="24">
        <Table class="child-table-info-row" :columns="show_ProductLine_Table_Header" :data="row.productline_info" :show-header="true"></Table>
        </Col>
    </Row>

    <Row class="expand-row">
        <Col span="24">
        <span class="expand-key">授权医院:</span>
        </Col>
    </Row>
    <Row class="expand-row">
        <Col span="24">
        <Table class="child-table-info-row" :columns="show_Area_Table_Header" :data="row.area_info" :show-header="true"></Table>
        </Col>
    </Row>

</div>
</template>
<script>
export default {
    data() {
        return {
            show_Area_Table_Header: [{
                    title: "省份名称",
                    key: "province_name"
                },
                {
                    title: "城市名称",
                    key: "city_name"
                },
                {
                    title: "选择方式",
                    key: "choice_name"
                },
                {
                    title: "医院",
                    tooltip: true,
                    className: "column_cursor",
                    key: "hospitalStr"
                },
            ],
            show_ProductLine_Table_Header: [{
                    title: "父产品线",
                    key: "parent_Productline_name"
                },
                {
                    title: "选择方式",
                    key: "choice_name"
                },
                {
                    title: "子产品线",
                    key: "Productline_name"
                }
            ]
        }
    },
    props: {
        row: Object
    },
    methods: {}
};
</script>

