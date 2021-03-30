<template>
    <div class="sidebar" v-bind:style="{height: sidebarHeight + 'px'}">
        <div class="user-info-container">
            <div class="avatar-container">
                <img class="user-avatar" src="//static.youjiagou.com/musi/resources/images/serviceSystem/index/avatar.jpg" v-on:click="gotoUserInfo()">
                <span class="status-icon" v-bind:class="{'is-open': isOpen}" id="statusIcon" v-bind:data-id="status" v-on:click.stop="showStatusSelect()"></span>
                <ul id="onlineStatusSelect" class="online-status-select" v-on:click="changeOnlineStatus()" v-bind:style="{height: statusSelectHeight + 'px'}">
                    <li data-status="0">在线</li>
                    <li data-status="2">离开</li>
                    <li data-status="3">忙碌</li>
                </ul>
            </div>
            <p class="user-name">{{username}}</p>
        </div>
        <ul class="menu-list">
            <li class="checked" data-id="dialog_list" v-on:click="checkMenu()">
                <img class="menu-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/conversation_list@2x.png">
                <span>会话列表</span>
            </li>
            <li data-id="work_order" v-on:click="openOrHidden()">
                <img class="menu-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/work_order_manager@2x.png">
                <span>工单管理</span>
                <img class="list-down-icon" src="//static.youjiagou.com/musi/resources/images/serviceSystem/new/listdown@2x.png">
            </li>
            <ul class="menu-select" v-on:click="checkChildMenu()">
                <li data-id="distribute_install" data-url="//www.musiyoujia.com/ipadIndex/?tag=delivery_install_list">配送安装工单</li>
                <li data-id="appreciate_service" data-url="//www.musiyoujia.com/ipadIndex/?tag=service_from_list">增值服务工单</li>
                <li data-id="good_after_sale" data-url="//www.musiyoujia.com//ipadIndex/?tag=after_sales_list">商品售后工单</li>
                <li data-id="complaint" data-url="//www.musiyoujia.com/ipadIndex/?tag=complaints_info_list">投诉工单</li>
            </ul>
            <li data-hierarchy="0" data-id="knowledge" v-on:click="checkMenu()">
                <img class="menu-icon" src="//static.youjiagou.com//musi/resources/images/serviceSystem/new/knowlege_base.png">
                <span>知识库</span>
            </li>
        </ul>
    </div>
</template>

<script>
    import { $id } from '../util/common';
    export default {
        name: "IndexSidebar",
        data: function() {
            return {
                username: 'seven',
                statusSelectHeight: '0',
                isOpen: false,
                status: '0',
                sidebarHeight: ''
            }
        },
        methods: {
            setSidebarHeight: function(height) {
                this.sidebarHeight = height;
            },
            gotoUserInfo: function () {

            },
            /**
             * 显示客服状态下拉
             */
            showStatusSelect: function () {
                event.stopPropagation();
                if (this.statusSelectHeight !== '0') {
                    this.statusSelectHeight = '0';
                    this.isOpen = false;
                } else {
                    var children = $id("onlineStatusSelect").children;
                    this.statusSelectHeight = 30 * children.length;
                    this.isOpen = true;
                }
            },
            hideStatusSelect: function() {
                this.statusSelectHeight = '0';
                this.isOpen = false;
            },
            /**
             * 改变在线状态
             */
            changeOnlineStatus: function () {
                var target = event.target;
                if (target.id != "onlineStatusSelect") {
                    var status = target.dataset.status;
                    this.status = status;
                    // top.nativeInvokeJava("setOnlineStatus", {"status": status}, function (data) {
                    //     this.status = status;
                    // });
                }
            },
            // 打开、关闭菜单
            openOrHidden: function () {
                var menuList = document.querySelectorAll(".menu-list li");
                var target = event.currentTarget;
                if (target.className.indexOf("checked") != -1) {    // 已打开
                    target.nextElementSibling.style.height = "0";
                    target.classList.remove("checked");
                } else {    // 未打开
                    var children = target.nextElementSibling.children;
                    target.nextElementSibling.style.height = (50 * children.length) + "px";
                    for (var i=0; i<menuList.length; i++) {
                        menuList[i].classList.remove("checked");
                    }
                    target.classList.add("checked");
                }
            },
            // 选中父菜单
            checkMenu: function () {
                var menuList = document.querySelectorAll(".menu-list li");
                var menuSelect = document.querySelectorAll(".menu-list .menu-select");
                var target = event.currentTarget;
                var menuId = target.dataset.id;
                // 添加选中状态
                for (var i=0; i<menuList.length; i++) {
                    menuList[i].classList.remove("checked");
                }
                target.classList.add("checked");
                // 收取有子级的菜单
                for (var i=0; i<menuSelect.length; i++) {
                    menuSelect[i].style.height = "0";
                }
                return;
                // 打开iframe
                if (menuId == "dialog_list") {  // 如果是聊天菜单打开聊天iframe，关闭其他内容iframe界面
                    $id("otherContentIframe").style.display = "none";
                    $id("chatContentIframe").style.display = "block";
                } else {
                    $id("chatContentIframe").style.display = "none";
                    $id("otherContentIframe").style.display = "block";
                }
            },
            // 选中子菜单
            checkChildMenu: function () {
                var target = event.target;
                var sibling = target.parentElement.children;
                for (var i=0; i<sibling.length; i++) {
                    sibling[i].classList.remove("checked");
                }
                target.classList.add("checked");
                return;
                // 关闭聊天iframe，打开其他内容iframe界面
                $id("chatContentIframe").style.display = "none";
                $id("otherContentIframe").style.display = "block";
                var protocol = window.location.protocol;
                var url = target.dataset.url;
                // toast("url:"+url + "&chat_user_id="+chat_user_id+"&chat_service_user_name=" + account);
                $id("otherContentIframe").src = protocol + url + "&chat_user_id="+chat_user_id+"&chat_service_user_name=" + encodeURIComponent(account) + "&chat_service_userid=" + chat_service_userid;
                // $id("otherContentIframe").src = protocol + url + "&chat_user_id="+60+"&chat_service_user_name=testuser1&chat_service_userid=" + chat_service_userid;
            }
        }
    }
</script>

<style scoped>
    .sidebar {
        width: 200px;
        background: #222;
        overflow: auto;
        float: left;
    }
    /* 用户头像信息 */
    .sidebar .user-info-container {
        margin: 50px 0;
        text-align: center;
        user-select: none;
    }
    .sidebar .user-info-container .avatar-container {
        position: relative;
        width: 60px;
        height: 60px;
        margin: 0 auto;
    }
    .sidebar .user-info-container .user-avatar {
        border-radius: 50%;
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        border: 2px solid rgba(255,255,255,.39);
    }
    .avatar-container .status-icon {
        width: 12px;
        height: 12px;
        display: inline-block;
        border: 1px solid rgba(255,255,255,.57);
        background: #78f86d;
        border-radius: 50%;
        position: absolute;
        right: 4px;
        bottom: -3px;
    }
    .avatar-container .status-icon[data-id='2'] {
        background: #adadad
    }
    .avatar-container .status-icon[data-id='3'] {
        background: #fd563c
    }
    .avatar-container .status-icon:hover {
        box-shadow: 5px 5px 1px 5px rgb(0 0 0 / 10%) inset;
    }
    .status-icon.is-open+.online-status-select {
        padding: 10px 0;
        border: 1px solid #efefef;
    }
    .avatar-container .online-status-select {
        height: 0;
        transition: height .15s;
        list-style: none;
        position: absolute;
        top: 75px;
        left: 20px;
        background: rgba(255,255,255,.9);
        border-radius: 2px;
        margin: 0;
        font-size: 14px;
        width: 100px;
        overflow: hidden;
        padding: 0;
    }
    .avatar-container .online-status-select li {
        cursor: pointer;
        height: 30px;
        text-align: left;
        line-height: 30px;
        padding: 0 15px;
        font-size: 12px;
        font-weight: 600;
    }
    .avatar-container .online-status-select li:hover {
        background: #ecf5ff;
    }
    .avatar-container .online-status-select li:before {
        content: "";
        width: 12px;
        height: 12px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 10px;
        border: 1px solid rgba(255,255,255,.57);
        vertical-align: middle;
    }
    .avatar-container .online-status-select li[data-status='0']:before {
        background: #78f86d;
    }
    .avatar-container .online-status-select li[data-status='2']:before {
        background: #adadad;
    }
    .avatar-container .online-status-select li[data-status='3']:before {
        background: #fd563c;
    }
    .sidebar .user-info-container .user-name {
        color: #fff;
        margin-top: 20px;
        font-size: 16px;
        font-family: PingFang SC,PingFang SC-Bold;
        font-weight: 700;
    }
    /* 菜单列表 */
    .sidebar>ul li {
        overflow: auto;
        padding: 10px 20px;
        cursor: pointer;
        height: 50px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
    }
    .sidebar>ul li:hover, .sidebar>ul>li.checked {
        background: #414141;
    }
    .sidebar ul li .menu-icon {
        width: 20px;
        height: 20px;
        vertical-align: middle;
    }
    .sidebar ul li span {
        font-size: 15px;
        text-align: center;
        color: rgba(255,255,255,.8);
        vertical-align: middle;
        margin-left: 15px;
    }
    .sidebar ul li .list-down-icon {
        width: 10px;
        height: 10px;
        margin-left: 20px;
        transition: transform .3s;
    }
    .sidebar .menu-select {
        height: 0;
        transition: height .3s;
        overflow: hidden;
    }
    .sidebar .menu-select li {
        color: rgba(255,255,255,.8);
        padding-left: 83px;
        font-size: 14px;
    }
    .sidebar .menu-select li.checked {
        color: #3f9bff;
    }
</style>