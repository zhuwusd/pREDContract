<template>
<div>
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
        <span class="workflow_submit" @click="startWorkflow">提交</span>
    </Affix>

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

</div>
</template>
<script>
import {
    mapGetters,
    mapState
} from "vuex";
import enums from "../api/services/common/enums.js";
import workflow from "../api/services/workflow";
import {
    startMessage,
    returnMessage,
    commentMessage,
    notRunMessage,
    mustConfirmContractMessage
} from "../api/services/common/const.js";
export default {
    data() {
        return {
            commentShow: false, //操作框
            actionname_description: null, //操作描述
            actionName: null, //操作类型
            comments: null, //审批意见
            redirectActivity: [], //退回节点集合
            redirectActivityName: null //选中的退回节点
        }
    },
    props: ["needReturn"],
    mounted() {

        if (this.isApprove) {
            workflow
                .getRedirectActivity(
                    this.$route.query.process_id,
                    this.$route.query.task_id
                )
                .then(response => {
                    this.redirectActivity = response;
                });
        }
    },
    computed: {
        ...mapState("workflow", {
            isAssigned: state => state.task && state.task.status == "ASSIGNED"
        }),
        isView: function() {
            return this.$route.params.Action === "View";
        },
        isApprove: function() {
            return this.$route.params.Action === "Approve"
        },
        isCreate: function() {
            return this.$route.params.Action === "Create";
        },
        isStart: function() {
            return this.$route.query.flow_task_name === enums.workFlowReStart;
        },
        isReturn: function() {
            return this.needReturn
        }
    },
    methods: {
        workflow_approve() {
            var  result=this.$emit("validateAll")
            console.log(result);
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
        taskAction() {
            if (this.actionName === "redirect") {
                if (this.redirectActivityName !== null) {
                    if (this.comments !== "") {
                        this.commentShow=false;
                        this.$emit("operateWorkflow", this.actionName, this.comments,this.redirectActivityName)
                    } else {
                        this.$Message.error(commentMessage);
                    }
                } else {
                    this.$Message.error(returnMessage);
                }
            } else {
                this.commentShow=false;
                this.$emit("operateWorkflow", this.actionName, this.comments,this.redirectActivityName)
            }
        },
        startWorkflow() {
            this.$emit("startWorkflow")
        }
    }
}
</script>

