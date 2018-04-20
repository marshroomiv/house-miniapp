import { PublicCommunityFinder } from '../../services/public/finder/public-community-finder'
import { PublicBlockFinder } from '../../services/public/finder/public-block-finder'
import { CommonService } from '../../services/common-service'
import { PublicCmsFinder } from '../../services/public/finder/public-cms-finder'
import { PublicSlideShowFinder } from '../../services/public/finder/public-slide-show-finder'

const app = getApp()

const publicCommunityFinder = new PublicCommunityFinder()
const publicBlockFinder = new PublicBlockFinder()
const commonService = new CommonService()
const publicCmsFinder = new PublicCmsFinder()
const publicSlideShowFinder = new PublicSlideShowFinder()

let wxParse = require('../../wxParse/wxParse.js');

Page({
    data: {

    },
    onLoad: function(options) {

        if (options.communityUid == null) {
            app.services.utilService.toHomePage()
        }

        wx.showLoading({
            title: '加载中',
        })

        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')
        this.setData({dictionaries: dictionaries})

        publicCommunityFinder.getCommunityObjectCopyByPK(options.communityUid, app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.value != null){
                    this.setData({'communityObject': res.data.value})

                    if(res.data.value.blockUid!=null){
                        publicBlockFinder.getAllBlock(app.services.constantService.CACHE_READ_WRITE)
                            .subscribe((res)=>{
                                if(res.data != null && res.data.list != null){
                                    this.setData({'block': app.services.utilService.getBlock(this.data.communityObject.blockUid,res.data.list)})
                                }
                            })
                    }

                    if(res.data.value.slideShowUid!=null){
                        publicSlideShowFinder.getSlideShowObjectCopyByUid(res.data.value.slideShowUid, app.services.constantService.CACHE_READ_WRITE)
                            .subscribe((res) => {
                                if (res.data != null && res.data.value != null) {
                                    this.setData({'appSwiper_0':
                                        { indicatorDots:true, autoplay:true, interval:5000, duration:500,
                                            imgUrls:app.services.utilService.mapSlideShowPicture(res.data.value),
                                            thumbnailSuffix:'_750_0' }})
                                }
                            })
                    }

                    if(res.data.value.cmsUid!=null){

                        publicCmsFinder.getCmsCmsItems(res.data.value.cmsUid, app.services.constantService.CACHE_READ_WRITE)
                            .subscribe((res)=> {
                                if(res.data.value.cms!=null){
                                    let that = this
                                    wxParse.wxParse('article', 'html', res.data.value.cms.content, that, 10)
                                }
                            })
                    }
                }
            },null,()=>{
                wx.hideLoading()
            })
    },
    onNavi: function(e){
        if(this.data.communityObject!=null && this.data.communityObject.longitude!=null){
            wx.openLocation({
                longitude: Number(this.data.communityObject.longitude),
                latitude: Number(this.data.communityObject.latitude),
                name: this.data.communityObject.name,
                address: this.data.communityObject.districtName + this.data.communityObject.addressDetail
            })
        }
    },
    wxParseTagATap: function(e) {
        let href = e.currentTarget.dataset.src;
        app.services.utilService.wxParseTagATap(href)
    }
})