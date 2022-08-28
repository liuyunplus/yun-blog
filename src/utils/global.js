export function renderByMathjax(el) {
    if (!window.MathJax.version) {
        return
    }
    console.log("渲染公式")
    if (el && !Array.isArray(el)) {
        el = [el]
    }
    return new Promise((resolve, reject) => {
        window.MathJax.typesetPromise(el).then(() => {
            resolve(void 0)
        }).catch((err) => reject(err))
    })
}