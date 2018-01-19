<template>
  <div>
    <transition name="fade">
      <div v-show="model.show" class="bottom-sheet">
        <div class="bottom-wrap">
          <div class="bottom-title">
            <span>{{model.label}}</span>
          </div>
          <img src="static/v2images/ic-close-x.png" class="bottom-close" @click="hide();changeItem(model)">
          <div class="options-wrap">
            <div v-for="item in model.dictionary">
              <div
                class="options"
                @click="select(item)"
                :class="{active:item.isActive}">
                <!--:class="item.isActive == true ? 'active':''">-->
                {{item.label}}
              </div>
              <mu-text-field
                class="qita"
                v-show='item.isText && item.isActive'
                v-model="item.text"
                hintText="请输入"/>
            </div>

          </div>
        </div>
      </div>
    </transition>
    <mu-dialog :open="selectAlert" title="提示">
      请填写{{alertContent}}
    </mu-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: function () {
          return {}
        }
      },
      changeItem: {
        type: Function
      },

    },
    data(){
      return {
        model: this.value,
        selectAlert: false,
        alertContent: ''
      }
    },
    watch: {
      value: {
        handler: function (val) {
          for (let item1 of val.dictionary) {
            if (item1.isActive == undefined || item1.isActive == false) {
              this.$set(item1, "isActive", false)
            }
            if (!val.selfDefine.selectMore) {
              if (String(val.modalValue) === String(item1.value)) {
                item1.isActive = true;
              }
            } else {
              let arr = val.modalValue.split(',');
              if (arr.includes(item1.value)) {
                item1.isActive = true;
              }
            }
          }
          this.model = val;
        },
//        deep: true
      }
    },
    methods: {
      hide(){
        for (let item of this.model.dictionary) {
            if(item.isActive&&item.isText){
              if (item.text == undefined||item.text == '') {
                this.selectAlert = true;
                this.model.show = true;
                this.alertContent = item.label;
                let that = this;
                setTimeout(function () {
                  that.selectAlert = false;
                }, 2000)
                return;
              } else {
                this.model.show = false;
              }
            }else{
              this.model.show = false;
            }
        }
      },
      select(item){
        if (!this.model.selfDefine.selectMore) {
          for (let item of this.model.dictionary) {
            item.isActive = false;
          }
        }
        item.isActive = !item.isActive;
        if (!this.model.selfDefine.selectMore) {
          let flag = true;
          for (let item of this.model.dictionary) {
            if (item.isText) {
              flag = false;
            }
          }
          if (flag == true) {
            this.changeItem(this.model);
            this.model.show = false;
          }
        }
      }
    },
    mounted(){


    }
  }
</script>

<style scoped>
  .qita {
    width: 100%;
    padding: 0 10px;
    overflow: hidden;
    margin: 0;

  }

  .bottom-sheet {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 100;
    overflow: hidden;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
  }

  .bottom-wrap {
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 96%;
    margin-left: -48%;
    background-color: #fff;
    border-radius: 12px 12px 0px 0px;
    -webkit-transition: all .3s ease;
    transition: all .3s ease;
  }

  .options-wrap {
    width: 100%;
    max-height: 246px;
    overflow-y: auto;
  }

  .bottom-title {
    display: flex;
    justify-content: center;
    padding: 16px 0;
    border-bottom: 1px solid #ECEFF9;
  }

  .bottom-title span {
    font-size: 20px;
    color: #626676;
  }

  .bottom-close {
    position: absolute;
    right: 12px;
    top: 12px;
    padding: 8px;
  }

  .options {
    width: 94%;
    padding: 15px 0;
    margin: 0 auto;
    font-size: 16px;
    color: #5A5E6f;
    text-indent: 20px;
    border-bottom: 1px solid #ECEFF9;
  }

  .active {
    color: #4BAAF4;
  }

  .fade-enter, .fade-leave-active {
    background: rgba(0, 0, 0, 0);
  }

  .fade-enter .bottom-wrap, .fade-leave-active .bottom-wrap {
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }
</style>
