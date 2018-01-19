export const eventEmitter = {
	eventList:{},
	on:function(eventName, callback){
		this.eventList[eventName] = callback;
	},
	emit:function(eventName){
		if(arguments.length<=1){
			if(this.eventList[eventName]) this.eventList[eventName]();
		}else{
			let params = Array.prototype.slice.call(arguments, 1);
			if(this.eventList[eventName]) this.eventList[eventName].apply(this, params);
		}
	}
};