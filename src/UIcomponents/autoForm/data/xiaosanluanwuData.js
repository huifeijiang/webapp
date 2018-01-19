/**
 * Created by haibalai on 2017/10/26.
 */
export const xiaosanluanwuData = {}

xiaosanluanwuData.xiaosanluanwuDataJson = {
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
          "isText": true
        }, {
          "label": "无",
          "value": "false",
          "isText": false
        }
      ],
      "isRequire": true
    }, {
      "formType": "formText",
      "label": "行业类型",
      "formName": "industryType",
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
      "label": "法人代表电话",
      "formName": "legalPersonTel",
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
      "formType": "formEventList",
      "label": "可能产生废水的产品类别",
      "formName": "productTypes",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": {
        "selectMore": true,
        "serviceUrl": "/enterprise/product/types"
      },
      "value": "",
      "isRequire": true
    }, {
      "formType": "formEventList",
      "label": "可能产生废水的主要生产工艺",
      "formName": "crafts",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": {
        "selectMore": true,
        "serviceUrl": "/enterprise/craft"
      },
      "value": "",
      "isRequire": true
    }, {
      "formType": "formRadioText",
      "label": "环保批文",
      "formName": "approvalNo",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "dictionary": [
        {
          "label": "有",
          "value": "true",
          "isText": true
        }, {
          "label": "无",
          "value": "false",
          "isText": false
        }
      ],
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true
    }, {
      "formType": "formSelectText",
      "label": "生产废水",
      "formName": "isProduceWastewater",
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
          "isText": false
        }, {
          "label": "无",
          "value": false,
          "isText": false
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
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "生产废水",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "排水量(吨/日)",
      "formName": "outOfWater",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "生产废水",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废水直排",
      "formName": "isOutWastewater",
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
      "dictionary": [
        {
          "label": "有",
          "value": true,
          "isText": false
        }, {
          "label": "无",
          "value": false,
          "isText": false
        }
      ],
      "ishowParent": "生产废水",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废水处理设施",
      "formName": "isWastewaterFacility",
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
      "dictionary": [
        {
          "label": "有",
          "value": true,
          "isText": false
        }, {
          "label": "无",
          "value": false,
          "isText": false
        }
      ],
      "ishowParent": "生产废水",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废水处理方式",
      "formName": "waterHandleType",
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
      "dictionary": [
        {
          "label": "自建设施处理",
          "value": "1",
          "isText": false
        }, {
          "label": "拉运处理",
          "value": "2",
          "isText": false
        }
      ],
      "ishowParent": "废水处理设施",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "现状污水排放情况",
      "formName": "wastewaterOutStatus",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "生产废水",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "最终去向",
      "formName": "finalDestination",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "生产废水",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "生产废气",
      "formName": "produceGas",
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
          "isText": false
        }, {
          "label": "无",
          "value": false,
          "isText": false
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "废气直排",
      "formName": "outGas",
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
      "dictionary": [
        {
          "label": "有",
          "value": false,
          "isText": false
        }, {
          "label": "无",
          "value": true,
          "isText": false
        }
      ],
      "ishowParent": "生产废气",
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
      "dictionary": [
        {
          "label": "有",
          "value": false,
          "isText": false
        }, {
          "label": "无",
          "value": true,
          "isText": false
        }
      ],
      "ishowParent": "生产废气",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废气处理设施类型",
      "formName": "gasFacilityType",
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
      "dictionary": [
        {
          "label": "活性炭",
          "value": "1",
          "isText": false
        }, {
          "label": "光解",
          "value": "2",
          "isText": false
        }, {
          "label": "等离子",
          "value": "3",
          "isText": false
        }, {
          "label": "燃烧",
          "value": "4",
          "isText": false
        }, {
          "label": "其他",
          "value": "0",
          "isText": false
        }
      ],
      "ishowParent": "生产废气",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废气处理设施维护频次",
      "formName": "gasFacilityFreq",
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
      "dictionary": [
        {
          "label": "一个月/次",
          "value": "5",
          "isText": false
        }, {
          "label": "三个月/次",
          "value": "6",
          "isText": false
        }, {
          "label": "半年/次",
          "value": "7",
          "isText": false
        }, {
          "label": "一年/次",
          "value": "8",
          "isText": false
        }, {
          "label": "无",
          "value": "0",
          "isText": false
        }
      ],
      "ishowParent": "生产废气",
      "ishowParentKey": "有"
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
      "isRequire": true
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


