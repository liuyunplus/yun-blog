<template>
  <div id="my-test" v-html="latex"></div>
</template>

<script>
import * as global from '../utils/global'

export default {
  name: "Category",
  mounted() {
    global.renderByMathjax(document.getElementById('my-test'));
  },
  data() {
    return {
      latex: '我是一个啥：$$\\frac{a}{b}$$'
    }
  },
}
</script>

<style scoped>

</style>