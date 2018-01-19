/**
 * Created by Administrator on 2017/7/12 0012.
 */
export const fileTool = {}

fileTool.readFile = function (directory,fileName,callBack) {
  let wwwPath = cordova.file.applicationDirectory+"www";
  wwwPath = wwwPath + directory;
  window.resolveLocalFileSystemURL(wwwPath,function(root){
    root.getFile(fileName, {create:false}, function(fileEntry) {
      fileEntry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function(e) {
          callBack(this.result);
          //console.log(this.result);
        };
        reader.readAsText(file);
      }, function(err){console.log('读取出错');});
    }, function(err){console.log('找不到文件');});
  },function(err){});
}
