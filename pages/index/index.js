import { PublicSlideShowFinder } from '../../services/public/finder/public-slide-show-finder'
import { PublicCmsFinder } from '../../services/public/finder/public-cms-finder'

import { PublicBlockFinder } from '../../services/public/finder/public-block-finder'
import { PublicFeatureFinder } from '../../services/public/finder/public-feature-finder'
import { PublicCommunityFinder } from '../../services/public/finder/public-community-finder'
import { PublicHouseFinder } from '../../services/public/finder/public-house-finder'

import { CommonService } from '../../services/common-service'

const app = getApp()

const publicSlideShowFinder = new PublicSlideShowFinder()
const publicCmsFinder = new PublicCmsFinder()

const publicBlockFinder = new PublicBlockFinder()
const publicFeatureFinder = new PublicFeatureFinder()
const publicCommunityFinder = new PublicCommunityFinder()
const publicHouseFinder = new PublicHouseFinder()

const commonService = new CommonService()

//let wxParse = require('../../wxParse/wxParse.js');

Page({
    data: {
        systemInfo: wx.getSystemInfoSync()
    },
    onLoad: function(options) {
        if(options.sharerUid != null){
            commonService.addShare(options.sharerUid)
        }else if(options.scene != null){
            let scene = decodeURIComponent(options.scene)
            commonService.addShare(scene)
        }else if(options.q !=null){
            app.services.utilService.showModal(options.q)
        }

        commonService.getDomain(this, (domain)=>{
            if(domain.userInformationIndicator == 'Y'){
                commonService.getUserInfo()
            }
        })

        this.setData({version: app.services.constantService.VERSION})

        wx.showLoading({
            title: '加载中',
        })

        publicSlideShowFinder.getSlideShowObjectCopyByName('首页', app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.value != null){
                    this.setData({'appSwiper_0':
                        { indicatorDots:true, autoplay:true, interval:5000, duration:500,
                            imgUrls:app.services.utilService.mapSlideShowPicture(res.data.value),
                            thumbnailSuffix:'_750_0' }})
                }
            })

        publicBlockFinder.getAllBlock(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'blocks': res.data.list})
                }
            })

        publicFeatureFinder.getAllFeature(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'features':res.data.list })
                }
            })

        publicCommunityFinder.getAllCommunityObjectCopy(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'communityObjects': res.data.list})
                }
            })


        publicHouseFinder.getLatestSellHouseObjectCopy(app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res)=>{
                if(res.data != null && res.data.list != null){
                    this.setData({'houseObjects':res.data.list})
                }
            },null,()=>{
                wx.hideLoading()
            })

    },
    onShareAppMessage: function (res) {
        return commonService.onShareIndex()
    },
    onMoreBuy: function(e){
        wx.switchTab({
            url: '/pages/buy/buy'
        })
    },
    onMoreRent:function(e){
        wx.switchTab({
            url: '/pages/rent/rent'
        })
    },
    onCall: function(e){
        let phone = null

        if(this.data.domain!=null && this.data.domain.technicalSupportPhone!=null){
            phone = this.data.domain.technicalSupportPhone
        }
        if(phone==null){
            phone='15001716658'
        }
        wx.makePhoneCall({
            phoneNumber: phone
        })
    }
})