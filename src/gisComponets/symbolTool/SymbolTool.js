/**
 *
 * Created by Administrator on 2017/3/28 0028.
 */

import * as esriLoader from 'esri-loader';


export const symbolTool = {};

/**
 * 设置默认的symbol
 * @param type
 */
symbolTool.getSymbol = function (type) {

    let symbol = null;
    esriLoader.dojoRequire(['esri/map',
            "esri/symbols/SimpleFillSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/PictureMarkerSymbol",
            "esri/symbols/CartographicLineSymbol",
            "esri/Color",
        ],
        (Map,
         SimpleFillSymbol,
         SimpleLineSymbol,
         SimpleMarkerSymbol,
         PictureMarkerSymbol,
         CartographicLineSymbol,
         Color
        ) => {

           if(type == "polygon")
           {
               symbol = new esri.symbol.SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                   new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                       new esri.Color([255,46,96]), 2),new Color([255,46,96,0.25])
               );

           }
           else if(type == "polyline")
           {
               symbol = new esri.symbol.SimpleLineSymbol(
                   SimpleLineSymbol.STYLE_SOLID,
                   new esri.Color([255,0,0]),
                   3
               );
           }
           else if(type == "point")
           {
               symbol  =  new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
                   new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                       new esri.Color([255,0,0]), 1),
                   new esri.Color([0,255,0,0.25]));

             // symbol  = new esri.symbol.PictureMarkerSymbol('./static/images/locate.png',30,30);
           }
           else if(type == "locate")
           {
             // symbol  =  new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
             //     new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
             //         new esri.Color([255,0,0]), 1),
             //     new esri.Color([0,255,0,0.25]));

             symbol  = new esri.symbol.PictureMarkerSymbol('./static/v2images/Shape Copy 2.png',24,24);
           }
           else if(type == "yellowPeople")
           {
             // symbol  =  new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
             //     new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
             //         new esri.Color([255,0,0]), 1),
             //     new esri.Color([0,255,0,0.25]));

             symbol  = new esri.symbol.PictureMarkerSymbol('./static/images/people.png',20,41);
           }
           else if(type == "redPeople")
           {
             // symbol  =  new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
             //     new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
             //         new esri.Color([255,0,0]), 1),
             //     new esri.Color([0,255,0,0.25]));

             symbol  = new esri.symbol.PictureMarkerSymbol('./static/images/huanpeople.png',20,41);
           }
           else if(type == "bluePeople")
           {
             // symbol  =  new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
             //     new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
             //         new esri.Color([255,0,0]), 1),
             //     new esri.Color([0,255,0,0.25]));

             symbol  = new esri.symbol.PictureMarkerSymbol('./static/images/xunpeople.png',20,41);
           }
           else if(type == "blackPeople")
           {
             // symbol  =  new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
             //     new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
             //         new esri.Color([255,0,0]), 1),
             //     new esri.Color([0,255,0,0.25]));

             symbol  = new esri.symbol.PictureMarkerSymbol('./static/images/sanpeople.png',20,41);
           }
           else if(type == "pingPeople")
           {
             // symbol  =  new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
             //     new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
             //         new esri.Color([255,0,0]), 1),
             //     new esri.Color([0,255,0,0.25]));

             symbol  = new esri.symbol.PictureMarkerSymbol('./static/images/pingpeople.png',20,41);
           }
           else if(type == "startPoint")
           {
             symbol  =  new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                 new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                     new esri.Color([28,255,97]), 1),
                 new esri.Color([28,255,97,0.65]));
           }
           else if(type == "endPoint")
           {
             symbol  =  new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10,
                 new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                     new esri.Color([255,20,54]), 1),
                 new esri.Color([255,20,54,0.65]));
           }
        })
    return symbol;
}

symbolTool.getDrawSymbol = function (type) {

    let symbol = null;
    esriLoader.dojoRequire(['esri/map',
            "esri/symbols/SimpleFillSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/PictureMarkerSymbol",
            "esri/symbols/CartographicLineSymbol",
            "esri/Color",
        ],
        (Map,
         SimpleFillSymbol,
         SimpleLineSymbol,
         SimpleMarkerSymbol,
         PictureMarkerSymbol,
         CartographicLineSymbol,
         Color
        ) => {


            if(type == "polyline")
            {
                symbol = new esri.symbol.SimpleLineSymbol();
            }
            else if(type == "point")
            {
                symbol  =  new esri.symbol.SimpleMarkerSymbol();
                // symbol  = new esri.symbol.PictureMarkerSymbol('../../assets/images/locate.png',50,50);
            }
            else
            {
                symbol = new esri.symbol.SimpleFillSymbol();

            }
        })
    return symbol;
}


symbolTool.getBuffSymbol = function () {

    let symbol = null;
    esriLoader.dojoRequire(['esri/map',
            "esri/symbols/SimpleFillSymbol",
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/PictureMarkerSymbol",
            "esri/symbols/CartographicLineSymbol",
            "esri/Color",
        ],
        (Map,
         SimpleFillSymbol,
         SimpleLineSymbol,
         SimpleMarkerSymbol,
         PictureMarkerSymbol,
         CartographicLineSymbol,
         Color
        ) => {


             symbol = new esri.symbol.SimpleFillSymbol(
                SimpleFillSymbol.STYLE_SOLID,
                new esri.symbol.SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    new esri.Color([255,0,0,0.65]), 2
                ),
                new esri.Color([255,0,0,0.35])
            );

        })
    return symbol;

}

