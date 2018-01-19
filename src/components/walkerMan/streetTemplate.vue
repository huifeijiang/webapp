<template>
	<div class="street-template">
		<slot v-for="(item, index) in list">
			<!--人数-->
            <div class="watch-list" @click="peopleClick(item)">
                <img class="icon-jian ww" src="../../../static/v2images/online.png" />
                <span class="flex-grow table-title">{{item.name + '(' + item.count + ')'}}</span>
                <img :class="item.show?'tran90 rig':'rig'" src="static/images/ic-go.png" alt="">
            </div>

            <!--街道-->
            <div class="table-list-wrap" ref="listWrap" v-show="item.show">
				<slot v-for="it in item.list">
					<div class="watch-list" @click="streetClick(it)">
		                <img class="icon-jian ww" src="../../../static/v2images/dingweiq.png" />
		                <span class="flex-grow table-title">{{it.name + '(' + it.count + ')'}}</span>
		                <img :class="it.show?'tran90 rig':'rig'" src="static/images/ic-go.png" alt="">
		            </div>
					<!--人数-->
		            <div class="table-list-wrap" ref="listWrap" v-show="it.show" v-for="i in it.list">
		                <div class="table-list f_clear border-1px weiyi people-tem-w" >
		                    <a :href="'tel:'+i.tel">
		                    <span class="biao-left">
		                        <img src="static/v2images/touxiang.png" width="40"/>
		                    </span>
		                    <div class="biao-right">
		                        <div class="nameaa">{{i.status ? (i.name+'('+i.status+')') : i.name}}</div>
		                        <div class="rolenameaa">{{i.roleName}}</div>
		                    </div>
		                    <div class="f_ri riggg">
		                        <span class="gridname">{{i.dateTime?formatTime(i.dateTime):''}}</span>
		                    </div>
		                    </a>
		                </div>
		            </div>
				</slot>	
            </div>

            
        </slot>		
	</div>
</template>

<script>
	export default {
		props: ['list', 'type'],
		data() {
			return {
				temp: [{
					name: 'A',
					count: 1,
					show: false,
					list: [{
						name: 'a街',
						count: 1,
						show: false,
						list: [{
							name: 'a人',
							roleName: '11',
							gridName: '22',
							tel: '123'
						}]
					}]
				}]
			}
		},
		methods: {
			peopleClick(item) {
                item.show = !item.show;
                //获取type 8为环管员 9为执法员 0为河长
                let type = this.$props.type;
                if(type == 0) {
                    this.$emit('getRange', item);
                    return;
                }
                //加载街道
                if(item.show) {
                	if(item.list.length == 0) {
                		this.$http.get(GET_PEOPLE_STREET + '?role=' + type).then( res => {
                			let data = res.body.data.data;
                			let arr = []; 
                			for(let i=0; i<data.length; i++) {
                				arr.push({
                					name: data[i].streetName,
                					id:   data[i].id,
                					count:'今日上线:'+data[i].online,
                					show: false,
                					list: []
                				})
                			}
                			this.$set(item, 'list', arr);
                		}).catch( err => {})
                	}
                }
            },
            streetClick(item) {
            	item.show = !item.show;
            	let type  = this.$props.type;
                if(type == 0) {
                    this.$emit('getPeople', item);
                    return;
                }
				let id = item.id;

            	if(item.show) {
					let dailyStartTimeStamp = new Date(new Date().setHours(0,0,0,0)).getTime();

            		if(item.list.length == 0) {
            			this.$http.get(GET_PEOPLE_ZHENSHI + '?role=' + type + '&streetId=' + id).then( res => {
            				let data = res.body.data.content;
            				let arr = [];
            				for(let i=0; i<data.length; i++) {
								if(data[i].datetime > dailyStartTimeStamp){
									arr.push({
										name: data[i].name,
										tel:  data[i].tel,
										status: data[i].onlineStatus,
										dateTime:data[i].datetime,
										roleName: data[i].roleName,
										gridName: data[i].gridName,
										role: data[i].role
									})
								}
                			}
                			this.$set(item, 'list', arr);
            			}).catch( err => {})
            		}
				}
				
            },
            formatTime(time) {
            	let date = new Date(time);
            	return (date.getMonth()+1) + 
            					'-' + date.getDate() + 
            					' ' + (date.getHours()<10?'0'+date.getHours():date.getHours()) + 
            					':' + (date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes());
            }
		}	
	}
</script>

<style>
	.watch-list .tem-street {
		margin-left: 37px;
	}
</style>