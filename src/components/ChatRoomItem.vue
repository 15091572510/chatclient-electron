<template>
    <div class="chat-room-item" v-bind:data-room="room" v-bind:data-fromuserid="fromUserId">
        <div class="chat-dialog">
            <div class="chat-dialog-title">
                <span class="end-dialog" onclick="chatRoom.endSession()">邀评价</span><!--<img class="end-dialog-con" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/shut@2x.png" />-->
            </div>
            <div class="chat-dialog-show" onscroll="chatRoom.loadMoreMsg()" v-bind:style="{height: dialogShowHeight + 'px'}">
                <div class="load-more-msg">
                    <span onclick="chatRoom.loadMoreMsg('1')">查看更多消息</span>
                    <img class="loading" src="//static.youjiagou.com/musi/resources/images/serviceSystem/index/loading.gif" style="display: none;" />
                </div>
            </div>
            <div class="dialog-fun-btn">
                <!--缩放区域-->
                <div class="zoom-area"></div>
                <img title="表情" onclick='openExpression(this)' src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/expression@2x.png" />
                <img title="图片" onclick='$id("uploadImage").click();' src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/image@2x.png" />
                <span class="screenshot-container">
                    <img title="截图" onclick="chatRoom.screenshot()" class="screenshot-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/screenshot@2x.png" />
                    <i onclick="chatRoom.showHideWinSelect()" class="screenshot-select-icon"></i>
                    <span onclick="chatRoom.screenshot('1')" class="hide-win-select">隐藏当前窗口截图</span>
                </span>
                <img title="聊天记录" onclick="historyRecord.showHistory()" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/history_record@2x.png" />
                <img title="全局搜索" onclick="openGlobalPop()" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/search.png" />
            </div>
            <div class="edit-container" contenteditable="true" spellcheck="false" onkeydown="editKeydown()"></div>
            <div class="msg-send-container">
                <button title="按Enter键发送，按Shift+Enter键换行" class="msg-send" onclick="sendMessage()">发送</button>
            </div>
        </div>
        <!-- 侧面其他内容 -->
        <div id="broadsideContent" class="broadside-content">
            <!--加载面板-->
<!--            <iframe id="broadIframe" name="broadIframeName" src="https://www.musiyoujia.com/ipadIndex/?tag=right_user_info_v2&chat_user_id={{param.fromUserId}}&chat_service_user_name={{param.account}}&isautopage=1"></iframe>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChatRoomItem",
        props: [
            'room',
            'fromUserId'
        ],
        data: function() {
            return {
                dialogShowHeight: ''
            }
        },
        methods: {
            setChatRoomSize: function (width, chatRoomheight) {
                var editContainer = document.querySelector(".chat-room-item.is-open .edit-container");
                var editContainerHeight =  editContainer ? editContainer.offsetHeight : 158;    // 编辑区高度
                this.dialogShowHeight = chatRoomheight-50-38-editContainerHeight-60;
            }
        }
    }
</script>

<style scoped>
    #chatRoomContainer .chat-room-item.is-open {
        display: flex;
    }
    #chatRoomContainer .chat-room-item {
        /*display: none;*/
        width: 100%;
        height: 100%;
        background: #fff;
    }
    .chat-dialog {
        width: 100%;
    }
    .chat-dialog .chat-dialog-title {
        background: #f4f6fa;
        height: 50px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding-right: 31px;
        box-sizing: border-box;
    }
    .chat-dialog .chat-dialog-title span {
        width: 70px;
        height: 30px;
        background: #ff5d5d;
        border-radius: 4px;
        line-height: 30px;
        font-size: 14px;
        color: #fff;
        font-weight: 400;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .chat-dialog-show {
        width: 100%;
        background: #f4f6fa;
        padding: 31px 40px;
        box-sizing: border-box;
        overflow: auto;
        border: 0 solid #000;
    }
    .chat-dialog-show .load-more-msg {
        color: #2c90ff;
        font-size: 12px;
        text-align: center;
        margin-bottom: 10px;
    }
    .chat-dialog-show .load-more-msg span {
        cursor: pointer;
    }
    .dialog-fun-btn {
        background: #fff;
        width: 100%;
        box-sizing: border-box;
        height: 38px;
        display: flex;
        align-items: center;
        border-left: 1px solid #efefef;
        border-right: 1px solid #efefef;
        padding: 0 16px;
        position: relative;
    }
    .zoom-area {
        position: absolute;
        width: 100%;
        height: 3px;
        top: 0;
        left: 0;
    }
    .dialog-fun-btn img {
        margin-right: 12px;
        cursor: pointer;
        width: 22px;
        padding: 2px;
        border-radius: 2px;
        transition: background .3s;
    }
    .dialog-fun-btn .screenshot-container {
        position: relative;
    }
    .dialog-fun-btn .screenshot-select-icon {
        width: 10px;
        height: 10px;
        background: url(//static.youjiagou.com/musi/resources/images/serviceSystem/index/creatdown.png) center/contain;
        cursor: pointer;
        border-radius: 2px;
        position: absolute;
        left: 20px;
        bottom: 2px;
        transition: background .3s;
    }
    .dialog-fun-btn .hide-win-select {
        display: none;
        position: absolute;
        top: 30px;
        border: 1px solid #dcdee0;
        z-index: 9999;
        background: #fff;
        padding: 3px 5px;
        font-size: 12px;
        cursor: pointer;
        white-space: nowrap;
    }
    .edit-container {
        font-family: "Microsoft YaHei","Segoe UI Emoji";
        height: 158px;
        width: 100%;
        background: #fff;
        outline: 0;
        padding: 5px 16px;
        box-sizing: border-box;
        overflow: auto;
        word-break: break-all;
        border-left: 1px solid #efefef;
        border-right: 1px solid #efefef;
        user-select: text;
        -moz-user-select: text;
        -ms-user-select: text;
        -webkit-user-select: text;
    }
    .msg-send-container {
        width: 100%;
        text-align: right;
        height: 60px;
        padding: 5px 16px 25px;
        box-sizing: border-box;
        border-left: 1px solid #efefef;
        border-right: 1px solid #efefef;
    }
    .msg-send-container button {
        width: 80px;
        height: 30px;
        background: #f5f5f5;
        border: none;
        outline: 0;
        font-size: 14px;
        font-family: PingFangSC,PingFangSC-Regular;
        font-weight: 400;
        color: #aaa;
        letter-spacing: 1px;
        cursor: pointer;
        transition: color .2s;
    }

    .broadside-content {
        width: 362px;
        min-width: 362px;
        overflow: auto;
    }
</style>