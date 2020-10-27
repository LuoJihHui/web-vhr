<template>
    <div>
        <div style="margin-top: 10px; display: flex; justify-content:center">
            <el-input v-model="keywords" placholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                      style="width: 400px; margin-right: 10px;"></el-input>
            <el-button prefix-icon="el-icon-search" type="primary">搜索</el-button>
        </div>
        <div class="hr-container">
            <el-card class="hr-card" v-for="(hr,index) in hrs" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button style="float: right; padding: 3px 0;color: #e30007;" type="text" icon="el-icon-delete">
                    </el-button>
                </div>
                <div>
                    <div style="width: 100%;display: flex;justify-content: center;">
                        <img :src="hr.userFace" :alt="hr.name" :title="hr.name" class="hr-img">
                    </div>
                    <div class="userInfo-container">
                        <div>用户名:{{hr.name}}</div>
                        <div>手机号码:{{hr.phone}}</div>
                        <div>电话号码:{{hr.telephone}}</div>
                        <div>地址:{{hr.address}}</div>
                        <div>用户状态:
                            <el-switch v-model="hr.enabled" active-text="启用" inactive-text="禁用"
                                       @change="enableChange(hr)"></el-switch>
                        </div>
                        <div>用户角色:
                            <el-tag style="margin-right: 5px;" type="success" v-for="(role,index) in hr.roles"
                                    :key="index">
                                {{role.nameZh}}
                            </el-tag>
                            <el-button icon="el-icon-more" type="text"></el-button>
                        </div>
                        <div>备注:{{hr.remark}}</div>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SysHr",
        data() {
            return {
                keywords: '',
                hrs: []
            }
        },
        mounted() {
            this.initHrs();
        },
        methods: {
            initHrs() {
                this.getRequest(this.basicUrl.hrs).then(resp => {
                    if (resp) {
                        this.hrs = resp;
                    }
                });
            },
            enableChange(hr) {
                if (hr) {
                    this.putRequest(this.basicUrl.hrs, hr).then(resp => {
                        if (resp) {
                            this.initHrs();
                        }
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .hr-container {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }

    .hr-card {
        width: 350px;
        margin-bottom: 20px;
    }

    .hr-img {
        width: 72px;
        height: 72px;
        border-radius: 72px;
    }

    .userInfo-container {
        font-size: 16px;
        color: #409eff;
    }
</style>
