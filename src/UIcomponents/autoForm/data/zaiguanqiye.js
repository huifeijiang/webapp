/**
 * Created by Administrator on 2017/10/27 0027.
 */
export const zaiguanqiyeData = {}

zaiguanqiyeData.zaiguanqiyeDataJson = {
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
				"NUMBERERROR": ""
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
		},{
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
			"formName": "",
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
			"formName": "haveProductWater",
			"dictionary": [
				{
					"label": "有",
					"value": 1,
					"isText": false,
					"text": ""
				}, {
					"label": "无",
					"value": 0,
					"isText": false,
					"text": ""
				}
			],
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
			"label": "废水排放达标情况",
			"formName": "outStatus",
			"submitMess": {
				"NULLERROR": ""
			},
			"isShow": false,
			"isRequire": false,
			"dictionary": [
				{
					"label": "达标排放",
					"value": 1,
					"isText": false,
					"text": ""
				}, {
					"label": "未达标排放",
					"value": 0,
					"isText": false,
					"text": ""
				}
			],
			"modalValue": "",
			"modalCValue": "",
			"selfDefine": {
				"selectMore": false
			},
			"value": "",
			"ishowParent": "生产废水",
			"ishowParentKey": "有"
		}, {
			"formType": "formSelectText",
			"label": "纳管情况",
			"formName": "nanotubesStatus",
			"submitMess": {
				"NULLERROR": ""
			},
			"isShow": false,
			"isRequire": false,
			"dictionary": [
				{
					"label": "纳管",
					"value": 0,
					"isText": false,
					"text": ""
				}, {
					"label": "未纳管",
					"value": 1,
					"isText": false,
					"text": ""
				}, {
					"label": "雨水管",
					"value": 2,
					"isText": false,
					"text": ""
				}, {
					"label": "污水管",
					"value": 3,
					"isText": false,
					"text": ""
				}
			],
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
			"label": "最终去向",
			"formName": "finalDestination",
			"isShow": "",
			"isRequire": "",
			"dictionary": [
				{
					"label": "污水厂",
					"value": 0,
					"isText": false,
					"text": ""
				}, {
					"label": "河流",
					"value": 1,
					"isText": false,
					"text": ""
				}
			],
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
			"label": "污水厂",
			"formName": "sewagePlant",
			"modalValue": "",
			"submitMess": {
				"NULLERROR": ""
			},
			"modalCValue": "",
			"isShow": false,
			"selfDefine": "",
			"value": "",
			"isRequire": false,
			"ishowParent": "最终去向",
			"ishowParentKey": "污水厂"
		}, {
			"formType": "formText",
			"label": "三级支流",
			"formName": "tributaries3",
			"modalValue": "",
			"submitMess": {
				"NULLERROR": "请输入环保批文号"
			},
			"modalCValue": "",
			"isShow": false,
			"selfDefine": "",
			"value": "",
			"isRequire": false,
			"ishowParent": "最终去向",
			"ishowParentKey": "河流"
		}, {
			"formType": "formText",
			"label": "二级支流",
			"formName": "tributaries2",
			"modalValue": "",
			"submitMess": {
				"NULLERROR": "请输入环保批文号"
			},
			"modalCValue": "",
			"isShow": false,
			"selfDefine": "",
			"value": "",
			"isRequire": false,
			"ishowParent": "最终去向",
			"ishowParentKey": "河流"
		}, {
			"formType": "formText",
			"label": "一级支流",
			"formName": "tributaries1",
			"modalValue": "",
			"submitMess": {
				"NULLERROR": "请输入环保批文号"
			},
			"modalCValue": "",
			"isShow": false,
			"selfDefine": "",
			"value": "",
			"isRequire": false,
			"ishowParent": "最终去向",
			"ishowParentKey": "河流"
		}, {
			"formType": "formText",
			"label": "干流",
			"formName": "mainStream",
			"modalValue": "",
			"submitMess": {
				"NULLERROR": "请输入环保批文号"
			},
			"modalCValue": "",
			"isShow": false,
			"selfDefine": "",
			"value": "",
			"isRequire": false,
			"ishowParent": "最终去向",
			"ishowParentKey": "河流"
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
				"NUMBERERROR": ""
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
			"label": "拉运单位",
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
				"NULLERROR": "请输入环保批文号"
			},
			"modalCValue": "",
			"isShow": false,
			"selfDefine": "",
			"value": "",
			"isRequire": false,
			"ishowParent": "危废处置协议",
			"ishowParentKey": "有"
		}, {
			"formType": "formRadio",
			"label": "是否需要执法整治",
			"formName": "lawEnforcement",
			"submitMess": {
				"NULLERROR": ""
			},
			"isShow": true,
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
			"modalCValue": "",
			"isShow": true,
			"selfDefine": "",
			"value": "",
			"isRequire": false,
			"ishowParent": "整治要求",
			"ishowParentKey": "其他"
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
