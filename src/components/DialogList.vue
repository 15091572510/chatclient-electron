<template>
    <div class="dialog-list" id="menuExtra" v-bind:style="{height: dialogListHeight + 'px'}">
        <p>会话列表</p>
        <div id="myDialog" class="dialog-kind is-open" v-on:click="openOrHideDialogList()">
            <img class="dialog-kind-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/createdown_up@2x.png" />
            <span>我的会话</span>
        </div>
        <ul class="dialog-select">
        </ul>
        <div id="inTheAccess" class="dialog-kind" v-on:click="openOrHideDialogList()">
            <img class="dialog-kind-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/createdown_up@2x.png" />
            <span>访问中</span>
        </div>
        <ul class="dialog-select">
        </ul>
        <div id="haveToLeave" class="dialog-kind" v-on:click="openOrHideDialogList()">
            <img class="dialog-kind-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/createdown_up@2x.png" />
            <span>离开</span>
        </div>
        <ul class="dialog-select">
        </ul>
    </div>
</template>

<script>
    export default {
        name: "DialogList",
        data: function () {
            return {
                dialogListHeight: ''
            }
        },
        methods: {
            setDialogListSize: function (height) {
                this.dialogListHeight = height;
            },
            /**
             * 打开/关闭对话分类
             */
            openOrHideDialogList: function () {
                try {
                    var target = event.currentTarget;
                    if (target.className.indexOf("is-open") != -1) {
                        target.classList.remove("is-open");
                        target.nextElementSibling.style.height = "1px";
                    } else {
                        // 关闭所有已打开对话分类
                        var dialogUls = document.getElementsByClassName("dialog-select");
                        for (var i=0; i<dialogUls.length; i++) {
                            dialogUls[i].style.height = "1px";
                        }
                        var dialogKinds = document.getElementsByClassName("dialog-kind");
                        for (var i=0; i<dialogKinds.length; i++) {
                            dialogKinds[i].classList.remove("is-open");
                        }
                        // 打开当前点击的对话分类
                        target.classList.add("is-open");
                        var dialogList = target.nextElementSibling;
                        if (dialogList.firstElementChild) {
                            var dialogListHeight = dialogList.firstElementChild.offsetHeight * dialogList.children.length;
                            dialogList.style.height = dialogListHeight + "px";
                        }
                    }
                } catch (e) {
                    alert("openOrHideDialogList: " + e);
                }
            }
        }
    }
</script>

<style scoped>
    .dialog-list {
        background: #fff;
        width: 281px;
        padding: 12px 0 0 0;
        font-size: 16px;
        font-family: PingFangSC,PingFangSC-Regular;
        font-weight: 400;
        color: #333;
        box-sizing: border-box;
        border-right: 1px solid #efefef;
        border-radius: 5px 0 0 5px;
    }
    .dialog-list > p {
        padding-left: 30px;
        margin-bottom: 14px;
        font-size: 16px;
        font-family: Microsoft YaHei,Microsoft YaHei-Regular;
    }
    .dialog-list .dialog-kind {
        font-size: 12px;
        font-family: Microsoft YaHei,Microsoft YaHei-Regular;
        font-weight: 400;
        color: #007aff;
        background: #ecf5ff;
        padding-left: 30px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        letter-spacing: 1px;
    }
    .dialog-list .dialog-kind.is-open .dialog-kind-icon {
        transform: none;
    }
    .dialog-list .dialog-kind .dialog-kind-icon {
        vertical-align: middle;
        width: 10px;
        transform: rotate(180deg);
        transition: transform .3s;
        margin-right: 6px;
    }
    .dialog-list ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        height: 1px;
        overflow: hidden;
        transition: height .2s;
    }
    .dialog-list ul li {
        padding: 10px 16px 12px 30px;
        box-sizing: border-box;
        height: 76px;
        display: flex;
        cursor: default;
        align-items: center;
    }
    .dialog-list ul li .customer-avatar {
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }
    .dialog-list ul li .customer-msg-preview {
        margin-left: 10px;
        width: 177px;
        height: 48px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .dialog-list ul li .customer-msg-preview .customer-name {
        font-size: 18px;
    }
    .dialog-list ul li .customer-msg-preview .pre-msg-time {
        font-size: 12px;
        font-weight: 400;
        color: #ddd;
        float: right;
    }
    .dialog-list ul li .customer-msg-preview .msg-preview-container {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
    }
    .dialog-list ul li .customer-msg-preview .msg-preview {
        font-size: 12px;
        color: #999;
        width: 160px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .dialog-list ul li .customer-msg-preview .unread-msg {
        background: #ff5e5e;
        color: #fff;
        float: right;
        border-radius: 50%;
        font-size: 11px;
        line-height: 17px;
        width: 18px;
        height: 18px;
        text-align: center;
        box-sizing: border-box;
        display: none;
    }
</style>