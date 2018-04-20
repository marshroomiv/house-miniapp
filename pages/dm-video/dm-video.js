const app = getApp()

let context;
Page({
    data: {
        origin: false,
        disabled: false,
        limit: 100,
        name: ''
    },
    onLoad: function(options) {
        context = wx.createCameraContext(this);
    },
    switchChange: function(e) {
        this.data.origin = e.detail.value
    },
    chooseVideo: function () {
        wx.chooseVideo({
            compressed: !this.data.origin,
            success: (res)=> {
                this.setData({
                    video: res
                })
            }
        })
    },
    onUpload: function(e){
        if(this.data.name == null || this.data.name == ''){
            app.services.utilService.showModal('素材名称不能为空')
            return
        }

        let url = app.services.utilService.joinUrl(app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'uploadFile/uploadVideo', {size: this.data.video.size, height: this.data.video.height,width: this.data.video.width,duration: Math.round(this.data.video.duration), name: this.data.name.trim()})
        if(this.data.video.size > this.data.limit * 1024 * 1024){
            app.services.utilService.showModal('视频大于' + this.data.limit + 'MB')
            return
        }
        this.setData({disabled: true})
        wx.showLoading({
            title: '上传中',
        })
        wx.uploadFile({
            url: url,
            filePath: this.data.video.tempFilePath,
            name: app.services.utilService.getFileName(this.data.video.tempFilePath),
            header: {
                'Accept': 'application/json',
                'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
            },
            success: (res) => {
                console.log(res)
                res.data = JSON.parse(res.data)
                if(app.services.utilService.checkResponse(res)){
                    setTimeout(()=>{
                        wx.showToast({
                            title: '上传成功'
                        })
                    }, 1000)
                }
            },
            complete:(res) => {
                wx.hideLoading()
            }
        })
    },
    onNameInput: function (e) {
        this.setData({
            name: e.detail.value
        })
    }
})