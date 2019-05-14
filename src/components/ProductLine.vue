<template>
<div>
    <Modal v-model="ProductModal" width="400" @on-visible-change="closeModel" :styles="{top: '200px'}"  :mask-closable="false">
        <p slot="header">
            <span>请选择产品线</span>
        </p>
        <div>
            <Tree :data="ProductLineList" @on-check-change="deleteNode" show-checkbox   :render="renderContent"></Tree>
        </div>
        <div slot="footer">
            <Button type="primary" @click="savedata">确定</Button>
        </div>
    </Modal>

    <Modal v-model="childrenProductModal" width="400" :styles="{top: '200px'} " :mask-closable="false">
        <p slot="header">
            <span>{{seletedProductLine_name}}</span>
        </p>
        <Row>
            <Col span="24">
            <div style="padding-top:8px;padding-left:10px;">
                <label class="selecttype">选择方式:</label>
                <RadioGroup v-model="is_direct_choose_name">
                    <Radio label="正选"></Radio>
                    <Radio label="反选"></Radio>
                </RadioGroup>
            </div>
            </Col>
        </Row>
        <br />
        <div>
            <Tree ref="childrenTree" :data="childrenProductLineList" :render="renderContent" show-checkbox></Tree>
        </div>
        <div slot="footer">
            <Button type="primary" @click="appendNode">确定</Button>
        </div>
    </Modal>
    <Table v-if="show_Tabel" stripe :columns="show_Table_Header" :data="show_Table_Array"></Table>
</div>
</template>
<script>
import {
    mapGetters
} from "vuex";
export default {
    data() {
        return {

            seletedProductLine_code: null,
            seletedProductLine_name: null,

            ProductModal: false,
            show_Table_Array: [],
            childrenProductModal: false,
            is_direct_choose_name: "正选",
            ProductLineList: [],
            show_Tabel: false,
            childrenProductLineList: [],
            result: [],
            direct_choose_result: [],
            notdirect_choose_result: [],
            is_direct_choose_array: [], //选要正反选的节点集合
            is_need_direct_choose_array: [2, 3, 13], //子节点下需要正反选的父节点集合
            is_need_direct_children_array: [], //需要正反选的节点的子节点集合
            checked_children_array: [], //已选择的节点
            buttonProps: {
                type: 'default',
                size: 'small',
            },
            show_Table_Header: [{
                    title: "产品线",
                    key: "products"
                },
                {
                    title: "选择方式",
                    key: "is_direct_choose"
                }
            ],
        }
    },
    props: ["displayProduct", "masterproductLineList"],

    computed: {
        ...mapGetters(["BU", "user", "ProductLine"])
    },
    watch: {
        childrenProductModal() {
            if (this.childrenProductModal) {
                this.ProductModal = false;
            } else {
                this.ProductModal = true;
            }
        },
        displayProduct: function() {
            this.ProductModal = this.displayProduct;
        },
        show_Table_Array: function() {
            if (this.show_Table_Array.length) {
                this.show_Tabel = true;
            }
        },
        masterproductLineList: function() {
           // console.log(this.masterproductLineList);
           //console.log(this.masterproductLineList);
           if(this.masterproductLineList){
            this.convertToTable(this.masterproductLineList);
           }
        },
        ProductModal: function() {
            //console.log(this.BU);
            var bu_code = this.user.bu;
            //this.ProductLineList = [];
            this.is_direct_choose_array = [];
            this.is_need_direct_children_array = [];
            if (this.ProductModal) {
                let t_product_line_code = this.BU.find(
                    item => item.bu_code === bu_code
                )

                let data = JSON.parse(JSON.stringify(t_product_line_code)).product_line_code;

                var new_array = [];
                //记录需要正反选的节点
                data.forEach(element => {
                    if (this.is_need_direct_choose_array.includes(element.product_line_parent_code)) {
                        this.is_direct_choose_array.push(element.product_line_code)
                    }
                })
                //需要正反选的节点的子节点不绑到树
                data.forEach(element => {
                    if (!this.is_direct_choose_array.includes(element.product_line_parent_code)) {
                        new_array.push({
                            product_line_code: element.product_line_code,
                            product_line_name: element.product_line_name,
                            product_line_parent_code: element.product_line_parent_code,
                            checked: false
                        });
                    } else {
                        this.is_need_direct_children_array.push({
                            product_line_code: element.product_line_code,
                            product_line_name: element.product_line_name,
                            product_line_parent_code: element.product_line_parent_code,
                            checked: false
                        })
                    }
                });
                if (this.ProductLineList.length === 0) {
                    this.ProductLineList = this.toTree(new_array, null);
                }
            }
        }
    },
    methods: {
        closeModel: function(value) {
            if (!value) {
                this.$emit("closeProduct");
            }
        },
        deleteNode(value) {
            // console.log(value);
            if (value.length > 0) {
                var list = [];
                this.checked_children_array.forEach(item => {
                    if (item.product_line_parent_code === value[0].product_line_code) {
                        list.push(item.product_line_code);
                    }
                });

                list.forEach(element => {
                    var index = this.checked_children_array.findIndex(item => item.product_line_code === element.product_line_code);
                    this.checked_children_array.splice(index, 1);
                })
            }
        },
        appendNode: function() {
            var nodeList = this.$refs.childrenTree.getCheckedNodes();
            // console.log(nodeList);
            var list = [];
            this.checked_children_array.forEach(item => {
                if (item.product_line_parent_code === this.seletedProductLine_code) {
                    list.push(item.product_line_code);
                }
            });

            list.forEach(element => {
                var index = this.checked_children_array.findIndex(item => item.product_line_code === element.product_line_code);
                this.checked_children_array.splice(index, 1);
            })

            nodeList.forEach(element => {

                this.checked_children_array.push({
                    is_direct_choose: this.is_direct_choose_name === "正选" ? true : false,
                    product_line_code: element.product_line_code,
                    product_line_name: element.product_line_name,
                    product_line_parent_code: element.parentId,
                    checked: true
                });

            })
            this.childrenProductModal = false;
            // console.log(this.checked_children_array);
        },
        toTree(arr, rootnode) {
            //console.log(rootnode);
            var top = [],
                sub = [],
                arrObj = {};

            arr.forEach(function(item) {
                let obj = {};
                obj.parentId = item.product_line_parent_code;
                obj.product_line_code = item.product_line_code;
                obj.product_line_name = item.product_line_name;
                obj.expand = true,
                    obj.checked = item.checked,
                    obj.is_direct_choose = true,
                    obj.children = [];
                if (item.product_line_parent_code === rootnode) {
                    top.push(obj);
                } else {
                    sub.push(obj);
                }
                arrObj[item.product_line_code] = obj;
            });
            sub.forEach(function(item) {
                var parent = arrObj[item.parentId] || {
                    children: []
                };
                parent.children.push(item);
            });
            //console.log(top)
            return top;
        },
        savedata: function() {
            //const checkedNodes = this.$refs.permissionTree;
            this.result = [];
            //this.show_Table_Array = [];
            this.direct_choose_result = [],
                this.notdirect_choose_result = [],
                //console.log(this.ProductLineList);
                this.ProductLineList.forEach(element => {
                    this.findChild(element);
                });
            var endReuslt = [];
            // console.log(this.checked_children_array);
            this.direct_choose_result.forEach(element => {

                var children = this.checked_children_array.filter(item => item.product_line_parent_code === element.product_line_code)
                if (children.length > 0) {
                    var produnctlist = [];
                    var produnctNameList = [];
                    var is_direct_choose = true;
                    children.forEach(item => {
                        is_direct_choose = item.is_direct_choose;
                        produnctlist.push(item.product_line_code);
                        produnctNameList.push(item.product_line_name);
                    })
                    endReuslt.push({
                        is_direct_choose: is_direct_choose,
                        products: produnctlist
                    })
                    /*                     this.show_Table_Array.push({
                                            is_direct_choose: is_direct_choose ? "正选" : "反选",
                                            products: produnctNameList.join()
                                        }) */
                } else {
                    var product_line_code_array = []
                    product_line_code_array.push(element.product_line_code);
                    endReuslt.push({
                        is_direct_choose: true,
                        products: product_line_code_array
                    })
                    //console.log(element.product_line_name)
                    /*                     this.show_Table_Array.push({
                                            is_direct_choose: "",
                                            products: element.product_line_name
                                        }) */
                }
            })
            //console.log(this.show_Table_Array);
            this.ProductModal = false;
            this.convertToTable(endReuslt);
            this.$emit("setProductLine", endReuslt);
        },
        convertToTable: function(productlineData) {

            this.show_Table_Array = [];

            productlineData.forEach(element => {
                var is_direct_choose = element.is_direct_choose ? "正选" : "反选";
                var product_line_name_list = [];
                element.products.forEach(item => {
                    var product_line = this.ProductLine.find(items => items.product_line_code === item);
                    product_line_name_list.push(product_line.product_line_name);
                })

                this.show_Table_Array.push({
                    is_direct_choose: is_direct_choose,
                    products: product_line_name_list.join()
                })
            })
            //console.log(this.show_Table_Array);
        },
        findChild(item) {
            if (item.children.length > 0) {
                item.children.forEach(element => {
                    this.findChild(element);
                })
            } else {
                if (item.checked) {
                    this.direct_choose_result.push({
                        parentId: item.parentId,
                        is_direct_choose: item.is_direct_choose,
                        product_line_code: item.product_line_code,
                        product_line_name: item.product_line_name
                    })
                }
            }

        },
        directchoose(data) {
            this.childrenProductModal = true;
            this.seletedProductLine_name = data.product_line_name;
            this.seletedProductLine_code = data.product_line_code;
            // console.log(data)
            // console.log(this.is_need_direct_children_array)

            var checked_children_array = this.checked_children_array;
            this.is_direct_choose_name = "正选";
            var new_array = [];
            /*             new_array.push({
                            product_line_code: data.product_line_code,
                            product_line_name: data.product_line_name,
                            product_line_parent_code: data.parentId,
                        }); */
            this.is_need_direct_children_array.forEach(element => {


                if (element.product_line_parent_code === data.product_line_code) {

                    var index = checked_children_array.findIndex(items =>
                        items.product_line_code === element.product_line_code
                    )
                    if (index > -1) {

                        if (checked_children_array[index].is_direct_choose) {
                            this.is_direct_choose_name = "正选";
                        } else {
                            //console.log("123");
                            this.is_direct_choose_name = "反选";
                        }
                        //console.log(this.is_direct_choose_name);
                        new_array.push({
                            product_line_code: element.product_line_code,
                            product_line_name: element.product_line_name,
                            product_line_parent_code: element.product_line_parent_code,
                            checked: true
                        });
                    } else {
                        new_array.push({
                            product_line_code: element.product_line_code,
                            product_line_name: element.product_line_name,
                            product_line_parent_code: element.product_line_parent_code,
                            checked: false
                        });
                    }
                }
            })
            this.childrenProductLineList = [];
            this.childrenProductLineList = this.toTree(new_array, data.product_line_code);
            //this.$set(data, 'is_direct_choose', true);
        },
        notdirectchoose(root, node, data) {
            this.$set(data, 'is_direct_choose', false);
        },
        renderContent(h, {
            root,
            node,
            data
        }) {
            if (this.is_direct_choose_array.includes(data.product_line_code) && data.checked) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', data.product_line_name),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('span', {
                            /*                             props: Object.assign({}, this.buttonProps, {
                                                            icon: 'ios-add'
                                                        }), */
                            style: {
                                marginRight: '16px',
                                width: '50px',
                                height: "20px",
                                fontSize: '11px',
                                cursor: "pointer",
                                color: "#4060ad"
                            },
                            on: {
                                click: () => {
                                    this.directchoose(data)
                                }
                            }
                        }, "详细")
                    ])
                ]);
            } else {
                return h('span', data.product_line_name)
            }
        }
    }
}
</script>
<style scoped>

</style>


