import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import hl from 'highlight.js'
import 'highlight.js/styles/base16/tomorrow-night.css'

const app = createApp(App)
app.use(router)
app.use(store)
// 自定义一个代码高亮指令
app.directive('highlight', function (el) {
    const blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {
        hl.highlightBlock(block)
    })
})

app.mount('#app')
