<template>
  <div class="basic-layout">
    <div class="app-header">
      <div class="left">
        <img src alt />
        <div class="title">小程序后台管理系统</div>
      </div>
      <div class="right">
        <div class="switchLanguage">
          <!-- start -->
          <a-dropdown>
            <a class="ant-dropdown-link" @click.prevent>
              多语言
              <DownOutlined />
            </a>
            <template #overlay>
              <a-menu>
                <a-menu-item>
                  <a href="javascript:;">中文</a>
                </a-menu-item>
                <a-menu-item>
                  <a href="javascript:;">English</a>
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
          <!-- end -->
        </div>
        <div class="hello-msg">您好，yanzhuxi</div>
        <div class="logout">退出</div>
      </div>
    </div>
    <div class="app-header-placeholder"></div>
    <div class="app-content">
      <div class="left">
        <app-nav />
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
