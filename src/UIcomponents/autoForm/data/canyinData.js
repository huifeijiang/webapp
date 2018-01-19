/**
 * Created by Administrator on 2017/10/20 0020.
 */

export const canyinData = {}

canyinData.canyinDataJson = {
  "form": [
    {
      "formType": "formText",
      "label": "单位名称",
      "formName": "enterpriseName",
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
      "formType": "formTextArea",
      "label": "单位地址",
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
      "formType": "formRadioText",
      "label": "营业执照",
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
      "formType": "formText",
      "label": "法人代表电话",
      "formName": "legalPersonTel",
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
      "label": "企业联系人",
      "formName": "enterpriseContactsName",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false
    }, {
      "formType": "formText",
      "label": "企业联系人电话",
      "formName": "enterpriseContactsTel",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false
    }, {
      "formType": "formSelectText",
      "label": "环保手续",
      "formName": "approvalProcedure",
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
      "isRequire": true,
      "dictionary": [
        {
          "label": "审批批文",
          "value": "1",
          "isText": false
        }, {
          "label": "登记备案",
          "value": "2",
          "isText": false
        }, {
          "label": "无手续",
          "value": "0",
          "isText": false
        }
      ]
    }, {
      "formType": "formText",
      "label": "环保批文号",
      "formName": "approvalNo",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "环保手续",
      "ishowParentKey": "审批批文"
    }, {
      "formType": "formText",
      "label": "登记备案号",
      "formName": "recordNo",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "环保手续",
      "ishowParentKey": "登记备案"
    }, {
      "formType": "formRadioText",
      "label": "排水许可证",
      "formName": "drainageLicense",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
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
      ]
    }, {
      "formType": "formText",
      "label": "基本灶头数量(个)",
      "formName": "rangCount",
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
      "label": "在线监测系统",
      "formName": "monitorOnline",
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
      "isRequire": true,
      "dictionary": [
        {
          "label": "已安装",
          "value": true,
          "isText": false,
          "text": ""
        }, {
          "label": "未安装",
          "value": false,
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "油烟净化设施",
      "formName": "cleanFacility",
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
      "isRequire": true,
      "dictionary": [
        {
          "label": "已安装运行正常",
          "value": "0",
          "isText": false,
          "text": ""
        }, {
          "label": "已安装运行异常",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "未安装",
          "value": "2",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "油烟净化设施维护频次",
      "formName": "mainFreq",
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
      "isRequire": true,
      "dictionary": [
        {
          "label": "一年/次",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "半年/次",
          "value": "2",
          "isText": false
        }, {
          "label": "季度/次",
          "value": "3",
          "isText": false
        }, {
          "label": "两个月/次",
          "value": "4",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "油烟监测报告",
      "formName": "lampblackReport",
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
      "isRequire": true,
      "dictionary": [
        {
          "label": "有",
          "value": true,
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": false,
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formText",
      "label": "油烟浓度(mg/m³)",
      "formName": "lampblackCon",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "油烟监测报告",
      "ishowParentKey": "有"
    }, {
      "formType": "formDate",
      "label": "检测时间",
      "formName": "monitorTime",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "油烟监测报告",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "燃料类型",
      "formName": "fuleType",
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
      "isRequire": true,
      "dictionary": [
        {
          "label": "清洁(电、天然气等)",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "非清洁",
          "value": "2",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "排气口方式",
      "formName": "exhaustWay",
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
      "isRequire": true,
      "dictionary": [
        {
          "label": "下水道排放",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "高空排放",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "低空排放",
          "value": "3",
          "isText": false,
          "text": ""
        }, {
          "label": "其他",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formText",
      "label": "用水量(吨/日)",
      "formName": "usingOfWater",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false
    }, {
      "formType": "formSelectText",
      "label": "建筑红线内分流情况",
      "formName": "shuntStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "isShow": true,
      "selfDefine": {
        "selectMore": false
      },
      "isRequire": true,
      "dictionary": [
        {
          "label": "雨污合流",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "雨污分流",
          "value": "2",
          "isText": false
        }, {
          "label": "不清楚",
          "value": "3",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formRadio",
      "label": "预处理设施",
      "formName": "haveFacilitie",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "有",
          "value": "true"
        }, {
          "label": "无",
          "value": "false"
        }
      ]
    }, {
      "formType": "formText",
      "label": "化粪池(级/个)",
      "formName": "septicTank",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "预处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "隔油池(级/个)",
      "formName": "separationFacility",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "预处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "周边管网建设情况",
      "formName": "pipeStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "有市政污水管网",
          "value": "1"
        }, {
          "label": "无市政污水管网",
          "value": "0"
        }, {
          "label": "不清楚",
          "value": "3"
        }
      ]
    }, {
      "formType": "formRadio",
      "label": "建筑红线外污水接驳去向1",
      "formName": "direction",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "市政污水管网",
          "value": "1"
        }, {
          "label": "市政雨水管网",
          "value": "2"
        }, {
          "label": "直排入河",
          "value": "4"
        }, {
          "label": "不清楚",
          "value": "5"
        }
      ],
      "ishowParent": "周边管网建设情况",
      "ishowParentKey": "有市政污水管网"
    }, {
      "formType": "formRadio",
      "label": "建筑红线外污水接驳去向2",
      "formName": "direction",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "雨污合流管网",
          "value": "3"
        }, {
          "label": "直排入河",
          "value": "4"
        }, {
          "label": "不清楚",
          "value": "5"
        }
      ],
      "ishowParent": "周边管网建设情况",
      "ishowParentKey": "无市政污水管网"
    }, {
      "formType": "formText",
      "label": "最终去向",
      "formName": "finalDestination",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false
    }, {
      "formType": "formTextArea",
      "label": "情况说明",
      "formName": "describe",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false
    }, {
      "formType": "formSelectText",
      "label": "是否执法整治",
      "formName": "isLawEnforcement",
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
      "isRequire": true,
      "dictionary": [
        {
          "label": "是",
          "value": true,
          "isText": false
        }, {
          "label": "否",
          "value": false,
          "isText": false
        }
      ]
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
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formSocialSelct",
      "label": "社区选择",
      "formName": "gridId",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false
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
      "noParent": true
    }
  ]
}


