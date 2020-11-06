<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-input placeholder="请输入员工名进行搜索..." prefix-icon="el-icon-search"
                          style="width: 300px; margin-right: 10px;"></el-input>
                <el-button icon="el-icon-search" type="primary">搜索</el-button>
                <el-button type="primary">
                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>
                    高级搜索
                </el-button>
            </div>
            <div>
                <el-button type="success">
                    <i class="fa fa-download" aria-hidden="true"></i>
                    导入数据
                </el-button>
                <el-button type="success" @click="dialogVisible=true">
                    <i class="fa fa-upload" aria-hidden="true"></i>
                    导出数据
                </el-button>
                <el-button type="success" icon="el-icon-plus">
                    添加用户
                </el-button>

                <el-dialog
                        title="导出人员数据"
                        :visible.sync="dialogVisible"
                        width="30%">
                    <el-radio v-model="radio" :label="1">导出当前页</el-radio>
                    <el-radio v-model="radio" :label="2">导出所有</el-radio>
                    <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="downloadEmpExcel">确 定</el-button>
                </span>
                </el-dialog>
            </div>
        </div>
        <div style="margin-top: 20px;">
            <el-table
                    :data="employees"
                    border
                    stripe
                    style="width: 100%;">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column prop="name" label="姓名" fixed align="left" width="90"></el-table-column>
                <el-table-column prop="workID" label="工号" align="left" width="90"></el-table-column>
                <el-table-column prop="gender" label="性别" align="left"></el-table-column>
                <el-table-column prop="birthday" label="生日" align="left" width="110"></el-table-column>
                <el-table-column prop="idCard" label="身份证号" align="left" width="180"></el-table-column>
                <el-table-column prop="wedlock" label="婚姻状况" align="left"></el-table-column>
                <el-table-column prop="nationName" label="民族" align="left"></el-table-column>
                <el-table-column prop="nativePlace" label="籍贯" align="left"></el-table-column>
                <el-table-column prop="politicName" label="政治面貌" align="left"></el-table-column>
                <el-table-column prop="email" label="电子邮件" align="left" width="150"></el-table-column>
                <el-table-column prop="phone" label="电话号码" align="left" width="115"></el-table-column>
                <el-table-column prop="address" label="联系地址" align="left" width="200"></el-table-column>
                <el-table-column prop="departmentName" label="所属部门" align="left"></el-table-column>
                <el-table-column prop="posName" label="职位" align="left" width="110"></el-table-column>
                <el-table-column prop="jobLevelName" label="职称" align="left" width="150"></el-table-column>
                <el-table-column prop="engageForm" label="聘用形式" align="left"></el-table-column>
                <el-table-column prop="beginDate" label="入职时间" align="left" width="100"></el-table-column>
                <el-table-column prop="conversionTime" label="转正时间" align="left" width="100"></el-table-column>
                <el-table-column prop="beginContract" label="合同起始时间" align="left" width="100"></el-table-column>
                <el-table-column prop="endContract" label="合同终止时间" align="left" width="100"></el-table-column>
                <el-table-column label="合同期限" align="left" width="100">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}</el-tag>年
                    </template>
                </el-table-column>
                <el-table-column prop="tiptopDegree" label="最高学历" align="left"></el-table-column>
                <el-table-column label="操作" width="200" fixed="right">
                    <template slot-scope="scope">
                        <el-button style="padding: 5px;" size="mini">编辑</el-button>
                        <el-button style="padding: 5px;" size="mini" type="primary">查看高级资料</el-button>
                        <el-button style="padding: 5px;" size="mini" type="danger">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
    import {exportExcel} from "../../utils/download";

    export default {
        name: "EmpBasic",
        data() {
            return {
                employees: [],
                paging: {
                    page_size: 10,
                    page_num: 1,
                    is_export: 0
                },
                dialogVisible: false,
                radio: 0
            }
        },
        mounted() {
            this.initEmployees();
        },
        methods: {
            initEmployees() {
                this.getRequest(this.basicUrl.employee, this.paging).then(resp => {
                    if (resp) {
                        this.employees = resp.records;
                    }
                });
            },
            downloadEmpExcel() {
                this.paging.is_export = this.radio;
                this.ExportRequest(this.basicUrl.employee, this.paging).then(resp => {
                    if (resp) {
                        exportExcel(resp.data, "人员基本资料");
                        this.dialogVisible = false;
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
