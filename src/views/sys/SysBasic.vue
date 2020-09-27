<template>
    <div>
        <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="部门管理" name="DepartmentManager"><DepartmentManager></DepartmentManager></el-tab-pane>
            <el-tab-pane label="职位管理" name="PositionManager"><PositionManager></PositionManager></el-tab-pane>
            <el-tab-pane label="职称管理" name="JobLevelManager"><JobLevelManager></JobLevelManager></el-tab-pane>
            <el-tab-pane label="奖惩规则" name="RewardRulesManager"><RewardRulesManager></RewardRulesManager></el-tab-pane>
            <el-tab-pane label="权限组" name="AuthorizationManager"><AuthorizationManager></AuthorizationManager></el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import AuthorizationManager from "../../components/sys/basic/AuthorizationManager"; // 权限组
    import DepartmentManager from "../../components/sys/basic/DepartmentManager"; // 部门
    import JobLevelManager from "../../components/sys/basic/JobLevelManager";  // 职称
    import PositionManager from "../../components/sys/basic/PositionManager"; // 职位
    import RewardRulesManager from "../../components/sys/basic/RewardRulesManager"; //奖惩规则

    export default {
        name: "SysBasic",
        data() {
            return {
                activeName: 'AuthorizationManager'
            }
        },
        components: {
            AuthorizationManager,
            DepartmentManager,
            JobLevelManager,
            PositionManager,
            RewardRulesManager
        }
    }
</script>

<style scoped>

</style>
