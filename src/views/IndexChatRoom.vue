<template>
    <div class="chat-body" v-bind:style="{width: chatBodyWidth + 'px', height: chatBodyHeight + 'px'}">
        <DialogList ref="dialogList"></DialogList>
        <div class="chat-window" >
            <div class="title">
                <span class="user-name">{{userName}}</span>
                <span class="user-source" data-id="0">{{userSource}}</span>
            </div>
            <div id="chatRoomContainer" class="chat-room-container" v-bind:style="{width: chatRoomWidth + 'px', height: chatRoomHeight + 'px'}">
                <ChatRoomItem ref="chatRoomItem" v-for="item in this.$store.state.dialogArr" v-bind:room="item.room" v-bind:fromUserId="item.fromUserId" v-show="item.isChecked"></ChatRoomItem>
            </div>
        </div>
    </div>
</template>

<script>
    import DialogList from "../components/DialogList";
    import ChatRoomItem from "../components/ChatRoomItem";
    export default {
        name: "IndexChatRoom",
        data: function() {
            return {
                chatBodyWidth: '',
                chatBodyHeight: '',
                chatRoomWidth: '',
                chatRoomHeight: '',
                userName: '',   // 客户名称
                userSource: '', // 客户来源
                account: '',    // 客服账号
                // dialogArr: [
                //     // {
                //     //     "from": "匿名用户",
                //     //     "body": "匿名用户加入房间",
                //     //     "type": "1",
                //     //     "room": "t15knr54111@conference.cluster.openfire",
                //     //     "serviceUserName": "testuser1",
                //     //     "fromUserId": "11337_8_1"
                //     // }
                // ],   // 当前已接入的会话
                // myDialogList: [],
                // accessDialogList: [],
                // leaveDialogList: []
            }
        },
        mounted() {
            window.createTestDialog = this.createTestDialog;
        },
        methods: {
            // 根据窗口变化改变大小
            setChatBodySize: function (width, height) {
                this.chatBodyWidth = width - (20 + 20); // 减去 padding
                this.chatBodyHeight = height - (20 + 28);
                // 设置分类会话栏高度
                this.$refs.dialogList.setDialogListSize(this.chatBodyHeight);
                // 设置消息容器大小，以便显示背景图
                this.chatRoomWidth = this.chatBodyWidth - 281;     // 减去左侧会话分类大小
                this.chatRoomHeight = this.chatBodyHeight - 50;
                return;

                // 设置显示聊天信息的容器大小
                this.$refs.chatRoomItem.setChatRoomSize(this.chatRoomWidth, this.chatRoomHeight);
                // var editContainer = document.querySelector(".chat-room-item.is-open .edit-container");
                // var editContainerHeight =  editContainer ? editContainer.offsetHeight : 158;    // 编辑区高度
                // if (editContainer) {
                //     document.querySelector(".chat-room-item.is-open .chat-dialog-show").style.height = (containerHeight-50-50-38-editContainerHeight-60) + "px";
                // } else {
                //     styleDom = $id("set_style");
                //     if (!styleDom) {
                //         var styleDom = document.createElement("style");
                //         styleDom.id = "set_style";
                //     }
                //     var chatSizeCss = ".chat-dialog-show{height: "+(containerHeight-50-50-38-editContainerHeight-60)+"px}";   //
                //     styleDom.innerHTML = chatSizeCss;
                //     document.documentElement.insertBefore(styleDom, document.body);
                // }
            },
            // 创建测试对话
            createTestDialog: function() {
                // 测试 start
                var data = {
                    "from": "匿名用户",
                    "body": "匿名用户加入房间",
                    "type": "1",
                    "room": "t15knr54111@conference.cluster.openfire",
                    "serviceUserName": "testuser1",
                    "fromUserId": "11337_8_1",
                    avatar: '//static.youjiagou.com/musi/resources/images/serviceSystem/default_avatar.png',
                    isOnline: true,
                    isChecked: false
                }
                this.account = "testuser1";
                this.createGroupChatRoom(data);
                // 测试 end
            },
            /**
             * 初始化会话分类及聊天室
             */
            createGroupChatRoom: function(data) {
                try {
                    data.fromUserId = data.fromUserId.split("_")[0];    // 客户id
                    // 客户离开后再加入
                    // var chatRoomDom = document.querySelector(".chat-room-item[data-fromuserid='"+data.fromUserId+"']");
                    // if (chatRoomDom) {
                    //     var dialogKinds = document.querySelectorAll(".dialog-list-item[data-fromuserid='"+data.fromUserId+"']");
                    //     for (var i=0; i<dialogKinds.length; i++) {
                    //         dialogKinds[i].dataset.room = data.room;
                    //     }
                    //     chatRoomDom.dataset.room = data.room;
                    //     chatRoomDom.dataset.is_end = "0";
                    //     this.moveIntoInTheAccess(data);  // 将已离开分类中的会话移动到访问中
                    //     return;
                    // }
                    // this.addDialogKind(data);
                    // this.init(data);
                    this.$store.commit('addDialog', data)
                    // 处理是否当天第一次收到消费者消息
                    // todayFirstReceiveMsg(data);
                } catch (e) {
                    alert("createGroupChatRoom: " + e);
                }
            },
            addDialogKind: function(data) {
                try {
                    // if (document.querySelector(".dialog-list-item[data-room='"+data.room+"']")) {
                    //     alert("exist dialog");
                    //     return;
                    // }

                    // var msg = {
                    //     room: data.room,
                    //     fromUserId: data.fromUserId,
                    //     from: data.from,
                    //     time: "",
                    //     content: "",
                    //     avatar: "//static.youjiagou.com/musi/resources/images/serviceSystem/default_avatar.png"
                    // }

                    // ajax_post({"param": {"chat_user_id": data.fromUserId}, "serviceName": "CSS_BUV1_userInfo", "needAll": "1"}, function (data) {
                    //     try {
                    //         data = JSON.parse(data);
                    //         if (data.code == "0") {
                    //             if (data.rows[0].avatar.indexOf("http") == -1) {
                    //                 data.rows[0].avatar = R_IMG + data.rows[0].avatar;
                    //             }
                    //             msg.avatar = data.rows[0].avatar;
                    //         } else {
                    //             console.log(data.description);
                    //         }
                    //     } catch (e) {
                    //         console.log(e);
                    //     }
                    // }, null, false);
                    return;
                    var tplHtml = template("dialogItemTpl", {"msg": msg});
                    var tempDom = document.createElement("div");
                    tempDom.innerHTML = tplHtml;
                    $id("myDialog").nextElementSibling.appendChild(tempDom.firstElementChild.cloneNode(true));  // 添加到我的会话分类
                    $id("inTheAccess").nextElementSibling.appendChild(tempDom.firstElementChild);   // 添加到访问中会话分类
                    // 如果我的会话分类默认打开的 ， 将当前会话列表展示
                    if ($id("myDialog").className.indexOf("is-open") != -1) {
                        var dialogList = $id("myDialog").nextElementSibling;
                        var dialogListHeight = dialogList.firstElementChild.offsetHeight * dialogList.children.length;
                        dialogList.style.height = dialogListHeight + "px";
                    }
                } catch(e) {
                    alert("addDialogKind: " + e);
                }
            },
            /**
             * 初始化聊天室
             * @param data
             */
            init: function (data) {
                try {
                    this.$store.commit('addDialog', data)
                    // if (document.querySelector(".chat-room-item[data-room='"+data.room+"']")) {
                    //     alert("exist chatRoom");
                    //     return;
                    // }
                    // var param = {
                    //     "room": data.room,
                    //     "fromUserId": data.fromUserId,
                    //     "account": data.serviceUserName
                    // }
                    // var chatRoomHtml = template("chatRoomItemTpl", {"param": param});
                    // var tempDom = document.createElement("div");
                    // tempDom.innerHTML = chatRoomHtml;
                    // $id("chatRoomContainer").appendChild(tempDom.firstElementChild);

                } catch (e) {
                    alert("chatRoom.init: " + e);
                }
            },
        },
        components: {ChatRoomItem, DialogList}
    }
</script>

<style scoped>
    .chat-body {
        display: flex;
        float: left;
        background: #f7f8fb;
        padding: 20px 20px 28px 20px;
    }
    .chat-body .chat-window {
        border-radius: 0 5px 0 0;
        background: #FFF;
    }
    .chat-body .chat-window .title {
        height: 50px;
        padding: 0 16px;
        border-bottom: 1px solid #efefef;
        border-radius: 5px 5px 0 0;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    .chat-window .title .user-name {
        font-size: 18px;
        font-family: PingFang SC,PingFang SC-Bold;
        font-weight: 700;
        color: #000;
    }
    .chat-window .title .user-source {
        background: linear-gradient(135deg,#ffcb66,#ffa14a);
        border-radius: 4px;
        font-size: 12px;
        font-family: Microsoft YaHei,Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: CENTER;
        color: #fff;
        margin-left: 10px;
        padding: 0 12px;
    }
    .chat-window #chatRoomContainer {
        background: #ededed url(//static.youjiagou.com/musi/resources/images/serviceSystem/index/logo.png) no-repeat center;
    }
</style>
