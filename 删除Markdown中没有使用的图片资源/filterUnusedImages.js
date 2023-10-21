
/*
 *  项目名称: filterUnusedImages
 *  用途: 过滤 .md中 未使用的图片资源
 *  作者: RengarTang
 *  创建时间: 2020/6/8 10:00
 */

// 引入 fs 模块, 用于读取文件
const { log } = require('console');
const fs = require('fs');

// 引入 path 模块, 用于处理路径
const path = require('path');

// 声明变量
let allFiles = []; // 所有文件路径
let allImages = []; // 全部图片
let usedImages = []; // 已经使用的图片
let deleteImage = []; // 需要删除的图片


// 文件类型判断
// 判断是否为 .md .html 文件
function checkFileExtension(filename) {
    const pattern = /\.(md|html)$/;
    return pattern.test(filename);
}

function checkImageExtension(filename) {
    const pattern = /\.(png|jpg)$/;
    return pattern.test(filename);
}


// 1.获取所有需要遍历的文件路径
function readFilesRecursively(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            // 如果是文件夹，则递归调用 readFilesRecursively 函数
            readFilesRecursively(filePath);
        } else {
            // 如果是 .md .html文件，则将路径存入 allFiles 数组中
            if (checkFileExtension(filePath)) allFiles.push(filePath)
            if (checkImageExtension(filePath)) allImages.push(filePath)
        }
    });
}
// 1.1 读取当前文件夹及其子文件夹中的所有文件
readFilesRecursively('./');

// console.log('allFiles', allFiles); // 打印所有文件路径
// console.log('所有图片', allImages); // 打印所有文件路径

for (let i = 0; i < allFiles.length; i++) {
    // 读取文件内容
    const fileContent = fs.readFileSync(allFiles[i], 'utf8');
    const reg = /!\[.*\]\((.*)\)/g;
    const result = fileContent.match(reg);

    if (result !== null) {
        // console.log(result);
        // 获取 result 中的图片名称
        for (let j = 0; j < result.length; j++) {
            const image = result[j].match(/\((.*)\)/)[1];
            // usedImages.push(image);

            // 获取图片所在的路径
            const imageDir = path.join(path.dirname(allFiles[i]), image);
            usedImages.push(imageDir);
        }
        // console.log("使用图片", usedImages);
    }
};

deleteImage = allImages.filter((element) => !usedImages.includes(element));

// console.log("需要删除的图片", deleteImage);

if (deleteImage.length > 0) {
    for (let i = 0; i < deleteImage.length; i++) {
        fs.unlink(deleteImage[i], (err) => {
            if (err) throw err;
            console.log('未引用图片删除成功!');
        });
    }
} else {
    console.log('没有发现冗余的图片资源 :)');
}