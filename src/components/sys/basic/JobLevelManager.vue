<template>
    <div>
        <div>
            <el-input style="width: 30%" size="small" v-model="jobLevel.name"
                      placeholder="添加职称..." prefix-icon="el-icon-plus"
                      @keydown.enter.native="addJobLevel"></el-input>
            <el-select class="jlSelect" clearable v-model="jobLevel.titleLevel" placeholder="职称等级"
                       size="small">
                <el-option v-for="item in options" :key="item.name"
                           :label="item.name" :value="item.name">
                </el-option>
            </el-select>
            <el-button style="margin-left: 10px;" size="small" type="primary"
                       @click="addJobLevel">添加
            </el-button>
        </div>
        <div style="width: 55%;margin-top: 15px;">
            <el-table :data="tableData" size="small" border stripe>
                <el-table-column prop="ids" label="编号" width="45%"></el-table-column>
                <el-table-column prop="name" label="职称名称" width="120%"></el-table-column>
                <el-table-column prop="titleLevel" label="职称级别" width="120%"></el-table-column>
                <el-table-column prop="createDate" label="创建日期" width="145%"></el-table-column>
                <el-table-column prop="enabled" label="是否启用" width="90%">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="waring" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.enabled" @click="handleEditLevel(scope.row)">编辑
                        </el-button>
                        <el-button size="mini" v-if="scope.row.enabled" type="info"
                                   @click="handleDelete(scope.row)">禁用
                        </el-button>

                        <el-button size="mini" v-if="scope.row.enabled" type="danger"
                                   @click="handleDeleteTrue(scope.row)">删除
                        </el-button>

                        <el-button type="success" size="mini"
                                   v-else
                                   @click="enableJobLevel(scope.row)">启用
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination style="float: right;margin-top: 5px;"
                           background
                           @current-change="currentNumChange"
                           :current-page="page.num"
                           :page-size="page.size"
                           layout="prev, pager, next"
                           :total="total">
            </el-pagination>
        </div>

        <el-dialog title="修改职称" :visible.sync="dialogVisible" width="30%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input size="small" class="levelInput" v-model="updateJobLevel.name"></el-input>
            </div>
            <div>
                <el-tag style="margin-top: 10px;">职称等级</el-tag>
                <el-select class="jlSelect" clearable v-model="updateJobLevel.titleLevel"
                           placeholder="职称等级" style="width: 50%;"
                           size="small">
                    <el-option v-for="item in options" :key="item.name"
                               :label="item.name" :value="item.name">
                    </el-option>
                </el-select>
            </div>
            <div>
                <el-tag style="margin-top: 10px; margin-right: 15px;">是否启用</el-tag>
                <el-switch
                        v-model="updateJobLevel.enabled"
                        active-color="启用" active-text="启用"
                        inactive-color="禁用" inactive-text="禁用">
                </el-switch>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doUpdateJobLevel">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JobLevelManager",
        data() {
            return {
                jobLevel: {
                    name: '',
                    titleLevel: ''
                },
                options: [],
                tableData: [],
                total: 0,
                page: {
                    num: 1,
                    size: 10
                },
                dialogVisible: false,
                updateJobLevel: {
                    name: '',
                    titleLevel: '',
                    enabled: ''
                }
            }
        },
        methods: {
            currentNumChange(val) {
                this.page.num = val;
                this.initJobLevel();
            },
            initTitleLevel() {
                this.getRequest(this.basicUrl.titleLevel).then(res => {
                    if (res) {
                        this.options = res;
                    }
                })
            },
            initJobLevel() {
                this.getRequest(this.basicUrl.jobLevel, this.page).then(res => {
                    if (res) {
                        let i = 1;
                        res.data.forEach(data => {
                            data.ids = i;
                            i++;
                        });
                        this.tableData = res.data;
                        this.total = res.total;
                    }
                })
            },
            // 添加职称
            addJobLevel() {
                if (this.jobLevel.name && this.jobLevel.titleLevel) {
                    this.postRequest(this.basicUrl.jobLevel, this.jobLevel).then(res => {
                        if (res) {
                            this.initJobLevel();
                            this.jobLevel.name = '';
                            this.jobLevel.titleLevel = '';
                        }
                    })
                } else {
                    this.$message.error("职称名称或等级不能为空");
                }
            },
            // 删除职称
            handleDelete(data) {
                this.$confirm('此操作将禁用【' + data.name + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest(this.basicUrl.jobLevel + data.id).then(response => {
                        if (response) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleDeleteTrue(data) {
                this.$confirm('此操作将删除【' + data.name + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest(this.basicUrl.jobLevel + data.id, {"isTrue": true}).then(response => {
                        if (response) {
                            this.initJobLevel();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 编辑
            handleEditLevel(data) {
                Object.assign(this.updateJobLevel, data);
                this.dialogVisible = true;
            },
            // 提交修改
            doUpdateJobLevel() {
                this.putRequest(this.basicUrl.jobLevel, this.updateJobLevel).then(res => {
                    if (res) {
                        this.initJobLevel();
                        this.dialogVisible = false;
                        this.updateJobLevel.name = '';
                    }
                })
            },
            // 启用职称
            enableJobLevel(data) {
                this.postRequest(this.basicUrl.jobLevel + data.id).then(res => {
                    if (res) {
                        this.initJobLevel();
                    }
                })
            }
        },
        mounted() {
            this.initTitleLevel();
            this.initJobLevel();
        }
    }
</script>

<style scoped>

    .jlSelect {
        margin-left: 10px;
    }

    .levelInput {
        margin-left: 10px;
        width: 50%;
    }
</style>
