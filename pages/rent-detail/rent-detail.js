import { CommonService } from '../../services/common-service'

import { PublicHouseFinder } from '../../services/public/finder/public-house-finder'
import { PublicSlideShowFinder } from '../../services/public/finder/public-slide-show-finder'
import { PublicUserFinder } from '../../services/public/finder/public-user-finder'
import { PublicCmsFinder } from '../../services/public/finder/public-cms-finder'

import { PublicBlockFinder } from '../../services/public/finder/public-block-finder'
import { PublicFeatureFinder } from '../../services/public/finder/public-feature-finder'
import { PublicCommunityFinder } from '../../services/public/finder/public-community-finder'

let wxParse = require('../../wxParse/wxParse.js');

const app = getApp()

const commonService = new CommonService()

const publicHouseFinder = new PublicHouseFinder()
const publicSlideShowFinder = new PublicSlideShowFinder()
const publicUserFinder = new PublicUserFinder()
const publicCmsFinder = new PublicCmsFinder()

const publicBlockFinder = new PublicBlockFinder()
const publicFeatureFinder = new PublicFeatureFinder()
const publicCommunityFinder = new PublicCommunityFinder()

let filterFacility = function(communityObject, facilityTypeCode){
    let facilities = [];

    if(communityObject!=null && communityObject.communityFacilityObjectList!=null){
        for(let item of communityObject.communityFacilityObjectList){
            if(item.communityFacilityTypeCode == facilityTypeCode){
                facilities.push(item)
            }
        }
    }

    return facilities
}

Page({
    data: {

    },
    onLoad: function(options) {
        if (options.sharerUid != null) {
            this.setData({sharerUid: options.sharerUid })
            commonService.addShare(options.sharerUid)
        }

        if (options.houseUid == null) {
            app.services.utilService.toHomePage()
        }

        wx.showLoading({
            title: '加载中',
        })

        let dictionaries = app.services.cacheService.getStorage(null, 'DICTIONARIES')

        this.setData({dictionaries: dictionaries})
        this.setData({houseUid: options.houseUid})

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

        publicHouseFinder.getHouseObjectCopyByPK(options.houseUid, app.services.constantService.CACHE_READ_WRITE)
            .subscribe((res) => {
                if (res.data != null && res.data.value != null) {

                    if(res.data.value.sellIndicator!='N'){
                        return
                    }

                    this.setData({houseObject: res.data.value})

                    if(res.data.value.communityUid!=null) {
                        publicHouseFinder.getRentHouseCountByCommunityUid(res.data.value.communityUid, app.services.constantService.CACHE_READ_WRITE)
                            .subscribe((res) => {
                                if (res.data != null && res.data.value != null) {
                                    this.setData({'rentHouseCount': res.data.value})
                                }
                            })
                    }

                    publicHouseFinder.searchRentHouseObjectByPrice(res.data.value.price, app.services.constantService.CACHE_READ_WRITE)
                        .subscribe((res)=>{
                            if(res.data != null && res.data.list != null){
                                for(let i=0;i<res.data.list.length;i++){
                                    let item = res.data.list[i]
                                    if(item.houseUid == this.data.houseObject.houseUid){
                                        res.data.list.splice(i,1)
                                        break
                                    }
                                }
                                this.setData({'similarHouseObjects': res.data.list})
                            }
                        })

                    publicCommunityFinder.getAllCommunityObjectCopy(app.services.constantService.CACHE_READ_WRITE)
                        .subscribe((res)=>{
                            if(res.data != null && res.data.list != null){
                                this.setData({'communityObjects': res.data.list})

                                if(this.data.houseObject.communityUid!=null){
                                    let communityObject = app.services.utilService.getCommunity(this.data.houseObject.communityUid,res.data.list);
                                    this.setData({'communityObject': communityObject})

                                    this.setData({schools: filterFacility(communityObject, 'SCHOOL')})
                                    this.setData({hospitals: filterFacility(communityObject, 'HOSPITAL')})
                                    this.setData({subways: filterFacility(communityObject, 'SUBWAY')})
                                    this.setData({publicTrans: filterFacility(communityObject, 'PUBLIC_TRANS')})
                                    this.setData({malls: filterFacility(communityObject, 'MALL')})
                                    this.setData({caterings: filterFacility(communityObject, 'CATERING')})
                                    this.setData({entertainments: filterFacility(communityObject, 'ENTERTAINMENT')})
                                }
                            }
                        },null,()=>{
                            wx.hideLoading()
                        })

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
                    }else{
                        this.setData({'appSwiper_0':
                            { indicatorDots:true, autoplay:true, interval:5000, duration:500,
                                imgUrls:[{img:res.data.value.houseCoverPicturePath}],
                                thumbnailSuffix:'_750_0' }})
                    }

                    if(res.data.value.agentUserUid!=null){
                        publicUserFinder.getAgent(res.data.value.agentUserUid, app.services.constantService.CACHE_READ_WRITE)
                            .subscribe((res) => {
                                if (res.data != null && res.data.value != null) {
                                    this.setData({agent: res.data.value})
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
            })
    },
    onCommunity: function(e){
        wx.navigateTo({
            url: app.services.utilService.joinUrl('/pages/community/community',{communityUid: this.data.communityObject.communityUid})
        })
    },
    onMoreCommunity: function(e) {
        if(this.data.houseObject.sellIndicator=='Y'){
            wx.navigateTo({
                url: app.services.utilService.joinUrl('/pages/more-community/more-community', {communityUid: this.data.communityObject.communityUid})
            })
        }else{
            wx.navigateTo({
                url: app.services.utilService.joinUrl('/pages/more-community-rent/more-community-rent', {communityUid: this.data.communityObject.communityUid})
            })
        }
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
    onShareAppMessage: function (res) {
        return commonService.onShareRentHouse(this.data.houseObject.houseUid, this.data.houseObject.houseTitle)
    },
    wxParseTagATap: function(e) {
        let href = e.currentTarget.dataset.src;
        app.services.utilService.wxParseTagATap(href)
    }
})