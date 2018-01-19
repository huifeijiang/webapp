/**
 * Created by Administrator on 2017/7/11 0011.
 */
//地理位置获取函数
import {eventBus} from '../eventBus/eventBus.js';
function getPosition(callback) {

    let options = {
        enableHighAccuracy: true,
        maximumAge: 3600000
    };

    let watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

    function onSuccess(position) {
        // console.log("%c getPosition！！！","color:green");
        // console.log('Latitude: '          + position.coords.latitude          + '\n' +
        //     'Longitude: '         + position.coords.longitude         + '\n' +
        //     'Altitude: '          + position.coords.altitude          + '\n' +
        //     'Accuracy: '          + position.coords.accuracy          + '\n' +
        //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //     'Heading: '           + position.coords.heading           + '\n' +
        //     'Speed: '             + position.coords.speed             + '\n' +
        //     'Timestamp: '         + position.timestamp                + '\n');
        if(typeof(callback) == "function"){
          callback(position);
        }
    }

    function onError(error) {
        console.error('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
    }
}


function watchPosition(callback) {

    let options = {
        maximumAge: 3600000,
        timeout: 300000,
        enableHighAccuracy: true,
    };

    let watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

    function onSuccess(position) {
        if(typeof callback === "function"){
            callback(position);
        }
        // console.log("%c watchPosition！！！","color:red");
        // console.log('Latitude: '          + position.coords.latitude          + '\n' +
        //     'Longitude: '         + position.coords.longitude         + '\n' +
        //     'Altitude: '          + position.coords.altitude          + '\n' +
        //     'Accuracy: '          + position.coords.accuracy          + '\n' +
        //     'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        //     'Heading: '           + position.coords.heading           + '\n' +
        //     'Speed: '             + position.coords.speed             + '\n' +
        //     'Timestamp: '         + position.timestamp                + '\n');
    }

    function onError(error) {
        eventBus.bus.emit('get_position_error');
        console.error('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
    }

}


export { watchPosition };
export { getPosition };
