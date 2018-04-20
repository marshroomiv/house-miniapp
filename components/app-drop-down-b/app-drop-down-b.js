const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        inputFrom: null,
        inputTo: null
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
                this.setData({'value.from': null, 'value.to': null, inputFrom:null, inputTo:null})
                this.triggerEvent('componentevent', {from: null, to: null})
            }else{
                let item = this.data.value.list[index]
                this.setData({'value.from': item[0], 'value.to': item[1], inputFrom:null, inputTo:null})
                this.triggerEvent('componentevent', {from: item[0], to: item[1]})
            }
        },
        onFromInput: function (e) {
            let from = parseInt(e.detail.value)
            if(isNaN(from) || from<=0){
                app.services.utilService.showModal('最低值必须大于0')
                this.setData({
                    inputFrom: null
                });
                return
            }

            this.setData({
                from: from
            });
        },
        onToInput: function (e) {
            let to = parseInt(e.detail.value)
            if(isNaN(to) || to<=0){
                app.services.utilService.showModal('最高值必须大于0')
                this.setData({
                    inputTo: null
                });
                return
            }

            this.setData({
                to: to
            });
        },
        onFilter: function (e) {
            if(this.data.from == null){
                app.services.utilService.showModal('最低值不能为空')
                return
            }
            if(this.data.to==null){
                app.services.utilService.showModal('最高值不能为空')
                return
            }
            if(parseInt(this.data.to) < parseInt(this.data.from) ){
                app.services.utilService.showModal('最低值不能小于最高值')
                return
            }

            this.triggerEvent('componentevent', {from: this.data.from, to:this.data.to})
        }
    }

})