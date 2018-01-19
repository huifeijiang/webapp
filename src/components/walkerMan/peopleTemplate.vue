<template>
	<div class="people-template">
		<slot v-for="(item, index) in list">
            <div class="watch-list" @click="toggle(item, index)">
                <img class="icon-jian ww" src="../../../static/v2images/online.png" />
                <span class="flex-grow table-title">{{item.name + '(' + item.count + ')'}}</span>
                <img :class="item.show?'tran90 rig':'rig'" src="static/images/ic-go.png" alt="">
            </div>
            <div class="table-list-wrap-q" ref="listWrap">
                <div v-if="item.show" class="table-list f_clear border-1px weiyi people-tem-w" v-for="it in item.list">
                    <a :href="'tel:'+it.tel">
                    <span class="biao-left">
                        <img src="static/v2images/touxiang.png" width="40"/>
                    </span>
                    <div class="biao-right">
                        <div class="nameaa">{{it.name}}</div>
                        <div class="rolenameaa">{{it.roleName}}</div>
                    </div>
                    <div class="f_ri riggg">
                        <span class="gridname">{{it.gridName}}</span>
                    </div>
                    </a>
                </div>
            </div>
        </slot>
	</div>
</template>

<script>
	export default {
		props: ['list'],
		methods: {
			toggle(item, index) {
                item.show = !item.show;
            },
		}
	}
</script>


<style lang="less">
	.people-template {
		width: 100%;
	}
	.street-template {
		width: 100%;
	}
    .people-tem-w a {
        display: block;
        &:after {
            content: '';
            display: block;
            clear: both;      
        }
    }
    .tran90{
    	transform: rotate(90deg);
    	fill: #3190e8;
    }
	.watch-list .no-flex-grow {
        flex-grow: 0;
        margin-right: 10px;
	}
	.watch-list .rig {
        width: 9px;
        margin-right: 10px;
    }
	.watch-list {
        background: #fff;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        padding: 14px 0;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        border-bottom: 1px solid #efefef;
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        justify-content: space-between;
    }
    .watch-list img{
        margin-left:3%
    }
    .watch-list span {
        font-size: 16px;
        color: #6a6e7b;
        margin-left: 5px;
        flex-grow: 1;
    }
    .mu-td a {
        color: rgba(0, 0, 0, .87);
    }
    
    th.mu-th,
    td.mu-td {
        text-align: center;
        padding-left: 10px;
        padding-right: 10px;
        /*overflow: hidden;*/
    }
    .weiyi .biao-left{
        float:left;
        width:40px;
        height:40px;
        border-radius:50%;
        display:inline-block;
        overflow: hidden;
        img{
            width:40px;
            height:40px;
        }
    }
    .ww{
        width:22px
    }
    .biao-right{
        float:left;
        margin-left:10px;
        .nameaa{
            font-size:16px;
            color:#626676
        }
        .rolenameaa{
            font-size:14px;
            color:#a8acbc
        }
    }
    .table-list-wrap-q {
        width: 100%;
        max-height: 325px;
        overflow-y: auto;
    }
    .table-list{
        position:relative;
        padding: 10px 0;
        margin: 0 10px;
    }
    .xuncharen{
        position: absolute;
        top:103px;
        left:0;
        right:0;
        bottom:0;
        overflow:auto;
        background:#fff;
        z-index:90
    }
    .quyu{
        border: 1px solid #a8acbc;
        padding: 2px 3px;
        border-radius: 2px;
        color: #a8acbc;
        font-size:12px;
        
    }
    .gridname{
        font-size:14px;
        color:#626676;
        margin-left:4px
    }
    .riggg{
        margin-top:10px
    }
</style>
