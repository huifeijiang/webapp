/**
 * Created by Administrator on 2017/4/12 0012.
 */

import * as esriLoader from 'esri-loader';

export const  gpService = {}

gpService.geometryService = null;


gpService.getGeometryService = function () {

    let geometryService = null;
    esriLoader.dojoRequire(['esri/map',

            'esri/tasks/GeometryService',
        ],
        (Map,
         GeometryService
        ) => {

            if(gpService.geometryService == null)
            {
                gpService.geometryService =    new esri.tasks.GeometryService(layerConfig.geometeryServiceUrl);

            }

            geometryService =  gpService.geometryService;
        })
    return geometryService;
}