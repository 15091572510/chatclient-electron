<template>
    <div class="header">
        <img src="//www.musiyoujia.com/resources/images/serviceSystem/img_reg_logo_top.png" />
        <div class="window-fun">
            <span class="min-icon" v-on:click="minWin"></span>
            <span class="close-icon" v-on:click="closeWin"></span>
        </div>
    </div>
</template>

<script>
    const {ipcRenderer: ipcRender} = require('electron');
    export default {
        name: "LoginHeader",
        methods: {
            minWin: function () {
                ipcRender.send('window-min');
            },
            closeWin: function () {
                ipcRender.send('window-close');
            }
        }
    }
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        -webkit-app-region: drag;
        -webkit-user-select: none;
    }
    .window-fun span {
        width: 26px;
        height: 26px;
        display: inline-block;
        cursor: pointer;
        -webkit-app-region: no-drag;
    }
    .window-fun .min-icon {
        background: url("//www.musiyoujia.com/resources/images/serviceSystem/mini.png") no-repeat center/60%;
    }
    .header .window-fun .min-icon:hover {
        background-color: #4b4f59;
    }
    .window-fun .close-icon {
        background: url("//www.musiyoujia.com/resources/images/serviceSystem/shut.png") no-repeat center/60%;
    }
    .header .window-fun .close-icon:hover {
        background-color: red;
    }
</style>