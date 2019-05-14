<template>
<Table :columns="workflowHistoryTable" :data="workflowHistory">
</Table>
</template>
<script>
import expandRow from "./Table-expand.vue";
import workflow from "../../api/services/workflow";
import {
  mapMutations
} from "vuex";
import {
  SET_TASK
} from "@/store/mutation-types";
export default {
  data() {
    return {
      workflowHistory: [],
      workflowHistoryTable: [{
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                row: params.row
              }
            });
          }
        },
        {
          title: "任务名称",
          key: "task_name"
        },
        {
          title: "审批人",
          key: "username"
        },
        {
          title: "审批结果",
          key: "action"
        },
        {
          title: "完成时间",
          key: "finished"
        }
      ]
    };
  },
  methods: {
    ...mapMutations("workflow", [SET_TASK])
  },
  mounted() {
    //获取审批记录
    if (
      this.$route.params.Action === "View" ||
      this.$route.params.Action === "Approve"
    ) {
      workflow
        .getHistory(this.$route.query.process_id, this.$route.query.task_id)
        .then(response => {
          this.workflowHistory = response.ApproveHistory;

          var TaskAssigned = response.TaskAssigned;
          TaskAssigned.forEach(element => {
            this.workflowHistory.push({
              task_name: element.task_name,
              username: element.username,
              action: null,
              comments: null,
              finished: null,
              user_id: element.user_id
            });

          });

          this.SET_TASK(response.Task);
        });
    }
  }
};
</script>

