/**
 * Created by Administrator on 2017/11/17 0017.
 */
export const xiaofeishuiCompanyData = {}

xiaofeishuiCompanyData.xiaofeishuiCompanyDataJson = {
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
      "label": "法人代表联系电话",
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
      "label": "环保负责人联系电话",
      "formName": "envManagerTel",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": "",
      },
      "modalCValue": "",
      "isShow": true,
      "selfDefine": "",
      "value": "",
      "isRequire": true
    }, {
      "formType": "formText",
      "label": "面积(m²)",
      "formName": "area",
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
      "label": "产值(万元)",
      "formName": "outputValue",
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
      "label": "员工人数(人)",
      "formName": "peopleCount",
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
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formText",
      "label": "统一社会信用代码",
      "formName": "enterpriseLicense",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": true,
      "ishowParent": "营业执照",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "环保批文",
      "formName": "haveApproval",
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
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "ishowParent": "",
      "ishowParentKey": ""
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
      "isRequire": false,
      "ishowParent": "环保批文",
      "ishowParentKey": "有"
    }, {
      "formType": "formDate",
      "label": "审批时间",
      "formName": "approvalTime",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "环保批文",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "审批水量(吨)",
      "formName": "approvalWater",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "环保批文",
      "ishowParentKey": "有"
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
      "formType": "formSelectText",
      "label": "生产废水",
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
      ],
      "formName": "haveProductWater",
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
      "ishowParent": "",
      "ishowParentKey": ""
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
      "label": "废水排放量(吨/日)",
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
      "formType": "formEventList",
      "label": "特征污染物",
      "formName": "pollutantsTypes",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": {
        "selectMore": true,
        "serviceUrl": "/v1/dictionary/pollutantsTypes"
      },
      "value": "",
      "isRequire": false,
      "ishowParent": "生产废水",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "生产废水处理及纳管情况",
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
      ],
      "formName": "haveProductWaterHandle",
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
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formSelectText",
      "label": "废水收集情况",
      "dictionary": [
        {
          "label": "明管收集",
          "value": "1",
          "isText": false,
          "text": ""
        }, {
          "label": "未明管收集",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "formName": "waterCollectStatus",
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
      "isRequire": false,
      "ishowParent": "生产废水处理及纳管情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废水收集方式",
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
      ],
      "formName": "waterCollectWay",
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
      "isRequire": false,
      "ishowParent": "生产废水处理及纳管情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "废水收集有效容积(m³)",
      "formName": "waterCollectValue",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "生产废水处理及纳管情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "现场废水贮存量(吨)",
      "formName": "currentWaterCollect",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "生产废水处理及纳管情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "废水拉运协议",
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
      ],
      "formName": "haveWaterRopingProtocol",
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
      "ishowParent": "",
      "ishowParentKey": ""
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
      "isRequire": false,
      "ishowParent": "废水拉运协议",
      "ishowParentKey": "有"
    }, {
      "formType": "formDate",
      "label": "有效期限",
      "formName": "waterRopingOnTime",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "废水拉运协议",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "2015年拉运记录",
      "formName": "waterRopingRecord2015",
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
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formText",
      "label": "2015废水拉运量(吨)",
      "formName": "waterRopingValue2015",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "2015年拉运记录",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "2016年拉运记录",
      "formName": "waterRopingRecord2016",
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
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formText",
      "label": "2016废水拉运量(吨)",
      "formName": "waterRopingValue2016",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "2016年拉运记录",
      "ishowParentKey": "有"
    }, {
      "formType": "formRadio",
      "label": "2017年拉运记录",
      "formName": "waterRopingRecord2017",
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
          "isText": false,
          "text": ""
        }, {
          "label": "无",
          "value": "0",
          "isText": false,
          "text": ""
        }
      ],
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formText",
      "label": "2017废水拉运量(吨)",
      "formName": "waterRopingValue2017",
      "modalValue": "",
      "submitMess": {
        "NUMBERERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "2017年拉运记录",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "危废产生情况",
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
      ],
      "formName": "dangerProductStatus",
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
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formText",
      "label": "种类",
      "formName": "dangerSpecies",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "危废产生情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formText",
      "label": "产生量(吨/月)",
      "formName": "productValue",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "危废产生情况",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "危废处置协议",
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
      ],
      "formName": "dangerProtocol",
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
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formText",
      "label": "危废处置单位",
      "formName": "justUnit",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "危废处置协议",
      "ishowParentKey": "有"
    }, {
      "formType": "formDate",
      "label": "最近一次拉运时间",
      "formName": "justUnitTime",
      "modalValue": "",
      "submitMess": {
        "NULLERROR": ""
      },
      "modalCValue": "",
      "isShow": false,
      "selfDefine": "",
      "value": "",
      "isRequire": false,
      "ishowParent": "危废处置协议",
      "ishowParentKey": "有"
    }, {
      "formType": "formSelectText",
      "label": "是否需要执法整治",
      "formName": "lawEnforcement",
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
          "value": "true",
          "isText": false,
          "text": ""
        }, {
          "label": "否",
          "value": "false",
          "isText": false,
          "text": ""
        }
      ],
      "ishowParent": "",
      "ishowParentKey": ""
    }, {
      "formType": "formTextArea",
      "label": "其他情况",
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
      "formType": "formText",
      "label": "调查人员",
      "formName": "reporter",
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
      "formType": "formText",
      "label": "执法事件等级",
      "formName": "type",
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
      "ishowParent": ""
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
      "noParent": true
    }
  ]
}
