import { WeixinMiniAppService } from '../../services/customized/weixin-mini-app-service'

import { CommonService } from '../../services/common-service'

const app = getApp()

const weixinMiniAppService = new WeixinMiniAppService()
const commonService = new CommonService()

Page({
    data: {
    },
    onLoad: function(options) {

        wx.showLoading({
            title: '加载中',
        })

        weixinMiniAppService.getQrCodePath(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                console.log(res)
                if(res.data.value != null){
                    this.setData({qrCodeUrl: res.data.value})
                }
            },null,()=>{
                wx.hideLoading()
            })
    },
    onSaveQrCode: function(e){
        let url = app.services.utilService.toHttps(app.services.constantService.FILE_URL) +  this.data.qrCodeUrl
        commonService.saveImageToPhotosAlbum(url)
    }
})