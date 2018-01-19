/**
 * Created by Administrator on 2017/10/27 0027.
 */
export const huanbanzhurenData = {}

huanbanzhurenData.huanbanzhurenDataJson = {
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
      "formType": "formText",
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
      "isRequire": true
    }, {
      "formType": "formText",
      "label": "环保主任",
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
      "label": "环保主任联系电话",
      "formName": "envManagerTel",
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
      "formName": "producingStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "",
      "ishowParentKey": "",
      "dictionary": [
        {
          "label": "正常生产",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "未生产",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "关停",
          "value": "3",
          "isText": false
        }, {
          "label": "搬迁",
          "value": "4",
          "isText": false
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "排放类型",
      "formName": "letOutType",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "生产经营情况",
      "ishowParentKey": "正常生产",
      "dictionary": [
        {
          "label": "废水、废气排放企业",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "废水零排放企业",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "废气排放企业",
          "value": "3",
          "isText": false
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "废水处理设施",
      "formName": "waterFacility",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "排放类型",
      "ishowParentKey": "废水零排放企业$废水、废气排放企业",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "label": "标识、标志牌悬挂",
      "formName": "haveTagHang",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "label": "标识、标志牌悬挂类型",
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
          "isText": false
        }, {
          "label": "岗位职责",
          "value": "4",
          "isText": false
        }, {
          "label": "人员架构图 ",
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
          "label": "总排口标志牌",
          "value": "8",
          "isText": false
        }, {
          "label": "其他",
          "value": "0",
          "isText": true,
          "text": "",
          "field": "otherTagHang0"
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "应急物资",
      "formName": "haveEmergencyMaterial",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "label": "应急物资类型",
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
      "ishowParentKey": "有",
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
          "isText": false,
          "text": ""
        }, {
          "label": "安全帽",
          "value": "4",
          "isText": false,
          "text": ""
        }, {
          "label": "安全绳",
          "value": "5",
          "isText": false,
          "text": ""
        }, {
          "label": "防毒面具",
          "value": "6",
          "isText": false
        }, {
          "label": "防腐手套",
          "value": "7",
          "isText": false,
          "text": ""
        }, {
          "label": "防护鞋",
          "value": "8",
          "isText": false,
          "text": ""
        }, {
          "label": "其他",
          "value": "0",
          "isText": true,
          "text": "",
          "field": "otherEmergencyMaterial0"
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "废水收集管道",
      "formName": "collectionTupeType",
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
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "管道分类走向标识清晰",
          "value": "4",
          "isText": false,
          "text": ""
        }, {
          "label": "管道分类走向无标识或模糊",
          "value": "5",
          "isText": false,
          "text": ""
        }, {
          "label": "管道存在松脱、滴漏现象",
          "value": "6",
          "isText": false
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "废水处理设施运行情况",
      "formName": "waterFacilityStatus",
      "dictionary": [
        {
          "label": "正常运转",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "未运转",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
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
      "label": "总排口情况",
      "formName": "totalWaterWriterStatus",
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
      "dictionary": [
        {
          "label": "总排口有排水",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "总排口无排水",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "排水时段",
      "formName": "otherTotalWaterWriterStatus1",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "总排口情况",
      "ishowParentKey": "总排口有排水"
    }, {
      "formType": "formSelectText",
      "label": "应急池情况",
      "formName": "emergencyLagoonStatus",
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
      "dictionary": [
        {
          "label": "应急池正常",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "应急池异常",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "详细情况",
      "formName": "otherEmergencyLagoonStatus0",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "应急池情况",
      "ishowParentKey": "应急池异常"
    }, {
      "formType": "formSelectText",
      "label": "监控设施",
      "formName": "monitorFacility",
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
      "dictionary": [
        {
          "label": "有",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "0",
          "isText": false
        }, {
          "label": "设备异常",
          "value": "2",
          "isText": false,
          "text": ""
        }
      ],
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "PH",
      "formName": "ph",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "监控设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "流量计/水表读数(t)",
      "formName": "traffic",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "监控设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "COD(mg/l)",
      "formName": "COD",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "监控设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "铜(mg/l)",
      "formName": "copper",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "监控设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "镍(mg/l)",
      "formName": "nickel",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "监控设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "铬(mg/l)",
      "formName": "chromium",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "监控设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "总磷(mg/l)",
      "formName": "phosphorus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "监控设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "氨氮(mg/l)",
      "formName": "nitrogen",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "监控设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "回用设施情况",
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
      "dictionary": [
        {
          "label": "有设施且正常运转",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "有设施但无运转",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "无设施",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "原因",
      "formName": "otherReuseFacilityStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "回用设施情况",
      "ishowParentKey": "有设施但无运转"
    }, {
      "formType": "formSelectText",
      "label": "运行台账",
      "formName": "runningLedger",
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
      "label": "废气处理设施",
      "formName": "gasFacility",
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
          "label": "有",
          "value": "1",
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
      "label": "标志牌悬挂情况",
      "formName": "tagHangStatus",
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
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "已悬挂标志牌",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "未悬挂标志牌",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "废气处理设施运行情况",
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
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有运转",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "无运转",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "废气处理设施记录情况",
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
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "运行记录规范",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "无运行记录",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "废气处理设施维护情况",
      "formName": "gasCleanFacilityMaintain",
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
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有维护",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "无维护",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formDate",
      "label": "维护时间",
      "formName": "otherGasCleanFacilityMaintain1",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "submitShow": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废气处理设施维护情况",
      "ishowParentKey": "有维护"
    }, {
      "formType": "formSelectText",
      "label": "废气处理设施维修情况",
      "formName": "gasCleanFacilityRepair",
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
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有维修",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "无维修",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formDate",
      "label": "维修时间",
      "formName": "otherGasCleanFacilityRepair",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "submitShow": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废气处理设施维修情况",
      "ishowParentKey": "有维修"
    }, {
      "formType": "formSelectText",
      "label": "危废贮存设施",
      "formName": "dangerWasteFacility",
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
          "label": "有",
          "value": "1",
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
      "label": "标识悬挂",
      "formName": "dangerWasteTagHang",
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
      "ishowParent": "危废贮存设施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "5",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "4",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "危废贮存点标识",
      "formName": "dangerWasteTagHang1",
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
      "ishowParent": "标识悬挂",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "label": "危废贮存场所警告标志",
      "formName": "dangerWasteTagHang2",
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
      "ishowParent": "标识悬挂",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "label": "危废容器、包装物识别标签",
      "formName": "dangerWasteTagHang3",
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
      "ishowParent": "标识悬挂",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "label": "识别标签类型",
      "formName": "packingLabel",
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
      "ishowParent": "危废容器、包装物识别标签",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "主要成分",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "化学名称",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "危险情况",
          "value": "3",
          "isText": false,
          "text": ""
        }, {
          "label": "安全措施",
          "value": "4",
          "isText": false,
          "text": ""
        }, {
          "label": "废物产生情况",
          "value": "5",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formText",
      "label": "其他标识",
      "formName": "dangerWasteTagHang0",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "标识悬挂",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "'三防'措施",
      "formName": "protectiveMeasures",
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
      "ishowParent": "危废贮存设施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "formType": "formRadio",
      "label": "防渗漏措施",
      "formName": "protectiveMeasures1",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "'三防'措施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "formType": "formRadio",
      "label": "防流失措施",
      "formName": "protectiveMeasures2",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "'三防'措施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "formType": "formRadio",
      "label": "防雨淋措施",
      "formName": "protectiveMeasures3",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "'三防'措施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "formType": "formRadio",
      "label": "防扬散措施",
      "formName": "protectiveMeasures4",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "'三防'措施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "formType": "formRadio",
      "label": "危废当日产生量",
      "formName": "dangerCurrentStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "危废贮存设施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "formType": "formText",
      "label": "拉运(吨)",
      "formName": "otherDangerCurrentStatus1",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "危废当日产生量",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "危废累计暂存量(吨)",
      "formName": "dangerWasteSaveValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "危废贮存设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "危废当日拉运转移情况",
      "formName": "dangerWasteJustStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "危废贮存设施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "formType": "formText",
      "label": "拉运(吨)",
      "formName": "otherDangerWasteJustStatus1",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "危废当日拉运转移情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "危废规范化管理台账",
      "formName": "gasRecordStatus",
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
      "ishowParent": "危废贮存设施",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "已建立台账",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "未建立台账",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "水量情况",
      "formName": "waterValueStatus",
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
      "ishowParent": "排放类型",
      "ishowParentKey": "废水零排放企业$废水、废气排放企业",
      "dictionary": [
        {
          "label": "有",
          "value": "1",
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
      "label": "进水表数量",
      "formName": "waterReaderCount",
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
      "ishowParent": "水量情况",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "1个",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "2个",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "3个",
          "value": "3",
          "isText": false,
          "text": ""
        }, {
          "label": "4个",
          "value": "4",
          "isText": false,
          "text": ""
        }, {
          "label": "5个",
          "value": "5",
          "isText": false,
          "text": ""
        }, {
          "label": "6个",
          "value": "6",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formText",
      "label": "进水表1读数",
      "formName": "waterReaderValue1",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "进水表数量",
      "ishowParentKey": "1个$2个$3个$4个$5个$6个"
    }, {
      "formType": "formText",
      "label": "进水表2读数",
      "formName": "waterReaderValue2",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "进水表数量",
      "ishowParentKey": "2个$3个$4个$5个$6个"
    }, {
      "formType": "formText",
      "label": "进水表3读数",
      "formName": "waterReaderValue3",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "进水表数量",
      "ishowParentKey": "3个$4个$5个$6个"
    }, {
      "formType": "formText",
      "label": "进水表4读数",
      "formName": "waterReaderValue4",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "进水表数量",
      "ishowParentKey": "4个$5个$6个"
    }, {
      "formType": "formText",
      "label": "进水表5读数",
      "formName": "waterReaderValue5",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "进水表数量",
      "ishowParentKey": "5个$6个"
    }, {
      "formType": "formText",
      "label": "进水表6读数",
      "formName": "waterReaderValue6",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "进水表数量",
      "ishowParentKey": "6个"
    }, {
      "formType": "formText",
      "label": "自来水日进水量",
      "formName": "waterInValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "水量情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "总排放口流量计读数",
      "formName": "totalWaterWriterValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "水量情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "总排放口排放量",
      "formName": "totalWaterOutValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "水量情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "锅炉",
      "formName": "boilerStatus",
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
          "label": "使用清洁燃料",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "使用非清洁燃料",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "0",
          "isText": false
        }
      ]
    }, {
      "formType": "formText",
      "label": "使用清洁燃料类型",
      "formName": "otherBoilerStatus1",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "锅炉",
      "ishowParentKey": "使用清洁燃料"
    }, {
      "formType": "formText",
      "label": "使用非清洁燃料类型",
      "formName": "otherBoilerStatus2",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "锅炉",
      "ishowParentKey": "使用非清洁燃料"
    }, {
      "formType": "formSelectText",
      "label": "厂区排口情况",
      "formName": "factoryStatus",
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
          "label": "正常",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "异常",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "雨水排放口情况",
      "formName": "rainWriterStatus",
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
          "label": "正常",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "异常",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formText",
      "label": "异常原因",
      "formName": "otherRainWriterStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "雨水排放口情况",
      "ishowParentKey": "异常"
    }, {
      "formType": "formSelectText",
      "label": "工业废水排放口情况",
      "formName": "waterWriterStatus",
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
          "label": "正常",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "异常",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formText",
      "label": "异常原因",
      "formName": "otherWaterWriterStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "工业废水排放口情况",
      "ishowParentKey": "异常"
    }, {
      "formType": "formSelectText",
      "label": "生活污水排放口情况",
      "formName": "lifeWaterWriterStatus",
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
          "label": "正常",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "异常",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formText",
      "label": "异常原因",
      "formName": "otherLifeWaterWriterStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "生活污水排放口情况",
      "ishowParentKey": "异常"
    }, {
      "formType": "formTextArea",
      "label": "情况说明",
      "formName": "describe",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": "请输入情况说明"
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
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
      "isRequire": true,
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formText",
      "label": "上报人",
      "formName": "tableReport",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "submitShow": "",
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formText",
      "label": "调查人员",
      "formName": "reporter",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "submitShow": true,
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "none"
    }, {
      "formType": "formDate",
      "label": "调查时间",
      "formName": "datetime",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "submitShow": true,
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "none"
    }, {
      "formType": "formDate",
      "label": "推送执法时间",
      "formName": "pushHandleTime",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "submitShow": true,
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "none"
    }, {
      "formType": "formSelectText",
      "label": "总进水表照片上传",
      "formName": "totalWaterReader",
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
          "label": "有",
          "value": "1",
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
      "formType": "formPhotoGraph",
      "label": "总进水表照片",
      "formName": "totalWaterReaderImages",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "总进水表照片上传",
      "ishowParentKey": "有",
      "noParent": false
    }, {
      "formType": "formSelectText",
      "label": "总排放口流量计照片上传",
      "formName": "totalWaterWriter",
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
          "label": "有",
          "value": "1",
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
      "formType": "formPhotoGraph",
      "label": "总排放口流量计照片",
      "formName": "totalWaterWriterImages",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "总排放口流量计照片上传",
      "ishowParentKey": "有",
      "noParent": false
    }, {
      "formType": "formSelectText",
      "label": "其他照片上传",
      "formName": "otherPhone",
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
          "label": "有",
          "value": "1",
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
      "formType": "formPhotoGraph",
      "label": "其他照片",
      "formName": "otherPhoneImages",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "其他照片上传",
      "ishowParentKey": "有",
      "noParent": false
    }
  ]
}
