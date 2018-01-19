<template>
  <div>
      <button @click="getPosition"></button>
  </div>
</template>

<script>
import { cwPositon} from './corSys/position';
import { eventBus } from './eventBus/eventBus';
export default {
  components: {
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
    methods:{
        getPosition(){
            console.log(123);
            cwPositon.run();
            eventBus.bus.addListener(eventBus.WATCH_POSITION,function (event) {
                console.log(event);
            })
        }
    }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
