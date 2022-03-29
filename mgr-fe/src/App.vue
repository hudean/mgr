<template>
  <div id="nav"></div>
  <router-view />
</template>

<script>
export default {
  changeLang() {
    let locale = localStorage.getItem("language") || "zh";
    let temp = locale === "zh" ? "en" : "zh";
    this.$i18n.locale = temp; //改变当前语言
    localStorage.language = temp;
  },
};
</script>

<style lang="scss">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
body {
  background-color: #eceaea !important;
}
</style>
