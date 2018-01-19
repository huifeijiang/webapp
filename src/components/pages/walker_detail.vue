<template>
    <div>
        <mu-appbar title="Title">
            <mu-text-field icon="search" class="appbar-search-field"  slot="right" hintText="请输入搜索内容"/>
            <mu-flat-button color="white" label="flat Button" slot="right"/>
        </mu-appbar>
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" title="TAB ONE"/>
            <mu-tab value="tab3" @active="handleActive" title="TAB ACTIVE"/>
        </mu-tabs>
        <div class="router-wrap">
            <router-view>
            </router-view>
        </div>

        <div v-if="activeTab === 'tab1'">
            <h2>Tab One</h2>
            <p>
                这是第一个 tab
            </p>
        </div>
        <div v-if="activeTab === 'tab3'">
            <h2>Tab Three</h2>
            <p>
                这是第三个 tab
            </p>
        </div>
    </div>

</template>
<script>
    import bottomBar from './bottom_bar.vue'
    import {cwLogger} from '@/components/log/log'
    export default{
        data(){
            return {
                activeTab: 'tab1'
            }
        },
        components:{
            bottomBar
        },
        methods: {
            handleTabChange (val) {
                this.activeTab = val
            },
            handleActive () {
//                cwLogger.info('tab active')
            }
        }
    }
</script>
<style lang="less">
    .appbar-search-field{
        color: #FFF;
        margin-bottom: 0;
        &.focus-state {
            color: #FFF;
        }
        .mu-text-field-hint {
            color: fade(#FFF, 54%);
        }
        .mu-text-field-input {
            color: #FFF;
        }
        .mu-text-field-focus-line {
            background-color: #FFF;
        }
    }
</style>