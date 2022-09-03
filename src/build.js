const path = require('path')
const fs = require('fs')
const marked = require('marked')

let BLOG_PATH = "/Users/liuyun/Desktop/yun-notes/02-个人博客"
let HTML_FOLDER = "assets/html"
let META_FOLDER = "assets/meta"


/**
 * 解析文章元数据列表
 * @param blogPath
 * @returns {[]}
 */
function parsePostMetaList(blogPath) {
    let postMetaList = []
    fs.readdirSync(blogPath).forEach(function (fileName) {
        let filePath = `${BLOG_PATH}/${fileName}`;
        let postMeta = parsePostMeta(filePath);
        if (postMeta) {
            postMetaList.push(postMeta);
        }
    });
    return postMetaList
}

/**
 * 解析文章元数据
 * @returns
 */
function parsePostMeta(filePath) {
    let fileStat = fs.statSync(filePath);
    let fileName = path.basename(filePath)
    //如果不是Markdown文件，则不进行解析
    if (!fileStat.isFile || !/\.md$/.test(fileName)) {
        return null;
    }
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let metaText = /---([^]*?)---/m.exec(fileContent)[1].replace(/^(\s*|\n*)|(\n*|\s*)$/g, '')
    let postMeta = {};
    for (const meteLine of metaText.split("\n")) {
        if (meteLine.length == 0) {
            continue
        }
        let metaName = meteLine.split(":")[0].replace(/^\s*|\s*$/g, '')
        let metaValue = meteLine.split(":")[1].replace(/^\s*|\s*$/g, '')
        postMeta[metaName] = metaValue;
    }
    postMeta.content = fileContent.replace(/---([^]*?)---/m, "").replace(/^(\s*|\n*)|(\n*|\s*)$/g, '')
    return postMeta;
}

/**
 * 渲染文章页
 * @returns
 */
function renderPostPage(postMetaList) {
    //生成HTML文件
    for (let postMeta of postMetaList) {
        //获取文章标题
        let postTitle = postMeta.title;
        //获取文章内容
        let postContent = postMeta.content;
        //将MD转换成HTML
        let postHtml = marked.parse(postContent);
        fs.writeFileSync(`${HTML_FOLDER}/${postTitle}.html`, postHtml)
    }
    //生成元数据文件
    generatePostMap(postMetaList)
    return true;
}

function generatePostMap(postMetaList) {
    //按时间倒序排序
    postMetaList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    //按年份进行分组
    let postYearMap = postMetaList.reduce((map, postMeta) => {
        postMeta.content = null;
        let year = parseInt(postMeta.date.split("-")[0])
        if (map[year]) {
            map[year].push(postMeta);
        } else {
            map[year] = [postMeta];
        }
        return map;
    }, {})
    fs.writeFileSync(`${META_FOLDER}/PostMap.json`, JSON.stringify(postYearMap))
}


//获取文章列表
let postMetaList = parsePostMetaList(BLOG_PATH);
//渲染HTML页面
renderPostPage(postMetaList);

