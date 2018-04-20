
const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        opacity: 0
    },

    ready: function(){
        setTimeout(()=>{
            this.setData({'opacity': 0.5})
        },500)
    },
    moved: function(){},
    detached: function(){},

    methods: {
        onCancel: function(e){
            this.triggerEvent('componentevent', {action: 'CANCEL'})
        },
        onOk: function(e){
            if(this.data.value.userObject.nickName==null || this.data.value.userObject.nickName.length==0){
                app.services.utilService.showModal('请输入姓名')
                return
            }
            if(this.data.value.userObject.phone==null || this.data.value.userObject.phone.length==0){
                app.services.utilService.showModal('请输入经纪手机')
                return
            }
            this.triggerEvent('componentevent', {action: 'OK', value: this.data.value.userObject})
        },
        onNameInput: function(e){
            let value = e.detail.value
            this.setData({'value.userObject.nickName': value})
        },
        onPhoneInput: function(e){
            let value = e.detail.value
            this.setData({'value.userObject.phone': value})
        }
    }

})