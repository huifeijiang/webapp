/**
/**
 * Created by Administrator on 2017/10/27 0027.
 */
export const meiriyixunData = {}

meiriyixunData.meiriyixunDataJson = {
  "form": [
    {
      "formType": "formText",
      "label": "企业名称",
      "formName": "enterpriseName",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": ""
    }, {
      "formType": "formTextArea",
      "label": "企业地址",
      "formName": "enterpriseAddr",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true
    }, {
      "formType": "formText",
      "label": "法人代表",
      "formName": "legalPersonName",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true
    }, {
      "formType": "formRadioText",
      "label": "统一社会信用代码",
      "formName": "enterpriseLicense",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "dictionary": [
        {
          "label": "有",
          "value": "true",
          "isText": true,
          "text": ""
        }, {
          "label": "无",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "isRequire": true
    }, {
      "formType": "formText",
      "label": "环保负责人",
      "formName": "envManager",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true
    }, {
      "formType": "formText",
      "label": "联系人方式",
      "formName": "enterpriseContactsTel",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true
    }, {
      "formType": "formSelectText",
      "label": "生产经营情况",
      "dictionary": [
        {
          "label": "正常生产",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "停产",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "关停",
          "value": "3",
          "isText": false,
          "text": ""
        }, {
          "label": "搬迁",
          "value": "4",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "producingStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true
    }, {
      "formType": "formSelectText",
      "label": "废水处理设施",
      "dictionary": [
        {
          "label": "有",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "waterFacility",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "生产经营情况",
      "ishowParentKey": "正常生产"
    }, {
      "formType": "formSelectText",
      "label": "标识、标志牌悬挂",
      "dictionary": [
        {
          "label": "有",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "haveTagHang",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "标识、标志牌悬挂类别",
      "formName": "tagHang",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": true
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "标识、标志牌悬挂",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "操作规程",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "处理工艺流程",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "环境安全管理制度",
          "value": "3",
          "isText": false,
          "text": ""
        }, {
          "label": "岗位职责",
          "value": "4",
          "isText": false,
          "text": ""
        }, {
          "label": "人员架构图",
          "value": "5",
          "isText": false
        }, {
          "label": "应急救援",
          "value": "6",
          "isText": false
        }, {
          "label": "安全警示标识",
          "value": "7",
          "isText": false
        }, {
          "label": "总排口标志碑",
          "value": "8",
          "isText": false
        }, {
          "label": "其他",
          "value": "0",
          "isText": true,
          "field": "otherTagHang"
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "应急物资",
      "dictionary": [
        {
          "label": "有",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "haveEmergencyMateria",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "应急物资类别",
      "dictionary": [
        {
          "label": "喷洗设备",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "应急灯",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "药品箱",
          "value": "3",
          "isText": false
        }, {
          "label": "安全帽",
          "value": "4",
          "isText": false
        }, {
          "label": "安全绳",
          "value": "5",
          "isText": false
        }, {
          "label": "防毒面具",
          "value": "6",
          "isText": false
        }, {
          "label": "防腐手套",
          "value": "7",
          "isText": false
        }, {
          "label": "防护鞋",
          "value": "8",
          "isText": false
        }, {
          "label": "其他",
          "value": "0",
          "isText": true,
          "text": "",
          "field": "otherEmergencyMaterial"
        }
      ],
      "formName": "emergencyMaterial",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": true
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "应急物资",
      "ishowParentKey": "有"
    }, {
      "formType": "formEventList",
      "label": "废水收集管道",
      "formName": "collectionTube",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": true,
        "serviceUrl": "/v1/missions/day/type/tubeType"
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "监控设施",
      "dictionary": [
        {
          "label": "运转正常",
          "value": "8",
          "isText": false,
          "text": ""
        }, {
          "label": "运转异常",
          "value": "9",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "5",
          "isText": false
        }
      ],
      "formName": "monitorFacilityStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废水处理设施运行情况",
      "dictionary": [
        {
          "label": "总排口有排水",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "总排口无排水",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "outletStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "回用设施",
      "dictionary": [
        {
          "label": "运转正常",
          "value": "8",
          "isText": false,
          "text": ""
        }, {
          "label": "运转异常",
          "value": "9",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "5",
          "isText": false
        }
      ],
      "formName": "reuseFacilityStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "运行台账",
      "dictionary": [
        {
          "label": "有记录规范",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "有记录不规范",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "无记录",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "runningLedger",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "危废贮存设施",
      "dictionary": [
        {
          "label": "有",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "dangerReserveFacility",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "生产经营情况",
      "ishowParentKey": "正常生产"
    }, {
      "formType": "formSelectText",
      "label": "危废贮存设施类别",
      "dictionary": [
        {
          "label": "悬挂标志牌",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "防渗漏措施",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "防流失措施",
          "value": "3",
          "isText": false
        }, {
          "label": "防雨淋措施",
          "value": "4",
          "isText": false
        }, {
          "label": "防扬散措施",
          "value": "5",
          "isText": false
        }, {
          "label": "分类贮存",
          "value": "6",
          "isText": false
        }, {
          "label": "已建立台账",
          "value": "7",
          "isText": false
        }, {
          "label": "危废暂存量(吨)",
          "value": "8",
          "isText": true,
          "field": "otherReserveFacilityType8",
        }, {
          "label": "污泥袋标签",
          "value": "9",
          "isText": false
        }, {
          "label": "其他",
          "value": "0",
          "isText": true,
          "field": "otherReserveFacilityType0"
        }
      ],
      "formName": "reserveFacilityType",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": true
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "危废贮存设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废气处理设施",
      "dictionary": [
        {
          "label": "有",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "gasCleanFacility",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "生产经营情况",
      "ishowParentKey": "正常生产"
    }, {
      "formType": "formSelectText",
      "label": "悬挂标志牌",
      "dictionary": [
        {
          "label": "已悬挂",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "未悬挂",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "denoterStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废气处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "运转情况",
      "dictionary": [
        {
          "label": "有运转",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "无运转",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "gasCleanFacilityStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废气处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "运行记录",
      "dictionary": [
        {
          "label": "有运行记录",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "无运行记录",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "gasCleanFacilityRecord",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "废气处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "锅炉",
      "dictionary": [
        {
          "label": "有",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "boiler",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "生产经营情况",
      "ishowParentKey": "正常生产"
    }, {
      "formType": "formRadio",
      "label": "使用燃料",
      "dictionary": [
        {
          "label": "清洁",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "非清洁",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "boilerFuelType",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "锅炉",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "燃料类型",
      "formName": "otherBoilerFuelType",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "使用燃料",
      "ishowParentKey": "清洁"
    }, {
      "formType": "formText",
      "label": "燃料类型",
      "formName": "otherBoilerFuelType",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "使用燃料",
      "ishowParentKey": "非清洁"
    }, {
      "formType": "formSelectText",
      "label": "企业外围排口设置情况",
      "dictionary": [
        {
          "label": "工业废水排口",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "生活废水排口",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "雨水排口",
          "value": "3",
          "isText": false
        }
      ],
      "formName": "outletType",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "生产经营情况",
      "ishowParentKey": "正常生产"
    }, {
      "formType": "formTextArea",
      "label": "其他情况",
      "formName": "describe",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": "请输入情况说明"
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false
    }, {
      "formType": "formEventList",
      "label": "附近河流",
      "formName": "riverId",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": {
        "selectMore": false,
        "serviceUrl": "/rivers?size=100"
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "生产经营情况",
      "ishowParentKey": "正常生产"
    }, {
      "formType": "formSelectText",
      "label": "是否执法上报",
      "formName": "lawEnforcement",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": false
      },
      "value": "",
      "isRequire": true,
      "ishowParent": "生产经营情况",
      "ishowParentKey": "正常生产",
      "dictionary": [
        {
          "label": "是",
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "否",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formPhotoGraph",
      "label": "图片",
      "formName": "formImages",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "noParent":true
    }
  ]
}


