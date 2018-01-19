/**
 * Created by Administrator on 2017/3/27 0027.
 */

// idc是互联网环境 vpn 是宝安vpn环境,cityworks是早期的调试环境
// var arcgisEnv = "idc";
// var arcgisEnv = "cityworks";
// // var arcgisEnv = "vpn";
// var arcgisEnv = 'cityworks';
//
var arcgisCss = "";
var  GET_MAP_CONFIG = "";
var arcgisInitJs = "";
var geometeryServiceUrl = "";
//
// if(arcgisEnv == "idc"){
//
//   arcgisCss = "https://baoan.cityworks.cn:2002/baoan/web_static/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/esri/css/esri.css";
//   GET_MAP_CONFIG = "https://baoan.cityworks.cn:2002/baoan/web_static/xml/config3.xml";
//   arcgisInitJs = "https://baoan.cityworks.cn:2002/baoan/web_static/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/init.js";
//   geometeryServiceUrl:"http://121.201.65.133:2001/arcgis/rest/services/Utilities/Geometry/GeometryServer";
//
// }else if(arcgisEnv == "vpn"){
//
//   arcgisCss = "http://10.99.34.8/web_static/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/esri/css/esri.css";
//   GET_MAP_CONFIG = "http://10.99.34.8/web_static/xml/config3.xml";
//   arcgisInitJs = "http://10.99.34.8/web_static/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/init.js";
//   geometeryServiceUrl:"http://10.99.34.4:6080/arcgis/rest/services/Utilities/Geometry/GeometryServer";
// }else if(arcgisEnv == "cityworks"){
//
//   arcgisCss = "http://cityworks.cn/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/esri/css/esri.css";
//   GET_MAP_CONFIG = "http://cityworks.cn/baoan_water/xml/config3.xml";
//   arcgisInitJs = "http://cityworks.cn/arcgis_js_v320_api/arcgis_js_api/library/3.20/3.20/init.js";
//   geometeryServiceUrl:"http://121.201.65.133:2001/arcgis/rest/services/Utilities/Geometry/GeometryServer";
// }
//
// function loadStyle(url){
//   var link = document.createElement('link');
//   link.type = 'text/css';
//   link.rel = 'stylesheet';
//   link.href = url;
//   var head = document.getElementsByTagName('head')[0];
//   head.appendChild(link);
// }
// loadStyle(arcgisCss);



// var  layerConfig =  {
//
//     geometeryServiceUrl : geometeryServiceUrl,
//     arcgisAPIUrl :arcgisInitJs,
//     geometryPdfUrl:'http://10.10.120.2:6080/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task',
// }

