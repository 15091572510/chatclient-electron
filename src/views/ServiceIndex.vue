<template>
    <div class="content" v-on:click="hideSelect">
        <IndexHeader></IndexHeader>
        <IndexSidebar ref="indexSidebar"></IndexSidebar>
        <IndexChatRoom ref="indexChatRoom"></IndexChatRoom>
    </div>
</template>

<script>
    import IndexHeader from "../components/IndexHeader";
    import IndexSidebar from "../components/IndexSidebar";
    import IndexChatRoom from "./IndexChatRoom";
    export default {
        name: "ServiceIndex",
        data: function() {
            return {
            }
        },
        mounted() {
            document.body.onresize = this.setPageSize;
            this.setPageSize();
        },
        methods: {
            hideSelect: function() {
                this.$refs.indexSidebar.hideStatusSelect();
            },
            setPageSize: function() {
                var pageWidth = document.body.offsetWidth;
                var pageHeight = document.body.offsetHeight;
                var iframeWidth = pageWidth - 200 - 4; // 减去左侧导航栏宽度
                var iframeHeight = pageHeight - 60 - 4;
                // 左侧导航栏高度
                this.$refs.indexSidebar.setSidebarHeight(iframeHeight);
                // 设置chatBody大小
                this.$refs.indexChatRoom.setChatBodySize(iframeWidth , iframeHeight);
            }
        },
        components: {
            IndexChatRoom,
            IndexSidebar,
            IndexHeader
        }
    }

</script>

<style scoped>

</style>