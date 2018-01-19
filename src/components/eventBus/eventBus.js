/**
 * Created by Administrator on 2017/7/11 0011.
 */

import EventEmitter from 'wolfy87-eventemitter'

export const eventBus = {};

/**
 * 创建一个事件总线实例
 * */
eventBus.bus = new EventEmitter;


/**
 * 实时监听位置信息
 * @type {string}
 */
eventBus.WATCH_POSITION = "WATCH_POSITION";


/**
 * 获取位置信息
 * @type {string}
 */
eventBus.GET_POSITION = "GET_POSITION";

eventBus.MAP_EXTENT_CHANGE = 'MAP_EXTENT_CHANGE';
/**
 * 图层config加载完毕
 * @type {string}
 */
eventBus.CONFIG_LOAD = 'CONFIG_LOAD';

/**
 * 图层开启事件
 * @type {string}
 */
eventBus.LAYER_VISIBLE_CHANGE = 'LAYER_VISIBLE_CHANGE';
/**
 * 地图加载完毕事件
 * @type {string}
 */
eventBus.MAP_IS_LOAD = 'MAP_IS_LOAD';

/**
 * 拍照完成
 * @type {string}
 */
eventBus.TAKE_PHOTO_DOWN = "TAKE_PHOTO_DOWN";

/*
删除照片
 */
eventBus.PHOTOGRAPH_DELETE = "PHOTOGRAPH_DELETE";
/**
 * 地图返回
 * @type {string}
 */
eventBus.MAP_BACK = "MAP_BACK";
/**
 * 点击查询
 */
eventBus.MOUSE_CLICK_QUERY = "MOUSE_CLICK_QUERY";

/**
 * 从图层读取图片完成
 * @type {string}
 */
eventBus.GET_PHOTO_DOWN = "GET_PHOTO_DOWN";
/**
 * 从图层开关显影
 * @type {string}
 */
eventBus.LAYER_SWITCH_ON = "LAYER_SWITCH_ON";

/**
 * 监听返回按钮
 * @type {string}
 */
eventBus.BACK_BUTTON = "backbutton";
/**
 * 社区叠加
 * @type {string}
 */
eventBus.JD_INFO = "JD_INFO";
/**
 * 照片组件回传
 * @type {string}
 */
eventBus.PHOTOGRAPH_IMAGE = "PHOTOGRAPH_IMAGE";
/**
 * 获取当前办事详情
 * @type {string}
 */
eventBus.GET_EVENT_NOW = 'GET_EVENT_NOW';
/**
 * 获取当前办事处理详情
 * @type {string}
 */
eventBus.GET_EVENT_HANDLE = 'GET_EVENT_HANDLE';

/**
 * 通知清空密码
 * @type {string}
 */
eventBus.CLEARPASS = 'CLEARPASS';

/**
 * 通知请求统计数据
 * @type {string}
 */
eventBus.TONGJISHUJU = 'TONGJISHUJU';

/**
 * 油烟上报预览
 * @type {string}
 */
eventBus.LAMPYULAN = 'LAMPYULAN';


/**
 * 小散乱污预览
 * @type {string}
 */
eventBus.LIRRLEYULAN = 'LIRRLEYULAN';

/**
 * json 表单显示
 * @type {string}
 */
eventBus.AUTO_FORM_SHOW = 'AUTO_FORM_SHOW';
/**
 * json 离开焦点验证
 * @type {string}
 */
eventBus.FORM_BLUR = 'FORM_BLUR';
/**
 * 公告牌
 * @type {string}
 */
 eventBus.GONGGAOPAI = 'GONGGAOPAI';