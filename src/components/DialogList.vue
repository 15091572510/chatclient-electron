<template>
    <div class="dialog-list" id="menuExtra" v-bind:style="{height: dialogListHeight + 'px'}">
        <p>会话列表</p>
        <div id="myDialog" class="dialog-kind" v-bind:class="{'is-open': myDialogIsOpen}" v-on:click="openOrHideDialogList('my')">
            <img class="dialog-kind-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/createdown_up@2x.png" />
            <span>我的会话</span>
        </div>
        <ul class="dialog-select" v-bind:style="{height: myDialogNum * 76 + 'px'}">
            <li v-for="item in this.$store.state.dialogArr" class="dialog-list-item" v-bind:class="{checked: item.isChecked}" v-on:click="checkedDialog(item.room)">
                <img class="customer-avatar" v-bind:src="item.avatar" />
                <div class="customer-msg-preview">
                    <p>
                        <span class="customer-name">{{item.from}}</span>
                        <span class="pre-msg-time">{{item.time}}</span>
                    </p>
                    <p class="msg-preview-container">
                        <span class="msg-preview">{{item.content}}</span>
                        <span class="unread-msg">0</span>
                    </p>
                </div>
            </li>
        </ul>
        <div id="inTheAccess" class="dialog-kind" v-bind:class="{'is-open': accessDialogIsOpen}" v-on:click="openOrHideDialogList('access')">
            <img class="dialog-kind-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/createdown_up@2x.png" />
            <span>访问中</span>
        </div>
        <ul class="dialog-select" v-bind:style="{height: accessDialogNum * 76 + 'px'}">
            <li v-for="item in this.$store.state.dialogArr" v-if="item.isOnline" class="dialog-list-item" v-bind:class="{checked: item.isChecked}" v-on:click="checkedDialog(item.room)">
                <img class="customer-avatar" v-bind:src="item.avatar" />
                <div class="customer-msg-preview">
                    <p>
                        <span class="customer-name">{{item.from}}</span>
                        <span class="pre-msg-time">{{item.time}}</span>
                    </p>
                    <p class="msg-preview-container">
                        <span class="msg-preview">{{item.content}}</span>
                        <span class="unread-msg">0</span>
                    </p>
                </div>
            </li>
        </ul>
        <div id="haveToLeave" class="dialog-kind" v-bind:class="{'is-open': leaveDialogIsOpen}" v-on:click="openOrHideDialogList('leave')">
            <img class="dialog-kind-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/createdown_up@2x.png" />
            <span>离开</span>
        </div>
        <ul class="dialog-select" v-bind:style="{height: leaveDialogNum * 76 + 'px'}">
            <li v-for="item in this.$store.state.dialogArr" v-if="!item.isOnline" class="dialog-list-item" v-bind:class="{checked: item.isChecked}" v-on:click="checkedDialog(item.room)">
                <img class="customer-avatar" v-bind:src="item.avatar" />
                <div class="customer-msg-preview">
                    <p>
                        <span class="customer-name">{{item.from}}</span>
                        <span class="pre-msg-time">{{item.time}}</span>
                    </p>
                    <p class="msg-preview-container">
                        <span class="msg-preview">{{item.content}}</span>
                        <span class="unread-msg">0</span>
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "DialogList",
        data: function () {
            return {
                dialogListHeight: '',
                myDialogNum: 0,
                accessDialogNum: 0,
                leaveDialogNum: 0,
                myDialogIsOpen: true,
                accessDialogIsOpen: false,
                leaveDialogIsOpen: false
            }
        },
        // props: ['myDialogList', 'accessDialogList' , 'leaveDialogList'],
        methods: {
            setDialogListSize: function (height) {
                this.dialogListHeight = height
            },
            /**
             * 打开/关闭对话分类
             */
            openOrHideDialogList: function (kind) {
                if (kind === 'my') {
                    this.accessDialogIsOpen = false
                    this.leaveDialogIsOpen = false
                    this.accessDialogNum = 0
                    this.leaveDialogNum = 0
                    if (this.myDialogIsOpen) {
                        this.myDialogIsOpen = false
                        this.myDialogNum = 0
                    } else {
                        this.myDialogIsOpen = true
                        this.myDialogNum = this.$store.state.dialogArr.length
                    }
                } else if (kind === 'access') {
                    this.myDialogIsOpen = false
                    this.leaveDialogIsOpen =false
                    this.myDialogNum = 0
                    this.leaveDialogNum = 0
                    let accessNum = 0
                    if (this.accessDialogIsOpen) {
                        this.accessDialogIsOpen = false
                    } else {
                        this.accessDialogIsOpen = true
                        accessNum = this.checkKindDialogNum('access')
                    }
                    this.accessDialogNum = accessNum
                } else if (kind === 'leave') {
                    this.myDialogIsOpen = false
                    this.accessDialogIsOpen =false
                    this.myDialogNum = 0
                    this.accessDialogNum = 0
                    let leaveNum = 0
                    if (this.leaveDialogIsOpen) {
                        this.leaveDialogIsOpen = false
                    } else {
                        this.leaveDialogIsOpen = true
                        leaveNum = this.checkKindDialogNum('leave')
                    }
                    this.leaveDialogNum = leaveNum
                }
            },
            checkedDialog: function (room) {
                this.$store.commit('cancelChecked')
                this.$store.commit('selectChecked', room)
            },
            checkKindDialogNum: function (kind) {
                let accessNum = 0, leaveNum = 0
                for (let i in this.$store.state.dialogArr) {
                    if (this.$store.state.dialogArr[i].isOnline) {
                        accessNum ++
                    } else {
                        leaveNum ++
                    }
                }
                return kind === 'access' ? accessNum : leaveNum
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
        margin-top: 1px;
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
    .dialog-list .dialog-avatar {
        position: relative;
        display: inline-block;
        vertical-align: middle;
    }
    .dialog-list .dialog-list-item:hover {
        background: #f5f6fa;
    }
    .dialog-list .dialog-list-item img {
        width: 24px;
        height: 24px;
    }
    .dialog-list .dialog-list-item .msg-num {
        width: 12px;
        height: 12px;
        background: #ec2626;
        font-size: 8px;
        font-family: PingFangSC, PingFangSC-Regular;
        text-align: center;
        line-height: 12px;
        font-weight: 600;
        color: #ffffff;
        display: none;
        border-radius: 50%;
        position: absolute;
        right: -4px;
        top: 0;
    }
    .dialog-list .dialog-list-item .nickname {
        vertical-align: middle;
        margin-left: 11px;
        font-size: 14px;
        font-family: PingFangSC, PingFangSC-Regular;
        font-weight: 400;
        color: #333333;
        letter-spacing: 1px;
    }
    .dialog-list .dialog-select .checked {
        background-color: #F5F6FA;
    }
</style>
