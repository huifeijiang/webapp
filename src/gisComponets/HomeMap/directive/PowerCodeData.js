/**
 * Created by haibalai on 2017/9/25.
 */
export const powerCodeData = {};




powerCodeData.code = ['3333','44'];

//HOMEMAP_RIVERLIST 河流列表
//HOMEMAP_LAYERLIST 图层列表
//LAYERLIST_MAINMAP  地图主题图层
//LAYERLIST_RIVERBUSINESS  水务设施图层
//LAYERLIST_ECOLOGICAL  生态图层
//HOMEMAP_LEGEND  图例
//HOMEMAP_MAPTIPS
// HOMEMAP_DATAPANEL    河长端巡查路由小人的图例



//HEZHANG 用户角色端权限
//XUNBAN 用户角色端权限 各种巡查办理
//XUNCHA 用户角色端权限 各种巡查
//BANLI 用户角色端权限  整治办理

// 河长端巡查显示人和事件的数据面板

//XUNBAN_PANEL   巡查端（他是包含了事件列表一个panel）
//HZ_REPORT

//巡查端的上报按钮
//XUN_SHANGBAO
//巡查端的事件列表按钮
//XUNBAO_EVENTLIST


//普通巡查角色上报按钮
//NXC_REPORT
//普通巡查角色事件列表按钮
//NXC_EVENTLIST
//普通巡查角色办
//NXC_ZHIFA


//小散巡查角色上报按钮
//XSXC_REPORT
//小散巡查角色事件列表按钮
//XSXC_EVENTLIST
//小散巡查角色办
//XSXC_ZHIFA


//油烟巡查角色上报按钮
//YY_REPORT
//油烟巡查角色事件列表按钮
//YY_EVENTLIST


//餐饮上报按钮
//CAT_REPORT
//汽修上报按钮
//CAR_REPORT
//黑臭事件列表
//CAT_EVENTLIST
//CAR_EVENTLIST
//黑臭执法
//HC_ZHIFA

//河长端通知
//MASTER_MESSAGE
powerCodeData.setCode = function (role) {
     //普通巡查角色
    if(role == "0")
     {
       powerCodeData.code = ['XUNBAN',"HOMEMAP_LAYERLIST","LAYERLIST_MAINMAP",
        "LAYERLIST_ECOLOGICAL","NXC_REPORT","XUN_SHANGBAO","XUNBAO_EVENTLIST","NXC_EVENTLIST","XUNBAN_PANEL"];
     }
   //河长端
    else if(role  == "1")
    {
     powerCodeData.code = ['HEZHANG','HOMEMAP_RIVERLIST',"HOMEMAP_LAYERLIST",
       "LAYERLIST_MAINMAP","LAYERLIST_RIVERBUSINESS","LAYERLIST_ECOLOGICAL",
       "HOMEMAP_LEGEND","HOMEMAP_MAPTIPS","HOMEMAP_DATAPANEL","HZ_REPORT","MASTER_MESSAGE"];
    }
    //小散乱污巡查
    else if(role  == "2")
    {
      powerCodeData.code = ['XUNBAN',"HOMEMAP_LAYERLIST","LAYERLIST_MAINMAP",
        "LAYERLIST_ECOLOGICAL","XUN_SHANGBAO","XSXC_REPORT","XUNBAN_PANEL","XSXC_EVENTLIST","XUNBAO_EVENTLIST"];
    }
    //小散乱污办理
    else if(role  == "3")
    {
      powerCodeData.code = ['XUNBAN',"HOMEMAP_LAYERLIST","LAYERLIST_MAINMAP",
        "LAYERLIST_ECOLOGICAL","XUNBAN_PANEL","XSXC_ZHIFA"];
    }
    //整治员
    else if(role  == "4")
    {
      powerCodeData.code = ['XUNBAN',"HOMEMAP_LAYERLIST","LAYERLIST_MAINMAP",
        "LAYERLIST_ECOLOGICAL","NXC_ZHIFA","XUNBAN_PANEL"];
    }
    //油烟巡查
    else if(role  == "5")
    {
      powerCodeData.code = ['XUNBAN',"HOMEMAP_LAYERLIST","LAYERLIST_MAINMAP",
        "LAYERLIST_ECOLOGICAL","XUN_SHANGBAO","XUNBAN_PANEL","YY_REPORT","YY_EVENTLIST","XUNBAO_EVENTLIST"];
    }
    //黑臭水体巡查
    else if(role  == "6")
    {
      powerCodeData.code = ['XUNBAN',"HOMEMAP_LAYERLIST","LAYERLIST_MAINMAP",
        "LAYERLIST_ECOLOGICAL","XUN_SHANGBAO","CAR_REPORT","CAT_REPORT","XUNBAN_PANEL","XSXC_EVENTLIST","CAT_EVENTLIST","CAR_EVENTLIST","XSXC_REPORT","XUNBAO_EVENTLIST"];
    }
   //黑臭水体办理
    else if(role  == "7")
    {
      powerCodeData.code = ['XUNBAN',"HOMEMAP_LAYERLIST","LAYERLIST_MAINMAP",
        "LAYERLIST_ECOLOGICAL","XUNBAN_PANEL","HC_ZHIFA"];
    }


}
