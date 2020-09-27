<template>
    <div>
        <div class="authTool">
            <el-input size="small" placeholder="请输入角色代码" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input size="small" placeholder="请输入角色名称" v-model="role.nameZh"></el-input>
            <el-button type="primary" size="small" icon="el-icon-plus"
                       @click="addRole">添加角色
            </el-button>
        </div>
        <div class="authCollapse">
            <el-collapse accordion @change="change" v-model="activeName">
                <el-collapse-item v-for="(r,index) in roles" :key="index" :title="r.nameZh"
                                  :name="r.id">
                    <el-card class="box-card">
                        <div slot="header">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0;color: red"
                                       type="text" icon="el-icon-delete"
                                       @click="delRole(r)"></el-button>
                        </div>
                        <div>
                            <el-tree show-checkbox :data="menus" node-key="id"
                                     :props="defaultProps" ref="tree" :key="index"
                                     :default-checked-keys="defaultChecked"></el-tree>
                            <div class="treeButton">
                                <el-button size="mini" type="primary"
                                           @click="doUpdate(r.id,index)">确认
                                </el-button>
                                <el-button size="mini" @click="cancel">取消</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
            <el-pagination
                    style="float: right;margin-top: 10px;"
                    background
                    layout="prev, pager, next"
                    :page-size="page.size"
                    :page-count="page.num"
                    @current-change="pageChange"
                    :total="pageTotal">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AuthorizationManager",
        data() {
            return {
                activeName: '-1',
                role: {
                    name: '',
                    nameZh: ''
                },
                page: {
                    num: 1,
                    size: 10
                },
                pageTotal: 0,
                roles: [],
                menus: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                defaultChecked: []
            }
        },
        methods: {
            initRoles() {
                this.getRequest(this.basicUrl.allRoles, this.page).then(res => {
                    if (res) {
                        console.log(res);
                        this.roles = res.records;
                        this.pageTotal = res.total;
                    }
                })
            },
            // 查所有菜单
            async initMenuTrees() {
                await this.getRequest(this.menu.allMenuTree).then(res => {
                    if (res) {
                        this.$set(this, "menus", res);
                    }
                })
            },
            // 查询当前角色已拥有菜单
            async initTreeChecked(rid) {
                await this.getRequest(this.basicUrl.menuByRoleId + rid).then(res => {
                    if (res) {
                        console.log(res);
                        console.log(this.activeName)
                        this.$set(this, "defaultChecked", res);
                        this.$refs.tree[this.activeName - 1].setCheckedKeys(this.defaultChecked);
                    }
                })
            },
            async change(roleId) {
                if (roleId) {
                    await this.initMenuTrees();
                    await this.initTreeChecked(roleId);
                }
            },
            // 分配菜单
            doUpdate(rid, index) {
                // 由于标记是在循环中,这里需要获取到点击的下标以获取当前资源id
                let treeElement = this.$refs.tree[index];
                let checkedKeys = treeElement.getCheckedKeys(true);
                this.putRequest(this.basicUrl.grantMenuToRole, {"rid": rid, "mid": checkedKeys});
                this.activeName = -1;
            },
            // 取消分配
            cancel() {
                this.activeName = -1;
            },
            addRole() {
                this.postRequest(this.basicUrl.role, this.role).then(res => {
                    if (res) {
                        this.initRoles();
                        this.role.nameZh = '';
                        this.role.name = '';
                    }
                });
            },
            // 翻页
            pageChange(val) {
                this.page.num = val;
                this.initRoles();
            },
            // 删除角色
            delRole(role) {
                this.$confirm('此操作将删除【' + role.nameZh + '】角色, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest(this.basicUrl.role + role.id).then(res => {
                        if (res) {
                            this.page.num = 1;
                            this.initRoles();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted() {
            this.initRoles();
        }
    }
</script>

<style scoped>

    .authTool {
        display: flex;
        justify-content: flex-start;
    }

    .authTool .el-input {
        width: 400px;
        margin-right: 10px;
    }

    .authCollapse {
        margin-top: 20px;
        width: 54.6%;
    }

    .treeButton {
        float: right;
        justify-content: flex-end;
        margin-bottom: 10px;
    }
</style>
