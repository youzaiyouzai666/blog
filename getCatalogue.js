var fs = require("fs")
var dirPath = require("path")
var filePath = dirPath.resolve(__dirname) //当前文件夹目录
var fileArr = [] //读取文件存储数组
var ignores = [
  "node_modules",
  "dist",
  "assets",
  "DS_Store",
  ".git",
  ".DS_Store",
  "README.md",
  ".vscode",
  "img"
] //需要忽略的文件夹
var charSet = {
  node: "├── ", //节点
  pipe: "│   ", // 上下链接
  last: "└── ", // 最后的file或folder需要回勾
  indent: "    " // 缩进
}
function readFile(path, level) {
  var files = fs.readdirSync(path) //同步读取文件列表
  files.forEach(function(filename, index) {
    if (ignores.includes(filename)) {
      console.log(filename + "已经忽略") //忽略文件夹
    } else {
      var stats = fs.statSync(path + "/" + filename)
      if (stats.isFile()) {
        if (level === 1) {
          fileArr.push(charSet.node + filename)
        } else {
          var arr = ""
          for (var i = 2; i < level; i++) {
            arr += charSet.indent
          }
          fileArr.push(charSet.pipe + arr + charSet.last + link(filename, path))
        }
      } else if (stats.isDirectory()) {
        if (level === 1) {
          fileArr.push(charSet.node + filename)
        } else {
          var str = ""
          for (var i = 2; i < level; i++) {
            str += charSet.indent
          }
          fileArr.push(charSet.pipe + str + charSet.node + filename)
        }
        readFile(path + "/" + filename, level + 1)
      }
    }
  })
  writeFile(fileArr)
}
function link(name, path = "") {
  var index = path.match(filePath)[0].length
  var namePath = path.slice(index + 1) + `/${name}`
  return `[${name}](https://github.com/youzaiyouzai666/blog/blob/master/${namePath})`
}
function writeFile(data) {
  var head = fs.readFileSync(filePath + "/header.md")
  var data = head + "```" + data.join("\n") + "``` \n"
  fs.writeFile(filePath + "/" + "README.md", data + "\n", function(err) {
    if (err) {
      console.error("生成目录失败", err)
      throw err
    }
    console.log("生成目录成功")
  })
}

readFile(filePath, 1)
