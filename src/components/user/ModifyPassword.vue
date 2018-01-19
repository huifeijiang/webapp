<template>
  <div>
    <div class="alert-head">
      <mu-icon class="alert-left" @click="backHandletwo" value="keyboard_arrow_left" />
      <span class="alert-title">修改密码</span>
      <span class="alert-right"></span>
    </div>
    <div class="passcont">
      <div class="tipss" v-show="errshow">
        <img src="static/v2images/jinggao.png"/>
        <span class="tipcon">{{msg}}</span>
      </div>
      <div class="iptcon">
        <!--<mu-text-field label="旧密码" v-model="oldpass" type="password" labelFloat fullWidth />
        <mu-text-field label="新密码" v-model="newpass" hintText="请输入密码" type="password" labelFloat fullWidth />
        <mu-text-field label="确定新密码" v-model="compass" type="password" labelFloat fullWidth />
        -->

        <div><input placeholder="旧密码" v-model="oldpass" type="password" style="border-bottom:1px solid #eceff9"
                    @focus="closes"/></div>
        <div><input placeholder="新密码" v-model="newpass" type="password" style="border-bottom:1px solid #eceff9"
                    @focus="closes"/></div>
        <div><input placeholder="确定新密码" v-model="compass" type="password" @focus="closes"/></div>
      </div>
      <div class="laypout" @click="updatePass">确定</div>
    </div>
    <mu-dialog :open="textValueNull" title="提示">
      {{tip}}
      <mu-flat-button slot="actions" @click="close" primary label="取消"/>
      <mu-flat-button slot="actions" primary @click="close" label="确定"/>
    </mu-dialog>
  </div>
</template>

<script>

  import {mapActions, mapGetters} from 'vuex';
  import {eventBus} from '../../components/eventBus/eventBus';
  export default {
    components: {},
    data() {
      return {
        textValueNull: false,
        tip: "dsds",
        oldpass: '',
        newpass: '',
        compass: '',
        msg: '',
        errshow: false
      }
    },
    methods: {
      ...mapActions({
        setMapShow: 'setMapShow'
      }),
      backHandletwo() {
        this.$router.go(-1);
      },
      closes(){
        this.errshow = false
      },
      updatePass() {
        let yespass = this.getloginpassword.trim();
        let old = this.oldpass.trim();
        let newpass = this.newpass.trim();
        let compass = this.compass.trim();

        console.log(yespass, old, 5555)
        if (yespass == old) {
          if (newpass == compass) {
            this.$http.patch(POST_UPDATEPASS, {
              oldPassword: old,
              newPassword: newpass,
              confirmPassword: compass
            }, {emulateJSON: true}).then(res => {
              let code = res.body.code;
              let msg = res.body.msg;
              if (code == "200") {
                this.textValueNull = true;
                this.tip = "修改成功";
                setTimeout(() => {
                    this.textValueNull = false;
                    this.$router.push("/");
                  },
                  2000
                )
                eventBus.bus.emit(eventBus.CLEARPASS);
              }
              if (code == "403") {
                this.textValueNull = true;

                let msg = res.body.msg;
                this.tip = msg;
              }
            }).
            catch((err) => {
              console.log(err)
            })
            ;

          } else {
            this.errshow = true;
            this.msg = '新密码与确定密码不同！'
          }
        } else {
          this.errshow = true;
          this.msg = '旧密码与原密码不同！'
        }
      },
      close(e){
        e.preventDefault();
        this.textValueNull = false;
      },

    },
    computed: {
      ...mapGetters({
        getloginpassword: 'getloginpassword'
      })
    },
    mounted() {

      console.log("setloginpassword-----" + this.getloginpassword)

    },
    destroyed() {

    }
  }
</script>

<style scoped lang="less">
  .alert-head {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 56px;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    background-color: #2196f3;
    z-index: 76;
  }

  .alert-left {
    position: absolute;
    left: 15px;
  }

  .alert-right {
    position: absolute;
    right: 15px;
  }

  .passcont {
    position: absolute;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #f9fcff;
    overflow: auto;
    z-index: 80;

  }

  .iptcon {
    padding: 0 20px;
    background: #fff;
    border-bottom: 1px solid #eceff9;

  div {
    width: 100%;
    height: 50px;
  }

  input {
    display: inline-block;
    border-bottom: 1px solid rgb(236, 239, 249);
    width: 100%;
    outline: none;
    height: 50px;
    border: none;

  }

  input::placeholder {
    color: #b0b4c3
  }

  }
  .laypout {
    width: 218px;
    height: 42px;
    background: rgba(75, 170, 244, 1);
    line-height: 42px;
    text-align: center;
    margin: 57px auto;
    color: #fff;
    font-size: 16px;
    border-radius: 50px;
    box-shadow: 0 8px 14px 0 #c9e1f3;
  }

  .tipss {
    display: flex;
    align-items: center;
    height: 35px;
    line-height: 35px;
    background: rgba(255, 180, 0, 0.14)
  }

  .tipss img {
    width: 26px;
    vertical-align: middle;
    margin-left: 20px;
  }

  .tipcon {
    font-size: 16px;
    color: #ffb400;
    display: inline-block;
    height: 35px;
    line-height: 40px;
    margin-left: 8px
  }
</style>
