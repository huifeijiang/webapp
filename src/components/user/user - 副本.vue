<template>
    <div>
        <head-dom>个人中心</head-dom>
        <div class="nothin"></div>

		<div v-show="getRole == 0 || getRole ==1 " class="btns-wrap">
			<div class="news-btns">
				<a href="javascript:;" class="btn-n borright active" @click="handleTabChange('tab1')" ref="tab1">任务督办</a>
				<a href="javascript:;" class="btn-n" @click="handleTabChange('tab2')" ref="tab2">个人中心</a>
			</div>
		</div>

        <div v-if="getRole == 0" class="user-cont" ref="usercont">
			<slot v-if="activeTab=='tab1'">
				<div class="user-list" v-for="(item,index) in userList" @click="showDetail(item,index)">
					<span>{{item.name}}</span>
					<span :class="getClass(item.status)">{{item.status}}</span>
				</div>
			</slot>

			<slot v-else>
				<div class="user-list">
                    <span>名字</span>
                    <span>{{getUserName}}</span>
                </div>
                <div class="user-list">
                    <span>职位</span>
                    <span>{{getRoleName()}}</span>
                </div>
                <div class="user-list">
                    <span>联系方式</span>
                    <span><a class="a-normal" :href="'tel:'+ getTel">{{getTel}}</a></span>
                </div>

                <div class="user-list" v-for="(item,index) in userMessage.charge">
                    <span :class="index == 0 ? '':'hidden'">管辖区域</span>
                    <span>{{item}}</span>
                </div>
                
                <div class="user-list">
                    <span>版本号</span>
                    <span><a class="a-normal">{{version}}</a></span>
                </div>
                
				<div class="seclet-status">
					<mu-select-field v-model="getNormalStatus"  label="巡查状态:" @input="setCheck">
					    <mu-menu-item value="开始办理" title="开始办理"/>
					    <mu-menu-item value="停止办理" title="停止办理"/>
					</mu-select-field>
				</div>
                <div class="user-list bor-tom-none">
                    <mu-raised-button label="修改密码"  @click="ModifyPassword" fullWidth/>
                </div>
                <div class="user-list ">
                    <mu-raised-button label="退出登录"  @click="LoginOut" fullWidth/>
                </div>
			</slot>
        </div>

        <div v-else class="user-cont" :class="getRole==1?'':'margintop'" ref="usercont">
            <slot v-if="activeTab=='tab1' && getRole ==1">
                <div class="user-list" v-for="(item,index) in userList" @click="showDetail(item,index)">
                    <span>{{item.name}}</span>
                    <span :class="getClass(item.status)">{{item.status}}</span>
                </div>
            </slot>
        	<slot v-else>
                <div class="user-list">
                    <span>名字</span>
                    <span>{{getUserName}}</span>
                </div>
                <div class="user-list">
                    <span>职位</span>
                    <span>{{getRoleName()}}</span>
                </div>
                <div class="user-list">
                    <span>联系方式</span>
                    <span><a class="a-normal" :href="'tel:'+ getTel">{{getTel}}</a></span>
                </div>
                <div class="user-list" v-for="(item,index) in userMessage.charge">
                    <span :class="index == 0 ? '':'hidden'">管辖流域</span>
                    <span>{{item}}</span>
                </div>
                <div class="user-list">
                    <span>版本号</span>
                    <span><a class="a-normal">{{version}}</a></span>
                </div>
                <div class="user-list bor-tom-none">
                    <mu-raised-button label="修改密码"  @click="ModifyPassword" fullWidth/>
                </div>
                <div class="user-list ">
                    <mu-raised-button label="退出登录"  @click="LoginOut" fullWidth/>
                </div>
            </slot>
        </div>
        
         <mu-dialog :open="open">
         	<div class="dialog-title">
         		请选择操作
         	</div>
         	<div class="dialog-btn">
         		<mu-raised-button v-for="(item,index) in ['待办','完成']" :key="index" :label="item" :class="btClass(item)" :primary="btPrimary(item)" @click="setStatus(item)"/>
         	</div>
         </mu-dialog>
    </div>
</template>
<script>
    import headDom from '../../UIcomponents/header/head';
    import {mapGetters,mapActions} from 'vuex';
    import { roleClass } from '../roleClass/roleClass.js';
    import { eventBus } from '../eventBus/eventBus';
    export default {
        components: {
            headDom
        },
        data(){
            return {
                activeTab: 'tab1',
                open: false,
                version:APP_VERSION,
                userList: [
                    {name: '堤防--墙基', status: '待办'},
                    {name: '堤防--砌石墙体', status: '待办'},
                    {name: '堤防--混凝土墙体', status: '待办'},
                    {name: '堤防--墙体伸缩缝', status: '待办'},
                    {name: '堤防--泄水孔', status: '待办'},
                    {name: '堤防--排水管道', status: '待办'},
                    {name: '堤防--导渗设施', status: '待办'},
                    {name: '堤防--周边环境', status: '待办'},
                    {name: '土质边坡--坡顶', status: '待办'},
                    {name: '土质边坡--坡身', status: '待办'},
                    {name: '土质边坡--坡脚', status: '待办'},
                    {name: '土质边坡--周边环境', status: '待办'},
                    {name: '河床', status: '待办'},
                    {name: '绿化景观', status: '待办'},
                    {name: '附属设施', status: '待办'},
                    {name: '四害消杀及白蚁防治', status: '待办'}

                ],
                tableItems: ['姓名', '性别', '角色', '负责流域'],
                userMessage: {
                    name: '张明星',
                    sex: '男',
                    role: '河管员',
                    charge: []
                },
                nowItem: {
                    name: ''
                },
                nowItemIndex: 0
            }
        },
        computed: {
            ...mapGetters({
                getUserName: 'getUserName',
                getRole: 'getRole',
                getTel: 'getTel',
                getNormalStatus:'getNormalStatus',

            })
        },
        methods: {
        	...mapActions({
        		setNormalStatus:'setNormalStatus',
                setToken:'setToken'
        	}),
            handleTabChange (val) {
                if (val != this.activeTab) {
                    if (this.activeTab != 'tab1') this.$refs[this.activeTab].className = 'btn-n';
                    else this.$refs[this.activeTab].className = 'btn-n borright';
                    this.$refs[val].className = 'btn-n active';
                    this.activeTab = val;
                }
            },
            getClass(str){
                if (str == '完成') {
                    return 'status-bt done';
                } else if (str == '督办中') {
                    return 'status-bt doing';
                } else {
                    return 'status-bt wating';
                }
            },
            showDetail(item, index){
            	this.open  = true;
                this.nowItem = item;
                this.nowItemIndex = index;
            },
            btClass(str){
                if (str == this.nowItem.status) {
                    if (str == '完成') {
                        return 'demo-bt done';
                    } else if (str == '督办中') {
                        return 'demo-bt doing';
                    } else {
                        return 'demo-bt wating';
                    }
                } else {
                    return 'demo-bt';
                }
            },
            btPrimary(str){
                if (str == this.nowItem.status) {
                    return true;
                } else {
                    return false;
                }
            },
            setStatus(str){
                this.open = false;
                this.userList[this.nowItemIndex].status = str;
            },
            setCheck(val){
            	this.setNormalStatus(val)
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
            getRoleName(){
                let role = this.getRole;
                if(role == roleClass.xuncha){
                    return '巡查员';
                }else if(role == roleClass.master){
                    return '河长';
                }else if(role == roleClass.xiaosan){
                    return '小散乱污巡查员';
                }else if(role == roleClass.Lampblackreport){
                    return '油烟巡查员';
                }
                else if(role == roleClass.SinoProbe){
                    return '黑臭水体巡查员';
                }
                else if(role == roleClass.SinoProbezhifa){
                    return '黑臭水体执法员';
                }
                else {
                    return '整治员';
                }
            },
            backToMap() {
                this.$router.push("/home/user");
            },
        },
        mounted(){
             document.addEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
            let that = this;
            let height = window.innerHeight;

            if(this.getRole==0 || this.getRole==1) {
            	this.$refs.usercont.style.height = height - 170 + 'px'; 
            }else{
            	this.$refs.usercont.style.height = height - 120 + 'px';
            }

            if(this.getRole==1){
                this.userList = [
                    {name: '建立部门协作联动机制', status: '待办'},
                    {name: '建立河长工作会议制度', status: '待办'},
                    {name: '建立河长定期巡查制度', status: '待办'},
                    {name: '建立流域统筹协调机制', status: '待办'},
                    {name: '建立日常督查督办机制', status: '待办'},
                    {name: '建立信息共享互动机制', status: '待办'}
                ];
            }

            function getUserInfo() {
                let url = GET_USER_INFO + '?accessToken=' + that.$store.state.login.accessToken;
                that.$http.get(url).then(function (response) {
                    let data = response.body.data;
                    if(data.manage[0]){
                        let chargeList = data.manage[0].gridName;
                        that.userMessage.charge.push(chargeList);
                    }
                })
            }
            getUserInfo();

        },
        destroyed() {
            document.removeEventListener(eventBus.BACK_BUTTON, this.backToMap, false);
        }
    }
</script>

<style scoped>
    .nothin {
        height: 1px;
    }
    .a-normal{
        color: #6a6e7b;
    }
    .usermess {
        width: 92%;
        margin: 0 auto;
    }

    .usermess p{
        margin-top: 5px;
        margin-bottom: 5px;
    }

    .btns-wrap {
        margin-top: 65px;
        padding-bottom: 10px;
        border-bottom: 1px solid #efefef;
    }
    .margintop .bor-tom-none{
        border:none;
        margin-top:20px
    }
    .news-btns {
        display: flex;
        width: 94%;
        margin: 0 auto;
        border: 1px solid #54A4D7;
        border-radius: 2px;
    }

    .btn-n {
        width: 50%;
        font-size: 14px;
        text-align: center;
        padding: 5px 0;
        color: #54A4D7;
    }

    .borright {
        border-right: 1px solid #54A4D7;
    }

    .active {
        background-color: #54A4D7;
        color: #fff;
    }

    .user-cont {
        width: 100%;
        overflow-y: auto;
    }
	.margintop{
        margin-top: 56px;
	}
    .mess-detail {
        width: 92%;
        margin: 0 auto;
        margin-top: 55px;
        overflow-y: auto;
    }

    .user-list {
        display: flex;
        width: 94%;
        margin: 0 auto;
        color: #6a6e7b;
        font-size: 14px;
        height: 55px;
        border-bottom: 1px solid #efefef;
        align-items: center;
        justify-content: space-between;
    }
	.seclet-status{
		width: 94%;
        margin: 0 auto;
	}
    .status-bt {
        display: inline-block;
        width: 60px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        border-radius: 3px;
        background-color: #2196f3;
    }

    .done {
        background-color: #5cb85c;
    }

    .doing {
        background-color: #54A4D7;
    }

    .wating {
        background-color: #5bc0de;
    }

    .hidden {
        visibility: hidden;
        margin-right: 15px;
    }

    .demo-bt {
        border: 1px solid #ccc;
    }

    .dialog-title{
    	padding-top: 10px;
    	text-align: center;
    }
    .dialog-btn{
    	display: flex;
    	width: 90%;
    	margin: 0 auto;
    	align-items: center;
    	margin-top: 20px;
    	justify-content: space-between;
    }
</style>
