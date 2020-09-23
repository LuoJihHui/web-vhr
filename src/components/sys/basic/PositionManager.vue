<template>
    <div>
        <div>
            <el-input class="posInput" placeholder="添加职位..." @keydown.enter.native="addPosition"
                      prefix-icon="el-icon-plus" v-model="position.name"></el-input>
            <el-button type="primary" icon="el-icon-plus" size="small"
                       @click="addPosition">添加
            </el-button>
        </div>
        <div>
            <el-table class="posTable" :data="positions" size="small" border stripe>
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="ids" label="编号" width="55"></el-table-column>
                <el-table-column prop="name" label="职位名称" width="180"></el-table-column>
                <el-table-column prop="createDate" label="创建时间"></el-table-column>
                <el-table-column prop="updateDate" label="更新时间"></el-table-column>
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
        </div>
        <el-dialog title="修改职位" :visible.sync="dialogVisible" width="30%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input class="updatePositionInput" v-model="updatePosition.name"></el-input>
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
                positions: []
            }
        },
        methods: {
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
            doUpdatePosition() {
                this.putRequest(this.basicUrl.position, this.updatePosition).then(response => {
                    if (response) {
                        this.loadPosition();
                        this.updatePosition.name = '';
                        this.dialogVisible = false;
                    }
                })
            },
            handleEdit(index, data) {
                this.updatePosition = data;
                this.dialogVisible = true;
            },
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
            }
        },
        mounted() {
            this.loadPosition();
        }
    }
</script>

<style scoped>
    .posInput {
        width: 300px;
        margin-right: 10px;
    }

    .posTable {
        width: 90%;
        margin-top: 15px;
    }

    .updatePositionInput {
        width: 200px;
        margin-left: 10px;
    }
</style>
