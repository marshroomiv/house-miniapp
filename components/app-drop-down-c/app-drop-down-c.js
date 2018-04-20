const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        selected: null
    },


    ready: function(){
        let sysInfo = wx.getSystemInfoSync()
        this.setData({height: sysInfo.windowHeight - 49})
    },
    moved: function(){},
    detached: function(){},

    methods: {
        onChange: function(e){
            let index = e.currentTarget.dataset.index
            if( index == -1){
                this.setData({'value.selected': null})
                this.triggerEvent('componentevent', {selected: null})
            }else{
                let item = this.data.value.list[index]
                this.setData({'value.selected': item})
                this.triggerEvent('componentevent', {selected: item})
            }
        }
    }

})