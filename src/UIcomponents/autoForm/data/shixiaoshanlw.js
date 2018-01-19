export const xiaosanluanwuData = {};

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
      "label": "企业环保负责人",
      "formName": "envManager",
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
      "label": "企业环保负责人电话",
      "formName": "envManagerTel",
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
      "formType": "formText",
      "label": "面积(m²)",
      "formName": "area",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "value": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "isShow": true,
      "selfDefine": "",
      "isRequire": false
    }, {
      "formType": "formText",
      "label": "产值(万元)",
      "formName": "outputValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "value": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "isShow": true,
      "selfDefine": "",
      "isRequire": false
    }, {
      "formType": "formText",
      "label": "员工人数(人)",
      "formName": "peopleCount",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "value": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "isShow": true,
      "selfDefine": "",
      "isRequire": false
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
      "isRequire": false
    }, {
      "formType": "formRadio",
      "label": "营业执照",
      "formName": "haveEnterpriseLicense",
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
          "value": "1",
          "isText": true
        }, {
          "label": "无",
          "value": "0",
          "isText": true
        }
      ]
    }, {
      "formType": "formText",
      "label": "统一社会信用代码",
      "formName": "enterpriseLicense",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": true,
      "ishowParent": "营业执照",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "环保手续",
      "formName": "approvalProcedure",
      "submitMess": {
        "NULLERROR": ""
      },
      "selfDefine": {
        "selectMore": false
      },
      "modalCValue": "",
      "isShow": true,
      "modalValue": "",
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
      ],
      "value": "",
      "isRequire": true,
      "ishowParent": "生产废水",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "环保批文号",
      "formName": "approvalNo",
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "环保手续",
      "ishowParentKey": "审批批文"
    }, {
      "formType": "formText",
      "label": "登记备案号",
      "formName": "recordNo",
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "环保手续",
      "ishowParentKey": "登记备案"
    }, {
      "formType": "formEventList",
      "label": "产品类别",
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
      "isRequire": false
    }, {
      "formType": "formEventList",
      "label": "主要生产工艺",
      "formName": "craftsTypes",
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
      "isRequire": false
    }, {
      "formType": "formRadio",
      "label": "生产废水",
      "formName": "haveProductWater",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": true,
      "value": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "有",
          "value": "1",
          "isText": true
        }, {
          "label": "无",
          "value": "0",
          "isText": true
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
      "label": "废水排水量(吨/日)",
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
      "label": "特征污染物",
      "formName": "pollutantsTypes",
      "submitMess": {
        "NULLERROR": ""
      },
      "isShow": false,
      "selfDefine": {
        "selectMore": true
      },
      "modalCValue": "",
      "modalValue": "",
      "isRequire": false,
      "dictionary": [
        {
          "label": "COD",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "氨氮",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "总磷",
          "value": "3",
          "isText": false,
          "text": ""
        }, {
          "label": "氟化物",
          "value": "4",
          "isText": false,
          "text": ""
        }, {
          "label": "氰化物",
          "value": "5",
          "isText": false,
          "text": ""
        }, {
          "label": "阴离子表面活性剂",
          "value": "6",
          "isText": false,
          "text": ""
        }, {
          "label": "总铜",
          "value": "7",
          "isText": false,
          "text": ""
        }, {
          "label": "总镍",
          "value": "8",
          "isText": false,
          "text": ""
        }, {
          "label": "总铬",
          "value": "9",
          "isText": false,
          "text": ""
        }
      ],
      "value": "",
      "ishowParent": "生产废水",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "生产废水处理及纳管情况",
      "formName": "haveProductWaterHandle",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": true,
      "selfDefine": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "有",
          "value": "1",
          "isText": true
        }, {
          "label": "无",
          "value": "0",
          "isText": true
        }
      ]
    }, {
      "formType": "formRadio",
      "label": "生产废水处理情况",
      "formName": "waterHandleStatus",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "未处理",
          "value": "0",
          "isText": true
        }, {
          "label": "自建废水处理设施",
          "value": "1",
          "isText": true
        }, {
          "label": "拉运处理",
          "value": "2",
          "isText": true
        }
      ],
      "ishowParent": "生产废水处理及纳管情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "拉运单位",
      "formName": "waterJustUnit",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "生产废水处理情况",
      "ishowParentKey": "拉运处理"
    }, {
      "formType": "formDate",
      "label": "最近一次拉运时间",
      "formName": "waterLastTime",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "isRequire": false,
      "selfDefine": "",
      "value": "",
      "ishowParent": "生产废水处理情况",
      "ishowParentKey": "拉运处理"
    }, {
      "formType": "formRadio",
      "label": "废水排放达标情况",
      "formName": "waterProductStatus",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "dictionary": [
        {
          "label": "达标排放",
          "value": "1",
          "isText": true
        }, {
          "label": "非达标排放",
          "value": "0",
          "isText": true
        }
      ],
      "ishowParent": "生产废水处理及纳管情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "纳管情况",
      "formName": "nanotubesStatus",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "dictionary": [
        {
          "label": "未纳管",
          "value": "0",
          "isText": true
        }, {
          "label": "雨水管",
          "value": "2",
          "isText": true
        }, {
          "label": "污水管",
          "value": "3",
          "isText": true
        }
      ],
      "ishowParent": "生产废水处理及纳管情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "最终去向",
      "formName": "finalDestination",
      "submitMess": {
        "NULLERROR": ""
      },
      "selfDefine": {
        "selectMore": false
      },
      "modalCValue": "",
      "isShow": true,
      "modalValue": "",
      "isRequire": false,
      "dictionary": [
        {
          "label": "污水厂",
          "value": "0",
          "isText": false
        }, {
          "label": "河流",
          "value": "1",
          "isText": false
        }
      ],
      "value": "",
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formText",
      "label": "污水厂",
      "formName": "sewagePlant",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "最终去向",
      "ishowParentKey": "污水厂"
    }, {
      "formType": "formText",
      "label": "三级支流",
      "formName": "tributaries3",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "最终去向",
      "ishowParentKey": "河流"
    }, {
      "formType": "formText",
      "label": "二级支流",
      "formName": "tributaries2",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "最终去向",
      "ishowParentKey": "河流"
    }, {
      "formType": "formText",
      "label": "一级支流",
      "formName": "tributaries1",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "最终去向",
      "ishowParentKey": "河流"
    }, {
      "formType": "formText",
      "label": "干流",
      "formName": "mainStream",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "最终去向",
      "ishowParentKey": "河流"
    }, {
      "formType": "formRadio",
      "label": "危废生产情况",
      "formName": "dangerProductStatus",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": true,
      "selfDefine": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "有",
          "value": "1",
          "isText": true
        }, {
          "label": "无",
          "value": "0",
          "isText": true
        }
      ]
    }, {
      "formType": "formText",
      "label": "种类",
      "formName": "dangerSpecies",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "危废生产情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "产生量(吨/月)",
      "formName": "productValue",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "危废生产情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "有无危废处置协议",
      "formName": "dangerProtocol",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": true,
      "selfDefine": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "有",
          "value": "1",
          "isText": true
        }, {
          "label": "无",
          "value": "0",
          "isText": true
        }
      ]
    }, {
      "formType": "formText",
      "label": "危废处置协议单位",
      "formName": "justUnit",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "有无危废处置协议",
      "ishowParentKey": "有"
    }, {
      "formType": "formDate",
      "label": "最近一次拉运时间",
      "formName": "justUnitTime",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "isRequire": false,
      "selfDefine": "",
      "ishowParent": "有无危废处置协议",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "是否需要执法整治",
      "formName": "lawEnforcement",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "isRequire": true,
      "dictionary": [
        {
          "label": "是",
          "value": "true",
          "isText": false
        }, {
          "label": "否",
          "value": "false",
          "isText": false
        }
      ]
    }, {
      "formType": "formSelectText",
      "label": "整治要求",
      "formName": "lawEnforcementDemand",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "selfDefine": {
        "selectMore": true
      },
      "isShow": false,
      "isRequire": false,
      "dictionary": [
        {
          "label": "污水处理设施达标排放",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "按要求拉运处理",
          "value": "2",
          "isText": false,
          "text": ""
        }, {
          "label": "其他",
          "value": "0",
          "isText": true,
          "text": "",
          "field": "otherLawEnforcementDemand0"
        }
      ],
      "ishowParent": "是否需要执法整治",
      "ishowParentKey": "是"
    }, {
      "formType": "formText",
      "label": "其他",
      "formName": "otherLawEnforcementDemand0",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "value": "",
      "isShow": false,
      "selfDefine": "",
      "isRequire": false,
      "ishowParent": "整治要求",
      "ishowParentKey": "其他"
    }, {
      "formType": "formTextArea",
      "label": "情况说明",
      "formName": "describe",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalValue": "",
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": false
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
      "formType": "formText",
      "label": "调查人员",
      "formName": "username",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "submitShow": true,
      "modalCValue": "",
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
