import { CustomizedUserShareFinder } from '../../services/customized/finder/customized-user-share-finder'
import { CommonService } from '../../services/common-service'

const app = getApp()

const customizedUserShareFinder = new CustomizedUserShareFinder()
const commonService = new CommonService()

Page({
    data: {
    },
    onLoad: function(options) {
        let domain = app.services.cacheService.getStorage(null,'DOMAIN')
        this.data.domain = domain

        wx.showLoading({
            title: '加载中',
        })

        customizedUserShareFinder.getUserShares(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                this.setData({userShares: res.data.list})
            },
                ()=>{app.services.utilService.showModal('获取分享点击信息失败')}
                ,()=>{
                    wx.hideLoading()
                })
    },
    onShareAppMessage: function (res) {
        return commonService.onShareIndex()
    }

})