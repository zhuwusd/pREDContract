<template>
<div>
    <Upload :headers="header" :action="uploadAttachmentUrl" :show-upload-list="false" :on-success="uploadsuccess">
        <Button :disabled="childDisabled" icon="ios-cloud-upload-outline">上传附件</Button>
    </Upload>
    <ul v-if="childFileList!==null" class="ivu-upload-list">
        <li class="ivu-upload-list-file ivu-upload-list-file-finish">
            <span @click="downloadAttachment">{{childFileList.name}}{{childFileList.extension}}</span>
            <i @click="removeAttachment" v-if="!childDisabled" class="ivu-icon ivu-icon-ios-close ivu-upload-list-remove"></i>
        </li>

    </ul>
    <!--     <ul v-if="childFileList===null" class="ivu-upload-list" >
        <li>
            <span class="ivu-form-item-error-tip" style="margin-top:5px;">请上传附件</span> 
        </li>
    </ul> -->
</div>
</template>
<script>
import {
    mapGetters
} from "vuex";
export default {
    data() {
        return {};
    },
    props: ['uploadIndex', 'uploadType', 'fileList', 'customDisabled'],
    computed: {
        ...mapGetters(["uploadAttachmentUrl"]),
        childDisabled: function() {
            if (this.customDisabled) {
                return this.customDisabled;
            } else {
                return false;
            }
        },
        childFileList: function() {
            return this.fileList;
        },
        header: function() {
            return {
                Authorization: localStorage.getItem("dms-app-token")
            };
        }
    },
    methods: {
        uploadsuccess(res) {
            var AttachmentData;
            if (process.env.WEB_ENV) {
                AttachmentData = res.data[0];
            } else {
                AttachmentData = res[0];
            }
            var file = {
                id: AttachmentData.id,
                remark: AttachmentData.remark,
                name: AttachmentData.name,
                extension: AttachmentData.extension,
                path: AttachmentData.path
            }
            this.$emit("clildUpload", this.uploadIndex, this.uploadType, file);
        },
        downloadAttachment() {
            var webUrl = window.location.href.replace(this.$route.fullPath, "");
            window.open(`${webUrl}${this.childFileList.path}`, '_blank');
        },
        removeAttachment() {
            this.$emit("clildUpload", this.uploadIndex, this.uploadType, null);
        }
    }
};
</script>



