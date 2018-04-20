const app = getApp()

Component({

    behaviors: [],

    properties: {
        value: Object
    },
    data: {
        opacity: 0
    },

    attached: function(){},
    ready: function(){
        let jwtToken = app.services.cacheService.getStorage(null, 'JWT_TOKEN')

        if(jwtToken==null) {
            app.services.utilService.toHomePage()
            return
        }

        jwtToken = jwtToken.substr(4, jwtToken.length - 4)
        let url = app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'userWebservice/getQr?authorization=' + encodeURI(jwtToken) + '&type='+ this.data.value.type + '&uid=' + this.data.value.uid
        this.setData({url: url})

        setTimeout(()=>{
            this.setData({'opacity': 0.5})
        },500)
    },
    moved: function(){},
    detached: function(){},

    methods: {
        onClose: function(e) {
            this.setData({'opacity': 0})
            setTimeout(()=>{
                this.triggerEvent('componentevent', {key: 'show' ,value: false })
            },500)
        },
        onCatchTap: function(e) {

        }
    }

})