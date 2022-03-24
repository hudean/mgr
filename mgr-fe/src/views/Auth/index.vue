<template>
  <div class="auth">
    <div class="bg"></div>
    <div class="title-info">
      <img src alt />
      <div class="title">小程序后台管理系统</div>
    </div>

    <div class="form">
      <a-tabs>
        <a-tab-pane key="1" tab="登录">
          <div class="item">
            <a-input 
            size="large" 
            placeholder="账户"
            v-model:value="loginForm.account"
            >
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input 
            size="large" 
            placeholder="密码"
            v-model:value="loginForm.password"
            >
              <template v-slot:prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a href>忘记密码</a>
          </div>
          <div class="item">
            <a-button 
            size="large" 
            type="primary"
            @click="login"
            >
            登录</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="注册">
          <div class="item">
            <a-input
             size="large" 
             placeholder="账户"
             v-model:value="regForm.account"
             >
              <template v-slot:prefix>
                <UserOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input 
            size="large" 
            placeholder="密码"
            v-model:value="regForm.password"
            >
              <template v-slot:prefix>
                <LockOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-input 
            size="large" 
            placeholder="邀请码"
            v-model:value="regForm.inviteCode"
            >
              <template v-slot:prefix>
                <MailOutlined />
              </template>
            </a-input>
          </div>
          <div class="item">
            <a-button 
              @click="register"
              size="large" 
              type="primary"
            >
            注册</a-button>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="scss" scpoed>
@import "./index.scss";
</style>