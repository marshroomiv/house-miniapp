const sliderWidth = 96

Component({

    behaviors: [],

    properties: {
        value: {
            type: Object,
            observer: function(newVal, oldVal){
                if(newVal!=null && newVal.tabs!=null){
                    if(newVal.activeIndex==null || newVal.activeIndex<0 || newVal.activeIndex >= newVal.tabs.length){
                        newVal.activeIndex=0
                    }
                    wx.getSystemInfo({
                        success: (res)=> {
                            let sliderLeft = (res.windowWidth / newVal.tabs.length - sliderWidth) / 2
                            let sliderOffset = res.windowWidth / newVal.tabs.length * newVal.activeIndex
                            this.setData({'value.sliderLeft': sliderLeft, 'value.sliderOffset': sliderOffset})
                        }
                    });
                }
            }
        }
    },
    data: {},

    attached: function(){},
    moved: function(){},
    detached: function(){},

    methods: {
        onItemTap: function(e){
            let activeIndex = e.currentTarget.dataset.index
            if( activeIndex != null){
                this.setData({
                    'value.sliderOffset' : e.currentTarget.offsetLeft,
                    'value.activeIndex' : activeIndex
                })

                this.triggerEvent('componentevent', {key: 'activeIndex' ,value: activeIndex })
            }
        }
    }
})