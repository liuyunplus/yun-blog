<template>
  <div class="footer">
    Copyright &copy; {{ nowYear }}, Coding By LiuYun ｜ 当前在线: 256人, 历史访客: 15463人
  </div>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    nowYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  width: 950px;
  height: 40px;
  //background-color: #66cccc;
  margin-top: auto;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  line-height: 40px;
}
</style>