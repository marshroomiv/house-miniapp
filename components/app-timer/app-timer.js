const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
    },

    attached: function(){},
    ready: function(){
      if(this.data.value.expiryTimestamp!=null){
          let time = (new Date(this.data.value.expiryTimestamp)).getTime() + 86400000

          if( time > (new Date()).getTime()){
              this.process(time);
              this.data.interval = setInterval(()=>{
                  this.process(time);
              }, 1000);
          }else{
              this.setData({days:"0", hours:"00", minutes:"00", seconds:"00"})
          }
      }
    },
    moved: function(){},
    detached: function(){
        if(this.data.interval!=null){
            clearInterval(this.data.interval);
        }
    },

    methods: {
        process: function(time){
            let now = (new Date()).getTime();
            if(time > now){
                let daysTemp = Math.floor((time - now) / 86400000)
                let hoursTemp= Math.floor((time - now) % 86400000 / 3600000)
                let minutesTemp= Math.floor((time - now) % 3600000 / 60000)
                let secondsTemp= Math.floor((time - now) % 60000 / 1000)

                let days = String(daysTemp)
                let hours = (hoursTemp>=10)?String(hoursTemp):'0'+String(hoursTemp)
                let minutes = (minutesTemp>=10)?String(minutesTemp):'0'+String(minutesTemp)
                let seconds = (secondsTemp>=10)?String(secondsTemp):'0'+String(secondsTemp)

                this.setData({days:days, hours:hours, minutes:minutes, seconds:seconds})
            }else{
                this.setData({days:"0", hours:"00", minutes:"00", seconds:"00"})
            }
        }
    }

})