<template>
    <div class="content">
        <LoginHeader></LoginHeader>
        <div class="system-logo">
            <img src="http://www.musiyoujia.com/resources/images/serviceSystem/System_Logo.png" />
        </div>
        <div class="input-content">
            <input type="text" placeholder="账号" />
            <input type="password" placeholder="密码" />
        </div>
        <div class="login-btn">
            <button type="button" v-on:click="login">登录</button>
        </div>
        <div class="bottom-fun">
            <span id="forgetPwd">忘记密码?</span>
            <span id="signUp">立即注册</span>
        </div>
    </div>
</template>

<script>
    import LoginHeader from "../components/LoginHeader";
    const {ipcRenderer: ipcRender} = require('electron');
    export default {
        name: "Login",
        components: {LoginHeader},
        methods: {
            login: function () {
                this.$router.push('serviceIndex');
                ipcRender.send('window-max');
            }
        }
    }
</script>

<style scoped>
    .content {
        overflow: hidden;
        width: 395px;
        height: 514px;
        background: linear-gradient(
                180deg
                ,#1b2334,#47484b);
        position: relative;
    }
    .content .system-logo img {
        margin: 23px auto 67px;
        display: block;
    }
    .input-content input {
        margin: 0 auto 29px;
        width: 274px;
        background: #fff;
        height: 24px;
        line-height: 24px;
        padding: 4px 10px;
        border: none;
        outline: 0;
        box-sizing: border-box;
        font-size: 12px;
        color: #666;
        display: block;
    }
    .login-btn {
        margin: 34px auto 24px;
        text-align: center;
    }
    .login-btn button {
        width: 160px;
        height: 36px;
        background: linear-gradient(
                270deg
                ,rgba(219,178,112,.25),rgba(255,228,191,.25));
        border: none;
        font-size: 16px;
        font-family: PingFangSC,PingFangSC-Regular;
        font-weight: 400;
        text-align: center;
        color: rgba(255,255,255,.25);
        line-height: 22px;
        letter-spacing: 1px;
        outline: 0;
        cursor: pointer;
    }
    .bottom-fun {
        font-size: 14px;
        color: #dbb270;
        width: 274px;
        margin: 0 auto;
    }
    .bottom-fun span {
        cursor: pointer;
    }
    .bottom-fun span:first-child {
        float: left;
    }
    .bottom-fun span:last-child {
        float: right;
    }
</style>