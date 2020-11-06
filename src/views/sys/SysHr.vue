<template>
    <div>
        <div style="margin-top: 10px; display: flex; justify-content:center">
            <el-input v-model="keywords" placholder="通过用户名搜索用户..." prefix-icon="el-icon-search"
                      style="width: 400px; margin-right: 10px;" @change="queryKeyWords"></el-input>
            <el-button prefix-icon="el-icon-search" type="primary" @click="queryKeyWords">搜索</el-button>
        </div>
        <div class="hr-container">
            <el-card class="hr-card" v-for="(hr,index) in hrs" :key="index">
                <div slot="header" class="clearfix">
                    <span>{{hr.name}}</span>
                    <el-button @click="delHr(hr)" style="float: right; padding: 3px 0;color: #e30007;" type="text"
                               icon="el-icon-delete">
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
                            <el-popover
                                    placement="right"
                                    title="角色列表"
                                    @show="showPop(hr)"
                                    @hide="hidePop(hr)"
                                    width="200"
                                    trigger="click"
                                    content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                <el-select v-model="selectedRoles" placeholder="请选择" multiple>
                                    <el-option
                                            v-for="(r,index) in roles"
                                            :key="index"
                                            :label="r.nameZh"
                                            :value="r.id">
                                    </el-option>
                                </el-select>
                                <el-button slot="reference" icon="el-icon-more" type="text"></el-button>
                            </el-popover>
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
                hrs: [],
                roles: [],
                selectedRoles: []
            }
        },
        mounted() {
            this.initHrs();
        },
        methods: {
            // 关键字搜索
            queryKeyWords() {
                this.getRequest(this.basicUrl.hrs + "?keywords=" + this.keywords).then(resp => {
                    if (resp) {
                        this.hrs = resp;
                    }
                });
            },
            // 显示角色标签
            showPop(hr) {
                this.selectedRoles = [];
                hr.roles.forEach(r => {
                    this.selectedRoles.push(r.id);
                });
                this.initRoles();
            },
            // 隐藏并触发更新角色信息
            hidePop(hr) {
                let flag = false;
                // 这里将hr对象的角色拷贝一份用作下面遍历,以求不影响原先的数据展示
                let roles = [];
                Object.assign(roles, hr.roles);
                // 2边不一致;肯定新增或者删除了角色,需要更新
                if (roles.length !== this.selectedRoles.length) {
                    flag = true;
                } else {
                    for (let i = 0; i < roles.length; i++) {
                        let role = roles[i];
                        for (let j = 0; j < this.selectedRoles.length; j++) {
                            let sr = this.selectedRoles[j];
                            // 如果有相同角色id,在hr对象中拷贝的数据移除相同的角色id
                            if (role.id === sr) {
                                roles.splice(i, 1);
                                i--;
                                break;
                            }
                        }
                    }
                    // 角色列表为空说明角色都被删完了,需要更新
                    if (roles.length !== 0) {
                        flag = true;
                    }
                }
                if (flag) {
                    this.putRequest(this.basicUrl.updateRoles, {'hrId': hr.id, 'rid': this.selectedRoles})
                        .then(resp => {
                            if (resp) {
                                this.initHrs();
                            }
                        });
                }
            },
            delHr(hr) {
                this.$confirm('此操作将永久删除人员【' + hr.name + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest(this.basicUrl.hrs + "/" + hr.id).then(resp => {
                        if (resp) {
                            this.initHrs();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
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
            },
            initRoles() {
                this.getRequest(this.basicUrl.allRoles).then(resp => {
                    if (resp) {
                        this.roles = resp.records;
                    }
                });
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
