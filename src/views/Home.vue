<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">微人事</div>
                <el-dropdown class="userInfo" @command="commandHandler">
  <span class="el-dropdown-link">
    {{user.name}}<i><img :src="user.userFace"></i>
  </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
                        <el-dropdown-item command="setting">设置</el-dropdown-item>
                        <el-dropdown-item divided command="logout">注销登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <el-menu router>
                        <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden"
                                    :key="index">
                            <template slot="title">
                                <i style="color: #409eff;margin-right: 10px;" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item :key="indexJ" :index="child.path" v-for="(child,indexJ) in item.children">
                                    {{child.name}}
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <el-breadcrumb separator="/" v-if="this.$router.currentRoute.path!==this.login.home">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item><a href="/">{{this.$router.currentRoute.name}}</a></el-breadcrumb-item>
                    </el-breadcrumb>

                    <div class="helloWelcome" v-if="this.$router.currentRoute.path === this.login.home">欢迎来到微人事！</div>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                user: JSON.parse(window.sessionStorage.getItem('user'))
            }
        },
        computed: {
            routes() {
                return this.$store.state.routes;
            }
        },
        methods: {
            commandHandler(val) {
                if (val === this.login.loginOutUrl) {
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest(this.login.loginOutUrl);
                        window.sessionStorage.removeItem('user');
                        this.$router.replace(this.login.root);
                        this.$store.commit("initRoutes", '');
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }
        }
    }
</script>

<style scoped>
    .homeHeader {
        background-color: #409eff;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 40px;
        font-family: 全新硬笔行书简, serif;
        color: #f1f6fa;
    }

    .homeHeader .userInfo {
        cursor: pointer;
    }

    .el-dropdown-link img {
        width: 50px;
        height: 50px;
        border-radius: 25px;
        margin-left: 8px;
    }

    .el-dropdown-link {
        display: flex;
        align-items: center;
    }

    .helloWelcome {
        text-align: center;
        font-size: 30px;
        font-family: 全新硬笔行书简, serif;
        color: #409eff;
        padding-top: 50px;
    }
</style>
