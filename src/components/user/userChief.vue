<template>
  <div>


  </div>
</template>

<script>
	export default {
		components: {



    },
		data(){
			return {

				 lists:[{name:"1111",status:"督办"},
           {name:"1111",status:"完成"},
           {name:"1111",status:"待办"},
           {name:"1111",status:"完成"},
           {name:"1111",status:"完成"},
         ],
        open: false

      }
		},
		props: {},
		methods: {




    },
		computed: {


    },
		mounted(){
    },
		destroyed(){

		}
	}
</script>

<style lang="less" scoped>
  .drawer{
    width: 100%;
    z-index: 70;
  }
  .alert-head{
    position: fixed;
    left: 0;
    top:0;
    width: 100%;
    height: 56px;
    display: flex;
    display: -webkit-flex;
    align-items:center;
    background-color: #2196f3;
  }
  .alert-back{
    padding: 15px 5px;
    margin-left: 20px;
    color: #fff;
    font-size: 14px;
  }

</style>
