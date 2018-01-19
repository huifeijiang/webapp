let fs = require('fs')
let cheerio = require('cheerio')
//读取package.json
let result = JSON.parse(fs.readFileSync('./package.json')); 
//取得版本号
let version = result.version;
fs.readFile("../../baoan_app/config.xml",'utf-8',function(err,data){  
    if(err){  
        console.log("error");  
    }else{  
        let $ = cheerio.load(data)
        $('widget')[0].attribs.version = version
        fs.writeFile('../../baoan_app/config.xml', $('widget'),  function(err) {
            console.log("数据写入成功！");
            console.log("--------我是分割线-------------")
         }); 
    }  
});

console.log("READ FILE ASYNC END");