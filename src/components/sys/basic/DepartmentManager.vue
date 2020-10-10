<template>
    <div style="width: 50%">
        <el-input
                placeholder="输入组织名称进行搜索"
                prefix-icon="el-icon-search"
                v-model="filterText">
        </el-input>

        <el-tree
                class="filter-tree"
                :data="department"
                :props="defaultProps"
                :expand-on-click-node="expandOnClickNode"
                :filter-node-method="filterNode"
                node-key="id"
                :default-expanded-keys="defaultsExpandedKeys"
                ref="tree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
        <span ref="depSpan" @click="updateOnClick">{{ data.name }}</span>
        <span class="departmentButton">
            <i class="el-icon-circle-plus" @click="addDepartment(data)"></i>
            <i class="el-icon-delete-solid" @click="delDepartment(data)"></i>
        </span>
      </span>
        </el-tree>

        <el-dialog :visible.sync="dialogDisplay"
                   title="添加组织"
                   width="30%">
            <div>
                <el-tag>组织名称</el-tag>
                <el-input class="depInput" size="small"
                          placeholder="请输入组织名称"
                          v-model="departmentName" @keydown.enter.native="doUpdate"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogDisplay = false">取 消</el-button>
                <el-button type="primary" @click="doUpdate">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "DepartmentManager",
        data() {
            return {
                department: [],
                filterText: '',
                dialogDisplay: false,
                departmentName: '',
                defaultsExpandedKeys: [],
                parentId: '',
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                expandOnClickNode: false
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            // 加载组织树
            initDepartment() {
                this.getRequest(this.basicUrl.department).then(res => {
                    if (res) {
                        this.department = res;
                    }
                })
            },
            // 控制点击其他地方收放菜单树
            updateOnClick() {
                this.expandOnClickNode = true;
            },
            // 节点过滤
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            // 添加部门
            addDepartment(data) {
                this.dialogDisplay = true;
                this.parentId = data.id;
                this.expandOnClickNode = false;
            },
            // 删除部门
            delDepartment(data) {
                this.$confirm('此操作将删除组织【' + data.name + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delRequest(this.basicUrl.department + data.id).then(res => {
                        if (res) {
                            let expandId = [];
                            expandId.push(data.parentId);
                            this.defaultsExpandedKeys = expandId;
                            this.initDepartment();
                        }
                    })
                }).catch(() => {
                    this.$notify({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 提交添加
            doUpdate() {
                this.postRequest(this.basicUrl.department,
                    {'parentId': this.parentId, 'name': this.departmentName})
                    .then(res => {
                        if (res) {
                            let expandId = [];
                            expandId.push(res);
                            this.defaultsExpandedKeys = expandId;
                            this.initDepartment();
                            this.dialogDisplay = false;
                            this.parentId = '';
                            this.departmentName = '';
                        }
                    })
            }
        },
        mounted() {
            this.initDepartment();
        }
    }
</script>

<style scoped>

    .departmentButton i {
        padding: 2px;
        margin: 2px;
        color: rgb(68, 104, 216)
    }

    .depInput {
        margin-left: 10px;
        width: 70%;
    }
</style>
