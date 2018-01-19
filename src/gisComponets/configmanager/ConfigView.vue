<template>
   <div></div>
</template>
<script>

    import LayerConifg  from './LayerConifg'
    import {configManagerCtrl}  from './ConfigManagerCtrl'
    import {XML} from '../tool/ObjTree'
    import {JKL} from '../tool/ObjJKL'
    import  {fileTool} from '../../components/corSys/fileTool'

    export default {
        props:{

            loadDataType:{
                type:String,
                default:'local'

                },

        },
        data(){
            return {}
        },
        methods: {



        },
        computed: {

        },
        mounted()
        {
        	 let isWeb = true;
//           console.log("config load-------")
           let configArr = [];
           if (this.loadDataType == 'local') {

           	 if(isWeb == true)
             {
                    let isDev = window.location.host;
                    let url = GET_MAP_CONFIG;
                    if(isDev.indexOf('localhost') >= 0){
                        url = "./static/xml/configmanager/config3.xml";
                    }
                 this.$http.get(url).then(function success(response)
                 {
                   let xotree = new XML.ObjTree();		    //
                   let tree   = xotree.parseXML( response.bodyText );  //

                   let layerArr = tree['LAYERS']['LAYER'];

                   layerArr.forEach(function (value, index, array) {

                     let layerConfig = new LayerConifg(value);

                     configArr.push(layerConfig);

                   })
                   configManagerCtrl.configArr = configArr;
                   configManagerCtrl.isLoad = true
//                   console.log("configManagerCtrl load");
                 })
             }
             else
             {
                 var app = {
                   initialize: function() {

                     document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
                   },

                   onDeviceReady: function() {

                     fileTool.readFile("/static/xml/configmanager/","config.xml",function (response) {
//                       console.log(response)
                       let xotree = new XML.ObjTree();		    //
                       let tree   = xotree.parseXML( response );  //


                       let layerArr = tree['LAYERS']['LAYER'];

                       layerArr.forEach(function (value, index, array) {


                         let layerConfig = new LayerConifg(value);

                         configArr.push(layerConfig);


                       })
                       configManagerCtrl.configArr = configArr;
//                       console.log(configArr);
                     })

                   },
                 };
                 app.initialize();
             }




           }
       }
    }
</script>
