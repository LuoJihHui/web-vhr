<template>
    <div>
        <el-form
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :rules="rules" ref="loginForm" :model="loginFrom" class="loginContainer">
            <h3 class="loginTitle">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginFrom.username" auto-complete="off"
                          placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginFrom.password" auto-complete="off"
                          placeholder="请输入密码" @keydown.enter.native="submitLogin"></el-input>
            </el-form-item>
            <el-checkbox v-model="checked" class="loginRememberMe">记住我</el-checkbox>
            <el-button type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginFrom: {
                    username: 'admin',
                    password: '123'
                },
                checked: true,
                loading: false,
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            submitLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postKeyValueRequest(this.login.loginUrl, this.loginFrom).then(resp => {
                            this.loading = false;
                            if (resp) {
                                window.sessionStorage.setItem('user', JSON.stringify(resp));
                                // 获取to的跳转地址，判断后跳转到该地址
                                let path = this.$route.query.redirect;
                                this.$router.replace(path === '/' || path === undefined ? this.login.home : path);
                            }
                        })
                    } else {
                        this.$message.error('请输入所有字段');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style>
    .loginContainer {
        border-radius: 15px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 15px 35px 15px 35px;
        background: #ffffff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
    }

    .loginTitle {
        margin: 15px auto 40px auto;
        text-align: center;
        color: #505458;
    }

    .loginRememberMe {
        text-align: left;
        margin: 0 0 15px 0;
    }
</style>
