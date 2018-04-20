const app = getApp()

Page({
    data: {
        img: [],
        imgUrls: []
    },
    onLoad: function(options) {
        let sysInfo = wx.getSystemInfoSync()
        this.setData({height: sysInfo.windowHeight - 49})

        this.data.userUid = options.userUid

        let userMsg = app.globalData.msgsByUser[this.data.userUid]

        wx.setNavigationBarTitle({
            title: userMsg.nickName!=null?userMsg.nickName: '保密'
        })
    },
    onShow: function() {
        let msgs = app.globalData.msgsByUser[this.data.userUid].msgs
        this.setData({msgs: msgs})
        this.setData({maxId: 'maxId'})
        app.services.socketService.newMsgCallBack = ()=>{
            let msgs1 = app.globalData.msgsByUser[this.data.userUid].msgs
            this.setData({msgs: msgs1})
            this.setData({maxId: 'maxId'})
        }
    },
    onHide: function() {
        app.globalData.msgsByUser[this.data.userUid].newMsgCount = 0
        for(let item of app.globalData.msgsByUserArr){
            if(item.userUid == this.data.userUid){
                item.newMsgCount = 0
                break
            }
        }
        app.services.socketService.newMsgCallBack = null
    },
    onUnload: function() {
        this.onHide()
    },
    onFocus: function(e){
        this.setData({focus: true})
    },
    onInput:function(e){
        this.setData({content: e.detail.value})
    },
    onBlur:function(e){
        this.setData({focus: false})
    },
    onSend: function(e){
        if(this.data.content != null){
            let message = {toUserUid: this.data.userUid, msgType: 'text', content: this.data.content}

            let obj = {key: 'sendKefuMsg', service:'weixinMiniAppService', method:'sendKefuMsg',
                parameters: {keFuMessage: JSON.stringify(message)}}

            let request = 'POST ' + app.services.constantService.WSS_CALL_URL +
                '\r\nContent-type: application/json' +
                '\r\nAccept: application/json' +
                '\r\nAuthorization: ' + app.services.cacheService.getStorage(null, 'JWT_TOKEN') +
                '\r\n' +
                '\r\n' + JSON.stringify(obj)

            app.services.socketService.sendSocketMessage(request)

            this.setData({content: null})
        }
    },
    onImageLoad: function(e){
        let width = e.detail.width
        let height = e.detail.height
        let index = e.currentTarget.dataset.index

        this.data.imgUrls.push(e.currentTarget.dataset.url)

        if(this.data.msgs[index].width == null){
            let newWidth
            let newHeight
            if(height < 150){
                newHeight = height
                newWidth = width
            }else{
                newHeight = 150
                newWidth = Math.round(width * newHeight / height)
            }

            this.setData({[`img[${index}].width`]:newWidth, [`img[${index}].height`]:newHeight})
        }
        this.setData({maxId: 'maxId'})
    },
    onImageTap: function(e){
        wx.previewImage({
            current: e.currentTarget.dataset.url,
            urls: this.data.imgUrls
        })
    },
    onChoose: function(e){
        wx.chooseImage({
            sizeType: ['original','compressed'],
            count: 1,
            success: (res)=> {
                if(res.tempFiles[0].size > 1048576){
                    app.services.utilService.showModal('图片文件必须小于1MB')
                    return
                }
                 let item = res.tempFilePaths[0]
                 wx.uploadFile({
                    url: app.services.constantService.WS_CUSTOMIZED_BASE_URL+'uploadImage/uploadChatImage',
                    filePath: item,
                    name: app.services.utilService.getFileName(item),
                    header:{
                        'Accept': 'application/json',
                        'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
                    },
                    success: (res)=>{
                        if(res.data == null){
                            app.services.utilService.showModal('上传文件失败')
                            return
                        }
                        res.data = JSON.parse(res.data)
                        if(app.services.utilService.checkResponse(res)){
                            if(res.data.value!=null){
                                let message = {toUserUid: this.data.userUid, msgType: 'image', path: res.data.value.path, urlPath:res.data.value.urlPath}

                                let obj = {key: 'sendKefuMsg', service:'weixinMiniAppService', method:'sendKefuMsg',
                                    parameters: {keFuMessage: JSON.stringify(message)}}

                                let request = 'POST ' + app.services.constantService.WSS_CALL_URL +
                                    '\r\nContent-type: application/json' +
                                    '\r\nAccept: application/json' +
                                    '\r\nAuthorization: ' + app.services.cacheService.getStorage(null, 'JWT_TOKEN') +
                                    '\r\n' +
                                    '\r\n' + JSON.stringify(obj)

                                app.services.socketService.sendSocketMessage(request)
                            }
                        }
                    }
                })

            }
        })
    }
})