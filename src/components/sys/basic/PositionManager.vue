<template>
    <div>
        <div>
            <el-input class="posInput" placeholder="添加职位..." @keydown.enter.native="addPosition"
                      prefix-icon="el-icon-plus" size="small" v-model="position.name"></el-input>
            <el-button type="primary" icon="el-icon-plus" size="small"
                       @click="addPosition">添加
            </el-button>
        </div>
        <div style="width: 100%">
            <el-table class="posTable" :data="positions" size="small" border stripe
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="45%"></el-table-column>
                <el-table-column prop="ids" label="编号" width="45%"></el-table-column>
                <el-table-column prop="name" label="职位名称" width="120%"></el-table-column>
                <el-table-column prop="createDate" width="145%" label="创建时间"></el-table-column>
                <el-table-column prop="updateDate" width="145%" label="更新时间"></el-table-column>
                <el-table-column prop="enabled" label="是否启用" width="90%">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="info" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button size="mini" type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" style="margin-top: 10px;"
                       :disabled="multipleSelection.length === 0" @click="delPosition">批量删除
            </el-button>
        </div>
        <el-dialog title="修改职位" :visible.sync="dialogVisible" width="30%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input size="small" class="updatePositionInput" v-model="updatePosition.name"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="doUpdatePosition">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    export default {
        name: "PositionManager",
        data() {
            return {
                position: {
                    name: ''
                },
                dialogVisible: false,
                updatePosition: {
                    name: ''
                },
                positions: [],
                multipleSelection: []
            }
        },
        methods: {
            // 添加事件
            addPosition() {
                if (this.position.name) {
                    this.postRequest(this.basicUrl.position, this.position).then(response => {
                        if (response) {
                            this.loadPosition();
                            this.position.name = '';
                        }
                    })
                } else {
                    this.$message.error("添加职位名不能为空");
                }
            },
            // 加载职位列表
            loadPosition() {
                this.getRequest(this.basicUrl.positionList).then(response => {
                    if (response) {
                        let i = 1;
                        response.forEach(data => {
                            data.ids = i;
                            i++;
                        });
                        this.positions = response;
                    }
                })
            },
            // 编辑调用接口
            doUpdatePosition() {
                this.putRequest(this.basicUrl.position, this.updatePosition).then(response => {
                    if (response) {
                        this.loadPosition();
                        this.updatePosition.name = '';
                        this.dialogVisible = false;
                    }
                })
            },
            // 编辑
            handleEdit(index, data) {
                Object.assign(this.updatePosition, data);
                this.dialogVisible = true;
            },
            // 删除职位
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除【' + data.name + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest(this.basicUrl.position + data.id).then(response => {
                        if (response) {
                            this.loadPosition();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 多选点击事件
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 多选删除
            delPosition() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = [];
                    this.multipleSelection.forEach(data => {
                        ids.push("" + data.id);
                    });
                    console.log(ids);
                    this.delRequest(this.basicUrl.delMany, ids).then(res => {
                        if (res) {
                            this.loadPosition();
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        },
        mounted() {
            this.loadPosition();
        }
    }
</script>

<style scoped>
    .posInput {
        width: 30%;
        margin-right: 10px;
    }

    .posTable {
        width: 55%;
        margin-top: 15px;
    }

    .updatePositionInput {
        width: 200px;
        margin-left: 10px;
    }
</style>
