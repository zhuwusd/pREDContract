<template>
<div id="app">
  <router-view/>
</div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
#app {
  font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

textarea {
  resize: none;
}

.cursorPointer {
  cursor: pointer;
}

.dms-working {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.dms-pass {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.dms-reject {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.dms-process {
  width: 100%;
  display: flex;
  flex-direction: row;
}

.dms-pass .icon {
  background: url(assets/images/icon-DMSstate-green.png);
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-size: 100% 100%;
}

.dms-working .icon {
  background: url(assets/images/icon-DMSstate-yellow.png);
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-size: 100% 100%;
}

.dms-reject .icon {
  background: url(assets/images/icon-DMSstate-red.png);
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-size: 100% 100%;
}

.dms-process .icon {
  background: url(assets/images/icon-DMSState-gray.png);
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background-size: 100% 100%;
}

 .ivu-table th {
  background: rgba(163, 183, 216, 1);
} 

.ivu-table-header .ivu-table-cell {
  font-size: 13px;
  font-weight: 900;
}

.ivu-btn {
  width: 100px;
}

.contentTitle {
  font-size: 20px;
  font-weight: 700;
  color: #4060ad;
  margin-left: 10px;
}

.contentTitle_small {
  font-size: 16px;
  font-weight: 700;
  color: #4060ad;
  margin-left: 10px;
}

.estimation_title {
  font-size: 14px;
  font-weight: 700;
  margin-left: 40px;
}

.ivu-btn-next {
  width: 300px;
}

.ivu-workflow-btn {
  width: 120;
}

.ivu-modal-footer {
  border-top: 0px;
}

.ivu-modal-header {
  border-bottom: 0px;
  padding: 14px 0px 0px 16px;
}

.ivu-modal-body {
  padding: 8px 8px 0px 8px;
}

.history {
  font-size: 13px;
  font-weight: 700;
}

.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  color: black;
}

.ivu-select-disabled .ivu-select-selection {
  color: black;
}

.ivu-checkbox-disabled.ivu-checkbox-checked .ivu-checkbox-inner {
  border-color: #2d8cf0;
  background-color: #2d8cf0;
}

.ivu-input-number-disabled .ivu-input-number-input {
  color: black;
}

.ivu-checkbox-disabled+span {
  color: black;
}

.ivu-switch-disabled .ivu-switch-inner {
  color: black;
}

.ubtn_add {
  font-size: 12px;
  cursor: pointer;
  margin-left: 60px;
}

.ubtn_add:hover {
  color: #2d8cf0;
}

.ubtn_delete {
  font-size: 12px;
  cursor: pointer;
}

.ubtn_delete:hover {
  color: #2d8cf0;
}

.workflow_approve {
  width: 60px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 30px;
  right: 20px;
  transition: opacity 0.2s ease-in-out;
  background: #19be6b;
}

.workflow_resubmit {
  width: 60px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 90px;
  right: 20px;
  transition: opacity 0.2s ease-in-out;
  background: #2d8cf0;
}

.workflow_refuse {
  width: 60px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 30px;
  right: 20px;
  transition: opacity 0.2s ease-in-out;
  background: #be194b;
}

.workflow_return {
  width: 60px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 90px;
  right: 20px;
  transition: opacity 0.2s ease-in-out;
  background: #2d8cf0;
}

.workflow_submit {
  width: 60px;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  position: fixed;
  bottom: 30px;
  right: 20px;
  transition: opacity 0.2s ease-in-out;
  background: #2d8cf0;
}

.custom_label {
  text-align: center;
  vertical-align: middle;
  float: right;
  font-size: 12px;
  color: #515a6e;
  line-height: 1;
  padding: 10px 12px 10px 0;
  box-sizing: border-box;
  width: 100%;
  font-weight: 700;
}

.spin-icon-load {
  animation: ani-demo-spin 1s linear infinite;
}

.spin-message {
  font-size: 20px;
  font-family: "Courier New", Courier, monospace;
  font-weight: 700px;
}

td.ivu-table-expanded-cell {
  padding: 10px 0px 10px 20px
}

.ivu-collapse {
  background-color: #3997f0;
}

.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
  color: white;
}

.table_btn {
  cursor: pointer;
  color: #2d8cf0;
}

.column_cursor {
  cursor: pointer;
}

.columnField {
  font-size: 12px;
  font-weight: 700
}
/* .ivu-form-item-required .ivu-form-item-label:before {
    content: '*';
    display: inline-block;
    margin-right: 4px;
    line-height: 1;
    font-family: SimSun;
    font-size: 12px;
    color: blue
} */
/* .aa{
  background: red !important;
} */

/* .ivu-form-item-label {
  font-size: 12px;
  font-weight: 900;
} */


/* .ivu-form .ivu-form-item-label{
  font-weight: 700;
  color: #4060ad;
  font-size: 12px;
} */
</style>
