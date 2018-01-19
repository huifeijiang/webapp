<template>
  <div class="grop">
    <mu-row gutter class="img-upload">
      <mu-col width="4"></mu-col>
      <mu-col width="22" v-for="(item,index) in imgList" :key="index">
        <div class="img-container">
          <img :src="item.src" class="img-full-width" @click="openBottomSheet(item,index)" ref="img"/>
          <span v-if="item.type != 'plus'" class="close"></span>
        </div>
      </mu-col>
      <mu-col width="4"></mu-col>
    </mu-row>
    <mu-bottom-sheet :open="bottomSheet" @close="closeBottomSheet">
      <mu-list>
        <mu-list-item title="拍照" @click="addImage"/>
        <mu-list-item title="从手机相册选择" @click="addImageFromGallery"/>
        <mu-list-item title="取消" @click="closeBottomSheet"/>
      </mu-list>
    </mu-bottom-sheet>
    <mu-dialog :open="dialog" title="提示">
      删除该张图片？
      <mu-flat-button slot="actions" @click="dialog=false" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="deleteImage" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>
  import {cameraGetPicture, galleryGetPicture} from '../../components/corSys/camera';
  import {eventBus} from '../../components/eventBus/eventBus';
  export default {
    data(){
      return {
        dialog: false,
        imgList: [
          {
            type: 'plus',
            src: './static/v2images/plus.png'
          }
        ],
        bottomSheet: false,
        currentClickImage: 0
      }
    },
    props: {
      imagesId: {
        type: String,
        default: ''
      },
      imageValue:{
        type:Array,
        default:function(){
            return []
        }
      }
    },
    watch:{
      imageValue(val){
        for (let item of val) {
          let obj = {}
          obj.type = 'photo';
          obj.src =  item;
          this.imgList.unshift(obj)
        }
      },
    },
    methods: {
      deleteImage(){
        this.imgList.splice(this.currentClickImage, 1);
        this.dialog = false;
        eventBus.bus.emit(eventBus.PHOTOGRAPH_DELETE, this.imgList, this.imagesId);
      },
      addImage(){
        let that = this;
        let obj = {};
        cameraGetPicture(obj);
        eventBus.bus.once(eventBus.TAKE_PHOTO_DOWN, function () {
          obj.type = 'photo';
          if (that.imgList.length < 6) {
            that.imgList.unshift(obj);
          }
          if (that.imgList.length === 6) {
            let lastImage = that.imgList.pop();
          }
          that.bottomSheet = false;
          eventBus.bus.emit(eventBus.PHOTOGRAPH_IMAGE, that.imgList, that.imagesId);
        })
      },
      addImageFromGallery(){
        let that = this;
        let obj = {};
        this.bottomSheet = false;
        galleryGetPicture(obj);
        eventBus.bus.once(eventBus.GET_PHOTO_DOWN, function () {
          obj.type = 'photo';
          if (that.imgList.length < 6) {
            that.imgList.unshift(obj);
          }
          if (that.imgList.length === 6) {
            let lastImage = that.imgList.pop();
          }
          that.bottomSheet = false;
          eventBus.bus.emit(eventBus.PHOTOGRAPH_IMAGE, that.imgList, that.imagesId);
        })
      },
      closeBottomSheet () {
        this.bottomSheet = false;
      },
      openBottomSheet (item, index) {
        this.currentClickImage = index;
        if (item.type === 'plus') {
          this.bottomSheet = true;
        } else {
          this.dialog = true;
        }
      },
    },
    mounted(){
      let app = {
        initialize: function () {
          let ttt = document.getElementById("cameraTakePicture");
          document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        },
        onDeviceReady: function () {
          this.receivedEvent('deviceready');
        },
        receivedEvent: function (id) {
          console.log('Received Event: ' + id);
        }
      };
      app.initialize();
      eventBus.bus.on('clearImage', (val) => {
        let newArr = [];
        newArr.push({
          type: 'plus',
          src: './static/images/plus.jpg'
        });
        this.imgList = newArr;
      })
    }
  }
</script>

<style lang="less">
  .grop {
    margin-bottom: 10px;
  }

  .img-container {
    width: 82.8px;
    height: 82.8px;
    position: relative;

  }

  .close {
    /* still bad on picking color */
    background: #de2626;
    color: #fff;
    /* make a round button */
    border-radius: 12px;
    /* center text */
    line-height: 20px;
    text-align: center;
    height: 20px;
    width: 20px;
    font-size: 18px;
    padding: 1px;
  }

  /* use cross as close button */
  .close::before {
    content: "\2716";
  }

  /* place the button on top-right */
  .close {
    top: 3px;
    right: 10px;
    position: absolute;
  }

  .img-upload {
    padding-left: 5px;
  }

  .img-full-width {
    width: 92%;
    height: 92%;
  }

  div.img-upload {
    justify-content: flex-start;
  }
</style>
