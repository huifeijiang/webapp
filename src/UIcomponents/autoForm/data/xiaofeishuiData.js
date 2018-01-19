/**
 * Created by Administrator on 2017/10/24 0024.
 */
export const xiaofeishuiData = {}

xiaofeishuiData.xiaofeishuiDataJson = {
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
      "formType": "formText",
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
      "formType": "formText",
      "label": "环保批文号",
      "formName": "approvalNo",
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
      "label": "审批水量(吨)",
      "formName": "approvalWater",
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
      "label": "废水收集设施标识、标志牌悬挂",
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
      "formType": "formRadio",
      "label": "悬挂废水种类标识",
      "formName": "haveWaterTag",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废水收集设施标识、标志牌悬挂",
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
      "label": "悬挂安全警示标识牌",
      "formName": "haveSafeTag",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废水收集设施标识、标志牌悬挂",
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
      "label": "废水收集纳管情况",
      "formName": "collectionTubeType",
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
          "value": "0",
          "isText": false,
          "text": ""
        }, {
          "label": "管道分类走向无标识或模糊",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "管道存在松脱、滴漏现象",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "明管收集",
          "value": "3",
          "isText": false,
          "text": ""
        }, {
          "label": "部分暗管收集",
          "value": "4",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "废水贮存情况",
      "formName": "waterCollectWay",
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
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "收集池",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "收集桶",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "其他",
          "value": "0",
          "isText": true,
          "text": "",
          "field": "otherWaterCollectWay0"
        }
      ]
    }, {
      "formType": "formText",
      "label": "废水贮存有效容积(m³)",
      "formName": "waterCollectValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "应急收集设施",
      "formName": "emergencyCollectFacility",
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
      "label": "应急池/桶",
      "formName": "emergencyPoolStatus",
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
      "ishowParent": "应急收集设施",
      "ishowParentKey": "有",
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
        }, {
          "label": "无",
          "value": "2",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formText",
      "label": "应急池/桶异常情况",
      "formName": "emergencyPoolException",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "应急池/桶",
      "ishowParentKey": "异常"
    }, {
      "formType": "formSelectText",
      "label": "三防措施",
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
      "ishowParent": "三防措施",
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
      "ishowParent": "三防措施",
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
      "ishowParent": "三防措施",
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
      "ishowParent": "三防措施",
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
      "label": "废水拉运情况",
      "formName": "haveWaterRopingStatus",
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
      "label": "废水委外拉运协议",
      "formName": "haveWaterRopingProtocol",
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
      "ishowParent": "废水拉运情况",
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
      "label": "废水拉运单位",
      "formName": "waterRopingUnit",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废水委外拉运协议",
      "ishowParentKey": "有"
    }, {
      "formType": "formDate",
      "label": "废水拉运有效期限",
      "formName": "waterRopingOnTime",
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
      "ishowParent": "废水委外拉运协议",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "现场废水暂存量约(吨)",
      "formName": "currentWaterSaveValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废水拉运情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废水当月拉运转移情况",
      "formName": "haveWaterTransferStatus",
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
      "ishowParent": "废水拉运情况",
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
      "label": "废水当月拉运量(吨)",
      "formName": "currentWaterTransferValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "废水当月拉运转移情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formDate",
      "label": "废水拉运日期",
      "formName": "waterTransferOnTime",
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
      "ishowParent": "废水当月拉运转移情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "用水情况",
      "formName": "haveWaterUsingStatus",
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
      "label": "新鲜水使用情况",
      "formName": "haveFreshWaterUsingStatus",
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
      "ishowParent": "用水情况",
      "ishowParentKey": "有",
      "dictionary": [
        {
          "label": "自来水",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "地下水",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "自备水",
          "value": "3",
          "isText": false,
          "text": ""
        }
      ]
    }, {
      "formType": "formText",
      "label": "当月生产用水量(吨)",
      "formName": "currentProductionUsingValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "用水情况",
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
          "isText": false,
          "text": ""
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
      "ishowParent": "none",
      "ishowParentKey": ""
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
      "ishowParent": "none",
      "ishowParentKey": ""
    }, {
      "formType": "formSelectText",
      "label": "拉运联单照片上传",
      "formName": "transferTable",
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
      "label": "拉运联单照片",
      "formName": "transferTableImages",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "拉运联单照片上传",
      "ishowParentKey": "有",
      "noParent": false
    }, {
      "formType": "formSelectText",
      "label": "用水证明照片上传",
      "formName": "usingWaterProve",
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
      "label": "用水证明照片",
      "formName": "usingWaterProveImages",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "用水证明照片上传",
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
      "label": "其他情况照片",
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
    }, {
      "formType": "formRadio",
      "label": "是否推送执法",
      "formName": "lawEnforcement",
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
    }
  ]
}

