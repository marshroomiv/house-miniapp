import { PublicCmsFinder } from '../../services/public/finder/public-cms-finder'
import { CommonService } from '../../services/common-service'

let wxParse = require('../../wxParse/wxParse.js');

const app = getApp()

const publicCmsFinder = new PublicCmsFinder()
const commonService = new CommonService()

Page({
    data: {

    },
    onLoad: function(options) {
        if(options.sharerUid != null){
            commonService.addShare(options.sharerUid)
        }

        if(options.cmsUid == null){
            app.services.utilService.toHomePage()
            return
        }

        wx.showLoading({
            title: '加载中',
        })

        publicCmsFinder.getCmsCmsItems(options.cmsUid, app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                let cmsCmsItems = res.data.value
                if(cmsCmsItems != null && cmsCmsItems.cms!=null) {
                    this.setData({cmsCmsItems: cmsCmsItems});

                    if(cmsCmsItems.cms.content!=null) {
                        let that = this
                        wxParse.wxParse('article', 'html', cmsCmsItems.cms.content, that, 15)
                    }
                }else{
                    wx.redirectTo({
                        url: '/pages/cms-group/cms-group'
                    })
                }
            },null,()=>{
                wx.hideLoading()
            })
    },
    onAll: function(e){
        wx.navigateTo({
            url: '/pages/cms-group/cms-group'
        })
    },
    onShareAppMessage: function (res) {
        return commonService.onShareCms(this.data.cmsCmsItems)
    },
    wxParseTagATap: function(e) {
        let href = e.currentTarget.dataset.src;
        app.services.utilService.wxParseTagATap(href)
    }
})