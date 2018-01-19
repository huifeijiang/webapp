<template>
  <div class="wrap">
    <div class="alert-head">
      <div class="back" @click="backHandle">
        <img src="static/images/ic-return.png" alt="">
      </div>
      <span class="til">设置</span>
      <span class="mu-icon material-icons filter-icon "></span>
    </div>
    <div class="use-set">
      <div class="top-s f_clear">
        <!-- <span class="icon-ic-头像 tou"><span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span><span class="path8"></span><span class="path9"></span><span class="path10"></span><span class="path11"></span><span class="path12"></span><span class="path13"></span><span class="path14"></span><span class="path15"></span><span class="path16"></span><span class="path17"></span></span> -->
        <img id="img" :src="getHead" class="user-img">
        <input id="imgSrc" type="file" multiple accept="image/*" @change="imagePreview(this)">
        <div class="f_le rid">
          <div class="name-d">{{getUserName}}</div>
          <div class="rolename">{{getJueSe}}</div>
        </div>
      </div>

      <div class="mart20">
        <div class="in-item  my-item f_clear">
          <div class="in-item-info border-1px">
            <span class="icon-ic-河流 width24"><span class="path1"></span><span class="path2"></span></span>
            <div class="flow-1">

              <span class="profile-Order">管辖流域</span></div>
            <div class="">
              <span class="profile-AllOrder" style="margin-right:20px">{{getStreet}}</span>
              <span class="profile-arrow">
                                </span>
            </div>
          </div>
        </div>
        <div class="in-item  my-item f_clear">
          <div class="in-item-info border-1px">
            <span class="icon-ic-电话 width24"><span class="path1"></span><span class="path2"></span></span>
            <div class="flow-1">

              <span class="profile-Order">联系电话</span></div>
            <div class="">
              <span class="profile-AllOrder">{{getTel}}</span>
              <span class="profile-arrow">
                  <!-- <img src="static/v2images/rito.png"/> -->
              </span>
            </div>
          </div>
        </div>
        <div class="in-item  my-item f_clear" @click="ModifyPassword">
          <div class="in-item-info border-1px">
            <span class="icon-密码 width24"><span class="path1"></span><span class="path2"></span></span>
            <div class="flow-1">
              <span class="profile-Order">修改密码</span></div>
            <div class="">
              <span class="profile-AllOrder"></span>
              <span class="profile-arrow">
                  <img src="static/v2images/rito.png"/>
             </span>
            </div>
          </div>
        </div>
      </div>
      <div class="laypout" @click="LoginOut">退出</div>
      <div class="lo">
        <img src="static/v2images/aaa.png"/>
        <p class="baneb">版本号{{version}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex';
  import {roleClass} from '../roleClass/roleClass.js';
  import {eventBus} from '../eventBus/eventBus';
  export default {
    data() {
      return {
        imgSrc: '',
        activeTab: 'tab1',
        tableData: [],
        stepType: '',
        version: APP_VERSION
      }
    },
    computed: {
      ...mapGetters({
        getUserName: 'getUserName',
        getRole: 'getRole',
        getUserId: 'getUserId',
        getTel: 'getTel',
        getNormalStatus: 'getNormalStatus',
        getCode: 'getCode',
        getJueSe: 'getJueSe',
        getStreet: 'getStreet',
        getHead: 'getHead'
      })
    },
    methods: {
      ...mapActions({
        setNormalStatus: 'setNormalStatus',
        setToken: 'setToken',
        setMapShow: 'setMapShow',
        setHead: 'setHead'
      }),
      backHandle() {
       if(this.getCode.indexOf('HEZHANG') != -1){
         this.setMapShow(false);
         this.$router.push('/home/user');
       }else{
         this.setMapShow(true);
         this.$router.push('/home');
       }
      },
      imagePreview(input){
        var that = this;
        var files = document.getElementById("imgSrc").files;
        // 假设 "preview" 是将要展示图片的 div
        for (var i = 0; i < files.length; i++) {//预览新添加的图片
          var file = files[i];
          var imageType = /^image\//;
          if (!imageType.test(file.type)) {
            alert("请选择图片类型上传");
            continue;
          }
          var img = document.getElementById("img");
          img.classList.add("obj");
          img.file = file;
          var reader = new FileReader();
          reader.onload = (function (aImg) {
            return function (e) {
              var arr = [];

              arr.push(e.target.result)
              that.$http.post(POST_PEOPLE_TOU, {images: arr}).then(res => {
                if(res.body.code == "200"
              )
              {
                //aImg.src = e.target.result;
                var img = res.body.data[0];

                console.log(img, 3333333333)
                that.$http.patch(PATCH_MODIFY_TX + that.getUserId, {picImg: img}, {emulateJSON: true}).then(res => {
                  if(res.body.code == "200"
              )
                {
                  //aImg.src = e.target.result;
                  that.setHead(img)
                }
              }).
                catch((err) => {
                  console.log(err)
              })
                ;
              }
            }).
              catch((err) => {
                console.log(err)
            })
              ;
            };
          })(img);

          reader.readAsDataURL(file);
          console.log(document.getElementById("img").src)
        }

      },
      //退出登录
      LoginOut(){
        this.$router.push('/');
        //将Token设置为null
        this.setToken(null);

      },
      //修改密码
      ModifyPassword(){
        this.$router.push('/home/ModifyPassword');
      },
      getRoleName1() {
        let getCode = this.getCode;
        if (getCode.indexOf('HEZHANG') > -1) {
          this.roleName = '河长';
        } else if (getCode.indexOf('HC_ZHIFA') > -1) {
          this.roleName = '黑臭水体执法员';
        } else if (getCode.indexOf('YY_EVENTLIST') > -1) {
          this.roleName = '油烟巡查员';
        }
        else if (getCode.indexOf('CAT_REPORT') > -1) {
          this.roleName = '环水巡查网格员';
        }
        else if (getCode.indexOf('HC_ZHIFA') > -1) {
          this.roleName = '环水执法网格员';
        }
        else {
          this.roleName = '整治员';
        }
      },
      nativeBack(){
        e.preventDefault();
        //显示底部nav
        this.setMapShow(true);
        this.$router.push('/home');
      }
    },
    mounted(){
      document.addEventListener(eventBus.BACK_BUTTON, this.nativeBack, false);
    },
    destroyed(){
      document.removeEventListener(eventBus.BACK_BUTTON, this.nativeBack, false);
    }
  }
</script>

<style lang="less" scoped>
  .alert-head img {
    width: 10px;
    vertical-align: middle
  }

  .width24 {
    font-size: 26px;
  }

  .tou {
    float: left;
    font-size: 60px;
  }

  .mart20 {
    margin-top: 20px;
    background: #fff;
    border-top: 1px solid #eceff9;
  }

  .flow-1 {
    flex-grow: 1;
  }

  #imgSrc {
    position: absolute;
    width: 107px;
    height: 107px;
    border: none;
    opacity: 0;
  }

  .top-s {
    position: relative;
    display: flex;
    align-items: center;

    background: #fff;
    border-bottom: 1px solid #eceff9;
    padding: 10px 15px;

  .im {
    width: 73px;
    height: 73px;
  }

  .rid {
    margin-left: 10px;
    margin-top: 9px;
  }

  .name-d {
    font-size: 20px;
  }

  .rolename {
    font-size: 14px;
    color: #acb0bf;
  }

  }

  .lo {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
    text-align: center;

  img {
    width: 45px
  }

  }

  .baneb {
    color: #ACB0BF;
    font-size: 12px
  }

  .laypout {
    width: 218px;
    height: 42px;
    background: rgba(75, 170, 244, 1);
    line-height: 42px;
    text-align: center;
    margin: 0 auto;
    margin-top: 57px;
    color: #fff;
    font-size: 16px;
    border-radius: 50px;
    box-shadow: 0 8px 14px 0 #c9e1f3;
  }

  .til {
    font-size: 20px;
    margin-left: -20px
  }

  .alert-head .back {
    width: 30px;
    height: 56px;
    text-align: right;
    line-height: 56px;
  }

  .use-set {
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f9fcff;
    overflow: auto;
    z-index: 80
  }

  .my-item {
    height: 50px;
    line-height: 50px;
    position: relative;
    padding: 0 20px;

  .in-item-info {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
  }

  img {
    vertical-align: middle;
  }

  .profile-Order {
    margin: 0 5px;
    font-size: 14px;
    color: #626676;
  }

  .profile-AllOrder {
    color: #acb0bf
  }

  }
  .user-img {
    width: 107px;
    height: 107px;
    border-radius: 100px
  }
</style>
