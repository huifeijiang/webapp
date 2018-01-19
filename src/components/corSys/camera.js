/**
 * Created by Administrator on 2017/7/11 0011.
 */
import {eventBus} from '../eventBus/eventBus'
function cameraGetPicture(image,type = 'DATA_URL') {
    let returnType = 'DATA_URL';
    
    if(type == 'DATA_URL'){
        returnType = Camera.DestinationType.DATA_URL;
    }else if(type == 'FILE_URI'){
        returnType = Camera.DestinationType.FILE_URI;
    }else if(type == 'NATIVE_URI'){
        returnType = Camera.DestinationType.NATIVE_URI;
    }
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 30,
        targetWidth:1488,
        targetHeight:1984,
        destinationType: returnType ,
        sourceType: Camera.PictureSourceType.CAMERA,
        saveToPhotoAlbum:true
    });
    
    function onSuccess(imageData) {
        // image.src = imageData;
        let data = '';
        console.log("2",type);
        if(type == 'DATA_URL'){
            data = "data:image/jpeg;base64," + imageData;
        }else{
            throw new Error("请使用base64编码形式返回数据！");
        }
        image.src = data;
        eventBus.bus.emit(eventBus.TAKE_PHOTO_DOWN,data);
        return true;
    }
    
    function onFail(message) {
        
    }
}

function galleryGetPicture(image) {
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 30,
        targetWidth:1488,
        targetHeight:1984,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM
    });
    
    function onSuccess(imageData) {
        // var image = document.getElementById('test');
        image.src = "data:image/jpeg;base64," + imageData;
        eventBus.bus.emit(eventBus.GET_PHOTO_DOWN,imageData);
    }
    
    function onFail(message) {
        alert('Failed because: ' + message);
    }
}
export {cameraGetPicture };
export {galleryGetPicture };