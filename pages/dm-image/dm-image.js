const app = getApp()

Page({
    data: {
        disabled: false,
        imageList: [],
        name: ''
    },
    onLoad: function(options) {

    },
    chooseImage: function () {
        wx.chooseImage({
            count: 9,
            success: (res)=> {
                for(let item of res.tempFiles){
                    if(item.size > 1048576){
                        app.services.utilService.showModal('图片大小不能超过1MB')
                        return
                    }
                    let extension = app.services.utilService.getExtension(item.path)
                    if(!(extension=='jpg' || extension=='jpeg' || extension=='png')){
                        app.services.utilService.showModal('图片格式必须是JPG或PNG')
                        return
                    }
                }
                this.setData({
                    imageList: res.tempFilePaths
                })
            }
        })
    },
    previewImage: function (e) {
        let current = e.target.dataset.src

        wx.previewImage({
            current: current,
            urls: this.data.imageList
        })
    },
    onNameInput: function (e) {
        this.setData({
            name: e.detail.value
        })
    },
    onUpload: function(e) {
        if (this.data.name == null || this.data.name == '') {
            app.services.utilService.showModal('素材名称不能为空')
            return
        }

        let url = app.services.utilService.joinUrl(app.services.constantService.WS_CUSTOMIZED_BASE_URL + 'uploadImage/uploadMaterial', {name: this.data.name.trim()})
        this.setData({disabled: true})
        wx.showLoading({
            title: '上传中',
        })
        let counter = this.data.imageList.length
        for (let item of this.data.imageList) {
            wx.uploadFile({
                url: url,
                filePath: item,
                name: app.services.utilService.getFileName(item),
                header: {
                    'Accept': 'application/json',
                    'Authorization': app.services.cacheService.getStorage(null, 'JWT_TOKEN')
                },
                success: (res) => {
                    res.data = JSON.parse(res.data)
                    if (app.services.utilService.checkResponse(res)) {
                        counter --
                        if(counter == 0){
                            wx.hideLoading()
                            wx.showToast({
                                title: '上传成功'
                            })
                        }
                    }
                },
                fail: (res) => {
                    wx.hideLoading()
                }
            })
        }
    }
})