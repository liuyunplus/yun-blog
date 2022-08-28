<template>
  <div class="footer">
    Copyright &copy; {{ nowYear }}, Coding LiuYun ｜ 当前在线: 256人, 历史访客: 1335463人
  </div>
</template>

<script>
export default {
  name: "FooterCom",
  computed: {
    nowYear() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
.footer {
  width: 900px;
  height: 40px;
  margin-top: auto;
  margin-right: auto;
  margin-left: auto;
  text-align: center;
  line-height: 40px;
}
</style>