<template>
    <div  id="page" ref="wrap">
        <div class="noth"></div>
        <img src="static/v2images/ic-logo.png" class="login-logo">
        <p class="login-title">河务通 <span class="test-tip" v-show="isTest">测试版</span></p>
        <mu-dialog :open="dialog" title="提示">
            {{loginField}}
            <mu-flat-button label="确定" slot="actions" primary @click="close"/>
        </mu-dialog>
        <div class="login-mess margintop90">

            <img class="user" src="static/v2images/ic-user.png" alt="">
            <mu-text-field v-model="username" hintText="请输入用户名" @focus="focus" @blur="blur" labelFloat/>
        </div>
        <div class="login-mess no-top">
            <img class="pwd" src="static/v2images/ic-pwd.png" alt="">
            <mu-text-field v-model="password" hintText="请输入密码" type="password" @focus="focus" @blur="blur" labelFloat/>
        </div>
        <a href="javascript:;" class="btn" @click="login">登录</a>
        <div class="wave" ref="wave">
            <svg class="editorial" xmlns="http://www.w3.org/2000/svg" viewBox="0 24 150 28" preserveAspectRatio="none">
                <defs>
                    <path id="gentle-wave" d="m -160,44.4 c 30,0 58,
			        -18 87.7,-18 30.3,0 58.3,
			        18 87.3,18 30,0 58,-18 88,
			        -18 30,0 58,18 88,18 l 0,
			        34.5 -351,0 z"/>
                </defs>
                <g class="parallax">
                    <use xlink:href="#gentle-wave" x="50" y="2" fill="rgba(46,204,252,0.5)"/>
                    <use xlink:href="#gentle-wave" x="60" y="6" fill="rgba(0,204,187,.2)"/>
                    <use xlink:href="#gentle-wave" x="70" y="6" fill="rgba(46,204,252,0.5)"/>
                    <use xlink:href="#gentle-wave" x="60" y="0" fill="rgba(0,204,187,.2)"/>
                    <use xlink:href="#gentle-wave" x="50" y="3" fill="rgba(46,204,252,0.5)"/>
                </g>
            </svg>
        </div>
        <mu-dialog :open="showclose" title="提示">
            手机系统版本低于6.0，请升级系统。
            <mu-flat-button label="确定" slot="actions" primary @click="queding"/>
        </mu-dialog>
    </div>
</template>
<script type='es6'>
    import {mapActions} from 'vuex';
    import {eventBus} from '../components/eventBus/eventBus';
    import {powerCodeData} from '../gisComponets/HomeMap/directive/PowerCodeData'
    export default {
        data(){
            return {
                show: false,
                username: null,
                password: null,
                loginField:'',
                dialog:false,
                isFirst:true,
                isTest:false,
                showclose:false
            }
        },
        methods: {
            ...mapActions({
                setloginpassword :'setloginpassword',
                setToken: 'setToken',
                setRole: 'setRole',
                setUserName: 'setUserName',
                setTel : 'setTel',
                setUserId:'setUserId',
                setCode:'setCode',
                setRolename:'setRolename',
                setStreet: 'setStreet',
                setHead:'setHead'
            }),
            close(){
                this.dialog = false;
            },
            login(){
                let that = this;
                let username = this.username;
                let password = this.password;
                if(this.isFirst){
                    this.isFirst = false;
                }else{
                    return false;
                }
                if (username == '' || username == null || password == '' || password == null) {
                    return false;
                } else {
                    //之前URL:POST_LOGIN ,new:{emulateJSON: true }
                    this.$http.post(POST_NEW_LOGIN, {
                        username: username,
                        password: password
                    },{emulateJSON: true } ).then(function (res) {
                        that.isFirst = true;
                        if (res.body.code == 403) {
                            //用户名或者密码错误
                             that.dialog = true;
                            let msg = res.body.msg;
                            that.loginField = msg;
                        } else if (res.body.code == 200) {
                            that.setloginpassword(password);
                            //登录成功
                            window.removeEventListener("keydown", that.keyDown);
                            that.setToken(res.body.data.accessToken);
                            //请求角色 之前URL ：GET_ROLE
                            that.$http.get(GET_NEW_ROLE + '?accessToken=' + res.body.data.accessToken).then(function (res_re) {
                                // that.setRole(res_re.body.data.role);
//                                console.log(res_re,4444)
                                that.setUserId(res_re.body.data.id);
                                that.setUserName(res_re.body.data.username);
                                that.setTel(res_re.body.data.phone);
                                localStorage.username  = username;
                                localStorage.password = password;
                                that.$http.get(GET_PEO + res_re.body.data.id + '/one').then(function (res) {
                                    if(res.body.data.picImg){
                                        that.setHead(res.body.data.picImg)
                                    }

                                }).catch(function (error) {
//                                    console.log("登录失败",error)
                                });
                            }).catch(function (error) {
//                                console.log("登录失败",error)
                            });
                            //获取角色名
                            that.$http.get(GET_ROLE + '?accessToken=' + res.body.data.accessToken).then(function (er) {
                                // that.setRole(res_re.body.data.role);
                                that.setRolename(er.body.data[0].roleName);
                                that.setStreet(er.body.data[0].gridName);
                            }).catch(function (error) {
//                                console.log("登录失败",error)
                            });



                            //请求权限
                            that.$http.get(GET_NEW_ACCESS + '?accessToken=' + res.body.data.accessToken,{headers:{
                                'access-token':res.body.data.accessToken
                            }}).then( acc =>{
//                                console.log(acc,66666)
                                powerCodeData.code = acc.body.data;
                                that.setCode(acc.body.data);
                                that.$router.push('/home');
                            }).catch(err => {})
                        } else {
                            that.$router.push('/');
                        }

                    }).catch(function (error) {
//                        console.log(error)
                        if (error.body.code == 403) {
                             that.dialog = true;
                            let msg = error.body.msg;
                            that.loginField = msg;
                        }
                        that.isFirst = true;
                    });

                }
            },
            keyDown(e){
                if (e.keyCode == 13) {
                    this.login()
                }
            },
            queding(){
                navigator.app.exitApp();
            },
            focus(){
                this.$refs.wrap.className = 'login-page';
                this.$refs.wave.className = 'disne';
            },
            blur(){
                this.$refs.wrap.className = ' ';
                this.$refs.wave.className = 'block';

            }
        },
        mounted(){
   
            
            let that = this;
            document.addEventListener('deviceready', function () {
                //安卓系统小于6.0，强制退出app
                if(device.version < 6.0){
                    that.showclose = true;
                }
                // console.log('device.version---------',device.version < 6.0);
                window.addEventListener('native.keyboardshow', function (e) {
                    // todo 进行键盘可用时操作
                    //e.keyboardHeight 表示软件盘显示的时候的高度
                    this.$refs.wave.style.display = 'none';
                });
                window.addEventListener('native.keyboardhide', function (e) {
                    // todo 进行键盘不可用时操作
                    this.$refs.wave.style.display = 'block';
                });
            }, false);

            this.username = localStorage.username || '';
            this.password = localStorage.password || '';
            window.addEventListener("keydown", that.keyDown);
            eventBus.bus.on(eventBus.CLEARPASS,()=>{
				localStorage.password = ""
            });

            //判断是否为测试版
            if(baseUrl.indexOf('test') > -1) {
                this.isTest = true;
            }else {
                this.isTest = false;
            }
        }
    }
</script>

<style>
    .login-page {
        transform: translateY(-125px);
        -webkit-transform: translateY(-125px);
        transition:  .3s
    }
    .login-title{
        text-align: center;
        font-size: 20px;
        color: #5A5E6F;
        letter-spacing: 1px;
        margin-top: 10px;
        font-weight: 600;
    }
    .test-tip {
        font-size: 12px;
        color:#ccc;
    }
    .disne{
        display:none;
        transition:  0s
    }
    .disne{
        display:none;
        transition:  0s
    }
    .block{
        display:block;
        transition:  .3s
    }
    .noth {
        height: 1px;
    }

    .login-logo {
        width: 63.2px;
        display: block;
        margin: 0 auto;
        margin-top: 40px;
    }
    .transition{
         transition:  .3s
    }
    .login-mess {
        width: 75%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;

    }

    .margintop90 {
        margin-top: 90px;
    }

    .no-top  {
        margin-top: -6px;
    }

    .login-mess img {
        display: block;
        margin-top: -5px;
        margin-right: -22px;
    }

    .mu-text-field-hint {
        font-size: 12px;
        left: 35px;
    }

    .login-mess .mu-text-field {
        min-height: 30px;
    }

    .login-mess .mu-text-field-content {
        padding-bottom: 0px;
        padding-top: 4px;
        border-top: 1px solid #ECEFF9;
    }
    .no-top .mu-text-field-content{
        border-top:none;
    }
    .login-mess .mu-text-field-line {
        background-color:#ECEFF9;
    }

    .login-mess .mu-text-field-input {
        text-indent: 35px;
    }

    .user {
        width: 21px;
    }

    .pwd {
        width: 18px;
    }

    .btn {
        display: block;
        width: 195px;
        text-align: center;
        height: 42px;
        line-height: 42px;
        margin: 0 auto;
        color: #fff;
        border-radius: 25px;
        font-size: 20px;
        font-size: 20px;
        margin-top: 45px;
        background-color: #4BAAF4;
        box-shadow: 0px 4px 7px 0px #C9E1F3;
    }


    .wave {
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
    }

    .parallax > use {
        animation: move-forever 16s linear infinite;
        transform-origin: 50% 50%;
    }

    .parallax > use:nth-child(1) {
        animation-delay: -2s;
    }

    .parallax > use:nth-child(2) {
        animation-delay: 0s;
        animation-duration: 6s;
    }

    .parallax > use:nth-child(3) {
        animation-delay: -4s;
        animation-duration: 8s;
    }

    .parallax > use:nth-child(4) {
        animation-delay: -6s;
        animation-duration: 12s;
    }

    @keyframes move-forever {
        0% {
            transform: translate(-90px, 0%);
        }
        100% {
            transform: translate(85px, 0%);
        }
    }

    .editorial {
        display: block;
        width: 100%;
        height: 10em;
        margin: 0;
        position: absolute;
        bottom: 0
    }

    .content h1 {
        margin-top: -1.3em;
        font-weight: 100;
        font-size: 5em;
        user-select: none;
        cursor: default;
    }

    @media (max-width: 620px) {
        .content h1 {
            font-size: 12vmax;
        }

        .editorial {
            height: 135px;
        }
    }

    @keyframes fade {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
</style>
