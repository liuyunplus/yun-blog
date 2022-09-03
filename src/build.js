const path = require('path')
const fs = require('fs')
const marked = require('marked')

let BLOG_PATH = "/Users/liuyun/Desktop/yun-notes/11-个人博客"

/**
 * 解析文章数据
 * @returns
 */
function parsePostData(filePath) {
    let fileStat = fs.statSync(filePath);
    let fileName = path.basename(filePath)
    //如果不是Markdown文件，则不进行解析
    if (!fileStat.isFile || !/\.md$/.test(fileName)) {
        return null;
    }
    let postData = {}
    const fileContent = fs.readFileSync(filePath, 'utf8');
    //分割成每一行
    let lineList = fileContent.split(/\n/);
    let [postMeta, postText] = parsePostMeta(lineList);
    postData["postMeta"] = postMeta;
    postData["postText"] = postText;
    return postData;
}

/**
 * 解析文章元数据
 * @returns
 */
function parsePostMeta(lineList) {
    let postMeta = {};
    let tagNum = 0;
    let lineNo = 0;
    for (let line of lineList) {
        lineNo++;
        if (line == "---") {
            tagNum++;
        }
        //解析到第2个标记行时就不再向下解析
        if (tagNum == 2) {
            break;
        }
        let isMeta = (tagNum == 1 && line != "---");
        if (isMeta) {
            let metaName = line.substr(0, line.indexOf(':'));
            let metaValue = line.substr(line.indexOf(':') + 1).trim()
            //去除首尾两端的引号
            metaValue = metaValue.replace(/^ *\'|\' *$/g, '')
            postMeta[metaName] = metaValue;
        }
    }
    //获取文章正文文本
    lineList.splice(0, lineNo);
    let postText = lineList.join("\n");
    return [postMeta, postText];
}

/**
 * 渲染文章页
 * @returns
 */
function renderPostPage(postList) {
    let postMetaList = []
    for (let postData of postList) {
        //获取文章的元数据
        let postMeta = postData["postMeta"];
        postMetaList.push(postMeta);
        //获取文章Markdown文本
        let postText = postData["postText"];
        //将Markdown文本转换成HTML
        let postHtml = marked.parse(postText)
        //写入目标文件
        fs.writeFileSync(`assets/html/${postMeta["title"]}.html`, postHtml)
    }
    handMetaData(postMetaList)
    return true;
}

function handMetaData(postMetaList) {
    postMetaList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
    let postMap = postMetaList.reduce((map, post) => {
        let year = parseInt(post.date.split("-")[0])
        if (map[year]) {
            map[year].push(post);
        } else {
            map[year] = [post];
        }
        return map;
    }, {})
    fs.writeFileSync(`assets/meta/PostMap.json`, JSON.stringify(postMap))
}


function runBuild() {
    let postList = []
    fs.readdirSync(BLOG_PATH).forEach(function (fileName) {
        let filePath = `${BLOG_PATH}/${fileName}`;
        let postData = parsePostData(filePath);
        if (postData) {
            postList.push(postData);
        }
    });
    //渲染文章页
    renderPostPage(postList);
}


runBuild();

