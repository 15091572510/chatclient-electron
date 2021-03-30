<template>
    <div class="index-header">
        <div class="drag-area">
            <span class="system-icon"></span>
            <div class="window-fun">
                <span id="miniBtn" class="mini-icon" v-on:click="miniWin" title="最小化"></span>
                <span id="max_restore_btn" class="max-icon" data-id="max" v-on:click="maxWin" :title="maxIconTip"></span>
                <span id="closeBtn" class="close-icon" v-on:click="closeWin" title="关闭"></span>
            </div>
        </div>
    </div>
</template>

<script>
    const {ipcRenderer: ipcRender} = require('electron')
    export default {
        name: "IndexHeader",
        data: function() {
            return {
                maxIconTip: ''
            }
        },
        methods: {
            miniWin: function () {
                ipcRender.send('window-min');
            },
            maxWin: function () {
                ipcRender.send('window-max');
            },
            closeWin: function () {
                ipcRender.send('window-close');
            }
        },
        mounted() {
            ipcRender.on('main-window-max', (e) => {
                let max = document.getElementById('max_restore_btn');
                max.dataset.id = 'max';
                this.maxIconTip = '向下还原';
            });
            ipcRender.on('main-window-unmax', (e) => {
                let max = document.getElementById('max_restore_btn');
                max.dataset.id = 'restore';
                this.maxIconTip = '最大化';
            });
        }
    }
</script>

<style scoped>
    .index-header {
        height: 60px;
        box-shadow: 0 1px 4px 0 #ededed;
        padding: 4px 4px 0 4px;
        position: relative;
    }
    .drag-area {
        height: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        -webkit-app-region: drag;
        -webkit-user-select: none;
    }
    .index-header .system-icon {
        width: 200px;
        height: 42px;
        background: url("//www.musiyoujia.com/resources/images/serviceSystem/new/logo.svg") no-repeat center/contain;
        display: inline-block;
    }
    .index-header .window-fun {
        position: absolute;
        z-index: 9999;
        right: 0;
        top: 0;
    }
    .index-header .window-fun span {
        cursor: pointer;
        padding: 16px 20px;
        width: 16px;
        height: 16px;
        box-sizing: border-box;
        display: inline-block;
        -webkit-app-region: no-drag;
    }
    .index-header .mini-icon {
        background: url(//static.youjiagou.com/musi/resources/images/serviceSystem/new/mini@2x.png) no-repeat center/35%;
    }
    .index-header .mini-icon:hover {
        background-color: #c7cacf;
    }
    .index-header .max-icon[data-id='max'] {
        background: url(//static.youjiagou.com/musi/resources/images/serviceSystem/new/medium@2x.png) no-repeat center/35%;
    }
    .index-header .max-icon[data-id='restore'] {
        background: url("//static.youjiagou.com/musi/resources/images/serviceSystem/new/max@2x.png") no-repeat center/35%;
    }
    .index-header .max-icon:hover {
        background-color: #c7cacf!important;
    }
    .index-header .close-icon {
        background: url(//static.youjiagou.com/musi/resources/images/serviceSystem/new/close@2x.png) no-repeat center/35%;
    }
    .index-header .close-icon:hover {
        background-color: red;
    }
</style>